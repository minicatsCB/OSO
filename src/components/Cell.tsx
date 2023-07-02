import styled from 'styled-components'
import { useContext } from 'react';
import { GameContext } from './Game';

const Button = styled.button`
    background-color: white;
    font-size: 4rem;
`;

export default function Cell({className, index, onClick}: any) {
    const value: string[] = useContext(GameContext);

    const text: string = value.at(index) || '';

    return (
        <Button type="button" className={className} onClick={onClick}>{text}</Button>
    );
}