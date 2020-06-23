import trans from '../trans'

export default function (fields, componentName) {
  const errors = (this.props.errors && this.props.errors.details) || {}
  const result = {}
  for (let field of fields) {
    let message = ''
    let type = ''
    if (errors && errors[field]) {
      type = errors[field].type.indexOf('.') === -1 ? errors[field].type : (errors[field].type.split('.'))[1]
      message = trans(getErrorMessage(componentName + '.' + type + '.' + field),
        parseJoiErrorMessage(errors[field].message, errors[field].key))
    }
    result[field] = getAsComponentProps({message, value: this.state[field], type, name: field})
  }
  return result
};

const getAsComponentProps = ({message, value, name, type}) => {
  return {
    error: message,
    value,
    name,
    //  type: type,
  }
}

const parseJoiErrorMessage = (message, key) => {
  return message.replace(`"${key}" `, '')
}

const getErrorMessage = (type) => {
  return (`validation.joi.${type}`).toLowerCase()
}
