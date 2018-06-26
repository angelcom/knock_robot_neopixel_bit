// tests go here; this will not be compiled when this package is used as a library

knock_robot_neopixel.onCmdReceived(knock_robot_neopixel.CustomCharConv(knock_robot_neopixel.CustomCmd.rst), ({ args }) => {
    basic.showString(args)
})
knock_robot_neopixel.init(true, true)
basic.forever(() => {
    knock_robot_neopixel.sendMessage();
})