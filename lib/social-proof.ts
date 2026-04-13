// Social Proof Configuration
// These entries cycle in the social proof toast notification
// Now imports from content.ts for centralized management

import { content } from './content'

export interface SocialProofEntry {
  name: string
  city: string
  tier: string
  timeAgo: string
}

// Get entries from content.ts socialProof section
export const socialProofEntries: SocialProofEntry[] = content.socialProof?.items || [
  {
    name: 'Marco',
    city: 'Salerno',
    tier: 'LV2',
    timeAgo: '2 ore fa',
  },
  {
    name: 'Giulia',
    city: 'Napoli',
    tier: 'LV1',
    timeAgo: '4 ore fa',
  },
  {
    name: 'Antonio',
    city: 'Caserta',
    tier: 'LV1',
    timeAgo: '6 ore fa',
  },
  {
    name: 'Francesca',
    city: 'Roma',
    tier: 'LV2',
    timeAgo: '8 ore fa',
  },
  {
    name: 'Davide',
    city: 'Milano',
    tier: 'LV3',
    timeAgo: '12 ore fa',
  },
  {
    name: 'Simone',
    city: 'Bari',
    tier: 'LV1',
    timeAgo: '14 ore fa',
  },
  {
    name: 'Alessia',
    city: 'Torino',
    tier: 'LV2',
    timeAgo: '18 ore fa',
  },
  {
    name: 'Luca',
    city: 'Palermo',
    tier: 'LV1',
    timeAgo: '22 ore fa',
  },
]

// Configuration
export const socialProofConfig = {
  // Interval between notifications (in milliseconds)
  intervalMs: (content.socialProof?.intervalSeconds || 30) * 1000,
  
  // Duration each notification is shown (in milliseconds)
  displayDurationMs: 5000, // 5 seconds
  
  // Enable/disable social proof toasts
  enabled: content.socialProof?.enabled ?? true,
}
