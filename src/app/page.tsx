"use server"
import HeroCarousel from '@/components/CarouselComp/HeroCarousel'
import Footer from '@/components/FooterComp/Footer'
import Leftsidebar from '@/components/LeftsidebarComp/LeftSidebar'
import Navbar from '@/components/NavbarComp/Navbar'
import SubCarousel from '@/components/SubCarousel/SubCarousel'
import Image from 'next/image'

export default async function  Home(){
  "use server";


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
      <div className='flex flex-col items-center justify-center lg:pl-[110px] px-[10px] lg:px-[20px]  mt-[80px] lg:w-[100%] w-[100%]'>
      <HeroCarousel />  

        <SubCarousel />
  
      </div>
    </main> 

 


   </div>
   <footer>

<Footer />
</footer>

   </>
  )
}
