/* eslint-disable */
const questionaryCreateDtoInType = shape({
    name: string(255).isRequired(),
    questions: array(id())
});

const questionaryUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    questions: array()
});

const questionaryListDtoInType = shape({
    
});

const questionaryGetDtoInType = shape({
    id: id().isRequired()
});

const questionaryDeleteDtoInType = shape({
    id: id().isRequired()
});