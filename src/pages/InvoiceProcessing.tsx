import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Building2, Tag, FileText, CornerDownRight, CheckCircle2 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

export const InvoiceProcessing: React.FC = () => {
  const setActiveTab = useAppStore(state => state.setActiveTab)
  const [docClass, setDocClass] = useState('Invoice')
  const [vendor, setVendor] = useState('Acme Plumbing Services')
  const [amount, setAmount] = useState('450.00')
  const [date, setDate] = useState('2024-10-25')

  return (
    <div className="flex h-[calc(100vh-60px)] bg-[#f4f7fb] overflow-hidden">
      {/* Left Column (Document Viewer Mock) */}
      <div className="flex-1 flex flex-col p-6 pr-0 min-w-0">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Processing: IN-001</h1>
            <p className="text-slate-600 text-sm mt-1">Review AI extraction and approve routing.</p>
          </div>
        </div>

        <Card className="flex-1 shadow-sm border-slate-200 rounded-xl overflow-hidden flex flex-col mr-6 bg-slate-200/50 items-center justify-center relative">
           {/* Placeholder for PDF Viewer */}
           <FileText className="h-16 w-16 text-slate-300 mb-4" />
           <p className="text-slate-500 font-medium">invoice_march_final.pdf</p>
           <div className="absolute inset-0 border-[4px] border-dashed border-slate-300/50 m-4 rounded-lg pointer-events-none" />
        </Card>
      </div>

      {/* Right Column (Processing Panels) */}
      <div className="w-[480px] bg-white border-l border-slate-200 flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10 shrink-0 overflow-y-auto">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20">
          <h2 className="text-lg font-bold text-slate-800">Processing Tasks</h2>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Classification Panel */}
          <section>
            <div className="flex items-center gap-2 mb-3">
               <Tag className="h-4 w-4 text-indigo-500" />
               <h3 className="font-bold text-slate-800 text-[15px]">Classification</h3>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
               <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Document Type</label>
               <select 
                 className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                 value={docClass}
                 onChange={(e) => setDocClass(e.target.value)}
               >
                 <option value="Invoice">Invoice</option>
                 <option value="Credit Memo">Credit Memo</option>
                 <option value="Utility Bill">Utility Bill</option>
                 <option value="Statement">Statement</option>
               </select>
            </div>
          </section>

          {/* Field Extraction Panel */}
          <section>
            <div className="flex items-center gap-2 mb-3">
               <FileText className="h-4 w-4 text-indigo-500" />
               <h3 className="font-bold text-slate-800 text-[15px]">Field Extraction</h3>
            </div>
            <div className="grid grid-cols-2 gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50/50">
               <div className="col-span-2">
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Vendor</label>
                 <input 
                   type="text" 
                   value={vendor}
                   onChange={e => setVendor(e.target.value)}
                   className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700" 
                 />
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Amount</label>
                 <div className="relative">
                   <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">$</span>
                   <input 
                     type="text" 
                     value={amount}
                     onChange={e => setAmount(e.target.value)}
                     className="w-full bg-white border border-slate-300 rounded-md pl-6 pr-3 py-2 text-sm text-slate-700" 
                   />
                 </div>
               </div>
               <div>
                 <label className="block text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">Date</label>
                 <input 
                   type="date" 
                   value={date}
                   onChange={e => setDate(e.target.value)}
                   className="w-full bg-white border border-slate-300 rounded-md px-3 py-2 text-sm text-slate-700" 
                 />
               </div>
            </div>
          </section>

          {/* Recommendation Panel */}
          <section>
            <div className="flex items-center gap-2 mb-3">
               <Building2 className="h-4 w-4 text-indigo-500" />
               <h3 className="font-bold text-slate-800 text-[15px]">Recommendations</h3>
            </div>
            <div className="space-y-3">
               <div className="p-3 rounded-lg border border-emerald-200 bg-emerald-50">
                 <div className="flex items-center justify-between mb-1">
                   <span className="text-sm font-semibold text-emerald-800">Property / Entity Match</span>
                   <span className="text-xs font-bold text-emerald-600">98% Match</span>
                 </div>
                 <p className="text-emerald-700 text-sm">Sunset Apartments (Entity: 405-SA)</p>
               </div>
               <div className="p-3 rounded-lg border border-blue-200 bg-blue-50">
                 <div className="flex flex-col gap-2">
                   <span className="text-sm font-semibold text-blue-800">Suggested GL Codes</span>
                   <div className="flex items-center justify-between bg-white rounded p-1.5 border border-blue-100">
                     <span className="text-sm text-blue-900">6001 - Plumbing Repairs</span>
                     <span className="text-xs font-bold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">95%</span>
                   </div>
                   <div className="flex items-center justify-between bg-white/50 rounded p-1.5 border border-blue-100/50 opacity-70">
                     <span className="text-sm text-blue-900">6020 - General Maintenance</span>
                     <span className="text-xs font-bold text-blue-600 bg-blue-100/50 px-2 py-0.5 rounded">75%</span>
                   </div>
                 </div>
               </div>
            </div>
          </section>

          {/* Routing View */}
          <section>
            <div className="flex items-center gap-2 mb-3">
               <CornerDownRight className="h-4 w-4 text-indigo-500" />
               <h3 className="font-bold text-slate-800 text-[15px]">Approval Routing</h3>
            </div>
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
               <div className="flex items-center gap-4">
                 <div className="flex flex-col items-center">
                   <div className="h-8 w-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600">AP</div>
                   <div className="w-0.5 h-6 bg-slate-300 my-1"></div>
                   <div className="h-8 w-8 rounded-full bg-[#386b9e] flex items-center justify-center text-xs font-bold text-white shadow-sm ring-2 ring-blue-100">PM</div>
                 </div>
                 <div className="flex-1 space-y-4 py-1">
                   <div>
                     <p className="text-sm font-semibold text-slate-700">Accounts Payable</p>
                     <p className="text-xs text-emerald-600 font-medium flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Auto-processed</p>
                   </div>
                   <div>
                     <p className="text-sm font-semibold text-slate-900">Property Manager</p>
                     <p className="text-xs text-slate-500">Sarah Jenkins (Pending)</p>
                   </div>
                 </div>
               </div>
               
               <div className="mt-4 flex gap-2">
                 <button className="flex-1 bg-white border border-slate-300 text-slate-700 text-xs py-1.5 rounded font-medium hover:bg-slate-50 relative pr-6">
                   Reroute
                   <span className="absolute right-2 top-1/2 -translate-y-1/2">▾</span>
                 </button>
               </div>
            </div>
          </section>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto bg-white shadow-[0_-4px_10px_-4px_rgba(0,0,0,0.05)] z-20">
          <button className="flex-1 bg-white border shadow-sm border-slate-200 text-slate-700 hover:bg-slate-50 py-2.5 rounded-md font-medium text-[14px]">
            Hold
          </button>
          <button 
            onClick={() => setActiveTab('invoices')}
            className="flex-[2] bg-[#386b9e] text-white shadow-sm hover:bg-[#2b527a] py-2.5 rounded-md font-medium text-[14px] transition-colors"
          >
            Send to Shadow Review
          </button>
        </div>
      </div>
    </div>
  )
}
