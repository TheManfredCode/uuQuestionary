import UU5 from "uu5g04";
import UuQuestionary from "uu_questionary_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuQuestionary.Category.CategoryReady`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuQuestionary.Category.CategoryReady />);
    expect(wrapper).toMatchSnapshot();
  });
});
