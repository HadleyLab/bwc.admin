import styled from 'styled-components'
import { media } from 'style/containers'

export default styled.div`
    flex: 0 .15 15%;
    margin:.5em 0;
    ${media.mobile`
    flex-flow:column wrap;
    justify-content:center;
    > div {
        margin:1em 0;
        width: 100%;
    }
    `}
    ${media.tablet` 
    flex-flow:row wrap;
    justify-content:space-between;
    `}
`