const style = { marginTop: '32px' }

export default function Status({message}: {message: string}) {
    return(
        <p style={style}>{message}</p>
    );
}