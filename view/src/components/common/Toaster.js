import React from "react";
import { Toast } from "primereact/toast";
import { connect } from "react-redux";
import { clearMessage } from "../../actions/message";

export class Toaster extends React.Component {
  componentDidUpdate() {
    if (this.props.message && this.props.message.severity !== "") {
      this.toast.show({
        severity: this.props.message.severity,
        summary: this.props.message.summary,
        detail: this.props.message.detail,
        life: 5000,
      });
      setTimeout(() => {
        this.props.clearMessage();
      }, 5000);
    }
  }

  render() {
    return <Toast ref={(el) => (this.toast = el)} position="top-right" />;
  }
}

const mapStateToProps = (state) => {
  return {
    message: state.message,
  };
};

const mapDispatchToProps = (dispatch) => ({
  clearMessage: () => dispatch(clearMessage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Toaster);
