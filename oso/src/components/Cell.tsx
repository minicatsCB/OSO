import styled from 'styled-components'

const Button = styled.button`
    background-color: white;
`;

export default function Cell({className, text}: {[key: string]: string}) {
    return (
        <Button type="button" className={className}>{text}</Button>
    );
}