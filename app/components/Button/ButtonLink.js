import {Link} from 'react-router-dom'
import styled from 'styled-components';

const ButtonLink = styled(Link)`
  color: #fff;
  background: #46658E;
  text-decoration:none;
  padding: 8px 16px;
  min-width: 88px;
  font-size: 0.875rem;
  box-sizing: border-box;
  min-height: 36px;
  transition: background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  line-height: 1.4em;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 500;
  border-radius: 2px;
  text-transform: uppercase;
  cursor: pointer;
    border: 0;
    display: inline-flex;
    outline: none;
    position: relative;
    user-select: none;
    align-items: center;
    border-radius: 0;
    vertical-align: middle;
    justify-content: center;
    -moz-appearance: none;
    text-decoration: none;
    -webkit-appearance: none;
    -webkit-tap-highlight-color: transparent;
    box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12);
  &:hover {
    color: #fff;
    background: #002884;
  }
`;

export default ButtonLink;