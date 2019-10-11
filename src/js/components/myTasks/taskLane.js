import React from 'react';
import HiddenToolsImg from "../../../img/hiddenMenu.png";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import NextButton from "../../../img/next.png";
import PreviousButton from "../../../img/previous.png";
import DeleteButton from "../../../img/trashcan.png";

import "../../../css/taskLane.css";

class ToolsMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showMenu: "none",
            sortBy: 0,
            startTime: null,
            endTime: null,
        }
    }

    handleStartTimeChange = (event) => {
        let newStartTime = event.target.value;
        if (newStartTime === "") {
            newStartTime = null;
        }
        this.setState({
            startTime: newStartTime
        })
    };

    handleEndTimeChange = (event) => {
        let newEndTime = event.target.value;
        if (newEndTime === "") {
            newEndTime = null;
        }
        this.setState({
            endTime: newEndTime
        })
    };

    handleSortByChange = (event) => {
        let newSortBy = event.target.value;
        this.setState({
            sortBy: newSortBy
        });
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

    componentWillUpdate(nextProps, nextState, nextContext) {
        // TODO
    }

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
                                <MenuItem value={4}>Name</MenuItem>
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

    handleNextButtonClick = () => {
        this.props.moveToNextStage(this.obj);
    };

    handlePreviousButtonClick = () => {
        this.props.moveToPreviousStage(this.obj);
    };

    handleDeleteButtonClick = () => {
        this.props.deleteTask(this.obj);
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

    renderTasks = () => {
        const taskList = this.state.taskList;
        let taskObjList = [];
        for (let i = 0; i < taskList.length; i++) {
            let taskObj = {
                title: taskList[i].title,
                deadline: taskList[i].deadline,
                content: taskList[i].content
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
        const num = this.state.taskList.length;
        return (
            <div className={this.props.className + ' taskLane'}>
                <h2 className="laneTitle">{this.title}</h2>
                <ToolsMenu/>
                {this.renderTasks()}
                <p className="taskCounter">
                    { num === 0 ? "No task yet..." : num + " in total"}
                </p>
            </div>
        )
    }
}
export default TaskLane;