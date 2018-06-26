class ArgsContainer {
    args: string;
}

//% color=#0062dB weight=96 icon="\uf294" block="KNOCKBIT"
namespace knock_robot_neopixel {
    let delimiter = "^";
    let terminator = "\n";

    let MIN_SEND_TIMEOUT = 100; // 最小发送间隔，500
    let us = 0
    let BluetoothConnected: boolean = false
    // 超声波是否初始化
    let US_INIT: boolean = false
    // 超声波端口
    let US_PORT = -1
    // 指南针是否初始化
    let CH_INIT: boolean = false
    // 指南针_自动发送
    let CH_AUTO_SEND = false
    let CH_TIMEOUT = MIN_SEND_TIMEOUT
    let CH_NEXTTIME = 0   // 下次发送时间
    // 超声波_自动发送
    let US_AUTO_SEND = false
    let US_TIMEOUT = MIN_SEND_TIMEOUT
    let US_NEXTTIME = 0   // 下次发送时间
    // 加速度_自动发送
    let AC_AUTO_SEND = false
    let AC_TIMEOUT = MIN_SEND_TIMEOUT    // 自动发送延迟（ms）
    let AC_NEXTTIME = 0   // 下次发送时间

    let M1A_SPEED = 0, M2A_SPEED = 0, M1B_SPEED = 0, M2B_SPEED = 0;

    let SCAN_ULTRASONIC = false;// 超声波扫描前方障碍物

    let handlers: LinkedKeyHandlerList = null;

    // ROBOTBIT内建4个LED灯
    let strip: neopixel.Strip = null;

    export enum CustomCmd {
        //% block="reset microbit"
        rst = -1,
        //% block="show string"
        str = 1,
        //% block="show image"
        img = 2,
        //% block="move"
        mov = 10,
        //% block="led"
        led = 100,
        //% block="servo"
        ser = 1000,
    }

    //% blockId="knock_robot_neopixel_CustomCharConv" block="内置的命令 %c"
    export function CustomCharConv(c: CustomCmd): string {
        switch (c) {
            case CustomCmd.rst: return "rst";
            case CustomCmd.str: return "str";
            case CustomCmd.mov: return "mov";
            case CustomCmd.img: return "img";
            case CustomCmd.led: return "led";
            case CustomCmd.ser: return "ser";
        }
        return "???";
    }

    class LinkedKeyHandlerList {
        key: string;
        callback: (args: ArgsContainer) => void;
        next: LinkedKeyHandlerList
    }

    let messageContainer = new ArgsContainer;

    //% mutate=objectdestructuring
    //% mutateText="My Arguments"
    //% mutateDefaults="key,args"
    //% blockId=knock_robot_neopixel_onCmdReceived
    //% block="on cmd received|key %theKey"
    export function onCmdReceived(key: string, callback: (args: ArgsContainer) => void) {
        let newHandler = new LinkedKeyHandlerList()
        newHandler.callback = callback;
        newHandler.key = key;
        newHandler.next = handlers;
        handlers = newHandler;
    }

    // let splitString = (splitOnChar: string, input: string) => {
    //     let result: string[] = []
    //     let count = 0
    //     let startIndex = 0
    //     for (let index = 0; index < input.length; index++) {
    //         if (input.charAt(index) == splitOnChar) {
    //             result[count] = input.substr(startIndex, index - startIndex)

    //             startIndex = index + 1
    //             count = count + 1
    //         }
    //     }
    //     result[count] = input.substr(startIndex, input.length - startIndex)

