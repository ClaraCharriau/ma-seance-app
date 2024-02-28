const useDateDMYFormat = (date: string) => {
    const formatDate = (date: string) => {
        const [year, month, day] = date.split('-');
        const monthNames = [
            'janvier',
            'février',
            'mars',
            'avril',
            'mai',
            'juin',
            'juillet',
            'août',
            'septembre',
            'octobre',
            'novembre',
            'décembre'
        ];
        return `${parseInt(day, 10)} ${monthNames[parseInt(month, 10) - 1]} ${parseInt(year, 10)}`;
    };

    return formatDate(date);
};

export default useDateDMYFormat;
