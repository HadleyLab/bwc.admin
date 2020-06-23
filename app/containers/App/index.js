/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react'
import { Helmet } from 'react-helmet'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'

import Login from 'containers/Login/Loadable'
import Hospitals from 'containers/Hospitals/Loadable'
import EditHospitals from 'containers/EditHospitals/Loadable'
import FindHospital from 'containers/FindHospital/Loadable'
import Users from 'containers/Users/Loadable'
import Transfer from 'containers/Transfer/Loadable'
import Annotation from 'containers/Annotation/Loadable'
import DicomsAssigned  from 'containers/DicomsAssigned/Loadable'
import DicomsPending from 'containers/DicomsPending/Loadable'
import NotFoundPage from 'containers/NotFoundPage/Loadable'
import FlexedContainer from 'components/FlexedContainer'
import SideBar from "components/SideBar";
import isGuest from 'utils/isGuest'

import Footer from 'components/Footer'
import trans from '../../trans'
import { createMuiTheme } from '@material-ui/core/styles';
import '../../app.global.css';

const AppWrapper = styled.div`
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  flex-direction: column;
`

export default function App (props) {

    const { history } = props;
    const currentUrl = history.location.pathname

    const ulrsOnlyAuth = [
        "/hospitals", "/notactivehospitals", "/users", "/transfer", "/annotation", "/dicoms"
    ];

    let sideBar = (
        <SideBar history={history}/>
    )
    let mainPage = Transfer;

    if (isGuest() || currentUrl.indexOf('edithospitals') >= 0) {
        sideBar = null;
        mainPage = Login;
    }

    if (isGuest()) {
        for (let key in ulrsOnlyAuth) {
            let url = ulrsOnlyAuth[key];
            if (currentUrl.indexOf(url) >= 0) {
                history.push('/');
            }
        }
    }

  return (
    <AppWrapper>
      <Helmet
        titleTemplate={trans('app.title')}
        defaultTitle={trans('app.description')}
      >
        <meta name="description" content={trans('app.description')}/>
      </Helmet>
        <FlexedContainer>
          {sideBar}
          <Switch>
            <Route exact path="/" component={mainPage}/>
            <Route path="/login" component={Login}/>
            {/*<Route path="/hospitals" component={Hospitals}/>*/}
            <Route path="/hospitals" render={(props) => (
                <Hospitals {...props} typeList={"active"}/>
            )} />
            <Route path="/notactivehospitals" render={(props) => (
                <Hospitals {...props} typeList={"notActive"}/>
            )} />
            <Route path="/edithospitals/:hash" component={EditHospitals}/>
            <Route path="/redefinition/hospital/:old" component={FindHospital}/>
            <Route path="/users" component={Users}/>
            <Route path="/transfer" component={Transfer}/>
            <Route path="/annotation" component={Annotation}/>
            <Route path="/dicoms/assigned" component={DicomsAssigned}/>
            <Route path="/dicoms/pending" component={DicomsPending}/>
            <Route path="" component={NotFoundPage}/>
          </Switch>
          <Footer/>
        </FlexedContainer>
    </AppWrapper>
  )
}
