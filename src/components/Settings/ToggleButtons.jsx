// import React, {useContext} from 'react'
// import ThemeToggle from './ThemeToggle';
// import { Globalcontext } from "../../Context/Context";


// const ToggleButtons = ({ themeToggleBtns, value, switchTabs}) => {
  
//   const {
//     theme
//     } = useContext(Globalcontext);
//   return (
//     <div>
//          <section>
//       <div
//         className={`${theme === "dark" ? "bg-[#a1a0a011]" : "bg-white"} flex items-center justify-between w-full   gap-5 p-6 shadow-lg rounded-md`}
//       >
//         {themeToggleBtns.map((btn, index) => {
//           const { text, icon } = btn;
//           return (
//             <>
//               <div
//                 key={index}
//                 onClick={() => switchTabs(index)}
//                 className={`settings-btn flex items-center justify-center gap-2  text-[#A1A1A1] ${
//                   index === value && "active-btn" 
//                 }`}
//               >
              
//                 <span>{icon}</span>
//                 <h2 className='text-center'>{text}</h2>
//               </div>
//             </>
//           );
//         })}
//       </div>
//     </section>
//     </div>
//   )
// }

// export default ToggleButtons
