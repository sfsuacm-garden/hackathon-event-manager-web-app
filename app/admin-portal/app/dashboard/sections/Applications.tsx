import { useState } from 'react'

import { CheckCircle, XCircle, Clock, User, GraduationCap, ExternalLink, ChevronLeft, ChevronRight, X } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/shadcn/ui/table'
import { Badge } from '@/components/shadcn/ui/badge'
import { Button } from '@/components/shadcn/ui/button'
import { Textarea } from '@/components/shadcn/ui/textarea'
import { Label } from '@/components/shadcn/ui/label'
import { Separator } from '@/components/shadcn/ui/separator'
import { SectionFrame } from '../components/SectionFrame'

import { mockApplications } from '@/dispositions/mockApplications'

import { formatDateTime } from '@/lib/formatDateTime'
import { Application } from '@/types/Application'

const statusBadges = {
    'pending': (
        <Badge className="bg-neutral-500">
            <Clock className="h-3 w-3 mr-1" />
            Pending
        </Badge>
    ),
    'waitlisted': (
        <Badge className="bg-blue-500">
            <Clock className="h-3 w-3 mr-1" />
            Waitlisted
        </Badge>
    ),
    'approved': (
        <Badge className="bg-green-500">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
        </Badge>
    ),
    
    'rejected': (
        <Badge className="bg-red-500">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
        </Badge>
    )
}

