import { Participant } from './Participant'

export interface Team {
    id: string
    name: string
    createdDate: string
    participants: Participant[]
}
