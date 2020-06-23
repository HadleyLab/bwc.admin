import React, {PureComponent} from 'react'
import {withStyles} from '@material-ui/core/styles/index'
import PropTypes from 'prop-types'
import {media} from "../../../../../style/containers";
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {fabric} from 'fabric'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components'
import IconButton from '@material-ui/core/IconButton';
import Loading from 'components/Loading';
import  { ApiHelper }  from '../../../../../utils/api/ApiHelper'

const WorkSpace = styled.div`
    width:100%;
    height: 100vh;
`

const ZoomButtons = styled.div`
    display: flex;
    flex-flow: row;
    border-radius: 5px;
    box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 10px 0px rgba(0, 0, 0, 0.04), 0px 0px 10px 0px rgba(0, 0, 0, 0.02);

`
const ToolBar = styled.div`
    width: 100%;
    padding: 30px;
    position: absolute;
    top: 0;
    display: flex;
    flex-flow: row wrap;
    >div{
        margin-right: 20px;
        margin-bottom: 10px;
        }
    ${media.mobile`
        padding: 15px;
    `}
    `
const LeftBlock = styled.div`
    width: 160px;
    height:100%;
    background: #fff;
    float:left;
    overflow: auto;
    ${media.tablet`
    
    `}
    ${media.mobile`
        width: 100%;
        float: none;
        display: flex;
    `}
`
const RightBlock = styled.div`
    height:100%;
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    position: relative;
    padding:30px;
     ${media.mobile`
            padding:15px;
    `}
    
`
const StyledList = styled(List)`
    ${media.mobile`
     display: flex;
    `}
    

`

const styles = theme => ({
    selectTags: {
        display: 'flex',
        flexWrap: 'wrap',
        width: 250,
        float: 'right',
        marginTop: -5,
        marginRight: 30
    },
    formControl: {
        display: 'block',
        position: 'initial',
    },
    selectEmpty: {
        marginTop: theme.spacing.unit * 2,
    },
    leftBlock: {
        width: 160,
        overflow: 'auto',
        backgroundColor: '#fff',
        float: 'left',
    },
    rightBlock: {
        height: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        padding: 30,
    },
    btn: {
        width: 180,
        paddingRight: 28,
        borderRadius: 5,
        boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.2), 0px 0px 10px 0px rgba(0, 0, 0, 0.04), 0px 0px 10px 0px rgba(0, 0, 0, 0.02)',
        '&:after': {
            display: 'none',
        },
        '&:before': {
            display: 'none',
            
        },
    },
    ava: {
        width: 100,
        height: 100,
        borderRadius: 0,
        cursor: 'pointer',
        '&:hover': {
            boxShadow: '0 0 25px #000000',
        },
    },
    listItem: {
        paddingTop: 17,
        paddingBottom: 17,
    },
    dwvBlock: {
        backgroundColor: '#D8DBE7',
        
    },
    bootstrapRoot: {
        background: '#fff',
        height: '48px',
        marginTop: 0,
        borderRadius: 4,
        padding: 0,
        'label + &': {
            marginTop: 0,
        },
        
        
    },
    bootstrapSelect: {
        marginTop: 0,
        width: '100%',
        fontSize: 15,
        borderRadius: 4,
        height: '48px',
        lineHeight: '48px',
        padding: '0 14px',
        background: '#fff',
        color: '#626285',
        transition: theme.transitions.create(['border-color']),
        fontFamily: [
            '-apple-system',
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
        '&:focus': {
            borderColor: '#9497A2',
        }
    },
    selectIcon: {
        right: '-18px',
        position: 'absolute',
    },
    iconPlus: {
        fontSize: 12,
        background: '#fff',
        borderRadius: '5px 0 0 5px',
        zIndex: 999,
        borderRight: '1px solid rgba(0, 0, 0, 0.1)',
        '&:hover': {
            background: '#F8F8F8',
        }
    },
    iconMinus: {
        fontSize: 12,
        background: '#fff',
        borderRadius: '0 5px 5px 0',
        zIndex: 999,
        '&:hover': {
            background: '#F8F8F8',
        }
    },
    
    iconDraw: {
        fontSize: 12,
        background: '#0AB878',
        borderRadius: '0 5px 5px 0',
        zIndex: 999,
        '&:hover': {
            background: '#F8F8F8',
        }
    },
    
    iconMinusText: {
        background: '#fff',
        borderRadius: '0 5px 5px 0',
        zIndex: 999,
        padding: 5,
        fontSize: 12,
        '&:hover': {
            background: '#F8F8F8',
        }
    },
    saveBtn: {
        textTransform: 'none',
        background: '#fff',
        borderRadius: 5,
        zIndex: 999,
        padding: 5,
        fontSize: 12,
        '&:hover': {
            background: '#F8F8F8',
        }
    }
})

