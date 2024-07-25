import React from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const Pricing = () => {
  React.useEffect(() => {
    AOS.init();
  }, [])
  return (

    <div className="z-1 md:p-4 xl:p-4 lg:p-4 flex flex-col items-center justify-center gap-4">
      <h1 className="text-[2.5rem] text-[#0304FF] font-semibold uppercase">
        Pricing Options
      </h1>
      <h4 className='text-[#7A7474]'>We specialize in sports card trading services.</h4>
     
      <div   className="flex cursor-pointer w-[70%] md:w-full lg:w-full xl:w-full 2xl:w-full p-2 flex-col gap-10  md:grid md:grid-cols-2 md:gap-6  lg:grid lg:grid-cols-4 lg:gap-6">
        <div  data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
        <img src="/first.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl rounded-b-none" />
        
          <div className="absolute h-[60%]  bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
           
            <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
              The Try Out
            </h2>
           <div className='flex flex-col items-center justify-center gap-4'>
           <p className="font-semibold text-[1rem] text-[#00000080] text-center">
              1 week free trial (100) scans.
            </p>
            <button className='uppercase p-4 bg-black text-white rounded-lg'>
                Try now
            </button>

           </div>
          
          </div>
        </div>
        <div data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
        <img src="/second.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl " />
        
        <div className="absolute h-[60%]  bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
          <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
            Undrafted free <br />Agent ($5/month)
          </h2>
         <div className='flex flex-col items-center justify-center gap-4'>
         <p className="font-semibold text-[1rem] text-[#00000080] text-center">
            500 monthly AI scans.
          </p>
          <button className='uppercase p-4 bg-black text-white rounded-lg'>
              Try now
          </button>

         </div>
        
        </div>
      </div>
      <div data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
      <img src="/third.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl" />
        
        <div className="absolute h-[60%]  bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
          <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
            Last-Round Pick <br />($10)
          </h2>
         <div className='flex flex-col items-center justify-center gap-4'>
         <p className="font-semibold text-[1rem] text-[#00000080] text-center">
            1,250 Monthly AI Cards Scans
          </p>
          <button className='uppercase p-4 bg-black text-white rounded-lg'>
              Try now
          </button>

         </div>
        
        </div>
      </div>
      <div data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
      <img src="/fourth.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl" />
        
        <div className="absolute h-[60%]  bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
          <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
          Mid-Round Pick <br />($25/month) 
          </h2>
         <div className='flex flex-col items-center justify-center gap-4'>
         <p className="font-semibold text-[1rem] text-[#00000080] text-center">
        2,750 Monthly AI Card Scans.
          </p>
          <button className='uppercase p-4 bg-black text-white rounded-lg'>
              Try now
          </button>

         </div>
        
        </div>
      </div>
      <div data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
      <img src="/fifth.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl" />
        
        <div className="absolute h-[60%]  bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
          <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
            Late First Rounder <br />($40/month).
          </h2>
         <div className='flex flex-col items-center justify-center gap-4'>
         <p className="font-semibold text-[1rem] text-[#00000080] text-center">
            5,500 Monthly AI Card Scans.
          </p>
          <button className='uppercase p-4 bg-black text-white rounded-lg'>
              Try now
          </button>

         </div>
        
        </div>
      </div>
      <div data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
      <img src="/sixth.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl" />
        <div className="absolute h-[60%]  bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
          <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
            Top 10 Draft Pick <br />($75/month)
          </h2>
         <div className='flex flex-col items-center justify-center gap-4'>
         <p className="font-semibold text-[1rem] text-[#00000080] text-center">
            12,500 Monthly Card Scans.
          </p>
          <button className='uppercase p-4 bg-black text-white rounded-lg'>
              Try now
          </button>

         </div>
        
        </div>
      </div>
      <div data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
      <img src="/seventh.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl" />
        <div className="absolute h-[60%] bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
          <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
            First Overall <br /> Selection <br />($125/month)
          </h2>
         <div className='flex flex-col items-center justify-center gap-4'>
         <p className="font-semibold text-[1rem] text-[#00000080] text-center">
    27,500 Monthly Card Scans .
          </p>
          <button className='uppercase p-4 bg-black text-white rounded-lg'>
              Try now
          </button>

         </div>
        
        </div>
      </div>
      <div data-aos="flip-right" className="relative  h-[25rem] bg-[#7B7B7B] shadow-lg flex flex-col gap-2 p-2 rounded-xl">
      <img src="/eigth.png" alt="" className="absolute top-0 left-0 w-full  rounded-xl" />
        <div className="absolute h-[60%]  bottom-0 left-0 rounded-xl bg-slate-300 w-full flex  flex-col items-center justify-between gap-4 pb-[2rem]">
          <h2 className="font-semibold  text-[#000000] text-[1.5rem]">
            The GOAT
          </h2>
         <div className='flex flex-col items-center justify-center gap-4'>
         <p className="font-semibold text-[1rem] text-[#00000080] text-center">
            Need additional scans? <br />
            Contact Us!
          </p>
          <button className='uppercase p-4 bg-black text-white rounded-lg'>
              Try now
          </button>

         </div>
        
        </div>
      </div>
    
     
  
      </div>
    </div>
  )
}

export default Pricing
