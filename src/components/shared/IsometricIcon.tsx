'use client'

import { ReactNode } from 'react'

interface IsometricIconProps {
  icon: 'crm' | 'copilot' | 'projetos' | 'comunicacao' | 'marketing' | 'rh' | 'sites'
  size?: number
  color?: string
  className?: string
}

/**
 * Ícones isométricos com linguagem visual consistente
 * - Perspectiva 30° em todos os shapes
 * - Sistema de luz: topo = claro, direita = médio, esquerda = escuro
 * - Sem círculos ou elipses - apenas blocos isométricos
 * - Peso visual uniforme
 */
export function IsometricIcon({
  icon,
  size = 64,
  color = '#635BFF',
  className,
}: IsometricIconProps) {
  const icons: Record<string, ReactNode> = {
    // CRM & Vendas - Dashboard com 3 barras ascendentes
    crm: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Base plate */}
        <path d="M32 54L6 39V35L32 50V54Z" fill={color} fillOpacity="0.2" />
        <path d="M32 54L58 39V35L32 50V54Z" fill={color} fillOpacity="0.3" />
        <path d="M6 35L32 20L58 35L32 50L6 35Z" fill={color} fillOpacity="0.15" />

        {/* Bar 1 - short */}
        <path d="M14 38L14 32L22 37L22 43L14 38Z" fill={color} fillOpacity="0.3" />
        <path d="M22 43L22 37L28 34L28 40L22 43Z" fill={color} fillOpacity="0.6" />
        <path d="M14 32L22 27L28 30L22 37L14 32Z" fill={color} fillOpacity="0.9" />

        {/* Bar 2 - medium */}
        <path d="M26 36L26 24L34 29L34 41L26 36Z" fill={color} fillOpacity="0.3" />
        <path d="M34 41L34 29L40 26L40 38L34 41Z" fill={color} fillOpacity="0.6" />
        <path d="M26 24L34 19L40 22L34 29L26 24Z" fill={color} fillOpacity="0.9" />

        {/* Bar 3 - tall */}
        <path d="M38 34L38 16L46 21L46 39L38 34Z" fill={color} fillOpacity="0.3" />
        <path d="M46 39L46 21L52 18L52 36L46 39Z" fill={color} fillOpacity="0.6" />
        <path d="M38 16L46 11L52 14L46 21L38 16Z" fill={color} fillOpacity="0.9" />
      </svg>
    ),

    // IA CoPilot - Cubo com chip neural
    copilot: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Cubo externo */}
        <path d="M32 56L8 42V18L32 32V56Z" fill={color} fillOpacity="0.25" />
        <path d="M32 56L56 42V18L32 32V56Z" fill={color} fillOpacity="0.45" />
        <path d="M8 18L32 4L56 18L32 32L8 18Z" fill={color} fillOpacity="0.15" />

        {/* Núcleo central - cubo menor */}
        <path d="M32 44L20 37V25L32 32V44Z" fill={color} fillOpacity="0.4" />
        <path d="M32 44L44 37V25L32 32V44Z" fill={color} fillOpacity="0.7" />
        <path d="M20 25L32 18L44 25L32 32L20 25Z" fill={color} />

        {/* Conexões - linhas de circuito isométricas */}
        <path d="M14 22L20 25" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M50 22L44 25" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M32 10L32 18" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M20 37L14 40" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M44 37L50 40" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M32 44L32 50" stroke={color} strokeWidth="2" strokeOpacity="0.5" />

        {/* Nós de conexão - pequenos cubos */}
        <path d="M12 21L14 20L16 21L14 22L12 21Z" fill={color} fillOpacity="0.8" />
        <path d="M48 21L50 20L52 21L50 22L48 21Z" fill={color} fillOpacity="0.8" />
        <path d="M30 9L32 8L34 9L32 10L30 9Z" fill={color} fillOpacity="0.8" />
        <path d="M12 41L14 40L16 41L14 42L12 41Z" fill={color} fillOpacity="0.8" />
        <path d="M48 41L50 40L52 41L50 42L48 41Z" fill={color} fillOpacity="0.8" />
        <path d="M30 51L32 50L34 51L32 52L30 51Z" fill={color} fillOpacity="0.8" />
      </svg>
    ),

    // Projetos & Tarefas - Kanban com 3 colunas
    projetos: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Board base */}
        <path d="M32 56L4 38V14L32 32V56Z" fill={color} fillOpacity="0.2" />
        <path d="M32 56L60 38V14L32 32V56Z" fill={color} fillOpacity="0.35" />
        <path d="M4 14L32 -2L60 14L32 32L4 14Z" fill={color} fillOpacity="0.1" />

        {/* Coluna 1 - 2 cards */}
        <path d="M10 28L10 22L18 27L18 33L10 28Z" fill={color} fillOpacity="0.35" />
        <path d="M18 33L18 27L22 25L22 31L18 33Z" fill={color} fillOpacity="0.65" />
        <path d="M10 22L18 17L22 19L18 27L10 22Z" fill={color} />

        <path d="M10 38L10 32L18 37L18 43L10 38Z" fill={color} fillOpacity="0.25" />
        <path d="M18 43L18 37L22 35L22 41L18 43Z" fill={color} fillOpacity="0.5" />
        <path d="M10 32L18 27L22 29L18 37L10 32Z" fill={color} fillOpacity="0.8" />

        {/* Coluna 2 - 1 card */}
        <path d="M26 26L26 18L34 23L34 31L26 26Z" fill={color} fillOpacity="0.35" />
        <path d="M34 31L34 23L38 21L38 29L34 31Z" fill={color} fillOpacity="0.65" />
        <path d="M26 18L34 13L38 15L34 23L26 18Z" fill={color} />

        {/* Coluna 3 - 2 cards */}
        <path d="M42 24L42 16L50 21L50 29L42 24Z" fill={color} fillOpacity="0.35" />
        <path d="M50 29L50 21L54 19L54 27L50 29Z" fill={color} fillOpacity="0.65" />
        <path d="M42 16L50 11L54 13L50 21L42 16Z" fill={color} />

        <path d="M42 34L42 28L50 33L50 39L42 34Z" fill={color} fillOpacity="0.25" />
        <path d="M50 39L50 33L54 31L54 37L50 39Z" fill={color} fillOpacity="0.5" />
        <path d="M42 28L50 23L54 25L50 33L42 28Z" fill={color} fillOpacity="0.8" />
      </svg>
    ),

    // Comunicação - Chat boxes empilhados
    comunicacao: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Chat box 1 - traseiro */}
        <path d="M28 36L10 26V14L28 24V36Z" fill={color} fillOpacity="0.25" />
        <path d="M28 36L46 26V14L28 24V36Z" fill={color} fillOpacity="0.45" />
        <path d="M10 14L28 4L46 14L28 24L10 14Z" fill={color} fillOpacity="0.15" />

        {/* Linhas de texto box 1 */}
        <path d="M18 17L38 17" stroke={color} strokeWidth="2" strokeOpacity="0.6" />
        <path d="M20 21L36 21" stroke={color} strokeWidth="2" strokeOpacity="0.4" />

        {/* Chat box 2 - frontal */}
        <path d="M36 54L18 44V30L36 40V54Z" fill={color} fillOpacity="0.35" />
        <path d="M36 54L54 44V30L36 40V54Z" fill={color} fillOpacity="0.6" />
        <path d="M18 30L36 20L54 30L36 40L18 30Z" fill={color} fillOpacity="0.25" />

        {/* Conteúdo box 2 - blocos de texto isométricos */}
        <path d="M24 33L24 31L32 35L32 37L24 33Z" fill={color} fillOpacity="0.5" />
        <path d="M32 37L32 35L44 29L44 31L32 37Z" fill={color} fillOpacity="0.7" />
        <path d="M24 31L32 27L44 33L32 37L24 31Z" fill={color} fillOpacity="0.9" />

        {/* Seta/tail do chat 1 */}
        <path d="M12 28L8 30L12 32V28Z" fill={color} fillOpacity="0.35" />

        {/* Seta/tail do chat 2 */}
        <path d="M52 46L56 48L52 50V46Z" fill={color} fillOpacity="0.55" />
      </svg>
    ),

    // Marketing - Megafone isométrico
    marketing: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Corpo do megafone - parte traseira */}
        <path d="M18 44L8 38V22L18 28V44Z" fill={color} fillOpacity="0.3" />
        <path d="M18 44L28 38V22L18 28V44Z" fill={color} fillOpacity="0.55" />
        <path d="M8 22L18 16L28 22L18 28L8 22Z" fill={color} fillOpacity="0.2" />

        {/* Cone do megafone */}
        <path d="M28 38L28 22L48 12V28L28 38Z" fill={color} fillOpacity="0.4" />
        <path d="M28 22L48 6L48 12L28 22Z" fill={color} fillOpacity="0.6" />
        <path d="M48 28L48 12L56 8V24L48 28Z" fill={color} fillOpacity="0.8" />
        <path d="M48 12L56 6L56 8L48 12Z" fill={color} />

        {/* Handle */}
        <path d="M14 52L10 50V42L14 44V52Z" fill={color} fillOpacity="0.35" />
        <path d="M14 52L18 50V42L14 44V52Z" fill={color} fillOpacity="0.6" />
        <path d="M10 42L14 40L18 42L14 44L10 42Z" fill={color} fillOpacity="0.8" />

        {/* Ondas sonoras - blocos isométricos */}
        <path d="M54 16L58 14L58 18L54 20L54 16Z" fill={color} fillOpacity="0.5" />
        <path d="M58 12L62 10L62 14L58 16L58 12Z" fill={color} fillOpacity="0.35" />
        <path d="M54 22L58 20L58 24L54 26L54 22Z" fill={color} fillOpacity="0.4" />
      </svg>
    ),

    // RH & Automação - Organograma isométrico
    rh: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Pessoa central (topo) - cubo */}
        <path d="M32 24L24 19V11L32 16V24Z" fill={color} fillOpacity="0.35" />
        <path d="M32 24L40 19V11L32 16V24Z" fill={color} fillOpacity="0.6" />
        <path d="M24 11L32 6L40 11L32 16L24 11Z" fill={color} />

        {/* Linhas de conexão */}
        <path d="M32 24L32 32" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M20 36L32 32L44 36" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M20 36L20 40" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
        <path d="M44 36L44 40" stroke={color} strokeWidth="2" strokeOpacity="0.5" />

        {/* Pessoa esquerda - cubo */}
        <path d="M20 52L12 47V39L20 44V52Z" fill={color} fillOpacity="0.3" />
        <path d="M20 52L28 47V39L20 44V52Z" fill={color} fillOpacity="0.55" />
        <path d="M12 39L20 34L28 39L20 44L12 39Z" fill={color} fillOpacity="0.85" />

        {/* Pessoa central inferior - cubo */}
        <path d="M32 56L24 51V43L32 48V56Z" fill={color} fillOpacity="0.3" />
        <path d="M32 56L40 51V43L32 48V56Z" fill={color} fillOpacity="0.55" />
        <path d="M24 43L32 38L40 43L32 48L24 43Z" fill={color} fillOpacity="0.85" />

        {/* Pessoa direita - cubo */}
        <path d="M44 52L36 47V39L44 44V52Z" fill={color} fillOpacity="0.3" />
        <path d="M44 52L52 47V39L44 44V52Z" fill={color} fillOpacity="0.55" />
        <path d="M36 39L44 34L52 39L44 44L36 39Z" fill={color} fillOpacity="0.85" />

        {/* Conexão central inferior */}
        <path d="M32 32L32 38" stroke={color} strokeWidth="2" strokeOpacity="0.5" />
      </svg>
    ),

    // Sites & E-commerce - Browser window isométrico
    sites: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Browser frame */}
        <path d="M32 58L4 42V10L32 26V58Z" fill={color} fillOpacity="0.25" />
        <path d="M32 58L60 42V10L32 26V58Z" fill={color} fillOpacity="0.45" />
        <path d="M4 10L32 -6L60 10L32 26L4 10Z" fill={color} fillOpacity="0.15" />

        {/* Barra de título */}
        <path d="M4 14L32 -2L60 14L32 30L4 14Z" fill={color} fillOpacity="0.3" />
        <path d="M8 10L10 9L12 10L10 11L8 10Z" fill={color} fillOpacity="0.6" />
        <path d="M14 8L16 7L18 8L16 9L14 8Z" fill={color} fillOpacity="0.6" />
        <path d="M20 6L22 5L24 6L22 7L20 6Z" fill={color} fillOpacity="0.6" />

        {/* Conteúdo - bloco de hero */}
        <path d="M12 30L12 22L28 31L28 39L12 30Z" fill={color} fillOpacity="0.4" />
        <path d="M28 39L28 31L36 27L36 35L28 39Z" fill={color} fillOpacity="0.65" />
        <path d="M12 22L28 13L36 17L28 31L12 22Z" fill={color} fillOpacity="0.9" />

        {/* Conteúdo - sidebar */}
        <path d="M40 33L40 23L48 28L48 38L40 33Z" fill={color} fillOpacity="0.35" />
        <path d="M48 38L48 28L52 26L52 36L48 38Z" fill={color} fillOpacity="0.55" />
        <path d="M40 23L48 18L52 20L48 28L40 23Z" fill={color} fillOpacity="0.8" />

        {/* Conteúdo - bloco inferior */}
        <path d="M12 44L12 38L28 47L28 53L12 44Z" fill={color} fillOpacity="0.3" />
        <path d="M28 53L28 47L36 43L36 49L28 53Z" fill={color} fillOpacity="0.5" />
        <path d="M12 38L28 29L36 33L28 47L12 38Z" fill={color} fillOpacity="0.7" />
      </svg>
    ),
  }

  return (
    <div
      className={className}
      style={{ width: size, height: size }}
    >
      {icons[icon]}
    </div>
  )
}