const CANVAS_WIDTH = 700;
const CANVAS_HEIGHT = 600;

const ZOOM_STEP = 0.1;

class Viewer extends PureComponent {
    
    constructor(props) {
        super(props);
        this.activeObject = null;
        this.state = {
            dataLoaded: false,
            activeL: '',
            layerEvent: null,
            tagLayer: null,
            tagID: null,
            draw: false,
            stady: null,
            showLoad: true,
        };
        this.canvas = null;
        this.mainL = null;
        this.zoom = 1;
        this.leftAmendment = 0;
        this.topAmendment = 0;
        this.LevelZoom = 0;
        this.w = 0;
        this.h = 0;
        
        this.SVGRectangle = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><rect id="svg_1" height="100" fill-opacity="0" width="100" y="0" x="0" stroke-width="1" stroke="#fc0000"/></svg>';
        this.SVGCircle = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg"><circle r="65" cx="70" cy="70" fill-opacity="0" stroke-width="1" stroke="#fc0000"/></svg>';
    }
    
    render() {
        const {classes, open, handleClose, tags, stady} = this.props
        const {dataLoaded, draw, showLoad} = this.state
        const selectTagId = 0
        const files = stady.files;
        return (
            <WorkSpace>
                <LeftBlock>
                    <StyledList>
                        {files && files.map(file => (file &&
                                <ListItem key={"V_ListItem" + file.id} className={classes.listItem}>
                                    <Avatar className={classes.ava} onClick={() => {
                                        this.changeImg(file)
                                    }} src={file.srcPrv}/>
                                    {/*<ListItemText primary="Photos" secondary="Jan 9, 2014" />*/}
                                </ListItem>
                            )
                        )}
                    
                    </StyledList>
                </LeftBlock>
                <RightBlock>
                    <ToolBar>
                        <FormControl className={classes.formControl}>
                            <Select
                                disabled={draw}
                                value={selectTagId}
                                onChange={this.setAnatation}
                                inputProps={{
                                    name: 'tagID',
                                    classes: {
                                        root: classes.bootstrapRoot,
                                        select: classes.bootstrapSelect,
                                        icon: classes.selectIcon,
                                    },
                                }}
                                className={classes.btn}
                            >
                                <MenuItem key={0} value={0}>Select Annotation</MenuItem>
                                {tags.annotations && tags.annotations.map(tag =>
                                    (tag &&
                                        <MenuItem key={tag._id} value={tag._id}>{tag.tag}</MenuItem>
                                    )
                                )}
                            </Select>
                            {/*<Button className={classes.btn} variant="raised" color="primary" value="Add Rectangle" onClick={()=>{this.addShape('Rectangle')}} >Add Rectangle</Button>*/}
                        </FormControl>
                        <ZoomButtons>
                            <IconButton
                                className={classes.iconPlus} onClick={() => {
                                this.addShape("Rectangle")
                                
                            }} disabled={draw}>
                                <div className="icon-ico-Rectangle-blue"/>
                            </IconButton>
                            <IconButton
                                className={classes.iconMinus} onClick={() => {
                                this.addShape("Circle")
                            }} disabled={draw}>
                                <div className="icon-ico-Oval-blue"/>
                            </IconButton>
                            <IconButton
                                className={(draw) ?  classes.iconDraw : classes.iconMinus} onClick={() => {
                                this.addShape("Pencil")
                            }}>
                                <div className="icon-ico-Edit"/>
                            </IconButton>
                        </ZoomButtons>
                        <ZoomButtons>
                            <IconButton
                                className={classes.iconPlus} onClick={() => {
                                this.zoomMainL(1)
                            }} disabled={draw}>
                                <div className="icon-ico-plus"/>
                            </IconButton>
                            <IconButton
                                className={classes.iconMinus} onClick={() => {
                                this.zoomMainL(-1)
                            }} disabled={draw}>
                                <div className="icon-ico-minus"/>
                            </IconButton>
                        </ZoomButtons>
                        <ZoomButtons>
                            <Button
                                className={classes.saveBtn} onClick={() => {
                                this.save()
                            }} disabled={draw}>{"Save"}</Button>
                        </ZoomButtons>
                    </ToolBar>
                    <div id="dwv" className={classes.dwvBlock}>
                        <canvas id={'canvas'} width={CANVAS_WIDTH} height={CANVAS_HEIGHT}
                                className={classes.layerContainer}>Only for HTML5 compatible browsers...
                        </canvas>
                    </div>
                </RightBlock>
            </WorkSpace>
        );
    }
    
