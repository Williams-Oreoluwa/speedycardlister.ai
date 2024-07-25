
import React, { useEffect, useState, useContext } from "react";
import SettingsTab from "../../components/Settings/SettingsTab";
import IdleTimer from "../../components/idleTimer";
import { Globalcontext } from "../../Context/Context";

const Settings = () => {
  const { theme } = useContext(Globalcontext);


  return (
    <>
    <IdleTimer/>
      
      <div className="min-h-screen w-full">
     
            <SettingsTab />
          
       
      </div>
    </>
  );
};

export default Settings;
