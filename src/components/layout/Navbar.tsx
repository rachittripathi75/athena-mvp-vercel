import React from 'react'
import { Search, Bell, UploadCloud, User, Settings, LogOut, FileText, CheckCircle2 } from 'lucide-react'
import { UploadModal } from '../UploadModal'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'

// Using the dark blue navy topbar variant seen in the mockups
export const Navbar: React.FC = () => {
  return (
    <header className="h-[60px] bg-[#1a2e4c] flex items-center justify-between px-6 sticky top-0 z-10 text-white">
      {/* Search Bar - Center aligned typically, but left aligned here */}
      <div className="flex-1 max-w-[480px]">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-[18px] w-[18px] text-white/50" />
          <input 
            type="text" 
            placeholder="Search invoices, vendors, or amounts..." 
            className="w-full h-[36px] bg-[#2a4165] border border-[#3b5379] rounded flex items-center pl-10 pr-4 text-[13px] text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-blue-400 focus:bg-[#344d75] transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-4 ml-auto">
        <UploadModal>
          <button className="flex items-center gap-2 bg-[#0066cc] hover:bg-[#0052a3] text-white h-[36px] px-4 rounded text-sm font-medium transition-colors">
            <UploadCloud className="h-[18px] w-[18px]" />
            Upload Invoice
          </button>
        </UploadModal>
        
        <div className="h-5 w-px bg-[#3b5379] mx-1"></div>

        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <button className="p-1.5 text-white/70 hover:text-white rounded transition-colors relative outline-none focus:bg-[#2a4165]">
              <Bell className="h-[18px] w-[18px]" />
               <span className="absolute top-[4px] right-[4px] h-[7px] w-[7px] bg-red-500 rounded-full border border-[#1a2e4c]"></span>
            </button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Content align="end" sideOffset={8} className="w-80 bg-white rounded-lg shadow-xl border border-slate-200 p-0 text-slate-800 animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="p-4 border-b border-slate-100 font-semibold flex justify-between items-center">
                Notifications
                <span className="text-xs text-[#386b9e] cursor-pointer hover:underline">Mark all as read</span>
              </div>
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenu.Item className="p-4 border-b border-slate-50 flex gap-3 hover:bg-slate-50 cursor-pointer outline-none">
                  <div className="mt-0.5"><FileText className="h-5 w-5 text-[#386b9e]" /></div>
                  <div>
                    <p className="text-sm font-medium">New invoice predicted</p>
                    <p className="text-xs text-slate-500 mt-0.5">INV-2024-043 is ready for Shadow Review.</p>
                    <p className="text-[10px] text-slate-400 mt-1">2 mins ago</p>
                  </div>
                </DropdownMenu.Item>
                <DropdownMenu.Item className="p-4 flex gap-3 hover:bg-slate-50 cursor-pointer outline-none">
                  <div className="mt-0.5"><CheckCircle2 className="h-5 w-5 text-green-500" /></div>
                  <div>
                    <p className="text-sm font-medium">Batch Processed</p>
                    <p className="text-xs text-slate-500 mt-0.5">14 invoices successfully routed to system.</p>
                    <p className="text-[10px] text-slate-400 mt-1">1 hour ago</p>
                  </div>
                </DropdownMenu.Item>
              </div>
              <div className="p-3 border-t border-slate-100 text-center text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer">
                View all activity
              </div>
            </DropdownMenu.Content>
          </DropdownMenu.Portal>
        </DropdownMenu.Root>

        <div className="flex items-center gap-2 pl-3">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <div className="h-8 w-8 rounded-full bg-[#cbd5e1] flex items-center justify-center overflow-hidden border border-white/20 cursor-pointer hover:opacity-80 transition-opacity outline-none">
                 <svg className="w-5 h-5 text-slate-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
              </div>
            </DropdownMenu.Trigger>
            <DropdownMenu.Portal>
              <DropdownMenu.Content align="end" sideOffset={8} className="w-56 bg-white rounded-lg shadow-xl border border-slate-200 p-1 text-slate-800 animate-in fade-in zoom-in-95 duration-200 z-50">
                <div className="px-3 py-2.5 border-b border-slate-100 mb-1">
                  <p className="text-sm font-semibold text-slate-800">Admin User</p>
                  <p className="text-xs text-slate-500 mt-0.5">admin@athenahomes.com</p>
                </div>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md cursor-pointer outline-none">
                  <User className="h-4 w-4" /> Profile
                </DropdownMenu.Item>
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md cursor-pointer outline-none">
                  <Settings className="h-4 w-4" /> Preferences
                </DropdownMenu.Item>
                <DropdownMenu.Separator className="h-px bg-slate-100 my-1" />
                <DropdownMenu.Item className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md cursor-pointer outline-none">
                  <LogOut className="h-4 w-4" /> Sign out
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Portal>
          </DropdownMenu.Root>
        </div>
      </div>
    </header>
  )
}
