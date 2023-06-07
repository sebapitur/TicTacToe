import React from "react";
import {Link} from "react-router-dom"

export default function GameOver({winner}) {
    return <div>
        <div> The game is over and the winner is {winner} </div>
        <Link to="/">Home</Link>
    </div>
}