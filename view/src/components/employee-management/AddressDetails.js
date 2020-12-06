import React from "react";
import { Formik, Field } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { REGISTRATION_CONSTANTS } from "../../utils/app-constants";

const AddressDetails = (props) => {
  function validateAddressLine1(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.ADDRESS_REQUIRED;
    }
    return error;
  }

  function validateCity(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.CITY_REQUIRED;
    }
    return error;
  }

  function validateState(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.STATE_REQUIRED;
    }
    return error;
  }

  function validateCountry(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.COUNTRY_REQUIRED;
    }
    return error;
  }

  function validateZipcode(value) {
    let error;
    if (!value) {
      error = REGISTRATION_CONSTANTS.ZIPCODE_REQUIRED;
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
        }, 300);
      }}
    >
      {(props) => (
        <form onSubmit={props.handleSubmit} className="form-container">
          <Field name="addressLine1" validate={validateAddressLine1}>
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="addressLine1" className="p-d-block">
                  Address Line 1
                </label>
                <InputText
                  id="addressLine1"
                  className={
                    form.errors.addressLine1 && form.touched.addressLine1
                      ? "p-invalid p-d-block"
                      : "p-d-block"
                  }
                  {...field}
                ></InputText>
                <small
                  id="addressLine1-help"
                  className="p-invalid p-d-block form-field--help"
                >
                  {form.errors.addressLine1 && form.touched.addressLine1
                    ? form.errors.addressLine1
                    : ""}
                </small>
              </div>
            )}
          </Field>
          <Field name="addressLine2" fontSize="1.5rem">
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="addressLine2" className="p-d-block">
                  Address Line 2
                </label>
                <InputText id="addressLine2" {...field}></InputText>
              </div>
            )}
          </Field>
          <Field name="city" validate={validateCity}>
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="city" className="p-d-block">
                  City
                </label>
                <InputText
                  id="city"
                  className={
                    form.errors.city && form.touched.city
                      ? "p-invalid p-d-block"
                      : "p-d-block"
                  }
                  {...field}
                ></InputText>
                <small
                  id="city-help"
                  className="p-invalid p-d-block form-field--help"
                >
                  {form.errors.city && form.touched.city
                    ? form.errors.city
                    : ""}
                </small>
              </div>
            )}
          </Field>
          <Field name="state" validate={validateState}>
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="state" className="p-d-block">
                  State
                </label>
                <InputText
                  id="state"
                  className={
                    form.errors.state && form.touched.state
                      ? "p-invalid p-d-block"
                      : "p-d-block"
                  }
                  {...field}
                ></InputText>
                <small
                  id="state-help"
                  className="p-invalid p-d-block form-field--help"
                >
                  {form.errors.state && form.touched.state
                    ? form.errors.state
                    : ""}
                </small>
              </div>
            )}
          </Field>
          <Field name="country" validate={validateCountry}>
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="country" className="p-d-block">
                  Country
                </label>
                <InputText
                  id="country"
                  className={
                    form.errors.country && form.touched.country
                      ? "p-invalid p-d-block"
                      : "p-d-block"
                  }
                  {...field}
                ></InputText>
                <small
                  id="country-help"
                  className="p-invalid p-d-block form-field--help"
                >
                  {form.errors.country && form.touched.country
                    ? form.errors.country
                    : ""}
                </small>
              </div>
            )}
          </Field>
          <Field name="zipcode" validate={validateZipcode}>
            {({ field, form }) => (
              <div className="p-field form-field">
                <label htmlFor="zipcode" className="p-d-block">
                  Zip Code
                </label>
                <InputText
                  id="zipcode"
                  className={
                    form.errors.zipcode && form.touched.zipcode
                      ? "p-invalid p-d-block"
                      : "p-d-block"
                  }
                  {...field}
                  type="number"
                ></InputText>
                <small
                  id="zipcode-help"
                  className="p-invalid p-d-block form-field--help"
                >
                  {form.errors.zipcode && form.touched.zipcode
                    ? form.errors.zipcode
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
            label="NEXT"
            icon="pi pi-chevron-right"
            iconPos="right"
            className="p-button-secondary registration__button-right"
          />
        </form>
      )}
    </Formik>
  );
};

export default AddressDetails;
