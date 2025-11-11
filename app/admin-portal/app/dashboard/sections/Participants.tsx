import { useState } from 'react'

import { mockParticipants } from '@/dispositions/mockParticipants'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table'
import { Input } from '@/components/shadcn/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'

import { Search, Mail, Phone, GraduationCap, CheckCircle } from 'lucide-react'

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
        <div className="flex flex-col w-full h-full gap-4">
            
            {/* —————————————————————————————————————————————————————————————————————————————— */}
            {/* header */}
            <div className="">
                <div className="flex flex-col gap-4">

                    <div>
                        <h1 className="mb-1">Participants Management</h1>
                        <p className="text-muted-foreground">
                            View and manage all registered hackathon participants
                        </p>
                    </div>

                    {/* search/filters bar */}
                    <div className="flex flex-row gap-4">
                        <div className="relative flex-1">
                            <Input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                // NOTE: should change to onabort only if no pagination in future
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <Select
                            value={checkInFilter}
                            onValueChange={(value) => {
                                console.log(value)
                                setCheckInFilter(value)
                            }}
                        >
                            <SelectTrigger className="w-40">
                                <SelectValue placeholder="Check-In Status">
                                    {checkInFilter === 'all' ? 'All' : checkInFilter === 'checked-in' ? 'Checked In' : 'Not Checked In'}
                                </SelectValue>
                            </SelectTrigger>

                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="checked-in">Checked In</SelectItem>
                                <SelectItem value="not-checked-in">Not Checked In</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </div>



            {/* —————————————————————————————————————————————————————————————————————————————— */}
            {/* top summary section */}
            <div>
                
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                        <div>
                            <h3 className="text-sm">Event Check-In Status</h3>
                            <p className="text-xs text-muted-foreground">
                                {totalParticipants} registered participants
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {checkedInCount} checked in, {notCheckedInCount} not checked in
                        </div>
                    </div>
                    <div className="flex h-3 w-full overflow-hidden rounded-full">
                        <div
                            className="bg-green-500 transition-all"
                            style={{ width: `${checkedInPercentage}%` }}
                        />
                        <div
                            className="bg-orange-500 transition-all"
                            style={{ width: `${notCheckedInPercentage}%` }}
                        />
                    </div>

                    <div className="flex items-center justify-between mt-2 text-xs">
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <div className="h-2 w-2 rounded-full bg-green-500"/>
                                <span className="text-muted-foreground">Checked In ({checkedInCount})</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <div className="h-2 w-2 rounded-full bg-orange-500"/>
                                <span className="text-muted-foreground">Not Checked In ({notCheckedInCount})</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">Checked In</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-2xl">{checkedInCount}</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">-</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-2xl">-</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm text-muted-foreground">-</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span className="text-2xl">-</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

            </div>



            {/* —————————————————————————————————————————————————————————————————————————————— */}
            {/* main table view */}
            <div className="flex-1">
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
                                    <TableRow key={participant.id} className="hover:cursor-pointer">

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
        </div>
    )
}