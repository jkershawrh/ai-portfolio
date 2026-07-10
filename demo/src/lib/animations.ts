import type { Variants } from 'framer-motion'

export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } },
  exit: { opacity: 0, y: -20 },
}

export const staggerContainer: Variants = {
  animate: { transition: { staggerChildren: 0.08 } },
}

export const slideIn: Variants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 400, damping: 25 } },
  exit: { opacity: 0, x: 30 },
}
