import React from "react";
import { Carousel } from "primereact/carousel";
import { Button } from "primereact/button";
import { BsFillPersonLinesFill, BsEnvelopeOpenFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ROUTE_CONSTANTS } from "../../utils/app-constants";

export class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [
        {
          name: "Employee Management",
          img: <BsFillPersonLinesFill />,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudianda",
          route: ROUTE_CONSTANTS.VIEW_EMPLOYEES,
        },
        {
          name: "Review Management",
          img: <BsEnvelopeOpenFill />,
          description:
            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudianda",
          route: ROUTE_CONSTANTS.REGISTER_EMPLOYEE,
        },
      ],
    };

    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "600px",
        numVisible: 2,
        numScroll: 2,
      },
      {
        breakpoint: "480px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
    this.homeDashboardTemplate = this.homeDashboardTemplate.bind(this);
  }

  homeDashboardTemplate(item) {
    return (
      <div className="home__carousal-item">
        <div className="home__carousal-item-content">
          <div className="p-mb-3 home__carousal-item-image">{item.img}</div>
          <div>
            <h4 className="p-mb-1">
              <Link to={item.route} className="home__carousal-item-link">
                <Button
                  label={item.name}
                  className="home__carousal-item-button-text p-button-primary p-button-text p-button-lg"
                />
              </Link>
            </h4>
            <p className="p-m-0 home__carousal-item-text">{item.description}</p>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className="home__carousel p-mt-5">
        <div className="card">
          <Carousel
            value={this.state.items}
            numVisible={2}
            responsiveOptions={this.responsiveOptions}
            className="custom-carousel"
            itemTemplate={this.homeDashboardTemplate}
            header={
              <h1 className="home__carousal-item-header">Admin Dashboard</h1>
            }
          />
        </div>
      </div>
    );
  }
}

export default Home;
