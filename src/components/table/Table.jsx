import React, { useContext, useState } from "react";
import { Globalcontext } from "../../Context/Context";
import { Link } from "react-router-dom";
import TextReveal from "../textReveal/TextReveal";
import useWindowSize from "../../hooks/useWindowSize";
import { format } from "date-fns";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { useSelectedCards } from "../../Context/SelectedCardsContext";

export const TableHead = () => {
  return (
    <thead className=" rounded-lg bg-[#F8FAFC] py-2">
      <tr className="font-semibold  text-base leading-5 text-[#1E293B]">
        <th className=" text-center  tracking-wider py-[10]">
          <div className=" w-11/12 flex items-center justify-center"></div>
        </th>
        <th className="  text-left text-base py-4 ">Title</th>
        <th className="text-left text-base py-4">Date Added</th>
        <th className="text-left text-base py-4">Selling Price</th>
        <th className="text-left text-base py-4">Status</th>

        {/* <th className="px-4 pt-[22px] pb-[14px]  text-left tracking-wider">
            Action
          </th> */}
      </tr>
    </thead>
  );
};

export const TableBody = ({ sortedProducts, theme }) => {
  const {
    selectedCards,
    handleCheckboxChange,
    setEditValues,
    editValues,
    editingCardIds,
  } = useSelectedCards();
  const { width } = useWindowSize();
  // console.log("sorted", sortedProducts);

  const handleEditChange = (id, field, value) => {
    setEditValues((prevEditValues) => ({
      ...prevEditValues,
      [id]: {
        ...prevEditValues[id],
        [field]: value,
      },
    }));
  };
  return (
    <>
      {sortedProducts?.length != 0 ? (
        sortedProducts?.map((item, index) => {
          // console.log("item", item);
          return (
            <tr
              className={`  ${
                theme === "dark" ? "bg-[#161616]" : ""
              }   border-b-[#F1F5F9] border-b text-[#1E293B] mt-5`}
              key={index}
            >
              <td className=" py-3 whitespace-nowrap  gap-2 flex items-center justify-start ">
                <div>
                  {/* <input type="checkbox" className="w-8" /> */}
                  {selectedCards?.includes(item?._id) ? (
                    <MdOutlineCheckBox
                      onClick={() => handleCheckboxChange(item?._id)}
                      size={"16px"}
                      className=" cursor-pointer"
                    />
                  ) : (
                    <>
                      <MdOutlineCheckBoxOutlineBlank
                        onClick={() => handleCheckboxChange(item?._id)}
                        size={"16px"}
                        className=" cursor-pointer"
                      />
                    </>
                  )}
                </div>
                <img
                  src={item?.pictureDetails[0].imageUrl || "/placeHolder.jpeg"}
                  className="min-w-12 object-cover h-[54px] w-[54px] max-w-[54px] rounded-[8px]"
                  alt="card"
                />
              </td>

              <td className=" py-3 whitespace-nowrap text-[#121212] pr-4">
                {editingCardIds?.includes(item?._id) ? (
                  <div className="w-full ">
                    <input
                      type="text"
                      value={editValues[item?._id]?.title || item?.title}
                      id={item?._id}
                      name="title"
                      onChange={(e) =>
                        handleEditChange(item?._id, "title", e.target.value)
                      }
                      className={`outline-none px-4 py-2 w-full border rounded-md border-[#cccccc] h-11 text-base max-w-[555px] `}
                    />
                  </div>
                ) : (
                  <Link
                    to={`/singleCard/${item?._id}`}
                    className="cursor-pointer"
                  >
                    <span className=" rounded-[4px] py-2 px-4 text-base ">
                      {width < 1280 ? (
                        <TextReveal text={item?.title} />
                      ) : (
                        <p className="">{item?.title}</p>
                      )}
                    </span>
                  </Link>
                )}
              </td>
              <td
                className={`pr- py-3 whitespace-nowrap ${
                  theme === "dark" ? "text-white" : "text-[#7A7474] "
                } tracking-wider" text-base `}
              >
                {/* {new Date(item?.createdAt).toLocaleString()} */}
                {/* {item?.createdAt} */}
                {item?.dateAdded
                  ? format(new Date(item?.dateAdded), "yyyy-MM-dd")
                  : "nil"}
              </td>
              <td className="  py-3   whitespace-nowrap tracking-wider text-base">
                {editingCardIds?.includes(item?._id) ? (
                  <div className="w-[50px] min-w-2/5 relative ">
                    <span className="absolute -translate-y-1/2 left-[7px] top-1/2">
                      $
                    </span>
                    <input
                      type="text"
                      value={editValues[item?._id]?.price || item?.price}
                      id={item?._id}
                      name="price"
                      onChange={(e) =>
                        handleEditChange(item?._id, "price", e.target.value)
                      }
                      className={`outline-none text-left py-2 px-4 w-[85px] border rounded-md border-[#cccccc]  `}
                    />
                  </div>
                ) : (
                  <span className="text-[#1E293B] rounded-[4px] text-base">
                    {`$ ${item?.price}`}
                  </span>
                )}
              </td>
              <td className="px- py-3 whitespace-nowrap tracking-wider">
                <span
                  className={`${
                    item?.status === "sent"
                      ? "text-[#039855]"
                      : "text-[#F79009]"
                  }  rounded-[4px] py-2 font-normal  text-base leading-5 capitalize text-left `}
                >
                  {item?.status}
                </span>
              </td>
            </tr>
          );
        })
      ) : (
        <tr
          className={`flex w-full h-full justify-center items-center relative`}
        >
          <div className="absolute top-20 left-0 sm:left-96 w-96 sm:w-[550px] flex items-center justify-center">
            <h1
              className={`font-bold   text-xl leading-10 w-fl ${
                theme === "dark" ? "text-white" : "text-black"
              }`}
            >
              Currently no cards listed
            </h1>
          </div>
        </tr>
      )}
    </>
  );
};
