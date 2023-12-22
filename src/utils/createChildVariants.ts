import { Variants } from 'framer-motion';

const createChildVariants = (duration: number): Variants => ({
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: 'easeInOut' },
  },
});

export default createChildVariants;
