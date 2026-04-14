import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import { FileText, Clock, Sparkles, User, ShoppingBag, FileBarChart, Handshake } from 'lucide-react'
import { cn } from '@/lib/utils'

// Mock Data reproducing the screenshots
const kpiData = {
  accuracyTrend: [
    { name: '0 Day', predicted: 93, actual: 93 },
    { name: '5 Day', predicted: 100, actual: 95 },
    { name: '10 Day', predicted: 90, actual: 88 },
    { name: '15 Day', predicted: 98, actual: 96 },
    { name: '20 Day', predicted: 96, actual: 95 },
    { name: '25 Day', predicted: 98, actual: 94 },
    { name: '30 Day', predicted: 96, actual: 94 }
  ]
};

const activityData = [
  { id: 1, title: "AI Predicted GL Account for Invoice #1024", time: "10:05 AM", icon: Sparkles, color: "text-blue-500", bg: "bg-blue-50" },
  { id: 2, title: "User Approved Exception for Vendor 'Acme Supplies'", time: "9:45 AM", icon: User, color: "text-purple-600", bg: "bg-purple-50" },
  { id: 3, title: "New Vendor 'Global Services' Onboarded", time: "Yesterday", icon: ShoppingBag, color: "text-indigo-500", bg: "bg-indigo-50" },
  { id: 4, title: "Monthly Report Generated", time: "Yesterday", icon: FileBarChart, color: "text-blue-500", bg: "bg-blue-50" }
];

const StatCard = ({ title, value, icon: Icon, trend, description, trendColor = "text-emerald-500" }: any) => (
  <Card className="hover:shadow-sm transition-shadow rounded-xl border-slate-200 shadow-sm flex flex-col justify-between p-5">
    <div className="flex flex-row items-start justify-between">
      <h3 className="text-[15px] font-semibold text-slate-700">{title}</h3>
      <div className="p-2 bg-slate-100 rounded-full text-slate-500">
        <Icon className="h-4 w-4" />
      </div>
    </div>
    <div className="mt-4">
      <div className="text-[32px] font-bold text-slate-800 tracking-tight leading-none">{value}</div>
      <div className="flex items-center mt-3 text-sm">
        {trend && <span className={cn("font-medium", trendColor)}>{trend}</span>}
        <span className="text-slate-500 ml-1">{description}</span>
      </div>
    </div>
  </Card>
)

export const Dashboard: React.FC = () => {
  return (
    <div className="p-8 space-y-6 bg-[#f4f7fb] min-h-full">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <StatCard 
          title="Total Invoices" 
          value="1,250" 
          icon={FileText} 
          description="Last 30 days"
        />
        <StatCard 
          title="% Auto-classified" 
          value="92%" 
          icon={Sparkles} 
          trend="+5%" 
          description="from last month"
          trendColor="text-emerald-500"
        />
        <StatCard 
          title="GL Match Accuracy" 
          value="99.5%" 
          icon={Handshake} 
          description="Predicted vs Actual"
        />
        <StatCard 
          title="Time Saved" 
          value="320 hours" 
          icon={Clock} 
          description="Equivalent to 2 FTEs"
        />
      </div>

      <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
         {/* Chart Card */}
        <Card className="xl:col-span-2 rounded-xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="text-lg font-semibold text-slate-800">Coding Accuracy Over Time (Predicted vs Actual)</CardTitle>
          </CardHeader>
          <CardContent className="h-[320px] px-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={kpiData.accuracyTrend} margin={{ top: 20, right: 30, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#64748b' }} 
                  domain={[90, 100]}
                  tickFormatter={(val) => `${val}%`}
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={36} 
                  iconType="plainline" 
                  iconSize={14}
                  wrapperStyle={{ top: -10, right: 20, fontSize: '13px', color: '#475569' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  name="Predicted"
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={false}
                />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  name="Actual"
                  stroke="#a855f7" 
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Activity Card */}
        <Card className="xl:col-span-1 rounded-xl border-slate-200 shadow-sm">
          <CardHeader className="pb-2 pt-6 px-6">
            <CardTitle className="text-lg font-semibold text-slate-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="px-6 pt-4 pb-6">
            <div className="relative border-l border-slate-200 ml-4 space-y-8">
              {activityData.map((activity, index) => (
                <div key={activity.id} className="relative flex gap-4 items-start pl-6">
                  {/* Icon Badge acting as bullet */}
                  <div className={cn(
                    "absolute -left-[18px] top-0 h-9 w-9 rounded-full flex items-center justify-center ring-4 ring-white shadow-sm",
                    activity.bg
                  )}>
                    <activity.icon className={cn("h-4 w-4", activity.color)} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex flex-col gap-1 pt-1">
                    <p className="text-[14px] font-medium text-slate-700 leading-snug">
                      {activity.title}
                    </p>
                    <span className="text-[13px] text-slate-500">
                      {activity.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
