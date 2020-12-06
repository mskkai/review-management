import React from "react";
import { shallow } from "enzyme";
import Loader from "../../components/common/loader";

test("should correctly render loading page", () => {
  const wrapper = shallow(<Loader />);
  expect(wrapper).toMatchSnapshot();
});
