/* eslint-disable */
const categoryCreateDtoInType = shape({
    name: string(255).isRequired(),
    questions: array()
});

const categoryUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(255),
    questions: array()
});

const categoryListDtoInType = shape({
    
});

const categoryGetDtoInType = shape({
    id: id().isRequired()
});

const categoryDeleteDtoInType = shape({
    id: id().isRequired()
});
