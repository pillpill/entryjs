const axios = require('axios');
const _memoize = require('lodash/memoize');
const { memoizeClearByTime } = require('@util/common');
const PromiseManager = require('@core/promiseManager');
const pm = new PromiseManager();
const getFindNotice = _memoize(() => {
    return axios.get('/api/discuss/findNotice', {
        timeout: 10000,
    });
});

module.exports = {
    getBlocks() {
        return {
            async_value: {
                color: '#FFD974',
                template: '테스트',
                skeleton: 'basic_string_field',
                statements: [],
                async: true,
                class: 'calc_timer',
                isNotFor: [],
                func: async function(sprite, script) {
                    memoizeClearByTime(getFindNotice, 1000);
                    return pm.Promise((resolve) => {
                        getFindNotice()
                            .then(({ data }) => {
                                const [item = {}] = data;
                                const { title = 'TITLE' } = item;
                                resolve(title);
                            })
                            .catch(({ message = 'error' }) => {
                                resolve(message);
                            });
                    });
                    // return new PromiseManager().EventPromise('callApi', {url: '/api/discuss/findNotice'}, { timeout: 10000, defaultValue: 10 });
                    // return new PromiseManager().Promise((resolve)=> {
                    //     setTimeout(()=> {
                    //         console.log('aaa');
                    //         resolve(3);
                    //     }, 300)
                    // });
                },
            },
            calc_basic: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Dropdown',
                        options: [['+', 'PLUS'], ['-', 'MINUS'], ['x', 'MULTI'], ['/', 'DIVIDE']],
                        value: 'PLUS',
                        fontSize: 11,
                        noArrow: true,
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                ],
                events: {},
                def: {
                    params: [
                        {
                            type: 'number',
                            params: ['10'],
                        },
                        'PLUS',
                        {
                            type: 'number',
                            params: ['10'],
                        },
                    ],
                    type: 'calc_basic',
                },
                pyHelpDef: {
                    params: [
                        {
                            type: 'number',
                            params: ['A&value'],
                        },
                        'PLUS',
                        {
                            type: 'number',
                            params: ['B&value'],
                        },
                    ],
                    type: 'calc_basic',
                },
                defs: [
                    {
                        params: [
                            {
                                type: 'number',
                                params: ['10'],
                            },
                            'PLUS',
                            {
                                type: 'number',
                                params: ['10'],
                            },
                        ],
                        type: 'calc_basic',
                    },
                    {
                        params: [
                            {
                                type: 'number',
                                params: ['10'],
                            },
                            'MINUS',
                            {
                                type: 'number',
                                params: ['10'],
                            },
                        ],
                        type: 'calc_basic',
                    },
                    {
                        params: [
                            {
                                type: 'number',
                                params: ['10'],
                            },
                            'MULTI',
                            {
                                type: 'number',
                                params: ['10'],
                            },
                        ],
                        type: 'calc_basic',
                    },
                    {
                        params: [
                            {
                                type: 'number',
                                params: ['10'],
                            },
                            'DIVIDE',
                            {
                                type: 'number',
                                params: ['10'],
                            },
                        ],
                        type: 'calc_basic',
                    },
                ],
                paramsKeyMap: {
                    LEFTHAND: 0,
                    OPERATOR: 1,
                    RIGHTHAND: 2,
                },
                class: 'calc',
                isNotFor: [],
                func: async function(sprite, script) {
                    var operator = script.getField('OPERATOR', script);
                    let [leftValue, rightValue] = await Promise.all([
                        script.getNumberValue('LEFTHAND', script),
                        script.getNumberValue('RIGHTHAND', script),
                    ]);
                    if (operator == 'PLUS') {
                        var leftStringValue = String(leftValue);
                        var rightStringValue = String(rightValue);
                        if (!Entry.Utils.isNumber(leftStringValue)) leftValue = leftStringValue;
                        if (!Entry.Utils.isNumber(rightStringValue)) rightValue = rightStringValue;
                        if (typeof leftValue === 'number' && typeof rightValue === 'number')
                            return new BigNumber(leftValue).plus(rightValue).toNumber();
                        else return leftValue + rightValue;
                    }
                    leftValue = new BigNumber(leftValue);
                    if (operator == 'MINUS') return leftValue.minus(rightValue).toNumber();
                    else if (operator == 'MULTI') return leftValue.times(rightValue).toNumber();
                    else return leftValue.dividedBy(rightValue).toNumber();
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '(%1 %2 %3)',
                            template: '%1 %2 %3',
                            keyOption: 'calc_basic',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        ['+', 'PLUS'],
                                        ['-', 'MINUS'],
                                        ['x', 'MULTI'],
                                        ['/', 'DIVIDE'],
                                    ],
                                    value: 'PLUS',
                                    fontSize: 11,
                                    noArrow: true,
                                    converter: Entry.block.converters.returnOperator,
                                    paramType: 'operator',
                                },
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                            ],
                        },
                    ],
                },
            },
            calc_rand: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_calc_rand_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_calc_rand_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_calc_rand_3,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'number',
                            params: ['0'],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['10'],
                        },
                        null,
                    ],
                    type: 'calc_rand',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'number',
                            params: ['A&value'],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['B&value'],
                        },
                        null,
                    ],
                    type: 'calc_rand',
                },
                paramsKeyMap: {
                    LEFTHAND: 1,
                    RIGHTHAND: 3,
                },
                class: 'calc',
                isNotFor: [],
                func: function(sprite, script) {
                    var leftValue = script.getStringValue('LEFTHAND', script);
                    var rightValue = script.getStringValue('RIGHTHAND', script);
                    var left = Math.min(leftValue, rightValue);
                    var right = Math.max(leftValue, rightValue);
                    var isLeftFloat = Entry.isFloat(leftValue);
                    var isRightFloat = Entry.isFloat(rightValue);
                    if (isRightFloat || isLeftFloat)
                        return (Math.random() * (right - left) + left).toFixed(2);
                    else return Math.floor(Math.random() * (right - left + 1) + left);
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'random.randint(%2, %4)',
                            blockType: 'param',
                            textParams: [
                                null,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                    paramType: 'integer',
                                },
                                null,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                    paramType: 'integer',
                                },
                                null,
                            ],
                        },
                        {
                            syntax: 'random.uniform(%2, %4)',
                            blockType: 'param',
                            textParams: [
                                null,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                    paramType: 'float',
                                },
                                null,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                    paramType: 'float',
                                },
                                null,
                            ],
                        },
                    ],
                },
            },
            coordinate_mouse: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_coordinate_mouse_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Dropdown',
                        options: [['x', 'x'], ['y', 'y']],
                        value: 'x',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_coordinate_mouse_2,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [null, null, null],
                    type: 'coordinate_mouse',
                },
                pyHelpDef: {
                    params: [null, 'A&value', null],
                    type: 'coordinate_mouse',
                },
                paramsKeyMap: {
                    VALUE: 1,
                },
                class: 'calc',
                isNotFor: [],
                func: function(sprite, script) {
                    var targetCoordinate = script.getField('VALUE', script);
                    if (targetCoordinate === 'x') {
                        return Number(Entry.stage.mouseCoordinate.x);
                    } else {
                        return Number(Entry.stage.mouseCoordinate.y);
                    }
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_mouse_pointer(%2)',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Text',
                                    text: Lang.Blocks.CALC_coordinate_mouse_1,
                                    color: '#3D3D3D',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [['x', 'x'], ['y', 'y']],
                                    value: 'x',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringKey,
                                    codeMap: 'Entry.CodeMap.Entry.coordinate_mouse[1]',
                                },
                                {
                                    type: 'Text',
                                    text: Lang.Blocks.CALC_coordinate_mouse_2,
                                    color: '#3D3D3D',
                                },
                            ],
                        },
                    ],
                },
            },
            coordinate_object: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_coordinate_object_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'DropdownDynamic',
                        value: null,
                        menuName: 'spritesWithSelf',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_coordinate_object_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.CALC_coordinate_x_value, 'x'],
                            [Lang.Blocks.CALC_coordinate_y_value, 'y'],
                            [Lang.Blocks.CALC_coordinate_rotation_value, 'rotation'],
                            [Lang.Blocks.CALC_coordinate_direction_value, 'direction'],
                            [Lang.Blocks.CALC_coordinate_size_value, 'size'],
                            [Lang.Blocks.CALC_picture_index, 'picture_index'],
                            [Lang.Blocks.CALC_picture_name, 'picture_name'],
                        ],
                        value: 'x',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                ],
                events: {},
                def: {
                    params: [null, null, null, null],
                    type: 'coordinate_object',
                },
                pyHelpDef: {
                    params: [null, 'A&value', null, 'B&value'],
                    type: 'coordinate_object',
                },
                paramsKeyMap: {
                    VALUE: 1,
                    COORDINATE: 3,
                },
                class: 'calc',
                isNotFor: [],
                func: function(sprite, script) {
                    var targetId = script.getField('VALUE', script);
                    var targetEntity;
                    if (targetId == 'self') targetEntity = sprite;
                    else targetEntity = Entry.container.getEntity(targetId);

                    var targetCoordinate = script.getField('COORDINATE', script);
                    switch (targetCoordinate) {
                        case 'x':
                            return targetEntity.getX();
                        case 'y':
                            return targetEntity.getY();
                        case 'rotation':
                            return targetEntity.getRotation();
                        case 'direction':
                            return targetEntity.getDirection();
                        case 'picture_index':
                            var object = targetEntity.parent;
                            var pictures = object.pictures;
                            return pictures.indexOf(targetEntity.picture) + 1;
                        case 'size':
                            return Number(targetEntity.getSize().toFixed(1));
                        case 'picture_name':
                            var object = targetEntity.parent;
                            var pictures = object.pictures;
                            var picture = pictures[pictures.indexOf(targetEntity.picture)];
                            return picture.name;
                    }
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_object(%2, %4)',
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'DropdownDynamic',
                                    value: null,
                                    menuName: 'spritesWithSelf',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnObjectOrStringValue,
                                    codeMap: 'Entry.CodeMap.Entry.coordinate_object[1]',
                                },
                                undefined,
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.CALC_coordinate_x_value, 'x'],
                                        [Lang.Blocks.CALC_coordinate_y_value, 'y'],
                                        [Lang.Blocks.CALC_coordinate_rotation_value, 'rotation'],
                                        [Lang.Blocks.CALC_coordinate_direction_value, 'direction'],
                                        [Lang.Blocks.CALC_coordinate_size_value, 'size'],
                                        [Lang.Blocks.CALC_picture_index, 'picture_index'],
                                        [Lang.Blocks.CALC_picture_name, 'picture_name'],
                                    ],
                                    value: 'x',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValue,
                                    codeMap: 'Entry.CodeMap.Entry.coordinate_object[3]',
                                },
                            ],
                        },
                    ],
                },
            },
            get_sound_volume: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_get_sound_volume,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Text',
                        text: '',
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [null, null],
                    type: 'get_sound_volume',
                },
                class: 'calc',
                isNotFor: [],
                func: function(sprite, script) {
                    return createjs.Sound.getVolume() * 100;
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_sound_volume()',
                            blockType: 'param',
                        },
                    ],
                },
            },
            quotient_and_mod: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_quotient_and_mod_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_quotient_and_mod_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_quotient_and_mod_3,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.CALC_quotient_and_mod_sub_1, 'QUOTIENT'],
                            [Lang.Blocks.CALC_quotient_and_mod_sub_2, 'MOD'],
                        ],
                        value: 'QUOTIENT',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['10'],
                        },
                        null,
                        {
                            type: 'text',
                            params: ['10'],
                        },
                        null,
                        null,
                    ],
                    type: 'quotient_and_mod',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                        {
                            type: 'text',
                            params: ['B&value'],
                        },
                        null,
                        null,
                    ],
                    type: 'quotient_and_mod',
                },
                paramsKeyMap: {
                    LEFTHAND: 1,
                    RIGHTHAND: 3,
                    OPERATOR: 5,
                },
                class: 'calc',
                isNotFor: [],
                func: function(sprite, script) {
                    var left = script.getNumberValue('LEFTHAND', script);
                    var right = script.getNumberValue('RIGHTHAND', script);
                    if (isNaN(left) || isNaN(right)) throw new Error();
                    var operator = script.getField('OPERATOR', script);
                    if (operator == 'QUOTIENT') return Math.floor(left / right);
                    else return left % right;
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '(%2 // %4)',
                            template: '%2 // %4',
                            params: [null, null, null, null, null, 'QUOTIENT'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.CALC_quotient_and_mod_sub_1, 'QUOTIENT'],
                                        [Lang.Blocks.CALC_quotient_and_mod_sub_2, 'MOD'],
                                    ],
                                    value: 'QUOTIENT',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValue,
                                },
                            ],
                        },
                        {
                            syntax: '(%2 % %4)',
                            template: '%2 % %4',
                            params: [null, null, null, null, null, 'MOD'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.CALC_quotient_and_mod_sub_1, 'QUOTIENT'],
                                        [Lang.Blocks.CALC_quotient_and_mod_sub_2, 'MOD'],
                                    ],
                                    value: 'QUOTIENT',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValue,
                                },
                            ],
                        },
                    ],
                },
            },
            calc_operation: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_calc_operation_of_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_calc_operation_of_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.CALC_calc_operation_square, 'square'],
                            [Lang.Blocks.CALC_calc_operation_root, 'root'],
                            [Lang.Blocks.CALC_calc_operation_sin, 'sin'],
                            [Lang.Blocks.CALC_calc_operation_cos, 'cos'],
                            [Lang.Blocks.CALC_calc_operation_tan, 'tan'],
                            [Lang.Blocks.CALC_calc_operation_asin, 'asin_radian'],
                            [Lang.Blocks.CALC_calc_operation_acos, 'acos_radian'],
                            [Lang.Blocks.CALC_calc_operation_atan, 'atan_radian'],
                            [Lang.Blocks.CALC_calc_operation_log, 'log'],
                            [Lang.Blocks.CALC_calc_operation_ln, 'ln'],
                            [Lang.Blocks.CALC_calc_operation_unnatural, 'unnatural'],
                            [Lang.Blocks.CALC_calc_operation_floor, 'floor'],
                            [Lang.Blocks.CALC_calc_operation_ceil, 'ceil'],
                            [Lang.Blocks.CALC_calc_operation_round, 'round'],
                            [Lang.Blocks.CALC_calc_operation_factorial, 'factorial'],
                            [Lang.Blocks.CALC_calc_operation_abs, 'abs'],
                        ],
                        value: 'square',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'number',
                            params: ['10'],
                        },
                        null,
                        null,
                    ],
                    type: 'calc_operation',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'number',
                            params: ['A&value'],
                        },
                        null,
                        null,
                    ],
                    type: 'calc_operation',
                },
                paramsKeyMap: {
                    LEFTHAND: 1,
                    VALUE: 3,
                },
                class: 'calc',
                isNotFor: [],
                func: function(sprite, script) {
                    var value = script.getNumberValue('LEFTHAND', script);
                    var operator = script.getField('VALUE', script);
                    var xRangeCheckList = ['asin_radian', 'acos_radian'];
                    if (xRangeCheckList.indexOf(operator) > -1 && (value > 1 || value < -1))
                        throw new Error('x range exceeded');

                    var needToConvertList = ['sin', 'cos', 'tan'];
                    if (operator.indexOf('_')) operator = operator.split('_')[0];

                    if (needToConvertList.indexOf(operator) > -1) value = Entry.toRadian(value);

                    var returnVal = 0;
                    switch (operator) {
                        case 'square':
                            returnVal = value * value;
                            break;
                        case 'factorial':
                            returnVal = Entry.factorial(value);
                            break;
                        case 'root':
                            returnVal = Math.sqrt(value);
                            break;
                        case 'log':
                            returnVal = Math.log(value) / Math.LN10;
                            break;
                        case 'ln':
                            returnVal = Math.log(value);
                            break;
                        case 'asin':
                        case 'acos':
                        case 'atan':
                            returnVal = Entry.toDegrees(Math[operator](value));
                            break;
                        case 'unnatural':
                            returnVal = new BigNumber(value).minus(Math.floor(value)).toNumber();
                            if (value < 0) returnVal = 1 - returnVal;
                            break;
                        default:
                            returnVal = Math[operator](value);
                    }

                    return returnVal;
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '(%2 ** 2)',
                            template: '%2 ** 2',
                            params: [null, null, null, 'square'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            // for square
                            syntax: 'math.pow(%2)',
                            params: [null, null, null, 'square'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.sqrt(%2)',
                            params: [null, null, null, 'root'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    isListIndex: true,
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.sin(%2)',
                            params: [null, null, null, 'sin'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.cos(%2)',
                            params: [null, null, null, 'cos'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.tan(%2)',
                            params: [null, null, null, 'tan'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.asin(%2)',
                            params: [null, null, null, 'asin_radian'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.acos(%2)',
                            params: [null, null, null, 'acos_radian'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.atan(%2)',
                            params: [null, null, null, 'atan_radian'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.log10(%2)',
                            params: [null, null, null, 'log'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.log(%2)',
                            params: [null, null, null, 'ln'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: '%2 - math.floor(%2)',
                            params: [null, null, null, 'unnatural'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.floor(%2)',
                            params: [null, null, null, 'floor'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.ceil(%2)',
                            params: [null, null, null, 'ceil'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.round(%2)',
                            params: [null, null, null, 'round'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.factorial(%2)',
                            params: [null, null, null, 'factorial'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                        {
                            syntax: 'math.fabs(%2)',
                            params: [null, null, null, 'abs'],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                null,
                            ],
                        },
                    ],
                },
            },
            get_project_timer_value: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_get_timer_value,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Text',
                        text: '',
                        color: '#3D3D3D',
                    },
                ],
                events: {
                    viewAdd: [
                        function() {
                            if (Entry.engine) Entry.engine.showProjectTimer();
                        },
                    ],
                    viewDestroy: [
                        function(block, notIncludeSelf) {
                            if (Entry.engine) Entry.engine.hideProjectTimer(block, notIncludeSelf);
                        },
                    ],
                },
                def: {
                    params: [null, null],
                    type: 'get_project_timer_value',
                },
                class: 'calc_timer',
                isNotFor: [],
                func: function(sprite, script) {
                    return Entry.engine.projectTimer.getValue();
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_timer()',
                            blockType: 'param',
                        },
                    ],
                },
            },
            choose_project_timer_action: {
                color: '#FFD974',
                skeleton: 'basic',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_choose_project_timer_action_1,
                        color: '#000',
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.CALC_choose_project_timer_action_sub_1, 'START'],
                            [Lang.Blocks.CALC_choose_project_timer_action_sub_2, 'STOP'],
                            [Lang.Blocks.CALC_choose_project_timer_action_sub_3, 'RESET'],
                        ],
                        value: 'START',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_choose_project_timer_action_2,
                        color: '#000',
                    },
                    {
                        type: 'Indicator',
                        img: 'block_icon/calc_01.png',
                        size: 12,
                    },
                ],
                events: {
                    viewAdd: [
                        function() {
                            if (Entry.engine) Entry.engine.showProjectTimer();
                        },
                    ],
                    dataDestroy: [
                        function(block) {
                            if (Entry.engine) Entry.engine.hideProjectTimer(block);
                        },
                    ],
                },
                def: {
                    params: [null, 'START', null, null],
                    type: 'choose_project_timer_action',
                },
                pyHelpDef: {
                    params: [null, 'A&value', null, null],
                    type: 'choose_project_timer_action',
                },
                paramsKeyMap: {
                    ACTION: 1,
                },
                class: 'calc_timer',
                isNotFor: [],
                func: function(sprite, script) {
                    var engine = Entry.engine;
                    var timer = engine.projectTimer;
                    var isPaused = timer.isPaused;
                    var isInit = timer.isInit;
                    var currentTime = new Date().getTime();

                    switch (script.getField('ACTION')) {
                        case 'START':
                            if (!isInit) {
                                engine.startProjectTimer();
                            } else if (isInit && isPaused) {
                                if (timer.pauseStart)
                                    timer.pausedTime += currentTime - timer.pauseStart;
                                delete timer.pauseStart;
                                timer.isPaused = false;
                            }
                            break;
                        case 'STOP':
                            if (isInit && !isPaused) {
                                timer.isPaused = true;
                                timer.pauseStart = currentTime;
                            }
                            break;
                        case 'RESET':
                            engine.resetTimer();
                            break;
                    }

                    return script.callReturn();
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            template: '%1 %2 %3',
                            syntax: 'Entry.timer(%2)',
                            textParams: [
                                {
                                    type: 'Text',
                                    text: 'Entry.timer(',
                                    color: '#000',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [
                                            Lang.Blocks.CALC_choose_project_timer_action_sub_1,
                                            'START',
                                        ],
                                        [
                                            Lang.Blocks.CALC_choose_project_timer_action_sub_2,
                                            'STOP',
                                        ],
                                        [
                                            Lang.Blocks.CALC_choose_project_timer_action_sub_3,
                                            'RESET',
                                        ],
                                    ],
                                    value: 'START',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValueLowerCase,
                                    codeMap: 'Entry.CodeMap.Entry.choose_project_timer_action[1]',
                                },
                                {
                                    type: 'Text',
                                    text: ')',
                                    color: '#000',
                                },
                            ],
                        },
                    ],
                },
            },
            set_visible_project_timer: {
                color: '#FFD974',
                skeleton: 'basic',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_timer_visible_1,
                        color: '#000',
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.CALC_timer_visible_show, 'SHOW'],
                            [Lang.Blocks.CALC_timer_visible_hide, 'HIDE'],
                        ],
                        value: 'SHOW',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_timer_visible_2,
                        color: '#000',
                    },
                    {
                        type: 'Indicator',
                        img: 'block_icon/calc_01.png',
                        size: 12,
                    },
                ],
                events: {
                    viewAdd: [
                        function() {
                            if (Entry.engine) Entry.engine.showProjectTimer();
                        },
                    ],
                    viewDestroy: [
                        function(block, notIncludeSelf) {
                            if (Entry.engine) Entry.engine.hideProjectTimer(block, notIncludeSelf);
                        },
                    ],
                },
                def: {
                    params: [null, 'HIDE', null, null],
                    type: 'set_visible_project_timer',
                },
                pyHelpDef: {
                    params: [null, 'A&value', null, null],
                    type: 'set_visible_project_timer',
                },
                paramsKeyMap: {
                    ACTION: 1,
                },
                class: 'calc_timer',
                isNotFor: [],
                func: function(sprite, script) {
                    var action = script.getField('ACTION');
                    var timer = Entry.engine.projectTimer;
                    if (action == 'SHOW') timer.setVisible(true);
                    else timer.setVisible(false);

                    return script.callReturn();
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            template: '%1 %2 %3',
                            syntax: 'Entry.timer_view(%2)',
                            textParams: [
                                {
                                    type: 'Text',
                                    text: 'Entry.timer_view(',
                                    color: '#000',
                                },
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.CALC_timer_visible_show, 'SHOW'],
                                        [Lang.Blocks.CALC_timer_visible_hide, 'HIDE'],
                                    ],
                                    value: 'SHOW',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValueLowerCase,
                                    codeMap: 'Entry.CodeMap.Entry.set_visible_project_timer[1]',
                                },
                                {
                                    type: 'Text',
                                    text: ')',
                                    color: '#000',
                                },
                            ],
                        },
                    ],
                },
            },
            get_date: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_get_date_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.CALC_get_date_year, 'YEAR'],
                            [Lang.Blocks.CALC_get_date_month, 'MONTH'],
                            [Lang.Blocks.CALC_get_date_day, 'DAY'],
                            [Lang.Blocks.CALC_get_date_hour, 'HOUR'],
                            [Lang.Blocks.CALC_get_date_minute, 'MINUTE'],
                            [Lang.Blocks.CALC_get_date_second, 'SECOND'],
                        ],
                        value: 'YEAR',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_get_date_2,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [null, 'YEAR', null],
                    type: 'get_date',
                },
                pyHelpDef: {
                    params: [null, 'A&value', null],
                    type: 'get_date',
                },
                paramsKeyMap: {
                    VALUE: 1,
                },
                class: 'calc_date',
                isNotFor: [],
                func: function(sprite, script) {
                    var operator = script.getField('VALUE', script);
                    var dateTime = new Date();
                    if (operator == 'YEAR') return dateTime.getFullYear();
                    else if (operator == 'MONTH') return dateTime.getMonth() + 1;
                    else if (operator == 'DAY') return dateTime.getDate();
                    else if (operator == 'HOUR') return dateTime.getHours();
                    else if (operator == 'MINUTE') return dateTime.getMinutes();
                    else return dateTime.getSeconds();
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_current_time(%2)',
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.CALC_get_date_year, 'YEAR'],
                                        [Lang.Blocks.CALC_get_date_month, 'MONTH'],
                                        [Lang.Blocks.CALC_get_date_day, 'DAY'],
                                        [Lang.Blocks.CALC_get_date_hour, 'HOUR'],
                                        [Lang.Blocks.CALC_get_date_minute, 'MINUTE'],
                                        [Lang.Blocks.CALC_get_date_second, 'SECOND'],
                                    ],
                                    value: 'YEAR',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValueLowerCase,
                                    codeMap: 'Entry.CodeMap.Entry.get_date[1]',
                                },
                            ],
                        },
                    ],
                },
            },
            distance_something: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_distance_something_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'DropdownDynamic',
                        value: null,
                        menuName: 'spritesWithMouse',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_distance_something_2,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [null, null, null],
                    type: 'distance_something',
                },
                pyHelpDef: {
                    params: [null, 'A&value', null],
                    type: 'distance_something',
                },
                paramsKeyMap: {
                    VALUE: 1,
                },
                class: 'calc_distance',
                isNotFor: [],
                func: function(sprite, script) {
                    var targetId = script.getField('VALUE', script);
                    if (targetId == 'mouse') {
                        var mousePos = Entry.stage.mouseCoordinate;
                        return Math.sqrt(
                            Math.pow(sprite.getX() - mousePos.x, 2) +
                                Math.pow(sprite.getY() - mousePos.y, 2)
                        );
                    } else {
                        var targetEntity = Entry.container.getEntity(targetId);
                        return Math.sqrt(
                            Math.pow(sprite.getX() - targetEntity.getX(), 2) +
                                Math.pow(sprite.getY() - targetEntity.getY(), 2)
                        );
                    }
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_distance_to(%2)',
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'DropdownDynamic',
                                    value: null,
                                    menuName: 'spritesWithMouse',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringKey,
                                    codeMap: 'Entry.CodeMap.Entry.distance_something[1]',
                                },
                            ],
                        },
                    ],
                },
            },
            get_sound_duration: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_get_sound_duration_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'DropdownDynamic',
                        value: null,
                        menuName: 'sounds',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_get_sound_duration_2,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [null, null, null],
                    type: 'get_sound_duration',
                },
                pyHelpDef: {
                    params: [null, 'A&value', null],
                    type: 'get_sound_duration',
                },
                paramsKeyMap: {
                    VALUE: 1,
                },
                class: 'calc_duration',
                isNotFor: [],
                func: function(sprite, script) {
                    var soundId = script.getField('VALUE', script);
                    var soundsArr = sprite.parent.sounds;

                    for (var i = 0; i < soundsArr.length; i++) {
                        if (soundsArr[i].id == soundId) return soundsArr[i].duration;
                    }
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_sound_length_of(%2)',
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'DropdownDynamic',
                                    value: null,
                                    menuName: 'sounds',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringKey,
                                },
                            ],
                        },
                    ],
                },
            },
            get_user_name: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [],
                events: {},
                def: {
                    params: [],
                    type: 'get_user_name',
                },
                class: 'calc_user',
                isNotFor: [],
                func: function(sprite, script) {
                    return window.user ? window.user.username : ' ';
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'Entry.value_of_username()',
                            blockType: 'param',
                        },
                    ],
                },
            },
            length_of_string: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_length_of_string_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_length_of_string_2,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.entry],
                        },
                        null,
                    ],
                    type: 'length_of_string',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                    ],
                    type: 'length_of_string',
                },
                paramsKeyMap: {
                    STRING: 1,
                },
                class: 'calc_string',
                isNotFor: [],
                func: function(sprite, script) {
                    return script.getStringValue('STRING', script).length;
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: 'len(%2)',
                            blockType: 'param',
                            keyOption: 'length_of_string',
                        },
                    ],
                },
            },
            combine_something: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.VARIABLE_combine_something_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.VARIABLE_combine_something_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.VARIABLE_combine_something_3,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.block_hi],
                        },
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.entry],
                        },
                        null,
                    ],
                    type: 'combine_something',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                        {
                            type: 'text',
                            params: ['B&value'],
                        },
                        null,
                    ],
                    type: 'combine_something',
                },
                paramsKeyMap: {
                    VALUE1: 1,
                    VALUE2: 3,
                },
                class: 'calc_string',
                isNotFor: [],
                func: function(sprite, script) {
                    var leftValue = script.getStringValue('VALUE1', script);
                    var rightValue = script.getStringValue('VALUE2', script);

                    return leftValue + rightValue;
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '(%2 + %4)',
                            template: '%2 + %4',
                            blockType: 'param',
                        },
                    ],
                },
            },
            char_at: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_char_at_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_char_at_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        isListIndex: true,
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_char_at_3,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.hi_entry],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['1'],
                        },
                        null,
                    ],
                    type: 'char_at',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['B&value'],
                        },
                        null,
                    ],
                    type: 'char_at',
                },
                paramsKeyMap: {
                    LEFTHAND: 1,
                    RIGHTHAND: 3,
                },
                class: 'calc_string',
                isNotFor: [],
                func: function(sprite, script) {
                    var str = script.getStringValue('LEFTHAND', script);
                    var index = script.getNumberValue('RIGHTHAND', script) - 1;
                    if (index < 0 || index > str.length - 1) throw new Error();
                    else return str[index];
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '%2[%4]',
                            blockType: 'param',
                            textParams: [
                                {
                                    type: 'Text',
                                    text: Lang.Blocks.CALC_char_at_1,
                                    color: '#3D3D3D',
                                },
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                {
                                    type: 'Text',
                                    text: Lang.Blocks.CALC_char_at_2,
                                    color: '#3D3D3D',
                                },
                                {
                                    type: 'Block',
                                    accept: 'string',
                                    paramType: 'index',
                                },
                                {
                                    type: 'Text',
                                    text: Lang.Blocks.CALC_char_at_3,
                                    color: '#3D3D3D',
                                },
                            ],
                            keyOption: 'char_at',
                        },
                    ],
                },
            },
            substring: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_substring_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_substring_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        isListIndex: true,
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_substring_3,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_substring_4,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.hi_entry],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['2'],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['5'],
                        },
                        null,
                    ],
                    type: 'substring',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['B&value'],
                        },
                        null,
                        {
                            type: 'number',
                            params: ['C&value'],
                        },
                        null,
                    ],
                    type: 'substring',
                },
                paramsKeyMap: {
                    STRING: 1,
                    START: 3,
                    END: 5,
                },
                class: 'calc_string',
                isNotFor: [],
                func: function(sprite, script) {
                    var str = script.getStringValue('STRING', script);
                    var start = script.getNumberValue('START', script) - 1;
                    var end = script.getNumberValue('END', script) - 1;
                    var strLen = str.length - 1;
                    if (start < 0 || end < 0 || start > strLen || end > strLen) throw new Error();
                    else return str.substring(Math.min(start, end), Math.max(start, end) + 1);
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '%2[%4:%6]',
                            blockType: 'param',
                            textParams: [
                                null,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                null,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                    paramType: 'index',
                                },
                                null,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                null,
                            ],
                        },
                    ],
                },
            },
            index_of_string: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_index_of_string_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_index_of_string_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_index_of_string_3,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.hi_entry],
                        },
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.entry],
                        },
                        null,
                    ],
                    type: 'index_of_string',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                        {
                            type: 'text',
                            params: ['B&value'],
                        },
                        null,
                    ],
                    type: 'index_of_string',
                },
                paramsKeyMap: {
                    LEFTHAND: 1,
                    RIGHTHAND: 3,
                },
                class: 'calc_string',
                isNotFor: [],
                func: function(sprite, script) {
                    var str = script.getStringValue('LEFTHAND', script);
                    var target = script.getStringValue('RIGHTHAND', script);
                    var index = str.indexOf(target);
                    return index + 1;
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '%2.find(%4)',
                            blockType: 'param',
                        },
                    ],
                },
            },
            replace_string: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_replace_string_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_replace_string_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_replace_string_3,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_replace_string_4,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.hi_entry],
                        },
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.hello],
                        },
                        null,
                        {
                            type: 'text',
                            params: [Lang.Blocks.nice],
                        },
                        null,
                    ],
                    type: 'replace_string',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                        {
                            type: 'text',
                            params: ['B&value'],
                        },
                        null,
                        {
                            type: 'text',
                            params: ['C&value'],
                        },
                        null,
                    ],
                    type: 'replace_string',
                },
                paramsKeyMap: {
                    STRING: 1,
                    OLD_WORD: 3,
                    NEW_WORD: 5,
                },
                class: 'calc_string',
                isNotFor: [],
                func: function(sprite, script) {
                    return script
                        .getStringValue('STRING', script)
                        .replace(
                            new RegExp(script.getStringValue('OLD_WORD', script), 'gm'),
                            script.getStringValue('NEW_WORD', script)
                        );
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '%2.replace(%4, %6)',
                            blockType: 'param',
                        },
                    ],
                },
            },
            change_string_case: {
                color: '#FFD974',
                skeleton: 'basic_string_field',
                statements: [],
                params: [
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_change_string_case_1,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Block',
                        accept: 'string',
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_change_string_case_2,
                        color: '#3D3D3D',
                    },
                    {
                        type: 'Dropdown',
                        options: [
                            [Lang.Blocks.CALC_change_string_case_sub_1, 'toUpperCase'],
                            [Lang.Blocks.CALC_change_string_case_sub_2, 'toLowerCase'],
                        ],
                        value: 'toUpperCase',
                        fontSize: 11,
                        arrowColor: EntryStatic.ARROW_COLOR_CALC,
                    },
                    {
                        type: 'Text',
                        text: Lang.Blocks.CALC_change_string_case_3,
                        color: '#3D3D3D',
                    },
                ],
                events: {},
                def: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['Hello Entry!'],
                        },
                        null,
                        null,
                        null,
                    ],
                    type: 'change_string_case',
                },
                pyHelpDef: {
                    params: [
                        null,
                        {
                            type: 'text',
                            params: ['A&value'],
                        },
                        null,
                        null,
                        null,
                    ],
                    type: 'change_string_case',
                },
                paramsKeyMap: {
                    STRING: 1,
                    CASE: 3,
                },
                class: 'calc_string',
                isNotFor: [],
                func: function(sprite, script) {
                    return script
                        .getStringValue('STRING', script)
                        [script.getField('CASE', script)]();
                },
                syntax: {
                    js: [],
                    py: [
                        {
                            syntax: '%2.upper()',
                            params: [null, null, null, 'toUpperCase', null],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.CALC_change_string_case_sub_1, 'toUpperCase'],
                                        [Lang.Blocks.CALC_change_string_case_sub_2, 'toLowerCase'],
                                    ],
                                    value: 'toUpperCase',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValue,
                                },
                            ],
                        },
                        {
                            syntax: '%2.lower()',
                            params: [null, null, null, 'toLowerCase', null],
                            blockType: 'param',
                            textParams: [
                                undefined,
                                {
                                    type: 'Block',
                                    accept: 'string',
                                },
                                undefined,
                                {
                                    type: 'Dropdown',
                                    options: [
                                        [Lang.Blocks.CALC_change_string_case_sub_1, 'toUpperCase'],
                                        [Lang.Blocks.CALC_change_string_case_sub_2, 'toLowerCase'],
                                    ],
                                    value: 'toUpperCase',
                                    fontSize: 11,
                                    arrowColor: EntryStatic.ARROW_COLOR_CALC,
                                    converter: Entry.block.converters.returnStringValue,
                                },
                            ],
                        },
                    ],
                },
            },
        };
    },
};
