import React from "react";
import AlarmImg from "../../../img/alarm.ico";
import AddAlarmImg from "../../../img/add.ico";
import {confirmAlert} from "react-confirm-alert";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import {KeyboardDatePicker, KeyboardTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import "../../../css/alarm.css";


Date.prototype.format = function(fmt) {
    const o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    };
    if(/(y+)/.test(fmt)) {
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
    }
    for(const k in o) {
        if(new RegExp("("+ k +")").test(fmt)){
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length===1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
        }
    }
    return fmt;
};

function getScreenWidth() {
    return document.body.clientWidth;
}

function getScreenHeight() {
    return document.body.clientHeight;
}

function showAlert(title, content) {
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

class AlarmAdder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'new alarm',
            dateOrigin: new Date(),
            timeOrigin: new Date(),
            ring: 'always',

            display: this.props.display,
        };
    }

    componentWillReceiveProps = nextProps => {
        this.setState(() => ({
            display: nextProps.display,
        }))
    };

    handleTitleChange = () => {
        const title = document.getElementById("newAlarmTitleInput").value;
        this.setState(() => ({
            title: title,
        }));
    };

    handleDateChange = (date) => {
        this.setState(() => ({
            dateOrigin: date,
        }));
    };

    handleTimeChange = (time) => {
        this.setState(() => ({
            timeOrigin: time,
        }));
    };

    handleRingChange = (event) => {
        const ring = event.target.value;
        this.setState(() => ({
            ring: ring,
        }));
    };

    addAlarm = () => {
        const alertTitle = "Error";
        const alarmObj = {
            title: this.state.title,
            date: this.state.dateOrigin.format("dd-MM-yyyy"),
            time: this.state.timeOrigin.format("hh:mm"),
            ring: this.state.ring,
        };
        const titleOk = alarmObj.title !== "";
        const dateOk = alarmObj.date !== "";
        const timeOk = alarmObj.time !== "";
        const ringOk = alarmObj.ring !== "";
        if (!titleOk) {
            showAlert(alertTitle, "Please enter the title.")
        } else if (!dateOk) {
            showAlert(alertTitle, "Please enter the date.")
        } else if (!timeOk) {
            showAlert(alertTitle, "Please enter the time.")
        } else if (!ringOk) {
            showAlert(alertTitle, "Please select how long to ring.")
        } else {
            this.props.addAlarm(alarmObj);
        }
    };

    onClose = () => {
        this.props.closeAlarmAdder();
    };

    stopBubble = (event) => {
        event.stopPropagation();
    };

    render() {
        return (
            <div
                id="alarmAdderWrap"
                style={{
                    display: this.state.display,
                    width: getScreenWidth(),
                    height: getScreenHeight()
                }}
                onClick={this.onClose}
            >
                <div id="alarmAdder" onClick={this.stopBubble}>
                    <h2>Add new alarm</h2>
                    <div id="newAlarmInfo">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <TextField
                                required
                                id="newAlarmTitleInput"
                                className="newAlarmInput"
                                label="Title"
                                placeholder="Title"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                defaultValue={this.state.title}
                                margin="normal"
                                onChange={this.handleTitleChange}
                            />

                            <KeyboardDatePicker
                                disableToolbar
                                required
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="newAlarmDateInput"
                                className="newAlarmInput"
                                label="Date"
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                value={this.state.dateOrigin}
                                onChange={this.handleDateChange}
                            />

                            <KeyboardTimePicker
                                required
                                margin="normal"
                                id="newAlarmTimeInput"
                                className="newAlarmInput"
                                label="Time"
                                KeyboardButtonProps={{
                                    'aria-label': 'change time',
                                }}
                                value={this.state.timeOrigin}
                                onChange={this.handleTimeChange}
                            />

                            <FormControl
                                id="newAlarmRingInput"
                                className="newAlarmInput"
                                margin='normal'
                            >
                                <InputLabel shrink htmlFor="ring-label-placeholder" required>
                                    Ring for
                                </InputLabel>
                                <Select
                                    id="newAlarmRingInput"
                                    inputProps={{
                                        name: 'ring',
                                        id: 'ring-label-placeholder',
                                    }}
                                    displayEmpty
                                    name="ring"
                                    value={this.state.ring}
                                    onChange={this.handleRingChange}
                                >
                                    <MenuItem value="always">
                                        <em>Always</em>
                                    </MenuItem>
                                    <MenuItem value="10s">10s</MenuItem>
                                    <MenuItem value="30s">30s</MenuItem>
                                    <MenuItem value="1min">1min</MenuItem>
                                    <MenuItem value="5min">5min</MenuItem>
                                    <MenuItem value="10min">10min</MenuItem>
                                    <MenuItem value="0">Do not ring</MenuItem>
                                </Select>
                            </FormControl>
                        </MuiPickersUtilsProvider>
                        <div className="alarmAdderButtons">
                            <Button
                                onClick={() => {
                                    this.addAlarm();
                                    this.onClose();
                                }}
                                className='confirmButton'
                                color="primary"
                            >
                                Confirm
                            </Button>
                            <Button
                                onClick={this.onClose}
                                className="cancelButton"
                                color="secondary"
                            >
                                Cancel
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

class AlarmElement extends React.Component {
    constructor(props) {
        super(props);
        this.obj = this.props.obj;
    }

    componentWillReceiveProps = (nextProps) => {
        this.obj = nextProps.obj;
    };

    handleRemoveAlarmClick = () => {
        const title = "Caution";
        const content = "Are you sure you want to delete this alarm? This cannot be cancelled.";
        confirmAlert({
            customUI: ({ onClose }) => {
                return (
                    <div className='userInfoConfirm'>
                        <h2>{title}</h2>
                        <p>{content}</p>
                        <Button
                            onClick={() => {
                                this.props.removeAlarmElement(this.obj);
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

    render() {
        const obj = this.obj;
        let soundInfo;
        if (obj.ring === "none") {
            soundInfo = (
                <p className="alarmDetailLine">Do not ring</p>
            );
        } else if (obj.ring === "always") {
            soundInfo = (
                <p className="alarmDetailLine">Always ring</p>
            );
        } else {
            soundInfo = (
                <p className="alarmDetailLine">Ring for {obj.ring}</p>
            );
        }

        return (
            <div className="alarmElement">
                <div className="alarmDetails">
                    <h4>{obj.title}</h4>
                    <p className="alarmDetailLine">{obj.date.toString()} {obj.time.toString()}</p>
                    {soundInfo}
                </div>
                <p className="removeAlarm" onClick={this.handleRemoveAlarmClick}>X</p>
            </div>
        )
    }
}

class Alarm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            display: "none",
            displayAdder: "none",
            alarms: [
                {
                    title: "test 1",
                    date: '2017-05-24',
                    time: '09:30',
                    ring: '10s',
                },
                {
                    title: "test 2",
                    date: '2017-05-24',
                    time: '09:30',
                    ring: "none",
                }
            ],
        }
    }

    setAlarms = (alarmsList) => {
        this.setState({
            alarms: alarmsList,
        });
    };

    addAlarm = alarmObj => {
        let alarmList = this.state.alarms.slice();
        if (alarmList.indexOf(alarmObj) > -1) {
            showAlert("Error", "This alarm has existed.")
        }
        alarmList.push(alarmObj);
        this.setState(() => ({
            alarms: alarmList,
        }));
    };

    handleAlarmButtonClick = () => {
        if (this.state.display === "none") {
            this.setState(() => ({
                display: "block"
            }));
        } else {
            this.setState(() => ({
                display: "none"
            }));
        }
    };

    removeAlarmElement = (obj) => {
        let alarmList = this.state.alarms.slice();
        for (let i = 0; i < alarmList.length; i++) {
            const titleEqual = obj.title === alarmList[i].title;
            const dateEqual = obj.date === alarmList[i].date;
            const timeEqual = obj.time === alarmList[i].time;
            const ringEqual = obj.ring === alarmList[i].ring;
            const lastEqual = obj.last === alarmList[i].last;
            if (titleEqual && dateEqual && timeEqual && ringEqual && lastEqual) {
                alarmList.splice(i, 1);
                break;
            }
        }
        this.setState(() => ({
            alarms: alarmList,
        }))
    };

    stopBubble = (event) => {
        event.stopPropagation();
    };

    openAlarmAdder = () => {
        this.setState(() => ({
            displayAdder: "block",
        }));
    };

    closeAlarmAdder = () => {
        this.setState(() => ({
            displayAdder: "none",
        }));
    };

    renderAlarms = () => {
        let alarmElementList = [];
        for (let i = 0; i< this.state.alarms.length; i++) {
            const alarmObj = this.state.alarms[i];
            alarmElementList.push(
                <AlarmElement
                    obj={alarmObj}
                    key={i}
                    removeAlarmElement={this.removeAlarmElement}
                />);
        }
        return alarmElementList;
    };

    render() {
        return (
            <div className="alarmButtonFrame">
                <img
                    src={AlarmImg}
                    alt="alarm button"
                    className="alarmButton"
                    title="alarm"
                    onClick={this.handleAlarmButtonClick}
                />

                <div id="alarmListWrap"
                     style={{
                         display: this.state.display,
                         width: getScreenWidth(),
                         height: getScreenHeight()
                     }}
                     onClick={this.handleAlarmButtonClick}
                >
                    <div id="alarmList" onClick={this.stopBubble}>
                        <h3>Alarm list:</h3>
                        {this.renderAlarms()}
                        <div id="addNewAlarm" onClick={this.openAlarmAdder}>
                            <div id="addNewOuter" >
                                <img src={AddAlarmImg} alt="add a new alarm" id="addAlarmImg"/>
                                <span>Add new</span>
                            </div>
                        </div>
                    </div>
                </div>
                <AlarmAdder
                    display={this.state.displayAdder}
                    closeAlarmAdder={this.closeAlarmAdder}
                    addAlarm={this.addAlarm}
                />
            </div>
        );
    }
}

export default Alarm;