import styled from 'styled-components'
import { useEffect, useRef, useState } from 'react';
import { O_TOKEN, S_TOKEN, SECOND_CLICK_WAIT_TIME } from '../core/constants';

const Button = styled.button`
    background-color: white;
    font-size: 3rem;
    border: 2px dashed #000;
    font-family: 'Nanum Pen Script';
    aspect-ratio: 1 / 1;
`;

export default function Cell({ index, onClick, isDisabled }: any) {
    const [token, setToken] = useState<string>('');
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
        if (token) {
            onClick({ index, token });
            return;
        };

        event.preventDefault();
        event.stopPropagation();

        clearTimeout(timer.current);

        if (event.detail === 1) {
            timer.current = window.setTimeout(
                () => {
                    setToken(O_TOKEN);
                    onClick({ index, token: O_TOKEN });
                },
                SECOND_CLICK_WAIT_TIME
            );
        } else if (event.detail === 2) {
            setToken(S_TOKEN);
            onClick({ index, token: S_TOKEN });
        }
    }

    return (
        <Button type="button" onClick={onClickHandler} disabled={isDisabled}>{token}</Button>
    );
}