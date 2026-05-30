enum WebButton {
    //% block="B1"
    B1 = 1,
    //% block="B2"
    B2 = 2,
    //% block="B3"
    B3 = 3,
    //% block="B4"
    B4 = 4,
    //% block="B5"
    B5 = 5,
    //% block="B6"
    B6 = 6,
    //% block="B7"
    B7 = 7,
    //% block="B8"
    B8 = 8,
    //% block="B9"
    B9 = 9,
    //% block="B10"
    B10 = 10
}

//% color="#1769e0" weight=90 icon="\uf11b" block="网页按钮"
//% groups='["连接", "按钮"]'
namespace webButtons {
    const WEB_BUTTON_CLICK_ID = 3101

    let started = false
    let buttonStates: boolean[] = [
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false,
        false
    ]

    /**
     * Start the Bluetooth UART service used by the webpage.
     */
    //% blockId=web_buttons_start
    //% block="启动网页按钮蓝牙服务"
    //% group="连接"
    export function start(): void {
        ensureStarted()
    }

    /**
     * Run code when a webpage button is clicked.
     */
    //% blockId=web_buttons_on_clicked
    //% block="当 %button 被点击"
    //% group="按钮"
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=5
    //% draggableParameters="reporter"
    export function onClicked(button: WebButton, handler: () => void): void {
        ensureStarted()
        control.onEvent(WEB_BUTTON_CLICK_ID, button, handler)
    }

    /**
     * Check whether a webpage button is currently pressed.
     */
    //% blockId=web_buttons_is_pressed
    //% block="%button 被按下"
    //% group="按钮"
    //% button.fieldEditor="gridpicker"
    //% button.fieldOptions.columns=5
    export function isPressed(button: WebButton): boolean {
        ensureStarted()
        return buttonStates[button]
    }

    function ensureStarted(): void {
        if (started) {
            return
        }

        started = true
        bluetooth.startUartService()
        bluetooth.onUartDataReceived(serial.delimiters(Delimiters.NewLine), function () {
            handleCommand(bluetooth.uartReadUntil(serial.delimiters(Delimiters.NewLine)))
        })
    }

    function handleCommand(command: string): void {
        command = command.trim()

        if (command.length < 4 || command.charAt(0) != "B") {
            return
        }

        const separatorIndex = command.indexOf(":")
        if (separatorIndex < 2) {
            return
        }

        const buttonNumber = parseInt(command.substr(1, separatorIndex - 1))
        if (buttonNumber < 1 || buttonNumber > 10) {
            return
        }

        const action = command.substr(separatorIndex + 1)
        const wasPressed = buttonStates[buttonNumber]

        if (action == "down") {
            buttonStates[buttonNumber] = true
            if (!wasPressed) {
                control.raiseEvent(WEB_BUTTON_CLICK_ID, buttonNumber)
            }
        } else if (action == "up") {
            buttonStates[buttonNumber] = false
        } else if (action == "click") {
            control.raiseEvent(WEB_BUTTON_CLICK_ID, buttonNumber)
        }
    }
}
