import { Team } from '@/types/Team'
import { mockParticipants } from './mockParticipants'

// TODO: this mock should be replaced with actual teams to participant references stored on db instead of filtering for known teams

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    createdDate: '2026-01-15',
    participants: [
      ...mockParticipants.filter((participant) => { return participant.teamName == 'Tech Innovators' })
    ],
  },
  {
    id: '2',
    name: 'Circuit Breakers',
    createdDate: '2026-01-16',
    participants: [
      ...mockParticipants.filter((participant) => { return participant.teamName == 'Circuit Breakers' })
    ],
  },
]
