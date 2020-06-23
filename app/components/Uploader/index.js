import React, {PropTypes} from "react";
import styled from "styled-components";
import trans from "trans";
const Error = styled.div`
  color:red;
`;
export default class Uploader extends React.Component {
  static propTypes = {
    handleGetImgPreview: PropTypes.func,
    data: PropTypes.object,
    multiple: PropTypes.bool,
    btnAttrs: PropTypes.object,
    style: PropTypes.object,
    isPreviewImg: PropTypes.bool
  };
  static defaultProps = {
    multiple: false,
    isPreviewImg: true,
    maxFileSize: 0
  };

  constructor(props) {
    super(props);
    this._handleImageChange = this._handleImageChange.bind(this)
  }

  componentWillMount() {
    this.state = {
      file: '',
      data: this.props.data || {},
      imagePreviewUrl: '',
      sizeError: false,
      extensionError: false
    }
  }

  loadFile(file) {
    const fileExt = file.name.split('.').pop().toLowerCase();
    const {isPreviewImg, handleGetImgPreview, maxFileSize, allowedImgExtensions} = this.props;
    this.state.sizeError = maxFileSize < file.size;
    this.state.extensionError = !allowedImgExtensions.test(fileExt);
    if (isPreviewImg) {
      let reader = new FileReader();
      reader.onloadend = () => {
        let imagePreviewUrl = reader.result;
        if (typeof handleGetImgPreview === 'function') {
          handleGetImgPreview(this.state.sizeError || this.state.extensionError ? false : file, imagePreviewUrl)
        }
      };
      reader.readAsDataURL(file)
    } else {
      if (typeof handleGetImgPreview === 'function') {
        handleGetImgPreview(file)
      }
    }
  }

  _handleImageChange(e, files) {
    if (!files) {
      files = e.target.files
    }
    if (e) {
      e.preventDefault()
    }
    const {multiple} = this.props;
    if (multiple) {
      for (let i = 0; i < files.length; i++) {
        this.loadFile(files[i]);
      }
    } else {
      this.loadFile(files[0]);
    }
  }

  render() {
    let {btnAttrs = {}, className, style, multiple, disabled, maxFileSize} = this.props;
    let {sizeError, extensionError} = this.state;
    return (
      <div style={{display: 'inline-block', width: '100%', ...style}} className={className}>
        <form>
          <div className="text-center">
            <div {...btnAttrs} className="fileinput-button" style={{
              width: '100%',
              paddingTop: '66.6%',
              backgroundImage: `url(${btnAttrs.label.props.src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center', ...style
            }} disabled>
              {!disabled && (
                multiple ? <input accept="image/*" style={{height: '100%', ...style}} type="file"
                                  onChange={this._handleImageChange} multiple value=""/>
                  : <input accept="image/*" style={{height: '100%', ...style}} type="file"
                           onChange={this._handleImageChange} value=""/>
              )
              }
            </div>
            {sizeError && (
              <Error><FormattedMessage id="proposal.upload.error" values={{size: maxFileSize / (1024*1024)}}/></Error>
            )}
            {extensionError && (
              <Error>{trans('proposal.upload.extension.error')}</Error>
            )}
          </div>
        </form>
      </div>
    )
  }
}