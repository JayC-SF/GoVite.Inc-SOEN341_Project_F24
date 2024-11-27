import { ReactNode } from 'react'
import { Sidebar } from '../modules/Sidebar'
import Footer from '../modules/Footer'
interface SidebarPageTemplateProps {
    hidden: boolean,
    children?: ReactNode
}
export default function SidebarPageTemplate({ hidden, children }: SidebarPageTemplateProps) {

    return !hidden && (
        <><div className='grid grid-cols-[235px,_1fr] text-stone-950 bg-[#9B394B] h-[100vh] box-border'>
            <Sidebar />
            <div className='bg-white rounded-lg shadow overflow-y-scroll min-h-full'>
                {children}
            </div>
        </div>
            <div>
                <Footer />
            </div>
        </>
    )
}
