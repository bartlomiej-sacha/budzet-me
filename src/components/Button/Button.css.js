import styled from 'styled-components'

//tam w theme to jhest destukryzacja propsa theme zeby wziac color od razu oraz oczekiwanie na propsa primary jesli button bedzie w propsach mial to albo onclick albo type submity to bedzie pointer styled ma scss
const RootButton = styled.button`
color: ${({ theme: { colors }, primary }) => primary ? colors.gray.light : colors.pink.normal};  
cursor: inherit;
border: none; 
background-color: transparent; 
cursor: ${props => props.to || props.onClick || props.type === 'submit' ? 'pointer' : 'default'};

&:hover {
    opacity: .8;
}
`;


export const InlineButton = styled(RootButton)`
&:hover {
    text-decoration: underline;
}

`
export const RegularButton = styled(RootButton)` 
background: ${({ theme, primary }) => primary ? theme.colors.pink.normal : theme.colors.gray.light};
margin: ${({ theme }) => `${theme.spacing.xs / 2}px`}; 
padding: ${({ theme }) => `${theme.spacing.xs / 2}px ${theme.spacing.xs}px`};
border: ${({ theme }) => `2px solid ${theme.colors.pink.normal}`}; 
border-radius: 3px;
`;