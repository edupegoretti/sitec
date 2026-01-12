'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import {
  ChartLineUp,
  ListChecks,
  ChatCenteredDots,
  Robot,
  MegaphoneSimple,
  UsersThree,
  Storefront,
} from '@phosphor-icons/react'

interface HubAndSpokeDiagramProps {
  className?: string
}

const categories = [
  { id: 'crm', label: 'CRM & Vendas', Icon: ChartLineUp, angle: 0 },
  { id: 'projetos', label: 'Projetos', Icon: ListChecks, angle: 51.4 },
  { id: 'comunicacao', label: 'Comunicação', Icon: ChatCenteredDots, angle: 102.8 },
  { id: 'ia', label: 'IA CoPilot', Icon: Robot, angle: 154.2 },
  { id: 'marketing', label: 'Marketing', Icon: MegaphoneSimple, angle: 205.6 },
  { id: 'rh', label: 'RH', Icon: UsersThree, angle: 257 },
  { id: 'sites', label: 'Sites', Icon: Storefront, angle: 308.4 },
]

export function HubAndSpokeDiagram({ className = '' }: HubAndSpokeDiagramProps) {
  const centerX = 400
  const centerY = 300
  const hubRadius = 80
  const spokeLength = 180
  const nodeRadius = 50

  return (
    <div className={`w-full h-full flex items-center justify-center ${className}`}>
      <svg
        viewBox="0 0 800 600"
        className="w-full h-auto max-w-4xl"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Gradients */}
          <linearGradient id="hub-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="1" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
          </linearGradient>

          <linearGradient id="spoke-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0.2" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Pulse animation */}
          <radialGradient id="pulse-gradient">
            <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Animated pulse from center */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={hubRadius}
          fill="url(#pulse-gradient)"
          initial={{ r: hubRadius, opacity: 0.6 }}
          animate={{ r: hubRadius + 60, opacity: 0 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        />

        {/* Spokes (connections) */}
        {categories.map((category, index) => {
          const angleRad = (category.angle * Math.PI) / 180
          const endX = centerX + Math.cos(angleRad) * (spokeLength + hubRadius)
          const endY = centerY + Math.sin(angleRad) * (spokeLength + hubRadius)

          return (
            <motion.g key={category.id}>
              {/* Spoke line */}
              <motion.line
                x1={centerX}
                y1={centerY}
                x2={endX}
                y2={endY}
                stroke="url(#spoke-gradient)"
                strokeWidth="2"
                strokeDasharray="5 5"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.1,
                  ease: 'easeOut',
                }}
              />

              {/* Animated particle along spoke */}
              <motion.circle
                r="3"
                fill="#7c3aed"
                filter="url(#glow)"
                initial={{ cx: centerX, cy: centerY }}
                animate={{
                  cx: [centerX, endX, centerX],
                  cy: [centerY, endY, centerY],
                }}
                transition={{
                  duration: 3,
                  delay: index * 0.4,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            </motion.g>
          )
        })}

        {/* Category nodes */}
        {categories.map((category, index) => {
          const angleRad = (category.angle * Math.PI) / 180
          const nodeX = centerX + Math.cos(angleRad) * (spokeLength + hubRadius)
          const nodeY = centerY + Math.sin(angleRad) * (spokeLength + hubRadius)

          // Label positioning
          const labelDistance = 25
          const labelX = nodeX + Math.cos(angleRad) * labelDistance
          const labelY = nodeY + Math.sin(angleRad) * labelDistance

          return (
            <motion.g
              key={category.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.8 + index * 0.1,
                type: 'spring',
                stiffness: 200,
              }}
            >
              {/* Node circle background */}
              <circle
                cx={nodeX}
                cy={nodeY}
                r={nodeRadius}
                fill="white"
                stroke="#e5e7eb"
                strokeWidth="2"
              />

              {/* Node icon container */}
              <circle
                cx={nodeX}
                cy={nodeY}
                r={nodeRadius - 10}
                fill="#f3f4f6"
              />

              {/* Icon placeholder - will be replaced with foreignObject for React icons */}
              <foreignObject
                x={nodeX - 20}
                y={nodeY - 20}
                width="40"
                height="40"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <category.Icon size={28} weight="duotone" className="text-brand" />
                </div>
              </foreignObject>

              {/* Label */}
              <foreignObject
                x={labelX - 60}
                y={labelY - 12}
                width="120"
                height="24"
              >
                <div className="flex items-center justify-center w-full h-full">
                  <span className="text-xs font-semibold text-gray-700 text-center whitespace-nowrap">
                    {category.label}
                  </span>
                </div>
              </foreignObject>
            </motion.g>
          )
        })}

        {/* Central Hub (Bitrix24) */}
        <motion.g
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            type: 'spring',
            stiffness: 200,
          }}
        >
          {/* Hub glow */}
          <circle
            cx={centerX}
            cy={centerY}
            r={hubRadius + 5}
            fill="url(#hub-gradient)"
            opacity="0.2"
            filter="url(#glow)"
          />

          {/* Hub main circle */}
          <circle
            cx={centerX}
            cy={centerY}
            r={hubRadius}
            fill="url(#hub-gradient)"
            filter="url(#glow)"
          />

          {/* Bitrix24 logo placeholder */}
          <foreignObject
            x={centerX - hubRadius + 10}
            y={centerY - hubRadius + 10}
            width={(hubRadius - 10) * 2}
            height={(hubRadius - 10) * 2}
          >
            <div className="flex flex-col items-center justify-center w-full h-full gap-2">
              <Image
                src="/images/Bitrix24_shortlogo.png"
                alt="Bitrix24"
                width={80}
                height={80}
                className="w-12 h-12 object-contain brightness-0 invert"
              />
              <span className="text-xs font-black text-white uppercase tracking-wider">
                Bitrix24
              </span>
            </div>
          </foreignObject>
        </motion.g>

        {/* Center connection indicator */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={hubRadius - 5}
          fill="none"
          stroke="white"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.4"
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{ transformOrigin: `${centerX}px ${centerY}px` }}
        />
      </svg>
    </div>
  )
}
