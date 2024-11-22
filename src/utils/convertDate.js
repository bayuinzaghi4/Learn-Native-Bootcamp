export const convertDate = (data) => {
    if(!(date instanceof(Date)))
        date = new Date(date)

    return date.toLocaleTimeString('id-ID', {timeZone: 'Asia/Jakarta'});
}