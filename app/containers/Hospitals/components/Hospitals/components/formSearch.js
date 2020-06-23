import React, { PureComponent } from 'react'
import trans from 'trans'
import PropTypes from 'prop-types';
import TextFieldSearch from 'components/ReduxForm/TextFieldSearch'
import ContainedButtonSmall from '../../../../../components/ContainedButtonSmall'
import { withStyles } from '@material-ui/core/styles/index'
import injectReducer from 'utils/injectReducer'
import reduxForm from 'hocs/reduxForm'
import formReducer from './reducer'
import { compose } from 'redux'
import SearchIcon from '../../../../../components/Img/ico-Search.svg'
import styled from 'styled-components'
import colors from '../../../../../style/colors'
import Button from '@material-ui/core/Button';
import CloseIcon from '@material-ui/icons/Close';
import Close from '../../../../../components/Img/ico-Close.svg'


const Search = styled.div`
    height: 16px;
    width: 16px;
    background: url(${SearchIcon});
    background-repeat: no-repeat; 
    background-size: contain;  
`
const styles = {
    form: {
        position: 'relative',
        flex: '0 0.20 20%',
    },
    formRow:{
        position: 'relative',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonContainer:{
        width: 'auto',
        position: 'absolute',
        right: 0,
    },
    searchButton:{
        width: '30px',
        height: 36,
        minWidth: 40,
        background: 'transparent',
        fontSize: 16,
        color: '#666666',
        fontWeight: '100',
        boxShadow: 'none',
        borderRadius: '0 5px 5px 0',
        '&:hover': {
            color: '#fff',
            backgroundColor: '#3750ff',
            boxShadow: 'none',
        },
        '&.active': {
            color: '#fff',
            background: '#3750ff',
            boxShadow: 'none',
        },
    },
    clearButton:{
        width:  30,
        height: 30,
        minWidth: 30,
        fontSize: 10,
        color: colors.fontMenu,
        background: 'transparent',
        boxShadow: 'none',
        position: 'absolute',
        right: 40,
        '&:hover': {
            color: colors.fontTable,
            background: 'transparent',
            boxShadow: 'none',
        },
        '&:active': {
            color: colors.fontTable,
            background: 'transparent',
            boxShadow: 'none',
        },
    },

};

class FormSearch extends PureComponent {

    state = {
        showBtnReset: false,
        wasSearch: false
    }

    handleSearch = (event) => {
        event.preventDefault();
        const {onSearch, formData, } = this.props;
        if (formData.searchText) {
            onSearch(formData.searchText)
            this.setState({wasSearch: true});
        }
    }

    resetSearch = () => {
        const {onSearch, reset, formData} = this.props;
        const {wasSearch} = this.state;

        if (formData.searchText) {
            this.setState({showBtnReset: false});
            reset();
            if(wasSearch) {
                onSearch();
                this.setState({wasSearch: false});
            }

        }
    }

    hadleOnChange = (event) => {
        if (event.target.value) {
            this.setState({showBtnReset: true});
        } else {
            this.setState({showBtnReset: false});
        }

    }

    render () {
        const { classes } = this.props;
        const { showBtnReset } = this.state;
        return (

            <form onSubmit={this.handleSearch} className={classes.form}>
                <div className={classes.formRow}>
                    <TextFieldSearch name="searchText" onChange={this.hadleOnChange} type="text"  label={trans('admin.panel.hospitals.search.title')} fullWidth />
                    { showBtnReset &&
                        <Button variant="fab" onClick={this.resetSearch} classes={{root: classes.clearButton,}} disableRipple><div className="icon-ico-Close"/></Button>
                    }

                    <ContainedButtonSmall type="submit" className={classes.searchButton}
                                          classes={{buttonContainer: classes.buttonContainer,}}
                    ><div className="icon-ico-Search"/></ContainedButtonSmall>
                </div>
            </form>
        )
    }
}

FormSearch.propTypes = {
    classes: PropTypes.object.isRequired,
};

const withReducer = injectReducer({key: 'formSearch', reducer: formReducer})

export default compose(
    reduxForm('SearchForm'),
    withReducer,
    withStyles(styles),
)(FormSearch)