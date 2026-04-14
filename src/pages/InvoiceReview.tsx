import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Search, X, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

const initialInvoices = [
  { id: 'INV-2024-041', vendor: 'Baitox, Inc.', amount: '$1,000.00', date: '2024-05-12', status: 'Processed', statusColor: 'bg-[#e2f5ec] text-[#2e8c56]' },
  { id: 'INV-2024-043', vendor: 'Acme Supplies', amount: '$1,250.00', date: '2024-05-12', status: 'Exception', statusColor: 'bg-[#fdf3da] text-[#c99a2e]' },
  { id: 'INV-2024-044', vendor: 'Acme Supplies', amount: '$1,250.00', date: '2024-05-12', status: 'Exception', statusColor: 'bg-[#fdf3da] text-[#c99a2e]' },
  { id: 'INV-2024-045', vendor: 'Acme Supplies', amount: '$1,250.00', date: '2024-05-12', status: 'Low Confidence', statusColor: 'bg-[#fdebea] text-[#d9534f]' },
  { id: 'INV-2024-046', vendor: 'Acme Supplies', amount: '$1,250.00', date: '2024-05-12', status: 'Processed', statusColor: 'bg-[#e2f5ec] text-[#2e8c56]' },
  { id: 'INV-2024-047', vendor: 'Acme Supplies', amount: '$1,250.00', date: '2024-05-12', status: 'Exception', statusColor: 'bg-[#fdf3da] text-[#c99a2e]' },
  { id: 'INV-2024-048', vendor: 'Relax, Inc.', amount: '$1,200.00', date: '2024-05-12', status: 'Low Confidence', statusColor: 'bg-[#fdebea] text-[#d9534f]' },
  { id: 'INV-2024-049', vendor: 'Relax, Inc.', amount: '$1,200.00', date: '2024-05-12', status: 'Processed', statusColor: 'bg-[#e2f5ec] text-[#2e8c56]' },
  { id: 'INV-2024-050', vendor: 'Column comports', amount: '$500.00', date: '2024-05-12', status: 'Processed', statusColor: 'bg-[#e2f5ec] text-[#2e8c56]' },
];

