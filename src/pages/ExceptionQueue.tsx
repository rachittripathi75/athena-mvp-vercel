import React, { useState } from 'react'
import { Card } from "@/components/ui/card"
import { Search } from 'lucide-react'
import { cn } from '@/lib/utils'

const exceptionData = [
  { id: '#INV-24-001', vendor: 'Acme Plumbing', property: 'Sunset Apartments', propertyHighlight: false, amount: '$450.00', date: '10/25/2024', status: 'Pending', reason: 'Missing PDF', reasonColor: 'bg-[#d9534f] text-white', priority: 'High', priorityDot: 'bg-red-500', action: 'Resolve' },
  { id: '#INV-24-002', vendor: 'Bright Spark Electric', property: 'Unclear Property', propertyHighlight: true, amount: '$1200.50', date: '10/24/2024', status: 'Under Review', reason: 'Unclear Property', reasonColor: 'bg-slate-200 text-slate-700', priority: 'High', priorityDot: 'bg-red-500', action: 'Review' },
  { id: '#INV-24-003', vendor: 'Green Leaf Landscaping', property: 'Oakwood Complex', propertyHighlight: false, amount: '$890.00', date: '10/23/2024', status: 'Processing', reason: 'Low Confidence', reasonColor: 'bg-[#f0ad4e] text-white', priority: 'Medium', priorityDot: 'bg-amber-400', action: 'Verify' },
  { id: '#INV-24-004', vendor: 'City Water Co.', property: 'Maple Grove', propertyHighlight: false, amount: '$235.75', date: '10/22/2024', status: 'Flagged', reason: 'Duplicate', reasonColor: 'bg-[#5bc0de] text-white', priority: 'Low', priorityDot: 'bg-green-500', action: 'Dismiss' },
];

export const ExceptionQueue: React.FC = () => {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [reasonFilter, setReasonFilter] = useState('All')
  const [propertyFilter, setPropertyFilter] = useState('All')
  const [priorityFilter, setPriorityFilter] = useState('High')

  const filteredData = exceptionData.filter(row => {
    const matchesSearch = row.vendor.toLowerCase().includes(search.toLowerCase()) || row.id.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || row.status === statusFilter
    const matchesReason = reasonFilter === 'All' || row.reason === reasonFilter
    const matchesProperty = propertyFilter === 'All' || row.property === propertyFilter
    const matchesPriority = priorityFilter === 'All' || row.priority === priorityFilter
    
    return matchesSearch && matchesStatus && matchesReason && matchesProperty && matchesPriority
  })

  return (
    <div className="p-8 bg-[#f4f7fb] min-h-full space-y-6">
      <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Exception Management Queue</h1>

      <Card className="shadow-sm border-slate-200 rounded-xl overflow-hidden">
        {/* Filters Top Bar */}
        <div className="p-4 border-b border-slate-200 bg-white flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 overflow-x-auto">
            {/* Search */}
            <div className="relative shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-[180px] h-9 bg-white border border-slate-300 rounded-md pl-9 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-[#386b9e]"
              />
            </div>
            
            <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="shrink-0 h-9 px-3 bg-white border border-slate-300 rounded-md text-sm text-slate-600 outline-none focus:ring-1 focus:ring-[#386b9e]">
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Under Review">Under Review</option>
              <option value="Processing">Processing</option>
              <option value="Flagged">Flagged</option>
            </select>

            <select value={reasonFilter} onChange={e => setReasonFilter(e.target.value)} className="shrink-0 h-9 px-3 bg-white border border-slate-300 rounded-md text-sm text-slate-600 outline-none focus:ring-1 focus:ring-[#386b9e]">
              <option value="All">All Reasons</option>
              <option value="Missing PDF">Missing PDF</option>
              <option value="Unclear Property">Unclear Property</option>
              <option value="Low Confidence">Low Confidence</option>
              <option value="Duplicate">Duplicate</option>
            </select>

            <select value={propertyFilter} onChange={e => setPropertyFilter(e.target.value)} className="shrink-0 h-9 px-3 bg-white border border-slate-300 rounded-md text-sm text-slate-600 outline-none focus:ring-1 focus:ring-[#386b9e]">
              <option value="All">All Properties</option>
              <option value="Sunset Apartments">Sunset Apartments</option>
              <option value="Oakwood Complex">Oakwood Complex</option>
              <option value="Maple Grove">Maple Grove</option>
              <option value="Unclear Property">Unclear Property</option>
            </select>
            
            <select className="shrink-0 h-9 px-3 bg-white border border-slate-300 rounded-md text-sm text-slate-600 outline-none placeholder-slate-400">
              <option>Last 30 Days</option>
              <option>Last 7 Days</option>
            </select>
          </div>
          
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-sm font-medium text-slate-600">Priority:</span>
            <div className="flex bg-slate-100 rounded-md p-0.5 border border-slate-200">
              {['All', 'High', 'Medium', 'Low'].map(level => (
                <button 
                  key={level}
                  onClick={() => setPriorityFilter(level)}
                  className={cn(
                    "px-4 py-1.5 text-sm font-medium rounded shadow-sm transition-colors",
                    priorityFilter === level ? "bg-[#386b9e] text-white" : "text-slate-600 hover:text-slate-900 bg-transparent shadow-none"
                  )}>
                  {level}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="overflow-x-auto bg-white min-h-[400px]">
          <table className="w-full text-sm text-left">
            <thead className="bg-white border-b border-slate-200 text-slate-600 font-semibold">
              <tr>
                <th className="px-6 py-4 font-semibold">Invoice ID</th>
                <th className="px-6 py-4 font-semibold">Vendor</th>
                <th className="px-6 py-4 font-semibold">Property</th>
                <th className="px-6 py-4 font-semibold">Amount</th>
                <th className="px-6 py-4 font-semibold">Date Received</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Reason Tag</th>
                <th className="px-6 py-4 font-semibold">Priority</th>
                <th className="px-6 py-4 font-semibold">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredData.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-12 text-slate-500">No exceptions match your filters.</td></tr>
              ) : filteredData.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 text-slate-700 font-medium">{row.id}</td>
                  <td className="px-6 py-4 text-slate-700">{row.vendor}</td>
                  <td className="px-6 py-4 text-slate-700">
                    <span className={cn("px-2 py-1 rounded", row.propertyHighlight && "bg-yellow-100 text-yellow-800 font-medium")}>
                       {row.property}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{row.amount}</td>
                  <td className="px-6 py-4 text-slate-700">{row.date}</td>
                  <td className="px-6 py-4 text-slate-700">{row.status}</td>
                  <td className="px-6 py-4">
                    <span className={cn("px-2.5 py-1 text-[13px] font-medium rounded-full", row.reasonColor)}>
                      {row.reason}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-700">
                      <span className={cn("h-2.5 w-2.5 rounded-full", row.priorityDot)}></span>
                      {row.priority}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button 
                      onClick={() => alert(`Marking ${row.id} as ${row.action}d!`)}
                      className="font-medium text-[#386b9e] hover:underline"
                    >
                      {row.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
