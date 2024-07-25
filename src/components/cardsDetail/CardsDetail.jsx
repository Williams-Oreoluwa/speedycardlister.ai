import React, { Fragment } from "react";
import { Link, useParams } from "react-router-dom";

const CardsDetail = ({ Data }) => {
  const { name } = useParams();
  console.log(name);
  console.log(Data);
  return (
    <section>
      <div className="flex w-full">
        <h1 className="leading-[43.57px] font-extrabold text-4xl text-[#161616]">
          Cards
        </h1>
      </div>
      <div className="container">
        {Data.filter((i) => {
          return i.id === Number(name);
        }).map((item, index) => {
          return (
            <Fragment key={index}>
              <div className="mt-[1.56rem] flex items-center w-full 2xl:max-w-screen-2xl 2xl:pr-4 bg-[#F5F1FF]">
                <div className="flex items-center p-4 rounded-[0.625rem]  text-[#9E9DA8] font-medium text-base leading-6">
                  <h2 className="cursor-pointer">Cards</h2>
                  <img
                    src="/navigate-arrow.svg"
                    className="w-6 h-6 cursor-pointer"
                  />
                  <Link href="-1">
                    <h2 className="cursor-pointer">All Cards</h2>
                  </Link>
                  <img
                    src="/navigate-arrow.svg"
                    className="w-6 h-6 cursor-pointer"
                  />
                </div>
                <h2 className="font-medium text-base leading-6 text-[#121212] ">
                  {item.title}
                </h2>
              </div>
              <div className="mt-[2.51rem] flex gap-6 w-11/12">
                <div className="flex flex-col gap-8">
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center gap-y-5 justify-center">
                      <div className="w-[80px] h-[80px]">
                        <img
                          src="/cardimage.svg"
                          className="w-full h-full object-cover"
                          alt="card"
                        />
                      </div>
                      <div className="w-[80px] h-[80px]">
                        <img
                          src="/cardimage.svg"
                          className="w-full h-full object-cover"
                          alt="card"
                        />
                      </div>
                    </div>
                    <div className="w-[240px] h-[320px]">
                      <img
                        src="/cardimage.svg"
                        className="w-full h-full object-cover"
                        alt="card"
                      />
                    </div>
                  </div>
                  <button className="font-semibold rounded-md bg-[#6454D6] py-[10px] px-[55px] text-white text-base leading-[28px]">
                    Send to Marketplace
                  </button>
                </div>
                <div className="flex justify-between w-full">
                  <div>
                    <h2 className="font-semibold text-base leading-10 w-11/12 text-[#121212]">
                      {item.title} LeBron James Phenomenal Beginnings PSA 10
                    </h2>
                    <div className="flex gap-8 items-start ">
                      <div className="px-[0.56rem] lg:w-52 h-[115px] py-[0.44rem] border rounded-[0.625rem] bg-[#F2F5F3] ">
                        <img
                          src="/ebay.svg"
                          alt="ebay"
                          className="w-74px h-24px"
                        />
                        <h2 className="mt-4 px-1 py-[3px] text-[#121212] text-3xl leading-9 font-bold rounded bg-[#F2F5F3]">
                          $25.00
                        </h2>
                        {/* <input
                          type="text"
                          placeholder="$25.00"
                          className="outline-none mt-4 px-1 py-[3px] rounded bg-[#F2F5F3]"
                        /> */}
                      </div>
                      <div className="bg-[#FFF7F1] flex gap-1 items-center justify-center py-[10.76px] px-[21.51px] rounded-lg">
                        <img
                          src="/edit.svg"
                          alt="edit"
                          className="w-11px h-[11px]"
                        />
                        <h2 className="font-medium text-[#FF6D03] text-[18.82px] leading-[22.1px] cursor-pointer">
                          Edit
                        </h2>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <button className="bg-[#C2B10F] rounded-[0.45rem] py-[0.57rem] px-[1.14rem] text-white font-semibold leading-4">
                      {item.status}
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mt-8 w-11/12">
                  <h2 className="leading-10 font-semibold text-2xl text-[#121212]">
                    Card Details
                  </h2>
                  <div className="bg-[#FFF7F1] flex gap-1 items-center justify-center py-[10.76px] px-[21.51px] rounded-lg">
                    <img
                      src="/edit.svg"
                      alt="edit"
                      className="w-11px h-[11px]"
                    />
                    <h2 className="font-medium text-[#FF6D03] text-[18.82px] leading-[22.1px] cursor-pointer">
                      Edit
                    </h2>
                  </div>
                </div>
                <div className="flex py-6 px-4">
                  <div className="flex-1">
                    <table className="table-auto w-full">
                      <thead className="hidden">
                        <tr>
                          <th className="bg-gray-200"></th>
                          <th className=""></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Estimated price
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            $24.50
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Card Year:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            {" "}
                            2024
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Card Number:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            19
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Grade Number:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            10
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Grading Company:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            SGC
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Variety:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            Asia Hyper Gold
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Certificate Number:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            3273551
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Sent Date:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            changeOverWeekPercent:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 min-w-[250px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            id:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            7b9ab2a3-5286-435c-a6ee-52d8fcc73976
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-1">
                    <table className="table-auto w-full">
                      <thead className="hidden">
                        <tr>
                          <th className="bg-gray-200"></th>
                          <th className=""></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="flex gap-10 ">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Brand:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            Elite
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            PrintRun:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            {" "}
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Date Added:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            2024-01-11
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Serial Number:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Serial Number:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Low Estimated Price:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            High Estimated Price:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Notes:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            Subject:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            Isaiah Stewart
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Category:
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            BASKETBALL_CARDS
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            Cost
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            --
                          </td>
                        </tr>
                        <tr className="flex gap-10">
                          <td className="bg-gray-200 min-w-[200px] px-4 py-3 text-[#121212] font-normal leading-[18.78px] text-base">
                            {" "}
                            Title
                          </td>
                          <td className="px-4 py-3 text-[#121212] font-medium leading-[18.78px] text-base">
                            2021 Elite #19 Isaiah Stewart Asia Hyper Gold SGC 10
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </Fragment>
          );
        })}
      </div>
    </section>
  );
};

export default CardsDetail;
