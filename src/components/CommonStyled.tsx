import styled from "styled-components";

export const Action = styled.button`
    font-size: 4rem;
    background-color: white;
    margin-right: 10px;
    min-width: 90px;
    min-height: 90px;

    &.active {
        background-color: blue;
    }
`;