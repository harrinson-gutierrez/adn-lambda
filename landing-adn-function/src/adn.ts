import { listToMatrix } from "./matrix";
import { is_Natural } from "./number";

function validateCharacterStructure(join: string){
    for(let i=0; i<join.length; i++){
        if(join[i] !== 'W' && join[i] !== 'E' && join[i] !== 'Y' && join[i] !== 'S'){
            throw new Error("Its not character W,E,Y,S");
        }
    }
}

function validateMatrixStructure(adn:string[], joinAdn: string){

    let sqrJoinAdn = Math.sqrt(joinAdn.length);

    console.log("Natural number", sqrJoinAdn);
    if(!is_Natural(sqrJoinAdn)){
        throw new Error("Its not matrix n*n");
    }

    let elementsPerSubArray = sqrJoinAdn / 4;

    console.log("Element per matrix", elementsPerSubArray);

    let matrix = listToMatrix(adn as [], elementsPerSubArray);

    console.log("Matrix", matrix);
}

export function isClon(adn: string[]): boolean {

    var sequence = [];

    let join = adn.join().replace(/,/g, "");

    console.log("join", join);
    
    validateCharacterStructure(join);

    validateMatrixStructure(adn, join);

    return false;
} 