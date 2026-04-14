import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  Users, TrendingUp, CheckCircle, 
  Search, SlidersHorizontal, MoreHorizontal 
} from 'lucide-react'
import vendorData from '@/data/vendors.json'


const HygieneBadge = ({ level }: { level: string }) => {
  switch (level) {
    case 'Good':
      return <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200">Good</Badge>
    case 'Fair':
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 border-blue-200">Fair</Badge>
    case 'Warning':
      return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100 border-amber-200">Warning</Badge>
    case 'Bad':
      return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 border-red-200">Needs Audit</Badge>
    default:
      return <Badge variant="outline">{level}</Badge>
  }
}

export const VendorInsights: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Vendor Insights</h1>
        <p className="text-slate-500">Analyze vendor submission patterns and data quality.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Onboarded Vendors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">128</span>
              <Users className="h-5 w-5 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Avg. Error Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">4.2%</span>
              <TrendingUp className="h-5 w-5 text-emerald-500" />
            </div>
          </CardContent>
        </Card>
        <Card className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Hygiene Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">A-</span>
              <CheckCircle className="h-5 w-5 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b px-6 py-4 bg-slate-50/50">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Vendor Directory</CardTitle>
            <div className="flex gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="h-8 w-48 pl-8 pr-3 text-xs border rounded-md focus:ring-1 focus:ring-indigo-500 outline-none"
                />
              </div>
              <Badge variant="outline" className="h-8 gap-1 text-[10px] cursor-pointer">
                <SlidersHorizontal className="h-3 w-3" /> Filters
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="text-[10px] text-slate-400 uppercase tracking-widest border-b font-semibold bg-slate-50/30">
              <tr>
                <th className="px-6 py-3">Vendor Name</th>
                <th className="px-6 py-3">Invoice Volume</th>
                <th className="px-6 py-3">AI Error Rate</th>
                <th className="px-6 py-3">Common Issues</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {vendorData.map((vendor) => (
                <tr key={vendor.id} className="hover:bg-slate-50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-semibold text-slate-900">{vendor.name}</span>
                      <span className="text-[10px] text-slate-400">{vendor.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-medium text-slate-700">{vendor.invoiceCount}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1.5 min-w-[120px]">
                      <div className="flex justify-between text-[10px]">
                        <span className="font-medium">{(vendor.errorRate * 100).toFixed(1)}%</span>
                      </div>
                      <Progress value={vendor.errorRate * 100} className="h-1" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {vendor.commonIssues.map((issue, idx) => (
                        <span key={idx} className="text-[10px] px-1.5 py-0.5 bg-slate-100 text-slate-500 rounded">
                          {issue}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <HygieneBadge level={vendor.hygiene} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-1 text-slate-300 hover:text-slate-600 transition-colors">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
