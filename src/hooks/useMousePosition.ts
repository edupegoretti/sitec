'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface MousePosition {
  x: number
  y: number
  elementX: number
  elementY: number
  isInside: boolean
}

interface UseMousePositionOptions {
  /** Throttle delay in ms (default: 16 ~60fps) */
  throttleMs?: number
  /** Whether to track relative to an element */
  elementRef?: React.RefObject<HTMLElement | null>
  /** Only track when element is hovered */
  trackOnlyWhenInside?: boolean
}

/**
 * Hook para tracking de posição do mouse com throttling
 * Otimizado para performance com requestAnimationFrame
 */
export function useMousePosition(options: UseMousePositionOptions = {}) {
  const { throttleMs = 16, elementRef, trackOnlyWhenInside = false } = options

  const [position, setPosition] = useState<MousePosition>({
    x: 0,
    y: 0,
    elementX: 0,
    elementY: 0,
    isInside: false,
  })

  const frameRef = useRef<number | null>(null)
  const lastUpdateRef = useRef<number>(0)

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    const now = performance.now()

    // Throttle updates
    if (now - lastUpdateRef.current < throttleMs) {
      return
    }

    lastUpdateRef.current = now

    let elementX = clientX
    let elementY = clientY
    let isInside = true

    if (elementRef?.current) {
      const rect = elementRef.current.getBoundingClientRect()
      elementX = clientX - rect.left
      elementY = clientY - rect.top
      isInside = (
        clientX >= rect.left &&
        clientX <= rect.right &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      )
    }

    if (trackOnlyWhenInside && !isInside) {
      return
    }

    setPosition({
      x: clientX,
      y: clientY,
      elementX,
      elementY,
      isInside,
    })
  }, [throttleMs, elementRef, trackOnlyWhenInside])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    // Cancel previous frame
    if (frameRef.current) {
      cancelAnimationFrame(frameRef.current)
    }

    // Schedule update on next frame
    frameRef.current = requestAnimationFrame(() => {
      updatePosition(event.clientX, event.clientY)
    })
  }, [updatePosition])

  const handleMouseLeave = useCallback(() => {
    setPosition(prev => ({ ...prev, isInside: false }))
  }, [])

  useEffect(() => {
    const element = elementRef?.current || window

    element.addEventListener('mousemove', handleMouseMove as EventListener)

    if (elementRef?.current) {
      elementRef.current.addEventListener('mouseleave', handleMouseLeave)
    }

    return () => {
      element.removeEventListener('mousemove', handleMouseMove as EventListener)

      if (elementRef?.current) {
        elementRef.current.removeEventListener('mouseleave', handleMouseLeave)
      }

      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current)
      }
    }
  }, [handleMouseMove, handleMouseLeave, elementRef])

  return position
}

/**
 * Hook simplificado para uso com efeito flashlight
 * Retorna posição relativa ao elemento
 */
export function useFlashlightPosition(elementRef: React.RefObject<HTMLElement | null>) {
  return useMousePosition({
    elementRef,
    trackOnlyWhenInside: false,
    throttleMs: 16,
  })
}

/**
 * Hook para detectar se é touch device
 */
export function useIsTouchDevice() {
  const [isTouch, setIsTouch] = useState(false)

  useEffect(() => {
    const checkTouch = () => {
      setIsTouch(
        'ontouchstart' in window ||
        navigator.maxTouchPoints > 0
      )
    }

    checkTouch()
    window.addEventListener('touchstart', () => setIsTouch(true), { once: true })
  }, [])

  return isTouch
}

/**
 * Hook para media query com SSR safety
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    const media = window.matchMedia(query)

    const updateMatch = () => setMatches(media.matches)

    // Initial check
    updateMatch()

    // Listen for changes
    media.addEventListener('change', updateMatch)

    return () => media.removeEventListener('change', updateMatch)
  }, [query])

  return matches
}

export default useMousePosition
