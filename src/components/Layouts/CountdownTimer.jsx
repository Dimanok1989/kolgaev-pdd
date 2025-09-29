import React, { useState, useEffect } from 'react';

export function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

const CountdownTimer = ({ targetDate, endTimeHandle, endTimeMessage }) => {

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    function calculateTimeLeft() {

        const difference = new Date(targetDate) - new Date();

        if (difference <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
        }

        return {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / (1000 * 60)) % 60),
            seconds: Math.floor((difference / 1000) % 60),
            expired: false
        };
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    useEffect(() => {
        if (typeof endTimeHandle == "function" && timeLeft?.expired === true) {
            endTimeHandle();
        }
    }, [timeLeft?.expired]);

    if (timeLeft.expired) {
        return <div>{endTimeMessage || `Время истекло`}</div>
    }

    return <div className="flex">
        {timeLeft.days > 0 && <span className="pr-2">{timeLeft.days} дн.</span>}
        {timeLeft.hours > 0 && <span>{timeLeft.hours < 10 ? `0${timeLeft.hours}` : timeLeft.hours}</span>}
        {timeLeft.hours > 0 && <span>:</span>}
        <span>{timeLeft.minutes < 10 ? `0${timeLeft.minutes}` : timeLeft.minutes}</span>
        <span>:</span>
        <span>{timeLeft.seconds < 10 ? `0${timeLeft.seconds}` : timeLeft.seconds}</span>
    </div>
};

export default CountdownTimer;