'use client'

interface JourneyVisualizationProps {
  color: string
}

export function JourneyVisualization({ color }: JourneyVisualizationProps) {
  return (
    <div className="w-full">
      <svg
        viewBox="0 0 720 200"
        className="w-full h-auto"
        aria-label="Revenue Performance Model"
      >
        {/* ===== FUNIL DE AQUISIÇÃO ===== */}

        {/* Título - Grande, statement */}
        <text
          x="200"
          y="28"
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontWeight="700"
          letterSpacing="-0.01em"
        >
          Aquisição
        </text>

        {/* Funil - Forma sólida, sem borda */}
        <path
          d="M 40 50 L 360 50 L 330 170 L 70 170 Z"
          fill={color}
          opacity="0.15"
        />

        {/* Estágios - Apenas texto, sem decoração */}
        <text x="80" y="90" fill="white" fontSize="11" fontWeight="600">Sessions</text>
        <text x="80" y="108" fill="white" opacity="0.4" fontSize="10">V1</text>

        <text x="140" y="100" fill="white" fontSize="11" fontWeight="600">Leads</text>
        <text x="140" y="118" fill="white" opacity="0.4" fontSize="10">V2</text>

        <text x="195" y="108" fill="white" fontSize="11" fontWeight="600">MQLs</text>
        <text x="195" y="126" fill="white" opacity="0.4" fontSize="10">V3</text>

        <text x="245" y="116" fill="white" fontSize="11" fontWeight="600">SQLs</text>
        <text x="245" y="134" fill="white" opacity="0.4" fontSize="10">V4</text>

        <text x="290" y="124" fill="white" fontSize="11" fontWeight="600">Opps</text>
        <text x="290" y="142" fill="white" opacity="0.4" fontSize="10">V5</text>

        <text x="335" y="130" fill="white" fontSize="11" fontWeight="700">Won</text>
        <text x="335" y="148" fill={color} fontSize="10" fontWeight="600">V6</text>

        {/* Conversões - Uma linha simples */}
        <text x="200" y="185" textAnchor="middle" fill="white" opacity="0.35" fontSize="9">
          CR1 → CR2 → CR3 → CR4 → CR5
        </text>

        {/* ===== CONEXÃO ===== */}

        <line
          x1="370"
          y1="110"
          x2="430"
          y2="110"
          stroke="white"
          strokeWidth="1"
          opacity="0.2"
        />
        <text x="400" y="100" textAnchor="middle" fill="white" opacity="0.3" fontSize="9">
          Onboarding
        </text>

        {/* ===== FLYWHEEL DE RETENÇÃO ===== */}

        {/* Título */}
        <text
          x="560"
          y="28"
          textAnchor="middle"
          fill="white"
          fontSize="13"
          fontWeight="700"
          letterSpacing="-0.01em"
        >
          Retenção
        </text>

        {/* Círculo principal - Sólido, sem borda */}
        <circle
          cx="560"
          cy="110"
          r="70"
          fill="#10B981"
          opacity="0.12"
        />

        {/* Centro - Destaque forte */}
        <circle
          cx="560"
          cy="110"
          r="28"
          fill="#10B981"
          opacity="0.25"
        />
        <text x="560" y="106" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          Receita
        </text>
        <text x="560" y="120" textAnchor="middle" fill="white" fontSize="10" fontWeight="700">
          Recorrente
        </text>

        {/* Métricas ao redor - Posicionadas manualmente para clareza */}
        <text x="560" y="52" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Net New</text>
        <text x="560" y="63" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="600">V8</text>

        <text x="618" y="85" textAnchor="start" fill="white" fontSize="9" fontWeight="500">Cross-Sell</text>
        <text x="618" y="96" textAnchor="start" fill="#10B981" fontSize="8" fontWeight="600">V9</text>

        <text x="618" y="130" textAnchor="start" fill="white" fontSize="9" fontWeight="500">Upgrades</text>
        <text x="618" y="141" textAnchor="start" fill="#10B981" fontSize="8" fontWeight="600">V10</text>

        <text x="560" y="168" textAnchor="middle" fill="white" fontSize="9" fontWeight="500">Renewal</text>
        <text x="560" y="179" textAnchor="middle" fill="#10B981" fontSize="8" fontWeight="600">V13</text>

        <text x="502" y="130" textAnchor="end" fill="white" opacity="0.5" fontSize="9" fontWeight="500">Churn</text>
        <text x="502" y="141" textAnchor="end" fill="#EF4444" fontSize="8" fontWeight="600">V12</text>

        <text x="502" y="85" textAnchor="end" fill="white" opacity="0.5" fontSize="9" fontWeight="500">Downgrades</text>
        <text x="502" y="96" textAnchor="end" fill="#F59E0B" fontSize="8" fontWeight="600">V11</text>

        {/* Seta de rotação - Única, sutil */}
        <path
          d="M 590 55 A 55 55 0 0 1 615 85"
          fill="none"
          stroke="#10B981"
          strokeWidth="2"
          opacity="0.4"
        />
        <polygon
          points="615,80 620,90 610,88"
          fill="#10B981"
          opacity="0.4"
        />

        {/* Indicadores V7/V13 - Discretos */}
        <text x="475" y="70" textAnchor="end" fill="#10B981" opacity="0.5" fontSize="8">
          Start V7 →
        </text>
        <text x="475" y="155" textAnchor="end" fill="#10B981" opacity="0.5" fontSize="8">
          End V13 →
        </text>
      </svg>
    </div>
  )
}

export default JourneyVisualization