    async changeImg(objImg) {
        await this.setState({
            showLoad: true
        })
        this.showImg(objImg)
        
    }
    
    
    
    componentDidMount() {
        const {file, stady} = this.props
        this.canvas = new fabric.Canvas('canvas', {});
        console.log(stady);
        console.log(this.props);
        this.setState({stady:stady})
        this.showImg(file, stady)
        
    }
    
    async showImg(objImg, newStady) {
        
        let api = new ApiHelper();
        const {stady} = this.state
        let file = null
        let stadyId = (newStady) ? newStady._id : stady._id
        
        this.canvas.clear();
        fabric.Image.fromURL('/icon-180x180.png', (img) => {
            img.set({left: 300, top: 200,}).scaleToWidth(100).scaleToHeight(100);
            this.canvas.add(img);
        }, {
            hasControls: false,
            hasRotatingPoint: false,
            hoverCursor: 'pointer',
        });
        
        
        
        let resultData = await api.FetchFromServer('/', 'files/get', 'POST', true, undefined, {
            fileId: objImg.id,
            dicomId: stadyId
        });
        
        
        if (resultData.isError) {
            console.log('Error')
        }
        
        else {
            file = resultData.data.file
            const dcmSrc = file.src;
            
            this.setState({
                activeObject: file,
                showLoad: false
            })
            if (this.canvas) {
                this.canvas.clear();
                this.ShowCanvas(dcmSrc, file.canvas)
            } else {
                this.ShowCanvas(dcmSrc, file.canvas)
            }
        }
        
    }
    
    //Тоскаем гланный слой
    positionMainL(obj) {
        let rScale = this.getRealScaleMainL();
        this.leftAmendment = 0;
        this.topAmendment = 0;
        //Ограничено движение по left
        let realLeft = CANVAS_WIDTH - (obj.width * obj.scaleX)
        obj.set('left', (obj.left > 0 || realLeft > 0) ? 0 : obj.left).setCoords()
        if (obj.left < realLeft && realLeft < 0) {
            obj.set('left', realLeft).setCoords()
        }
        
        //Ограничено движение по top
        let realTop = CANVAS_HEIGHT - (obj.height * obj.scaleX)
        obj.set('top', (obj.top > 0 || realTop > 0) ? 0 : obj.top).setCoords()
        if (obj.top < realTop && realTop < 0) {
            obj.set('top', realTop).setCoords()
        } else if (obj.top < 0 && rScale === 1) {
            obj.set('top', 0).setCoords()
        }
        
        this.positioningSubL();
        this.canvas.requestRenderAll();
    }
    
