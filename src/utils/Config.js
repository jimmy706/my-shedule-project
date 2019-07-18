import dataTable from "../constants/data";

let observer = null;
let lastedDragLocate = null;
const data = localStorage.getItem("dataSchedule") ? JSON.parse(localStorage.getItem("dataSchedule")) : dataTable;


export function canMoveSchedule(row, col) {
    let canMove = !!data[row][col].schedule ? false : true;
    console.log(data[row][col]);
    return canMove;
}


export function setObserver([lastedRow, lastedCol], o) {
    lastedDragLocate = [lastedRow, lastedCol];
    observer = o;
}

export function getObserver() {
    return observer;
}

export function getLastedDragLocate() {
    return lastedDragLocate;
}