    //     return result;
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
        }
    }

    function handleMessage(cmd: string, arg: string) {
        //读取传感器
        if (getSensor(cmd, arg)) {
            return;
        }
        switch (cmd) {    // 1开启自动发送，0关闭自动发送
            case "str": // 显示消息
                basic.showString(arg);
                break;
            case "rst": // 重启
                control.reset();
                break;
            case "mov": //移动
                doMove(arg);
                //music.playTone(800, 50) 暂时不播放
                break;
            case "img": // 显示图案
                showImage(arg);
                break;
            case "ply": // 播放乐曲
                playMusic(arg);
                break;
            case "led": // 点亮Microbit自带LED
                showLed(arg);
                break;
            case "ser": // 伺服电机（舵机）
                servo(arg);
                break;
            default:    // 未知的消息
                break;
        }
    }

    function servo(arg: string) {
        if (arg.length >= 5) {
            let index = parseInt(arg.substr(0, 1));
            let degree = parseInt(arg.substr(1, 4));
            robotbit.Servo(index, degree);
            basic.pause(50);
        }
        if (arg.length >= 10) {
            let index = parseInt(arg.substr(5, 1));
            let degree = parseInt(arg.substr(6, 4));
            robotbit.Servo(index, degree);
            basic.pause(50);
        }
        if (arg.length >= 15) {
            let index = parseInt(arg.substr(10, 1));
            let degree = parseInt(arg.substr(11, 4));
            robotbit.Servo(index, degree);
            basic.pause(50);
        }
    }

    function showLed(arg: string) {
        if (strip != null) {
            let offset = parseInt(arg.substr(0, 3));
            let rgb = parseInt(arg.substr(3));
            strip.setPixelColor(offset, rgb);
            strip.show();
        }
    }
    
    function doMove(arg: string) {
        let direction = arg.substr(0, 3);

        switch (direction) {
            case "fwd":
                let speed = parseInt(arg.substr(3));
                //if (speed < 50 || speed > 250) speed = 80; // 不判断，完全由远端控制
                M1A_SPEED = -speed, M2B_SPEED = speed;
                break;
            case "spd": // 默认M1A,M2B，2018-6-13从5位改为4位
                M1A_SPEED = parseInt(arg.substr(3, 4));
                M2B_SPEED = parseInt(arg.substr(7));
                break;
            case "end"://end
                M1A_SPEED = 0, M2B_SPEED = 0, M2A_SPEED = 0, M1B_SPEED = 0;;
                break;
            default:
                // 此时自定义马达运转，3位标识，4位速度
                if (arg.length > 7) {
                    let m = direction;
                    let s = parseInt(arg.substr(3, 4));
                    setSpeed(m, s);
                }
                if (arg.length >= 14) {
                    let m = arg.substr(7, 3);
                    let s = parseInt(arg.substr(10, 4));
                    setSpeed(m, s);
                }
                break;
        }
        motorRestore();
    }

    function setSpeed(Motor: string, Speed: number) {
        switch (Motor) {
            case "m1a":
                M1A_SPEED = Speed;
                break;
            case "m2b":
                M2B_SPEED = Speed;
                break;
            case "m2a":
                M2A_SPEED = Speed;
                break;
            case "m1b":
                M1B_SPEED = Speed;
                break;
        }
    }

    function doPause() {
        robotbit.MotorRun(robotbit.Motors.M1A, 0);
        robotbit.MotorRun(robotbit.Motors.M2B, 0);
        robotbit.MotorRun(robotbit.Motors.M2A, 0);
        robotbit.MotorRun(robotbit.Motors.M1B, 0);
    }

    function motorRestore() {
        robotbit.MotorRun(robotbit.Motors.M1A, M1A_SPEED);
        robotbit.MotorRun(robotbit.Motors.M2B, M2B_SPEED);
        robotbit.MotorRun(robotbit.Motors.M2A, M2A_SPEED);
        robotbit.MotorRun(robotbit.Motors.M1B, M1B_SPEED);
    }

    function getSensor(cmd: string, arg: string): boolean {
        switch (cmd) {    // 1开启自动发送，0关闭自动发送
            case "us1":
                US_AUTO_SEND = true;
                US_TIMEOUT = parseInt(arg);
                if (US_TIMEOUT < MIN_SEND_TIMEOUT) US_TIMEOUT = MIN_SEND_TIMEOUT;
                break;
            case "us0":
                US_AUTO_SEND = false;
                break;
            case "ac1":
                AC_AUTO_SEND = true;
                AC_TIMEOUT = parseInt(arg);
                if (AC_TIMEOUT < MIN_SEND_TIMEOUT) AC_TIMEOUT = MIN_SEND_TIMEOUT;
                break;
            case "ac0":
                AC_AUTO_SEND = false;
                break;
            case "ch1":
                CH_AUTO_SEND = true;
                CH_TIMEOUT = parseInt(arg);
                if (CH_TIMEOUT < MIN_SEND_TIMEOUT) CH_TIMEOUT = MIN_SEND_TIMEOUT;
                break;
            case "ch0":
                CH_AUTO_SEND = false;
                break;
            case "usp": // 设置超声波端口
                let usp = parseInt(arg);
                initUltrasonic(usp);
                break;
            case "usc": // 用舵机带动超声波扫描前方障碍物
                SCAN_ULTRASONIC = true;
                break;
            default:
                return false;
        }
        return true;
    }
    // 初始化超声波,端口
    function initUltrasonic(us_port: number) {
        if (us_port > -1 && us_port < 17) {
            US_PORT = us_port + 7;
            US_INIT = true;
        }
        else if (us_port == 19 || us_port == 20) {
            US_PORT = us_port + 5;
            US_INIT = true;
        }
        else {
            US_INIT = false;
        }
    }


    //let messageArgString = new CommandContainer();

    /**
     * Handles any incoming message
     */
    export function handleIncomingUARTData(auto: boolean) {
        let msg = bluetooth.uartReadUntil(terminator)
        if (msg.length < 3) return;// 非法命令（以后再处理）
        let cmd = msg.substr(0, 3);
        let args = msg.substr(3);

        let handlerToExamine = handlers;

        messageContainer.args = args;

        //analyzeCmd(cmd, arg);

        //messageContainer = arg;

        if (handlerToExamine == null) { //empty handler list
            //basic.showString("nohandler")
            if (auto) {   //handle message with auto handler
                handleMessage(cmd, args);
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
                handleMessage(cmd, args);
            }
        }
    }
    export function sendMessage() {
        if (BluetoothConnected) {   // 3个字符为命令，第三个字符1为正常，0为异常
            if (CH_AUTO_SEND && CH_NEXTTIME < input.runningTime()) {
                if (CH_INIT) {
                    bluetooth.uartWriteString("ch1" + input.compassHeading())
                    CH_NEXTTIME = input.runningTime() + CH_TIMEOUT;
                } else {
                    bluetooth.uartWriteString("ch0" + "-1")
                    CH_AUTO_SEND = false;   // 自动停止发送
                }
            }
            if (US_AUTO_SEND && US_NEXTTIME < input.runningTime()) {
                if (US_INIT) {
                    bluetooth.uartWriteString("us1" + robotbit.Ultrasonic(US_PORT))
                    US_NEXTTIME = input.runningTime() + US_TIMEOUT;
                } else {
                    bluetooth.uartWriteString("us0" + "-1")
                    US_AUTO_SEND = false;   // 自动停止发送
                }
            }
            if (AC_AUTO_SEND && AC_NEXTTIME < input.runningTime()) {
                bluetooth.uartWriteString("ac1" + input.acceleration(Dimension.X) + "|" + input.acceleration(Dimension.Y) + "|" + input.acceleration(Dimension.Z))
                AC_NEXTTIME = input.runningTime() + AC_TIMEOUT;
            }
            // if (SCAN_ULTRASONIC) {   // 扫描功能调试后再启用
            //     SCAN_ULTRASONIC = false;
            //     scanUltrasonic();
            // }
        }
    }

    //% blockId=knock_robot_neopixel_init
    //% block="Init |Auto Handle Message %auto"
    export function init(autoHandle: boolean, robotled: boolean, usPort:number=-1) {
        bluetooth.startUartService()
        bluetooth.onUartDataReceived(terminator, () => {
            handleIncomingUARTData(autoHandle);
            basic.pause(10);
        })

        bluetooth.onBluetoothConnected(() => {
            BluetoothConnected = true
            basic.showIcon(IconNames.Diamond)
            music.playTone(600, 50)
            music.playTone(800, 50)
            music.playTone(1200, 50)
            basic.pause(10)
        })
        bluetooth.onBluetoothDisconnected(() => {
            BluetoothConnected = false
            basic.showIcon(IconNames.SmallDiamond)
            music.playTone(1200, 50)
            music.playTone(800, 50)
            music.playTone(600, 50)
            basic.pause(10)
        })
        // 初始化超声波
        initUltrasonic(usPort);
        // 初始化罗盘
        // if (ch_init) {
        //     //input.calibrateCompass()
        //     let chtest = input.compassHeading()
        //     CH_INIT = true
        // }
        // 开启蓝牙uart服务
        bluetooth.startUartService()
        // 初始化完成，等待蓝牙连接，这里可以加一些判断，显示ch,us,ac这些有没有初始化
        basic.showLeds(`
                        . . # # .
                        # . # . #
                        . # # # .
                        # . # . #
                        . . # # .
                        `)
        if (robotled) {
            strip = neopixel.create(DigitalPin.P16, 4, NeoPixelMode.RGB);
        }
    }



}