    /**
     * Опять всем переназначим активность
     */
    setActiveObject() {
        this.mainL.opacity = 1;
        this.canvas.renderAll();
        if (this.canvas._objects.length > 1) {
            for (let i in this.canvas._objects) {
                if (i > 0) {
                    this.canvas.setActiveObject(this.canvas._objects[i]);
                }
            }
        }
        this.canvas.requestRenderAll();
    }
    
    /**
     * Зажал мышь сделаем главную прозрачной
     */
    startMoving() {
        this.mainL.opacity = 0.7;
        this.canvas.renderAll();
    }
    
    getRealScaleMainL() {
        return this.mainL.scaleX
    }
    
    save() {
        
        const {onSaveDicom} = this.props
        const {activeObject} = this.state
        const canvasSTR = JSON.stringify(this.canvas);
        const canvasJSON = JSON.parse(canvasSTR)
        
        
        for (let i in canvasJSON.objects) {
            if (canvasJSON.objects[i].type === 'rect' ) {
                canvasJSON.objects[i].zoomW1 = this.canvas._objects[i].zoomW1;
                canvasJSON.objects[i].zoomH1 = this.canvas._objects[i].zoomH1;
                canvasJSON.objects[i].width = this.canvas._objects[i].zoomW1 * this.zoom;
                canvasJSON.objects[i].height = this.canvas._objects[i].zoomH1 * this.zoom;
                canvasJSON.objects[i].left = this.canvas._objects[i].leftA * this.zoom;
                canvasJSON.objects[i].top = this.canvas._objects[i].topA * this.zoom;
            } else if (canvasJSON.objects[i].type === 'path') {
                canvasJSON.objects[i].zoomW1 = this.canvas._objects[i].zoomW1;
                canvasJSON.objects[i].zoomH1 = this.canvas._objects[i].zoomH1;
                canvasJSON.objects[i].width = this.canvas._objects[i].zoomW1 * this.zoom;
                canvasJSON.objects[i].height = this.canvas._objects[i].zoomH1 * this.zoom;
                canvasJSON.objects[i].left = this.canvas._objects[i].leftA * this.zoom;
                canvasJSON.objects[i].top = this.canvas._objects[i].topA * this.zoom;
                
                canvasJSON.objects[i].scaleX = this.canvas._objects[i].scaleX - (this.LevelZoom * 0.1);
                canvasJSON.objects[i].scaleY = this.canvas._objects[i].scaleX - (this.LevelZoom * 0.1);
                
            } else if (canvasJSON.objects[i].type === 'circle') {
                canvasJSON.objects[i].zoomR1 = this.canvas._objects[i].zoomR1;
                canvasJSON.objects[i].radius = this.canvas._objects[i].zoomR1 * this.zoom;
                canvasJSON.objects[i].left = this.canvas._objects[i].leftA * this.zoom;
                canvasJSON.objects[i].top = this.canvas._objects[i].topA * this.zoom;
            } else if (canvasJSON.objects[i].type === 'text') {
                canvasJSON.objects[i].left = this.canvas._objects[i].leftA * this.zoom;
                canvasJSON.objects[i].top = this.canvas._objects[i].topA * this.zoom;
            } else if (canvasJSON.objects[i].type === 'image') {
                canvasJSON.objects[i].scaleX = this.zoom;
                canvasJSON.objects[i].scaleY = this.zoom;
                canvasJSON.objects[i].left = 0;
                canvasJSON.objects[i].top = 0;
            }
        }
        
        activeObject.canvas = JSON.stringify(canvasJSON);
        onSaveDicom(activeObject);
        this.saveToProps(activeObject)
    }
    
    saveToProps(activeObject) {
        const {dicoms} = this.props
        for (let key in dicoms) {
            if (
                dicoms[key].hasOwnProperty('package')
                && dicoms[key].package
                &&  dicoms[key].package.hasOwnProperty('dicom')
                &&  dicoms[key].package.dicom
                &&  dicoms[key].package.dicom.hasOwnProperty('files')
                &&  dicoms[key].package.dicom.files
            ) {
                let files = dicoms[key].package.dicom.files
                for (let keyFiles in files) {
                    if (files[keyFiles].id === activeObject.id) {
                        files[keyFiles] = activeObject;
                    }
                }
            }
        }
    }
    
