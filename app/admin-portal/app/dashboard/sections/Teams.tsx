import { useState } from 'react'

import { Mail, Phone, GraduationCap, User } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table'
import { Input } from '@/components/shadcn/ui/input'
import { Dialog, DialogContent, DialogHeader } from '@/components/shadcn/ui/dialog'
import { SectionFrame } from '../components/SectionFrame'

import { mockTeams } from '@/dispositions/mockTeams'

import { Team } from '@/types/Team'
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog'
import { Button } from '@/components/shadcn/ui/button'

export function TeamsSection({ handleNavigate, handleSetApplicationSearchTerm }) {
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedTeam, setSelectedTeam] = useState<Team | undefined>(undefined)
    const [dialogOpen, setDialogOpen] = useState(false)

    // calculate participant statistics
    const totalParticipantsInTeams = mockTeams.reduce((sum, team) => sum + team.participants.length, 0)

    // for demo/example, lets say there are 10 individual participants not yet in teams
    const individualParticipants = 10
    const totalParticipants = totalParticipantsInTeams + individualParticipants

    const participantsInTeamsPercentage = (totalParticipantsInTeams / totalParticipants) * 100
    const individualParticipantsPercentage = (individualParticipants / totalParticipants) * 100

    const filteredTeams = mockTeams.filter(team => {
        const matchesSearch =
            team.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            team.participants.filter(participant => {
                return participant.name.toLowerCase().includes(searchQuery.toLowerCase())
            }).length > 0

        return matchesSearch
    })

    const handleTeamClick = (team: Team) => {
        setSelectedTeam(team)
        setDialogOpen(true)
    }

    return (
        <SectionFrame title="Teams Management" description="View and manage hackathon teams and their members.">

            <div className="flex flex-col overflow-auto gap-4 p-6">

                {/* participant distribution bar */}
                <div className="flex flex-col gap-2">

                    {/* main */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">Participant-to-Teams Distribution</h3>
                            <p className="text-xs text-muted-foreground">
                                {totalParticipants} total participants
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {totalParticipantsInTeams} in teams, {individualParticipants} individual
                        </div>
                    </div>

                    <div className="flex h-4 w-full overflow-hidden">
                        <div
                            className="bg-purple-500"
                            style={{ width: `${participantsInTeamsPercentage}%` }}
                            title={`In Teams: ${totalParticipantsInTeams}`}
                        />
                        <div
                            className="bg-blue-500"
                            style={{ width: `${individualParticipantsPercentage}%` }}
                            title={`Individual: ${individualParticipants}`}
                        />
                    </div>

                    {/* counters */}
                    <div className="flex items-center text-xs gap-4">
                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-purple-500" />
                            <span className="text-muted-foreground">In Teams ({totalParticipantsInTeams})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <span className="text-muted-foreground">Individual ({individualParticipants})</span>
                        </div>
                    </div>
                </div>

                {/* searchbar */}
                <div className="relative w-full">
                    <Input
                        type="text"
                        placeholder="Search teams by [id, name, team member name]"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* main table */}
                <Card>

                    <CardHeader>
                        <CardTitle>All Teams</CardTitle>
                        <CardDescription>
                            Click on a team to view detailed participant information
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Table>

                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Team Name</TableHead>
                                    <TableHead>Members</TableHead>
                                    <TableHead className="text-right">Action</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredTeams.map((team) => (
                                    <TableRow
                                        key={team.id}
                                        className="cursor-pointer hover:bg-muted/50"
                                        onClick={() => handleTeamClick(team)}
                                    >
                                        <TableCell>
                                            <p className="text-sm text-muted-foreground font-mono">
                                                {team.id}
                                            </p>
                                        </TableCell>

                                        <TableCell>
                                            {/* NOTE: might consider putting creation date on own col */}
                                            <div>
                                                <div>{team.name}</div>
                                                <div className="text-sm text-muted-foreground">
                                                    birthed on {new Date(team.createdDate).toLocaleDateString()}
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex flex-wrap gap-1">
                                                {team.participants.map((participant, index) => (
                                                    <p key={participant.id} className="text-sm">
                                                        {participant.name}{index < team.participants.length - 1 ? ' |' : ''}
                                                    </p>
                                                ))}
                                            </div>
                                        </TableCell>

                                        <TableCell className="text-right">
                                            -
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
                        <DialogTitle>{`Members of "${selectedTeam?.name}"`}</DialogTitle>
                        <DialogDescription>Click to view team member&apos;s application.</DialogDescription>
                    </DialogHeader>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Participant</TableHead>
                                <TableHead>Contact</TableHead>
                                <TableHead>Check In Status</TableHead>
                            </TableRow>
                        </TableHeader>

                        <TableBody>
                            {selectedTeam?.participants.map((participant) => (
                                <TableRow className="hover:cursor-pointer" key={participant.id} onClick={() => {
                                    handleSetApplicationSearchTerm(participant.name)
                                    handleNavigate('applications')
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
                                        <p className={participant.checkedIn ? 'text-green-500 font-semibold' : ''}>{participant.checkedIn ? 'Checked In' : 'Not Checked In'}</p>
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <div className="flex gap-4 justify-end">
                        <Button onClick={() => {
                            handleSetApplicationSearchTerm(selectedTeam?.name)
                            handleNavigate('applications')
                        }}>View team in Applications</Button>
                        <Button>Email Message to Team</Button>
                    </div>
                </DialogContent>
            </Dialog>

        </SectionFrame>
    )
}