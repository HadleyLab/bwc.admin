/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

// Needed for redux-saga es6 generator support
import 'babel-polyfill'
// Import all the third party stuff
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import FontFaceObserver from 'fontfaceobserver'
import createHistory from 'history/createBrowserHistory'
import 'sanitize.css/sanitize.css'
// Import root app
import App from 'containers/App'
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider'
// Load the favicon, the manifest.json file and the .htaccess file
/* eslint-disable import/no-webpack-loader-syntax */
import '!file-loader?name=[name].[ext]!./images/favicon.ico'
import '!file-loader?name=[name].[ext]!./images/icon-72x72.png'
import '!file-loader?name=[name].[ext]!./images/icon-96x96.png'
import '!file-loader?name=[name].[ext]!./images/icon-120x120.png'
import '!file-loader?name=[name].[ext]!./images/icon-128x128.png'
import '!file-loader?name=[name].[ext]!./images/icon-144x144.png'
import '!file-loader?name=[name].[ext]!./images/icon-152x152.png'
import '!file-loader?name=[name].[ext]!./images/icon-167x167.png'
import '!file-loader?name=[name].[ext]!./images/icon-180x180.png'
import '!file-loader?name=[name].[ext]!./images/icon-192x192.png'
import '!file-loader?name=[name].[ext]!./images/icon-384x384.png'
import '!file-loader?name=[name].[ext]!./images/icon-512x512.png'
import '!file-loader?name=[name].[ext]!./manifest.json'
import 'file-loader?name=[name].[ext]!./.htaccess' // eslint-disable-line import/extensions
import configureStore from './configureStore'
// Import i18n messages
import { translationMessages } from './i18n'
// Import CSS reset and Global Styles
import './global-styles'

import 'moment/locale/en-gb'
import MomentUtils from 'components/material-ui-pickers/utils/moment-utils'
import MuiPickersUtilsProvider from 'components/material-ui-pickers/utils/MuiPickersUtilsProvider'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#7E8EFD',
      main: '#5F73FF',
      dark: '#3750FF',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    error: {
        light: '#ff7961',
        main: '#E5082C',
        dark: '#ba000d',
        contrastText: '#000',
    },
  },
typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: [
        'Open Sans',
        'sans-serif',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
    ].join(','),
},
})

/* eslint-enable import/no-webpack-loader-syntax */

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const openSansObserver = new FontFaceObserver('Open Sans', {})

// When Open Sans is loaded, add a font-family using Open Sans to the body
openSansObserver.load().then(() => {
  document.body.classList.add('fontLoaded')
}, () => {
  document.body.classList.remove('fontLoaded')
})

// Create redux store with history
const initialState = {}
const history = createHistory()
const store = configureStore(initialState, history)
const MOUNT_NODE = document.getElementById('app')

const render = (messages) => {
  ReactDOM.render(
    <Provider store={store}>

      <MuiThemeProvider theme={theme}>
        <LanguageProvider messages={messages}>
          <ConnectedRouter history={history}>
            <MuiPickersUtilsProvider utils={MomentUtils}>
              <App history={history}/>
            </MuiPickersUtilsProvider>
          </ConnectedRouter>
        </LanguageProvider>
      </MuiThemeProvider>

    </Provider>
    ,
    MOUNT_NODE,
  )
}

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept(['./i18n', 'containers/App'], () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE)
    render(translationMessages)
  })
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(import('intl'))
  }))
    .then(() => Promise.all([
      import('intl/locale-data/jsonp/en.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err
    })
} else {
  render(translationMessages)
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
if (process.env.NODE_ENV === 'production') {
  require('offline-plugin/runtime').install() // eslint-disable-line global-require
}
