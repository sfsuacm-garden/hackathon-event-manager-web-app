// TODO:
// add abstract events page and have dynamic routing per event (could be mockup/placeholder)
// dashboard/[event_id]

'use client'

import { useState } from 'react'
import Image from 'next/image'

import { SidebarProvider, SidebarInset } from '@/components/shadcn/ui/sidebar'

import { OverviewSection } from './sections/Overview'

import { IntroWarning } from './components/IntroWarning'
import { DashboardSidebar } from './components/DashboardSidebar'
import { ParticipantsSection } from './sections/Participants'
import { TeamsSection } from './sections/Teams'
import { ApplicationsSection } from './sections/Applications'

// TODO: should move to shared types file at some point
// should match with DashboardSidebar comp
type DashboardSection = 'overview' | 'teams' | 'applications' | 'participants'

export default function Dashboard() {
  const [dismissedWarning, setDismissedWarning] = useState(false)
  const [currentSection, setCurrentSection] = useState<DashboardSection>('overview')

  function handleNavigate(page: DashboardSection) {
    setCurrentSection(page)
  }

  if (!dismissedWarning) {
    return <IntroWarning onConfirm={setDismissedWarning} />
  }

  return (
    <SidebarProvider>
      <DashboardSidebar currentSection={currentSection} onNavigate={handleNavigate} />
      <SidebarInset className="bg-transparent">
        <div className="flex min-h-screen items-center justify-center lg:px-[10%] py-[5%]">

          { currentSection == "overview" && <OverviewSection /> }
          { currentSection == "teams" && <TeamsSection /> }
          { currentSection == "applications" && <ApplicationsSection /> }
          { currentSection == "participants" && <ParticipantsSection /> }

          {/* decorative backdrop underlay */}
          <Image className="-z-10 fixed top-0 w-full h-screen object-cover opacity-5" src="/bits/background.svg" alt="" width={1000} height={1000} />

          <p className="fixed bottom-0 right-4 opacity-30">this is a development build</p>
          <p className="fixed bottom-0 left-4 opacity-30">ctrl/cmd + b to toggle sidebar</p>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
