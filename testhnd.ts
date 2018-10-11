//let s4 = 60;//(60,90)
let s3 = 90;//(40~180)
let s2 = 90;//(90~180)
let s1 = 90
let cmd = ""



knock_robot_neopixel.onCmdReceived("hnd", function ({ args }) {
    if (args.length < 2) {
        return;
    }
    cmd = args.substr(0, 2)
    switch (cmd) {
        case "zz"://左转
            if (s1 < 175) s1 += 5;
            robotbit.Servo(robotbit.Servos.S1, s1)
            break;
        case "yz"://右转
            if (s1 > 5) s1 -= 5;
            robotbit.Servo(robotbit.Servos.S1, s1)
            break;
        case "st"://上抬
            if (s2 < 175) s2 += 5;
            robotbit.Servo(robotbit.Servos.S2, s2)
            break;
        case "xy"://下压
            if (s2 > 90) s2 -= 5;
            robotbit.Servo(robotbit.Servos.S2, s2)
            break;
        case "qs"://前伸
            if (s3 < 175) s3 += 5;
            robotbit.Servo(robotbit.Servos.S3, s3)
            break;
        case "hs"://后缩
            if (s3 > 60) s3 -= 5;
            robotbit.Servo(robotbit.Servos.S3, s3)
            break;
        case "jz"://夹住
            robotbit.Servo(robotbit.Servos.S4, 60);
            break;
        case "fk"://放开
            robotbit.Servo(robotbit.Servos.S4, 90)
            break;
        case "hy"://还原
            hyServo();
            s1 = 90, s2 = 90, s3 = 90;
            break;
    }
})
knock_robot_neopixel.init(true, true)
hyServo();
function hyServo() {
    robotbit.Servo(robotbit.Servos.S1, 90);
    robotbit.Servo(robotbit.Servos.S2, 90);
    robotbit.Servo(robotbit.Servos.S3, 90);
    robotbit.Servo(robotbit.Servos.S4, 90);
}

basic.forever(function () {
    knock_robot_neopixel.sendMessage()
})
