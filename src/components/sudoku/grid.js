import { useEffect, useState } from "react";

function SudokuGrid({ board, solveHandler }) {

    const [boardState, setBoardState] = useState([]);

    useEffect(() => setBoardState(board), board)

    const handleChange = (val, row, col) => {
        setBoardState((prev) => {
            prev[row][col] = +val;
            return prev;
        })
    }
    return (
        <div className="sudoku-grid">
            {boardState?.map((rowData, rInd) => {
                return rowData?.map((val, cInd) =>
                    <input type="number"
                        defaultValue={val === 0 ? '' : val}
                        className={`cell row${rInd} col${cInd}`}
                        onBlur={(ev) => handleChange(ev.target.value, rInd, cInd)}
                        key={cInd} />
                )
            })}

            <button className="solve" onClick={() => solveHandler(boardState)}>Solve</button>
        </div>
    );
}

export default SudokuGrid;
