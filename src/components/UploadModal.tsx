import React, { useState, useRef } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { UploadCloud, FileText, FileImage, Loader2 } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

interface UploadModalProps {
  children?: React.ReactNode
}

export const UploadModal: React.FC<UploadModalProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const setActiveTab = useAppStore((state) => state.setActiveTab)

  const handleUploadAnalyze = () => {
    setIsOpen(false)
    setActiveTab('intake')
  }

  const handleZoneClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px] p-8 gap-6 border-slate-200 shadow-2xl rounded-2xl">
        <DialogHeader className="space-y-1 relative">
          <DialogTitle className="text-2xl font-bold text-slate-800 tracking-tight">Invoice Upload & AI Processing</DialogTitle>
          <DialogDescription className="text-slate-500 text-sm">
            Compare AI predictions vs actual outcomes in shadow mode.
          </DialogDescription>
        </DialogHeader>

        {/* Drag and Drop Zone */}
        <div 
          onClick={handleZoneClick}
          className="bg-[#f0f4f8] border border-dashed border-slate-300 rounded-xl h-36 flex flex-col items-center justify-center gap-3 cursor-pointer hover:bg-[#e8f0fe] transition-colors relative"
        >
          <UploadCloud className="h-10 w-10 text-slate-500" strokeWidth={1.5} />
          <p className="text-sm text-slate-700 font-medium tracking-tight">
            Drag & drop your invoice files here, or click to select
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".pdf,.zip,.csv,.png,.jpeg,.jpg" 
            multiple 
            onChange={(e) => {
              if(e.target.files?.length) {
                // Here we would typically set the selected files in local state 
                // e.g. setFileList(Array.from(e.target.files))
                // For now, we rely on the mocked list below to simulate progress.
              }
            }}
          />
        </div>

        {/* Uploading Files List */}
        <div className="space-y-4 pt-2">
          {/* File 1: Processing */}
          <div className="flex items-center justify-between">
             <div className="flex-1 mr-4 space-y-1.5">
               <div className="flex items-center text-[13px] text-slate-700 font-medium">
                 <FileText className="h-4 w-4 mr-2 text-slate-400" />
                 Invoice_1023.pdf - 1.4 MB <span className="text-slate-500 font-normal ml-1">- Uploading...</span>
               </div>
               <div className="w-full flex items-center pr-2">
                 <div className="h-1.5 flex-1 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-500 rounded-full w-[70%]" />
                 </div>
                 <span className="text-[11px] text-slate-500 ml-3">70%]</span>
               </div>
             </div>
             
             <div className="flex items-center gap-2 mt-4 text-[#386b9e] text-sm font-medium">
               {/* Custom Waveform icon for "processing" approximation */}
               <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                 <path d="M12 4v16M8 8v8M16 8v8M4 11v2M20 11v2" />
               </svg>
               Processing with AI
               <Loader2 className="h-4 w-4 animate-spin text-slate-300 ml-1" />
             </div>
          </div>

          <div className="h-px w-full bg-slate-100" />

          {/* File 2: Completed */}
          <div className="flex items-center justify-between">
             <div className="flex items-center text-[13px] text-slate-700 font-medium">
               <FileImage className="h-4 w-4 mr-2 text-slate-400" />
               Invoice_1024.png - 850 KB <span className="text-slate-500 font-normal ml-1">- Completed</span>
             </div>
          </div>
          <div className="h-px w-full bg-slate-100" />
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button 
            onClick={handleUploadAnalyze}
            className="px-5 py-2.5 bg-[#386b9e] text-white hover:bg-[#2b527a] text-[14px] font-medium rounded-lg transition-colors"
          >
            Upload & Analyze
          </button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
