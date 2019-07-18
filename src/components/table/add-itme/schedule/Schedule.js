import React from 'react';
import { Popover } from "antd";
import ScheduleDetail from './schedule-detail/ScheduleDetail';
import { useDrag } from "react-dnd";
import moment from "moment";
import Types from "../../../../constants/Types";
import { setObserver } from "../../../../utils/Config";

export default function Schedule(props) {
    const { schedule, locate, handleChangeSchedule } = props;
    const [row, col] = locate;

    const [{ }, drag] = useDrag({
        item: { type: Types.SCHEDULE },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        begin: () => setObserver([row - 1, col], props.schedule)
    })

    const renderTime = () => {
        const time = moment(schedule.beginTime);
        const endTime = parseInt(time.format('LT').split(":")[0]) + schedule.amountToComplete + ":00";
        return `${time.format("hh:mm")} - ${endTime}`;
    }
    const content = <ScheduleDetail schedule={schedule}
        handleDeleteSchedule={props.handleDeleteSchedule} locate={locate} handleChangeSchedule={handleChangeSchedule} />

    return (
        <>
            <div ref={drag}>
                <Popover content={content} trigger="click" placement="bottom" >
                    <div className="col-content schedule-container">
                        <h3>{schedule.title}</h3>
                        <p>{renderTime()}</p>
                    </div>
                </Popover>
            </div>
        </>
    )
}
