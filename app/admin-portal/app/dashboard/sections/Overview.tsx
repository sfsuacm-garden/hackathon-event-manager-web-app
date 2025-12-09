import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/shadcn/ui/card'
import { Button } from '@/components/shadcn/ui/button'
import { Alert, AlertDescription } from '@/components/shadcn/ui/alert'
import { Progress } from '@/components/shadcn/ui/progress'
import { Users, FileText, AlertCircle, MapPin, Clock, UsersRound, Calendar } from 'lucide-react'
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts'
import { SectionFrame } from '../components/SectionFrame'

import { mockApplications } from '@/dispositions/mockApplications'

// mock data
export function OverviewSection() {
  const amountPending = mockApplications.filter((application) => { return application.status == 'pending' }).length
  const amountAdmitted = mockApplications.filter((application) => { return application.status == 'admitted' }).length
  const amountRejected = mockApplications.filter((application) => { return application.status == 'rejected' }).length
  const amountWaitlisted = mockApplications.filter((application) => { return application.status == 'waitlisted' }).length

  const applicationStatus = [
    { name: 'Pending', value: amountPending, color: '#505050' },
    { name: 'Admitted', value: amountAdmitted, color: '#16A249' },
    { name: 'Rejected', value: amountRejected, color: '#EF4343' },
    { name: 'Waitlisted', value: amountWaitlisted, color: '#2463EB' }
  ]

  return (
    <SectionFrame title="Overview Dashboard" description="Oversee teams, applications, teams and participants for this event.">

      <div className="flex flex-col overflow-auto gap-y-4 p-6">
        {/* event details row strip */}
        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <p>February 13-15, 2025</p>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <p>Starts: whenever - Ends: whenever</p>
          </div>
          
          <div className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
            <p>Student Life Events Center / Annex, San Francisco, CA</p>
          </div>
        </div>



        {/* —————————————————————————————————————————————————————————————————————————————— */}
        {/* main */}
        <div className="flex flex-col flex-1 overflow-auto gap-4">

          <Alert className="">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="text-orange-400">
              You have 67 pending applications requiring review and registration closes in 67 days.
            </AlertDescription>
          </Alert>

          {/* insight cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Event Capacity</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl">178 / 500</div>
                <Progress value={89} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-2">
                  89% capacity filled
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Registered Teams</CardTitle>
                <UsersRound className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl">53</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Applications</CardTitle>
                <FileText className="h-4 w-4 text-muted-foreground" />
              </CardHeader>

              <CardContent>
                <div className="text-2xl">89</div>
                <p className="text-xs text-muted-foreground">
                  Requires review
                </p>
              </CardContent>
            </Card>
          </div>



          {/* —————————————————————————————————————————————————————————————————————————————— */}
          {/* the recharts */}
          <div className="grid grid-cols-2 gap-4">

            <Card>
              <CardHeader>
                <CardTitle>Application Status</CardTitle>
                <CardDescription>An overview of overall application status processing.</CardDescription>
              </CardHeader>

              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={applicationStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(Math.round(percent * 100))}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {applicationStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>

            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Danger Zone</CardTitle>
                <CardDescription>The most powerful yet important actions.</CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex flex-col gap-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <p>Be sure to confirm/review before comitting.</p>
                  </Alert>
                  <Button>
                    Publish Application Status
                  </Button>
                </div>
              </CardContent>

            </Card>
          </div>

        </div>
      </div>
    </SectionFrame>
  )
}