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

使用then方法获取响应数据,如果没有获取到就会用catch抓取异常

部分api无响应数据

下一节: 
[事件系统](Events.md)