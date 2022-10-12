export function listToMatrix(list:[], elementsPerSubArray: number) {
    var matrix = {};
    var i:number,k:number = 0;

    for (i = 0, k = -1; i < list.length; i++) {
        if (i % elementsPerSubArray === 0) {
            k++;
            matrix[k] = [];
        }
        console.log(list[i])
        matrix[k].push(list[i]);
    }

    return matrix;
}