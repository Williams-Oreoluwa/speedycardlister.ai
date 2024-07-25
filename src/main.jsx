import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { GlobalState } from "./Context/Context.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SelectedCardsProvider } from "./Context/SelectedCardsContext.jsx";
import { Toaster } from "react-hot-toast";
import CardUploadContextProvider from "./Context/CardUploadContext.jsx";

const googleCredentials = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById("root")).render(
    <GoogleOAuthProvider clientId={`370269105852-brgm80lfhr623cfa8bjnd0onso60sq1v.apps.googleusercontent.com`}>
        <React.StrictMode>
            {/* <AuthProvider> */}
            <GlobalState>
                <SelectedCardsProvider>
                    <CardUploadContextProvider>
                        <App />
                        <Toaster />
                    </CardUploadContextProvider>
                </SelectedCardsProvider>
            </GlobalState>
            {/* </AuthProvider> */}
        </React.StrictMode>
    </GoogleOAuthProvider>
);
