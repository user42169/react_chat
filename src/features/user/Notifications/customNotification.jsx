import React from "react";
import audioNotification from "./AudioNotification/audioNotification";
import setBrowserNotification from "./BrowserNotification/browserNotification";
import toastNotification from "./ToastNotification/toastNotification";

const customNotification = (textOfNotification = "", senderName="", theme = "light") => {

    return (
        audioNotification(),
        toastNotification(textOfNotification, theme),
        setBrowserNotification(textOfNotification, senderName)
        //customReactNotification(textOfNotification, "info", "")

    );
};

export default customNotification;