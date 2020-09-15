/* eslint-disable */
const questionaryCreateDtoInType = shape({
    name: string(255).isRequired(),
    questions: array(shape({
        name: string(),
        answers: array(),
        own: boolean()
    }))
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