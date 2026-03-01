import ky from 'ky'

import { env } from './env'

const apiClient = ky.create({
  prefixUrl: env.VITE_API_URL,
})

export default apiClient
