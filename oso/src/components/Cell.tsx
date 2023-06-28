import styled from 'styled-components'
import { useContext } from 'react';
import { GameContext } from './Game';

const Button = styled.button`

`;

export default function Cell({className, index, onClick}: any) {
    const value = useContext(GameContext);

    const text = value?.at(index);

    return (
        <Button type="button" className={className} onClick={onClick}>{text}</Button>
    );
}