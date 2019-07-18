import React from 'react'
import Schedule from './schedule/Schedule';
import { useDrop } from 'react-dnd'
import Types from "../../../constants/Types";
import { canMoveSchedule } from "../../../utils/Config"

export default function AddSchedule(props) {
    const { dataSchedule, locate, handleChangeSchedule, handleMoveSchedule } = props;
    const { schedule } = dataSchedule;
    const [row, col] = locate;

    const [{ }, drop] = useDrop({
        accept: Types.SCHEDULE,
        canDrop: () => canMoveSchedule(row - 1, col),
        collect: mon => ({
            isOver: !!mon.isOver(),
            canDrop: !!mon.canDrop()
        }),
        drop: () => handleMoveSchedule([row - 1, col])
    })

    const renderContent = () => {
        if (schedule) {
            return <Schedule schedule={schedule}
                handleDeleteSchedule={props.handleDeleteSchedule} locate={locate} handleChangeSchedule={handleChangeSchedule} />
        }
        return (
            <div onClick={() => props.showModal(locate)} className="col-content">
                <i className="fas fa-plus"></i> Thêm nội dung
            </div>
        )
    }

    return (
        <td rowSpan={schedule ? (schedule.amountToComplete > 1 ? schedule.amountToComplete : 1) : 1} ref={drop}>
            <div>
                {renderContent()}
                {props.children}
            </div>
        </td>
    )

}
