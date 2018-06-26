//% color=#0062dB weight=96 icon="\uf294" block="KNOCKBIT"
namespace knock_robot_neopixel {
    let delimiter = "^";
    let terminator = "\n";
    let handlers: LinkedKeyHandlerList = null;

    // class LinkedKeyHandlerList {
    //     key: string;
    //     callback: (value: string) => void;
    //     next: LinkedKeyHandlerList
    // }

    export enum CustomCmd {
        //% block="reset microbit"
        rst = -1,
        //% block="show string"
        str = 1,
        //% block="show image"
        img = 2,
        //% block="do move"
        mov = 10,

    }

    //% blockId="knock_robot_neopixel_CustomCharConv" block="内置的命令 %c"
    export function CustomCharConv(c: CustomCmd): string {
        switch (c) {
            case CustomCmd.rst: return "rst";
            case CustomCmd.str: return "str";
            case CustomCmd.mov: return "mov";
            case CustomCmd.img: return "img";
        }
        return "???";
    }

    class LinkedKeyHandlerList {
        key: string;
        type: ValueTypeIndicator;
        callback: (value: TypeContainer) => void;
        next: LinkedKeyHandlerList
    }
    enum ValueTypeIndicator { String, Number }

    export class TypeContainer {
        stringValue: string;
        numberValue: number;
    }
    let messageContainer = new TypeContainer;

    //% mutate=objectdestructuring
    //% mutateText="My Arguments"
    //% mutateDefaults="key,stringValue"
    //% blockId=blockyTalkyBLE_on_string_recieved
    //% block="on string received|key %theKey"
    export function onStringReceived(key: string, callback: (stringValue: TypeContainer) => void) {
        let newHandler = new LinkedKeyHandlerList()
        newHandler.callback = callback;
        newHandler.type = ValueTypeIndicator.String;
        newHandler.key = key;
        newHandler.next = handlers;
        handlers = newHandler;
    }
    //% mutate=objectdestructuring
    //% mutateText="My Arguments"
    //% mutateDefaults="key,stringValue"
    //% blockId=knock_robot_neopixel_onCmdReceived
    //% block="on string received|key %theKey"
    export function onCmdReceived(key: string, callback: (stringValue: TypeContainer) => void) {
        let newHandler = new LinkedKeyHandlerList()
        newHandler.callback = callback;
        newHandler.key = key;
        newHandler.next = handlers;
        handlers = newHandler;
    }

    // //% blockId=blockyTalkyBLE_send_string_key_value block="send string|key %key|value %value"
    // export function sendMessageWithStringValue(key: string, value: string): void {
    //     sendRawMessage(key, ValueTypeIndicator.String, value)
    // }

    // //% blockId=blockyTalkyBLE_send_number_key_value block="send number|key %key|value %value"
    // export function sendMessageWithNumberValue(key: string, value: number): void {
    //     sendRawMessage(key, ValueTypeIndicator.Number, value.toString())
    // }

    // function sendRawMessage(key: string, valueTypeIndicator: ValueTypeIndicator, value: string): void {
    //     let indicatorAsString = getStringForValueTypeIndicator(valueTypeIndicator);
    //     bluetooth.uartWriteString(indicatorAsString + delimiter + key + delimiter + value + terminator)
    // }

    let splitString = (splitOnChar: string, input: string) => {
        let result: string[] = []
        let count = 0
        let startIndex = 0
        for (let index = 0; index < input.length; index++) {
            if (input.charAt(index) == splitOnChar) {
                result[count] = input.substr(startIndex, index - startIndex)

                startIndex = index + 1
                count = count + 1
            }
        }
        result[count] = input.substr(startIndex, input.length - startIndex)

        return result;
    }

    /**
     * Get string representation of enum.
     */
    // function getStringForValueTypeIndicator(vti: ValueTypeIndicator) {
    //     switch (vti) {
    //         case ValueTypeIndicator.Number:
    //             return "N"
    //         case ValueTypeIndicator.String:
    //             return "S"
    //         default:
    //             return "!"
    //     }
    // }

    /**
     * Get enum representation of string.
     */
    // function getValueTypeIndicatorForString(typeString: string) {
    //     switch (typeString) {
    //         case "S":
    //             return ValueTypeIndicator.String
    //         case "N":
    //             return ValueTypeIndicator.Number
    //         default:
    //             return null
    //     }
    // }


