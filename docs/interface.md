### 须知

调用 API 接口的响应数据需要用Promise中的then方法获得

示例:

```js
bot.get_login_info().then((value) => {
    console.log(value)
}).catch((reason) => {
    console.log(reason)
})
```

下一节: 
[事件系统](Events.md)