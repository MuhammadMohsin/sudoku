import { useEffect, useState } from 'react';
import SudokuGrid from './grid';
import NewGame from './newGame';
import './styles.scss';

function Sudoku() {

    const [board, setBoard] = useState([]);

    useEffect(() => {
        getSudokuData('easy');
    }, [])

    const getSudokuData = async (level) => {
        const _res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`);
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

    const generateGame = (level) => {
        getSudokuData(level);
    }
    return (
        <div className="sudoku-container">
            <NewGame generateGame={generateGame} />

            {board && board.length ?
                <SudokuGrid board={board} solveHandler={solveHandler} /> :
                <label>Loading...</label>
            }
        </div>
    );
}

export default Sudoku;
