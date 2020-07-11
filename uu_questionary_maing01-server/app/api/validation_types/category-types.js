/* eslint-disable */
const categoryCreateDtoInType = shape({
    name: string(255).isRequired(),
    questions: array(shape({
        name: string(255),
        answers: array()
    }))
});

const categoryUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    questions: array()
});

const categoryListDtoInType = shape({
    
});

const categoryAddQuestionDtoInType = shape({
    id: id().isRequired(),
    questions: shape({
        name: string(255),
        answers: array()
    })
});

const categoryGetDtoInType = shape({
    id: id().isRequired()
});

const categoryDeleteDtoInType = shape({
    id: id().isRequired()
});
