import React, { Component } from 'react';
import "./table.scss";
import data from "../../constants/data";
import AddSchedule from './add-itme/AddSchedule';
import ModalForm from './modal-form/ModalForm';
import { DndProvider } from "react-dnd";
import HTML5Backend from 'react-dnd-html5-backend';
import { getObserver, getLastedDragLocate } from "../../utils/Config";


let locateObjet = {
    fromTime: 0, day: 0
};

export default class TableComp extends Component {
    constructor(props) {
        super(props);
        let dataSchedule = localStorage.getItem("dataSchedule") ? JSON.parse(localStorage.getItem("dataSchedule")) : data;
        this.state = {
            dataTable: dataSchedule,
            visible: false
        }
    }

    renderDayTime = () => {
        let dayTimeArr = [];
        const { dataTable } = this.state;

        for (let i = 1; i <= dataTable.length; i++) {
            let cols = [];
            cols.push(
                <td key={'time' + i} className="col-time">
                    {(i <= 12 ? i : (i % 12)) + ' ' + (i < 12 ? 'AM' : 'PM')}
                </td>
            );
            for (let j = 0; j < dataTable[i - 1].length; j++) {
                cols.push(
                    <AddSchedule key={dataTable[i - 1][j].id}
                        dataSchedule={dataTable[i - 1][j]} showModal={this.showModal} locate={[i, j]}
                        handleDeleteSchedule={this.handleDeleteSchedule}
                        handleChangeSchedule={this.handleChangeSchedule}
                        handleMoveSchedule={this.handleMoveSchedule}
                    />
                )
            }
            dayTimeArr.push(
                <tr key={'row' + i}>
                    {cols}
                </tr>
            )
        }
        return dayTimeArr;
    }

    showModal = ([fromTime, day]) => {
        locateObjet = {
            fromTime, day
        }
        this.setState({
            visible: true,
        });
    }


    handleCancel = () => {
        this.setState({
            visible: false,
        });
        locateObjet = {
            fromTime: 0, day: 0
        };
    };

    saveFormRef = formRef => {
        this.formRef = formRef;
    };

    handleCreate = () => {
        const { form } = this.formRef.props;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }

            const { title, desc, beginTime, amountToComplete, location } = values;
            const cloneValues = { title, desc, beginTime, amountToComplete, location };
            const row = locateObjet.fromTime - 1;
            const col = locateObjet.day;
            const cloneData = [...this.state.dataTable];
            cloneData[row][col].schedule = cloneValues;
            if (amountToComplete > 1) {
                for (let i = 1; i <= amountToComplete - 1; i++) {
                    cloneData[row + i].splice(col, 1);
                }
            }
            localStorage.setItem("dataSchedule", JSON.stringify(cloneData));
            this.setState({
                visible: false,
                dataTable: [...cloneData]
            }, () => {
                form.resetFields();
            });
        });
    };

    handleDeleteSchedule = ([row, col], amountToComplete) => {
        const cloneData = [...this.state.dataTable];
        delete cloneData[row][col].schedule;
        if (amountToComplete > 1) {
            for (let i = 1; i <= amountToComplete - 1; i++) {
                cloneData[row + i].splice(col, 0, {
                    id: 7 * i + (col + 1)
                });
            }
        }
        localStorage.setItem("dataSchedule", JSON.stringify(cloneData));
        this.setState({ dataTable: [...cloneData] })
    }

    handleChangeSchedule = ([row, col], adjustedSchedule) => {
        this.setState((prevState) => {
            prevState.dataTable[row][col].schedule = { ...adjustedSchedule };
            return {
                dataTable: [...prevState.dataTable]
            }
        })
    }

    handleMoveSchedule = ([targetRow, targetCol]) => {
        const lastedDragObject = getObserver();
        const { amountToComplete } = lastedDragObject;
        const [lastedRow, lastedCol] = getLastedDragLocate();
        const cloneData = [...this.state.dataTable];
        cloneData[targetRow][targetCol].schedule = lastedDragObject;
        if (amountToComplete > 1) {
            for (let i = 1; i <= amountToComplete - 1; i++) {
                cloneData[targetRow + i].splice(targetCol, 1);
            }
        }

        this.handleDeleteSchedule([lastedRow, lastedCol], amountToComplete);

        this.setState({ dataTable: [...cloneData] }, () => {
            localStorage.setItem("dataSchedule", JSON.stringify(cloneData));
        })

    }

    render() {
        return (
            <DndProvider backend={HTML5Backend}>
                <div className="table-wrapper">
                    <table className="table-schedule">
                        <thead>
                            <tr>
                                <th>Thời gian</th>
                                <th>Thứ hai</th>
                                <th>Thứ ba</th>
                                <th>Thứ tư</th>
                                <th>Thứ năm</th>
                                <th>Thứ sáu</th>
                                <th>Thứ bảy</th>
                                <th>Chủ nhật</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.renderDayTime()}
                        </tbody>
                    </table>
                    <ModalForm
                        wrappedComponentRef={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        locateObjet={locateObjet}
                    />
                </div>
            </DndProvider>
        )
    }
}
