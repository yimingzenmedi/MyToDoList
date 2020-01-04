const defaultState = {
    toDoTaskList: [
        {
            title: "todo",
            deadline: '2019-10-12',
            content: "this is a todo demo",
            added: 1470220608537
        }
    ],
    doingTaskList: [
        {
            title: "doing",
            deadline: '2019-10-13',
            content: "this is a doing demo",
            added: 1470220608535
        }
    ],
    doneTaskList: [
        {
            title: "done",
            deadline: '2019-10-14',
            content: "this is a done demo",
            added: 1470220608533,
        }
    ],
};

export default (state = defaultState, action) => {
    return state;
};
