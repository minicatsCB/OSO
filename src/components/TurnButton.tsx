import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Action } from './CommonStyled';

export default function TurnButton({onClick, isDisabled}: any) {
    return (
        <Action data-testid="turn-btn" type='button' onClick={onClick} disabled={isDisabled}>
            <FontAwesomeIcon icon={icon({name: 'arrows-turn-to-dots', style: 'solid'})} />
        </Action>
    );
}