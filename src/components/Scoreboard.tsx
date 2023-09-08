import { Player, Scores } from "../core/models";

export default function Scoreboard({scores}: {scores: Scores}) {
    return (
        <>
            <ul>
                {scores.map((s: Player) => (
                    <li key={s.name}>{s.name}: {s.points}</li>
                ))}
            </ul>
        </>
    );
}