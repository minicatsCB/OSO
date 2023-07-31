import { Scores } from "../core/models";

export default function ScorePanel({scores}: {scores: Scores}) {
    return (
        <>
            <ul>
                {Object.keys(scores).map((playerName: string) => (
                    <li key={playerName}>{playerName}: {scores[playerName]}</li>
                ))}
            </ul>
        </>
    );
}