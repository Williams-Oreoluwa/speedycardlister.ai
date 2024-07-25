import React from "react";

const Skeleton = () => {
  return (
    <div>
      <div className="z-10 grid place-items-center md:flex items-center lg:flex lg:items-center lg:justify-center gap-2">
        <div className="w-[50px] rounded-full h-[50px]  bg-gray-300 animate-pulse  grid place-items-center ">
          <svg
            className="w-7 h-7 text-gray-200 dark:text-gray-600 rounded-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>

        <div className="flex flex-col items-center justify-center ">
          <div className="flex gap-1">
            <h2 className="capitalize  font-semibold text-base h-2 bg-gray-300 rounded-full mb-4">
              <p className="text-[transparent]"> williams111 </p>
            </h2>
            <h2 className="h-2 text-[transparent]  bg-gray-300 rounded-full ">
              Ajegunle
            </h2>
          </div>

          <h2 className="text-[transparent] h-2 bg-gray-300 rounded-full">
            taraba@email.com
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;

export function SettingsSkeleton() {
  return (
    <div>
      <div className="w-full pb-[1rem] md:hidden lg:hidden xl:hidden 2xl:hidden">
        <div className="w-full grid place-items-center  bg-gray-300 rounded-xl h-[40vh]">
          <svg
            className="w-7 h-7 text-gray-200 dark:text-gray-600 rounded-full"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 18"
          >
            <path d="M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
