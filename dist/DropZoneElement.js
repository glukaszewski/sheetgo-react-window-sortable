import React, { useContext } from 'react';
import { DragContext } from './index';
export function DropZoneElement() {
    var drag = useContext(DragContext);
    if (drag === null) return null
    var style = Object.assign({}, drag.dragging.style, {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
        zIndex: 2,
    })
    var dropElement = drag.dropElement || (React.createElement('div', { style: {
            borderTop: '2px solid #0087F7',
            marginLeft: '2px',
            marginRight: '2px',
            flex: 1,
            boxSizing: 'border-box',
        } }))
    return (React.createElement('div', { ref: drag.dropZoneRef, style: style }, dropElement))
}
