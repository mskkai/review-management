import React from "react";
import { connect } from "react-redux";
import PrimaryDetails from "./PrimaryDetails";
import AddressDetails from "./AddressDetails";
import CompanyDetails from "./CompanyDetails";
import { PAGE_TITLES } from "../../utils/app-constants";
import { Fieldset } from "primereact/fieldset";
import { TabView, TabPanel } from "primereact/tabview";
import { Steps } from "primereact/steps";
import Employee from "../../models/employee";
import { Dialog } from "primereact/dialog";
import { startAddEmployee, startUpdateEmployee } from "../../actions/employees";

class Registration extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //controls
      basicDetailsDisabled: false,
      addressDetailsDisabled: true,
      companyDetailsDisabled: true,
      visibleTabIndex: 0,
      showRegistrationDialog: props.showRegistrationDialog,
      updateFlow: false,
    };

    if (
      props.updateFlow &&
      props.selectedEmployee &&
      props.selectedEmployee.employeeId !== ""
    ) {
      this.state = { ...this.state, ...props.selectedEmployee };
      this.state.updateFlow = true;
    } else {
      this.state = { ...this.state, ...Employee };
    }
  }

  onBasicDetailsSubmit = (values) => {
    this.setState(() => ({
      //controls
      basicDetailsDisabled: true,
      addressDetailsDisabled: false,
      visibleTabIndex: 1,

      //values
      ...values,
    }));
  };

  onAddressDetailsPrevSubmit = () => {
    this.setState(() => ({
      basicDetailsDisabled: false,
      addressDetailsDisabled: true,
      visibleTabIndex: 0,
    }));
  };

  onAddressDetailsNextSubmit = (values) => {
    this.setState(() => ({
      //controls
      companyDetailsDisabled: false,
      addressDetailsDisabled: true,
      visibleTabIndex: 2,

      //values
      ...values,
    }));
  };

  onCompanyPreviousDetailsSubmit = () => {
    this.setState(() => ({
      addressDetailsDisabled: false,
      companyDetailsDisabled: true,
      visibleTabIndex: 1,
    }));
  };

  onCompanyNextDetailsSubmit = (values) => {
    this.setState(() => ({
      //values
      designation: values.designation,
      department: values.department,
    }));

    let employee = { ...Employee };
    for (let k in employee) {
      if (this.state[k]) employee[k] = this.state[k];
    }

    delete employee._id;
    //ASSUMPTIONS
    employee.password = "welcome123";
    employee.role = "employee";
    if (this.state.updateFlow) {
      this.props
        .startUpdateEmployee({
          ...employee,
        })
        .then(() => {
          setTimeout(() => {
            this.postSubmissionTasks();
          }, 500);
        });
    } else {
      this.props
        .startAddEmployee({
          ...employee,
        })
        .then(() => {
          setTimeout(() => {
            this.postSubmissionTasks();
          }, 500);
        });
    }
  };

  postSubmissionTasks() {
    //Resetting the values
    this.setState(() => ({
      //controls
      basicDetailsDisabled: false,
      companyDetailsDisabled: true,
      visibleTabIndex: 0,

      //values
      ...Employee,
    }));
  }

  items = [{ label: " " }, { label: " " }, { label: " " }];

  render() {
    return (
      <Dialog
        visible={this.state.showRegistrationDialog}
        maximizable
        modal
        onHide={() => {
          this.setState({ showRegistrationDialog: false });
          this.props.udpateRegistrationDialogVisibility();
        }}
      >
        <Fieldset
          legend={PAGE_TITLES.EMPLOYEE_REGISTRATION}
          className="sidebar-container custom-fieldset"
        >
          <Steps
            model={this.items}
            activeIndex={this.state.visibleTabIndex}
            className="registration__progress-bar"
          />
          <TabView
            className="registration__tab-view"
            activeIndex={this.state.visibleTabIndex}
            onTabChange={(e) => this.setState({ visibleTabIndex: e.index })}
          >
            <TabPanel
              header="BASIC DETAILS"
              leftIcon="pi pi-user"
              disabled={this.state.basicDetailsDisabled}
            >
              <PrimaryDetails
                initialValues={{
                  employeeId: this.state.employeeId,
                  name: this.state.name,
                  gender: this.state.gender,
                  age: this.state.age,
                  emailId: this.state.emailId,
                }}
                updateFlow={this.state.updateFlow}
                onNextSubmit={this.onBasicDetailsSubmit}
              />
            </TabPanel>
            <TabPanel
              header="ADDRESS DETAILS"
              leftIcon="pi pi-bell"
              disabled={this.state.addressDetailsDisabled}
            >
              <AddressDetails
                initialValues={{
                  addressLine1: this.state.addressLine1,
                  addressLine2: this.state.addressLine2,
                  city: this.state.city,
                  state: this.state.state,
                  country: this.state.country,
                  zipcode: this.state.zipcode,
                }}
                onPrevSubmit={this.onAddressDetailsPrevSubmit}
                onNextSubmit={this.onAddressDetailsNextSubmit}
              />
            </TabPanel>
            <TabPanel
              header="COMPANY SPECIFIC DETAILS"
              leftIcon="pi pi-cog"
              disabled={this.state.companyDetailsDisabled}
            >
              <CompanyDetails
                initialValues={{
                  designation: this.state.designation,
                  department: this.state.department,
                }}
                onPrevSubmit={this.onCompanyPreviousDetailsSubmit}
                onNextSubmit={this.onCompanyNextDetailsSubmit}
              />
            </TabPanel>
          </TabView>
        </Fieldset>
      </Dialog>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  startAddEmployee: (data) => dispatch(startAddEmployee(data)),
  startUpdateEmployee: (data) => dispatch(startUpdateEmployee(data)),
});

export default connect(null, mapDispatchToProps)(Registration);
