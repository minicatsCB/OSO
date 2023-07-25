import { Scores } from "../core/models";

export default function Info({activePlayer, scores}: {activePlayer: string, scores: Scores}) {
    return (
        <>
            <p>It's {activePlayer}'s turn</p>
            <ul>
                {Object.keys(scores).map((playerName: string) => (
                    <li key={playerName}>{playerName}: {scores[playerName]}</li>
                ))}
            </ul>
        </>
    );
}