import React from 'react'
import { Sidebar } from './components/layout/Sidebar'
import { Navbar } from './components/layout/Navbar'
import { Dashboard } from './pages/Dashboard'
import { InvoiceReview } from './pages/InvoiceReview'
import { ExceptionQueue } from './pages/ExceptionQueue'
import { Reports } from './pages/Reports'
import { IntakeDashboard } from './pages/IntakeDashboard'
import { InvoiceProcessing } from './pages/InvoiceProcessing'

import { useAppStore } from './store/useAppStore'

function App() {
  const { activeTab, setActiveTab } = useAppStore()

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'intake':
        return <IntakeDashboard onNavigate={setActiveTab} />
      case 'processing':
        return <InvoiceProcessing />
      case 'invoices':
        return <InvoiceReview />
      case 'exceptions':
        return <ExceptionQueue />
      case 'reports':
        return <Reports />
      case 'settings':
        return <div className="p-8"><h1 className="text-2xl font-bold">Settings</h1></div>
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="flex bg-slate-50 min-h-screen text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Navbar />
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {renderPage()}
        </main>
      </div>
    </div>
  )
}

export default App
