import { useState, useEffect } from 'react';

const useDurationFormat = (durationInMinutes: number) => {
    const [formattedDuration, setFormattedDuration] = useState<string>('');

    useEffect(() => {
        const hours = Math.floor(durationInMinutes / 60);
        const minutes = durationInMinutes % 60;
        const formattedHours = hours === 0 ? '0' : `${hours}`;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        setFormattedDuration(`${formattedHours}h${formattedMinutes}`);
    }, [durationInMinutes]);

    return formattedDuration;
};

export default useDurationFormat;
