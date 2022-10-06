export const separateNumberWithCommas = (numberWithoutCommas) => {
    numberWithoutCommas = numberWithoutCommas.toFixed(2)
    const numberWithCommas = numberWithoutCommas.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numberWithCommas;
};

export const removeCommasFromNumber = (numberWithCommas) => {
    const numberWithoutCommas = numberWithCommas.replaceAll(",", "");
    return numberWithoutCommas;
};
