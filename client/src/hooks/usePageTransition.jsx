import { useAnimate, usePresence } from "framer-motion"
import { useEffect } from "react"

export const usePageTransition = () => {
  const [isPresent, safeToRemove] = usePresence()
  const [scope, animate] = useAnimate()

  const enterAnimation = async () => {
    await animate(scope.current, { x: ["-100%", "0%"] }, { duration: 0.4 })
  }

  const exitAnimation = async () => {
    await animate(scope.current, { opacity: [0, 1] }, { duration: 0.4 })
    safeToRemove()
  }

  const pageTransitionFn = async () => {
    await enterAnimation()
    if (!isPresent) {
      await exitAnimation()
    }
  }

  useEffect(() => {
    pageTransitionFn()
  }, [isPresent])

  return scope
}