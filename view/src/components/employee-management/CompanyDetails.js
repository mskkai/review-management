import React from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Formik, Field } from "formik";
import { REGISTRATION_CONSTANTS } from "../../utils/app-constants";

const CompanyDetails = (props) => {
  function validateDesignation(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.DESIGNATION_REQUIRED;
    }
    return error;
  }

  function validateDepartment(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.DEPARTMENT_REQUIRED;
    }
    return error;
  }

  const previousSubmitHandler = (e) => {
    e.preventDefault();
    props.onPrevSubmit();
  };

  return (
    <Formik
      enableReinitialize
      initialValues={props.initialValues}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          //alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
          props.onNextSubmit(values);
        }, 800);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="form-container">
          <Field name="department" validate={validateDepartment}>
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="department" className="p-d-block">
                  Department
                </label>
                <InputText
                  id="department"
                  className={
                    form.errors.department && form.touched.department
                      ? "p-invalid p-d-block"
                      : "p-d-block"
                  }
                  {...field}
                ></InputText>
                <small
                  id="department-help"
                  className="p-invalid p-d-block form-field--help"
                >
                  {form.errors.department && form.touched.department
                    ? form.errors.department
                    : ""}
                </small>
              </div>
            )}
          </Field>
          <Field name="designation" validate={validateDesignation}>
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="designation" className="p-d-block">
                  Designation
                </label>
                <InputText
                  id="designation"
                  className={
                    form.errors.designation && form.touched.designation
                      ? "p-invalid p-d-block"
                      : "p-d-block"
                  }
                  {...field}
                ></InputText>
                <small
                  id="designation-help"
                  className="p-invalid p-d-block form-field--help"
                >
                  {form.errors.designation && form.touched.designation
                    ? form.errors.designation
                    : ""}
                </small>
              </div>
            )}
          </Field>
          <Button
            label="PREVIOUS"
            icon="pi pi-chevron-left"
            iconPos="left"
            onClick={(e) => {
              previousSubmitHandler(e);
            }}
            className="p-button-secondary registration__button-left"
          />
          <Button
            label="SUBMIT"
            icon="pi pi-check"
            iconPos="right"
            className="p-button-primary registration__button-right"
            type="submit"
          />
        </form>
      )}
    </Formik>
  );
};

export default CompanyDetails;
