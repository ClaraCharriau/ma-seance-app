/**
 * Custom hook that format a duration number into a human readable string
 *
 * @param durationInMinutes - number
 * @returns a formatted string
 **/
export const useTextDuration = (durationInMinutes: number): string => {
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = durationInMinutes % 60;
    const formattedHours = hours === 0 ? '0' : `${hours}`;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${formattedHours}h${formattedMinutes}`;
};

/**
 * Custom hook that format string list
 * with commas or '&' depending on the length of the list
 *
 * @param stringList - the list of string
 * @returns a formatted string
 **/
export const useTextList = (stringList: string[]): string => {
    if (stringList.length === 2) {
        return stringList.join(' & ');
    }
    return stringList.join(', ');
};
