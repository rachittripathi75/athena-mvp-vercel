import React from 'react'
import { Card } from "@/components/ui/card"
import { Search, Mail, FileText, CheckCircle2, Loader2, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface IntakeDashboardProps {
  onNavigate: (page: string) => void
}

const mockIntakeItems = [
  { id: 'IN-001', source: 'billing@acme.com', file: 'invoice_march_final.pdf', type: 'Email', time: '10:05 AM', status: 'Ingested', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'IN-002', source: 'finance@relax.inc', file: 'Q1_services_receipt.pdf', type: 'Email', time: '10:15 AM', status: 'Pending AI', statusColor: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'IN-003', source: 'Manual Upload (Jane D.)', file: 'scanned_utility_bill.png', type: 'Portal', time: '10:30 AM', status: 'Failed: Unreadable', statusColor: 'bg-red-50 text-red-700 border-red-200' },
  { id: 'IN-004', source: 'accounts@baitox.com', file: 'statement_455.pdf', type: 'Email', time: '11:00 AM', status: 'Ingested', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'IN-005', source: 'vendor_portal@global.net', file: 'inv_1024_signed.pdf', type: 'API', time: '11:15 AM', status: 'Ingested', statusColor: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
]

export const IntakeDashboard: React.FC<IntakeDashboardProps> = ({ onNavigate }) => {
  return (
    <div className="flex h-full bg-[#f4f7fb] overflow-hidden">
      <div className="flex-1 flex flex-col p-6 pr-6">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Intake Dashboard</h1>
            <p className="text-slate-600 text-sm mt-1">Monitor incoming emails and attachments pending AI extraction.</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500 font-medium">System Status:</span>
            <span className="flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-700 text-xs font-semibold rounded-full border border-emerald-100"><span className="h-2 w-2 rounded-full bg-emerald-500"></span> Receiving</span>
          </div>
        </div>

        <Card className="flex-1 shadow-sm border-slate-200 rounded-xl overflow-hidden flex flex-col bg-white">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search senders or files..." 
                className="w-[280px] h-9 bg-white border border-slate-300 rounded-md pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
            <div className="flex gap-2">
              {['All', 'Email', 'Portal', 'API'].map(f => (
                <button key={f} className="px-3 py-1.5 text-xs font-medium border border-slate-200 rounded text-slate-600 hover:bg-slate-50 transition-colors">
                  {f}
                </button>
              ))}
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#f8f9fc] border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-6 font-semibold text-slate-600">ID</th>
                  <th className="py-3 px-6 font-semibold text-slate-600">Source / Sender</th>
                  <th className="py-3 px-6 font-semibold text-slate-600">Filename</th>
                  <th className="py-3 px-6 font-semibold text-slate-600">Received Time</th>
                  <th className="py-3 px-6 font-semibold text-slate-600">Status</th>
                  <th className="py-3 px-6 font-semibold text-slate-600 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockIntakeItems.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-6 text-slate-500 font-medium">{item.id}</td>
                    <td className="py-3 px-6 text-slate-800">
                      <div className="flex items-center gap-2">
                        {item.type === 'Email' ? <Mail className="h-3.5 w-3.5 text-slate-400" /> : <FileText className="h-3.5 w-3.5 text-slate-400" />}
                        {item.source}
                      </div>
                    </td>
                    <td className="py-3 px-6 text-slate-700 font-medium">{item.file}</td>
                    <td className="py-3 px-6 text-slate-500">{item.time}</td>
                    <td className="py-3 px-6">
                      <span className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full border", item.statusColor)}>
                        {item.status.includes('Ingested') && <CheckCircle2 className="h-3.5 w-3.5" />}
                        {item.status.includes('Pending') && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                        {item.status.includes('Failed') && <AlertCircle className="h-3.5 w-3.5" />}
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-6 text-right">
                      {item.status === 'Ingested' ? (
                        <button 
                          onClick={() => onNavigate('processing')}
                          className="text-[#386b9e] hover:underline font-medium text-sm"
                        >
                          Process &rarr;
                        </button>
                      ) : (
                        <span className="text-slate-300 text-sm">Wait</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  )
}
