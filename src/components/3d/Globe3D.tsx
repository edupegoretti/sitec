'use client'

import { useEffect, useRef, useCallback } from 'react'
import * as THREE from 'three'

interface Globe3DProps {
  size?: number
  className?: string
  dotColor?: string
  oceanColor?: string
  rotationSpeed?: number
  showLogo?: boolean
  logoSrc?: string
}

export function Globe3D({
  size = 240,
  className = '',
  dotColor = '#60a5fa',
  oceanColor = '#1e3a8a',
  rotationSpeed = 0.002,
  showLogo = true,
  logoSrc = '/images/bitrix24_logo.png',
}: Globe3DProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasContainerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null)
  const globeGroupRef = useRef<THREE.Group | null>(null)
  const frameIdRef = useRef<number>(0)
  const isVisibleRef = useRef(true)
  const prefersReducedMotion = useRef(false)

  const animate = useCallback(() => {
    if (!isVisibleRef.current || prefersReducedMotion.current) {
      frameIdRef.current = requestAnimationFrame(animate)
      return
    }

    if (globeGroupRef.current) {
      globeGroupRef.current.rotation.y += rotationSpeed
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current)
    }

    frameIdRef.current = requestAnimationFrame(animate)
  }, [rotationSpeed])

  useEffect(() => {
    if (!canvasContainerRef.current) return

    prefersReducedMotion.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const container = canvasContainerRef.current
    const width = size
    const height = size

    // Scene
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Orthographic camera for clean, flat look
    const frustumSize = 220
    const aspect = width / height
    const camera = new THREE.OrthographicCamera(
      -frustumSize * aspect / 2,
      frustumSize * aspect / 2,
      frustumSize / 2,
      -frustumSize / 2,
      1,
      1000
    )
    camera.position.z = 500
    cameraRef.current = camera

    // Renderer with antialiasing for smooth edges
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const radius = 90
    const globeGroup = new THREE.Group()
    scene.add(globeGroup)
    globeGroupRef.current = globeGroup

    // 1. Ocean sphere - solid dark blue
    const oceanGeometry = new THREE.SphereGeometry(radius, 64, 64)
    const oceanMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(oceanColor),
    })
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial)
    globeGroup.add(ocean)

    // 2. Generate dot positions using fibonacci sphere for even distribution
    const dotCount = 2000
    const dotPositions: THREE.Vector3[] = []
    const phi = Math.PI * (3 - Math.sqrt(5)) // Golden angle

    for (let i = 0; i < dotCount; i++) {
      const y = 1 - (i / (dotCount - 1)) * 2
      const radiusAtY = Math.sqrt(1 - y * y)
      const theta = phi * i

      const x = Math.cos(theta) * radiusAtY
      const z = Math.sin(theta) * radiusAtY

      // Convert to lat/lon for land detection
      const lat = Math.asin(y) * (180 / Math.PI)
      const lon = Math.atan2(z, x) * (180 / Math.PI)

      // Simplified continent detection
      const isLand =
        // North America
        (lat > 25 && lat < 70 && lon > -170 && lon < -50) ||
        // South America
        (lat > -55 && lat < 15 && lon > -80 && lon < -35) ||
        // Europe
        (lat > 35 && lat < 70 && lon > -10 && lon < 55) ||
        // Africa
        (lat > -35 && lat < 37 && lon > -20 && lon < 52) ||
        // Asia
        (lat > 5 && lat < 75 && lon > 55 && lon < 150) ||
        // Australia
        (lat > -45 && lat < -10 && lon > 110 && lon < 155) ||
        // India
        (lat > 8 && lat < 35 && lon > 68 && lon < 90)

      if (isLand) {
        dotPositions.push(new THREE.Vector3(
          x * (radius + 0.5),
          y * (radius + 0.5),
          z * (radius + 0.5)
        ))
      }
    }

    // 3. Create dots as small spheres for clean look
    const dotGeometry = new THREE.SphereGeometry(1.2, 6, 6)
    const dotMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(dotColor),
    })

    // Use instanced mesh for performance
    const instancedDots = new THREE.InstancedMesh(
      dotGeometry,
      dotMaterial,
      dotPositions.length
    )

    const dummy = new THREE.Object3D()
    dotPositions.forEach((pos, i) => {
      dummy.position.copy(pos)
      dummy.lookAt(0, 0, 0)
      dummy.updateMatrix()
      instancedDots.setMatrixAt(i, dummy.matrix)
    })

    globeGroup.add(instancedDots)

    // 4. Add subtle latitude lines
    const latitudes = [-45, 0, 45]
    latitudes.forEach(lat => {
      const latRad = (lat * Math.PI) / 180
      const latRadius = Math.cos(latRad) * radius
      const y = Math.sin(latRad) * radius

      const lineGeometry = new THREE.BufferGeometry()
      const linePoints: THREE.Vector3[] = []

      for (let i = 0; i <= 64; i++) {
        const angle = (i / 64) * Math.PI * 2
        linePoints.push(new THREE.Vector3(
          Math.cos(angle) * latRadius,
          y,
          Math.sin(angle) * latRadius
        ))
      }

      lineGeometry.setFromPoints(linePoints)
      const lineMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        opacity: 0.1,
        transparent: true,
      })
      const line = new THREE.Line(lineGeometry, lineMaterial)
      globeGroup.add(line)
    })

    // Intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        isVisibleRef.current = entries[0]?.isIntersecting ?? true
      },
      { threshold: 0.1 }
    )
    observer.observe(container)

    frameIdRef.current = requestAnimationFrame(animate)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frameIdRef.current)

      oceanGeometry.dispose()
      oceanMaterial.dispose()
      dotGeometry.dispose()
      dotMaterial.dispose()

      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [size, dotColor, oceanColor, animate])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: size,
        height: size,
        position: 'relative',
      }}
      aria-label="Globo 3D representando o Bitrix24"
      role="img"
    >
      {/* Canvas container */}
      <div
        ref={canvasContainerRef}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '50%',
          overflow: 'hidden',
          position: 'absolute',
          inset: 0,
        }}
      />

      {/* Bitrix24 Logo overlay */}
      {showLogo && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <img
            src={logoSrc}
            alt="Bitrix24"
            style={{
              width: '65%',
              maxWidth: 150,
              height: 'auto',
              opacity: 0.9,
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
            }}
          />
        </div>
      )}
    </div>
  )
}