    /**
     * Зумируем с помощью колеса
     * @param event
     */
    zoomMainL(zoom) {
        let newScale = this.zoom;
        if (zoom > 0) {
            newScale = this.mainL.scaleX + ZOOM_STEP
            newScale = (this.mainL.scaleX > 5) ? 5 : newScale;
            this.leftAmendment = 0;
            this.topAmendment = 0;
            this.LevelZoom = (this.LevelZoom < 0) ? 1 : this.LevelZoom + 1;
        } else {
            this.LevelZoom--;
            if (this.leftAmendment === 0) {
                this.leftAmendment = this.mainL.left / ((this.mainL.scaleX - this.zoom) / ZOOM_STEP);
                this.topAmendment = this.mainL.top / ((this.mainL.scaleX - this.zoom) / ZOOM_STEP);
            }
            newScale = this.mainL.scaleX - ZOOM_STEP
            if (newScale < this.zoom) {
                newScale = this.zoom;
                this.leftAmendment = 0;
                this.topAmendment = 0;
            }
        }
        // поправка левого угла если был смещен и высоты
        this.mainL.set('left', this.mainL.left - this.leftAmendment).setCoords();
        this.mainL.set('top', this.mainL.top - this.topAmendment).setCoords();
        
        this.mainL.scale(newScale)
        this.zooSubL(zoom)
        this.canvas.requestRenderAll();
    }
    
    zooSubL(zoom) {
        if (this.canvas._objects.length > 1 && this.LevelZoom >= 0) {
            let rScale = this.getRealScaleMainL();
            let width = 0;
            let height = 0;
            let radius = 0;
            for (let i in this.canvas._objects) {
                if (i > 0) {
                    if (this.canvas._objects[i].type === 'rect' /*|| this.canvas._objects[i].type === 'path'*/) {
                        
                        width = this.canvas._objects[i].zoomW1 * rScale
                        height = this.canvas._objects[i].zoomH1 * rScale;
                        if (width > 0 && height > 0) {
                            this.canvas._objects[i].set('width', width).setCoords();
                            this.canvas._objects[i].set('height', height).setCoords();
                        }
                    } else if (this.canvas._objects[i].type === 'circle') {
                        radius = this.canvas._objects[i].zoomR1 * rScale
                        if (radius > 0) {
                            this.canvas._objects[i].set('radius', radius).setCoords();
                        }
                    } else if (this.canvas._objects[i].type === 'path') {
                        
                        let newScal = this.canvas._objects[i].scaleX
                        if (zoom > 0) {
                            this.canvas._objects[i].scale(newScal+0.1).setCoords();
                        } else {
                            this.canvas._objects[i].scale(newScal-0.1).setCoords();
                        }
                    }
                }
            }
            this.positioningSubL();
        }
    }
    
    /**
     * Позиционирует все слои
     */
    positioningSubL() {
        if (this.canvas._objects.length > 1) {
            let rScale = this.getRealScaleMainL();
            for (let i in this.canvas._objects) {
                if (i > 0) {
                    this.canvas._objects[i].set('left', (this.mainL.left + this.canvas._objects[i].leftA * rScale)).setCoords();
                    this.canvas._objects[i].set('top', (this.mainL.top + this.canvas._objects[i].topA * rScale)).setCoords();
                }
            }
        }
    }
    
    /**
     * Показывает новый диком
     * @param dcmSrc
     * @constructor
     */
    async ShowCanvas(dcmSrc, canvas) {
        
        setTimeout(() => {
            if (canvas) {
                const canvasJSON = JSON.parse(canvas)
                if (canvasJSON.objects[0] && canvasJSON.objects[0].type === "image") {
                    canvasJSON.objects[0].src = dcmSrc;
                    this.canvas.loadFromJSON(canvasJSON, () => {
                        for (let key in this.canvas._objects) {
                            this.setEvents(this.canvas._objects[key])
                        }
                    });
                } else {
                    this.ShowCanvas(dcmSrc, false)
                }
                
            } else {
                fabric.Image.fromURL(dcmSrc, (img) => {
                    img.set({left: 0, top: 0,}).scaleToWidth(CANVAS_WIDTH).scaleToHeight(CANVAS_HEIGHT);
                    this.setEvents(img)
                    this.canvas.add(img);
                }, {
                    hasControls: false,
                    hasRotatingPoint: false,
                    hoverCursor: 'pointer',
                });
            }
            
        }, 100);
    }
    
