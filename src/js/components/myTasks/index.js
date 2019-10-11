import React from 'react';
import Header from "../common/header";
import UserInfo from "./userInfo";
import ReturnHomeButton from "../common/returnHomeButton";
import TaskLane from "./taskLane";
import TextField from "@material-ui/core/TextField";
import {confirmAlert} from "react-confirm-alert";
import Button from "@material-ui/core/Button";

import '../../../css/index.css';
import '../../../css/myTasks.css';

class TaskManager extends React.Component {
    showAlert = (title, content) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='userInfoConfirm'>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <Button
                            onClick={() => {
                                onClose();
                            }}
                            className='confirmButton'
                            color="primary"
                        >
                            OK
                        </Button>
                    </div>
                );
            }
        });
    };

    showConfirmAlert = (title, content, func) => {
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='userInfoConfirm'>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <Button
                            onClick={() => {
                                onClose();
                                if(typeof func === "function") {
                                    func();
                                }
                            }}
                            className='confirmButton'
                            color="primary"
                        >
                            Confirm
                        </Button>
                        <Button
                            onClick={onClose}
                            className="cancelButton"
                            color="secondary"
                        >
                            Cancel
                        </Button>
                    </div>
                );
            }
        });
    };

    handleAdd = () => {
        if (typeof this.props.addTask !== 'function') {
            throw new Error('props "addTask" is not a function!');
        }

        const title = document.getElementById("titleInput").value;
        const deadline = document.getElementById("deadlineInput").value;
        const content = document.getElementById("contentInput").value;
        if (title === "" || deadline === "" || content === "") {
            const title = "Error";
            const content = "All the blanks should be filled.";
            this.showAlert(title, content);
        } else {
            let newTask = {
                title: title,
                deadline: deadline,
                content: content,
            };
            this.props.addTask(newTask);
            document.getElementById("taskAdder").reset();
        }
    };

    clearAllTasks = () => {
        this.props.clearAllTasks();
    };

    handleClearAll = () => {
        const title = "Caution";
        const content = "Are you sure you want to clear all tasks? This operation cannot be undone."
        this.showConfirmAlert(title, content, this.clearAllTasks)
    };

    render() {
        return (
            <div className="taskManager taskLane">
                <h2 className="laneTitle">Task Manager</h2>
                <form id="taskAdder">
                    <fieldset>
                        <legend>Add new task</legend>
                        <TextField
                            required
                            ref="titleInput"
                            id="titleInput"
                            className="titleInput"
                            label="Title"
                            variant="outlined"
                            placeholder="Title"
                            style={{
                                width: "100%",
                                margin: '20px 0 0 0',
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <TextField
                            required
                            type="date"
                            label="Deadline"
                            className="deadlineInput"
                            id="deadlineInput"
                            ref="deadlineInput"
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            style={{
                                width: "100%",
                                margin: '20px 0 0 0',
                            }}
                        />
                        <TextField
                            required
                            multiline
                            id="contentInput"
                            className="contentInput"
                            ref="contentInput"
                            label="Content"
                            placeholder="Content"
                            variant="outlined"
                            style={{
                                width: "100%",
                                margin: '20px 0 10px 0',
                            }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <input
                            type="button"
                            value='Add'
                            className="adderButtons"
                            onClick={this.handleAdd}
                        />
                        <input
                            type="reset"
                            className="adderButtons"
                            value="Reset"
                        />
                    </fieldset>
                </form>
                <button id="clearAllTasks" onClick={this.handleClearAll}>Clear All Tasks</button>
            </div>
        );
    }

}

class MyTasks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            toDoTaskList: [
                {
                    title: "todo",
                    deadline: '2019-10-13',
                    content: "this is a demo"
                }
            ],
            doingTaskList: [
                {
                    title: "doing",
                    deadline: '2019-10-13',
                    content: "this is a demo"
                }
            ],
            doneTaskList: [{
                title: "done",
                deadline: '2019-10-13',
                content: "this is a demo"
            }],
        }
    }

    clearAllTasks = () => {
        this.setState(() => ({
            toDoTaskList: [],
            doingTaskList: [],
            doneTaskList: [],
        }));
    };

    addTaskToToDo = (task) => {
        let taskList = this.state.toDoTaskList;
        taskList.push(task);
        this.setState(() => ({
            toDoTaskList: taskList
        }));
    };

    addTaskToDoing = (task) => {
        let taskList = this.state.doingTaskList;
        taskList.push(task);
        this.setState(() => ({
            doingTaskList: taskList
        }));
    };

    addTaskToDone = (task) => {
        let taskList = this.state.doneTaskList;
        taskList.push(task);
        this.setState(() => ({
            doneTaskList: taskList
        }));
    };

    deleteTaskFrom = (task, listType) => {
        let taskList;
        if (listType === "todo") {
            taskList = this.state.toDoTaskList;
        } else if (listType === "doing") {
            taskList = this.state.doingTaskList;
        } else if (listType === "done") {
            taskList = this.state.doneTaskList;
        } else {
            throw new Error("Error! Invalid listType! (Should be 'todo', 'doing' or 'done'");
        }
        for(let i=0; i<taskList.length; i++) {
            if (taskList[i] === task) {
                taskList.splice(i, 1);
                console.log("delete");
                break;
            }
        }
        this.setState(() => ({
            doneTaskList: taskList
        }));
    };

    render() {
        return (
            <div>
                <Header
                    leftContent={<ReturnHomeButton/>}
                    rightContent={<UserInfo/>}
                />
                <div id="main">
                    <TaskLane
                        title='To Do'
                        className='todo'
                        type='todo'
                        taskList={this.state.toDoTaskList}
                        addToNextStage={this.addTaskToDoing}
                        deleteTask={this.deleteTaskFrom}
                    />
                    <TaskLane
                        title='Doing'
                        className='doing'
                        type='doing'
                        taskList={this.state.doingTaskList}
                        addToNextStage={this.addTaskToDone}
                        addToPreviousStage={this.addTaskToToDo}
                        deleteTask={this.deleteTaskFrom}
                    />
                    <TaskLane
                        title='Done'
                        className='done'
                        type='done'
                        taskList={this.state.doneTaskList}
                        addToPreviousStage={this.addTaskToDoing}
                        deleteTask={this.deleteTaskFrom}
                    />
                    <TaskManager addTask={this.addTaskToToDo} clearAllTasks={this.clearAllTasks} />
                </div>
            </div>
        );
    }
}

export default MyTasks;