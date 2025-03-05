'use client'

import { useEffect } from 'react'
import { refreshTokens } from '@/shared/utils/dal'

interface TokenRefresherProps {
  needsRefresh: boolean
  userId: number
  email: string
  refreshToken: string
}

export default function TokenRefresher({ needsRefresh, userId, email, refreshToken }: TokenRefresherProps) {
  useEffect(() => {
    if (needsRefresh) {
      refreshTokens(userId, email, refreshToken)
        .catch(error => console.error("Failed to refresh tokens:", error))
    }
  }, [needsRefresh, userId, email, refreshToken])
  
  return null // This component doesn't render anything
}