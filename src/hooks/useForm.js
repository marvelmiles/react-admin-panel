import { useEffect, useState } from "react";

export const isEmail = str => {
  return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(
    str
  );
};
export const isFullName = str => {
  return /\w+(\s|-|')+\w+/.test(str);
};

export const isNumber = str => {
  return /(\d+){10,13}/.test(str);
};

export const isPassword = str => {
  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );
  if (strongPassword.test(str)) return "Strong";
  else if (mediumPassword.test(str)) return "Medium";
  else return "Weak";
};
export const useForm = (config = {}, onSubmit) => {
  const getFormStateData = () => {
    let fd = config.placeholders || {};
    for (let key in config.formState) {
      if (config.formState[key].value === undefined)
        fd[config.formState[key] || key] = "";
      else {
        fd[key] = config.formState[key].value || "";
      }
    }
    return fd;
  };
  const [stateChanged, setStateChanged] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(null);
  const [formData, setFormData] = useState(config.placeholders || {});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      if (typeof onSubmit === "function")
        onSubmit(Object.assign({}, formData), stateChanged);
      else setIsSubmitting(false);
    }
  }, [errors, isSubmitting, formData, onSubmit, stateChanged]);

  const handleSubmit = e => {
    if (e) e.preventDefault();
    let _errors = {
      ...errors
    };
    for (let key in config.formState || {}) {
      if (config.formState.toString() === "[object Object]") {
        if (!formData[key]) {
          _errors[key] = "required";
        } else if (errors[key] === "Medium password" && key === "password") {
          delete _errors[key];
        }
      } else if (!formData[config.formState[key]]) {
        _errors[config.formState[key]] = "required";
      } else if (errors[config.formState[key]] === "Medium password")
        delete _errors[config.formState[key]];
    }
    !Object.keys(_errors).length && setIsSubmitting(true);
    setErrors(_errors);
  };
  const handleChange = e => {
    const key = e.target.name;
    const value =
      e.currentTarget.type === "file"
        ? e.currentTarget.files
        : e.currentTarget.value;
    setIsSubmitting(false);
    setStateChanged(true);
    setFormData({
      ...(stateChanged ? formData : getFormStateData()),
      [key]: value
    });
    if (!value) {
      return setErrors({
        ...errors,
        [key]: "required"
      });
    }
    let isValid = true;
    if (key === "email") {
      if (!isEmail(value)) {
        isValid = false;
        setErrors({
          ...errors,
          [key]: "Invalid Email"
        });
      }
    } else if (key === "fullname") {
      if (!isFullName(value)) {
        isValid = false;
        setErrors({
          ...errors,
          [key]: "Name must be separated by space"
        });
      }
    } else if (key === "phone") {
      if (!isNumber(value)) {
        isValid = false;
        setErrors({
          ...errors,
          [key]: "Invalid phone number"
        });
      }
    } else if (key === "password") {
      const status = isPassword(value);
      if (status !== "Strong") {
        isValid = false;
        setErrors({
          ...errors,
          [key]: `${status} password`
        });
      }
    }
    if (isValid) {
      delete errors[key];
      setErrors(errors);
    }
  };
  const reset = (formData = {}, config = {}) => {
    setIsSubmitting(
      config.isSubmitting === undefined ? false : config.isSubmitting
    );
    if (typeof formData === "boolean") {
      if (!formData) setFormData({});
    } else setFormData(formData);
  };

  return {
    formData: stateChanged ? formData : getFormStateData(),
    errors,
    isSubmitting,
    stateChanged,
    handleChange,
    handleSubmit,
    reset
  };
};
