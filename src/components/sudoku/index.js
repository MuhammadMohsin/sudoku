import { useEffect, useState } from 'react';
import SudokuGrid from './grid';
import NewGame from './newGame';
import { getBoard, solveBoard } from '../../services/api'
import './styles.scss';

function Sudoku() {

    const [board, setBoard] = useState([]);

    useEffect(() => {
        getSudokuData('easy');
    }, [])

    const getSudokuData = async (level) => {
        const {board} = await getBoard(level)
        setBoard(board);
    }

    const solveHandler = async (board) => {
        solveBoard(board)
    }

    const clearHandler = () => {
        const emptyArray = new Array(9).fill('').map(i => i = new Array(9).fill(''));
        setBoard(emptyArray)
    }

    const generateGame = (level) => {
        getSudokuData(level);
    }
    return (
        <div className="sudoku-container">
            <NewGame generateGame={generateGame} />

            {board && board.length ?
                <SudokuGrid board={board}
                    clearHandler={clearHandler} solveHandler={solveHandler} /> :
                <label>Loading...</label>
            }
        </div>
    );
}

export default Sudoku;
