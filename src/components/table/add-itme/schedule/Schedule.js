import React,{useState} from 'react';
import { Popover } from "antd";
import ScheduleDetail from './schedule-detail/ScheduleDetail';
import { useDrag } from "react-dnd";
import moment from "moment";
import Types from "../../../../constants/Types";
import { setObserver } from "../../../../utils/Config";

export default function Schedule(props) {
    const { schedule, locate, handleChangeSchedule } = props;
    const [row, col] = locate;
    const [bgColor,setBgColor] = useState("#1A73E8");

    const [{ }, drag] = useDrag({
        item: { type: Types.SCHEDULE },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
        begin: () => setObserver([row - 1, col], props.schedule)
    })

    const renderTime = () => {
        const time = moment(schedule.beginTime);
        const endTime = parseInt(time.format('LT').split(":")[0]) + parseInt(schedule.amountToComplete) + ":00";
        return `${time.format("hh:mm")} - ${endTime}`;
    }
    const content = <ScheduleDetail schedule={schedule}
        handleDeleteSchedule={props.handleDeleteSchedule} locate={locate} 
        handleChangeSchedule={handleChangeSchedule} 
        setBgColor={setBgColor} />

    return (
        <>
            <div ref={drag}>
                <Popover content={content} trigger="click" placement="right" >
                    <div className="col-content schedule-container" style={{backgroundColor: bgColor}}>
                        <h3>{schedule.title}</h3>
                        <p>{renderTime()}</p>
                    </div>
                </Popover>
            </div>
        </>
    )
}
