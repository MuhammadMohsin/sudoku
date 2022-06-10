import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

function SudokuGrid({ board, solveHandler, clearHandler }) {

    const emptyArray = new Array(9).fill(0).map(i => i = new Array(9).fill(0));

    const [boardState, setBoardState] = useState(emptyArray);

    useEffect(() => {
        console.log("board", board)
        setBoardState(board)
    }, board)

    const handleChange = (val, row, col) => {
        setBoardState((prev) => {
            prev[row][col] = +val;
            return prev;
        })
    }
    const clearAll = () => {
        setBoardState(emptyArray);
        clearHandler();
    }

    return (
        <div className="sudoku-grid">
            {boardState?.map((rowData, rInd) => {
                return rowData?.map((val, cInd) =>
                    <input type="number"
                        defaultValue={(val === 0 ? '' : val)}
                        className={`cell row${rInd} col${cInd}`}
                        onChange={(ev) => handleChange(ev.target.value, rInd, cInd)}
                        key={cInd} />
                )
            })}

            <Button variant="contained" fullWidth className="solve"
                onClick={() => { solveHandler(boardState) }}>Solve
            </Button>

            <Button variant="contained" fullWidth className="solve"
                color="error" onClick={() => { clearAll() }}>Clear
            </Button>
        </div>
    );
}

export default SudokuGrid;
