import * as React from "react";
import { FixedSizeListProps, ListChildComponentProps, VariableSizeListProps, ListItemKeySelector, Align } from "react-window";
import { CSSProperties, Ref, RefObject } from "react";
export interface MouseEvent {
    clientY: number;
}
export declare type ChildrenProps = ListChildComponentProps & {
    onSortMouseDown(e: MouseEvent): void;
    onSortTouchStart(e: TouchEvent): void;
    ref?: Ref<any>;
    className?: string;
};
export declare type Props<ListType> = {
    children: React.ComponentType<ChildrenProps>;
    autoScrollWhenDistanceLessThan?: number;
    autoScrollSpeed?: number;
    draggingElementClassName?: string;
    draggingElementStyle?: CSSProperties;
    dropElement?: any;
    onSortOrderChanged(params: {
        originalIndex: number;
        newIndex: number;
    }): void;
    itemKey?: ListItemKeySelector;
} & Omit<ListType, "children">;
export interface State {
    dragging: null | ListChildComponentProps;
}
export declare type AutoScrollKeyword = "up" | "down" | "none";
export interface ScrollCompatibleList {
    scrollTo(scrollOffset: number): void;
    scrollToItem(index: number, align?: Align): void;
}
export declare const SortableFixedSizeList: React.ForwardRefExoticComponent<{
    children: React.ComponentType<ChildrenProps>;
    autoScrollWhenDistanceLessThan?: number | undefined;
    autoScrollSpeed?: number | undefined;
    draggingElementClassName?: string | undefined;
    draggingElementStyle?: React.CSSProperties | undefined;
    dropElement?: any;
    onSortOrderChanged(params: {
        originalIndex: number;
        newIndex: number;
    }): void;
    itemKey?: ListItemKeySelector | undefined;
} & Pick<FixedSizeListProps, "style" | "className" | "itemSize" | "height" | "itemCount" | "width" | "direction" | "layout" | "initialScrollOffset" | "itemKey" | "overscanCount" | "onItemsRendered" | "onScroll" | "innerElementType" | "innerRef" | "innerTagName" | "itemData" | "outerElementType" | "outerRef" | "outerTagName" | "useIsScrolling"> & React.RefAttributes<any>>;
export declare type Timeout = any;
export declare class SortableVariableSizeList extends React.Component<Props<VariableSizeListProps>, State> {
    dragRef: RefObject<HTMLElement>;
    dropZoneRef: RefObject<HTMLDivElement>;
    listRef: RefObject<ScrollCompatibleList>;
    startClientY: number;
    startDragObjOffsetY: number;
    hoverIndex: number | null;
    autoScroll: AutoScrollKeyword;
    autoScrollTimer: Timeout | null;
    constructor(props: any);
    getAutoScrollWhenDistanceLessThan(): number;
    getAutoScrollSpeed(): number;
    componentWillUnmount(): void;
    mouseDown(e: MouseEvent, params: ListChildComponentProps): void;
    onMouseMove(event: MouseEvent): void;
    onTouchMove(event: TouchEvent): void;
    updateDragElementPositioning(mouseY: number): void;
    getHoverDetails(offsetY: number): {
        offsetTop: number;
        index: number;
    };
    getScrollOffsetTop(list: ScrollCompatibleList): number;
    getScrollRef(list: ScrollCompatibleList): HTMLDivElement;
    checkAutoScroll(mouseY: number): void;
    setAutoScroll(scroll: AutoScrollKeyword, mouseY: number): void;
    onMouseUp(): void;
    onTouchEnd(): void;
    renderDropZoneElement(): JSX.Element | undefined;
    renderDraggingElement(): JSX.Element | null;
    renderInnerElement(): React.ForwardRefExoticComponent<React.RefAttributes<any>>;
    sortableContext: ISortableContext;
    getSortableContext(): ISortableContext;
    dragContext: IDragContext | null;
    getDragContext(): IDragContext | null;
    render(): JSX.Element;
}
export interface ISortableContext {
    Child: React.ComponentType<ChildrenProps>;
    itemKey?: ListItemKeySelector;
    onMouseDown(e: MouseEvent, params: ListChildComponentProps): void;
    onTouchStart(e: TouchEvent, params: ListChildComponentProps): void;
}
export declare const SortableContext: React.Context<ISortableContext>;
export interface IDragContext {
    dragging: ListChildComponentProps;
    dragRef: Ref<HTMLElement>;
    dropZoneRef: Ref<HTMLDivElement>;
    draggingElementClassName?: string;
    draggingElementStyle?: CSSProperties;
    dropElement?: any;
    Child: React.ComponentType<ChildrenProps>;
}
export declare const DragContext: React.Context<IDragContext | null>;
