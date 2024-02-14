import { useEffect, useState } from 'react';

const useStringListFormat = (stringList: string[]) => {
    const [formattedString, setFormattedString] = useState<string>('');

    useEffect(() => {
        if (stringList.length === 2) {
            const formatted = stringList.join(' & ');
            setFormattedString(formatted);
        } else {
            const formatted = stringList.join(', ');
            setFormattedString(formatted);
        }
    }, [stringList]);

    return formattedString;
};

export default useStringListFormat;
