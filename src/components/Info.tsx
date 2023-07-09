import { Score } from "../core/models";

export default function Info({activePlayer, scores}: {activePlayer: string, scores: Array<Score>}) {
    return (
        <>
            <p>It's {activePlayer}'s turn</p>
            <ul>
                {scores.map((val: Score) => (
                    <li key={val.player}>{val.player}: {val.points}</li>
                ))}
            </ul>
        </>
    );
}