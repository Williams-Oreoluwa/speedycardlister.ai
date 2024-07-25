import "./index.css";
import { Outlet, Navigate } from "react-router-dom";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import PrivateRoutes from "./components/PrivateRoutes";
import Cards from "./Pages/cards/Cards";
import Dashboard from "./Pages/dashboard/Dashboard";
import ForgotPassword from "./Pages/Auth/ForgotPassword";
import Header from "./components/header/Header";
import Login from "./Pages/Auth/Login";
import NewPassword from "./Pages/Auth/NewPassword";
import Otp from "./Pages/Auth/Otp";
import Register from "./Pages/Auth/Register";
import Settings from "./Pages/settings/Settings";
import Sidebar from "./components/sideBar/SideBar";
import SingleCard from "./components/singleCard/SingleCard";
import Success from "./Pages/Auth/Success";
import NotFound from "./Pages/NotFound";
import Timeout from "./components/Timeout/Timeout";
import { Globalcontext } from "./Context/Context";
import { Modal } from "react-responsive-modal";
import SignUpModal from "./Pages/SignUpModal/ModalComponent";
import AccountVerification from "./Pages/verification/AccountVerification";
import IsSuccessful from "./Pages/verification/IsSuccesful";
import IsUnsuccessful from "./Pages/verification/IsUnsuccessful";
import Terms from "./Pages/Auth/Terms";
import Privacy from "./Pages/Auth/Privacy";

export default function App() {
  const Layout = () => {
    const { isOpen, setIsOpen, theme, open, controlModal, onCloseModal } =
      useContext(Globalcontext);

    return (
      <div className="relative h-full">
        <div
          className={`${
            theme === "dark" ? "bg-black lg:bg-[#242323]" : "bg-[#FFFFFF]"
          } relative  overflow-hidden h-full lg:flex font-raleway `}
        >
          {controlModal ? (
            <Modal
              closeOnOverlayClick={false}
              classNames={{
                overlay: "customOverlay",
                modal: "dashboardModal",
                closeButton: "modalcloseBtn",
              }}
              open={open}
              onClose={onCloseModal}
              center
            >
              <SignUpModal onCloseModal={onCloseModal} />
            </Modal>
          ) : (
            ""
          )}
          <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
          <div className="relative lg:flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
            <Header setIsOpen={setIsOpen} isOpen={isOpen} />
            <main className="flex lg:justify-end">
              <div
                className={`${isOpen ? "fixed " : ""}  ${
                  theme === "dark" ? "bg-black" : "bg-white"
                } font-raleway flex lg:items-end bg-red-500 flex-col mt-16 lg:mt-20 2xl:mt-14 sm:mr- xl:mr- w-full lg:w-[77%] xl:w-[83%] xl:w-[80  max-w-screen-2x p-4 md:p- lg:py-4 lg:px-4 2xl:p-6 2xl:pr-10 2xl:pt-10 bg`}
              >
                <Outlet />
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  };

  return (
    <Router>
      <Routes>
        <Route path="/account-verification" element={<AccountVerification />} />
        <Route path="/account-successful" element={<IsSuccessful />} />
        <Route path="/account-unsuccessful" element={<IsUnsuccessful />} />
        <Route path="/terms-of-agreement" element={<Terms />} />
        <Route path="/privacy-policy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/new-password" element={<NewPassword />} />
        <Route path="/success" element={<Success />} />
        <Route path="/session-timed-out" element={<Timeout />} />
        <Route path="*" element={<NotFound />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Navigate to="/dashboard" />} />
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/singleCard/:id" element={<SingleCard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
