import styled from 'styled-components'
import { media } from 'style/containers'

export default styled.div`
    display:flex;
    flex-flow:row wrap;
    flex:0 auto;
    width:100%;
    align-items:center;
    justify-content:space-between;
    ${media.mobile`
        flex-flow:column wrap;
        justify-content:center;
         width: 100%;
    `}
    ${media.tablet` 
        flex-flow:row wrap;
        justify-content:space-between;
    `}
`