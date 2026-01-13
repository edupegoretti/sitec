"use client";

import { motion, useReducedMotion } from "framer-motion";
import { durations, easings } from "@/lib/motion";
import { useState } from "react";

// Node definitions for the revenue architecture flow
const NODES = [
  {
    id: "leadgen",
    label: "Lead Generation",
    sublabel: "Marketing captação",
    color: "#3B82F6", // blue
    bgColor: "rgba(59, 130, 246, 0.1)",
    borderColor: "rgba(59, 130, 246, 0.2)",
    metrics: { volume: "1,200", conversion: "35%", quality: "Alta" },
    position: { x: 50, y: 50 },
  },
  {
    id: "qualification",
    label: "Qualification",
    sublabel: "Lead scoring",
    color: "#8B5CF6", // purple
    bgColor: "rgba(139, 92, 246, 0.1)",
    borderColor: "rgba(139, 92, 246, 0.2)",
    metrics: { volume: "420", conversion: "65%", quality: "Média" },
    position: { x: 250, y: 50 },
  },
  {
    id: "sales",
    label: "Sales",
    sublabel: "Pipeline estruturado",
    color: "#635BFF", // brand
    bgColor: "rgba(99, 91, 255, 0.1)",
    borderColor: "rgba(99, 91, 255, 0.2)",
    metrics: { volume: "273", conversion: "45%", quality: "Alta" },
    position: { x: 450, y: 50 },
  },
  {
    id: "onboarding",
    label: "Onboarding",
    sublabel: "Implementação",
    color: "#F59E0B", // amber
    bgColor: "rgba(245, 158, 11, 0.1)",
    borderColor: "rgba(245, 158, 11, 0.2)",
    metrics: { volume: "123", conversion: "90%", quality: "Alta" },
    position: { x: 250, y: 180 },
  },
  {
    id: "retention",
    label: "Retention & Expansion",
    sublabel: "CS + Upsell",
    color: "#10B981", // emerald
    bgColor: "rgba(16, 185, 129, 0.1)",
    borderColor: "rgba(16, 185, 129, 0.2)",
    metrics: { volume: "111", conversion: "125%", quality: "Excelente" },
    position: { x: 50, y: 180 },
  },
] as const;

// Connections between nodes
const CONNECTIONS = [
  { from: "leadgen", to: "qualification" },
  { from: "qualification", to: "sales" },
  { from: "sales", to: "onboarding" },
  { from: "onboarding", to: "retention" },
  { from: "retention", to: "leadgen" }, // ciclo de referência
] as const;

export function RevenueArchitectureDiagram() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const transition = {
    duration: durations.medium,
    ease: easings.premium,
  };

  // Get node position by id
  const getNodePosition = (nodeId: string) => {
    const node = NODES.find((n) => n.id === nodeId);
    return node ? node.position : { x: 0, y: 0 };
  };

  return (
    <div className="relative w-full bg-white rounded-2xl shadow-elevated border border-gray-100 p-6 sm:p-8 overflow-hidden">
      {/* Title */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900">
          Arquitetura de Receita
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          Fluxo completo de geração e retenção de receita
        </p>
      </div>

      {/* SVG Diagram */}
      <div className="relative" style={{ minHeight: "280px" }}>
        <svg
          viewBox="0 0 550 250"
          className="w-full h-auto"
          style={{ maxHeight: "300px" }}
        >
          {/* Definitions for gradients */}
          <defs>
            <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="25%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#635BFF" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#F59E0B" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
            </linearGradient>

            {/* Arrow marker */}
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="10"
              refX="9"
              refY="3"
              orient="auto"
            >
              <polygon
                points="0 0, 10 3, 0 6"
                fill="url(#flowGradient)"
                opacity="0.6"
              />
            </marker>
          </defs>

          {/* Connection lines */}
          {CONNECTIONS.map((connection, index) => {
            const fromPos = getNodePosition(connection.from);
            const toPos = getNodePosition(connection.to);

            // Calculate midpoint for curved path
            const midX = (fromPos.x + toPos.x) / 2;
            const midY = (fromPos.y + toPos.y) / 2;
            const offsetY = connection.from === "retention" ? 40 : 0;

            return (
              <motion.path
                key={`${connection.from}-${connection.to}`}
                d={`M ${fromPos.x + 80} ${fromPos.y + 30} Q ${midX} ${midY + offsetY}, ${toPos.x + 20} ${toPos.y + 30}`}
                stroke="url(#flowGradient)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="4 4"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{
                  ...transition,
                  delay: 0.5 + index * 0.2,
                  duration: durations.slow,
                }}
              />
            );
          })}

          {/* Nodes */}
          {NODES.map((node, index) => (
            <g
              key={node.id}
              transform={`translate(${node.position.x}, ${node.position.y})`}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
              className="cursor-pointer"
            >
              {/* Node background */}
              <motion.rect
                x="0"
                y="0"
                width="160"
                height="60"
                rx="12"
                fill={hoveredNode === node.id ? node.color : node.bgColor}
                stroke={node.borderColor}
                strokeWidth="2"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: hoveredNode === node.id ? 1.05 : 1,
                  opacity: 1,
                }}
                transition={{
                  ...transition,
                  delay: 0.3 + index * 0.15,
                  scale: { duration: 0.2 },
                }}
              />

              {/* Node icon circle */}
              <motion.circle
                cx="20"
                cy="30"
                r="8"
                fill={node.color}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  ...transition,
                  delay: 0.4 + index * 0.15,
                }}
              />

              {/* Node label */}
              <text
                x="35"
                y="25"
                fontSize="11"
                fontWeight="600"
                fill={hoveredNode === node.id ? "white" : "#1F2937"}
              >
                {node.label}
              </text>

              {/* Node sublabel */}
              <text
                x="35"
                y="40"
                fontSize="9"
                fill={hoveredNode === node.id ? "rgba(255,255,255,0.8)" : "#6B7280"}
              >
                {node.sublabel}
              </text>

              {/* Metrics badge */}
              {hoveredNode === node.id && (
                <motion.rect
                  x="40"
                  y="45"
                  width="110"
                  height="10"
                  rx="5"
                  fill="rgba(255, 255, 255, 0.2)"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                />
              )}
              {hoveredNode === node.id && (
                <motion.text
                  x="95"
                  y="53"
                  fontSize="7"
                  fill="white"
                  textAnchor="middle"
                  fontWeight="500"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2, delay: 0.1 }}
                >
                  Conv: {node.metrics.conversion}
                </motion.text>
              )}
            </g>
          ))}
        </svg>

        {/* Metrics overlay - shown when hovering */}
        {hoveredNode && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-0 left-0 right-0 bg-linear-to-r from-brand/5 via-purple-500/5 to-emerald-500/5 rounded-2xl p-4 border-t border-gray-100"
          >
            {NODES.filter((n) => n.id === hoveredNode).map((node) => (
              <div key={node.id} className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-xs text-gray-500">Volume</p>
                  <p className="text-base font-bold text-gray-900">
                    {node.metrics.volume}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Conversão</p>
                  <p className="text-base font-bold" style={{ color: node.color }}>
                    {node.metrics.conversion}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Qualidade</p>
                  <p className="text-base font-bold text-gray-900">
                    {node.metrics.quality}
                  </p>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span>Marketing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-purple-500" />
            <span>Qualificação</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-brand" />
            <span>Vendas</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Onboarding</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>CS + Expansão</span>
          </div>
        </div>
      </div>
    </div>
  );
}
