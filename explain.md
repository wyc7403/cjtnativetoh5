### 协议说明

#### 0. 判断app环境及版本：`yourSelfName.name/yourSelfName.version`
- 说明：
```
name,version有值即为在相应app环境中
```
- 参数：无
- 例子：
```js
let name = yourSelfName.name;
let version = yourSelfName.version;
```
- 返回：无
___
#### 1. 打开新webview：`yourSelfName.open`

- 参数：

| 属性 | 类型   | 默认值 | 必填 | 说明                        |
|------|--------|--------|:-----|:----------------------------|
| url  | string |        | 是   | 要用新webView打开的页面地址 |


- 例子：
```js
yourSelfName.open({
    url:'https://www.baidu.com'
})
```
- 返回：无
___
#### 2. 获取经纬度：`yourSelfName.getLocation`

- 参数：无
- 例子：
```js
yourSelfName.getLocation(
    (obj)=>{
        if(obj.resultCode == 0){
            longitude = obj.longitude;
            latitude = obj.latitude;
        }else{
            console.log(obj.resultMsg)
        }
    }
)
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    longitude:104.10194, //经度
    latitude:30.65984 //纬度
}
```
___
#### 3. 获取SUID：`yourSelfName.getSUID`

- 参数：无
- 例子：
```js
yourSelfName.getSUID(
    (obj)=>{
        if(obj.resultCode==0){
            suid = obj.suid
        }else{
            console.log(obj.resultMsg)
        }
    }
)
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    suid:'123123123123'   
}
```
___
#### 4. 切换底部tab：`yourSelfName.goToTab`

- 参数：

| 属性 | 类型   | 默认值 | 必填 | 说明                        |
|------|--------|--------|:-----|:----------------------------|
| index  | number |        | 是   | 1.首页 2.服务 3.学习 4.工具 5.我的 |
- 例子：
```js
yourSelfName.goToTab({index:1})
```
- 返回：无
___
#### 5. 获取app信息：`yourSelfName.getAppInfo`

- 参数：无
- 例子：
```js
yourSelfName.getAppInfo((obj)=>{
    (obj)=> {
        if (obj.resultCode == 0) {
            name = obj.name
            version = obj.version
        }
    }
})
```
- 返回：
```js
  {
    resultCode:0, //0为成功
    resultMsg:'', //错误信息
    name:'cjt', //app名字
    version:'1.0.0', //app版本号
  }
```
___
#### 6. 关闭webview：`yourSelfName.close`
- 参数：无
- 例子：
```js
yourSelfName.close()
```
- 返回：无
___
#### 7. 获取SUID：`yourSelfName.getSUID`

- 参数：无
- 例子：
```js
yourSelfName.getSUID(
    (obj)=>{
        if(obj.resultCode==0){
            suid = obj.suid
        }else{
            console.log(obj.resultMsg)
        }
    }
)
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    suid:'123123123123'   
}
```
___
#### 8. 获取clientID：`yourSelfName.getClientID`

- 参数：无
- 例子：
```js
yourSelfName.getClientID(
    (obj)=>{
        if(obj.resultCode==0){
            clientID = obj.clientID
        }else{
            console.log(obj.resultMsg)
        }
    }
)
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    clientID:'123123123123'   
}
```
___
#### 9. 获取token：`yourSelfName.getToken`

- 说明：
```

```
- 参数：无
- 例子：
```js
yourSelfName.getToken(
    (obj)=>{
        if(obj.resultCode==0){
            token = obj.token
        }else{
            console.log(obj.resultMsg)
        }
    }
)
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    token:'123123123123'   
}
```
___
#### 10.设置token：`yourSelfName.setToken`

- 参数：

| 属性 | 类型   | 默认值 | 必填 | 说明                          |
|------|--------|--------|:-----|:----------------------------|
| token  | string |        | 是   | token                       |
| expires  | string |        | 是   | token失效时间，时间戳：1668481825934 |


- 例子：
```js
yourSelfName.setToken({
    token:'123123123123',
    expires:'1668481825934'
},(obj)=>{
    if(obj.resultCode==0){
        tips('token设置成功')
    }else{
        console.log(obj.resultMsg)
    }
})
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
}
```
___
#### 11.扫一扫获取二维码信息：`yourSelfName.scanGraphicCode`

