/* eslint-disable */
const questionCreateDtoInType = shape({
    name: string(500).isRequired(),
    categoryId: id(),
    answers: array(string(500))
});

const questionUpdateDtoInType = shape({
    id: id().isRequired(),
    name: string(500).isRequired(),
    answers: array(string(500))
});

const questionListDtoInType = shape({
    categoryId: id(),
    sortBy: string(50) 
});

const questionGetDtoInType = shape({
    id: id().isRequired()
});

const questionDeleteDtoInType = shape({
    id: id().isRequired()
});
