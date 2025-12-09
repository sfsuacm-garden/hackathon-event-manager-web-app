// src/types/Participant.ts
// import type { Application } from './Application'

export interface Participant {
    id: string
    name: string
    email: string
    phone: string
    school: string

    isAdmin: boolean
    joinedDate: string
    teamName: string
    checkedIn: boolean

    // application: Application
}
