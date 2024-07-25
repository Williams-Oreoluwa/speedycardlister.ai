import React from "react";
import ModalWrapper from "../modalWrapper/ModalWrapper";

const MoveToCardErrorModal = ({
  showModal,
  handleCloseModal,
  moveToMarket,
}) => {
  // console.log("new", moveToMarket?.message);
  // // console.log("m", moveToMarket.data?.Errors[0].message[0]);
  // const errs = moveToMarket?.data?.Errors?.map((err) => err);
  // console.log(errs);
  // const links = errs?.value?.map((i) => i);
  // console.log("test", moveToMarket?.data);
  // console.log(links);
  return (
    <ModalWrapper
      showModal={showModal}
      handleCloseModal={handleCloseModal}
      dialogClassName={"w-4/5 xl:w-2/5"}
    >
      <div className="flex flex-col ">
        <h2 className="text-2xl font-semibold">{moveToMarket?.message}</h2>
        <ul>
          {moveToMarket?.data?.Errors != null &&
            moveToMarket?.data?.Errors?.map((error, index) => {
              return (
                <li key={index}>
                  {/* <h3 className="text-lg font-semibold">Error {index + 1}</h3> */}
                  <p>{error?.message?.[0]}</p>
                  <ul>
                    {error?.value?.map((value, idx) => (
                      <li key={idx} className="break-words">
                        <a className=" text-blue-500" href={value?.Value[0]}>
                          {value?.Value?.[0]}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            })}
        </ul>
      </div>
    </ModalWrapper>
  );
};

export default MoveToCardErrorModal;
