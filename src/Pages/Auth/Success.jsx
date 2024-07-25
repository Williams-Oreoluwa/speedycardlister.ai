import { Link } from "react-router-dom";
// import useWindowSize from "react-use/lib/useWindowSize";
import AuthPageLayout from "../../layouts/AuthPageLayout";

const Success = () => {
    // const { width, height } = useWindowSize();

    return (
        <AuthPageLayout
            formTitle={"Reset Password Successful!"}
            formDes={
                "Your password has been successfully reset. You're all set!"
            }
        >
            <div className="flex rounded-full items-center justify-center ">
                <img
                    src="/successGif.gif"
                    alt=""
                    // className="  md:h-[304.92px] h-[238.13px] "
                />
            </div>

            <button className="w-full py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#272264] hover:bg-[#25224e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <Link to="/login" className="text-center text-[white]">
                    Proceed to Loginn
                </Link>
            </button>
        </AuthPageLayout>
    );
};

export default Success;
