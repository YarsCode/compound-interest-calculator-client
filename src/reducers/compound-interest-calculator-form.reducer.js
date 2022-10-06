import compoundInterestCalculatorFormActionTypes from "../actions/compound-interest-calculator-form.actions";
import { areValuesValid, areValueValiditiesValid } from "../utils/compoundInterestCalculatorForm.utils";

export const COMPOUND_INTEREST_CALCULATOR_FORM_INITIAL_STATE = {
    values: {
        initialDepositAmount: 1000, // סכום הפקדה ראשוני
        monthlyDepositAmount: 1000, // סכום הפקדה חודשי
        annualInterest: "7", // ריבית שנתית
        periodOfInvestmentInYears: 30, // מספר שנות הפקדה
        totalDepositAmount: 0,
        futureValue: 0,
        profit: 0,
        managementFeePercentFromDeposit: 0, // אחוז דמי ניהול מהפקדה
        managementFeePercentFromTheAccrual: 0, // אחוז דמי ניהול מהצבירה
        totalManagementFeeSumFromDeposit: 0, // סך דמי ניהול מההפקדה
        totalManagementFeeSumFromTheAccrual: 0, // סך דמי ניהול מהצבירה
        lostOfProfitsFromManagementFeesFV: 0 // אבדן רווח עקב גביית דמי ניהול
    },
    validities: {
        isInitialDepositAmountValid: true,
        isMonthlyDepositAmountValid: true,
        isAnnualInterestValid: true,
        isPeriodOfInvestmentInYearsValid: true,
        isTotalDepositAmountValid: true,
        isFutureValueValid: true,
        isProfitValid: true,
        isManagementFeePercentFromDepositValid: true,
        isManagementFeePercentFromTheAccrualValid: true,
        isTotalManagementFeeSumFromDepositValid: true,
        isTotalManagementFeeSumFromTheAccrualValid: true,
        isLostOfProfitsFromManagementFeesFVValid: true
    },
    errorMessages: {
        initialDepositAmountErrorMessage: '',
        monthlyDepositAmountErrorMessage: '',
        annualInterestErrorMessage: '',
        periodOfInvestmentInYearsErrorMessage: '',
        totalDepositAmountErrorMessage: '',
        futureValueErrorMessage: '',
        profitErrorMessage: '',
        managementFeePercentFromDepositErrorMessage: '',
        managementFeePercentFromTheAccrualErrorMessage: '',
        totalManagementFeeSumFromDepositErrorMessage: '',
        totalManagementFeeSumFromTheAccrualErrorMessage: '',
        lostOfProfitsFromManagementFeesFVErrorMessage: '',
    },
    isFormValid: false,
};

const CompoundInterestCalculatorFormReducer = (state, action) => {
    switch (action.type) {
        case compoundInterestCalculatorFormActionTypes.UPDATE_INITIAL_DEPOSIT_AMOUNT: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), initialDepositAmount: value };
            const updatedValidities = { ...structuredClone(state.validities), isInitialDepositAmountValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), initialDepositAmountErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_MONTHLY_DEPOSIT_AMOUNT: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), monthlyDepositAmount: value };
            const updatedValidities = { ...structuredClone(state.validities), isMonthlyDepositAmountValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), monthlyDepositAmountErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_ANNUAL_INTEREST: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), annualInterest: value };
            const updatedValidities = { ...structuredClone(state.validities), isAnnualInterestValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), annualInterestErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_PERIOD_OF_INVESTMENT_IN_YEARS: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), periodOfInvestmentInYears: value };
            const updatedValidities = { ...structuredClone(state.validities), isPeriodOfInvestmentInYearsValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), periodOfInvestmentInYearsErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_TOTAL_DEPOSIT_AMOUNT: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), totalDepositAmount: value };
            const updatedValidities = { ...structuredClone(state.validities), isTotalDepositAmountValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), totalDepositAmountErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_FUTURE_VALUE: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), futureValue: value };
            const updatedValidities = { ...structuredClone(state.validities), isFutureValueValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), futureValueErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_PROFIT: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), profit: value };
            const updatedValidities = { ...structuredClone(state.validities), isProfitValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), profitErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), managementFeePercentFromDeposit: value };
            const updatedValidities = { ...structuredClone(state.validities), isManagementFeePercentFromDepositValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), managementFeePercentFromDepositErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_THE_ACCRUAL: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), managementFeePercentFromTheAccrual: value };
            const updatedValidities = { ...structuredClone(state.validities), isManagementFeePercentFromTheAccrualValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), managementFeePercentFromTheAccrualErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_TOTAL_MANAGEMENT_FEE_SUM_FROM_DEPOSIT: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), totalManagementFeeSumFromDeposit: value };
            const updatedValidities = { ...structuredClone(state.validities), isTotalManagementFeeSumFromDepositValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), totalManagementFeeSumFromDepositErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_TOTAL_MANAGEMENT_FEE_SUM_FROM_THE_ACCRUAL: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), totalManagementFeeSumFromTheAccrual: value };
            const updatedValidities = { ...structuredClone(state.validities), isTotalManagementFeeSumFromTheAccrualValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), totalManagementFeeSumFromTheAccrualErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        case compoundInterestCalculatorFormActionTypes.UPDATE_LOST_OF_PROFITS_FROM_MANAGEMENT_FEES_FV: {
            const { value, isValid, errorMessage } = action.payload;

            const updatedValues = { ...structuredClone(state.values), lostOfProfitsFromManagementFeesFV: value };
            const updatedValidities = { ...structuredClone(state.validities), isLostOfProfitsFromManagementFeesFVValid: isValid };
            const updatedErrorMessages = { ...structuredClone(state.errorMessages), lostOfProfitsFromManagementFeesFVErrorMessage: errorMessage };
            const updatedIsFormValidity =
                areValuesValid(updatedValues) && areValueValiditiesValid(updatedValidities);

            return {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
                isFormValid: updatedIsFormValidity,
            };
        }
        default:
            return { ...state };
    }
};

export default CompoundInterestCalculatorFormReducer;