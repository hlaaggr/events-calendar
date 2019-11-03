import { useState } from "react";

export const useInput = initialValue => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    reset: () => setValue(""),
    bind: {
      value,
      onChange: event => {
        setValue(event.target.value);
      }
    }
  };
};

export const useCheckBox = initialValue => {
  const [checked, setChecked] = useState(initialValue);

  const toggle = () => setChecked(!checked);

  return {
    checked,
    setChecked,
    bind: {
      checked, 
      onChange: toggle
    }
  }
}