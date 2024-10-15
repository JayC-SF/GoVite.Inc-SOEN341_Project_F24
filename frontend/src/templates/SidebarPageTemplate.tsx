import { ReactNode } from 'react'
import { Sidebar } from '../modules/Sidebar'
interface SidebarPageTemplateProps { 
    hidden: boolean,
    children?: ReactNode 
}
export default function SidebarPageTemplate({ hidden, children }: SidebarPageTemplateProps) {
    
    return !hidden && (
        <div className='grid grid-cols-[200px,_1fr] text-stone-950 bg-primary-red h-[100vh] box-border'>
            <Sidebar />
            <div className='bg-white rounded-lg pb-4 shadow'>
                {children}
            </div>
        </div>
    )
}
