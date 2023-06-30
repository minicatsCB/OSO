export default function History({ history, onJump }: any) {
    return (
        <>
            <h1>History</h1>
            <ol>
                {history.map((cells: Array<string>, move: number) => {
                    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
                    return (
                        <li key={move}>
                            <button onClick={() => onJump(move)}>{description}</button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}