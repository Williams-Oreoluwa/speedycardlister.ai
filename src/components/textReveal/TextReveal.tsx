import React, {useContext} from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { Globalcontext } from "../../Context/Context";

const TextReveal = ({ text }) => {
    const {
        theme
        } = useContext(Globalcontext);
    if (text === undefined) {
        return
    }
    const maxLength = 20;
    const displayText = String(text).length > maxLength ? `${String(text).slice(0, maxLength)}...` : String(text);

    return (
        <Tippy arrow={false} content={<span>{displayText}</span>}>
            <p className={` ${theme === 'dark' ? 'text-white' : 'text-[#121212]'}`}>
                {displayText}
            </p>
        </Tippy>
    );
};

export default TextReveal;