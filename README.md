# micro:bit Web Buttons

Receive `B1` to `B10` button commands from a Web Bluetooth webpage and use them in Microsoft MakeCode for micro:bit.

This extension starts the micro:bit Bluetooth UART service, listens for text commands from the webpage, and turns them into MakeCode blocks.

## Description

The companion webpage sends button messages through Bluetooth UART:

```text
B1:down
B1:up
B2:down
B2:up
```

When a button receives `down`, the extension stores that button as pressed. When it receives `up`, the extension stores that button as released. The first `down` also triggers the clicked event block.

Supported buttons:

```text
B1, B2, B3, B4, B5, B6, B7, B8, B9, B10
```

## Blocks

- `启动网页按钮蓝牙服务`
- `当 B1 被点击`
- `B1 被按下`

The button picker supports `B1` to `B10`.

## MakeCode Example

```blocks
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
```

## Usage

1. Upload this extension folder to a GitHub repository.
2. Open <https://makecode.microbit.org/>.
3. Create a project.
4. Open `Advanced` -> `Extensions`.
5. Paste the GitHub repository URL into the search box.
6. Import the extension.
7. Use the `网页按钮` block category.

## Bluetooth Notes

Use a MakeCode project with Bluetooth enabled. The extension calls:

```typescript
bluetooth.startUartService()
```

The webpage should connect to the micro:bit Bluetooth UART service and write commands ending with a newline.

## 中文说明

这个扩展用于接收网页通过 Web Bluetooth 发送的 `B1` 到 `B10` 按钮命令，并在 MakeCode 中提供事件积木和布尔值积木。

- `当 B1 被点击`：收到 `B1:down` 时触发。
- `B1 被按下`：收到 `B1:down` 后返回 `true`，收到 `B1:up` 后返回 `false`。
- `启动网页按钮蓝牙服务`：启动 micro:bit 蓝牙 UART 服务。
