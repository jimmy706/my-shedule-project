import React, { Component } from 'react';
import { Row, Col } from "antd";

export default class ScheduleDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            schedule: this.props.schedule,
            allowAdjust: false
        }
    }

    handleAdjust = () => {
        this.setState((prevState) => {
            return {
                allowAdjust: !prevState.allowAdjust
            }
        })
    }

    render() {
        const { schedule, } = this.props;
        const { allowAdjust } = this.state;
        return (
            <form className="form">
                <div className="user-interact-wrapper">
                    <Row gutter={10}>
                        <Col className="gutter-row" span={3}>
                            <span className="interact-btn adjust"
                                title="Chỉnh sửa lịch trình" onClick={this.handleAdjust} >
                                <i className="fas fa-pencil-alt"></i>
                            </span>
                        </Col>
                        <Col className="gutter-row" span={3} >
                            <span className="interact-btn remove" title="Xóa lịch trình">
                                <i className="fas fa-trash-alt"></i>
                            </span>
                        </Col>
                    </Row>
                </div>
                <div className="form-group">
                    <input type="text" name="title"
                        class="form-control"
                        placeholder="Nhập tiêu đề" id="title"
                        autocomplete="off" required defaultValue={schedule.title}
                        disabled={allowAdjust ? "" : "disabled"} />
                    <label for="title">Tiêu đề</label>
                    <div className="place-border"></div>
                </div>

                <div className="form-group">
                    <input type="text"
                        name="location" className="form-control"
                        placeholder="Nhập địa chỉ"
                        id="location" defaultValue={schedule.location}
                        disabled={allowAdjust ? "" : "disabled"} />
                    <label for="location">Địa chỉ </label>
                    <div class="place-border"></div>
                </div>

                <div className="form-group">
                    <textarea placeholder="Nhập nội dung"
                        defaultValue={schedule.desc} id="desc"
                        name="desc"
                        className="form-control"
                        disabled={allowAdjust ? "" : "disabled"} />
                    <label for="desc">Nội dung </label>
                    <div class="place-border"></div>
                </div>

                <button
                    className={"action-btn " + (allowAdjust ? "" : "d-none")} type="submit">
                    Sửa
                </button>
            </form>
        )
    }
}
