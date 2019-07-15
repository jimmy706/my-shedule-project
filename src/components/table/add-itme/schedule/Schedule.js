import React from 'react';
import { Popover } from "antd";
import ScheduleDetail from './schedule-detail/ScheduleDetail';

export default function Schedule(props) {
    const { schedule } = props;
    const renderTime = () => {
        const endTime = parseInt(schedule.beginTime._i.split(":")[0]) + schedule.amountToComplete + ":00";
        return `${schedule.beginTime._i} - ${endTime}`;
    }
    const content = <ScheduleDetail schedule={schedule} time={renderTime()} />

    return (
        <Popover content={content} trigger="click" placement="bottom">
            <div className="col-content schedule-container">
                <h3>{schedule.title}</h3>
                <p>{renderTime()}</p>
            </div>
        </Popover>
    )
}
