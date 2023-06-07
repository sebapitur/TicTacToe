import React from "react";

export default function Square({value, onSquareClick, winning}) {
    if (!winning) {
        return <button 
        onClick={onSquareClick}
        className="square"> {value} </button>;
    } 

    return <button 
        onClick={onSquareClick}
        className="winner-square"> {value} </button>;
    
}