
let observer = null;
let lastedDragLocate = null;
let data;

export function setData(dataTable){
    data = [...dataTable];
}


export function canMoveSchedule(row, col) {
    let canMove;
    if(!!data[row][col]){
        canMove = !!data[row][col].schedule ? false : true;
    }
    else
        return false;
    return canMove;
}


export function setObserver([lastedRow, lastedCol], o) {
    lastedDragLocate = [lastedRow, lastedCol];
    observer = o;
}

export function getObserver() {
    return {...observer};
}

export function getLastedDragLocate() {
    return [...lastedDragLocate];
}