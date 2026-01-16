import { defineEnableDraftMode } from 'next-sanity/draft-mode'
import { NextResponse } from 'next/server'

import { client } from '@/sanity/lib/client'

// Only enable draft mode if Sanity client is configured
export const GET = client
  ? defineEnableDraftMode({
      client: client.withConfig({ token: process.env.SANITY_API_READ_TOKEN }),
    }).GET
  : () => NextResponse.json({ error: 'Sanity not configured' }, { status: 503 })

