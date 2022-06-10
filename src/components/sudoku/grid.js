import { useEffect, useState } from "react";
import Button from '@mui/material/Button';

function SudokuGrid({ board, solveHandler, clearHandler, validateHandler }) {

    const emptyArray = new Array(9).fill(0).map(i => i = new Array(9).fill(0));

    const [boardState, setBoardState] = useState(emptyArray);

    useEffect(() => {
        setBoardState(board)
    }, board)

    const handleChange = (val, row, col) => {
        if (val < 10 && val > 0 || val == '') {
            setBoardState((prev) => {
                let _val = JSON.parse(JSON.stringify(prev))
                _val[row][col] = +val;
                return _val;
            });
        }
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
                        value={(val === 0 ? '' : val)}
                        className={`cell row${rInd} col${cInd}`}
                        onChange={(ev) => handleChange(ev.target.value, rInd, cInd)}
                        key={cInd} />
                )
            })}

            <Button variant="contained" fullWidth className="solve"
                onClick={() => { validateHandler(boardState) }}>Validate
            </Button>

            <Button variant="contained" fullWidth className="solve"
                color="error" onClick={() => { clearAll() }}>Clear
            </Button>

            <Button variant="contained" fullWidth className="solve"
                onClick={() => { solveHandler(boardState) }}>Solve
            </Button>
        </div>
    );
}

export default SudokuGrid;
