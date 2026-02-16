// components/SplitText/presets.js

export const presets = {
  fadeIn: ({ params }) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    final: { opacity: 1 }, // по умолчанию равно animate
  }),

  slideDown: ({ params }) => ({
    initial: { opacity: 0, transform: 'translateY(-20px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    final: { opacity: 1, transform: 'translateY(0)' },
  }),

  slideUp: ({ params }) => ({
    initial: { opacity: 0, transform: 'translateY(20px)' },
    animate: { opacity: 1, transform: 'translateY(0)' },
    final: { opacity: 1, transform: 'translateY(0)' },
  }),

  rotateIn: ({ params }) => ({
    initial: { opacity: 1, transform: 'rotate(0deg)' },
    animate: { opacity: 1, transform: 'rotate(-15deg)' },
    final: { opacity: 1, transform: 'rotate(0)' },
  }),

  scaleIn: ({ params }) => ({
    initial: { opacity: 0, transform: 'scale(0.5)' },
    animate: { opacity: 1, transform: 'scale(1)' },
    final: { opacity: 1, transform: 'scale(1)' },
  }),

  // Пример с финальным изменением цвета
  colorFadeWithFinal: ({ params }) => ({
    initial: { opacity: .5, color: '#ffffff' },
    animate: { opacity: 1, color: '#ff00ff' }, // появляется красным
    final: { opacity: 1, color: '#ffea00' }, // затем становится чёрным
  }),

  wave: ({ index, total, params }) => ({
    initial: {
      opacity: 0,
      transform: `translateY(${Math.sin(index / total * Math.PI * 2) * 20}px)`,
    },
    animate: {
      opacity: 1,
      transform: 'translateY(0)',
    },
    final: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  }),
  

  randomDrift: ({ index }) => {
  // Простейший детерминированный "случайный" сдвиг на основе индекса
  const seed = index * 12.9898;
  const rand = Math.sin(seed) * 43758.5453 % 1; // псевдослучайное число [0,1)
  
  return {
    initial: {
      opacity: 1,
      transform: `translate(0,0) rotate(0deg)`,
    },
    animate: {
      opacity: 1,
      transform: `translate(${(rand - 0.5) * 100}px, ${(rand - 0.2) * 100}px) rotate(${rand * 360}deg)`,
    },
    final: {
      opacity: 1,
      transform: `translate(0,0) rotate(0deg)`,
    },
  };},

  customWave: ({ index, total, params }) => {
  const amplitude = params.amplitude || 30;
  const frequency = params.frequency || 2;
  const phase = params.phase || 0;
  const y = Math.sin(index * frequency + phase) * amplitude;
  return {
    initial: {
      opacity: 1,
      transform: `translateY(${y}px)`,
    },
    animate: {
      opacity: 1,
      transform: `translateY(0)`,
    },
    final: {
      opacity: 1,
      transform: `translateY(0)`,
    },
  };
},
  
};

presets.default = presets.fadeIn;