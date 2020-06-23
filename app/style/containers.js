import styled from 'styled-components';
import { css } from 'styled-components';
import colors from '../style/colors';

export const sizes = {
    large: 1920,
    big: 1200,
    desktop: 991,
    tablet: 767,
    mobile: 375
}

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((accumulator, label) => {
    // use em in breakpoints to work properly cross-browser and support users
    // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
    const emSize = sizes[label]
    accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}px) {
      ${css(...args)}
    }
    
  `
    return accumulator
}, {})

export const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    max-width: 100%;
    display:block;
    &:after, &:before  {
        content: " ";
        display: table;
    }
    &:after {
        clear: both;
    }
    ${media.big`
        width: 1180px;
        max-width: 1180px;`}
    
    ${media.desktop` 
        width: 980px;
        max-width: 100%;`}
    ${media.tablet`

        width: 760px;
        max-width: 100%;`}
   
    
  
    
`;

export const ContainerFluid = styled.div`
    margin-right: auto;
    margin-left: auto;
    padding-left: 20px;
    padding-right: 20px;
    width:100%;
    position:relative;
    &:after, &:before  {
        content: " ";
        display: table;
    }
    &:after {
        clear: both;
    }
    ${media.desktop`
        padding-left: 20px;
        padding-right: 20px;`}
    ${media.mobile`
        padding:0;
        `}
    
`;

export const MainAppContainer = styled.div`
    &:after, &:before  {
        content: " ";
        display: table;
    }
    display:flex;
    position: relative;
    height: 100%;
    align-items: flex-start;
    justify-content: flex-start;

`;

export const AppContainer = styled.div`
  margin-left: 100px;
  width: 100%;
`;

export const CenteredContainer = styled.div`
     width: 100%;
     padding:1em;
     display:flex;
     position: absolute;
     min-height: 80vh;
     align-items: center;
     justify-content: center;

    ${media.desktop`
        min-height: 80vh;`}
   ${media.mobile`
    min-height: 100%;`}  
     
`;

export const FormContainer = styled.div`
    flex: 0 .4 40%;
    padding:2em 2em 0.5em;
    width:100%;
    padding: 3em;
    display:flex;
    background: red;
    align-items: center;
    ${media.desktop`
        flex: 0 auto;
        padding: 2em;
        width: auto;
        justify-content: center;
    `}
    ${media.tablet`
            flex: 0 auto;
            width: auto;
    `}
    
`;
