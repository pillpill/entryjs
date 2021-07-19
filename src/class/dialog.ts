'use strict';

import * as PIXI from 'pixi.js';
import { GEHelper } from '../graphicEngine/GEHelper';

type EntryObjectEntity = any;

type NotchType = 'ne' | 'nw' | 'se' | 'sw';

class EntryDialog {
    private parent: EntryObjectEntity;
    private padding = 10;
    private border = 2;
    private width: number;
    private height: number;
    private notch: any;
    private _isNoContentTried: boolean;
    private readonly message_: string;
    private readonly mode_: 'speak' | 'ask';
    public object: any;

    constructor(
        entity: EntryObjectEntity,
        message: string | number,
        mode: 'speak' | 'ask',
        isStamp: boolean
    ) {
        if (entity.isEngineStop) {
            return;
        }
        if (entity.dialog) {
            entity.dialog.remove();
        }
        entity.dialog = this;
        this.parent = entity;

        let messageString = typeof message == 'number' ? String(message) : message;
        if (Entry.console) {
            Entry.console.print(message, mode);
        }
        messageString = messageString.match(/.{1,15}/g).join('\n');
        this.message_ = messageString;
        this.mode_ = mode;
        if (mode === 'speak' || mode === 'ask') {
            this.generateSpeak();
        }
        if (!isStamp) {
            Entry.stage.loadDialog(this);
        }
    }

    /**
     * Set position
     */
    update() {
        const parentObj = this.parent.object;
        let bound = GEHelper.calcParentBound(parentObj);
        if (!bound && this.parent.type === 'textBox') {
            if (!this._isNoContentTried) {
                this.parent.setText(' ');
                bound = GEHelper.calcParentBound(parentObj);
                this._isNoContentTried = true;
            } else {
                delete this._isNoContentTried;
                return;
            }
        }
        let notchType = '';
        if (!this.object) {
            return;
        }
        if (bound.y - 20 - this.border > -135) {
            this.object.y = Math.max(
                bound.y - this.height / 2 - 20 - this.padding,
                -135 + this.height / 2 + this.padding
            );
            notchType += 'n';
        } else {
            this.object.y = Math.min(
                bound.y + bound.height + this.height / 2 + 20 + this.padding,
                135 - this.height / 2 - this.padding
            );
            notchType += 's';
        }
        if (bound.x + bound.width / 2 < 0) {
            this.object.x = Math.min(
                bound.x + bound.width + this.width / 2,
                240 - this.width / 2 - this.padding
            );
            notchType += 'e';
        } else {
            this.object.x = Math.max(
                bound.x - this.width / 2,
                -240 + this.width / 2 + this.padding
            );
            notchType += 'w';
        }

        if (this.notch.type != notchType) {
            this.object.removeChild(this.notch);
            this.notch = this.createSpeakNotch(notchType as NotchType);
            this.object.addChild(this.notch);
        }

        this._isNoContentTried && this.parent.setText('');
        Entry.requestUpdate = true;
    }

    remove() {
        Entry.stage.unloadDialog(this);
        this.parent.dialog = null;
        Entry.requestUpdate = true;
    }

    private createSpeakNotch(type: NotchType) {
        const notch = GEHelper.newGraphic();
        notch.type = type;
        const colorSet = EntryStatic.colorSet.canvas || {};
        const height = this.height + this.padding;
        const padding = this.padding;
        const width = this.width;
        if (type === 'ne') {
            notch.graphics
                .f('#ffffff')
                .ss(3, 2)
                .s('#ffffff')
                .mt(3, height)
                .lt(11, height)
                .ss(2, 1, 1)
                .s(colorSet.dialog || '#4f80ff')
                .mt(2, height)
                .lt(2, height + 9)
                .lt(12, height);
        } else if (type === 'nw') {
            notch.graphics
                .f('#ffffff')
                .ss(3, 2)
                .s('#ffffff')
                .mt(width - 3, height)
                .lt(width - 11, height)
                .ss(2, 1, 1)
                .s(colorSet.dialog || '#4f80ff')
                .mt(width - 2, height)
                .lt(width - 2, height + 9)
                .lt(width - 12, height);
        } else if (type === 'se') {
            notch.graphics
                .f('#ffffff')
                .ss(3, 2)
                .s('#ffffff')
                .mt(3, -padding)
                .lt(11, -padding)
                .ss(2, 1, 1)
                .s(colorSet.dialog || '#4f80ff')
                .mt(2, -padding)
                .lt(2, -padding - 9)
                .lt(12, -padding);
        } else if (type === 'sw') {
            notch.graphics
                .f('#ffffff')
                .ss(3, 2)
                .s('#ffffff')
                .mt(width - 3, -padding)
                .lt(width - 11, -padding)
                .ss(2, 1, 1)
                .s(colorSet.dialog || '#4f80ff')
                .mt(this.width - 2, -padding)
                .lt(width - 2, -padding - 9)
                .lt(width - 12, -padding);
        }
        return notch;
    }

    private generateSpeak() {
        this.object = GEHelper.newContainer('[dialog] container');
        const fontFamily = EntryStatic.fontFamily || 'NanumGothic';
        const text = GEHelper.textHelper.newText(
            this.message_,
            `15px ${fontFamily}`,
            '#000000',
            'top',
            'left'
        );

        let bound;
        if (GEHelper.isWebGL) {
            bound = text;
        } else {
            bound = text.getTransformedBounds();
        }

        const height = bound.height;
        const width = bound.width >= 10 ? bound.width : 17;
        const rect = GEHelper.newGraphic();
        const colorSet = EntryStatic.colorSet.canvas || {};
        rect.graphics
            .f(colorSet.dialogBG || '#ffffff')
            .ss(2, 'round')
            .s(colorSet.dialog || '#4f80ff')
            .rr(
                -this.padding,
                -this.padding,
                width + 2 * this.padding,
                height + 2 * this.padding,
                this.padding
            );
        this.object.addChild(rect);
        this.object.regX = width / 2;
        this.object.regY = height / 2;
        this.width = width;
        this.height = height;
        this.notch = this.createSpeakNotch('ne');
        this.update();
        this.object.addChild(this.notch);
        this.object.addChild(text);
        Entry.requestUpdate = true;
    }
}

export default EntryDialog;
Entry.Dialog = EntryDialog;
