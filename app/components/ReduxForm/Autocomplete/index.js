import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import ClearIcon from '@material-ui/icons/Clear';
import Select from 'react-select';
import './style.css';
import { Field } from 'redux-form/immutable'
import { FormControl } from '@material-ui/core'

class Option extends React.Component {
    handleClick = event => {
        this.props.onSelect(this.props.option, event);
    };

    render() {
        const { children, isFocused, isSelected, onFocus } = this.props;

        return (
            <MenuItem
                onFocus={onFocus}
                selected={isFocused}
                onClick={this.handleClick}
                component="div"
                style={{
                    fontWeight: isSelected ? 500 : 400,
                }}
            >
                {children}
            </MenuItem>
        );
    }
}

function SelectWrapped(props) {
    const { classes, handleInputChange, name, ...other} = props;
    return (
        <Select
            optionComponent={Option}
            noResultsText={<Typography>{'No results found'}</Typography>}
            arrowRenderer={arrowProps => {
                return arrowProps.isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />;
            }}
            onInputChange={(value)=>handleInputChange(value)}
            clearRenderer={() => <ClearIcon />}
            {...other}
            name={name}
        />
    );
}

const ITEM_HEIGHT = 48;

const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 'auto',
        margin: '30px 0',
    },
    chip: {
        margin: theme.spacing.unit / 4,
    },
    underline:{
        border: 'transparent',
        '&:after': {
            border: 'transparent',
        },
    },
    // We had to use a lot of global selectors in order to style react-select.
    // We are waiting on https://github.com/JedWatson/react-select/issues/1679
    // to provide a much better implementation.
    // Also, we had to reset the default style injected by the library.
    '@global': {
        '.Select-control': {
            display: 'flex',
            alignItems: 'center',
            height: '60px !important',
            border: 'none !important',
            background: 'rgba(255, 255, 255, 0.7)',
            '&:hover': {
                boxShadow: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
            },
        },
        '.Select-multi-value-wrapper': {
            flexGrow: 1,
            display: 'flex',
            flexWrap: 'wrap',
            padding: '6px 10px',
        },
        '.Select--multi .Select-input': {
            textAlign: 'center',
            margin: 0,
        },
        '.Select.has-value.is-clearable.Select--single > .Select-control .Select-value': {
            padding: 0,
        },
        '.Select-noresults': {
            padding: theme.spacing.unit * 2,
        },
        '.Select-input': {
            textAlign: 'center',
            display: 'inline-flex !important',
            padding: 0,
            height: 'auto',
        },
        '.Select-input input': {
            justifyContent: 'center',
            textAlign: 'center',
            background: 'transparent',
            border: 0,
            padding: 0,
            cursor: 'default',
            display: 'inline-block',
            fontFamily: 'inherit',
            fontSize: 'inherit',
            margin: 0,
            outline: 0,

        },
        '.Select--single': {
            padding: 0,
            '&:after':{
                borderBottom: 'none !important',
            },
        },
        '.Select-placeholder, .Select--single .Select-value': {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            textAlign: 'center',
            justifyContent: 'center',
            fontFamily: 'Open Sans',
            fontSize: theme.typography.pxToRem(16),
            color: 'rgba(35, 35, 77, 0.3)',
            padding: '6px 10px',
        },
        '.Select-placeholder': {
            justifyContent: 'center',
            textAlign: 'center',
            opacity: 0.42,
            color: theme.palette.common.black,
        },
        '.Select-menu-outer': {
            backgroundColor: theme.palette.background.paper,
            boxShadow: '0 8px 10px 1px rgba(0, 0, 0, 0.14)',
            position: 'absolute',
            left: 0,
            // top: `calc(100% + ${theme.spacing.unit}px)`,
            top: 60,
            width: '100%',
            zIndex: 2,
            maxHeight: ITEM_HEIGHT * 4.5,
        },
        '.Select.is-focused:not(.is-open) > .Select-control': {
            boxShadow: 'none',
        },
        '.Select-menu': {
            maxHeight: ITEM_HEIGHT * 4.5,
            overflowY: 'auto',
        },
        '.Select-menu div': {
            boxSizing: 'content-box',
        },
        '.Select-arrow-zone, .Select-clear-zone': {
            color: theme.palette.action.active,
            cursor: 'pointer',
            height: 21,
            width: 21,
            zIndex: 1,
            display: 'none !important',
        },
        // Only for screen readers. We can't use display none.
        '.Select-aria-only': {
            position: 'absolute',
            overflow: 'hidden',
            clip: 'rect(0 0 0 0)',
            height: 1,
            width: 1,
            margin: -1,
        },
    },
});

class IntegrationReactSelect extends React.Component {

    handleChange = value => {
        const { input } = this.props;
        input.onChange(value.value);
    };

    render() {

        const { classes, items, name, handleInputChange, input, placeholder} = this.props;

        if (!items) {
            return null;
        }
        const current = items.find(h => h.value === input.value)
        return (
            <FormControl className={classes.formControl} error aria-describedby={`${name}-field`}>
                <Input
                    fullWidth
                    classes={{underline: classes.underline}}
                    inputComponent={SelectWrapped}
                    value={current}
                    onChange={this.handleChange}
                    autoComplete={"section_" + name}
                    placeholder={placeholder}
                    id="react-select-single"
                    inputProps={{
                        classes,
                        name: name,
                        instanceId: name + "_id",
                        simpleValue: true,
                        options: items,
                        handleInputChange,
                    }}
                />
            </FormControl>
        );
    }
}

const Autocomplete = (props) => {
    return (
        <Field component={IntegrationReactSelect} {...props}/>
    )
}

Autocomplete.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Autocomplete);