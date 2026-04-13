// Social Proof Configuration
// These entries cycle in the social proof toast notification

export interface SocialProofEntry {
  name: string
  city: string
  tier: 'LV1' | 'LV2' | 'LV3'
  timeAgo: string
}

export const socialProofEntries: SocialProofEntry[] = [
  {
    name: 'Marco',
    city: 'Napoli',
    tier: 'LV2',
    timeAgo: '2 ore fa',
  },
  {
    name: 'Giulia',
    city: 'Milano',
    tier: 'LV1',
    timeAgo: '4 ore fa',
  },
  {
    name: 'Alessandro',
    city: 'Roma',
    tier: 'LV3',
    timeAgo: '5 ore fa',
  },
  {
    name: 'Francesca',
    city: 'Torino',
    tier: 'LV2',
    timeAgo: '7 ore fa',
  },
  {
    name: 'Luca',
    city: 'Bologna',
    tier: 'LV1',
    timeAgo: '12 ore fa',
  },
  {
    name: 'Chiara',
    city: 'Firenze',
    tier: 'LV2',
    timeAgo: '1 giorno fa',
  },
  {
    name: 'Davide',
    city: 'Palermo',
    tier: 'LV1',
    timeAgo: '1 giorno fa',
  },
  {
    name: 'Sofia',
    city: 'Genova',
    tier: 'LV3',
    timeAgo: '2 giorni fa',
  },
]

// Configuration
export const socialProofConfig = {
  // Interval between notifications (in milliseconds)
  intervalMs: 30000, // 30 seconds
  
  // Duration each notification is shown (in milliseconds)
  displayDurationMs: 5000, // 5 seconds
  
  // Enable/disable social proof toasts
  enabled: true,
}
