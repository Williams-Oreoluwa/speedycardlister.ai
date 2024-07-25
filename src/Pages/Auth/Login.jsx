import { useEffect, useState, useReducer, useContext } from "react";
import Preloader from "../../components/Loader";
import axios from "axios";
import { baseURL } from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import { Globalcontext } from "../../Context/Context";
import Cookies from "js-cookie";
// import { GoogleLogin } from "@react-oauth/google";
import {
  //  googleLogout,
  useGoogleLogin,
} from "@react-oauth/google";
import AuthPageLayout from "../../layouts/AuthPageLayout";

const LOGIN_URL = "auth/signin";

const initialValue = {
  email: "",
  password: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "email":
      return { ...state, email: action.payload };
    case "password":
      return { ...state, password: action.payload };
    case "clear-fields":
      return { ...state, email: "", password: "" };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
};

const Login = () => {
  const navigate = useNavigate();
  const validApi = `${baseURL}/v1/${LOGIN_URL}`;
  const [errMsg, setErrMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [token, setToken] = useState("");
  const [state, dispatch] = useReducer(reducer, initialValue);
  // const [google, setGoogle] = useState("");
  const [showEye, setShowEye] = useState(false);
  const {
    rememberMe,
    // profile,
    setProfile,
    isLoggin,
    setIsLoggin,
  } = useContext(Globalcontext);

  const [user, setUser] = useState([]);

  const displayEye = () => {
    setShowEye(!showEye);
  };

  // const responseMessage = (response) => {
  //     console.log(response);
  // };
  // const errorMessage = (error) => {
  //     console.log(error);
  // };

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => setUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          const firstName = res.data.given_name;
          const lastName = res.data.family_name;
          let email = res.data.email;
          let googleId = res.data.id;

          googleSubmit(firstName, lastName, email, googleId);

          setProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const googleSubmit = async (firstName, lastName, email, googleId) => {
    try {
      const response = await axios.post(
        `${baseURL}/v1/auth/google_login`,
        JSON.stringify({
          email,
          firstName,
          lastName,
          googleId,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      // console.log(response);
      // console.log( response?.data?.data.token)
      const accessToken = response?.data?.data.token;
      localStorage.setItem("accessToken", accessToken);

      Cookies.set("userToken", accessToken);
      dispatch({ type: "clear-fields" });
      showSuccessToast();
      setIsLoggin(true);
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 2000);
    } catch (err) {
      if (!err) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 401) {
        setErrMsg("Email or Password Incorrect");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  // const googleLogin = async () => {
  //   try {
  //     const response = await axios.get(`${baseURL}/v1/auth/google_login`);
  //     console.log(response.data.data);
  //     googleRedirect(response.data.data);
  //     setGoogle(response.data.data);
  //   } catch (error) {
  //     console.log("");
  //   }
  // };

  // useEffect(() => {
  //   googleLogin();
  // }, []);

  // const googleRedirect = async (url) => {
  //   try {
  //     const response = await axios.get(url);
  //     console.log(response.data.data);
  //   } catch (error) {
  //     console.log("");
  //   }
  // };

  const success = () => {
    toast.success("Login successful!");
  };

  const showSuccessToast = () => {
    success();
  };

  const removeError = () => {
    setErrMsg(false);
  };

  useEffect(() => {
    setErrMsg("");
  }, [state.email, state.password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${validApi}`,
        JSON.stringify({
          email: state.email,
          password: state.password,
        }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      const accessToken = response?.data?.data.token;
      Cookies.set("userToken", accessToken);
      localStorage.setItem("accessToken", accessToken);
      dispatch({ type: "clear-fields" });
      showSuccessToast();
      setTimeout(() => {
        navigate("/dashboard");
        window.location.reload();
      }, 2000);
      console.log(response)
    } catch (err) {
      if (err) {
        setErrMsg("No Server Response");
      } else if (err.response.status === 401) {
        setErrMsg("Email or Password Incorrect");
      } else {
        setErrMsg("Login Failed");
      }
      console.log(err)
    }
    setLoading(false);
  };

  const showPassword = () => {
    if (state.password) {
      displayEye();
    }

    const getInput = document.querySelector("#password");
    if (getInput.type === "password") {
      return (getInput.type = "text");
    } else {
      return (getInput.type = "password");
    }
  };

  return (
    <AuthPageLayout
      formTitle={"Log in to your account"}
      formDes={
        "Welcome to Speedy Card Lister! Please enter your account details"
      }
    >
      <p className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
        {errMsg}
        <div className="remove" onClick={removeError}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4 "
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </div>
      </p>

      <form className=" space-y-4 flex flex-col gap-2" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username" className="label">
            Email
          </label>
          <input
            value={state.email}
            onChange={(e) =>
              dispatch({
                type: "email",
                payload: e.target.value,
              })
            }
            type="email"
            id="username"
            name="username"
            required
            placeholder="Enter your email"
            className="input"
          />
        </div>

        <div>
          <label htmlFor="password" className="label">
            Password
          </label>
          <div className="password-container">
            <input
              value={state?.password}
              onChange={(e) =>
                dispatch({
                  type: "password",
                  payload: e.target.value,
                })
              }
              type="password"
              id="password"
              name="password"
              placeholder="********"
              required
              className="input placeholder:leading-normal"
            />
            <span onClick={showPassword}>
              {showEye ? (
                <img
                  src="/Icons/eye Visible.png"
                  className="w-[18.58px] h-[18.58px] fa-eye"
                  alt=""
                />
              ) : (
                <img
                  src="/Icons/Eye Hidden.png"
                  alt=""
                  className="w-[18px] h-[18px] fa-eye"
                />
              )}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 text-sm md:text-[1rem]">
          <div className="flex gap-2">
            <input type="checkbox" onClick={rememberMe} name="" id="" />
            <h5>Remember me</h5>
          </div>
          <h2 className="font-[600] text-[#272264]">
            <Link to="/forgot-password">
              {" "}
              <h5 className="text-sm md:text-base font-semibold">
                Forgot password?
              </h5>{" "}
            </Link>
          </h2>
        </div>

        <button
          type="submit"
          className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm md:text-base font-semibold text-white bg-[#272264] hover:bg-[#242149] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          {loading ? <Preloader /> : "Login"}
        </button>
      </form>
      <div className="flex flex-col items-center justify-center gap-6">
        <div className="flex items-center justify-center">
          <h2 className="text-[#475569] text-[14px] leading-[20px] font-[400] gap-1 w-full flex items-center justify-center">
            {`Don't`} have an account?{" "}
            <Link to="/register">
              {" "}
              <h2 className="text-[#272264] text-[16px] font-[600] leading-[20px]">
                {" "}
                Register
              </h2>{" "}
            </Link>
          </h2>
        </div>

        <div className="flex w-full items-center justify-center gap-3">
          <div className="h-[1px] w-full bg-[#E2E8F0] rounded-xl"></div>
          <h2 className="text-[14px] text-[#64748B]">OR</h2>
          <div className="h-[1px] w-full bg-[#E2E8F0] rounded-xl"></div>
        </div>

        {/* <a
                href={google}
                className="w-full"
                target="_blank"
                rel="noopener noreferrer"
              > */}
        <button
          onClick={googleLogin}
          type="button"
          className="w-full py-3 px-6 border bg-white border-[#E2E8F0] rounded-md shadow-sm text-sm font-medium text-[#1E293B] bg-transparent hover:bg-[#E2E8F0] focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <div className="flex items-center justify-center font-bold gap-3">
            <img src="/Social icon.png" alt="" />
            Sign in with Google
          </div>
        </button>
        {/* </a> */}
      </div>
    </AuthPageLayout>
  );
};

export default Login;
