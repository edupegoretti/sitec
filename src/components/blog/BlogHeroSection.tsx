'use client'

import { motion } from 'framer-motion'
import { Badge } from '@/components/shared'
import { cn } from '@/lib/utils'

type Props = {
  totalPosts: number
  totalCategories: number
  className?: string
}

export function BlogHeroSection({ totalPosts, totalCategories, className }: Props) {
  return (
    <section className={cn('py-12 sm:py-16 bg-gradient-to-b from-gray-50 to-white', className)}>
      <div className="max-w-4xl mx-auto text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge className="mb-6">Blog</Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4"
        >
          Arquitetura de Receita na Prática
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Conteúdo para transformar seu CRM de cadastro em receita previsível.
          Processo, governança e adoção que funcionam.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand" />
            {totalPosts} artigos
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {totalCategories} categorias
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            5 estágios
          </span>
        </motion.div>
      </div>
    </section>
  )
}
