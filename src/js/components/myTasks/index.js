import React from 'react';
import Header from "../common/header";
import UserInfo from "./userInfo";
import ReturnHomeButton from "../common/returnHomeButton";
import TaskLane from "./taskLane";
import TextField from "@material-ui/core/TextField";

import '../../../css/index.css';
import '../../../css/myTasks.css';
import {confirmAlert} from "react-confirm-alert";
import Button from "@material-ui/core/Button";

class TaskManager extends React.Component {
    handleAdd = () => {
        if (this.props.addTask === undefined) {
            return new Error("addTask should be a function")
        }

            let newTask = {};
        this.props.addTask(newTask);
    };

    clearAllTasks = () => {
        // TODO
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
                                func();
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
                            id="titleInput"
                            label="Title"
                            className="titleInput"
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
                            type="datetime-local"
                            label="Deadline"
                            className="deadlineInput"
                            id="deadlineInput"
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
            toDoTaskList: [],
            doingTaskList: [],
            doneTaskList: [],
        }
    }

    addTaskToToDo = (task) => {
        let taskList = this.state.toDoTaskList;
        taskList.push(task);
        this.setState({
            toDoTaskList: taskList
        })
    };

    addTaskToDoing = (task) => {
        let taskList = this.state.doingTaskList;
        taskList.push(task);
        this.setState({
            doingTaskList: taskList
        })
    };

    addTaskToDone = (task) => {
        let taskList = this.state.doneTaskList;
        taskList.push(task);
        this.setState({
            doneTaskList: taskList
        })
    };

    deleteTaskFromToToDo = (task) => {
        let taskList = this.state.toDoTaskList;
        for(let i=0; i<taskList.length; i++) {
            if (taskList[i] === task) {
                taskList.splice(i, 1);
                break;
            }
        }
        this.setState({
            toDoTaskList: taskList
        })
    };

    deleteTaskFromDoing = (task) => {
        let taskList = this.state.doingTaskList;
        for(let i=0; i<taskList.length; i++) {
            if (taskList[i] === task) {
                taskList.splice(i, 1);
                break;
            }
        }
        this.setState({
            doingTaskList: taskList
        })
    };

    deleteTaskFromDone = (task) => {
        let taskList = this.state.doneTaskList;
        for(let i=0; i<taskList.length; i++) {
            if (taskList[i] === task) {
                taskList.splice(i, 1);
                break;
            }
        }
        this.setState({
            doneTaskList: taskList
        })
    };

    render() {
        return (
            <div>
                <Header
                    leftContent={<ReturnHomeButton/>}
                    rightContent={<UserInfo/>}
                />
                <div id="main">
                    <TaskLane title='To Do' className='todo'/>
                    <TaskLane title='Doing' className='doing'/>
                    <TaskLane title='Done' className='done'/>
                    <TaskManager/>
                </div>
            </div>
        );
    }
}

export default MyTasks;