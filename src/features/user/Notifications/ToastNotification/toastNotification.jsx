import React from 'react';
import { toast } from 'react-toastify';

// toast notification template
const toastNotification = (textOfNotification="", theme="light") => {
    toast(textOfNotification, {
        theme: theme
    });
};

export default toastNotification;