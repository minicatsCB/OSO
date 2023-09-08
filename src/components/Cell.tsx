import styled from 'styled-components'
import { useContext, useRef } from 'react';
import GameContext from '../core/gameContext';
import { SECOND_CLICK_WAIT_TIME } from '../core/constants';

const Button = styled.button`
    background-color: white;
    font-size: 4rem;
`;

export default function Cell({className, index, onClick}: any) {
    const value: string[] = useContext(GameContext);
    const timer = useRef<number | undefined>(undefined);

    function onClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
        clearTimeout(timer.current);

        if (event.detail === 1) {
            timer.current = window.setTimeout(() => onClick(index, 1), SECOND_CLICK_WAIT_TIME);
        } else if (event.detail === 2) {
            onClick(index, 2);
        }
    }

    const text: string = value.at(index) || '';

    return (
        <Button type="button" className={className} onClick={onClickHandler}>{text}</Button>
    );
}