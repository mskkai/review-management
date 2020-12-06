import React from "react";
import { Formik, Field } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { REGISTRATION_CONSTANTS } from "../../utils/app-constants";

const PrimaryDetails = (props) => {
  function validateEmployeeId(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.EMPLOYEEID_REQUIRED;
    }
    return error;
  }

  function validateName(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.NAME_REQUIRED;
    }
    return error;
  }

  function validateEmailId(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.EMAIL_REQUIRED;
    }
    if (!REGISTRATION_CONSTANTS.EMAIL_VALIDATOR.test(value)) {
      error = REGISTRATION_CONSTANTS.EMAIL_INVALID;
    }
    return error;
  }

  function validateGender(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.GENDER_REQUIRED;
    }
    return error;
  }

  function validateAge(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.AGE_REQUIRED;
    }
    if (value < 1) {
      error = REGISTRATION_CONSTANTS.AGE_INVALID;
    }
    return error;
  }

  const getInitialValues = () => {
    if (props.updateFlow) {
      return {
        ...props.initialValues,
        gender:
          props.initialValues && props.initialValues.gender
            ? props.initialValues.gender.toLowerCase()
            : "",
        updateFlow: props.updateFlow,
      };
    } else {
      return {
        ...props.initialValues,
      };
    }
  };

  return (
    <div>
      <Formik
        enableReinitialize
        initialValues={getInitialValues()}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            actions.setSubmitting(false);
            props.onNextSubmit(values);
          }, 300);
        }}
      >
        {(props) => (
          <form onSubmit={props.handleSubmit} className="form-container">
            <Field name="employeeId" validate={validateEmployeeId}>
              {({ field, form }) => (
                <div className="p-field form-field">
                  <label htmlFor="employeeId" className="p-d-block">
                    Employee Id
                  </label>

                  <InputText
                    disabled={props.initialValues.updateFlow}
                    id="employeeId"
                    className={
                      form.errors.employeeId && form.touched.employeeId
                        ? "p-invalid p-d-block"
                        : "p-d-block"
                    }
                    {...field}
                  ></InputText>
                  <small
                    id="employeeId-help"
                    className="p-invalid p-d-block form-field--help"
                  >
                    {form.errors.employeeId && form.touched.employeeId
                      ? form.errors.employeeId
                      : ""}
                  </small>
                </div>
              )}
            </Field>
            <Field
              name="gender"
              validate={validateGender}
              onSubmit={(e) => e.preventDefault()}
              fontSize="1.5rem"
            >
              {({ field, form }) => (
                <div className="p-field form-field">
                  <label htmlFor="gender" className="p-d-block">
                    Gender
                  </label>
                  <span className="p-input-icon-right">
                    <i className="pi pi-chevron-down" />
                    <select
                      {...field}
                      name="gender"
                      id="gender"
                      className={
                        form.errors.gender && form.touched.gender
                          ? "p-invalid p-inputtext"
                          : "p-inputtext"
                      }
                    >
                      <option value=""> - Select Gender -</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="trans">Trans</option>
                    </select>
                  </span>
                  <small
                    id="gender-help"
                    className="p-invalid p-d-block form-field--help"
                  >
                    {form.errors.gender && form.touched.gender
                      ? form.errors.gender
                      : ""}
                  </small>
                </div>
              )}
            </Field>
            <Field name="name" validate={validateName}>
              {({ field, form }) => (
                <div className="p-field form-field">
                  <label htmlFor="name" className="p-d-block">
                    Employee Name
                  </label>
                  <InputText
                    id="name"
                    className={
                      form.errors.name && form.touched.name
                        ? "p-invalid p-d-block"
                        : "p-d-block"
                    }
                    {...field}
                  ></InputText>
                  <small
                    id="name-help"
                    className="p-invalid p-d-block form-field--help"
                  >
                    {form.errors.name && form.touched.name
                      ? form.errors.name
                      : ""}
                  </small>
                </div>
              )}
            </Field>
            <Field name="emailId" validate={validateEmailId}>
              {({ field, form }) => (
                <div className="p-field form-field">
                  <label htmlFor="emailId" className="p-d-block">
                    Email Id
                  </label>
                  <InputText
                    disabled={props.initialValues.updateFlow}
                    id="emailId"
                    className={
                      form.errors.emailId && form.touched.emailId
                        ? "p-invalid p-d-block"
                        : "p-d-block"
                    }
                    {...field}
                  ></InputText>
                  <small
                    id="emailId-help"
                    className="p-invalid p-d-block form-field--help"
                  >
                    {form.errors.emailId && form.touched.emailId
                      ? form.errors.emailId
                      : ""}
                  </small>
                </div>
              )}
            </Field>
            <Field name="age" validate={validateAge}>
              {({ field, form }) => (
                <div className="p-field form-field">
                  <label htmlFor="age" className="p-d-block">
                    Age
                  </label>
                  <InputText
                    id="age"
                    className={
                      form.errors.age && form.touched.age
                        ? "p-invalid p-d-block"
                        : "p-d-block"
                    }
                    {...field}
                    type="number"
                  ></InputText>
                  <small
                    id="age-help"
                    className="p-invalid p-d-block form-field--help"
                  >
                    {form.errors.age && form.touched.age ? form.errors.age : ""}
                  </small>
                </div>
              )}
            </Field>
            <Button
              label="NEXT"
              icon="pi pi-chevron-right"
              iconPos="right"
              className="p-button-secondary registration__button-right"
            />
          </form>
        )}
      </Formik>
    </div>
  );
};

export default PrimaryDetails;
