import React from 'react'; // eslint-disable-line no-unused-vars
import {FormattedNumber} from 'react-intl';
import styled from 'styled-components';
import trans from 'trans';

const Currency = styled.span`
padding-left:4px;

`;
export default (v, curr,digits=2) => (
  <span>
    {curr && curr === 'USD' && (
      <Currency>{trans(`currency.${curr}`)}</Currency>
    )}
    <FormattedNumber
      minimumFractionDigits={digits}
      maximumFractionDigits={digits}
      useGrouping={false}
      value={v}
    />
    {curr && curr !== 'USD' && (
      <Currency>{trans(`currency.${curr}`)}</Currency>
    )}
  </span>
);
