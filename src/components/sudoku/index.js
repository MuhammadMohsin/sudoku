import { useEffect, useState } from 'react';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import SudokuGrid from './grid';
import NewGame from './newGame';
import { getBoard, solveBoard, validateBoard } from '../../services/api'
import './styles.scss';

function Sudoku() {

    const [board, setBoard] = useState([]);
    const [snackbarAlert, setSnackbarAlert] = useState({ open: false, message: '' });

    useEffect(() => {
        getSudokuData('easy');
    }, [])

    const handleAlert = (isOpen = 'false', message = '') => {
        setSnackbarAlert((prev) => [{ open: isOpen, message }])
    }

    const getSudokuData = async (level) => {
        const { board } = await getBoard(level)
        setBoard(board);
    }

    const solveHandler = async (board) => {
        const { solution } = await solveBoard(board);
        setBoard(solution);
    }

    const clearHandler = () => {
        const emptyArray = new Array(9).fill('').map(i => i = new Array(9).fill(''));
        setBoard(emptyArray)
    }

    const generateGame = (level) => {
        getSudokuData(level);
    }

    const validateHandler = async (board) => {
        const { status } = await validateBoard(board);
        console.log(status);
        handleAlert(true, status);
    }

    return (
        <div className="sudoku-container">
            <NewGame generateGame={generateGame} />

            {board && board.length ?
                <SudokuGrid board={board} validateHandler={validateHandler}
                    clearHandler={clearHandler} solveHandler={solveHandler} /> :
                <label>Loading...</label>
            }

            {/* <Snackbar
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                open={snackbarAlert}
                autoHideDuration={3000}
                TransitionProps={{ onExited: handleAlert() }}
                message={snackbarAlert.message || ""}
            /> */}
        </div>
    );
}

export default Sudoku;
