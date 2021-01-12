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
import React, { useCallback, useContext } from 'react'
import { DragContext, SortableContext } from './index'
export function Child(props) {
    var sortable = useContext(SortableContext)
    var drag = useContext(DragContext)
    var style = props.style, index = props.index, rest = __rest(props, ['style', 'index']) 
    var onMouseDown = sortable.onMouseDown
    var onTouchStart = sortable.onTouchStart
    var mouseDown = useCallback(function (e) { return onMouseDown(e, props) }, [
        props,
        onMouseDown
    ])
    var touchStart = useCallback(function (e) { return onTouchStart(e, props) }, [
        props,
        onTouchStart
    ])
    if (drag !== null && index === drag.dragging.index) {
        return null
    }
    var key
    if (sortable.itemKey)
        key = sortable.itemKey(props.index, props.data)
    return (React.createElement(sortable.Child, __assign({}, rest, { 
        key, 
        style, 
        index, 
        onSortMouseDown: mouseDown, 
        onSortTouchStart: touchStart 
    })))
}
