import React from "react";
import { Fieldset } from "primereact/fieldset";
import { connect } from "react-redux";
import { loadEmployees, startDeleteEmployee } from "../../actions/employees";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { MultiSelect } from "primereact/multiselect";
import { PAGE_TITLES, ROUTE_CONSTANTS } from "../../utils/app-constants";
import ProgressLoader from "../common/Progress-loader";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import Registration from "../employee-management/Registration";
import Toaster from "../common/Toaster";
import { Dialog } from "primereact/dialog";
import Employee from "../../models/employee";
//import { FileUpload } from "primereact/fileupload";

class EmployeesReporting extends React.Component {
  constructor(props) {
    super(props);

    this.columnDefs = [...this.prepareColumnDefs()];

    this.state = {
      isLoading: true,
      rowData: [],
      inputFile: "",
      selectedColumns: this.columnDefs ? this.columnDefs.slice(0, 5) : [],
      showRegistrationDialog: false,
      selectedEmployee: null,
      deleteEmployeeDialog: false,
      updateFlow: false,
    };
    this.onColumnToggle = this.onColumnToggle.bind(this);
    this.exportCSV = this.exportCSV.bind(this);
    this.udpateRegistrationDialogVisibility = this.udpateRegistrationDialogVisibility.bind(
      this
    );

    this.editEmployee = this.editEmployee.bind(this);
    this.confirmDeleteEmployee = this.confirmDeleteEmployee.bind(this);
    this.hideDeleteEmployeeDialog = this.hideDeleteEmployeeDialog.bind(this);
    this.deleteEmployee = this.deleteEmployee.bind(this);
  }

  prepareColumnDefs() {
    const employeeModel = { ...Employee };
    const keys = Object.keys(employeeModel);
    let columnHeaders = [];
    keys.forEach((key) => {
      if (key !== "password" && key !== "_id") {
        let columnHeader = {};
        columnHeader.header = key.toUpperCase();
        columnHeader.field = key;
        columnHeaders.push(columnHeader);
      }
    });
    return columnHeaders;
  }

