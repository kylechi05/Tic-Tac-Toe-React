import './App.css';
import React, {useState} from 'react';

const Square = ({value, onSquareClick}) => {
    return (
        <button className='square' onClick={onSquareClick}>
            {value}
        </button>
    );
};

const RestartButton = ({display, onRestartClick}) => {
    return (
        <button className='restart' onClick={onRestartClick} style={{display: display}}>
            Play Again?
        </button>
    );
};

const Status = ({status}) => {
    return (
        <h2 className='player-turn'>
            {status}
        </h2>
    );
}

const App = () => {
    const win = [[0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]];

    const [show, setShow] = useState('none');
    const [gameOver, setGameOver] = useState(false);
    const [gameBoard, setGameBoard] = useState(Array(9).fill(null));
    const [player, setPlayer] = useState('X');
    const [gameStatus, setGameStatus] = useState("X's Turn");

    const handleSquareClick = (index) => {
        if (gameOver || gameBoard[index]) {return;}

        const nextBoard = gameBoard.slice();
        nextBoard[index] = player;
        setGameBoard(nextBoard);

        if (player === 'X') {
            setPlayer('O');
            setGameStatus("O's Turn");
        } else {
            setPlayer('X');
            setGameStatus("X's Turn");
        }
        checkOver(nextBoard);
    };

    const checkOver = (board) => {
        win.forEach((row) => {
            const [a, b, c] = row;
            if (board[a] && board[a] == board[b] && board[a] == board[c]) {
                setGameOver(true);
                endStatus(true);
            }
        });

        if (board.every((element) => element !== null)) {
            setGameOver(true);
            endStatus(false);
        }
    };

    const endStatus = (wl) => {
        wl === true ? setGameStatus(player + ' Wins') : setGameStatus('Tie Game');
        setShow('inline');
    };

    const handleRestartClick = () => {
        setGameOver(false);
        setPlayer('X');
        setGameStatus("X's Turn");
        setGameBoard(Array(9).fill(null));
        setShow('none');
    };

    return (
        <>
          <div className='status-box'>
                <h1 className='title'>Tic Tac Toe</h1>
                <Status status={gameStatus}/>
                <RestartButton onRestartClick={handleRestartClick} display={show}/>
            </div>
            <div className='game-box'>
                <Square value={gameBoard[0]} onSquareClick={() => handleSquareClick(0)} />
                <Square value={gameBoard[1]} onSquareClick={() => handleSquareClick(1)} />
                <Square value={gameBoard[2]} onSquareClick={() => handleSquareClick(2)} />
                <Square value={gameBoard[3]} onSquareClick={() => handleSquareClick(3)} />
                <Square value={gameBoard[4]} onSquareClick={() => handleSquareClick(4)} />
                <Square value={gameBoard[5]} onSquareClick={() => handleSquareClick(5)} />
                <Square value={gameBoard[6]} onSquareClick={() => handleSquareClick(6)} />
                <Square value={gameBoard[7]} onSquareClick={() => handleSquareClick(7)} />
                <Square value={gameBoard[8]} onSquareClick={() => handleSquareClick(8)} />
            </div>
        </>
    );
};

export default App;