    // 显示图案
    function showImage(arg: string) {
        switch (arg) {
            case "heart":
                basic.showIcon(IconNames.Heart);
                break;
            case "smallheart":
                basic.showIcon(IconNames.SmallHeart);
                break;
            case "yes":
                basic.showIcon(IconNames.Yes);
                break;
            case "no":
                basic.showIcon(IconNames.No);
                break;
            case "happy":
                basic.showIcon(IconNames.Happy);
                break;
            case "sad":
                basic.showIcon(IconNames.Sad);
                break;
            case "confused":
                basic.showIcon(IconNames.Confused);
                break;
            case "angry":
                basic.showIcon(IconNames.Angry);
                break;
            case "asleep":
                basic.showIcon(IconNames.Asleep);
                break;
            case "surprised":
                basic.showIcon(IconNames.Surprised);
                break;
            case "silly":
                basic.showIcon(IconNames.Silly);
                break;
            case "fabulous":
                basic.showIcon(IconNames.Fabulous);
                break;
            case "meh":
                basic.showIcon(IconNames.Meh);
                break;
            case "tshirt":
                basic.showIcon(IconNames.TShirt);
                break;
            case "rollerskate":
                basic.showIcon(IconNames.Rollerskate);
                break;
            case "duck":
                basic.showIcon(IconNames.Duck);
                break;
            case "house":
                basic.showIcon(IconNames.House);
                break;
            case "tortoise":
                basic.showIcon(IconNames.Tortoise);
                break;
            case "butterfly":
                basic.showIcon(IconNames.Butterfly);
                break;
            case "stickFigure":
                basic.showIcon(IconNames.StickFigure);
                break;
            case "butterfly":
                basic.showIcon(IconNames.Butterfly);
                break;
            case "ghost":
                basic.showIcon(IconNames.Ghost);
                break;
            case "sword":
                basic.showIcon(IconNames.Sword);
                break;
            case "giraffe":
                basic.showIcon(IconNames.Giraffe);
                break;
            case "skull":
                basic.showIcon(IconNames.Skull);
                break;
            case "umbrella":
                basic.showIcon(IconNames.Umbrella);
                break;
            case "snake":
                basic.showIcon(IconNames.Snake);
                break;
            case "cow":
                basic.showIcon(IconNames.Cow);
                break;
            case "quarternote":
                basic.showIcon(IconNames.QuarterNote);
                break;
            case "eigthnote":
                basic.showIcon(IconNames.EigthNote);
                break;
            case "pitchfork":
                basic.showIcon(IconNames.Pitchfork);
                break;
            case "target":
                basic.showIcon(IconNames.Target);
                break;
            case "triangle":
                basic.showIcon(IconNames.Triangle);
                break;
            case "lefttriangle":
                basic.showIcon(IconNames.LeftTriangle);
                break;
            case "chessboard":
                basic.showIcon(IconNames.Chessboard);
                break;
            case "diamond":
                basic.showIcon(IconNames.Diamond);
                break;
            case "smalldiamond":
                basic.showIcon(IconNames.SmallDiamond);
                break;
            case "square":
                basic.showIcon(IconNames.Square);
                break;
            case "smallsquare":
                basic.showIcon(IconNames.SmallSquare);
                break;
            case "scissors":
                basic.showIcon(IconNames.Scissors);
                break;
            default:
                basic.clearScreen();
                break;
        }
    }

    function playMusic(arg: string) {
        switch (arg) {
            case "nyan":
                music.beginMelody(music.builtInMelody(Melodies.Nyan), MelodyOptions.Once)
                break;
            case "powerup":
                music.beginMelody(music.builtInMelody(Melodies.PowerUp), MelodyOptions.Once)
                break;
            case "powerdown":
                music.beginMelody(music.builtInMelody(Melodies.PowerDown), MelodyOptions.Once)
                break;
            case "birthday":
                music.beginMelody(music.builtInMelody(Melodies.Birthday), MelodyOptions.Once)
                break;
            case "wedding":
                music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once)
                break;
            // case "twotigers":
            //     music.beginMelody(music.builtInMelody(Melodies.Wedding), MelodyOptions.Once)
            //     break;
            case "stars":
                //music.beginMelody(music_stars, MelodyOptions.Once)
                break;
            case "stars2":
                //music.beginMelody(music_stars2, MelodyOptions.Once)
                break;
        }
    }

    function handleMessage(cmd: string = CustomCharConv(CustomCmd.str), arg: string) {
        //读取传感器
        // if (getSensor(cmd, arg)) {
        //     return;
        // }
        switch (cmd) {    // 1开启自动发送，0关闭自动发送
            case "str": // 显示消息
                basic.showString(arg);
                break;
            case "rst": // 重启
                control.reset();
                break;
            case "mov": //移动
                //doMove(arg);
                //music.playTone(800, 50) 暂时不播放
                break;
            case "img": // 显示图案
                showImage(arg);
                break;
            case "ply": // 播放乐曲
                playMusic(arg);
                break;
            default:    // 未知的消息
                break;
        }
    }

    let messageArgString = "";

    /**
     * Handles any incoming message
     */
    export function handleIncomingUARTData(auto: boolean) {
        let msg = bluetooth.uartReadUntil(terminator)
        if (msg.length < 3) return;// 非法命令（以后再处理）
        let cmd = msg.substr(0, 3);
        let arg = msg.substr(3);

        let handlerToExamine = handlers;

        messageContainer.stringValue = arg;

        if (handlerToExamine == null) { //empty handler list
            //basic.showString("nohandler")
            if (auto) {   //handle message with auto handler
                handleMessage(cmd, arg);
            }
        }
        else {
            let handled = false;

            while (handlerToExamine != null) {
                if (handlerToExamine.key == cmd) {
                    handlerToExamine.callback(messageContainer)
                    handled = true;
                }
                handlerToExamine = handlerToExamine.next
            }

            if (!handled && auto) {   //handle message with auto handler
                handleMessage(cmd, arg);
            }
        }
    }

    //% blockId=knock_robot_neopixel_init
    //% block="Init |Auto Handle Message %auto"
    export function init(auto: boolean) {
        bluetooth.startUartService()
        bluetooth.onUartDataReceived(terminator, () => {
            handleIncomingUARTData(auto);
            basic.pause(50);
        })
    }


}