  componentDidMount() {
    const fetchData = async () => {
      await this.props.loadEmployees();
    };
    if (this.state.isLoading) {
      fetchData();
    }
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.employees.length > 0 &&
      (this.props.employees.length !== prevProps.employees.length ||
        this.state.rowData.length !== this.props.employees.length ||
        JSON.stringify({ a: prevProps.employees }) !==
          JSON.stringify({ a: this.props.employees }))
    ) {
      let rowDetails = [];
      this.udpateRegistrationDialogVisibility(false);
      this.props.employees.forEach((data) => {
        let row = {};
        if (data._id) {
          this.columnDefs.forEach((column) => {
            row = {
              ...row,
              [column.field]: data[column.field]
                ? data[column.field].toString().toUpperCase()
                : "",
            };
          });
        }
        rowDetails.push(row);
      });

      this.setState(() => ({
        rowData: [...rowDetails],
        updateFlow: false,
        isLoading: false,
      }));
    }
  }

  onColumnToggle(event) {
    let selectedColumns = event.value;
    let orderedSelectedColumns = this.columnDefs.filter((col) =>
      selectedColumns.some((sCol) => sCol.field === col.field)
    );
    this.setState({ selectedColumns: orderedSelectedColumns });
  }

  exportCSV() {
    this.dt.exportCSV();
  }

  editEmployee(rowData) {
    this.setState(() => ({
      selectedEmployee: { ...rowData },
      updateFlow: true,
    }));
    this.udpateRegistrationDialogVisibility(true);
  }

  addEmployee() {
    this.setState(() => ({
      selectedEmployee: null,
      updateFlow: false,
    }));
    this.udpateRegistrationDialogVisibility(true);
  }

  deleteEmployee() {
    this.props.startDeleteEmployee(this.state.employeeToDelete).then(() => {
      this.setState({
        employeeToDelete: null,
        deleteEmployeeDialog: false,
      });
    });
  }

  confirmDeleteEmployee(rowData) {
    this.setState({
      employeeToDelete: { ...rowData },
      deleteEmployeeDialog: true,
    });
  }

  actionBodyTemplate(rowData) {
    return (
      <React.Fragment>
        <Button
          icon="pi pi-pencil"
          className="p-button-rounded p-button-success p-mr-2"
          onClick={() => this.editEmployee(rowData)}
        />
        <Button
          icon="pi pi-trash"
          className="p-button-rounded p-button-warning"
          onClick={() => this.confirmDeleteEmployee(rowData)}
        />
      </React.Fragment>
    );
  }

  hideDeleteEmployeeDialog() {
    this.setState({ employeeToDelete: null, deleteEmployeeDialog: false });
  }

  udpateRegistrationDialogVisibility(value) {
    this.setState(() => ({ showRegistrationDialog: value }));
  }

  render() {
    const deleteEmployeeFooter = (
      <React.Fragment>
        <Button
          label="No"
          icon="pi pi-times"
          className="p-button-lg"
          onClick={this.hideDeleteEmployeeDialog}
        />
        <Button
          label="Yes"
          icon="pi pi-check"
          className="p-button-lg"
          onClick={this.deleteEmployee}
        />
      </React.Fragment>
    );
    const header = (
      <div className="report-header">
        {/* <FileUpload
          mode="basic"
          accept="image/*"
          maxFileSize={1000000}
          label="Import"
          chooseLabel="Import"
          className="p-mr-2 p-d-inline-block"
        /> */}
        <Button
          type="button"
          label="Add Employee"
          onClick={() => {
            this.addEmployee();
          }}
          icon="pi pi-upload"
          className="p-button-help p-button-lg report-header__button"
        ></Button>
        <MultiSelect
          value={this.state.selectedColumns}
          options={this.columnDefs}
          optionLabel="header"
          onChange={this.onColumnToggle}
          className="report-header__multi-select"
        />
        <Button
          type="button"
          label="Export"
          onClick={this.exportCSV}
          icon="pi pi-upload"
          className="p-button-help p-button-lg report-header__button"
        ></Button>
      </div>
    );

    const dynamicColumns = this.state.selectedColumns.map((col, i) => {
      return (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          sortable
          filter
          filterPlaceholder={`SEARCH BY ${col.header}`}
        />
      );
    });

    return (
      <>
        <Fieldset
          legend={PAGE_TITLES.EMPLOYEES_REPORTING}
          className="field-container custom-fieldset"
        >
          <div className="report__nav-header">
            <Link to={ROUTE_CONSTANTS.HOME} className="report__button-link">
              <Button
                label="Back to Home"
                icon="pi pi-backward"
                className="p-button-rounded p-button-secondary"
              />
            </Link>
          </div>
          {this.state.isLoading ? (
            <ProgressLoader></ProgressLoader>
          ) : (
            <div>
              <div className="datatable-responsive">
                <div className="card">
                  <DataTable
                    value={this.state.rowData}
                    paginator
                    scrollable
                    removableSort
                    sortField="employeeId"
                    rows={10}
                    scrollHeight="225px"
                    resizableColumns
                    columnResizeMode="expand"
                    style={{ width: "1280px" }}
                    className="datatable-responsive p-datatable-striped p-datatable-gridlines"
                    header={header}
                    paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                    rowsPerPageOptions={[10, 20, 50]}
                    ref={(el) => {
                      this.dt = el;
                    }}
                    selectionMode="single"
                    dataKey="employeeId"
                  >
                    {dynamicColumns}
                    <Column body={this.actionBodyTemplate.bind(this)}></Column>
                  </DataTable>
                </div>
              </div>
            </div>
          )}
        </Fieldset>

        <Toaster />
        {this.state.showRegistrationDialog ? (
          <Registration
            showRegistrationDialog={this.state.showRegistrationDialog}
            udpateRegistrationDialogVisibility={
              this.udpateRegistrationDialogVisibility
            }
            selectedEmployee={this.state.selectedEmployee}
            updateFlow={this.state.updateFlow}
          />
        ) : (
          ""
        )}

        <Dialog
          visible={this.state.deleteEmployeeDialog}
          style={{ width: "450px" }}
          modal
          footer={deleteEmployeeFooter}
          onHide={this.hideDeleteEmployeeDialog.bind(this)}
        >
          <div className="report-body__dialog-icon">
            <Button
              icon="pi pi-exclamation-triangle "
              className="p-button-rounded p-button-danger p-mr-3"
            />
            {this.state.employeeToDelete && (
              <span>
                Are you sure you want to delete{" "}
                <b>{this.state.employeeToDelete.name}</b>?
              </span>
            )}
          </div>
        </Dialog>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    employees: state.employees,
  };
};

const mapDispatchToProps = (dispatch) => ({
  loadEmployees: () => dispatch(loadEmployees()),
  startDeleteEmployee: (employee) => dispatch(startDeleteEmployee(employee)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmployeesReporting);
