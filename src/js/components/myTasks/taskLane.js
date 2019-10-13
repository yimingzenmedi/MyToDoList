import React from 'react';
import HiddenToolsImg from "../../../img/hiddenMenu.png";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NextButton from "../../../img/next.png";
import PreviousButton from "../../../img/previous.png";
import DeleteButton from "../../../img/trashcan.png";

import "../../../css/taskLane.css";
import {confirmAlert} from "react-confirm-alert";
import Button from "@material-ui/core/Button";

class ToolsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.listType = this.props.listType;
        this.state = {
            showMenu: "none",
            sortBy: 0,
            startTime: '',
            endTime: '',
        }
    };

    handleStartTimeChange = (event) => {
        let newStartTime = event.target.value;
        this.setState(() => ({
            startTime: newStartTime
        }));
        this.props.changeFilterTime(newStartTime, this.state.endTime);
    };

    handleEndTimeChange = (event) => {
        let newEndTime = event.target.value;
        this.setState(() => ({
            endTime: newEndTime
        }));
        this.props.changeFilterTime(this.state.startTime, newEndTime);
    };

    handleSortByChange = (event) => {
        let newSortBy = event.target.value;
        this.setState({
            sortBy: newSortBy
        });
        this.props.changeSortBy(newSortBy);
    };

    handleMenuButtonClick = () => {
        const currentShowMenu = this.state.showMenu;
        if (currentShowMenu === "none") {
            this.setState({
                showMenu: "block"
            })
        } else {
            this.setState({
                showMenu: "none"
            })
        }
    };

    render() {
        return (
            <div className="hiddenTools">
                <img
                    src={HiddenToolsImg}
                    alt="hidden tools"
                    className="hiddenMenuButton"
                    onClick={this.handleMenuButtonClick}
                />
                <div className="menu" style={{display: this.state.showMenu}}>
                    <div className="tools">
                        <div className="divider">
                            <p className="menuItemLabel">Due time:</p>
                            <div className="subControllers">
                                <TextField
                                    type="date"
                                    label="start from"
                                    className="dueTimeStart"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleStartTimeChange}
                                />
                                <TextField
                                    type="date"
                                    label="until"
                                    className="dueTimeEnd"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleEndTimeChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="divider">
                        <p className="menuItemLabel">Sort by:</p>
                        <div className="subControllers">
                            <Select
                                ref="sortBy"
                                onChange={this.handleSortByChange}
                                name="age"
                                className='sortBySelector'
                                value={this.state.sortBy}
                            >
                                <MenuItem value={0}>Latest Added</MenuItem>
                                <MenuItem value={1}>Earliest Added</MenuItem>
                                <MenuItem value={2}>Latest deadline</MenuItem>
                                <MenuItem value={3}>Earliest deadline</MenuItem>
                                <MenuItem value={4}>Title Z - A</MenuItem>
                                <MenuItem value={5}>Title A - Z</MenuItem>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.obj = this.props.obj;
        this.type = this.props.type;
    }

    componentWillReceiveProps = (nextProps) => {
        this.obj = nextProps.obj;
        this.type = nextProps.type;
    };

    handleNextButtonClick = () => {
        this.props.moveToNextStage(this.obj);
    };

    handlePreviousButtonClick = () => {
        this.props.moveToPreviousStage(this.obj);
    };

    showConfirmAlert = (title, content, func) => {
    };

    handleDeleteButtonClick = () => {
        const title = "Caution";
        const content = "Are you sure you want to delete this task? This cannot be cancelled.";
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='userInfoConfirm'>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <Button
                            onClick={() => {
                                this.props.deleteTask(this.obj);
                                onClose();
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

    replaceLineBreak = (text) => {
        let pList = [];
        let subStringList = text.split("\n");
        for (let i = 0; i < subStringList.length; i++) {
            pList.push(
                <p key={i}>
                    {subStringList[i]}
                </p>
            )
        }
        return pList;
    };

    renderButtons = () => {
        const nextButton = (<img
            src={NextButton}
            alt="move to the next stage"
            className="nextStateButton"
            key="nextButton"
            onClick={this.handleNextButtonClick}
        />);
        const previousButton = (<img
            src={PreviousButton}
            alt="move to the previous stage"
            className="previousStateButton"
            key="previousButton"
            onClick={this.handlePreviousButtonClick}
        />);
        if (this.type === 'todo') {
            return nextButton;
        } else if (this.type === 'doing') {
            return [nextButton, previousButton];
        } else if (this.type === 'done') {
            return previousButton;
        }
        throw new Error("Error! Incorrect task type!");
    };

    render() {
        return (
            <div className="task">
                <p className="taskTitle items">
                    {this.obj.title}
                </p>
                <p className="taskDeadline items">
                    {this.obj.deadline}
                </p>
                <hr/>
                <div className="taskContent items">
                    {this.replaceLineBreak(this.obj.content)}
                </div>
                <div className="taskButtons">
                    <img
                        src={DeleteButton}
                        alt="delete task"
                        className="deleteTaskButton"
                        onClick={this.handleDeleteButtonClick}
                    />
                    {this.renderButtons()}
                </div>
            </div>
        );
    }
}

class TaskLane extends React.Component {
    constructor(props) {
        super(props);
        this.title = this.props.title;
        this.type = this.props.type;
        this.state = {
            taskList: this.props.taskList,
            sortBy: 5,
            startTime: "",
            endTime: "",
        };
    }

    componentWillReceiveProps = (nextProps) => {
        this.setState(() => ({
            taskList: nextProps.taskList,
        }));
    };

    addTask = (task) => {
        this.props.addTask(task);
    };

    moveToNextStage = (task) => {
        this.deleteTask(task);
        this.props.addToNextStage(task);
    };

    moveToPreviousStage = (task) => {
        this.deleteTask(task);
        this.props.addToPreviousStage(task);
    };

    deleteTask = (task) => {
        this.props.deleteTask(task, this.type);
    };

    changeSortBy = (newSortBy) => {
        this.setState(() => ({
            sortBy: newSortBy,
        }));
    };

    sortList = (taskList, sortBy) => {
        // let taskList = this.state.taskList;
        let property;
        if (sortBy <= 1) {
            property = "added";
        } else if (sortBy <=3) {
            property = "deadline";
        } else if (sortBy <= 5) {
            property = "title";
        } else {
            // console.log(sortBy)
            throw new Error("Error! Invalid value! (Should be from 0 to 5)");
        }

        let order = sortBy % 2;
        let sortList = taskList.sort(function(obj1, obj2){
            const value1 = obj1[property];
            const value2 = obj2[property];
            if (value1 < value2) {
                return -1;
            } else if (value1 > value2) {
                return 1;
            } else {
                return 0;
            }
        });
        if (order === 0) {
            sortList = sortList.reverse();
        }
        return sortList;
    };

    changeFilterTime = (newStartTime, newEndTime) => {
        this.setState(() => ({
            startTime: newStartTime,
            endTime: newEndTime,
        }));
    };

    filterList = (taskList, startTime, endTime) => {
        let resultList = taskList.slice();
        for(let i = 0; i < taskList.length; i++) {
            const task = taskList[i];
            if (startTime !== '' && task.deadline < startTime) {
                resultList.splice(i, 1);
            } else if (endTime !== '' && task.deadline > endTime) {
                resultList.splice(i, 1);
            }
        }
        return resultList;
    };

    renderTasks = () => {
        const sortBy = this.state.sortBy;
        const startTime = this.state.startTime;
        const endTime = this.state.endTime;
        let taskList = this.state.taskList;
        taskList = this.sortList(taskList, sortBy);
        taskList = this.filterList(taskList, startTime, endTime);

        if (taskList.length === 0) {
            return (
                <p className="nothingToShow">
                    Nothing to show...
                </p>
            );
        }

        let taskObjList = [];
        for (let i = 0; i < taskList.length; i++) {
            let taskObj = {
                title: taskList[i].title,
                deadline: taskList[i].deadline,
                content: taskList[i].content,
                added: taskList[i].added,
            };

            taskObjList.push(
                <Task
                    obj={taskObj}
                    type={this.type}
                    deleteTask={this.deleteTask}
                    moveToNextStage={this.moveToNextStage}
                    moveToPreviousStage={this.moveToPreviousStage}
                    key={i}
                />
            );
        }
        return taskObjList;
    };

    render() {
        const total = this.state.taskList.length;
        const taskObjList = this.renderTasks();
        let showing = taskObjList.length;
        if (showing === undefined) {
            showing = 0;
        }

        return (
            <div className={this.props.className + ' taskLane'}>
                <h2 className="laneTitle">{this.title}</h2>
                <ToolsMenu
                    listType={this.type}
                    changeSortBy={this.changeSortBy}
                    changeFilterTime={this.changeFilterTime}
                />
                {taskObjList}
                <p className="taskCounter">
                    { total === 0 ? "No task yet..." : total + " in total, showing " + showing}
                </p>
            </div>
        )
    }
}
export default TaskLane;