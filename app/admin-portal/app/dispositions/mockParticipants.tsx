import { Participant } from '@/types/Participant'

export const mockParticipants: Participant[] = [
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
    id: 'p2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    school: 'Stanford University',

    isAdmin: false,
    joinedDate: '2026-01-15',
    teamName: '',
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
  {
    id: 'p4',
    name: 'June Doe',
    email: 'june.doe@example.com',
    phone: '(555) 123-4567',
    school: 'Skyline College',

    isAdmin: true,
    joinedDate: '2026-01-15',
    teamName: 'The Wat',
    checkedIn: false
  }
]
