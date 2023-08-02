export default function History({ length, currentMove, onJump }: {length: number, currentMove: number, onJump: any}) {
    return (
        <>
            <h1>History</h1>
            <ol>
                {length !== 0 && Array.from(Array(length).keys()).map((move: number) => {
                    const description: string = `Go to move #${move}`;
                    const lastMove: number = length - 1;
                    const isDisabled: boolean = (move === lastMove) && (currentMove === lastMove);
                    return (
                        <li key={move}>
                            <button type="button" onClick={() => onJump(move)} disabled={isDisabled}>{description}</button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}