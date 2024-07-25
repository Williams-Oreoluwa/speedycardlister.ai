import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';


const Traders = () => {
  React.useEffect(() => {
    AOS.init();
  }, [])
  return (
    <div>
      <div className='py-[3rem] px-[2rem] flex flex-col gap-8 items-center justify-center'>
        <h1 className='text-[2rem] text-[#0304FF] font-semibold'>Our Top traders</h1>
        <div  className='flex flex-col md:grid md:grid-cols-2 lg:grid lg:grid-cols-3 xl:grid xl:grid-cols-3 2xl:grid 2xl:grid-cols-3 gap-[15rem] items-center justify-center text-center'>
            <span data-aos="flip-left" >
                <img src="/Group 1000003568.png" alt="" />
                
            </span>
            <span data-aos="flip-left" >
                <img src="/Group 1000003573.png" alt="" />
        
            </span>
            <span data-aos="flip-left" >
                <img src="/Frame 1000003575.png" alt="" />
            
            </span>
         
        </div>
      </div>
    </div>
  )
}

export default Traders
