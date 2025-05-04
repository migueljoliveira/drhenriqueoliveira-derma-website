// Animation utility functions and constants
export const TRANSITION_EASE = [0.25, 0.1, 0.25, 1.0] // Cubic bezier for smooth transitions

export const getRandomDelay = (min = 0, max = 0.5) => {
  return Math.random() * (max - min) + min
}

export const getRandomDuration = (min = 0.5, max = 1.5) => {
  return Math.random() * (max - min) + min
}
