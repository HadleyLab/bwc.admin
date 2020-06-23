import './style.css';

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Select from 'react-select';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import MenuItem from '@material-ui/core/MenuItem';
import { emphasize } from '@material-ui/core/styles/colorManipulator';

const styles = theme => ({
  root: {
    flexGrow: 1,
    maxWidth: 590,
    width: '100%',
    margin: '0 0 1.5em',
      '@media (max-width: 768px)':{
      margin: 0,
      }
  },
  input: {
    display: 'flex',
    padding: 0,
    background: '#fff',
    height:47,
    borderRadius:5,
    paddingLeft: 30,
  },
bootstrapRoot: {
    padding: 0,
    'label + &': {
        marginTop: 0,
        height: 47,
        background: '#fff',
        borderRadius: 4,
    },
},
    bootstrapInput: {
        fontSize: 15,
        borderRadius: 4,
        height: 47,
        padding: '0 1em 0 2.5em',
        width: 'calc(100% - 24px)',
        transition: theme.transitions.create(['border-color']),
        '&:focus': {
            borderColor: '#96C7E5',
        },
    },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
  },
  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light' ? theme.palette.grey[300] : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
    color: '#9497A2',
    paddingLeft: 30,
    fontWeight:300,

  },
  paper: {
    marginTop: theme.spacing.unit,
    position: 'absolute',
    maxWidth: 590,
    width: '100%',
    zIndex: 9,

  },
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      fullWidth
      InputProps={{
          disableUnderline: true,
        inputComponent,
        inputProps: {
          // className: props.selectProps.classes.input,
            classes:{
                root: classes.bootstrapRoot,
                input: classes.bootstrapInput,
            },
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography className={props.selectProps.classes.singleValue} {...props.innerProps}>
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return <div className={props.selectProps.classes.valueContainer}>{props.children}</div>;
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={event => {
        props.removeProps.onClick();
        props.removeProps.onMouseDown(event);
      }}
    />
  );
}

function Menu(props) {
  return (
    <Paper square className={props.selectProps.classes.paper} {...props.innerProps}>
      {props.children}
    </Paper>
  );
}

const components = {
  Option,
  Control,
  NoOptionsMessage,
  Placeholder,
  SingleValue,
  MultiValue,
  ValueContainer,
  Menu,
};

class IntegrationReactSelect extends React.Component {
  state = {
    multi: null,
  };

  handleChange = name => value => {
    const {handleChange} = this.props;
    handleChange(value);
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { classes, theme, items, placeholder, handleInputChange, clean} = this.props;
    const { multi } = this.state;
    let value = multi;
    if(clean){
        value = null;
    }


    const selectStyles = {
      input: base => ({
        ...base,
        color: theme.palette.text.primary,
      }),
    };

    return (
      <div className={classes.root}>
          <Select
            classes={classes}
            styles={selectStyles}
            textFieldProps={{
              InputLabelProps: {
                shrink: true,
              },
            }}
            options={items}
            components={components}
            value={value}
            onChange={this.handleChange('multi')}
            placeholder={placeholder}
            onInputChange={handleInputChange}
            underlineShow={false}
          />

      </div>
    );
  }
}

IntegrationReactSelect.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(IntegrationReactSelect);