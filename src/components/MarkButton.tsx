import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Action } from './CommonStyled';

export default function MarkButton({onClick}: any) {
    return (
        <Action data-testid="mark-btn" type='button' onClick={onClick}>
            <FontAwesomeIcon icon={icon({name: 'highlighter', style: 'solid'})} />
        </Action>
    );
}