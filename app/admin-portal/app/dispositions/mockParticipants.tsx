import { Participant } from "@/dashboard/sections/Participants";

export const mockParticipants: Participant[] = [
  {
    id: 'p1',
    name: 'John Doe',
    email: 'john.d@example.com',
    phone: '(555) 123-4567',
    school: 'Beijing University',
    teamName: 'Tech Innovators',
    joinedDate: '2024-01-15',
    checkedIn: true
  },
  {
    id: 'p2',
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    phone: '(555) 123-4567',
    school: 'Stanford University',
    teamName: '',
    joinedDate: '2024-01-15',
    checkedIn: false
  }
]
