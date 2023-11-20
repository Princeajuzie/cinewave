import HeroCarousel from '@/components/CarouselComp/HeroCarousel'
import Leftsidebar from '@/components/LeftsidebarComp/LeftSidebar'
import Navbar from '@/components/NavbarComp/Navbar'
import SubCarousel from '@/components/SubCarousel/SubCarousel'
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
      <div className='flex flex-col items-center justify-center lg:pl-[110px] px-[20px]  mt-[80px] lg:w-[97%] w-[100%]'>
      <HeroCarousel />  

        <SubCarousel />
  
      </div>
    </main>

   </div>
   </>
  )
}
