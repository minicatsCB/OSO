import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'
import { Action } from './CommonStyled';

export default function MarkButton({onClick, isActive}: any) {
    return (
        <Action data-testid="mark-btn" type='button' onClick={onClick} className={isActive ? 'active' : ''}>
            <FontAwesomeIcon icon={icon({name: 'highlighter', style: 'solid'})} />
        </Action>
    );
}