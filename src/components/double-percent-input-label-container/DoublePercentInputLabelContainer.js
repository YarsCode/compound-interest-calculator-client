import React, { useState } from "react";
import "./double-percent-input-label-container.styles.scss";

const DoublePercentInputLabelContainer = (props) => {
    const [isRightInputOnFocus, setRightIsInputOnFocus] = useState(false);
    const [isLeftInputOnFocus, setLeftIsInputOnFocus] = useState(false);

    return (
        <div className="compound-interest-calculator__double-label-input-wrapper">
            <div className="compound-interest-calculator__clipped-double-label-input-wrapper--right">
                <span className="compound-interest-calculator__clipped-label-wrapper">
                    <label
                        className="compound-interest-calculator__clipped-label compound-interest-calculator__clipped-label--right"
                        htmlFor={props.name1}
                    >
                        {props.label1}
                    </label>
                </span>
                <span
                    className={
                        isRightInputOnFocus
                            ? "compound-interest-calculator__input-add-reduce-buttons-wrapper compound-interest-calculator__input-add-reduce-buttons-wrapper--input-on-focus"
                            : "compound-interest-calculator__input-add-reduce-buttons-wrapper"
                    }
                >
                    <div className="compound-interest-calculator__input-add-reduce-buttons-container">
                        <button
                            type="button"
                            className="compound-interest-calculator__add-btn-container"
                            onClick={props.addButtonOnClick1}
                        >
                            <span className="compound-interest-calculator__add-btn">+</span>
                        </button>
                        <input
                            value={props.value1}
                            name={props.name1}
                            onFocus={(e) => {
                                e.target.select();
                                setRightIsInputOnFocus(true);
                            }}
                            onBlur={(e) => {
                                setRightIsInputOnFocus(false);
                            }}
                            onChange={props.onChange1}
                            className="percent-input"
                        />
                        <button
                            type="button"
                            className="compound-interest-calculator__reduce-btn-container"
                            onClick={props.reduceButtonOnClick1}
                        >
                            <span className="compound-interest-calculator__reduce-btn">-</span>
                        </button>
                    </div>
                </span>
            </div>

            <div className="compound-interest-calculator__clipped-double-label-input-wrapper--left">
                <span
                    className={
                        isLeftInputOnFocus
                            ? "compound-interest-calculator__input-add-reduce-buttons-wrapper compound-interest-calculator__input-add-reduce-buttons-wrapper--input-on-focus"
                            : "compound-interest-calculator__input-add-reduce-buttons-wrapper"
                    }
                >
                    <div className="compound-interest-calculator__input-add-reduce-buttons-container">
                        <button
                            type="button"
                            className="compound-interest-calculator__add-btn-container"
                            onClick={props.addButtonOnClick2}
                        >
                            <span className="compound-interest-calculator__add-btn">+</span>
                        </button>
                        <input
                            value={props.value2}
                            name={props.name2}
                            onFocus={(e) => {
                                e.target.select();
                                setLeftIsInputOnFocus(true);
                            }}
                            onBlur={(e) => {
                                setLeftIsInputOnFocus(false);
                            }}
                            onChange={props.onChange2}
                            className="percent-input"
                        />
                        <button
                            type="button"
                            className="compound-interest-calculator__reduce-btn-container"
                            onClick={props.reduceButtonOnClick2}
                        >
                            <span className="compound-interest-calculator__reduce-btn">-</span>
                        </button>
                    </div>
                </span>
                <span className="compound-interest-calculator__clipped-label-wrapper">
                    <label
                        className="compound-interest-calculator__clipped-label compound-interest-calculator__clipped-label--left"
                        htmlFor={props.name2}
                    >
                        {props.label2}
                    </label>
                </span>
            </div>
        </div>
    );
};

export default DoublePercentInputLabelContainer;
