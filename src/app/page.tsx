import Leftsidebar from '@/components/LeftsidebarComp/LeftSidebar'
import Navbar from '@/components/NavbarComp/Navbar'
import Image from 'next/image'

export default function Home(): JSX.Element{
  return (
   <>
   <div>
    <nav>

   <Navbar />
    </nav>

    <main>
      <aside>
  <Leftsidebar />
      </aside>
      <div>

      </div>
    </main>

   </div>
   </>
  )
}
