var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p] }
        return extendStatics(d, b)
    }
    return function (d, b) {
        extendStatics(d, b)
        function __() { this.constructor = d }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __())
    }
})()
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments)
}
var __rest = (this && this.__rest) || function (s, e) {
    var t = {}
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p]
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]]
        }
    return t
}
import * as React from 'react'
import { VariableSizeList, } from 'react-window'
import { createRef, useContext } from 'react'
import { Child } from './Child'
import { DraggingElement } from './DraggingElement'
import { DropZoneElement } from './DropZoneElement'
export var SortableFixedSizeList = React.forwardRef(function (props, ref) {
    var itemSize = props.itemSize, rest = __rest(props, ['itemSize'])
    return (React.createElement(SortableVariableSizeList, __assign({ ref: ref, itemSize: function () { return itemSize } }, rest)))
})
var SortableVariableSizeList = /** @class */ (function (_super) {
    __extends(SortableVariableSizeList, _super)
    function SortableVariableSizeList(props) {
        var _this = _super.call(this, props) || this
        _this.dragRef = createRef()
        _this.dropZoneRef = createRef()
        _this.listRef = createRef()
        _this.startClientY = 0
        _this.startDragObjOffsetY = 0
        _this.hoverIndex = null
        _this.autoScroll = 'none'
        _this.autoScrollTimer = null
        _this.sortableContext = {
            Child: _this.props.children,
            itemKey: _this.props.itemKey,
            onMouseDown: _this.mouseDown.bind(_this),
            onTouchStart: _this.touchStart.bind(_this)
        }
        _this.dragContext = null
        _this.state = {
            dragging: null,
        }
        _this.onMouseUp = _this.onMouseUp.bind(_this)
        _this.onTouchEnd = _this.onTouchEnd.bind(_this)
        _this.onMouseMove = _this.onMouseMove.bind(_this)
        _this.onTouchMove = _this.onTouchMove.bind(_this)
        _this.mouseDown = _this.mouseDown.bind(_this)
        _this.touchStart = _this.touchStart.bind(_this)
        return _this
    }
    SortableVariableSizeList.prototype.getAutoScrollWhenDistanceLessThan = function () {
        return this.props.autoScrollWhenDistanceLessThan || 50
    }
    SortableVariableSizeList.prototype.getAutoScrollSpeed = function () {
        return this.props.autoScrollSpeed || 50
    }
    SortableVariableSizeList.prototype.componentWillUnmount = function () {
        document.body.removeEventListener('mouseup', this.onMouseUp)
        document.body.removeEventListener('mousemove', this.onMouseMove)
        document.body.removeEventListener('touchend', this.onTouchEnd)
        document.body.removeEventListener('touchmove', this.onTouchMove)
        this.setAutoScroll('none', 0)
    }
    SortableVariableSizeList.prototype.mouseDown = function (e, params) {
        var list = this.listRef.current
        if (list === null) return
        this.startClientY = e.clientY
        var top = parseInt((params.style.top || '0').toString(), 10)
        this.startDragObjOffsetY = top - this.getScrollOffsetTop(list)
        document.body.addEventListener('mouseup', this.onMouseUp)
        document.body.addEventListener('mousemove', this.onMouseMove)
        this.setState({ dragging: params })
    }
    SortableVariableSizeList.prototype.touchStart = function (e, params) {
        console.log('touchstart', e)
        var list = this.listRef.current
        if (list === null) return
        this.startClientY = e.targetTouches[0].clientY
        var top = parseInt((params.style.top || '0').toString(), 10)
        this.startDragObjOffsetY = top - this.getScrollOffsetTop(list)
        document.body.addEventListener('touchend', this.onTouchEnd)
        document.body.addEventListener('touchmove', this.onTouchMove)
        this.onTouchMove(e)
        this.setState({ dragging: params  })
    }
    SortableVariableSizeList.prototype.onMouseMove = function (event) {
        this.updateDragElementPositioning(event.clientY)
        this.checkAutoScroll(event.clientY)
    }
    SortableVariableSizeList.prototype.onTouchMove = function (event) {
        const { clientY } = event.targetTouches[0]
        this.updateDragElementPositioning(clientY)
        this.checkAutoScroll(clientY)
    }
    SortableVariableSizeList.prototype.updateDragElementPositioning = function (mouseY) {
        var dragRef = this.dragRef.current
        if (dragRef === null)
            return
        if (this.listRef.current === null)
            return
        var scrollOffsetTop = this.getScrollOffsetTop(this.listRef.current)
        var dY = mouseY - this.startClientY
        var newY = this.startDragObjOffsetY + dY + scrollOffsetTop
        dragRef.style.top = newY + 'px'
        var dropRef = this.dropZoneRef.current
        if (dropRef === null)
            return
        var _a = this.getHoverDetails(newY), offsetTop = _a.offsetTop, index = _a.index
        this.hoverIndex = index
        dropRef.style.top = offsetTop + 'px'
    }
    SortableVariableSizeList.prototype.getHoverDetails = function (offsetY) {
        var posY = 0
        for (var i = 0; i < this.props.itemCount; i++) {
            var height = this.props.itemSize(i)
            if (offsetY < posY + height / 2) {
                return {
                    offsetTop: posY,
                    index: i,
                }
            }
            posY += height
        }
        return {
            offsetTop: posY,
            index: this.props.itemCount,
        }
    }
    SortableVariableSizeList.prototype.getScrollOffsetTop = function (list) {
        return this.getScrollRef(list).scrollTop
    }
    SortableVariableSizeList.prototype.getScrollRef = function (list) {
        // @ts-ignore dangerously reach into list internals, so we can get a ref on the scroll element
        return list._outerRef
    }
    SortableVariableSizeList.prototype.checkAutoScroll = function (mouseY) {
        if (this.listRef.current === null)
            return
        var list = this.listRef.current
        var scrollRef = this.getScrollRef(list)
        var rect = scrollRef.getBoundingClientRect()
        var listTop = rect.y
        var listBottom = rect.y + rect.height
        var buffer = this.getAutoScrollWhenDistanceLessThan()
        if (mouseY - listTop < buffer) {
            this.setAutoScroll('up', mouseY)
        }
        else if (listBottom - mouseY < this.getAutoScrollWhenDistanceLessThan()) {
            this.setAutoScroll('down', mouseY)
        }
        else {
            this.setAutoScroll('none', mouseY)
        }
    }
    SortableVariableSizeList.prototype.setAutoScroll = function (scroll, mouseY) {
        var _this = this
        if (this.autoScrollTimer !== null) {
            clearInterval(this.autoScrollTimer)
            this.autoScrollTimer = null
        }
        this.autoScroll = scroll
        if (scroll === 'none')
            return
        if (this.dragRef.current === null)
            return
        if (this.listRef.current === null)
            return
        var delta = this.getAutoScrollSpeed()
        if (scroll === 'up') {
            delta = delta * -1
        }
        this.autoScrollTimer = setInterval(function (e) {
            if (_this.listRef.current === null)
                return
            var offsetTop = _this.getScrollOffsetTop(_this.listRef.current)
            var newOffsetTop = offsetTop + delta
            _this.listRef.current.scrollTo(newOffsetTop)
            _this.updateDragElementPositioning(mouseY)
        }, 100)
    }
    SortableVariableSizeList.prototype.onMouseUp = function () {
        document.body.removeEventListener('mouseup', this.onMouseUp)
        document.body.removeEventListener('mousemove', this.onMouseMove)
        this.setAutoScroll('none', 0)
        if (this.state.dragging === null)
            return
        var startIndex = this.state.dragging.index
        this.setState({
            dragging: null,
        })
        if (this.hoverIndex !== null) {
            var newIndex = this.hoverIndex
            if (newIndex > startIndex) {
                newIndex = Math.max(0, newIndex - 1)
            }
            this.props.onSortOrderChanged({
                originalIndex: startIndex,
                newIndex: newIndex,
            })
        }
        this.hoverIndex = null
    }
    SortableVariableSizeList.prototype.onTouchEnd = function () {
        document.body.removeEventListener('touchend', this.onTouchEnd)
        document.body.removeEventListener('touchmove', this.onTouchMove)
        this.onMouseUp()
    }
    SortableVariableSizeList.prototype.renderDropZoneElement = function () {
        if (this.state.dragging === null)
            return
        var style = Object.assign({}, this.state.dragging.style, {
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch',
            zIndex: 2,
            background: 'white',
        })
        var dropElement = this.props.dropElement || (React.createElement('div', { style: {
                border: '2px solid #0087F7',
                borderRadius: '3px',
                margin: '2px',
                flex: 1,
                boxSizing: 'border-box',
            } }))
        return (React.createElement('div', { ref: this.dropZoneRef, style: style }, dropElement))
    }
    SortableVariableSizeList.prototype.renderDraggingElement = function () {
        if (this.state.dragging === null)
            return null
        var _a = this.state.dragging, style = _a.style, rest = __rest(_a, ['style'])
        var Child = this.props.children
        style = Object.assign({}, style, {
            boxShadow: '1px 1px 5px 0px hsla(0, 0%, 0%, 0.31)',
            zIndex: 3,
        }, this.props.draggingElementStyle || {})
        if (!style.backgroundColor)
            style.backgroundColor = 'white'
        return (React.createElement(Child, __assign({ ref: this.dragRef }, rest, { className: this.props.draggingElementClassName, style: style, onSortMouseDown: function (e) { } })))
    }
    SortableVariableSizeList.prototype.renderInnerElement = function () {
        var _this = this
        var InnerElement = this.props.innerElementType
        return React.forwardRef(function (_a, ref) {
            var children = _a.children, rest = __rest(_a, ['children'])
            var inner = (React.createElement(React.Fragment, null,
                children,
                _this.renderDraggingElement(),
                _this.renderDropZoneElement()))
            if (InnerElement) {
                return (React.createElement(InnerElement, __assign({}, rest, { ref: ref }), inner))
            }
            return (React.createElement('div', __assign({}, rest, { ref: ref }), inner))
        })
    }
    SortableVariableSizeList.prototype.getSortableContext = function () {
        var value = {
            Child: this.props.children,
            itemKey: this.props.itemKey,
            onMouseDown: this.mouseDown,
        }
        if (value.Child === this.sortableContext.Child) {
            if (value.itemKey === this.sortableContext.itemKey) {
                return this.sortableContext
            }
        }
        this.sortableContext = value
        return this.sortableContext
    }
    SortableVariableSizeList.prototype.getDragContext = function () {
        if (!this.state.dragging)
            return null
        var value = {
            dragging: this.state.dragging,
            dragRef: this.dragRef,
            dropZoneRef: this.dropZoneRef,
            Child: this.props.children,
        }
        if (this.dragContext === null ||
            this.dragContext.dragging !== value.dragging ||
            this.dragContext.Child !== value.Child) {
            this.dragContext = value
        }
        return this.dragContext
    }
    SortableVariableSizeList.prototype.render = function () {
        var _a = this.props, children = _a.children, innerElementType = _a.innerElementType, props = __rest(_a, ['children', 'innerElementType'])
        return (React.createElement(SortableContext.Provider, { value: this.getSortableContext() },
            React.createElement(InnerElementContext.Provider, { value: this.props.innerElementType },
                React.createElement(DragContext.Provider, { value: this.getDragContext() },
                    React.createElement(VariableSizeList, __assign({ ref: this.listRef, innerElementType: InnerElementType }, props), Child)))))
    }
    return SortableVariableSizeList
}(React.Component))
export { SortableVariableSizeList }
export var SortableContext = React.createContext({
    Child: function () { return React.createElement('div', null) },
    onMouseDown: function () { },
    onTouchStart: function () { },
    itemKey: undefined
})
export var DragContext = React.createContext(null)
var InnerElementContext = React.createContext(undefined)
const InnerElementType = (props) => {
    var InnerElement = useContext(InnerElementContext)
    var children = props.children, rest = __rest(props, ['children'])
    var inner = (React.createElement(React.Fragment, null,
        children,
        React.createElement(DraggingElement, null),
        React.createElement(DropZoneElement, null)))
    if (InnerElement) return React.createElement(InnerElement, __assign({}, rest), inner)
    return React.createElement('div', __assign({}, rest), inner)
}
export const arrayMoveMutate = (array, from, to) => {
    const startIndex = from < 0 ? array.length + from : from
    if (startIndex >= 0 && startIndex < array.length) {
        const endIndex = to < 0 ? array.length + to : to

        const [item] = array.splice(from, 1)
        array.splice(endIndex, 0, item)
    }
}
export const arrayMove = (array, from, to) => {
    array = [...array]
    arrayMoveMutate(array, from, to)
    return array
}