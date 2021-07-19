/// <reference path="./index.d.ts" />

declare interface EntryOptions {
    hardwareEnable?: boolean;
    mediaFilePath?: string;
    moduleBaseUrl?: string;
    dataTableDisable?: boolean;
}

/**
 * 엔트리 실제 인스턴스에 대한 정의
 */
declare interface IEntry extends EntryOptions {
    HW: typeof import('../src/class/hw').default;
    Intro: typeof import('../src/class/intro').default;
    PropertyPanel: typeof import('../src/class/property_panel').default;
    Pdf: typeof import('../src/class/pdf').default;
    BlockMenu: typeof import('../src/playground/block_menu').default;
    Dom: typeof import('../src/core/dom').default;
    Dialog: typeof import('../src/class/dialog').default;
    popupHelper: typeof import('../src/class/popup_helper').default;
    moduleManager: typeof import('../src/class/entryModuleLoader').default;
    Model: (target: any, isSeal: boolean) => void;
    BlockView: any;
    SVG: any;
    Event: any;
    Code: any;
    BlockMenuScroller: any;

    // 엔트리 내 클래스들
    skeleton: { [name: string]: ISkeleton };
    options: EntryOptions;
    engine: any;
    toast: IEntry.WorkspaceToast;
    playground: IEntry.Playground;
    workspace: any;
    console: any;
    propertyPanel: import('../src/class/property_panel').default;
    container: IEntry.Container;
    stage: IEntry.Stage;
    Utils: any;
    GlobalSvg: any;
    Workspace: any;
    DragInstance: any;

    // 엔트리에서 네임스페이스에 할당되어있는 특정 객체들
    HARDWARE_LIST: { [hardwareName: string]: any };
    KeyboardCode: {
        map: { [keyname: string]: number };
        codeToKeyCode: { [keyname: string]: number };
    };
    events_: any;
    requestUpdate: boolean;
    TEXT_ALIGNS: string[];
    TEXT_ALIGN_LEFT: number;
    TEXT_ALIGN_CENTER: number;
    TEXT_ALIGN_RIGHT: number;
    block: { [blockName: string]: EntryBlock };
    hw: import('../src/class/hw').default; // HW instance
    interfaceState: { [key: string]: any };

    // 엔트리 전역에 할당된 이벤트 객체
    disposeEvent: any;
    documentMousemove: any;
    keyPressed: any;
    windowResized: any;
    documentMousedown: any;

    // 엔트리 전역에 할당된 상수
    DRAG_MODE_DRAG: 2; // utils.js
    DRAG_MODE_NONE: 0;
    DRAG_MODE_MOUSEDOWN: 1;
    type: 'workspace' | string;

    // 엔트리에서 네임스페이스에 할당되어있는 특정 함수들
    addEventListener(type: string, listener: () => void): void;
    removeEventListener(eventName: string, listener: () => void): void;
    dispatchEvent(eventName: string, ...args: any): void;
    getMainWS(): UnknownAny | undefined;
    isMobile(): boolean;
    assert(predicate: any, message: string): void;
    resizeElement(interfaceModel?: any): void;
    loadExternalModules(project: any): Promise<void>;
    bindAnimationCallbackOnce(element: any, func: () => void): void;
    createElement<K extends keyof HTMLElementTagNameMap>(
        type: HTMLElement | K,
        elementId?: string
    ): HTMLElementTagNameMap[K];
    do(commandName: string, ...args: any[]): any;
}

declare var Entry: IEntry;
