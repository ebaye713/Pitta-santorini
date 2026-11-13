import type {ReactNode} from 'react';
import {motion, useReducedMotion} from 'motion/react';

interface MotionSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function MotionSection({
  children,
  id,
  className = '',
  delay = 0,
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return (
      <section id={id} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{opacity: 0, y: 20}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.1}}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.section>
  );
}
