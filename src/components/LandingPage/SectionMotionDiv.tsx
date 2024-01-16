import { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

interface MotionComponentProps {
  variants: Variants;
  children: ReactNode;
  animation: boolean;
}

const SectionMotionDiv = ({
  variants,
  children,
  animation,
}: MotionComponentProps) => (
  <motion.div
    variants={variants}
    initial="hidden"
    animate={animation ? 'visible' : 'hidden'}
  >
    {children}
  </motion.div>
);

export default SectionMotionDiv;
