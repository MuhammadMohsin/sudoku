export const getBoard = async (level) => {
    try {
        const _res = await fetch(`https://sugoku.herokuapp.com/board?difficulty=${level}`);
        return await _res.json();
    }
    catch (err) {
        console.log(err);
        return [];
    }
}

export const solveBoard = async (board) => {
    try {
        const _res = await fetch("https://sugoku.herokuapp.com/solve", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        });
        return await _res.json();
    }
    catch (err) {
        console.log(err);
        return [];
    }
}