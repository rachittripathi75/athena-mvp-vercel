import React from 'react'
import { LayoutDashboard, FileText, View, BarChart3, Settings, Inbox, Layers } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { name: 'Dashboard', icon: LayoutDashboard, id: 'dashboard' },
  { name: 'Intake Dashboard', icon: Inbox, id: 'intake' },
  { name: 'Processing Pipeline', icon: Layers, id: 'processing' },
  { name: 'Shadow Review', icon: FileText, id: 'invoices' },
  { name: 'Exception Queue', icon: View, id: 'exceptions' },
  { name: 'Reports', icon: BarChart3, id: 'reports' },
]

interface SidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex h-screen w-64 flex-col bg-[#f8f9fc] border-r border-slate-200">
      {/* Logo Area */}
      <div className="flex h-16 items-center px-6">
        <div className="flex items-center gap-2">
          {/* Logo mock based on the 'A' Athena logo */ }
          <div className="flex items-baseline gap-1.5">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 22H6L12 10L18 22H22L12 2Z" fill="#386b9e" />
              <path d="M12 10L18 22H14L12 18L10 22H6L12 10Z" fill="#6ba4d8" />
            </svg>
            <span className="font-bold text-[#1f2937] text-xl tracking-tight">Athena</span>
            {/* <span className="font-semibold text-slate-500 text-[15px] ml-1">AP Copilot</span> */}
          </div>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200",
                  isActive
                    ? "bg-[#386b9e] text-white shadow-sm"
                    : "text-slate-600 hover:bg-[#eef2f6] hover:text-[#386b9e]"
                )}
              >
                <item.icon className={cn(
                  "h-5 w-5 shrink-0",
                  isActive ? "text-white" : "text-slate-400 group-hover:text-[#386b9e]"
                )} />
                {item.name}
              </button>
            )
          })}
        </nav>
      </div>

      <div className="mt-auto px-4 py-4 pb-6 border-t border-slate-200/60">
        <button 
          onClick={() => setActiveTab('settings')}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[15px] font-medium transition-all duration-200",
            activeTab === 'settings'
              ? "bg-[#386b9e] text-white shadow-sm"
              : "text-slate-600 hover:bg-[#eef2f6] hover:text-[#386b9e]"
          )}
        >
          <Settings className={cn(
            "h-5 w-5 shrink-0",
            activeTab === 'settings' ? "text-white" : "text-slate-400"
          )} />
          Settings
        </button>
      </div>
    </div>
  )
}
