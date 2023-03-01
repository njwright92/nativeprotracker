const formatDate = (date) => {
    console.log(date)
    return date.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric',
    });
};

export default formatDate;