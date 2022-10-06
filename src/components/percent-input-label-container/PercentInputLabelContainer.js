import React, { useState } from "react";
import "./percent-input-label-container.styles.scss";

const PercentInputLabelContainer = (props) => {
    const [isInputOnFocus, setIsInputOnFocus] = useState(false);
    
    return (
        <div className={props.isExpanded ? `compound-interest-calculator__clipped-label-input-wrapper--expanded${props.className ? " " + props.className : ""}` : `compound-interest-calculator__clipped-label-input-wrapper${props.className ? " " + props.className : ""}`}>
            <span className="compound-interest-calculator__clipped-label-wrapper">
                <label className="compound-interest-calculator__clipped-label" htmlFor={props.name}>
                    {props.label}
                </label>
            </span>
            <span className={isInputOnFocus ? "compound-interest-calculator__input-add-reduce-buttons-wrapper compound-interest-calculator__input-add-reduce-buttons-wrapper--input-on-focus" : "compound-interest-calculator__input-add-reduce-buttons-wrapper"}>
                <div className="compound-interest-calculator__input-add-reduce-buttons-container">
                    <button
                        type="button"
                        className="compound-interest-calculator__add-btn-container"
                        onClick={props.addButtonOnClick}
                    >
                        <span className="compound-interest-calculator__add-btn">+</span>
                    </button>
                    <input
                        value={props.value}
                        name={props.name}
                        onFocus={(e) => {
                            e.target.select();
                            setIsInputOnFocus(true)
                        }}
                        onBlur={(e) => {
                            setIsInputOnFocus(false)
                        }}
                        onChange={props.onChange}
                        className="percent-input"
                    />
                    <button
                        type="button"
                        className="compound-interest-calculator__reduce-btn-container"
                        onClick={props.reduceButtonOnClick}
                    >
                        <span className="compound-interest-calculator__reduce-btn">-</span>
                    </button>
                </div>
            </span>
        </div>
    );
};

export default PercentInputLabelContainer;
