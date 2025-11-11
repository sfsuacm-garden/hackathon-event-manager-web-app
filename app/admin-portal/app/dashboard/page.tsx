// TODO:
// add abstract events page and have dynamic routing per event (could be mockup/placeholder)
// dashboard/[event_id]

'use client'

import { useState } from "react"

import { SidebarProvider, SidebarInset } from "@/components/shadcn/ui/sidebar"

import { OverviewSection } from "./sections/Overview"

import { IntroWarning } from "./components/IntroWarning"
import { DashboardSidebar } from "./components/DashboardSidebar"
import { ParticipantsSection } from "./sections/Participants"

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
      <SidebarInset>
        <div className="flex min-h-screen items-center justify-center px-[10%] py-[5%]">
          { currentSection == "overview" && <OverviewSection /> }
          { currentSection == "participants" && <ParticipantsSection /> }
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
