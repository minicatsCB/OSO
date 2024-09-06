import styled from 'styled-components'
import { useEffect, useRef } from 'react';
import { SECOND_CLICK_WAIT_TIME } from '../core/constants';

const Button = styled.button`
    background-color: white;
    font-size: 3rem;
    border: 2px dashed #000;
    font-family: 'Nanum Pen Script';
    aspect-ratio: 1 / 1;
`;

export default function Cell({ index, value, onClick, isDisabled }: any) {
    const timer = useRef<number | undefined>(undefined);

    // Runs on mount and on every re-render
    useEffect(() => {
        return () => {
            if (timer.current) {
                clearTimeout(timer.current);
                timer.current = undefined;
            }
        };
    });

    function onClickHandler(event: React.MouseEvent<HTMLButtonElement>) {
        if (value) {
            onClick(index, 1);
            return;
        };

        event.preventDefault();
        event.stopPropagation();

        clearTimeout(timer.current);

        if (event.detail === 1) {
            timer.current = window.setTimeout(
                () => {
                    onClick(index, 1);
                },
                SECOND_CLICK_WAIT_TIME
            );
        } else if (event.detail === 2) {
            onClick(index, 2);
        }
    }

    return (
        <Button type="button" onClick={onClickHandler} disabled={isDisabled}>{value}</Button>
    );
}