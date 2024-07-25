import { GoChevronDown } from "react-icons/go";

const CustomSelectArrows = () => {
    return (
        <div className="pointer-events-none absolute inset-y-0 right-3 top-[5px] md:top-[9px] flex items-center text-gray-700">
            <GoChevronDown />
        </div>
    );
};

export default CustomSelectArrows;
