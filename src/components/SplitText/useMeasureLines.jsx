// components/SplitText/useMeasureLines.js
import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Хук для измерения строк текста в контейнере.
 * @param {React.RefObject} containerRef - реф на контейнер с текстом
 * @param {string|string[]} text - исходный текст
 * @param {boolean} enabled - нужно ли измерять строки
 * @returns {Object} { lines: string[], lineCount: number }
 */
export const useMeasureLines = (containerRef, text, enabled) => {
  const [lines, setLines] = useState([]);
  const [lineCount, setLineCount] = useState(0);
  const observerRef = useRef(null);

  const measure = useCallback(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;
    // Создаём временный span для каждого символа, чтобы узнать их позиции
    // Но проще: воспользуемся Range, чтобы получить прямоугольники для каждого символа
    const textNode = container.firstChild; // предполагаем, что контейнер содержит только текст
    if (!textNode) return;

    const range = document.createRange();
    const rects = [];
    const chars = (Array.isArray(text) ? text.join('') : text).split('');

    for (let i = 0; i < chars.length; i++) {
      range.setStart(textNode, i);
      range.setEnd(textNode, i + 1);
      rects.push(range.getBoundingClientRect());
    }

    // Группируем символы по строкам: если top изменился более чем на порог
    const threshold = 5; // пикселей допуска
    let currentLine = 0;
    let lastTop = rects[0]?.top;
    const lineIndices = [];

    rects.forEach((rect, idx) => {
      if (Math.abs(rect.top - lastTop) > threshold) {
        currentLine++;
        lastTop = rect.top;
      }
      lineIndices[idx] = currentLine;
    });

    // Собираем строки как подстроки
    const lineStrings = [];
    let lineStart = 0;
    for (let i = 0; i <= lineIndices.length; i++) {
      if (i === lineIndices.length || lineIndices[i] !== lineIndices[lineStart]) {
        lineStrings.push(chars.slice(lineStart, i).join(''));
        lineStart = i;
      }
    }

    setLines(lineStrings);
    setLineCount(lineStrings.length);
  }, [containerRef, text, enabled]);

  // Используем ResizeObserver для пересчёта при изменении размеров
  useEffect(() => {
    if (!enabled) return;

    // Первоначальное измерение после рендера
    const timer = setTimeout(measure, 100);

    // Отслеживаем изменение размеров контейнера
    if (window.ResizeObserver) {
      observerRef.current = new ResizeObserver(measure);
      if (containerRef.current) {
        observerRef.current.observe(containerRef.current);
      }
    }

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, [enabled, measure, containerRef]);

  return { lines, lineCount };
};