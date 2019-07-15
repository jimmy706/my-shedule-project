import React from 'react'
import Schedule from './schedule/Schedule';

export default function AddSchedule(props) {
    const { dataSchedule, locate, handleChangeSchedule } = props;
    const { schedule } = dataSchedule;
    const renderContent = () => {
        if (schedule) {
            return <Schedule schedule={schedule} 
            handleDeleteSchedule={props.handleDeleteSchedule} locate={locate} handleChangeSchedule={handleChangeSchedule}/>
        }
        return (
            <div onClick={() => props.showModal(locate)} className="col-content">
                <i className="fas fa-plus"></i> Thêm nội dung
            </div>
        )
    }

    return (
        <td rowSpan={schedule ? (schedule.amountToComplete > 1 ? schedule.amountToComplete : 1) : 1}>
            {renderContent()}
        </td>
    )

}
