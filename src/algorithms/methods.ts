
export function TOPSIS(matrixOfGrades:number[][],weights:number[],criteriaNumber:number,alternativeNumber:number):number[]{
   const squaredColumnSums:number[] = getColumnSums(matrixOfGrades);
   const normalizedMatrix:number[][]=matrixOfGrades.map(row =>
        row.map((value, colIndex) => value / squaredColumnSums[colIndex]));
    const weightedMatrix:number[][]=normalizedMatrix.map(row =>
        row.map((value, colIndex) => value * weights[colIndex]));
    
    

}

function getColumnSums(matrix: number[][]): number[] {
    return matrix[0].map((_, colIndex) =>
        matrix.reduce((sum, row) => sum + row[colIndex]^2, 0)
    );
}