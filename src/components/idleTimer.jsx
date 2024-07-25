import React, { useState, useEffect, useContext, useRef } from "react";
import { useNavigate } from "react-router-dom";


const IdleTimer = () => {
  const navigate = useNavigate(); // Using react-router-dom's useNavigate hook
  const [isActive, setIsActive] = useState(false);
  const activityTimeoutRef = useRef(null);

  const Timeout = () => {
    console.log("timeout");
    localStorage.clear();
    navigate("/login");
  };

  const handleActivity = () => {
    setIsActive(true);

    if (activityTimeoutRef.current) {
      clearTimeout(activityTimeoutRef.current);
    }

    activityTimeoutRef.current = setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };

  useEffect(() => {
    const events = [
      "scroll",
      "click",
      "mousemove",
      "keydown",
      "touchstart",
      "focus",
    ];

    events.map((event) => window.addEventListener(event, handleActivity));

    return () => {
      events.map((event) => window.removeEventListener(event, handleActivity));
      if (activityTimeoutRef.current) {
        clearTimeout(activityTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!isActive) {
        Timeout();
      }
    }, 15 * 60 * 1000); // Check user activity every 15 minutes

    return () => {
      clearInterval(intervalId);
    };
  }, [isActive]);
};

export default IdleTimer;
