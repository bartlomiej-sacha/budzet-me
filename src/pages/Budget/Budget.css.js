import styled from 'styled-components';

//ciekawy motyw dzielim miejsc na 4/12 i 8/12
export const Grid = styled.div`
 display: flex;
 section:nth-child(1) {
     flex: 4;
 }
 section:nth-child(2) {
    flex: 8;
 }
`