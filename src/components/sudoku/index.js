import { useEffect, useState } from 'react';
import SudokuGrid from './grid';
import './styles.scss';

function Sudoku() {

    const [diffLevel, setDiffLevel] = useState("easy");
    const [board, setBoard] = useState([]);

    useEffect(() => {
        getSudokuData(diffLevel);
    }, [diffLevel])

    const getSudokuData = async (level) => {
        const _res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${diffLevel}`);
        const _data = await _res.json()
        console.log(_data?.board);
        setBoard(_data?.board);
    }

    const solveHandler = async (updatedBoard) => {
        const _res = await fetch("https://sugoku.herokuapp.com/solve", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedBoard)
        });
        const _data = await _res.json()
        console.log(_data?.board);
    }

    return (
        <div className="sudoku-container">

            <label>Difficulty Level
                <select onChange={(e) => { setDiffLevel(e.target.value) }}>
                    <option value={'easy'}>Easy</option>
                    <option value={'medium'}>Medium</option>
                    <option value={'hard'}>Hard</option>
                    <option value={'random'}>Random</option>
                </select>
            </label>

            {board && board.length ?
                <SudokuGrid board={board} solveHandler={solveHandler} /> :
                <label>Loading...</label>
            }
        </div>
    );
}

export default Sudoku;
