export default function History({ history, onJump }: {history: [][], onJump: any}) {
    const historyIsEmpty: boolean = history.every(record => record.length === 0);

    return (
        <>
            <h1>History</h1>
            <ol>
                {!historyIsEmpty && history.map((cells: Array<string>, move: number) => {
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