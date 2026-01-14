import { defineCliConfig } from 'sanity/cli'

import { dataset, projectId } from './src/sanity/lib/env'

export default defineCliConfig({ api: { projectId, dataset } })

