import Image from 'next/image'

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from '@/components/shadcn/ui/sidebar'
import { LayoutDashboard, UsersRound, FileText, Users, Settings, LogOutIcon } from 'lucide-react'

// should prolly maybe externally const this? maybe
type DashboardSection = 'overview' | 'teams' | 'applications' | 'participants'

interface DashboardSidebarProps {
  currentSection: DashboardSection
  onNavigate: (page: DashboardSection) => void
}

const menuItems = [
  {
    id: 'overview' as DashboardSection,
    title: "Overview",
    icon: LayoutDashboard,
  },
  // can be implemented for multi-hackathon management in futur potentially / maybe it's own page before dashboard
  // {
  //   id: 'hackathons' as DashboardSection,
  //   title: "Hackathons",
  //   icon: Trophy,
  //   badge: null
  // },
  {
    id: 'teams' as DashboardSection,
    title: "Teams",
    icon: UsersRound,
  },
  {
    id: 'applications' as DashboardSection,
    title: "Applications",
    icon: FileText,
  },
  {
    id: 'participants' as DashboardSection,
    title: "Participants",
    icon: Users,
  }
]

export function DashboardSidebar({ currentSection, onNavigate }: DashboardSidebarProps) {
  return (
    <Sidebar>
      <Image className="absolute w-full h-screen object-cover opacity-10" style={{ animationName: "sidebarBackdropHorizontalSweep", animationTimingFunction: "linear", animationDuration: "240s", animationIterationCount: "infinite" }} src="/bits/background.svg" alt="" width={1000} height={1000}></Image>

      <SidebarHeader className="border-b border-border">
        <div className="flex items-center gap-2 px-4 py-3">
          <Image className="h-12 w-12" src={'/bits/sfhacks_logo_white.png'} alt='' width={128} height={128} />
          <div>
            {/* NOTE: */}
            {/* current sf hacks-centric branding as planned, could become "general hackathon ACM admin dashboard" etc. in future */}
            <p className="text-sm font-bold">SF Hacks</p>
            <p className="text-sm text-muted-foreground">Admin Portal</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton
                    isActive={currentSection == item.id}
                    onClick={() => onNavigate(item.id)}
                    className="flex w-full items-center gap-3 px-3 py-2"
                  >
                    <item.icon className="h-4 w-4" />
                    <span className="flex-1">{item.title}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="border-t border-border">
        <SidebarMenu>

          <SidebarMenuItem>
            <SidebarMenuButton className="flex w-full items-center gap-3 px-3 py-2">
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton className="flex w-full items-center gap-3 px-3 py-2">
              <LogOutIcon className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>

        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
