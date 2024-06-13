import styled from "styled-components";
import { Player, Scores } from "../core/models";

const Score = styled.li`
    font-size: 2rem;
    background-color: white;
`;

export default function Scoreboard({scores}: {scores: Scores}) {
    return (
        <>
            <ul>
                {scores.map((s: Player) => (
                    <Score key={s.name}><span>{s.name}: {s.points}</span></Score>
                ))}
            </ul>
        </>
    );
}