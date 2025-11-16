export interface Participant {
    id: string
    name: string
    email: string
    phone: string
    school: string

    teamName?: string
    isAdmin: boolean
    joinedDate: string
    checkedIn: boolean
}
