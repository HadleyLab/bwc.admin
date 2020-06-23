import React, { PureComponent } from 'react'
import { FormContainer, media } from 'style/containers'
import trans from 'trans'
import TextField from 'components/ReduxForm/TextField'
import ErrorText from 'components/ErrorText'
import ContainedButton from '../../../../components/ContainedButton'
import Actions from 'components/Actions'
import FullColumn from 'components/FullColumn'
import Link from 'components/Link'
import FlexCover from 'components/FlexCover'
import { withStyles } from '@material-ui/core/styles/index'
import styled from 'styled-components'
import colors from '../../../../style/colors'
import BgImg from 'components/Img/BG.png'

const FormTitle = styled.h2`
    color:${colors.fontDark};
    text-align: center;
    font-size:1.7em;
    font-weight:100;
    margin:.5em 0 1em;
`
const ImgCover = styled.div`
  height:100%;
  flex: 0 .6 60%;
  background: url(${BgImg});
  background-size: cover;
  background-repeat: no-repeat;
  ${media.desktop`
    display: none;
  `}
`
const styles = ({
    loginCover:{
        height: '100%',
        width: '100%',
        display: 'flex',
    },
    formCover:{
        width: '100%',
        flex: '0 .4 40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    cssForm:{
        width: 380,
        maxWidth: '100%',
        margin: '0 auto',
    },
    errorText:{
        fontSize:16,
        fontWeight: 200,
        textAlign: 'center',
        marginBottom: '2.2em',
    }
})

class LoginStep extends PureComponent {
  render () {
    const {error, onLogin, submitting, valid, handleSubmit, classes} = this.props
    return (
      <div className={classes.loginCover}>
          <ImgCover/>
          <div className={classes.formCover}>
              <form onSubmit={handleSubmit(onLogin)} className={classes.cssForm}>
                <FormTitle>{trans('admin.panel.form.title')}</FormTitle>
                  {error && (
                      <ErrorText  classes={{root: classes.errorText}}>{error}</ErrorText>
                  )}
                <FlexCover>
                  <FullColumn>
                    <TextField name="email" type="email" label={trans('admin.panel.form.login')} fullWidth/>
                  </FullColumn>
                  <FullColumn>
                    <TextField name="password" type="password" label={trans('forms.registration.Password')} fullWidth/>
                  </FullColumn>

                  <Actions>
                    <ContainedButton type="submit" variant='contained'
                            disabled={!valid || submitting} color="primary">{trans('admin.panel.form.sign.me')}</ContainedButton>
                  </Actions>
                </FlexCover>
              </form>
          </div>
      </div>
    )
  }
}

export default withStyles((styles))(LoginStep)