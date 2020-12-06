import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startLogout } from "../../actions/auth";
import { Button } from "primereact/button";
import { VscFeedback } from "react-icons/vsc";
import { FaUserAlt } from "react-icons/fa";

export const Header = ({ user, startLogout }) => {
  return (
    <div className="p-shadow-6 header">
      <div className="header-items">
        <div className="header-items__user-details" title={user.name}>
          <span className="header-items__user-name">
            {user.avatar ? (
              <img src={user.avatar} alt=""></img>
            ) : (
              <FaUserAlt className="header-items__user-image" />
            )}

            {user.name}
          </span>
        </div>

        <div className="header-items__title">
          <Link to="/home">
            <div className="header-items__title-icon">
              <VscFeedback />
            </div>
          </Link>
          REVIEW MANAGEMENT
        </div>

        <Button
          label="SIGN OUT"
          icon="pi pi-sign-out header-items__title-button-icon"
          className="header-items__title-button p-button-secondary p-button-text show-for-desktop"
          iconPos="right"
          onClick={startLogout}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => ({
  startLogout: () => dispatch(startLogout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
