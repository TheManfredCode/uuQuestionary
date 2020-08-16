import UU5 from "uu5g04";
import UuQuestionary from "uu_questionary_maing01-hi";

const { shallow } = UU5.Test.Tools;

describe(`UuQuestionary.Questionary.QuestionaryTemplateReady`, () => {
  it(`default props`, () => {
    const wrapper = shallow(<UuQuestionary.Questionary.QuestionaryTemplateReady />);
    expect(wrapper).toMatchSnapshot();
  });
});
