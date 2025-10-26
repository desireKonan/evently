import { format } from "date-fns";

const TODAY = new Date();

export const getDate = () => {
    return TODAY.getDate();
}


// utils/date.utils.ts
export const formatDateWithTime = (dateString: string | Date): string => {
    if (!dateString) return "-";
    
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

export const formatDateRangeWithTime = (startDate: string | Date, endDate: string | Date): string => {
    if (!startDate) return "-";
    
    const start = formatDateWithTime(startDate);
    
    if (!endDate) return start;
    
    const end = formatDateWithTime(endDate);
    
    // Si c'est le même jour, on n'affiche la date qu'une fois
    const startDay = new Date(startDate).toDateString();
    const endDay = new Date(endDate).toDateString();
    
    if (startDay === endDay) {
        const startTime = new Date(startDate).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const endTime = new Date(endDate).toLocaleTimeString('fr-FR', {
            hour: '2-digit',
            minute: '2-digit'
        });
        const date = new Date(startDate).toLocaleDateString('fr-FR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
        
        return `${date} ${startTime} - ${endTime}`;
    }
    
    return `${start} - ${end}`;
};

export const formatDateTimeShort = (dateString: string | Date): string => {
    if (!dateString) return "-";
    
    return new Date(dateString).toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
};


export const formatDateToLetters = (date: Date | undefined): string => {
    const formatter = new Intl.DateTimeFormat('fr-FR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    return date ? formatter.format(new Date(date)) : "Aucune date";
}


export const dateFormat = (date: Date | null | undefined) => format(date ?? new Date(), "dd-MM-yyyy");

export const timeFormat = (date: Date | null | undefined) => format(date ?? new Date(), "HH:ii");