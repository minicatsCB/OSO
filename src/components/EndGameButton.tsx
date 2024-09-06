import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Action } from './CommonStyled';

export default function EndGameButton({onClick}: any) {
    return (
        <Action data-testid="end-game-btn" type='button' onClick={onClick}>
            <FontAwesomeIcon icon={icon({name: 'flag-checkered', style: 'solid'})} />
        </Action>
    );
}