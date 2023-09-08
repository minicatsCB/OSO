import { Score, Scores } from "../core/models";

export default function ScorePanel({scores}: {scores: Scores}) {
    return (
        <>
            <ul>
                {scores.map((s: Score) => (
                    <li key={s.name}>{s.name}: {s.points}</li>
                ))}
            </ul>
        </>
    );
}