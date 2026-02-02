import { useState } from 'react'

import { mockParticipants, Participant } from '@/dispositions/mockParticipants'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'
import { Dialog, DialogContent, DialogHeader } from '@/components/shadcn/ui/dialog'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table'
import { Input } from '@/components/shadcn/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select';

import { Mail, Phone, GraduationCap, User } from 'lucide-react'
import { SectionFrame } from '../components/SectionFrame'

export function ParticipantsSection() {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedParticipant, setSelectedParticipant] = useState<Participant>()
    const [checkInFilter, setCheckInFilter] = useState<string>('all')
    const [dialogOpen, setDialogOpen] = useState(false)

    // calculate da check-in stats
    // may or may not all be used
    const amountCheckedIn = mockParticipants.filter(p => p.checkedIn).length
    const amountNotCheckedIn = mockParticipants.filter(p => !p.checkedIn).length
    const totalParticipants = mockParticipants.length
    const checkedInPercentage = (amountCheckedIn / totalParticipants) * 100
    const notCheckedInPercentage = (amountNotCheckedIn / totalParticipants) * 100
    
    const filteredParticipants = mockParticipants.filter(participant => {
        const matchesSearch =
            participant.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            participant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            participant.teamName && participant.teamName.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesStatus = checkInFilter === 'all' || participant.checkedIn.toString() === checkInFilter

        return matchesSearch && matchesStatus
    })

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
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative w-full">
                        <Input
                            type="text"
                            placeholder="Search participants by [id, name, email]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Select value={checkInFilter} onValueChange={setCheckInFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        
                        <SelectContent>
                            <SelectItem value="all">All Status ({totalParticipants})</SelectItem>
                            <SelectItem value="true">Checked In ({amountCheckedIn})</SelectItem>
                            <SelectItem value="false">Not Checked In ({amountNotCheckedIn})</SelectItem>
                        </SelectContent>
                    </Select>
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
                                    <TableHead>Check In Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredParticipants.map((participant) => (
                                    <TableRow className="hover:cursor-pointer" key={participant.id} onClick={() => { 
                                        setSelectedParticipant(participant)
                                        setDialogOpen(true)
                                    }}>

                                        <TableCell>
                                            <span className="text-sm text-muted-foreground font-mono">
                                                {participant.id}
                                            </span>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center gap-3">
                                                <User className="h-4 w-4 text-muted-foreground mt-0.5" />
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
                                            <p className={participant.checkedIn ? 'text-green-500 font-semibold' : ''}>{participant.checkedIn ? 'Checked In' : 'Not Checked In'}</p>
                                        </TableCell>

                                    </TableRow>
                                ))}
                            </TableBody>

                        </Table>
                    </CardContent>

                </Card>

            </div>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className="overflow-auto">
                    <DialogHeader>
                        <DialogTitle>{selectedParticipant?.name}</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                
                    <div className="flex gap-4 justify-end">
                        <Button>-</Button>
                        <Button>Email Message</Button>
                    </div>
                </DialogContent>
            </Dialog>
            
        </SectionFrame>
    )
}