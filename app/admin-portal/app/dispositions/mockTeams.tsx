import { Team } from "@/dashboard/sections/Teams"

export const mockTeams: Team[] = [
  {
    id: '1',
    name: 'Tech Innovators',
    createdDate: '2024-01-15',
    participants: [
      { id: 'p1', name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '(555) 123-4567', isAdmin: false, joinedDate: '2024-01-15' },
      { id: 'p2', name: 'Michael Chen', email: 'michael.c@example.com', phone: '(555) 234-5678', isAdmin: false, joinedDate: '2024-01-20' },
      { id: 'p3', name: 'Emily Rodriguez', email: 'emily.r@example.com', phone: '(555) 345-6789', isAdmin: false, joinedDate: '2024-02-01' },
      { id: 'p4', name: 'David Park', email: 'david.p@example.com', phone: '(555) 456-7890', isAdmin: false, joinedDate: '2024-02-15' },
    ],
  },
  {
    id: '2',
    name: 'Tech Innovators #2',
    createdDate: '2024-01-15',
    participants: [
      { id: 'p1', name: 'Sarah Johnson', email: 'sarah.j@example.com', phone: '(555) 123-4567', isAdmin: 'Team Leader', joinedDate: '2024-01-15' },
      { id: 'p2', name: 'Michael Chen', email: 'michael.c@example.com', phone: '(555) 234-5678', isAdmin: false, joinedDate: '2024-01-20' },
      { id: 'p3', name: 'Emily Rodriguez', email: 'emily.r@example.com', phone: '(555) 345-6789', isAdmin: false, joinedDate: '2024-02-01' },
      { id: 'p4', name: 'David Park', email: 'david.p@example.com', phone: '(555) 456-7890', isAdmin: false, joinedDate: '2024-02-15' },
    ],
  },
]