- 参数：无
- 例子：
```js
yourSelfName.scanGraphicCode(
    (obj)=>{
        if(obj.resultCode==0){
            content = obj.content
        }else{
            console.log(obj.resultMsg)
        }
    }
)
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    content:'https://www.baidu.com'
}
```
___
#### 12.调起系统相册、拍照、~~录像~~ 'yourSelfName.chooseMedia'

- 参数：

| 属性              | 类型     | 默认值                | 必填  | 说明                                                           |
|:----------------|:-------|:-------------------|-----|--------------------------------------------------------------|
| count           | number | 9                  | 否   | 最多可选择的文件个数，最多支持9个。                                           |
| mediaType       | array  | ['image']          | 否   | image:拍摄图片或从相册选择图片;~~video（弃用，流过大会导致app崩溃）:只能拍摄视频或从相册选择视频。~~ |
| sourceType      | array  | ['album','camera'] | 否   | album:从相册选择; camera:使用相机拍摄。                                  |
| ~~maxDuration~~ | number | 10                 | 否   | ~~（弃用）拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 60s 之间。不限制相册。~~              |
| sizeType        | array  | ['compressed']     | 否   | compressed:压缩:~~（弃用）original:原始大小。~~                         |
| camera          | string | 'back'             | 否   | back:默认后置摄像头;front:默认使用前置摄像头。                                |


- 例子：
```js
yourSelfName.chooseMedia(
    (obj)=>{
        if(obj.resultCode==0){
            let list = obj.list
            let blobList = [];
            list.forEach((el)=>{
                let u8a = new Uint8Array(el.data);
                blobList.push(new Blob([u8a], {type: el.mimeType}));
            })
        }else{
            console.log(obj.resultMsg)
        }
    }
)
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    list:[
        {
            data:[134,321,341],
            mimeType:'image/png'
        }
    ],//data二进制流，mimeType媒体文件的mimeType
}
```
___

#### 13.h5调起系统相册、拍照、录像 `<input type='file'/>`
- 参数：

| 属性              | 类型     | 默认值     | 必填  | 说明                                                                                   |
|:----------------|:-------|:--------|-----|--------------------------------------------------------------------------------------|
| capture           |  |         | 否   | 用户未授权时，则会弹出系统相机、麦克风权限授权。拒绝后需在系统中选择打开授权，否则该属性将失效，只能选择系统文件                             |
| accept       | string  |         | 否   | image/* ｜video/* ，有capture时，分别为拍照和录像，不填默认为拍照，没有capture时，分别为选择照片及视频，不填则为选择所有系统文件、拍照及摄像 |
| multiple       |   |         | 否   | 有则可多选                                                                                |


- 例子：
```js
<div>多选视频/录像</div>
<input type="file" @change="fileChange($event)" accept="video/*" multiple>
<div>单选照片/拍照</div>
<input type="file" @change="fileChange($event)" accept="image/*">
<div>多选所有文件、拍照、录像</div>
<input type="file" @change="fileChange($event)" multiple>
<div>单选所有文件、拍照、录像</div>
<input type="file" @change="fileChange($event)">
<div>拍照</div>
<input type="file" @change="fileChange($event)" accept="image/*" capture>
<div>录像</div>
<input type="file" @change="fileChange($event)" accept="video/*" capture>
```
---
#### 14.判断app是否登录：`yourSelfName.hasToken`

- 参数：无

- 例子：
```js
yourSelfName.hasToken((obj)=>{
    if(obj.resultCode==0){
        hasToken = obj.hasToken
    }else{
        console.log(obj.resultMsg)
    }
})
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    hasToken:false/true //true已登录，false未登录
}
```
___
#### 15.获取推送PushToken：`yourSelfName.getPushToken`

- 参数：

| 属性 | 类型   | 默认值 | 必填  | 说明                                                                                                        |
|------|--------|--------|:----|:----------------------------------------------------------------------------------------------------------|
| code  | string |        | 是   | 1.code的值是应用在同一账号系统中注册的应用ID;2.code参数为空字符串时获取到的PushToken为指定设备的Token;3.code参数非空字符串时获取到的PushToken为指定用户的Token; |


- 例子：
```js
yourSelfName.getPushToken({
    code:''
},(obj)=>{
    if(obj.resultCode==0){
        PushToken = obj.PushToken
    }else{
        console.log(obj.resultMsg)
    }
})
```
- 返回：
```js
{
    resultCode:0, //0为成功
    resultMsg:"", //错误信息
    PushToken:"", //推送PushToken
}
```
___