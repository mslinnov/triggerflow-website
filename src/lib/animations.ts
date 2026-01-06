import { Variants } from 'framer-motion';

// Basic fade in up animation
export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Stagger container for lists/grids
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// Scale in animation
export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Slide in from left
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Slide in from right
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

// Fade in only
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5 },
  },
};

// Hero stagger variants
export const heroContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export const heroItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

// Card hover animation
export const cardHover = {
  scale: 1.02,
  y: -5,
  transition: { type: 'spring' as const, stiffness: 300, damping: 20 },
};

// Button animations
export const buttonHover = {
  scale: 1.05,
  y: -2,
  transition: { type: 'spring' as const, stiffness: 400, damping: 15 },
};

export const buttonTap = {
  scale: 0.98,
};

// Icon bounce on hover
export const iconBounce = {
  scale: 1.1,
  transition: { type: 'spring' as const, stiffness: 400, damping: 10 },
};

// Pulse animation for central elements
export const pulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Draw SVG path
export const drawPath: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1, ease: 'easeInOut' },
  },
};

// Viewport settings for consistent scroll animations
export const defaultViewport = {
  once: true,
  margin: '-100px' as const,
};

// Stagger delays for sequential animations
export const getStaggerDelay = (index: number, baseDelay = 0) => ({
  delay: baseDelay + index * 0.1,
});

// Stagger item (for use with staggerContainer)
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4 },
  },
};

// Float animation for floating cards
export const float = {
  animate: {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Get float animation with custom delay
export const getFloatAnimation = (delay: number = 0) => ({
  y: [0, -10, 0],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
    delay,
  },
});

// Glow pulse animation for backgrounds
export const glowPulse = {
  animate: {
    scale: [1, 1.05, 1],
    opacity: [0.3, 0.5, 0.3],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// Number counter animation spring config
export const numberSpring = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
};

// Chevron rotation for FAQ
export const chevronRotate = {
  open: { rotate: 180 },
  closed: { rotate: 0 },
};