    mouseUpSybL(obj) {
        if (obj) {
            let rScale = this.getRealScaleMainL();
            obj.leftA = (obj.left - this.mainL.left) / rScale;
            obj.topA = (obj.top - this.mainL.top) / rScale;
        }
    }
    
    
    movingSubL(obj) {
        
        let rScale = this.getRealScaleMainL();
        let mainL = this.getMainlParameterToScale('left');
        let mainT = this.getMainlParameterToScale('top');
        let mainW = this.getMainlParameterToScale('width');
        let mainH = this.getMainlParameterToScale('height');
        
        let leftRule = (obj.left - (mainL / rScale)) - (obj.width / 2)
        let maxLeft = (mainW > CANVAS_WIDTH)
            ? CANVAS_WIDTH - obj.width
            : mainW + obj.width / 2;
        
        if (mainW < leftRule) {
            obj.set('left', maxLeft).setCoords();
        } else if (obj.left < 0) {
            obj.set('left', 0).setCoords();
        }
        
        let TopRule = (obj.top - (mainT / rScale)) - (obj.height / 2)
        let maxTop = (mainH > CANVAS_HEIGHT)
            ? CANVAS_HEIGHT - obj.height
            : mainH + obj.height;
        if (mainH < TopRule) {
            obj.set('top', maxTop).setCoords();
        } else if (obj.top < 0) {
            obj.set('top', 0).setCoords();
        }
        
        this.canvas.requestRenderAll();
    }
    
    /**
     * Вернет параметр с учетом машатаба
     * @param params
     * @returns {number}
     */
    getMainlParameterToScale(params) {
        if (this.mainL.hasOwnProperty(params)) {
            let rScale = this.getRealScaleMainL();
            return this.mainL[params] * rScale;
        }
        
        return 0;
    }
    
    /**
     * Убивает обьект
     */
    deleteObject() {
        const activeObjects = this.canvas.getActiveObjects();
        this.canvas.discardActiveObject();
        if (activeObjects.length) {
            this.canvas.remove.apply(this.canvas, activeObjects);
        }
    }
    
    /**
     * Добавит примитив
     *
     * @param shape
     */
    addShape(shape) {
        let objShape = null;
        let rScale = this.getRealScaleMainL();
        if ('Rectangle' === shape) {
            objShape = this.SVGRectangle;
        } else if ('Circle' === shape) {
            objShape = this.SVGCircle;
        }
        switch (shape) {
            case 'Rectangle':
            case 'Circle':
                fabric.loadSVGFromString(objShape, (objects, options) => {
                    let obj = fabric.util.groupSVGElements(objects, options);
                    if ('rect' === obj.type) {
                        obj.zoomW1 = obj.width / rScale;
                        obj.zoomH1 = obj.height / rScale;
                    } else if ('circle' === obj.type) {
                        obj.zoomR1 = obj.radius / rScale;
                    }
                    
                    this.setEvents(obj);
                    this.canvas.add(obj).setActiveObject(obj).renderAll();
                });
                break;
            case 'Pencil':
                
                const state = this.canvas.isDrawingMode;
                
                this.canvas.freeDrawingBrush.color ="#fc0000";
                this.canvas.isDrawingMode = !this.canvas.isDrawingMode
                
                if (this.canvas.isDrawingMode) {
                    this.setState({draw:true})
                } else {
                    this.setState({draw:false})
                }
                
                if (state) {
                    this.reploadDrawingObj()
                }
                
                break;
        }
        
        
    }
    
