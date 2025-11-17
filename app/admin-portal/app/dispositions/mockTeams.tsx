import { Team } from '@/types/Team'
import { mockParticipants } from './mockParticipants'

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Tech Innovators',
    createdDate: '2026-01-15',
    participants: [
      ...mockParticipants.filter((participant) => { return participant.teamName == 'Tech Innovators' })
    ],
  },
]
