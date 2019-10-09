import React from 'react';
import "../../../css/taskLane.css";
import HiddenToolsImg from "../../../img/hiddenMenu.png";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

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
                                    type="datetime-local"
                                    label="start from"
                                    className="dueTimeStart"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    onChange={this.handleStartTimeChange}
                                />
                                <TextField
                                    type="datetime-local"
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

class TaskLane extends React.Component {
    constructor(props) {
        super(props);
        this.title = this.props.title;
    }

    setTasks = (tasksList) => {
        this.setState({
            tasks: tasksList,
        });
    };

    addTask = (task) => {
        this.props.addTask(task);
    };

    render() {
        return (
            <div className={this.props.className + ' taskLane'}>
                <h2 className="laneTitle">{this.title}</h2>
                <ToolsMenu/>
            </div>
        )
    }
}
export default TaskLane;