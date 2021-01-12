var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i]
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p]
        }
        return t
    }
    return __assign.apply(this, arguments);
};
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
import React, { useContext } from 'react'
import { DragContext } from './index'
import { emptyCallback } from './util'
export function DraggingElement() {
    var drag = useContext(DragContext)
    if (drag === null) return null
    var _a = drag.dragging, style = _a.style, rest = __rest(_a, ['style'])
    var Child = drag.Child
    style = Object.assign({}, style, {
        boxShadow: '1px 1px 5px 0px hsla(0, 0%, 0%, 0.31)',
        zIndex: 3,
        opacity: 0.8,
        cursor: 'grabbing'
    }, drag.draggingElementStyle || {})
    if (!style.backgroundColor) style.backgroundColor = 'white'
    return (React.createElement(Child, __assign({ ref: drag.dragRef }, rest, { 
        className: drag.draggingElementClassName,
        style: style,
        onSortMouseDown: emptyCallback,
        onSortTouchStart: emptyCallback
    })))
}
