import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext } from "react";
// import { Globalcontext } from "../../context";

const ModalWrapper = ({
    showModal,
    children,
    handleCloseModal,
    dialogClassName,
    title,
}) => {
    // Add the dialogClassName props
    // const { isShowModal, handleCloseModal } = useContext(Globalcontext);
    const handleClose = () => {
        close?.();
    };

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog
                as="aside"
                className="relative z-[292929]"
                onClose={handleCloseModal}
            >
                {/* overlay */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <button
                        type="button"
                        className="fixed inset-0 bg-[#000000] bg-opacity-75 transition-opacity"
                    />
                </Transition.Child>

                {/* main ModalWrapper container */}
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-start justify-center p-4 text-center sm:p-0 relative">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 -translate-y-1/2 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 -translate-y-1/2 sm:-translate-y-1/2 sm:scale-95"
                        >
                            {/* main ModalWrapper panel */}
                            <Dialog.Panel
                                className={`${
                                    dialogClassName ?? ""
                                } absolute top-[50%]  transform -translate-y-1/2 overflow-hidden rounded-[8px] bg-[#FFFFFF] text-left  transition-all  max-w-[95%]  `}
                            >
                                <div className="overflow-y-auto ">
                                    {children}
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ModalWrapper;
