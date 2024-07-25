import React, { useState } from "react";
import Button from "../button/Button";
import toast from "react-hot-toast";

const ContactForm = ({ handleCloseContact }) => {
    const initialData = {
        fName: "",
        email: "",
        nps: "",
        notes: "",
    };
    const [formData, setFormData] = useState(initialData);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        toast.success("Form submitted");
        handleCloseContact();
    };
    // Destructure formData
    const { fName, email, nps, notes } = formData;
    return (
        <div>
            <h2 className="text-2xl text-center font-semibold text-[#1E293B]">
                Contact Us
            </h2>
            <div className="mt-10">
                <form
                    onSubmit={handleSubmit}
                    className="w-full flex flex-col gap-4"
                >
                    <div>
                        <label htmlFor="fName" className="label">
                            Full Name
                        </label>

                        <input
                            required
                            className="input w-full mt-2"
                            type="text"
                            id="fName"
                            name="fName"
                            value={fName}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>{" "}
                    <div>
                        <label htmlFor="email" className="label">
                            Email
                        </label>

                        <input
                            required
                            className="input w-full mt-2"
                            type="email"
                            id="email"
                            name="email"
                            value={email}
                            onChange={(e) => handleChange(e)}
                        />
                    </div>
                    <div>
                        <label htmlFor="nps" className="label">
                            Number of Proposed Scans
                        </label>

                        <input
                            required
                            className="input w-full mt-2 "
                            type="number"
                            id="nps"
                            name="nps"
                            value={nps}
                            onChange={(e) => handleChange(e)}
                            inputMode="numeric"
                        />
                    </div>
                    <div>
                        <label htmlFor="nps" className="label">
                            Additional Notes
                        </label>

                        <textarea
                            required
                            className="input min-h-[208px]  w-full mt-2 "
                            id="notes"
                            name="notes"
                            value={notes}
                            onChange={(e) => handleChange(e)}
                        ></textarea>
                    </div>
                    <Button
                        classsName={"font-semibold text-sm md:text-base"}
                        text={"Send Message"}
                    />
                </form>
            </div>
        </div>
    );
};

export default ContactForm;
