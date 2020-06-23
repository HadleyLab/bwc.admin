import styled from 'styled-components'
import colors from '../../style/colors'

export default styled.div`
    height: 18px;
    width: 18px;
    font-size: 1.5em;
    padding: 5px 0;
    display: block;
    box-sizing: border-box;
    width: 100%;
    color: ${colors.fontMenu};
      &:hover {
        color: rgba(225,225, 225, 0.5);
      }
      &:active, &:focus {
        border-left: 3px solid ${colors.white};
        cursor:pointer;
      }
      ${ ({ active }) => active ? `
        color: ${colors.white};
        ` : ``
        }
`