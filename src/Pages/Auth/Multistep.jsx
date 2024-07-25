import React, { useEffect } from "react";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const SignUpInfo = ({ formData, setFormData }) => {
  return (
    <>
      <div className="other-info-container">
        <input
          type="text"
          placeholder="Nationality..."
          value={formData.nationality}
          onChange={(e) => {
            setFormData({ ...formData, nationality: e.target.value });
          }}
        />
        <input
          type="text"
          placeholder="Other..."
          value={formData.other}
          onChange={(e) => {
            setFormData({ ...formData, other: e.target.value });
          }}
        />
      </div>
    </>
  );
};

const PersonalInfo = ({ formData, setFormData }) => {
  return (
    <div className="personal-info-container">
      <input
        type="text"
        placeholder="First Name..."
        value={formData.firstName}
        onChange={(e) => {
          setFormData({ ...formData, firstName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Last Name..."
        value={formData.lastName}
        onChange={(e) => {
          setFormData({ ...formData, lastName: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Username..."
        value={formData.username}
        onChange={(e) => {
          setFormData({ ...formData, username: e.target.value });
        }}
      />
    </div>
  );
};
const OtherInfo = ({ formData, setFormData }) => {
  return (
    <>
      {" "}
      <div className="sign-up-container">
        <input
          type="text"
          placeholder="Email..."
          value={formData.email}
          onChange={(event) =>
            setFormData({ ...formData, email: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Password..."
          value={formData.password}
          onChange={(event) =>
            setFormData({ ...formData, password: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Confirm Password..."
          value={formData.confirmPassword}
          onChange={(event) =>
            setFormData({ ...formData, confirmPassword: event.target.value })
          }
        />
      </div>
    </>
  );
};
const Form = () => {
  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    username: "",
    nationality: "",
    other: "",
  });

  const FormTitles = ["Sign Up", "Personal Info", "Other"];

  const PageDisplay = () => {
    if (page === 0) {
      return <SignUpInfo formData={formData} setFormData={setFormData} />;
    } else if (page === 1) {
      return <PersonalInfo formData={formData} setFormData={setFormData} />;
    } else {
      return <OtherInfo formData={formData} setFormData={setFormData} />;
    }
  };

  return (
    <>
      <div className="form">
        <div className="progressbar flex gap-4">
          <div
            style={{
              background: page === 0 || page > 0 ? "red" : "transparent",
            }}
          ></div>
          <div
            style={{
              background: page === 1 || page > 1 ? "red" : "transparent",
            }}
          ></div>
          <div
            style={{
              background: page === 2 ? "red" : "transparent",
            }}
          ></div>
        </div>
        <div className="form-container">
          <div className="header">
            <h1>{FormTitles[page]}</h1>
          </div>
          <div className="body">{PageDisplay()}</div>
          <div className="footer">
            <button
              disabled={page == 0}
              onClick={() => {
                setPage((currPage) => currPage - 1);
              }}
            >
              Prev
            </button>
            <button
              onClick={() => {
                if (page === FormTitles.length - 1) {
                  alert("FORM SUBMITTED");
                  console.log(formData);
                } else {
                  setPage((currPage) => currPage + 1);
                }
              }}
            >
              {page === FormTitles.length - 1 ? "Submit" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

const Drops = () => {
  return <></>;
};

const DropsBtn = ({ children, open, toggle }) => {
  return (
    <>
      <div onClick={toggle}>
        {children}{" "}
        <span onClick={toggle}>
          {open ? <FaChevronDown /> : <FaChevronUp />}
        </span>
      </div>
    </>
  );
};

const DropsItem = () => {
  return <></>;
};
const DropsContent = ({ children }) => {
  return (
    <>
      <div className="absolute top-[10%] flex gap-6">{children}</div>
    </>
  );
};

const DropDown = ({ btnText, content }) => {
  const [open, setOpen] = React.useState(false);
  const toggleDropDown = () => {
    setOpen(!open);
  };
  return (
    <>
      <div className="relative flex item-center justify-center min-h-screen mx-1 my-auto w-full">
        <DropsBtn toggle={toggleDropDown}>{btnText}</DropsBtn>
        <DropsContent>{content}</DropsContent>
      </div>
    </>
  );
};

const CircleProgressBar = ({ percentage, circleWidth }) => {
  const radius = 85;
  return (
    <>
      <div>
        <svg
          width={circleWidth}
          height={circleWidth}
          viewBox={`0 0 ${circleWidth} ${circleWidth}`}
        >
          <circle
            cx={circleWidth/2}
            cy={circleWidth/2}
            strokeWidth="15px"
            r={radius}
            className="fill-none stroke-black"
          />
        </svg>
      </div>
    </>
  );
};

const Multistep = () => {
  const [percentage, setPercentage] = useState(35);
  return (
    <>
      <div className="flex items-center justify-center  my-[20rem]">
        <CircleProgressBar percentage={percentage} />
        <input
          type="range"
          min="1"
          max="100"
          step="1"
          value={percentage}
          onChange={(e) => setPercentage(e.target.value)}
        />
      </div>
    </>
  );

  // const [lowerVal, setLower] = useState(false);
  // const [upperVal, setUpper] = useState(false);
  // const [text, setText] = useState("");

  // const changeText = (e) => {
  //   setText(e.target.value);
  // };

  // const track = () =>{
  //   const lower = /[a-z]/;
  //   const upper = /[A-Z]/;

  //   if (lower.test(text)) {
  //     setLower(true);
  //   } else {
  //     setLower(false);
  //   }

  //   if (upper.test(text)) {
  //     setUpper(true);
  //   } else {
  //     setUpper(false);
  //   }

  // }
  // useEffect(() => {
  //   track()

  //   console.log(lowerVal)

  // }, [text]);

  // console.log(`Lower value is : ${lowerVal}`)
  // console.log(`upper value is : ${upperVal}`)

  // return (
  //   <>
  //     <div>
  //       <input
  //         type='password'
  //         value={text}
  //         onChange={changeText}
  //         className="border-2 border-red-300"
  //       />
  //       {type === "password" ? <span>llel</span> : <span>ff</span>}
  //     </div>
  //     <main className=" w-1/4">
  //       <div className={`${lowerVal ? "text-green-500" : "text-red-300"}`}>
  //         At least one lowercase
  //       </div>
  //       <div className={`${upperVal ? "text-green-500" : "text-red-300"}`}>
  //         At least one uppercase
  //       </div>
  //     </main>
  //   </>
  // );
};

export default Multistep;
