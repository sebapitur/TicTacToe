import Square from "./Square";
import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom"

export default function Game({winner, setWinner}) {

    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];
    const [desc, setDesc] = useState(false)
    
    function jumpTo(nextMove) {
        setCurrentMove(nextMove);
      }

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    const initialMoves = history.map((squares, move) => {
        let description;
       

        // console.log(index)
        
        if (move > 0) {
            const last = history[move];
            const last2 = history[move - 1]
            let index = 0;
            
            for (let i = 0; i < last.length; i++) {
                if (last[i] !== last2[i]) {
                    index = i;
                }
            }
            
            const line = Math.floor(index / 3);
            const col = index % 3;
            
            description = `Go to move #${move} at position (${line}, ${col})`;
        } 
        else {
            description = 'Go to game start';
        }

        if (move === currentMove) {
            
            return ( 
                <li key={move}>
                    <span> You are on move #{move}</span>
                </li>);
        }


        return  ( 
                    <li key={move}>
                        <button onClick={() => jumpTo(move)}>{description}</button>
                    </li>
                );
    });

    const moves = desc ? initialMoves : initialMoves.reverse();
    if (winner === null) {
      return (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} setWinner={setWinner}/>
          </div>
          <div className="game-info">
             <button onClick={() => {
                    console.log('click sort');
                    console.log(desc);
                    setDesc(!desc)
                }}>Change sorting order</button>,
             <ol>{moves}</ol>
          </div>
        </div>
      );
    } else {
      return (
        <div className="game">
          <div className="game-board">
            <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} setWinner={setWinner}/>
            <Link to="/game-over">Finish game</Link>
          </div>
          <div className="game-info">
             <button onClick={() => {
                    console.log('click sort');
                    console.log(desc);
                    setDesc(!desc)
                }}>Change sorting order</button>,
             <ol>{moves}</ol>
          </div>
        </div>
      );
    }
    
}

export function Board({xIsNext, squares, onPlay, setWinner}) {
    const [winner, winningSquares] = calculateWinner(squares);
    // const navigate = useNavigate();
  
    let status;
    if (winner) {
        status = "Winner: " + winner;
        setWinner(winner);
    } else {
        status = "Next player: " + (xIsNext ? "X" : "O");
    }
  
    function handleClick(i) {
        if (calculateWinner(squares)[0] || squares[i]) {
            return;
          }
          const nextSquares = squares.slice();
          if (xIsNext) {
            nextSquares[i] = "X";
          } else {
            nextSquares[i] = "O";
          }
          onPlay(nextSquares);
    }

    return (
      <div>
        <div className="status">{status}</div>
        {
            [0, 1, 2].map((row) => {
                return (<div className="board-row" key={row}>
                        {
                            [0, 1, 2].map(element => {
                                const index = row * 3 + element;
                                let winning = false;

                                if (winningSquares && winningSquares.includes(index)) {
                                    winning = true;
                                }

                                return (
                                    <Square key={index} value={squares[index]} onSquareClick={() => handleClick(index)} winning={winning}/>
                                );
                            })
                        }
                        </div>);
            })
        }
      </div>
    );

    function calculateWinner(squares) {
        const lines = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
        ];
        for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
          }
        }
        return [null, null];
      }
  }