export const InvoiceReview: React.FC = () => {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedId, setSelectedId] = useState('INV-2024-045');
  const [successMsg, setSuccessMsg] = useState('');

  const handleAction = (actionType: 'approve' | 'reject' | 'adjust') => {
    if (actionType === 'adjust') {
      alert(`Opening manual adjustment modal for ${selectedId}...`);
      return;
    }

    setInvoices(current => 
      current.map(inv => {
        if(inv.id === selectedId) {
          if(actionType === 'approve') {
            return { ...inv, status: 'Processed', statusColor: 'bg-[#e2f5ec] text-[#2e8c56]' }
          } else if (actionType === 'reject') {
            return { ...inv, status: 'Rejected', statusColor: 'bg-[#fdebea] text-[#d9534f]' }
          }
        }
        return inv;
      })
    );

    if (actionType === 'approve') {
       setSuccessMsg(`Invoice ${selectedId} approved and routed successfully!`);
       setTimeout(() => setSuccessMsg(''), 4000);
    }
  }

  return (
    <div className="flex h-full bg-[#f4f7fb] overflow-hidden">
      {/* Left Column (Table) */}
      <div className="flex-1 flex flex-col p-6 min-w-0 pr-0">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Invoice Review & AI Analysis</h1>
          <p className="text-slate-600 text-sm mt-1">Shadow Mode Dashboard | Comparing AI Predictions vs Actual Outcomes</p>
        </div>

        <Card className="flex-1 shadow-sm border-slate-200 rounded-xl overflow-hidden flex flex-col mr-6 bg-white relative">
          
          {successMsg && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full shadow-lg text-sm font-medium flex items-center gap-2 z-50 animate-in slide-in-from-top-4">
              <CheckCircle2 className="h-4 w-4" /> {successMsg}
            </div>
          )}

          <div className="p-4 border-b border-slate-100">
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search" 
                className="w-full h-9 bg-white border border-slate-300 rounded-md pl-9 pr-3 text-sm focus:outline-none focus:border-blue-400"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto w-full">
            <table className="w-full text-sm text-left">
              <thead className="bg-[#f8f9fc] border-b border-slate-200 sticky top-0 z-10">
                <tr>
                  <th className="py-3 px-4 w-10">
                    <input type="checkbox" className="rounded border-slate-300" />
                  </th>
                  <th className="py-3 px-2 font-semibold text-slate-600">Invoice ID <span className="text-slate-400 font-normal">↑</span></th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Vendor</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Amount</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Date</th>
                  <th className="py-3 px-4 font-semibold text-slate-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {invoices.map((inv) => (
                  <tr 
                    key={inv.id} 
                    onClick={() => setSelectedId(inv.id)}
                    className={cn("cursor-pointer transition-colors", selectedId === inv.id ? "bg-[#e8f0fe] border-l-2 border-[#1a73e8]" : "hover:bg-slate-50 border-l-2 border-transparent")}
                  >
                    <td className="py-3 px-4">
                      <input type="checkbox" className="rounded border-slate-300" checked={selectedId === inv.id} readOnly />
                    </td>
                    <td className="py-3 px-2 font-medium text-slate-700">{inv.id}</td>
                    <td className="py-3 px-4 text-slate-700">{inv.vendor}</td>
                    <td className="py-3 px-4 text-slate-700">{inv.amount}</td>
                    <td className="py-3 px-4 text-slate-700">{inv.date}</td>
                    <td className="py-3 px-4">
                      <span className={cn("px-2.5 py-1 text-[13px] rounded-full border", inv.statusColor, inv.statusColor.includes('e2f5ec') ? "border-[#a3d9b8]" : inv.statusColor.includes('fdf3da') ? "border-[#e0c482]" : "border-[#eeb4b3]")}>
                        {inv.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Right Column (Details) */}
      <div className="w-[420px] bg-white border-l border-slate-200 flex flex-col shadow-[-4px_0_15px_-3px_rgba(0,0,0,0.05)] z-10 shrink-0 overflow-y-auto">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-20">
          <h2 className="text-lg font-bold text-slate-800">Invoice Details | {selectedId}</h2>
          <button className="text-slate-400 hover:text-slate-600">
             <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          {/* Extracted Fields */}
          <section>
            <h3 className="font-bold text-slate-800 mb-3 text-[15px]">Extracted Fields</h3>
            <div className="space-y-1.5 text-[14px]">
              <div className="grid grid-cols-[120px_1fr]"><span className="text-slate-500">Invoice #:</span> <span className="text-slate-800 font-medium font-mono pl-1">2024-045</span></div>
              <div className="grid grid-cols-[120px_1fr]"><span className="text-slate-500">Invoice Date:</span> <span className="text-slate-800 font-medium pl-1">2024-05-12</span></div>
              <div className="grid grid-cols-[120px_1fr]"><span className="text-slate-500">Vendor Name:</span> <span className="text-slate-800 font-medium pl-1">Acme Supplies</span></div>
              <div className="grid grid-cols-[120px_1fr]"><span className="text-slate-500">Total Amount:</span> <span className="text-slate-800 font-medium pl-1">$1,250.00</span></div>
            </div>
          </section>

          {/* AI Recommendations */}
          <section>
            <h3 className="font-bold text-slate-800 mb-3 text-[15px]">AI Recommendations</h3>
            <div className="space-y-1.5 text-[14px]">
              <div className="grid grid-cols-[120px_1fr]"><span className="text-slate-500">Property:</span> <span className="text-slate-800 pl-1">Riverview Apartments</span></div>
              <div className="grid grid-cols-[120px_1fr] items-start">
                <span className="text-slate-500 pt-0.5">Top 3 GL Codes:</span> 
                <div className="text-slate-800 pl-1 flex flex-col gap-0.5">
                  <span>6001 (Repairs)</span>
                  <span>6005 (Supplies)</span>
                  <span>6020 (Maintenance)</span>
                </div>
              </div>
            </div>
          </section>

          {/* Confidence Scores */}
          <section>
            <h3 className="font-bold text-slate-800 mb-4 text-[15px]">Confidence Scores</h3>
            <div className="space-y-3.5 text-[14px]">
              {[
                { label: 'Vendor Match:', pct: 98, color: 'bg-green-600' },
                { label: 'Amount Match:', pct: 95, color: 'bg-green-600' },
                { label: 'GL Code 1:', pct: 60, color: 'bg-orange-500' },
                { label: 'GL Code 2:', pct: 45, color: 'bg-red-500' },
              ].map(score => (
                <div key={score.label} className="grid grid-cols-[120px_1fr_40px] items-center gap-3">
                  <span className="text-slate-700 font-medium">{score.label}</span>
                  <div className="flex-1 h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div className={cn("h-full rounded-full", score.color)} style={{ width: `${score.pct}%` }} />
                  </div>
                  <span className="text-right text-slate-700 font-medium text-[13px]">{score.pct}%</span>
                </div>
              ))}
            </div>
          </section>

          {/* Diff View */}
          <section>
            <h3 className="font-bold text-slate-800 mb-3 text-[15px]">Diff View: AI Predictions vs Actuals</h3>
            <div className="rounded-lg overflow-hidden border border-slate-200">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <th className="py-2.5 px-3 text-left font-semibold text-slate-700 pl-3">Field</th>
                    <th className="py-2.5 px-3 text-left font-semibold text-slate-700">AI Predicted</th>
                    <th className="py-2.5 px-3 text-left font-semibold text-slate-700">Actual Outcome</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  <tr>
                    <td className="py-2.5 px-3 text-slate-600">Property</td>
                    <td className="py-2.5 px-3 bg-[#e2f5ec] text-[#2e8c56] font-medium border-x border-white">Riverview Apartments</td>
                    <td className="py-2.5 px-3 bg-[#e2f5ec] text-[#2e8c56] font-medium">Riverview Apartments</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-600">GL Code 1</td>
                    <td className="py-2.5 px-3 bg-[#fdebea] text-[#d9534f] font-medium border-x border-white">6001 (Repairs)</td>
                    <td className="py-2.5 px-3 bg-[#fdebea] text-[#d9534f] font-medium">6020 (Maintenance)</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 text-slate-600">GL Code 2</td>
                    <td className="py-2.5 px-3 bg-[#fdebea] text-[#d9534f] font-medium border-x border-white">6005 (Supplies)</td>
                    <td className="py-2.5 px-3 font-medium text-slate-600">N/A</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Action Buttons Footer */}
        <div className="p-6 border-t border-slate-100 flex items-center justify-between gap-3 mt-auto bg-slate-50/50 sticky bottom-0">
          <button onClick={() => handleAction('approve')} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm py-2 rounded-md font-medium text-[14px]">
            Approve
          </button>
          <button onClick={() => handleAction('reject')} className="flex-1 bg-white border shadow-sm border-slate-200 text-red-600 hover:bg-red-50 py-2 rounded-md font-medium text-[14px]">
            Reject
          </button>
          <button onClick={() => handleAction('adjust')} className="flex-[1.5] bg-white border flex justify-center shadow-sm border-slate-200 text-slate-700 hover:bg-slate-50 py-2 rounded-md font-medium text-[14px]">
            Manually Adjust
          </button>
        </div>
      </div>
    </div>
  )
}
