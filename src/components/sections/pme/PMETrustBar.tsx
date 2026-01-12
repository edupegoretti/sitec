'use client'

import Image from 'next/image'
import { Trophy, UsersThree } from '@phosphor-icons/react'
import { Container } from '@/components/layout'
import { ZOPU_STATS } from '@/lib/constants'

export function PMETrustBar() {
  return (
    <section className="py-8 bg-bg-dark">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 text-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
              <Trophy size={20} weight="duotone" className="text-brand" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">{ZOPU_STATS.retencao}</p>
              <p className="text-xs text-gray-400">retenção</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-700" />
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center">
              <UsersThree size={20} weight="duotone" className="text-brand" />
            </div>
            <div className="text-left">
              <p className="text-2xl font-bold text-white">{ZOPU_STATS.clientes}</p>
              <p className="text-xs text-gray-400">clientes</p>
            </div>
          </div>
          <div className="hidden sm:block w-px h-12 bg-gray-700" />
          <div className="flex items-center gap-3">
            <Image
              src="/images/bitrix24screen/gold-partner.png"
              alt="Gold Partner Bitrix24"
              width={48}
              height={48}
              className="w-12 h-12 object-contain"
            />
            <div className="text-left">
              <p className="text-sm font-semibold text-white">Gold Partner</p>
              <p className="text-xs text-gray-400">Bitrix24</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