    reploadDrawingObj() {
        let rScale = this.getRealScaleMainL();
        for (let i in this.canvas._objects) {
            if (this.canvas._objects[i].hasOwnProperty('path')) {
                this.canvas._objects[i].type = 'path';
                this.canvas._objects[i].strokeMiterLimit = 100;
                this.canvas._objects[i].leftA = (this.canvas._objects[i].left - this.mainL.left) / rScale;
                this.canvas._objects[i].topA = (this.canvas._objects[i].top - this.mainL.top) / rScale;
                this.canvas._objects[i].zoomW1 = this.canvas._objects[i].width / rScale;
                this.canvas._objects[i].zoomH1 = this.canvas._objects[i].height / rScale;
                
                this.setEvents(this.canvas._objects[i]);
            }
        }
    }
    
    scalingSubL(obj) {
        let rScale = this.getRealScaleMainL();
        if ('rect' === obj.type) {
            obj.set('width', obj.width * obj.scaleX).setCoords();
            obj.set('height', obj.height * obj.scaleY).setCoords();
            obj.zoomW1 = obj.width / rScale;
            obj.zoomH1 = obj.height / rScale;
        } else if ('path' === obj.type) {
            obj.zoomW1 = obj.width / rScale;
            obj.zoomH1 = obj.height / rScale;
        } else if ('circle' === obj.type) {
            obj.set('radius', obj.radius * obj.scaleX).setCoords();
            obj.zoomR1 = obj.radius / rScale;
        }
        this.canvas.setActiveObject(obj).renderAll();
        switch (obj.type){
            case 'rect':
            case 'circle':
                obj.scaleX = 1
                obj.scaleY = 1
                this.canvas.setActiveObject(obj).renderAll();
                break;
            case 'path':
                console.log(obj);
                break;
        }
        
    }
    
    /**
     * Добавить анатацию
     * @param event
     */
    setAnatation = (event) => {
        const {tags} = this.props
        const value = event.target.value;
        let annotation = '';
        if (value !== 0) {
            for (const key in tags.annotations) {
                if (tags.annotations[key]._id === value) {
                    annotation = tags.annotations[key].annotation;
                }
            }
        }
        setTimeout(() => {
            const textbox = new fabric.Text(annotation, {
                left: 0,
                top: 0,
                fill: '#1cff1b',
                hasRotatingPoint: true,
                centerTransform: true
            });
            this.setEvents(textbox)
            textbox.hasControls = false;
            this.canvas.add(textbox).setActiveObject(textbox).renderAll();
            this.movingSubL(textbox);
        }, 100);
    }
    
    setEvents(obj) {
        const self = this;
        if (obj.type === 'circle' || obj.type === 'rect' || obj.type === 'text' || obj.type === 'path' ) {
            obj.on('moving', function (e) {
                self.movingSubL(e.target)
            })
            obj.on('mouseup', function (e) {
                self.mouseUpSybL(e.target)
            });
            obj.on('mousedblclick', function (e) {
                self.deleteObject(e.target)
            });
            obj.on('scaled', function (e) {
                self.scalingSubL(e.target)
            });
            
            obj.setControlVisible('ml', false);
            obj.setControlVisible('mb', false);
            obj.setControlVisible('mr', false);
            obj.setControlVisible('mr', false);
            obj.setControlVisible('mt', false);
            obj.setControlVisible('mtr', false);
            obj.centeredScaling = true;
            obj.absolutePositioned = true;
            
            this.mouseUpSybL(obj)
            
        } else if (obj.type === 'image') {
            obj.on('moving', () => {
                this.positionMainL(obj)
            })
            obj.on('mouseup', () => {
                this.setActiveObject()
            })
            obj.on('mousedown', () => {
                this.startMoving()
            });
            this.mainL = obj;
            this.zoom = obj.scaleX;
        }
    }
    
}

Viewer.propTypes = {
    classes: PropTypes.object.isRequired,
};

// We need an intermediary variable for handling the recursive nesting.
const ViewerWrapped = withStyles(styles)(Viewer);

export default ViewerWrapped;

