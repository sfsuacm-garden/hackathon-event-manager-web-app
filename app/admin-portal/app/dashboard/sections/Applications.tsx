import { useEffect, useState } from 'react'

import { CheckCircle, XCircle, Clock, User, GraduationCap, ExternalLink, ChevronLeft, ChevronRight, X, Search } from 'lucide-react'

import { Card, CardAction, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { Label } from '@/components/shadcn/ui/label'
import { Separator } from '@/components/shadcn/ui/separator'
import { SectionFrame } from '../components/SectionFrame'

import { Input } from '@/components/shadcn/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/shadcn/ui/select'

// part of combining mockParticipants data with applications, just reusing old reference names for plug-n-play compat
// import { mockApplications } from '@/dispositions/mockApplications'
import { mockParticipants as mockApplications, type Participant as Application } from '@/dispositions/mockParticipants'

import { formatDateTime } from '@/lib/formatDateTime'
// import { Application } from '@/types/Application'
import { Checkbox } from '@/components/shadcn/ui/checkbox'

const statusBadges = {
    'pending': (
        <Badge className="bg-neutral-600">
            <Clock className="h-3 w-3 mr-1" />
            Pending
        </Badge>
    ),
    'waitlisted': (
        <Badge className="bg-sky-600">
            <Clock className="h-3 w-3 mr-1" />
            Waitlisted
        </Badge>
    ),
    'admitted': (
        <Badge className="bg-green-600">
            <CheckCircle className="h-3 w-3 mr-1" />
            Admitted
        </Badge>
    ),
    
    'rejected': (
        <Badge className="bg-red-600">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
        </Badge>
    )
}

export function ApplicationsSection({ searchTerm }: { searchTerm?: string }) {

    // searchbar states
    const [searchQuery, setSearchQuery] = useState('')
    const [statusFilter, setStatusFilter] = useState<string>('all')
    const [sortBy, setSortBy] = useState<string>('id')

    // section states
    const [currentApplication, setCurrentApplication] = useState<Application | null>(null)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [reviewNotes, setReviewNotes] = useState('')

    // multi-select
    const [selectedApplications, setSelectedApplications] = useState<Application[]>([])

    const totalApplicants = mockApplications.length
    const amountPending = mockApplications.filter((application) => { return application.status == 'pending' }).length
    const amountAdmitted = mockApplications.filter((application) => { return application.status == 'admitted' }).length
    const amountRejected = mockApplications.filter((application) => { return application.status == 'rejected' }).length
    const amountWaitlisted = mockApplications.filter((application) => { return application.status == 'waitlisted' }).length
    const percentagePending = (amountPending / totalApplicants) * 100
    const percentageAdmitted =  (amountAdmitted / totalApplicants) * 100
    const percentageRejected =  (amountRejected / totalApplicants) * 100
    const percentageWaitlisted =  (amountWaitlisted / totalApplicants) * 100
    // console.log(percentageAdmitted, percentagePending, percentageRejected, percentageWaitlisted)

    const filteredApplications = mockApplications.filter(application => {
        const matchesSearch =
            application.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            application.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            application.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            application.school.toLowerCase().includes(searchQuery.toLowerCase()) ||
            application.teamName.toLowerCase().includes(searchQuery.toLowerCase())
        
        const matchesStatus = statusFilter === 'all' || application.status === statusFilter || (statusFilter === 'selected' && selectedApplications.find(app => app.id == application.id) ? true : false)

        return matchesSearch && matchesStatus
    })

    filteredApplications.sort((app, otherApp) => {
        if (sortBy == 'id') {
            // NOTE: casting to number assuming string type of id, can remove if alr int
            if (Number(app.id) < Number(otherApp.id)) return -1
            if (Number(app.id) > Number(otherApp.id)) return 1
        }
        else if (sortBy == 'submitted') {
            const parsedAppDate = Date.parse(app.submittedDate)
            const parsedOtherAppDate = Date.parse(otherApp.submittedDate)
            if (parsedAppDate < parsedOtherAppDate) return -1
            if (parsedAppDate > parsedOtherAppDate) return 1
        }
        else if (sortBy == 'status') {
            if (app.status < otherApp.status) return -1
            if (app.status > otherApp.status) return 1
        }
        return 0
    })

    selectedApplications.sort((app, otherApp) => {
        if (app.id < otherApp.id) return -1
        if (app.id > otherApp.id) return 1
        return 0
    })

    function navigateApplications(direction: 'next' | 'prev') {
        if (!currentApplication) return

        let newIndex: number

        if (direction == 'next') {
            newIndex = currentIndex + 1
            if (newIndex >= mockApplications.length) newIndex = 0
        } else {
            newIndex = currentIndex - 1
            if (newIndex < 0) newIndex = mockApplications.length - 1
        }

        setCurrentApplication(mockApplications[newIndex])
        setCurrentIndex(newIndex)
    }

    function handleAdmit() {
        console.log('admitted')
    }

    function handleWaitlist() {
        console.log('waitlisted')
    }

    function handleReject() {
        console.log('rejected')
    }

    function listDietrestrictions(app: Application) {
        const restrictions = []
        if (app.dietaryVegetarian) restrictions.push('Vegetarian')
        if (app.dietaryVegan) restrictions.push('Vegan')
        if (app.dietaryCeliacDisease) restrictions.push('Celiac Disease')
        if (app.dietaryKosher) restrictions.push('Kosher')
        if (app.dietaryHalal) restrictions.push('Halal')
        return restrictions.length > 0 ? restrictions.join(', ') : 'None'
    }

    useEffect(() => {
        console.log(searchTerm)
        if (!searchTerm) return
        setSearchQuery(searchTerm)
    }, [searchTerm])

    return (
        <SectionFrame title="Application Management" description="Review and manage individual hackathon applications.">

            <div className="flex flex-col gap-4 p-6 border-b">

                {/* participant distribution bar */}
                <div className="flex flex-col gap-2">

                    {/* main */}
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="font-semibold text-sm">Application Distribution</h3>
                            <p className="text-xs text-muted-foreground">
                                {totalApplicants} total applicants
                            </p>
                        </div>
                        <div className="text-sm text-muted-foreground">
                            {amountPending} pending, {amountWaitlisted} waitlisted, {amountAdmitted} admitted, {amountRejected} rejected
                        </div>
                    </div>

                    <div className="flex h-4 w-full overflow-hidden">
                        <div
                            className="bg-neutral-600"
                            style={{ width: `${percentagePending}%` }}
                        />
                        <div
                            className="bg-sky-600"
                            style={{ width: `${percentageWaitlisted}%` }}
                        />
                        <div
                            className="bg-green-600"
                            style={{ width: `${percentageAdmitted}%` }}
                        />
                        <div
                            className="bg-red-600"
                            style={{ width: `${percentageRejected}%` }}
                        />
                    </div>

                    {/* counters */}
                    <div className="flex items-center text-xs gap-4">
                    <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-neutral-600" />
                            <span className="text-muted-foreground">Pending ({amountPending})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-sky-600" />
                            <span className="text-muted-foreground">Waitlisted ({amountWaitlisted})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-600" />
                            <span className="text-muted-foreground">Admitted ({amountAdmitted})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-red-600" />
                            <span className="text-muted-foreground">Rejected ({amountRejected})</span>
                        </div>
                    </div>
                </div>

                {/* temp visual */}
                {currentApplication && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">

                                <div>
                                    <CardTitle>Application Review</CardTitle>
                                    <CardDescription>
                                        Review application details below, and admit or reject
                                    </CardDescription>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {currentIndex} of {mockApplications.length}
                                    </span>

                                    {/* nav */}
                                    <div className="flex gap-1">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigateApplications('prev')}
                                        >
                                            <ChevronLeft className="h-4 w-4" />
                                        </Button>

                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => navigateApplications('next')}
                                        >
                                            <ChevronRight className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* close */}
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setCurrentApplication(null)}
                                    >
                                        <X className="h-4 w-4" />
                                    </Button>

                                </div>
                            </div>
                        </CardHeader>

                        <CardContent>
                            <div className="grid grid-cols-3 gap-6">
                                
                                <div>
                                    <h3 className="mb-3 flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Basic Information
                                    </h3>
                                    <Separator className="mb-4" />
                                    <div className="space-y-4">
                                        <div>
                                            <Label className="text-muted-foreground">ID</Label>
                                            <p className="mt-1">{currentApplication.id}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">Name</Label>
                                            <p className="mt-1">{currentApplication.name}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">Email</Label>
                                            <p className="mt-1">{currentApplication.email}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">School</Label>
                                            <p className="mt-1 flex items-center gap-1">
                                                <GraduationCap className="h-3 w-3" />
                                                {currentApplication.school}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">Level of Study</Label>
                                            <p className="mt-1">{currentApplication.levelOfStudy}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">LinkedIn Profile</Label>
                                            <a
                                                href={currentApplication.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 flex items-center gap-1 text-blue-600 hover:underline"
                                            >
                                                View Profile
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">Team</Label>
                                            <p className="mt-1">{currentApplication.teamName}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* prefs/insights */}
                                <div>
                                    {/* prefs */}

                                    <div className="mb-6">
                                        <h3 className="mb-3 flex items-center gap-2">
                                            <User className="h-4 w-4"/>
                                            Preferences
                                        </h3>

                                        <Separator className="mb-4" />

                                        <div className="flex flex-col gap-4">
                                            <div>
                                                <Label className="text-muted-foreground">T-Shirt Size</Label>
                                                <p className="mt-1">{currentApplication.tshirtSize}</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Dietary Restrictions</Label>
                                                <p className="mt-1">{listDietrestrictions(currentApplication)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* insights (optional fields) */}
                                    <div>
                                        <h3 className="mb-3">Demographic Insights</h3>

                                        <Separator className="mb-4" />

                                        <div className="flex flex-col gap-4">
                                            {currentApplication.majorFieldOfStudy && (
                                                <div>
                                                    <Label className="text-muted-foreground">Major/Field of Study</Label>
                                                    <p className="mt-1">{currentApplication.majorFieldOfStudy}</p>
                                                </div>
                                            )}
                                            {currentApplication.gender && (
                                                <div>
                                                    <Label className="text-muted-foreground">Gender</Label>
                                                    <p className="mt-1">{currentApplication.gender}</p>
                                                </div>
                                            )}
                                            {currentApplication.pronouns && (
                                                <div>
                                                    <Label className="text-muted-foreground">Pronouns</Label>
                                                    <p className="mt-1">{currentApplication.pronouns}</p>
                                                </div>
                                            )}
                                            {currentApplication.raceEthnicity && (
                                                <div>
                                                    <Label className="text-muted-foreground">Race/Ethnicity</Label>
                                                    <p className="mt-1">{currentApplication.raceEthnicity}</p>
                                                </div>
                                            )}
                                            {currentApplication.sexualOrientation && currentApplication.sexualOrientation !== 'Prefer not to say' && (
                                                <div>
                                                    <Label className="text-muted-foreground">Sexual Orientation</Label>
                                                    <p className="mt-1">{currentApplication.sexualOrientation}</p>
                                                </div>
                                            )}
                                            {!currentApplication.majorFieldOfStudy && !currentApplication.gender && !currentApplication.pronouns && !currentApplication.raceEthnicity && (
                                                <p className="text-sm text-muted-foreground">No demographic information provided</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* review notes/make an acction */}
                                <div>
                                    <h3 className="mb-3">Review & Actions</h3>
                                    <Separator className="mb-4" />
                                    <div className="flex flex-col gap-4">
                                        <div>
                                            <Label className="text-muted-foreground">Current Status</Label>
                                            <div className="mt-2">
                                                {statusBadges[currentApplication.status]}
                                            </div>
                                        </div>

                                        <div>
                                            <Label htmlFor="notes">Review Notes (Optional)</Label>
                                            <Textarea
                                                id="notes"
                                                placeholder="Enter any notes or feedback..."
                                                value={reviewNotes}
                                                onChange={(e) => setReviewNotes(e.target.value)}
                                                className="mt-2"
                                                rows={4}
                                            />
                                        </div>

                                        <div className="flex flex-col gap-2 pt-2">
                                            <Button onClick={handleAdmit} className="w-full bg-green-700 hover:bg-green-600">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Admit Application
                                            </Button>
                                            <Button onClick={handleWaitlist} className="w-full bg-sky-700 hover:bg-sky-600">
                                                <Clock className="h-4 w-4 mr-2" />
                                                Waitlist Application
                                            </Button>
                                            <Button variant="destructive" onClick={handleReject} className="w-full">
                                                <XCircle className="h-4 w-4 mr-2" />
                                                Reject Application
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            type="text"
                            placeholder="Search by [id, name, email, school]"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-[180px]">
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        
                        <SelectContent>
                            <SelectItem value="all">All Status ({totalApplicants})</SelectItem>
                            <SelectItem value="pending">{statusBadges.pending} ({amountPending})</SelectItem>
                            <SelectItem value="waitlisted">{statusBadges.waitlisted} ({amountWaitlisted})</SelectItem>
                            <SelectItem value="admitted">{statusBadges.admitted} ({amountAdmitted})</SelectItem>
                            <SelectItem value="rejected">{statusBadges.rejected} ({amountRejected})</SelectItem>
                            <SelectItem value="selected">Selected ({selectedApplications.length})</SelectItem>
                        </SelectContent>
                    </Select>

                    <p>Sort by</p>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="w-full sm:w-[140px]">
                            <SelectValue placeholder="Sort by value" />
                        </SelectTrigger>
                        
                        <SelectContent>
                            <SelectItem value="id">ID</SelectItem>
                            <SelectItem value="submitted">Time Submitted</SelectItem>
                            <SelectItem value="status">Status</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {selectedApplications.length > 0 &&
                <Card>
                    <CardHeader>
                        <CardTitle>Bulk Selected Applications ({selectedApplications.length})</CardTitle>
                        <CardDescription>
                            {selectedApplications.map(app => app.id).join(', ')}
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-row gap-2">
                            <Button onClick={handleAdmit} className="bg-green-700 hover:bg-green-600">
                                <CheckCircle className="h-4 w-4 mr-2" />
                                Bulk Admit Application(s)
                            </Button>
                            <Button onClick={handleWaitlist} className="bg-sky-700 hover:bg-sky-600">
                                <Clock className="h-4 w-4 mr-2" />
                                Bulk Waitlist Application(s)
                            </Button>
                            <Button variant="destructive" onClick={handleReject}>
                                <XCircle className="h-4 w-4 mr-2" />
                                Bulk Reject Application(s)
                            </Button>
                            <Button onClick={() => setSelectedApplications([])} className="bg-neutral-700 hover:bg-neutral-600">
                                <XCircle className="h-4 w-4 mr-2" />
                                Clear Selected
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                }

                <Card>
                    <CardHeader>
                        <CardTitle>All Applications</CardTitle>
                        <CardDescription>
                            Double-click on an application to view details and take action
                        </CardDescription>
                        <CardAction>
                            <Button variant='secondary' onClick={() => { setSelectedApplications([...filteredApplications, ...selectedApplications]) }}>
                                Select All
                            </Button>
                        </CardAction>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Applicant</TableHead>
                                    <TableHead>School</TableHead>
                                    <TableHead>Team</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {filteredApplications.map((application) => {
                                    const submittedDateTime = formatDateTime(application.submittedDate)
                                    const lastUpdatedDateTime = formatDateTime(application.lastUpdated)
                                    const isSelected = currentApplication?.id === application.id
                                    return (
                                        <TableRow
                                            key={application.id}
                                            className={`cursor-pointer hover:bg-accent-foreground ${isSelected ? 'outline-muted-foreground outline-4' : ''}`}
                                            onDoubleClick={() => setCurrentApplication(application)}
                                        >
                                            <TableCell>
                                                <p className="text-sm text-muted-foreground font-mono">
                                                    {application.id}
                                                </p>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-start gap-2">
                                                    <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                                                    <div>
                                                        <p>{application.name}</p>
                                                        <p className="text-sm text-muted-foreground">
                                                            {application.email}
                                                        </p>
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-1">
                                                    <GraduationCap className="h-3 w-3 text-muted-foreground" />
                                                    <p className="text-sm">{application.school}</p>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <p className="text-sm">{application.teamName}</p>
                                            </TableCell>

                                            <TableCell>
                                                <div>
                                                    <p>{submittedDateTime.date}</p>
                                                    <p className="text-sm text-muted-foreground">{submittedDateTime.time}</p>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <div>
                                                    {statusBadges[application.status]}
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {lastUpdatedDateTime.date} {lastUpdatedDateTime.time}
                                                    </p>
                                                </div>
                                            </TableCell>

                                            <TableCell>
                                                <Checkbox checked={selectedApplications.find(app => app.id == application.id) ? true : false} onCheckedChange={(checked) => {
                                                    if (checked)
                                                        setSelectedApplications([...selectedApplications, application])
                                                    else
                                                        setSelectedApplications(selectedApplications.filter(app => app.id != application.id))
                                                }}></Checkbox>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>

            </div>
        </SectionFrame>
    )
}