const getDateSQLFormat = () => {
    const date = new Date();
    const day = date.getDate();
    {
        /*Month starts January as index 0 */
    }
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

export default getDateSQLFormat;