export function ApplicationsSection() {
    const [selectedApplication, setSelectedApplication] = useState<Application | null>(null)
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [reviewNotes, setReviewNotes] = useState('')

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

    function navigateApplications(direction: 'next' | 'prev') {
        if (!selectedApplication) return

        let newIndex: number

        if (direction == 'next') {
            newIndex = selectedIndex + 1
            if (newIndex >= mockApplications.length) newIndex = 0
        } else {
            newIndex = selectedIndex - 1
            if (newIndex < 0) newIndex = mockApplications.length - 1
        }

        setSelectedApplication(mockApplications[newIndex])
        setSelectedIndex(newIndex)
    }

    function handleApprove() {
        console.log('approved')
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

    return (
        <SectionFrame title="Application Management" description="Review and manage individual hackathon applications.">

            <div className="flex flex-col gap-6 p-6 border-b">

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
                            className="bg-neutral-500"
                            style={{ width: `${percentagePending}%` }}
                        />
                        <div
                            className="bg-blue-500"
                            style={{ width: `${percentageWaitlisted}%` }}
                        />
                        <div
                            className="bg-green-500"
                            style={{ width: `${percentageAdmitted}%` }}
                        />
                        <div
                            className="bg-red-500"
                            style={{ width: `${percentageRejected}%` }}
                        />
                    </div>

                    {/* counters */}
                    <div className="flex items-center text-xs gap-4">
                    <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-neutral-500" />
                            <span className="text-muted-foreground">Pending ({amountPending})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500" />
                            <span className="text-muted-foreground">Waitlisted ({amountWaitlisted})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500" />
                            <span className="text-muted-foreground">Admitted ({amountAdmitted})</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-red-500" />
                            <span className="text-muted-foreground">Rejected ({amountRejected})</span>
                        </div>
                    </div>
                </div>

                {/* temp visual */}
                {selectedApplication && (
                    <Card>
                        <CardHeader>
                            <div className="flex items-center justify-between">

                                <div>
                                    <CardTitle>Application Review</CardTitle>
                                    <CardDescription>
                                        Review application details below, and approve or reject
                                    </CardDescription>
                                </div>

                                <div className="flex items-center gap-2">
                                    <span className="text-sm text-muted-foreground">
                                        {selectedIndex} of {mockApplications.length}
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
                                        onClick={() => setSelectedApplication(null)}
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
                                            <Label className="text-muted-foreground">Name</Label>
                                            <p className="mt-1">{selectedApplication.applicantName}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">Email</Label>
                                            <p className="mt-1">{selectedApplication.email}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">School</Label>
                                            <p className="mt-1 flex items-center gap-1">
                                                <GraduationCap className="h-3 w-3" />
                                                {selectedApplication.school}
                                            </p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">Level of Study</Label>
                                            <p className="mt-1">{selectedApplication.levelOfStudy}</p>
                                        </div>
                                        <div>
                                            <Label className="text-muted-foreground">LinkedIn Profile</Label>
                                            <a
                                                href={selectedApplication.linkedinUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="mt-1 flex items-center gap-1 text-blue-600 hover:underline"
                                            >
                                                View Profile
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
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
                                                <p className="mt-1">{selectedApplication.tshirtSize}</p>
                                            </div>
                                            <div>
                                                <Label className="text-muted-foreground">Dietary Restrictions</Label>
                                                <p className="mt-1">{listDietrestrictions(selectedApplication)}</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* insights (optional fields) */}
                                    <div>
                                        <h3 className="mb-3">Demographic Insights</h3>

                                        <Separator className="mb-4" />

                                        <div className="flex flex-col gap-4">
                                            {selectedApplication.majorFieldOfStudy && (
                                                <div>
                                                    <Label className="text-muted-foreground">Major/Field of Study</Label>
                                                    <p className="mt-1">{selectedApplication.majorFieldOfStudy}</p>
                                                </div>
                                            )}
                                            {selectedApplication.gender && (
                                                <div>
                                                    <Label className="text-muted-foreground">Gender</Label>
                                                    <p className="mt-1">{selectedApplication.gender}</p>
                                                </div>
                                            )}
                                            {selectedApplication.pronouns && (
                                                <div>
                                                    <Label className="text-muted-foreground">Pronouns</Label>
                                                    <p className="mt-1">{selectedApplication.pronouns}</p>
                                                </div>
                                            )}
                                            {selectedApplication.raceEthnicity && (
                                                <div>
                                                    <Label className="text-muted-foreground">Race/Ethnicity</Label>
                                                    <p className="mt-1">{selectedApplication.raceEthnicity}</p>
                                                </div>
                                            )}
                                            {selectedApplication.sexualOrientation && selectedApplication.sexualOrientation !== 'Prefer not to say' && (
                                                <div>
                                                    <Label className="text-muted-foreground">Sexual Orientation</Label>
                                                    <p className="mt-1">{selectedApplication.sexualOrientation}</p>
                                                </div>
                                            )}
                                            {!selectedApplication.majorFieldOfStudy && !selectedApplication.gender && !selectedApplication.pronouns && !selectedApplication.raceEthnicity && (
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
                                                {statusBadges[selectedApplication.status]}
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
                                            <Button onClick={handleApprove} className="w-full">
                                                <CheckCircle className="h-4 w-4 mr-2" />
                                                Approve Application
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

                <Card>
                    <CardHeader>
                        <CardTitle>All Applications</CardTitle>
                        <CardDescription>
                            Click on an application to view details and take action
                        </CardDescription>
                    </CardHeader>

                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>ID</TableHead>
                                    <TableHead>Applicant</TableHead>
                                    <TableHead>School</TableHead>
                                    <TableHead>Level of Study</TableHead>
                                    <TableHead>Submitted</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {mockApplications.map((application) => {
                                    const submittedDateTime = formatDateTime(application.submittedDate)
                                    const lastUpdatedDateTime = formatDateTime(application.lastUpdated)
                                    const isSelected = selectedApplication?.id === application.id
                                    return (
                                        <TableRow
                                            key={application.id}
                                            className={`cursor-pointer hover:bg-muted ${isSelected ? 'bg-muted' : ''}`}
                                            onClick={() => setSelectedApplication(application)}
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
                                                        <p>{application.applicantName}</p>
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
                                                <p className="text-sm">{application.levelOfStudy}</p>
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
                                                        Updated: {lastUpdatedDateTime.date} {lastUpdatedDateTime.time}
                                                    </p>
                                                </div>
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