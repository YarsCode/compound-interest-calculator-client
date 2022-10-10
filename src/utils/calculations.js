export const calculateTotalDepositAmount = (
    initialDeposit = 0,
    monthlyDeposit = 0,
    periodOfInvestmentInYears = 0,
    totalManagementFeeSumFromDeposit
) => {
    if (!initialDeposit) initialDeposit = 0;
    if (!monthlyDeposit) monthlyDeposit = 0;
    if (!periodOfInvestmentInYears) periodOfInvestmentInYears = 0;
    if (!totalManagementFeeSumFromDeposit) totalManagementFeeSumFromDeposit = 0;

    const yearlyDeposit = monthlyDeposit * 12;
    const sum = initialDeposit + yearlyDeposit * periodOfInvestmentInYears - totalManagementFeeSumFromDeposit;
    // console.log(sum);
    return sum;
};

export const calculateFV = (
    initialDepositAmount,
    monthlyDepositAmount,
    annualInterest,
    periodOfInvestmentInYears,
    numberOfTimesCompoundedPerYear = 12,
    managementFeePercentFromDeposit = 0,
    managementFeePercentFromTheAccrual = 0
) => {
    let futureValueSum = 0,
        initialDepositFV = 0,
        monthlyDepositFV = 0,
        futureValueOfSeries = 0,
        totalManagementFeesFromDeposit = 0,
        totalManagementFeesFromTheAccrual = 0,
        totalManagementFeesFromDepositFV = 0,
        totalManagementFeesFromTheAccrualFV = 0;
    for (let i = 1; i <= periodOfInvestmentInYears; i++) {
        totalManagementFeesFromDeposit += monthlyDepositAmount * (managementFeePercentFromDeposit / 100) * 12;
        let compoundInterestForPrincipal =
            initialDepositAmount *
            Math.pow(1 + annualInterest / numberOfTimesCompoundedPerYear, numberOfTimesCompoundedPerYear * i);
        initialDepositFV = Math.round(compoundInterestForPrincipal * 100) / 100;
        futureValueOfSeries =
            ((monthlyDepositAmount * numberOfTimesCompoundedPerYear) / annualInterest) *
            (Math.pow(1 + annualInterest / numberOfTimesCompoundedPerYear, numberOfTimesCompoundedPerYear * i) - 1);
        totalManagementFeesFromDepositFV =
            Math.round(
                ((monthlyDepositAmount * (managementFeePercentFromDeposit / 100) * 12) / annualInterest) *
                    (Math.pow(1 + annualInterest / 12, 12 * i) - 1) *
                    100
            ) / 100;
        monthlyDepositFV = Math.round(futureValueOfSeries * 100) / 100;
        futureValueSum = initialDepositFV + monthlyDepositFV;
        totalManagementFeesFromTheAccrual += futureValueSum * (managementFeePercentFromTheAccrual / 100);
        totalManagementFeesFromTheAccrualFV =
            Math.round(
                ((totalManagementFeesFromTheAccrual * (managementFeePercentFromTheAccrual / 100)) / annualInterest) *
                    (Math.pow(1 + annualInterest / 12, 12 * i) - 1) *
                    100
            ) /
                100 +
            totalManagementFeesFromTheAccrual;
    }
    monthlyDepositFV = Math.round(futureValueOfSeries * 100) / 100;
    let lostOfProfitsFromManagementFeesFV =
        totalManagementFeesFromDepositFV +
        totalManagementFeesFromTheAccrualFV -
        Math.abs(totalManagementFeesFromDeposit + totalManagementFeesFromTheAccrual);

    if (!futureValueSum) futureValueSum = 0;
    if (!totalManagementFeesFromDeposit) totalManagementFeesFromDeposit = 0;
    if (!totalManagementFeesFromTheAccrual) totalManagementFeesFromTheAccrual = 0;
    if (!lostOfProfitsFromManagementFeesFV) lostOfProfitsFromManagementFeesFV = 0;
    if (futureValueSum % 1 !== 0) futureValueSum = parseFloat(futureValueSum.toFixed(2));
    if (totalManagementFeesFromDeposit % 1 !== 0)
        totalManagementFeesFromDeposit = parseFloat(totalManagementFeesFromDeposit.toFixed(2));
    if (totalManagementFeesFromTheAccrual % 1 !== 0)
        totalManagementFeesFromTheAccrual = parseFloat(totalManagementFeesFromTheAccrual.toFixed(2));
    if (lostOfProfitsFromManagementFeesFV % 1 !== 0)
        lostOfProfitsFromManagementFeesFV = parseFloat(lostOfProfitsFromManagementFeesFV.toFixed(2));

        console.log('futureValueSum:', futureValueSum)
    return {
        futureValueSum,
        managementFeesDetails: {
            totalManagementFeesFromDeposit,
            totalManagementFeesFromTheAccrual,
            lostOfProfitsFromManagementFeesFV,
        },
    };
};
//TODO Fix NaN future value bug

export const calculateProfit = (
    futureValue,
    totalDepositAmount,
    totalManagementFees,
    // lostOfProfitsFromManagementFeesFV
) => {
    let profit = futureValue - totalDepositAmount - totalManagementFees || Infinity;
    // console.log('futureValue:', futureValue)
    // console.log('totalDepositAmount:', totalDepositAmount)
    // console.log('totalManagementFees:', totalManagementFees)
    // console.log('profit:', profit)

    if (futureValue === Infinity || totalDepositAmount === Infinity || totalManagementFees === Infinity) profit = Infinity;
    else if (!profit) profit = 0;
    if (profit % 1 === 0) return profit;
    else return parseFloat(profit.toFixed(2));
};

export const calculateFVAfterTax = (futureValue, profit, tax) => {
    let profitAfterTax = profit - profit * tax;
    const futureValueAfterTax = futureValue - profit + profitAfterTax;

    if (!futureValueAfterTax || futureValueAfterTax < 0) profit = 0;
    if (futureValueAfterTax % 1 === 0) return futureValueAfterTax;
    else return parseFloat(futureValueAfterTax.toFixed(2));
};
