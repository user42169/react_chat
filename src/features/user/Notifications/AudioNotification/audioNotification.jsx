import React from 'react';
import audioSound from "../../../../shared/user/sounds/notificationAlarm.wav";

// notification alarm sound
const audio = new Audio(audioSound);

// audio notification template
const audioNotification = () => {
    audio.volume = 0.01;
    audio.play();
};

export default audioNotification;