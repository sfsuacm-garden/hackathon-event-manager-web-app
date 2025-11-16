import { Team } from '@/types/Team'

export const mockTeams: Team[] = [
  {
    id: 't1',
    name: 'Tech Innovators',
    createdDate: '2026-01-15',
    participants: [
      {
        id: 'p1',
        name: 'John Doe',
        email: 'john.d@example.com',
        phone: '(555) 123-4567',
        school: 'Beijing University',
    
        isAdmin: false,
        joinedDate: '2026-01-15',
        teamName: 'Tech Innovators',
        checkedIn: true
      },
      {
        id: 'p3',
        name: 'Jone Doe',
        email: 'jone.d@example.com',
        phone: '(555) 123-4567',
        school: 'San Franscisco State University',
    
        isAdmin: false,
        joinedDate: '2026-01-15',
        teamName: 'Tech Innovators',
        checkedIn: false
      },
    ],
  },
]
