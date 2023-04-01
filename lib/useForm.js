import { useState, useEffect } from "react";

export default function useForm(initial = {}) {
  const [inputs, setInputs] = useState(initial);

  // because apollo queries initially give us undefined (during loading state) and we can't early return from a component with hooks underneath, we use an effect to "watch" the initial state. When it finally does come in, we update it
  // useEffect(() => {
  //   setInputs(initial);
  // }, [initial]);

  function handleChange(e) {
    let { value, name, type } = e.target;
    if (type === "number") {
      value = parseInt(value);
    }
    if (type === "file") {
      [value] = e.target.files;
    }
    setInputs({
      ...inputs,
      [name]: value,
    });
  }

  function resetForm() {
    setInputs(initial);
  }

  function clearForm() {
    const blankState = Object.fromEntries(
      Object.entries(inputs).map(([key]) => [key, ""])
    );
    setInputs(blankState);
  }

  return {
    inputs,
    handleChange,
    resetForm,
    clearForm,
  };
}
