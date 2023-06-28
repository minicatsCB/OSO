export default function History({ history, jumpTo }: any) {
    return (
        <>
            <h1>History</h1>
            <ol>
                {history.map((cells: Array<string>, move: number) => {
                    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
                    return (
                        <li key={move}>
                            <button onClick={() => jumpTo(move)}>{description}</button>
                        </li>
                    );
                })}
            </ol>
        </>
    );
}