export default function History({ length, onJump }: {length: number, onJump: any}) {
    return (
        <>
            <h1>History</h1>
            <ol>
                {length !== 0 && Array.from(Array(length).keys()).map((move: number) => {
                    const description: string = `Go to move #${move}`;
                    return (
                        <li key={move}>
                            <button type="button" onClick={() => onJump(move)}>{description}</button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}