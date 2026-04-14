import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { Download, Calendar, CheckCircle2, XCircle, AlertCircle } from 'lucide-react'
import kpiData from '@/data/kpis.json'
import { cn } from '@/lib/utils'

const COLORS = ['#10b981', '#6366f1', '#f59e0b', '#ef4444']

const accuracyDistribution = [
  { name: 'Exact Match', value: 78 },
  { name: 'Minor Adjustment', value: 15 },
  { name: 'Correction Needed', value: 5 },
  { name: 'Critical Error', value: 2 },
]

const dailyDiffs = [
  { date: '2024-10-25', processed: 145, predAcc: 94.5, actAcc: 98.2, errRate: 3.5, timeSaved: '12h 30m' },
  { date: '2024-10-24', processed: 182, predAcc: 92.0, actAcc: 97.5, errRate: 4.8, timeSaved: '15h 45m' },
  { date: '2024-10-23', processed: 95, predAcc: 96.1, actAcc: 99.0, errRate: 1.2, timeSaved: '8h 15m' },
  { date: '2024-10-22', processed: 210, predAcc: 91.5, actAcc: 95.8, errRate: 6.0, timeSaved: '18h 00m' },
  { date: '2024-10-21', processed: 160, predAcc: 93.8, actAcc: 98.0, errRate: 2.8, timeSaved: '14h 20m' },
]

export const Reports: React.FC = () => {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500 bg-[#f4f7fb] min-h-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Intelligence Reports</h1>
          <p className="text-slate-600 text-sm mt-1">Deep dive into AI performance and shadowing accuracy.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => alert("Simulating data refresh for the last 30 days!")} 
            className="flex items-center px-3 py-1 gap-2 border border-slate-200 bg-white rounded-md text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Calendar className="h-3.5 w-3.5" /> Last 30 Days
          </button>
          <button 
            onClick={() => alert("Downloading PDF... Daily Diff Report export generated.")} 
            className="flex items-center gap-2 px-4 py-1.5 bg-[#386b9e] text-white rounded-md text-sm font-medium hover:bg-[#2b527a] transition-colors"
          >
            <Download className="h-4 w-4" /> Export PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">1,059</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">82.5% of total volume</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500" /> Adjustments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">192</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">15.0% of total volume</p>
          </CardContent>
        </Card>
        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-semibold flex items-center gap-2">
              <XCircle className="h-4 w-4 text-red-500" /> Errors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-800">33</div>
            <p className="text-xs text-slate-500 mt-1 font-medium">2.5% of total volume</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Match Accuracy Distribution</CardTitle>
            <CardDescription>Breakdown of AI predictions vs human outcomes.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] flex flex-col justify-end">
            <div className="flex-1 min-h-0 relative flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={accuracyDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius="60%"
                    outerRadius="80%"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {accuracyDistribution.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              {accuracyDistribution.map((entry, index) => (
                <div key={entry.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  <span className="text-[10px] font-medium text-slate-500 uppercase tracking-wide">{entry.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-xl border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-slate-800">Daily Processing Volume</CardTitle>
            <CardDescription>Number of invoices processed in shadow mode.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
              <BarChart data={kpiData.accuracyTrend}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#64748b' }} />
                <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="predicted" name="Invoices" fill="#386b9e" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="rounded-xl border-slate-200 shadow-sm">
        <CardHeader className="border-b border-slate-100 pb-4">
          <CardTitle className="text-slate-800">Daily Diff Report</CardTitle>
          <CardDescription>Tabular comparison of predicted vs actual outcomes with daily efficiency metrics.</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                <tr>
                  <th className="px-6 py-3.5 font-semibold">Date</th>
                  <th className="px-6 py-3.5 font-semibold">Total Processed</th>
                  <th className="px-6 py-3.5 font-semibold">Predicted Accuracy</th>
                  <th className="px-6 py-3.5 font-semibold">Actual Accuracy</th>
                  <th className="px-6 py-3.5 font-semibold">Exception Rate</th>
                  <th className="px-6 py-3.5 font-semibold">Time Saved</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dailyDiffs.map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-3 text-slate-700 font-medium">{row.date}</td>
                    <td className="px-6 py-3 text-slate-700">{row.processed}</td>
                    <td className="px-6 py-3 text-slate-700">{row.predAcc}%</td>
                    <td className="px-6 py-3 text-emerald-600 font-medium">{row.actAcc}%</td>
                    <td className="px-6 py-3 text-slate-700">
                      <span className={cn("px-2 py-0.5 rounded text-xs font-medium", row.errRate > 5 ? "bg-red-50 text-red-600" : "bg-slate-100 text-slate-600")}>
                        {row.errRate}%
                      </span>
                    </td>
                    <td className="px-6 py-3 text-[#386b9e] font-medium">{row.timeSaved}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
    </div>
  )
}
