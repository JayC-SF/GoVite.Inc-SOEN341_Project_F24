import { ReactNode } from 'react'
import { Sidebar } from '../modules/Sidebar'
interface SidebarPageProps { 
    hidden: boolean,
    children?: ReactNode 
}
export default function SidebarPage({ hidden, children }: SidebarPageProps) {
    
    return !hidden && (
        <div className='grid gap-4 p-4 grid-cols-[200px,_1fr] text-stone-950 bg-primary-red'>
            <Sidebar />
            <div className='bg-white rounded-lg pb-4 shadow h-[200vh]'>
                {children}
            </div>
        </div>
    )
}
