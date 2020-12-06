import React from "react";
import { connect } from "react-redux";
import { startLogin } from "../../actions/auth";
import { RiLoginCircleLine } from "react-icons/ri";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Formik, Field } from "formik";
import { LOGIN_CONSTANTS } from "../../utils/app-constants";
import Toaster from "../common/Toaster";

export class Login extends React.Component {
  credentials = {
    emailId: "",
    password: "",
  };

  componentDidUpdate() {
    this.credentials = {
      emailId: "",
      password: "",
    };
  }

  startLogin = (values) => {
    this.props.user.emailId = values.emailId;
    this.props.user.password = values.password;
    this.props.startLogin(this.props.user);
  };

  validateEmail = (value) => {
    let error;
    if (!value) {
      error = LOGIN_CONSTANTS.EMAIL_REQUIRED;
    }
    if (!LOGIN_CONSTANTS.EMAIL_VALIDATOR.test(value)) {
      error = LOGIN_CONSTANTS.EMAIL_INVALID;
    }

    return error;
  };

  validatePassword = (value) => {
    let error;
    if (!value) {
      error = LOGIN_CONSTANTS.PASSWORD_REQUIRED;
    }
    if (value && value.length <= 3) {
      error = LOGIN_CONSTANTS.PASSWORD_INVALID;
    }
    return error;
  };

  render() {
    return (
      <div className="box-container">
        <div className="box-container__item p-shadow-12">
          <div className="box-container__header">
            {LOGIN_CONSTANTS.LOGIN_HEADER}
          </div>
          <div className="box-container__sub-header">
            {LOGIN_CONSTANTS.LOGIN_SUB_HEAER}
          </div>

          <Formik
            enableReinitialize
            initialValues={this.credentials}
            onSubmit={(values, actions) => {
              setTimeout(() => {
                this.startLogin(values);
              }, 800);
            }}
          >
            {(props) => (
              <form
                onSubmit={props.handleSubmit}
                className="form-single-container"
              >
                <Field name="emailId" validate={this.validateEmail}>
                  {({ field, form }) => (
                    <div className="p-field form-field">
                      <InputText
                        id="emailId"
                        className={
                          form.errors.emailId && form.touched.emailId
                            ? "p-invalid p-d-block"
                            : "p-d-block"
                        }
                        placeholder="Email Id"
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
                <Field name="password" validate={this.validatePassword}>
                  {({ field, form }) => (
                    <div className="p-field form-field">
                      <InputText
                        id="password"
                        className={
                          form.errors.password && form.touched.password
                            ? "p-invalid p-d-block"
                            : "p-d-block"
                        }
                        placeholder="Password"
                        {...field}
                      ></InputText>
                      <small
                        id="password-help"
                        className="p-invalid p-d-block form-field--help"
                      >
                        {form.errors.password && form.touched.password
                          ? form.errors.password
                          : ""}
                      </small>
                    </div>
                  )}
                </Field>
                <Button
                  label="Sign In"
                  className="p-shadow-6 p-button-lg"
                  type="submit"
                >
                  <RiLoginCircleLine className="box-container__button-icon" />
                </Button>
              </form>
            )}
          </Formik>
        </div>
        <Toaster />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch) => ({
  startLogin: (values) => dispatch(startLogin(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
