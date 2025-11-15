import { useState } from 'react'

import { mockParticipants } from '@/dispositions/mockParticipants'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table'
import { Input } from '@/components/shadcn/ui/input'

import { Mail, Phone, GraduationCap, CheckCircle } from 'lucide-react'
import { SectionFrame } from '../components/SectionFrame'

// TODO: should instead move to shared types/interfaces folder
export interface Participant {
    id: string
    name: string
    email: string
    phone: string
    school: string
    teamName?: string
    joinedDate: string
    checkedIn: boolean
}

export function ParticipantsSection() {
    const [searchQuery, setSearchQuery] = useState('')
    const [checkInFilter, setCheckInFilter] = useState<string>('all')

    // calculate da check-in stats
    // may or may not all be used
    const checkedInCount = mockParticipants.filter(p => p.checkedIn).length
    const notCheckedInCount = mockParticipants.filter(p => !p.checkedIn).length
    const totalParticipants = mockParticipants.length
    const checkedInPercentage = (checkedInCount / totalParticipants) * 100
    const notCheckedInPercentage = (notCheckedInCount / totalParticipants) * 100

    return (
        <SectionFrame title="Participants Management" description="View and manage all confirmed-attending event participants.">

            {/* —————————————————————————————————————————————————————————————————————————————— */}
            {/* top summary section */}
            <div className="flex flex-col overflow-auto gap-y-4 p-6">
                
                {/* participant distribution bar */}
                <div className="flex flex-col gap-2">

                    {/* main */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">Participant Distribution</h3>
                            <p className="text-xs text-muted-foreground">
                                {totalParticipants} total participants
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {totalParticipants} checked in, {totalParticipants} not
                        </div>
                    </div>

                    <div className="flex h-4 w-full overflow-hidden">
                        <div
                            className="bg-green-500"
                            style={{ width: `${checkedInPercentage}%` }}
                        />
                        <div
                            className="bg-orange-500"
                            style={{ width: `${notCheckedInPercentage}%` }}
                        />
                    </div>

                    {/* counters */}
                    <div className="flex items-center text-xs gap-4">
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-muted-foreground">Checked In ({totalParticipants})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-orange-500" />
                            <span className="text-muted-foreground">Not Checked In ({totalParticipants})</span>
                        </div>
                    </div>
                </div>

                {/* —————————————————————————————————————————————————————————————————————————————— */}
                {/* main table view */}

                {/* searchbar */}
                <div className="relative w-full">
                    <Input
                        type="text"
                        placeholder="Search participants by [id, name, email, team]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>All Participants</CardTitle>
                        <CardDescription>
                            Below are eligble, accepted and confirmed applicants.
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Participant</TableHead>
                                    <TableHead>Contact</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {mockParticipants.map((participant) => (
                                    <TableRow className="hover:cursor-pointer" key={participant.id}>

                                        <TableCell>
                                            <span className="text-sm text-muted-foreground font-mono">
                                                {participant.id}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <div>{participant.name}</div>
                                                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                    <GraduationCap className="h-3 w-3"/>
                                                    {participant.school}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Mail className="h-3 w-3 text-muted-foreground"/>
                                                    <span className="text-xs">{participant.email}</span>
                                                </div>
                                                <div className="flex items-center gap-1 text-sm">
                                                    <Phone className="h-3 w-3 text-muted-foreground" />
                                                    <span className="text-xs">{participant.phone}</span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            {participant.teamName || ( <span className="text-muted-foreground text-sm">Individual</span> )}
                                        </TableCell>

                                        <TableCell>
                                            {participant.checkedIn ? 'Checked In' : 'Not Checked In'}
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </CardContent>

                </Card>

            </div>



            
        </SectionFrame>
    )
}