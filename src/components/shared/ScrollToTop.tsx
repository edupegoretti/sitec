'use client'

import { useEffect } from 'react'

/**
 * Client component that scrolls to top on mount.
 * Used to fix mobile scroll restoration issues where the page
 * opens at a saved scroll position instead of the top.
 */
export function ScrollToTop() {
  useEffect(() => {
    // Small timeout to ensure this runs after any browser/widget scroll restoration
    const timer = setTimeout(() => {
      window.scrollTo(0, 0)
    }, 0)

    return () => clearTimeout(timer)
  }, [])

  return null
}
