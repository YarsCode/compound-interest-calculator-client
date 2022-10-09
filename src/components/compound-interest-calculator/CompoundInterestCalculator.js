import React, { useEffect, useReducer, useState } from "react";
import compoundInterestCalculatorFormActionTypes, {
    updateInputAction,
} from "../../actions/compound-interest-calculator-form.actions";
import CompoundInterestCalculatorFormReducer, {
    COMPOUND_INTEREST_CALCULATOR_FORM_INITIAL_STATE,
} from "../../reducers/compound-interest-calculator-form.reducer";
import {
    calculateFV,
    calculateFVAfterTax,
    calculateProfit,
    calculateTotalDepositAmount,
} from "../../utils/calculations";
import { removeCommasFromNumber, separateNumberWithCommas } from "../../utils/numberDisplayManipulations.utils";
import PercentInputLabelContainer from "../percent-input-label-container/PercentInputLabelContainer";
// import { preventInvalidChars } from "../../utils/formValidations";
import CompoundInterestCalculatorNumberInput from "../compound-interest-calculator-number-input/CompoundInterestCalculatorNumberInput";
import "./compound-interest-calculator.styles.scss";
import DoublePercentInputLabelContainer from "../double-percent-input-label-container/DoublePercentInputLabelContainer";

const CompoundInterestCalculator = () => {
    // const [isInputOnFocus, setIsInputOnFocus] = useState(false);
    // const [isInputOnBlur, setIsInputOnBlur] = useState(true);
    const [isExpandBtnOnHover, setIsExpandBtnOnHover] = useState(false);
    const [hasClickedExpandBtn, setHasClickedExpandBtn] = useState(false);
    const [displayAdditionalInputs, setDisplayAdditionalInputs] = useState(false);
    const [hasExpandedAdditionalFutureValueOptions, setHasExpandedAdditionalFutureValueOptions] = useState(false);
    const [compoundInterestCalculatorFormState, dispatchCompoundInterestCalculatorFormState] = useReducer(
        CompoundInterestCalculatorFormReducer,
        COMPOUND_INTEREST_CALCULATOR_FORM_INITIAL_STATE
    );

    useEffect(() => {
        const totalDepositAmount = calculateTotalDepositAmount(
            compoundInterestCalculatorFormState.values.initialDepositAmount,
            compoundInterestCalculatorFormState.values.monthlyDepositAmount,
            compoundInterestCalculatorFormState.values.periodOfInvestmentInYears,
            compoundInterestCalculatorFormState.values.totalManagementFeeSumFromDeposit
        );

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_TOTAL_DEPOSIT_AMOUNT,
                totalDepositAmount,
                true,
                ""
            )
        );

        const futureValue = calculateFV(
            compoundInterestCalculatorFormState.values.initialDepositAmount,
            compoundInterestCalculatorFormState.values.monthlyDepositAmount,
            compoundInterestCalculatorFormState.values.annualInterest / 100,
            compoundInterestCalculatorFormState.values.periodOfInvestmentInYears,
            12,
            compoundInterestCalculatorFormState.values.managementFeePercentFromDeposit,
            compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual
        );

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_FUTURE_VALUE,
                futureValue.futureValueSum,
                true,
                ""
            )
        );
        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_TOTAL_MANAGEMENT_FEE_SUM_FROM_DEPOSIT,
                futureValue.managementFeesDetails.totalManagementFeesFromDeposit,
                true,
                ""
            )
        );
        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_TOTAL_MANAGEMENT_FEE_SUM_FROM_THE_ACCRUAL,
                futureValue.managementFeesDetails.totalManagementFeesFromTheAccrual,
                true,
                ""
            )
        );
        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_LOST_OF_PROFITS_FROM_MANAGEMENT_FEES_FV,
                futureValue.managementFeesDetails.lostOfProfitsFromManagementFeesFV,
                true,
                ""
            )
        );

        const profit = calculateProfit(
            futureValue.futureValueSum,
            totalDepositAmount,
            futureValue.managementFeesDetails.totalManagementFeesFromDeposit +
                futureValue.managementFeesDetails.totalManagementFeesFromTheAccrual
        );
        // console.log(futureValue.managementFeesDetails.totalManagementFeesFromDeposit);
        // console.log(futureValue.managementFeesDetails.totalManagementFeesFromTheAccrual);
        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(compoundInterestCalculatorFormActionTypes.UPDATE_PROFIT, profit, true, "")
        );
    }, [
        compoundInterestCalculatorFormState.values.initialDepositAmount,
        compoundInterestCalculatorFormState.values.monthlyDepositAmount,
        compoundInterestCalculatorFormState.values.annualInterest,
        compoundInterestCalculatorFormState.values.periodOfInvestmentInYears,
        compoundInterestCalculatorFormState.values.managementFeePercentFromDeposit,
        compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual,
        compoundInterestCalculatorFormState.values.lostOfProfitsFromManagementFeesFV,
    ]);

    const handleInitialDepositAmountOnChange = (e) => {
        const inputWithoutCommas = parseFloat(removeCommasFromNumber(e.target.value)) || 0;
        // const isValidInput = /^[0-9]*$/.test(inputWithoutCommas);

        // if (!isValidInput) {
        //     return dispatchCompoundInterestCalculatorFormState(
        //         updateInputAction(
        //             compoundInterestCalculatorFormActionTypes.UPDATE_INITIAL_DEPOSIT_AMOUNT,
        //             compoundInterestCalculatorFormState.values.initialDepositAmount,
        //             false,
        //             "שדה זה יכול להכיל ספרות בלבד"
        //         )
        //     );
        // }
        //TODO handle numbers that are larger than 9_999_999_999_999_999
        if (compoundInterestCalculatorFormState.values.totalDepositAmount > 9999999999999999) {
            console.log("test");
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_INITIAL_DEPOSIT_AMOUNT,
                    compoundInterestCalculatorFormState.values.initialDepositAmount,
                    false,
                    "מספר גדול מדי"
                )
            );
        }

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_INITIAL_DEPOSIT_AMOUNT,
                inputWithoutCommas,
                true,
                ""
            )
        );
    };

    const handleMonthlyDepositAmountOnChange = (e) => {
        const inputWithoutCommas = parseFloat(removeCommasFromNumber(e.target.value)) || 0;
        // const isValidInput = /^[0-9]*$/.test(inputWithoutCommas);

        // if (!isValidInput) {
        //     return dispatchCompoundInterestCalculatorFormState(
        //         updateInputAction(
        //             compoundInterestCalculatorFormActionTypes.UPDATE_MONTHLY_DEPOSIT_AMOUNT,
        //             compoundInterestCalculatorFormState.values.monthlyDepositAmount,
        //             false,
        //             "שדה זה יכול להכיל ספרות בלבד"
        //         )
        //     );
        // }

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_MONTHLY_DEPOSIT_AMOUNT,
                inputWithoutCommas,
                true,
                ""
            )
        );
    };

    const handleAnnualInterestOnChange = (e) => {
        const input = parseFloat(e.target.value);
        const isValidInput = /^[0-9]*$/.test(input);
        // console.log('isValidInput:', isValidInput)

        if (!isValidInput) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_ANNUAL_INTEREST,
                    compoundInterestCalculatorFormState.values.annualInterest,
                    false,
                    "שדה זה יכול להכיל ספרות בלבד"
                )
            );
        }

        if (input > 5000) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_ANNUAL_INTEREST,
                    compoundInterestCalculatorFormState.values.annualInterest,
                    false,
                    "אנא הכניסו מספר ריאלי"
                )
            );
        }

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(compoundInterestCalculatorFormActionTypes.UPDATE_ANNUAL_INTEREST, input, true, "")
        );
    };

    const handleAddButtonOnClick = (value, actionType, amountToAdd) => {
        const parsedValue = parseFloat(value);

        dispatchCompoundInterestCalculatorFormState(updateInputAction(actionType, parsedValue + amountToAdd, true, ""));
    };

    const handleReduceButtonOnClick = (value, actionType, amountToReduce) => {
        const parsedValue = parseFloat(value);

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(actionType, parsedValue - amountToReduce, true, "")
        );
    };

    const handleManagementFeePercentFromDepositOnChange = (e) => {
        const input = parseFloat(e.target.value);
        const isValidInput = /^[0-9]\d*(\.\d+)?$/.test(input);
        // console.log('isValidInput:', isValidInput)
        if (input.length === 0) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT,
                    0,
                    false,
                    "אנא הכניסו מספר ריאלי"
                )
            );
        }

        if (!isValidInput) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT,
                    compoundInterestCalculatorFormState.values.managementFeePercentFromDeposit,
                    false,
                    "שדה זה יכול להכיל ספרות בלבד"
                )
            );
        }

        if (input.length > 0 && input[0] === 0) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT,
                    input.slice(1),
                    false,
                    "אנא הכניסו מספר ריאלי"
                )
            );
        }

        if (input > 100) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT,
                    compoundInterestCalculatorFormState.values.managementFeePercentFromDeposit,
                    false,
                    "אנא הכניסו מספר ריאלי"
                )
            );
        }

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT,
                input,
                true,
                ""
            )
        );
    };
    const handleManagementFeePercentFromTheAccrualOnChange = (e) => {
        const input = parseFloat(e.target.value);
        const isValidInput = /^[0-9]*$/.test(input);
        // console.log('isValidInput:', isValidInput)

        if (!isValidInput) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_THE_ACCRUAL,
                    compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual,
                    false,
                    "שדה זה יכול להכיל ספרות בלבד"
                )
            );
        }

        // if (parseInt(e.target.value) === 0) {
        //     return dispatchCompoundInterestCalculatorFormState(
        //         updateInputAction(
        //             compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_THE_ACCRUAL,
        //             compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual,
        //             false,
        //             "אנא הכניסו מספר ריאלי"
        //         )
        //     );
        // }

        if (input > 100) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_THE_ACCRUAL,
                    compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual,
                    false,
                    "אנא הכניסו מספר ריאלי"
                )
            );
        }

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_THE_ACCRUAL,
                input,
                true,
                ""
            )
        );
    };

    const handlePeriodOfInvestmentInYearsOnChange = (e) => {
        const input = parseInt(e.target.value);
        const isValidInput = /^[0-9]*$/.test(input);
        if (!isValidInput) {
            return dispatchCompoundInterestCalculatorFormState(
                updateInputAction(
                    compoundInterestCalculatorFormActionTypes.UPDATE_PERIOD_OF_INVESTMENT_IN_YEARS,
                    compoundInterestCalculatorFormState.values.periodOfInvestmentInYears,
                    false,
                    "שדה זה יכול להכיל ספרות בלבד"
                )
            );
        }

        dispatchCompoundInterestCalculatorFormState(
            updateInputAction(
                compoundInterestCalculatorFormActionTypes.UPDATE_PERIOD_OF_INVESTMENT_IN_YEARS,
                input,
                true,
                ""
            )
        );
    };

    const handleExpandButtonOnClick = (isExpanded) => {
        // if (isExpanded) {
        // setTimeout(() => {
        setDisplayAdditionalInputs(!displayAdditionalInputs);
        // }, 500);
        // } else setDisplayAdditionalInputs(!displayAdditionalInputs);
    };

    const handleSmallerFontWhenOverflows = (mainClass, currentResult) => {
        if (currentResult > 99999999999999) {
            return `${mainClass}--smallest-font`;
        }
        if (currentResult > 99999999999) {
            return `${mainClass}--smaller-font`;
        }
        return mainClass;
    };

    return (
        <main className="compound-interest-calculator-container">
            <h1 className="compound-interest-calculator__main-title">מחשבון ריבית דריבית</h1>
            <form className="compound-interest-calculator-form">
                <CompoundInterestCalculatorNumberInput
                    label={"סכום הפקדה ראשוני"}
                    value={compoundInterestCalculatorFormState.values.initialDepositAmount}
                    name="initial-deposit-amount"
                    onChange={handleInitialDepositAmountOnChange}
                />

                <CompoundInterestCalculatorNumberInput
                    label={"סכום הפקדה חודשי"}
                    value={compoundInterestCalculatorFormState.values.monthlyDepositAmount}
                    name="monthly-deposit-amount"
                    onChange={handleMonthlyDepositAmountOnChange}
                />
                <CompoundInterestCalculatorNumberInput
                    label={"מספר שנות הפקדה"}
                    value={compoundInterestCalculatorFormState.values.periodOfInvestmentInYears}
                    name="period-of-investment-in-years"
                    onChange={handlePeriodOfInvestmentInYearsOnChange}
                />
                <PercentInputLabelContainer
                    value={compoundInterestCalculatorFormState.values.annualInterest}
                    name={"annual-interest"}
                    label={"ריבית שנתית"}
                    onChange={handleAnnualInterestOnChange}
                    addButtonOnClick={() => {
                        handleAddButtonOnClick(
                            compoundInterestCalculatorFormState.values.annualInterest,
                            compoundInterestCalculatorFormActionTypes.UPDATE_ANNUAL_INTEREST,
                            0.5
                        );
                    }}
                    reduceButtonOnClick={() => {
                        handleReduceButtonOnClick(
                            compoundInterestCalculatorFormState.values.annualInterest,
                            compoundInterestCalculatorFormActionTypes.UPDATE_ANNUAL_INTEREST,
                            0.5
                        );
                    }}
                />
                {
                    /*displayAdditionalInputs && */ <div
                        className={
                            displayAdditionalInputs
                                ? "additional-percent-inputs-container--expanded"
                                : "additional-percent-inputs-container"
                        }
                    >
                        <PercentInputLabelContainer
                            value={compoundInterestCalculatorFormState.values.managementFeePercentFromDeposit}
                            name={"management-fees-from-deposit"}
                            label={"דמי ניהול מהפקדה"}
                            onChange={handleManagementFeePercentFromDepositOnChange}
                            addButtonOnClick={() => {
                                handleAddButtonOnClick(
                                    compoundInterestCalculatorFormState.values.managementFeePercentFromDeposit,
                                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT,
                                    0.5
                                );
                            }}
                            reduceButtonOnClick={() => {
                                handleReduceButtonOnClick(
                                    compoundInterestCalculatorFormState.values.managementFeePercentFromDeposit,
                                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_DEPOSIT,
                                    0.5
                                );
                            }}
                            isExpanded={displayAdditionalInputs}
                            className={"additional-right_input"}
                        />
                        <PercentInputLabelContainer
                            value={compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual}
                            name={"management-fees-from-the-accrual"}
                            label={"דמי ניהול מצבירה"}
                            onChange={handleManagementFeePercentFromTheAccrualOnChange}
                            addButtonOnClick={() => {
                                handleAddButtonOnClick(
                                    compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual,
                                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_THE_ACCRUAL,
                                    0.5
                                );
                            }}
                            reduceButtonOnClick={() => {
                                handleReduceButtonOnClick(
                                    compoundInterestCalculatorFormState.values.managementFeePercentFromTheAccrual,
                                    compoundInterestCalculatorFormActionTypes.UPDATE_MANAGEMENT_FEE_PERCENT_FROM_THE_ACCRUAL,
                                    0.5
                                );
                            }}
                            isExpanded={displayAdditionalInputs}
                            className={"additional-left_input"}
                        />
                    </div>
                }

                <div
                    className={
                        hasClickedExpandBtn
                            ? "expand-form-and-results-btn-container--expanded"
                            : "expand-form-and-results-btn-container"
                    }
                    onMouseEnter={() => {
                        setIsExpandBtnOnHover(true);
                    }}
                    onMouseLeave={() => {
                        setIsExpandBtnOnHover(false);
                    }}
                    onFocus={() => {
                        setIsExpandBtnOnHover(true);
                    }}
                    onBlur={() => {
                        setIsExpandBtnOnHover(false);
                    }}
                    onClick={() => {
                        const expanded = !hasClickedExpandBtn;
                        setHasClickedExpandBtn(!hasClickedExpandBtn);
                        handleExpandButtonOnClick(expanded);
                    }}
                >
                    <button className="expand-form-and-results-btn" type="button">
                        <div
                            className={
                                isExpandBtnOnHover
                                    ? "expand-form-and-results_plus--hover"
                                    : "expand-form-and-results_plus"
                            }
                        >
                            {hasClickedExpandBtn ? "-" : "+"}
                        </div>
                        <div
                            className={
                                isExpandBtnOnHover
                                    ? "expand-form-and-results_title--hover"
                                    : "expand-form-and-results_title"
                            }
                        >
                            {hasClickedExpandBtn ? "הסתר נתונים מורחבים" : "הצג נתונים מורחבים"}
                        </div>
                    </button>
                </div>
            </form>
            <h2 className="header__h2">מבט לעבר העתיד שלך</h2>
            <section className="compound-interest-calculator-calculation-results">
                <div className="all-deposits-result-container">
                    <div
                        className={
                            (displayAdditionalInputs
                                ? "deposit-result-container--expanded"
                                : "deposit-result-container") + " deposit-result__total-deposit-sum-wrapper"
                        }
                    >
                        <h3
                            className={handleSmallerFontWhenOverflows(
                                "deposit-result__title",
                                compoundInterestCalculatorFormState.values.totalDepositAmount
                            )}
                        >
                            סכום ההפקדה הכולל
                        </h3>
                        <p
                            className={handleSmallerFontWhenOverflows(
                                "deposit-result-sum",
                                compoundInterestCalculatorFormState.values.totalDepositAmount
                            )}
                        >
                            {separateNumberWithCommas(compoundInterestCalculatorFormState.values.totalDepositAmount)}
                            <span>₪</span>
                        </p>
                    </div>
                    <div
                        className={
                            displayAdditionalInputs
                                ? "total-management-fees-wrapper--expanded"
                                : "total-management-fees-wrapper"
                        }
                    >
                        <div
                            className={
                                displayAdditionalInputs
                                    ? "total-management-fees-from-deposit-container--expanded"
                                    : "total-management-fees-from-deposit-container"
                            }
                        >
                            <h3 className="deposit-result__title">סך דמי ניהול מההפקדה</h3>
                            <p className="deposit-result-sum">
                                {separateNumberWithCommas(
                                    compoundInterestCalculatorFormState.values.totalManagementFeeSumFromDeposit
                                )}
                                <span>₪</span>
                            </p>
                        </div>
                        <div
                            className={
                                displayAdditionalInputs
                                    ? "total-management-fees-from-the-accrual-container--expanded"
                                    : "total-management-fees-from-the-accrual-container"
                            }
                        >
                            <h3 className="deposit-result__title">סך דמי ניהול מהצבירה</h3>
                            <p className="deposit-result-sum">
                                {separateNumberWithCommas(
                                    compoundInterestCalculatorFormState.values.totalManagementFeeSumFromTheAccrual
                                )}
                                <span>₪</span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="all-profits-container">
                    {/* <div className="compound-interest-calculator-calculation-result-container">
                        <h3 className="compound-interest-calculator-calculation-result__title">
                            סך רווח לפני ניכוי דמי הניהול (לפני מס)
                        </h3>
                        <p className="compound-interest-calculator-calculation-result">
                            <span>₪</span>
                            {separateNumberWithCommas(compoundInterestCalculatorFormState.values.profit)}
                        </p>
                    </div> */}
                    {/* <div className="compound-interest-calculator-calculation-result-container">
                        <h3 className="compound-interest-calculator-calculation-result__title">
                            אבדן רווח עקב גביית דמי ניהול
                        </h3>
                        <p className="compound-interest-calculator-calculation-result">
                            <span>₪</span>
                            {separateNumberWithCommas(
                                compoundInterestCalculatorFormState.values.lostOfProfitsFromManagementFeesFV
                            )}
                        </p>
                    </div> */}
                    <div className="total-profits-result-container">
                        <h3 className={handleSmallerFontWhenOverflows("total-profits-result__title", compoundInterestCalculatorFormState.values.profit - compoundInterestCalculatorFormState.values.lostOfProfitsFromManagementFeesFV)}>סך הרווח הכולל {/*(לפני מס)*/}</h3>
                        <p className={handleSmallerFontWhenOverflows("total-profits-result", compoundInterestCalculatorFormState.values.profit - compoundInterestCalculatorFormState.values.lostOfProfitsFromManagementFeesFV)}>
                            {separateNumberWithCommas(
                                compoundInterestCalculatorFormState.values.profit -
                                    compoundInterestCalculatorFormState.values.lostOfProfitsFromManagementFeesFV
                            )}
                            <span>₪</span>
                        </p>
                    </div>
                </div>
                <div className="all-future-values-container">
                    <button className={hasExpandedAdditionalFutureValueOptions ? "expand-future-value-options-button-container--expanded" : "expand-future-value-options-button-container"} onClick={() => {setHasExpandedAdditionalFutureValueOptions(!hasExpandedAdditionalFutureValueOptions)}}>
                        <span>{hasExpandedAdditionalFutureValueOptions ? "-" : "+"}</span>
                    </button>
                    <div className={hasExpandedAdditionalFutureValueOptions ? "additional-future-value-options-container--expanded" : "additional-future-value-options-container"}>
                        <div className={hasExpandedAdditionalFutureValueOptions ? "additional-future-value-option-container--expanded" : "additional-future-value-option-container"}>
                            <h3 className="additional-future-value-option__title">
                                לפני מס ולפני ניכוי דמי הניהול
                            </h3>
                            <p className="additional-future-value-option-result">
                                <span>₪</span>
                                {separateNumberWithCommas(compoundInterestCalculatorFormState.values.futureValue)}
                            </p>
                        </div>
                        <div className={hasExpandedAdditionalFutureValueOptions ? "additional-future-value-option-container--expanded" : "additional-future-value-option-container"}>
                            <h3 className="additional-future-value-option__title">
                                לפני מס ואחרי ניכוי דמי הניהול
                            </h3>
                            <p className="additional-future-value-option-result">
                                <span>₪</span>
                                {separateNumberWithCommas(
                                    compoundInterestCalculatorFormState.values.futureValue -
                                        compoundInterestCalculatorFormState.values.totalManagementFeeSumFromDeposit -
                                        compoundInterestCalculatorFormState.values.totalManagementFeeSumFromTheAccrual -
                                        compoundInterestCalculatorFormState.values.lostOfProfitsFromManagementFeesFV
                                )}
                            </p>
                        </div>
                        <div className={hasExpandedAdditionalFutureValueOptions ? "additional-future-value-option-container--expanded" : "additional-future-value-option-container"}>
                            <h3 className="additional-future-value-option__title">
                                אחרי מס ולפני ניכוי דמי הניהול
                            </h3>
                            <p className="additional-future-value-option-result">
                                <span>₪</span>
                                {separateNumberWithCommas(
                                    calculateFVAfterTax(
                                        compoundInterestCalculatorFormState.values.futureValue,
                                        compoundInterestCalculatorFormState.values.profit,
                                        0.25
                                    )
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="net-future-value-container">
                        <h3 className="net-future-value__title">
                            {/* סך החיסכון העתידי לאחר מס ואחרי ניכוי דמי הניהול (נטו) */}
                            סך החיסכון העתידי נטו
                        </h3>
                        <p className="net-future-value">
                            {separateNumberWithCommas(
                                calculateFVAfterTax(
                                    compoundInterestCalculatorFormState.values.futureValue -
                                        compoundInterestCalculatorFormState.values.totalManagementFeeSumFromDeposit -
                                        compoundInterestCalculatorFormState.values.totalManagementFeeSumFromTheAccrual -
                                        compoundInterestCalculatorFormState.values.lostOfProfitsFromManagementFeesFV,
                                    compoundInterestCalculatorFormState.values.profit,
                                    0.25
                                )
                            )}
                            <span>₪</span>
                        </p>
                    </div>
                </div>
            </section>
            {/* <span className="yars-signature">Created By yars</span> */}
        </main>
    );
};

export default CompoundInterestCalculator;
