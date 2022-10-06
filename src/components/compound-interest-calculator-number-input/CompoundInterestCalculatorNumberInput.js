import React, { useState } from "react";
import "./compound-interest-calculator-number-input.styles.scss";

const CompoundInterestCalculatorNumberInput = (props) => {
    const [isInputOnFocus, setIsInputOnFocus] = useState(false);

    return (
        <div
            className={
                isInputOnFocus
                    ? "compound-interest-calculator__label-input-wrapper--on-focus"
                    : "compound-interest-calculator__label-input-wrapper"
            }
        >
            <label className="compound-interest-calculator__label" htmlFor="initial-deposit-amount">
                {props.label}
            </label>
            <input
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                onFocus={() => {
                    setIsInputOnFocus(true);
                }}
                onBlur={() => {
                    setIsInputOnFocus(false);
                }}
                className="compound-interest-calculator-number-input"
            />
        </div>
    );
};

export default CompoundInterestCalculatorNumberInput;
