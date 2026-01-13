'use client'

import { motion } from 'framer-motion'

/**
 * IAOrchestrationVisual - Fluxo limpo: Dados → IA → Resultados
 * Sem excessos decorativos, foco na clareza
 */
export function IAOrchestrationVisual() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full">
      {/* Background sólido */}
      <rect width="400" height="200" fill="#0f172a" />

      {/* === FONTES DE DADOS (Esquerda) === */}
      <g>
        {/* CRM */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <rect x="20" y="25" width="80" height="36" rx="6" fill="#1e293b" />
          <text x="60" y="48" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="500">CRM</text>
        </motion.g>

        {/* WhatsApp */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <rect x="20" y="82" width="80" height="36" rx="6" fill="#1e293b" />
          <text x="60" y="105" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="500">WhatsApp</text>
        </motion.g>

        {/* ERP */}
        <motion.g
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <rect x="20" y="139" width="80" height="36" rx="6" fill="#1e293b" />
          <text x="60" y="162" textAnchor="middle" fill="#e2e8f0" fontSize="11" fontWeight="500">ERP</text>
        </motion.g>
      </g>

      {/* === LINHAS DE FLUXO (Entrada) === */}
      <g>
        <motion.path
          d="M 100 43 C 130 43 140 100 160 100"
          fill="none"
          stroke="#635BFF"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        />
        <motion.path
          d="M 100 100 L 160 100"
          fill="none"
          stroke="#635BFF"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        />
        <motion.path
          d="M 100 157 C 130 157 140 100 160 100"
          fill="none"
          stroke="#635BFF"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        />
      </g>

      {/* === IA CENTRAL === */}
      <motion.g
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4 }}
      >
        <circle cx="200" cy="100" r="38" fill="#1e293b" stroke="#635BFF" strokeWidth="2" />
        <text x="200" y="95" textAnchor="middle" fill="#635BFF" fontSize="14" fontWeight="bold">AI</text>
        <text x="200" y="112" textAnchor="middle" fill="#94a3b8" fontSize="9">Copilot</text>
      </motion.g>

      {/* === LINHAS DE FLUXO (Saída) === */}
      <g>
        <motion.path
          d="M 240 100 C 260 100 270 43 290 43"
          fill="none"
          stroke="#22c55e"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        />
        <motion.path
          d="M 240 100 L 290 100"
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        />
        <motion.path
          d="M 240 100 C 260 100 270 157 290 157"
          fill="none"
          stroke="#635BFF"
          strokeWidth="2"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        />
      </g>

      {/* === OUTPUTS (Direita) === */}
      <g>
        {/* Lead Score */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8 }}
        >
          <rect x="290" y="25" width="90" height="36" rx="6" fill="#1e293b" />
          <rect x="290" y="25" width="3" height="36" rx="1.5" fill="#22c55e" />
          <text x="300" y="40" fill="#94a3b8" fontSize="8">Lead Score</text>
          <text x="300" y="54" fill="#22c55e" fontSize="13" fontWeight="bold">87%</text>
        </motion.g>

        {/* Próxima Ação */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
        >
          <rect x="290" y="82" width="90" height="36" rx="6" fill="#1e293b" />
          <rect x="290" y="82" width="3" height="36" rx="1.5" fill="#f59e0b" />
          <text x="300" y="97" fill="#94a3b8" fontSize="8">Próxima Ação</text>
          <text x="300" y="111" fill="#f59e0b" fontSize="13" fontWeight="bold">Follow-up</text>
        </motion.g>

        {/* Previsão */}
        <motion.g
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1 }}
        >
          <rect x="290" y="139" width="90" height="36" rx="6" fill="#1e293b" />
          <rect x="290" y="139" width="3" height="36" rx="1.5" fill="#635BFF" />
          <text x="300" y="154" fill="#94a3b8" fontSize="8">Previsão</text>
          <text x="300" y="168" fill="#635BFF" fontSize="13" fontWeight="bold">Alta</text>
        </motion.g>
      </g>
    </svg>
  )
}
