import React, { PureComponent } from 'react'
import { FormContainer } from 'style/containers'
import trans from 'trans'
import PropTypes from 'prop-types';
import styled from 'styled-components'
import colors from '../../style/colors'

export const EmailedIcon = styled.div`
    width: 13px;
    height: 13px;
    border-radius: 13px;
    margin: .5em;
    margin-right: 10px;
    background: ${colors.orangeEmailed};
    `;

export const ReceivedIcon = styled(EmailedIcon)`
    width: 13px;
    height: 13px;
    border-radius: 13px;
    margin: .5em;
    background: ${colors.orangeEmailed};
    `;

export const ProcessedIcon = styled(EmailedIcon)`
    width: 13px;
    height: 13px;
    border-radius: 13px;
    margin: .5em;
    background: transparent;
    border: 1px dashed ${colors.brandPrimary};
    `;

export const AvailableIcon = styled(EmailedIcon)`
    width: 13px;
    height: 13px;
    border-radius: 13px;
    margin: .5em;
    background: rgba(2, 206, 117, 0.96);
    `;
export const InitIcon = styled(EmailedIcon)`
    width: 13px;
    height: 13px;
    border-radius: 13px;
    margin: .5em;
    background: ${colors.fontPrimary};
    `;