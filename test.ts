webButtons.start()

webButtons.onClicked(WebButton.B1, function () {
    basic.showString("B1")
})

basic.forever(function () {
    if (webButtons.isPressed(WebButton.B2)) {
        led.plot(0, 0)
    } else {
        led.unplot(0, 0)
    }
})
