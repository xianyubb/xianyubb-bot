# 须知

调用 API 接口的响应数据需要用 Promise 中的 then 方法获得

示例:

```js
bot
  .get_login_info()
  .then((value) => {
    console.log(value);
  })
  .catch((reason) => {
    console.log(reason);
  });
```

使用 then 方法获取响应数据,如果没有获取到就会用 catch 抓取异常

部分 api 无响应数据

下一节:
[事件系统](Events.md)
