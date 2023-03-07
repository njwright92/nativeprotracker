import moment from 'moment';

export const formatChartData = (items) => {
    return items.map((item) => {
        return {
            date: moment(item.date).format('MM/DD/YYYY'),
            quantity: item.quantity,
        };
    });
};
