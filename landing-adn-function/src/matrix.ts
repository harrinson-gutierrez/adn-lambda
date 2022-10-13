export function listToMatrix(list: any[]) {
    let finalMtx: any[] = [];

    list.forEach((adn) => {

        let tmpArray: any[] = [];

        for (let i = 0; i <= adn.length - 1; i++)
            tmpArray.push(adn[i]);

        finalMtx.push(tmpArray);

    });

    return finalMtx;
}

export function getColumns(matrix,col){
    let groups:any[] = [];
  
    for (let i =0;i<=matrix.length-1;i++)
        groups.push(matrix[i][col]);
    
    return groups;
  
  }
  
export function getRows(matrix,row){
    let groups:any[] = [];
    for (let i =0;i<=matrix.length-1;i++)
        groups.push(matrix[row][i]);
    
    return groups;
  
  }

function findDiagonalUp(matrix, col) {
    let line: any[] = [];

    for (let i = 0; i <= matrix.length - col - 1; i++)
        line.push(matrix[i][i + col]);

    return line;
}

function findDiagonalDown(matrix, row) {
    let line:any[] = [];

    for (let i = 0; i <= matrix.length - row - 1; i++)
        line.push(matrix[i + row][i]);

    return line;
}

export function getDiagonals(matrix) {
    let subRows: any[] = [];

    matrix.forEach((col, i) => subRows.push(findDiagonalUp(matrix, i)));

    matrix.forEach((row, i) => {

        if (i > 0)
            subRows.push(findDiagonalDown(matrix, i));

    });

    return subRows;
}