import { useState } from "react";
import { Link } from "react-router-dom";
import { useSelectedCards } from "../../Context/SelectedCardsContext";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
} from "react-icons/md";
import { format } from "date-fns";

export const MobileTableCard = ({ sortedProducts }) => {
  const {
    selectedCards,
    handleCheckboxChange,
    editingCardIds,
    setEditingCardId,
    setEditValues,
    editValues,
  } = useSelectedCards();
  // const [editId, setEditId] = useState();

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
    <div className="flex flex-col gap-y-3">
      {sortedProducts?.length !== 0 ? (
        sortedProducts?.map((item, index) => {
          const imageUrl = item?.pictureDetails?.[0]?.imageUrl;

          return (
            <div
              key={index}
              className={`p-3 rounded-lg border flex justify-start items-start gap-[6px] ${
                selectedCards?.includes(item?._id)
                  ? "border-[#272264] bg-[#F8FAFC]"
                  : "border-[#E2E8F0]  bg-white"
              }`}
            >
              {selectedCards?.includes(item?._id) ? (
                <MdOutlineCheckBox
                  onClick={() => handleCheckboxChange(item?._id)}
                  size={"16px"}
                  className=" cursor-pointer"
                />
              ) : (
                <MdOutlineCheckBoxOutlineBlank
                  onClick={() => handleCheckboxChange(item?._id)}
                  size={"16px"}
                  className=" cursor-pointer"
                />
              )}

              {/* <input
                                type="checkbox"
                                className="max-w-fit  border-[0.89px] border-[#E2E8F0] "
                                onChange={() => handleCheckboxChange(item?._id)}
                            /> */}

              <div className="flex flex-col gap-3 w-full font-raleway ">
                <div className="flex flex-col gap-1">
                  <div className="flex  justify-between">
                    {imageUrl && (
                      <img
                        src={
                          item.pictureDetails[0].imageUrl || "/placeHolder.jpeg"
                        }
                        alt="Item"
                        className="w-12 h-12 object-cover rounded"
                      />
                    )}
                    <div
                      className={`${
                        item.status === "sent"
                          ? "text-[#039855] bg-[#D1FADF]"
                          : "text-[#F79009] bg-[#FEF0C7]"
                      }  rounded-md h-fit py-1 px-2 font-semibold  text-[13px] leading-5 capitalize `}
                    >
                      {item.status}
                    </div>
                  </div>
                  <div className="">
                    {editingCardIds.includes(item?._id) ? (
                      <div className="w-full min-w-2/5 mt-2 break-words">
                        <textarea
                          type="text"
                          value={editValues[item?._id]?.title || item?.title}
                          id={item?._id}
                          name="title"
                          wrap="soft"
                          onChange={(e) => {
                            handleEditChange(
                              item?._id,
                              "title",
                              e.target.value
                            );
                          }}
                          className={`focus:outline-none border border-[#E2E8F0] w-full py-2 px-3 rounded-lg text-sm break-words max-w-full whitespace-normal appearance-none resize-none`}
                          // onFocus={() => setIsFocusId(item._id)}
                        />
                      </div>
                    ) : (
                      <Link
                        to={`/singleCard/${item._id}`}
                        className="cursor-pointer"
                      >
                        <span className="text-[#1E293B] font-normal text-sm">
                          {item.title}
                          {/* <TextReveal text={item.title} /> */}
                        </span>
                      </Link>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[#64748B] text-sm">Price</h2>
                    <p>
                      {editingCardIds.includes(item?._id) ? (
                        <div className=" min-w-2/5 relative">
                          <span className="absolute text-sm -translate-y-1/2 left-[9px] top-1/2">
                            $
                          </span>
                          <input
                            type="text"
                            defaultValue={
                              editValues[item?._id]?.price || item?.price
                            }
                            id={item._id}
                            name="cost"
                            onChange={(e) => {
                              handleEditChange(
                                item?._id,
                                "price",
                                e.target.value
                              );
                            }}
                            className={`focus:outline-none border border-[#E2E8F0] w-full py-2 pl-[17px] rounded-lg text-sm break-words whitespace-normal appearance-none resize-none max-w-[68px] h-10`}
                            // onFocus={() => setIsFocusId(item._id)}
                          />
                        </div>
                      ) : (
                        <span className="rounded-[4px] text-[#1E293B] text-sm leading-[16px] font-semibold ">
                          {`$ ${item.price}`}
                        </span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <h2 className="text-[#64748B] text-sm">Date Added</h2>
                    <p className="text-[#1E293B] text-sm">
                      {/* {item?.dateAdded} */}
                      {/* // new Date(item.dateAdded).toLocaleString()} */}
                      {item?.createdAt
                        ? format(new Date(item?.createdAt), "yyyy-MM-dd")
                        : "nil"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <div>No data available</div>
      )}
    </div>
  );
};

export default MobileTableCard;
