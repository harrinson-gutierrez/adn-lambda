import { getColumns, getDiagonals, getRows, listToMatrix } from "./matrix";
import { is_Natural } from "./number";

function validateCharacterStructure(join: string) {
    for (let i = 0; i < join.length; i++) {
        if (join[i] !== 'W' && join[i] !== 'E' && join[i] !== 'Y' && join[i] !== 'S') {
            throw new Error("Its not character W,E,Y,S");
        }
    }
}

function validateMatrixStructure(joinAdn: string) {

    let sqrJoinAdn = Math.sqrt(joinAdn.length);

    if (!is_Natural(sqrJoinAdn)) {
        throw new Error("Its not matrix n*n");
    }
}

function checkConsecutive(lineArray, tope) {
    let last = '';
    let actual = '';
    let count = 0;
    for (let i = 0; i <= lineArray.length - 1; i++) {
        last = (i == 0) ? lineArray[0] : lineArray[i - 1];
        actual = lineArray[i];

        if (last == actual) {
            count++;

            if (count == tope)
                return true;
        }
    }
    return false;
}

function validateConsecutive(adn: string[]): boolean {
    let matrix = listToMatrix(adn);
    console.log("Matrix", matrix);

    let diagonals = getDiagonals(matrix);
    let columns = matrix.map((col, i) => getColumns(matrix, i));
    let rows = matrix.map((col, i) => getRows(matrix, i));
    let group = [...diagonals, ...columns, ...rows];

    let findClon = group.find((line) => checkConsecutive(line, 4));

    console.log("Find Clon", findClon);
    
    return findClon?.length > 0;
}


export function isClon(adn: string[]): boolean {

    let join = adn.join().replace(/,/g, "");
    
    validateCharacterStructure(join);

    validateMatrixStructure(join);

    return validateConsecutive(adn);
} 