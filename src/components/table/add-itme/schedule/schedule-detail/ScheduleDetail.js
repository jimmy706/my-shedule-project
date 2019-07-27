import React, { Component } from 'react';
import { Row, Col } from "antd";

export default class ScheduleDetail extends Component {
    constructor(props) {
        super(props);
        const { title, location, amountToComplete, desc } = this.props.schedule;

        this.state = {
            schedule: this.props.schedule,
            allowAdjust: false,
            scheduleObj: {
                title,
                location: location || '',
                desc: desc || '',
                amountToComplete
            }
        }
    }

    handleAdjust = () => {
        this.setState((prevState) => {
            return {
                allowAdjust: !prevState.allowAdjust
            }
        })
    }

    deleteSchedule = () => {
        const { schedule, handleDeleteSchedule, locate } = this.props;
        const [row, col] = locate;
        handleDeleteSchedule([row - 1, col], schedule.amountToComplete);
    }

    adjustSchedule = (e) => {
        e.preventDefault();
        const [row, col] = this.props.locate;
       this.props.handleChangeSchedule([row - 1, col], this.state.scheduleObj);
       this.setState({
           allowAdjust: false
       })
    }

    handleChangeInputForm = (e) => {
        let key = e.target.name;
        let val = e.target.value;
        this.setState((prevState) => {
            prevState.scheduleObj[key] = val;
            return {
                scheduleObj: { ...prevState.scheduleObj }
            }
        })
    }

    render() {
        const { locate } = this.props;
        const { allowAdjust } = this.state;
        const { title, location, desc, amountToComplete } = this.state.scheduleObj;
        return (
            <form className="form" onSubmit={this.adjustSchedule}>
                <div className="user-interact-wrapper">
                    <Row gutter={10}>
                        <Col className="gutter-row" span={3}>
                            <span className="interact-btn adjust"
                                title="Chỉnh sửa lịch trình" onClick={this.handleAdjust} >
                                <i className="fas fa-pencil-alt"></i>
                            </span>
                        </Col>
                        <Col className="gutter-row" span={3} >
                            <span className="interact-btn remove" title="Xóa lịch trình" onClick={this.deleteSchedule}>
                                <i className="fas fa-trash-alt"></i>
                            </span>
                        </Col>
                    </Row>
                </div>
                <div className="form-group">
                    <input type="text" name="title"
                        className="form-control"
                        placeholder="Nhập tiêu đề" id="title"
                        autoComplete="off" required
                        value={title}
                        onChange={this.handleChangeInputForm}
                        disabled={allowAdjust ? "" : "disabled"} />
                    <label htmlFor="title">Tiêu đề</label>
                    <div className="place-border"></div>
                </div>

                <div className="form-group">
                    <input type="text"
                        name="location" className="form-control"
                        placeholder="Nhập địa chỉ"
                        id="location"
                        value={location}
                        onChange={this.handleChangeInputForm}
                        disabled={allowAdjust ? "" : "disabled"} />
                    <label htmlFor="location">Địa chỉ </label>
                    <div className="place-border"></div>
                </div>

                <div className="form-group">
                    <input type="number"
                        name="amountToComplete" className="form-control"
                        placeholder="Nhập địa chỉ"
                        id="amountToComplete"
                        value={amountToComplete}
                        onChange={this.handleChangeInputForm}
                        min={1}
                        disabled={allowAdjust ? "" : "disabled"} max={24 - locate[0]} />
                    <label htmlFor="amountToComplete">Thời gian hoàn thành: </label>
                    <div className="place-border"></div>
                </div>

                <div className="form-group">
                    <textarea placeholder="Nhập nội dung"
                        id="desc"
                        name="desc"
                        onChange={this.handleChangeInputForm}
                        className="form-control"
                        value={desc}
                        disabled={allowAdjust ? "" : "disabled"} />
                    <label htmlFor="desc">Nội dung </label>
                    <div className="place-border"></div>
                </div>

                <button
                    className={"action-btn " + (allowAdjust ? "" : "d-none")} type="submit">
                    Sửa
                </button>
            </form>
        )
    }
}
