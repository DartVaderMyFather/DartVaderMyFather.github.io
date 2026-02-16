// components/SplitText/SplitText.jsx
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { presets } from './presets';
import { useMeasureLines } from './useMeasureLines';

export const SplitText = ({
  children,
  as: Component = 'div',
  preset = 'fadeIn',
  paramsAnimate: paramsAnimateProp = {},
  paramsFinal: paramsFinalProp,
  hoverOutParams, // объект с duration, easing, stagger, direction, delay для обратной анимации при hover
  trigger = 'mount',
  splitBy = 'char',
  preserveWhitespace = true,
  onAnimationComplete,
  style,
  ...rest
}) => {
  // Единая фаза анимации:
  // 'initial' - начальное состояние
  // 'animating' - выполняется прямая анимация (initial -> animate)
  // 'reversing' - выполняется обратная анимация (animate -> initial) для hover
  // 'final' - финальное состояние (после animate, если есть paramsFinal)
  const [phase, setPhase] = useState('initial');
  // Для интерактивных триггеров (hover/click)
  const [interactionActive, setInteractionActive] = useState(false);

  const containerRef = useRef(null);
  // Таймер для обратной анимации (чтобы очищать при смене фазы)
  const reverseTimerRef = useRef(null);
  // Таймер для перехода в final
  const finalTimerRef = useRef(null);

  // Измерение строк (для splitBy='line' требуется доработка, но базовая структура оставлена)
  const { lines, lineCount } = useMeasureLines(containerRef, children, splitBy === 'line');

  // Разбивка текста на элементы
  const elements = useMemo(() => {
    if (!children) return [];
    const text = Array.isArray(children) ? children.join('') : children;
    if (splitBy === 'char') {
      return text.split('').map((char, index) => ({
        id: `char-${index}`,
        content: char === ' ' ? '\u00A0' : char,
        type: 'char',
        index,
      }));
    } else if (splitBy === 'word') {
      return text.split(/(\s+)/).filter(part => part.length > 0).map((part, index) => ({
        id: `word-${index}`,
        content: part,
        type: 'word',
        index,
      }));
    } else if (splitBy === 'line' && lines.length > 0) {
      return lines.flatMap((line, lineIndex) =>
        line.split('').map((char, charIndex) => ({
          id: `line-${lineIndex}-char-${charIndex}`,
          content: char === ' ' ? '\u00A0' : char,
          type: 'line-char',
          index: charIndex,
          lineIndex,
        }))
      );
    }
    return [];
  }, [children, splitBy, lines]);

  // Параметры для animate (первая фаза)
  const animateParams = useMemo(() => ({
    duration: paramsAnimateProp.duration ?? 0.5,
    delay: paramsAnimateProp.delay ?? 0,
    stagger: paramsAnimateProp.stagger ?? 0,
    easing: paramsAnimateProp.easing ?? 'ease',
    direction: paramsAnimateProp.direction ?? 'forward',
  }), [paramsAnimateProp]);

  // Параметры для final (если есть)
  const finalParams = useMemo(() => {
    if (!paramsFinalProp) return null;
    return {
      duration: paramsFinalProp.duration ?? 0.5,
      delay: paramsFinalProp.delay ?? 0,
      stagger: paramsFinalProp.stagger ?? 0,
      easing: paramsFinalProp.easing ?? 'ease',
      direction: paramsFinalProp.direction ?? 'forward',
    };
  }, [paramsFinalProp]);

  // Параметры для hover out (если есть)
  const hoverOutParamsResolved = useMemo(() => {
    if (!hoverOutParams) return null;
    return {
      duration: hoverOutParams.duration ?? 0.5,
      delay: hoverOutParams.delay ?? 0,
      stagger: hoverOutParams.stagger ?? 0,
      easing: hoverOutParams.easing ?? 'ease',
      direction: hoverOutParams.direction ?? 'forward',
    };
  }, [hoverOutParams]);

  const presetFn = presets[preset] || presets.fadeIn;

  // Генерируем базовые стили для каждой фазы (initial, animate, final)
  const elementStyles = useMemo(() => {
    const total = elements.length;
    return elements.map((el, idx) => {
      const presetStyles = presetFn({
        index: idx,
        total,
        lineIndex: el.lineIndex,
        lineTotal: lineCount,
        params: animateParams, // пресет может использовать animateParams (например, amplitude)
      });

      const initial = presetStyles.initial || {};
      const animate = presetStyles.animate || {};
      const final = presetStyles.final || animate; // если final не задан, копируем animate

      return {
        ...el,
        initialStyle: {
          display: 'inline-block',
          ...initial,
        },
        animateStyle: {
          display: 'inline-block',
          ...animate,
        },
        finalStyle: {
          display: 'inline-block',
          ...final,
        },
      };
    });
  }, [elements, presetFn, animateParams, lineCount]);

  // Вспомогательная функция для построения CSS transition с учётом направления и индекса
  const getTransition = (params, index, total) => {
    const { duration, delay, stagger, easing, direction } = params;
    // Определяем порядок индекса в зависимости от направления
    let orderIndex = index;
    if (direction === 'reverse') {
      orderIndex = total - 1 - index;
    }
    const individualDelay = delay + orderIndex * stagger;
    return `all ${duration}s ${easing} ${individualDelay}s`;
  };

  // Очистка таймеров при смене фазы или размонтировании
  useEffect(() => {
    return () => {
      if (reverseTimerRef.current) clearTimeout(reverseTimerRef.current);
      if (finalTimerRef.current) clearTimeout(finalTimerRef.current);
    };
  }, []);

  // Управление фазой в зависимости от триггера
  useEffect(() => {
    if (trigger === 'mount') {
      // При монтировании переходим в animating через микротакт
      const timer = setTimeout(() => setPhase('animating'), 50);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  // Обработка интерактивных триггеров (hover/click)
  useEffect(() => {
    if (trigger === 'mount') return;

    if (interactionActive) {
      // Активация: наведение или клик (для click interactionActive переключается)
      // Очищаем возможный обратный таймер
      if (reverseTimerRef.current) {
        clearTimeout(reverseTimerRef.current);
        reverseTimerRef.current = null;
      }
      // Если сейчас reversing, переключаемся на animating (плавно пойдём вперёд)
      if (phase === 'reversing') {
        setPhase('animating');
      } else if (phase === 'initial') {
        // Из initial запускаем animating
        setPhase('animating');
      }
      // Если уже animating или final – остаёмся, не меняем
    } else {
      // Деактивация: уход мыши (для hover) или повторный клик (для click – будет обработано в click)
      if (trigger === 'hover') {
        if (phase === 'animating' || phase === 'final') {
          // Если есть параметры для обратной анимации, запускаем reversing
          if (hoverOutParamsResolved) {
            setPhase('reversing');
            // Рассчитываем длительность обратной анимации
            const totalDuration = hoverOutParamsResolved.delay +
              (elements.length - 1) * hoverOutParamsResolved.stagger +
              hoverOutParamsResolved.duration;
            reverseTimerRef.current = setTimeout(() => {
              setPhase('initial');
              reverseTimerRef.current = null;
            }, totalDuration * 1000);
          } else {
            // Без параметров – мгновенный возврат в initial
            setPhase('initial');
          }
        }
        // Если уже reversing или initial – ничего не делаем
      }
    }
  }, [interactionActive, trigger, phase, hoverOutParamsResolved, elements.length]);

  // Эффект для автоматического перехода в final после завершения animating
  useEffect(() => {
    if (phase !== 'animating' || trigger === 'hover') return; // для hover final не используется

    const maxDelay = animateParams.delay + (elements.length - 1) * animateParams.stagger;
    const totalAnimateDuration = (maxDelay + animateParams.duration) * 1000;

    finalTimerRef.current = setTimeout(() => {
      // Проверяем, есть ли финальные стили (отличаются от animate)
      const hasFinal = finalParams && elementStyles.some(el =>
        JSON.stringify(el.finalStyle) !== JSON.stringify(el.animateStyle)
      );
      if (hasFinal) {
        setPhase('final');
      } else {
        // Если final не задан или совпадает с animate, остаёмся в animating (или можно перейти в условный final)
        // Поскольку анимация завершена, можно вызвать onAnimationComplete
        if (onAnimationComplete) onAnimationComplete();
      }
      finalTimerRef.current = null;
    }, totalAnimateDuration);

    return () => {
      if (finalTimerRef.current) clearTimeout(finalTimerRef.current);
    };
  }, [phase, animateParams, elements.length, elementStyles, finalParams, onAnimationComplete, trigger]);

  // Эффект для вызова onAnimationComplete после завершения final (если нужно)
  useEffect(() => {
    if (phase !== 'final' || !finalParams) return;

    const maxDelay = finalParams.delay + (elements.length - 1) * finalParams.stagger;
    const totalFinalDuration = (maxDelay + finalParams.duration) * 1000;

    finalTimerRef.current = setTimeout(() => {
      if (onAnimationComplete) onAnimationComplete();
      finalTimerRef.current = null;
    }, totalFinalDuration);

    return () => {
      if (finalTimerRef.current) clearTimeout(finalTimerRef.current);
    };
  }, [phase, finalParams, elements.length, onAnimationComplete]);

  // Обработчики событий
  const handleMouseEnter = useCallback(() => {
    if (trigger === 'hover') setInteractionActive(true);
  }, [trigger]);

  const handleMouseLeave = useCallback(() => {
    if (trigger === 'hover') setInteractionActive(false);
  }, [trigger]);

  const handleClick = useCallback(() => {
    if (trigger === 'click') {
      // Переключаем interactionActive (true/false)
      setInteractionActive(prev => !prev);
    }
  }, [trigger]);

  // Определяем, какой стиль применить к каждому элементу
  const getElementStyle = (item, index) => {
    const total = elements.length;

    // Особый случай: фаза reversing – используем initialStyle с переходом из hoverOutParams
    if (phase === 'reversing' && hoverOutParamsResolved) {
      return {
        ...item.initialStyle,
        transition: getTransition(hoverOutParamsResolved, index, total),
      };
    }

    switch (phase) {
      case 'initial':
        return item.initialStyle;
      case 'animating':
        return {
          ...item.animateStyle,
          transition: getTransition(animateParams, index, total),
        };
      case 'final':
        if (finalParams) {
          return {
            ...item.finalStyle,
            transition: getTransition(finalParams, index, total),
          };
        }
        // Если finalParams нет, но фаза final – вероятно, ошибка, но вернём animate
        return item.animateStyle;
      default:
        return item.initialStyle;
    }
  };

  const containerProps = {
    ref: containerRef,
    style: {
      display: 'inline-block', // чтобы контейнер занимал размер содержимого
      ...style,
    },
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    ...rest,
  };

  return (
    <Component {...containerProps}>
      {elementStyles.map((item, idx) => (
        <span
          key={item.id}
          style={getElementStyle(item, idx)}
        >
          {item.content}
        </span>
      ))}
    </Component>
  );
};