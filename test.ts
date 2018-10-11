// tests go here; this will not be compiled when this package is used as a library

// 重定义内置命令rst，改为显示命令
knock_robot_neopixel.onCmdReceived(knock_robot_neopixel.CustomCharConv(knock_robot_neopixel.CustomCmd.rst), ({ args }) => {
    basic.showString(args)
})
// 自动处理数据，开启板载LED，超声波接口
knock_robot_neopixel.init(true, true)
basic.forever(() => {
    knock_robot_neopixel.sendMessage();
})
// 按A按钮显示microbit板子名称
input.onButtonPressed(Button.A, () => {
    basic.showString(control.deviceName());
})
// 用户自动数据返回,示例返回系统运行时间到自定义0
knock_robot_neopixel.onUserAutoSend(0, () => {
    knock_robot_neopixel.sendUserMessage(0, input.runningTime().toString())
})