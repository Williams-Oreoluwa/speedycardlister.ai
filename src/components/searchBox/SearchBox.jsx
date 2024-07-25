import { SearchNormal } from "iconsax-react";
import React, { useState, useEffect, useContext } from "react";
import { FaSearch } from "react-icons/fa";

const SearchBox = ({ theme, searchData, setSearchResults, isOpen }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [open, setOpen] = useState(false);

    const clearSearch = () => {
        setSearchQuery("");
        setSearchResults(searchData);
    };

    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const results = searchData.filter((item) =>
            item.title.toLowerCase().includes(query.toLowerCase())
        );

        setSearchResults(results);
    };

    const [size, setSize] = useState(window.innerWidth);
    const monitorSize = () => {
        setSize(window.innerWidth);
    };

    useEffect(() => {
        window.addEventListener("resize", monitorSize);
        return () => {
            window.removeEventListener("resize", monitorSize);
        };
    }, []);

    return (
        <div className="w-full max-w-[420px]">
            <div className="relative">
                <input
                    type="text"
                    className="w-full h-[44px] rounded-[10px] px-2 py-[11px] border border-[#E2E8F0] text-xs md:text-sm pl-8 md:pl-[43px]"
                    placeholder="Search here..."
                />
                <SearchNormal
                    size="18px"
                    className="absolute top-1/2 left-[7px] md:left-[14px] -translate-y-1/2"
                    color="#94A3B8"
                />
            </div>
        </div>
    );
};

export default SearchBox;
