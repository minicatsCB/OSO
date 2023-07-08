import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

const Button = styled.button`
    font-size: 4rem;
`;

export default function TurnButton({onClick}: any) {
    return (
        <Button type='button' onClick={onClick}>
            <FontAwesomeIcon icon={icon({name: 'arrows-turn-to-dots', style: 'solid'})} />
        </Button>
    );
}