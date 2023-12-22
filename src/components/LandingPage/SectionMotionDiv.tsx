import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionComponentProps {
  variants: Variants;
  children: ReactNode;
  animation: boolean;
}

const MotionComponent = ({
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

export default MotionComponent;
