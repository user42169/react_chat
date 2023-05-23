import React from 'react';

// notifications in browser demo template
const showBrowserNotification = (textOfNotification="", senderName="") => {
    return (new Notification(senderName, {
        tag: "ache-mail",
        body: textOfNotification,
        icon: "",
        vibrate: "true",
        silent: false
    })
    );
};

// notifications in browser, permissions and requests template
const setBrowserNotification = (textOfNotification="", senderName="") => {
    if (Notification.permission === "granted") {
        showBrowserNotification(textOfNotification, senderName);

    } else if (Notification.permission !== "denied") {
        Notification.requestPermission().then(permission => {
            if (permission === "granted") {
                showBrowserNotification(textOfNotification, senderName);
            };
        });
    };
};

export default setBrowserNotification;