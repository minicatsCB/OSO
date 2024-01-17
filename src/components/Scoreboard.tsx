import { Player, Scores } from "../core/models";

export default function Scoreboard({scores}: {scores: Scores}) {
    return (
        <>
            <ul>
                {scores.map((s: Player) => (
                    <li key={s.name}><span>{s.name}: {s.points}</span></li>
                ))}
            </ul>
        </>
    );
}