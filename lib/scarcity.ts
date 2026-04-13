// Scarcity Configuration
// Edit this file to update spots remaining and deadline
// This is a single source of truth for all scarcity elements

export const scarcity = {
  // Spots remaining - update this number manually as needed
  spotsRemaining: 7,
  
  // Maximum spots per month
  maxSpots: 15,
  
  // Deadline for current batch (ISO date string)
  // Set to end of current month by default
  deadline: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0, 23, 59, 59).toISOString(),
  
  // Enable/disable scarcity elements
  enabled: true,
  
  // Threshold for "urgent" styling (pulse animation, red color)
  urgentThreshold: 5,
  
  // Messages
  messages: {
    spotsLabel: 'Posti rimasti',
    urgentMessage: 'Ultimi posti disponibili!',
    closingMessage: 'Le iscrizioni chiudono tra:',
  },
}

export function getSpotsRemaining(): number {
  return scarcity.spotsRemaining
}

export function isUrgent(): boolean {
  return scarcity.spotsRemaining <= scarcity.urgentThreshold
}

export function getDeadline(): Date {
  return new Date(scarcity.deadline)
}

export function getTimeRemaining(): { days: number; hours: number; minutes: number; seconds: number } {
  const now = new Date()
  const deadline = getDeadline()
  const diff = deadline.getTime() - now.getTime()
  
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  }
}
