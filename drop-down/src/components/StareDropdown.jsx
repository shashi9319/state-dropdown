import React, { useEffect, useRef, useState } from 'react';
import './StareDropdown.css';
import { states } from './states';

export default function StareDropdown() {
  const [isDropdownDisplayed, setIsDropdownDisplayed] = useState(false);
  const [selectedStates, setSelectedStates] = useState(
    states.reduce((obj, state) => ({ ...obj, [state.key]: false }), {})
  );
  const dropdownRef = useRef(null);
  const numberOfStatesSelected =
    Object.values(selectedStates).filter(Boolean).length;

  useEffect(() => {
    const onCLick = (e) => {
      if (e.target !== dropdownRef.current) {
        setIsDropdownDisplayed(false);
      }
    };
    document.addEventListener('click', onCLick);
    return () => {
      document.removeEventListener('click', onCLick);
    };
  }, []);

  return (
    <fieldset className="state-dropdown">
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsDropdownDisplayed((prv) => !prv);
        }}
      >
        {numberOfStatesSelected
          ? `${numberOfStatesSelected} states selected`
          : '--Select your state--'}
      </button>
      {isDropdownDisplayed && (
        <div
          onClick={(e) => e.stopPropagation()}
          ref={dropdownRef}
          className="panel"
        >
          {states.map((state) => (
            <div
              key={state.key}
              className={`state ${selectedStates[state.key] ? 'selected' : ''}`}
            >
              <input
                onChange={(e) =>
                  setSelectedStates({
                    ...selectedStates,
                    [state.key]: e.target.checked,
                  })
                }
                id={`input-${state.key}`}
                type="checkbox"
              />
              <label htmlFor={`input-${state.key}`}>{state.name}</label>
            </div>
          ))}
        </div>
      )}
    </fieldset>
  );
}
