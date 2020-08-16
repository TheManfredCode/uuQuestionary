/* eslint-disable */
const answerCreateDtoInType = shape ({
    questionaryId: id().isRequired(),
    answers: shape(),
    name: string(255),
    uuId: string(50)
});

const answerListDtoInType = shape ({

});

const answerGetDtoInType = shape ({
    id: id().isRequired()
});

const answerDeleteDtoInType = shape ({
    id: id().isRequired()
});

const answerUpdateDtoInType = shape ({
    id: id().isRequired(),
    completed: boolean(),
    answers: shape(),
    name: string(255),
    uuId: string(50)
});