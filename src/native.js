class cjtNativeToH5 {
    constructor(agreement, callback) {
        //app名称
        this.name='';
        //app版本
        this.version='';
        //方法id
        this._seq = 1;
        //在app中
        this._isInApp = false;
        //间隔定时器
        this._timer1 = null;
        //超时定时器
        this._timer2 = null;
        //协议前缀
        this.agreement = agreement || 'ischool';
        //原生监听方法
        this.callback = callback || 'onShouxinerSchemeCallback';
    }

    /* 获取平台信息 */
    _getAppInfo() {
        let ua = navigator.userAgent;
        if(ua.indexOf('wyczc')>-1){
            let uu = ua.split('wyczc')[1].trim().split(' ')[0];
            this.name = uu.split('-')[0];
            this.version = uu.split('-')[2];
        }
        else{
            console.log('协议未在相应应用中调用')
        }
    }

    //增加协议对象
    _pfnSet(fn, callback) {
        this[fn] = callback
    }

    //获取协议对象
    _pfnGet(fn) {
        return this[fn]
    }

    //删除协议对象
    _pfnRemove(fn) {
        delete this[fn]
    }

    //调用客户端协议
    _invoke(type, action, seqNum, data) {
        let uri = `${this.agreement}://${type}/${action}?cmdSeq=${seqNum}`;
        if (data) {
            uri += "&" + this._jsonToUrlEncode(data);
        }
        window.location = uri
    }

    //传参格式化
    _jsonToUrlEncode(data) {
        let str = "";
        if (data) {
            for (let item in data) {
                if (str.length > 0) {
                    str += "&"
                }
                str += (item + '=' + encodeURIComponent(data[item]));
            }
        }
        return str
    }

    //获取唯一id
    _generateCmdSeq() {
        return this._seq++
    }

    //同步关联协议调用及回调对应关系
    _invokeForCallback(type, action, callBack, data) {
        clearInterval(this._timer1);
        clearInterval(this._timer2);
        new Promise((resolve, reject) => {
            if(this._isInApp){
                resolve();
            }else {
                this._timer1 = setInterval(() => {
                    if (window.platform_cjt) {
                        clearInterval(this._timer1);
                        clearInterval(this._timer2);
                        this._isInApp = true;
                        resolve();
                    }
                }, 50);
                this._timer2 = setTimeout(() => {
                    clearInterval(this._timer1);
                    clearInterval(this._timer2);
                    this._isInApp = false;
                    reject();
                }, 500);
            }
        }).then(() => {
            let seqNum = this._generateCmdSeq();
            this._registerCallback(seqNum, callBack);
            this._invoke(type, action, seqNum, data)
        }).catch(() => {
            callBack({
                resultCode: -1,
                resultMsg: '协议未在相应应用中调用',
            })
            console.log('协议未在相应应用中调用')
        })
    }

    //设置对应协议调用加载到对象上的方法
    _registerCallback(seq, callBack) {
        this._pfnSet(seq, callBack)
    }

    //获取对应协议调用加载到对象上的方法
    _processNativeCallback(seq, data) {
        let fn = this._pfnGet(seq);
        if (fn) {
            this._pfnRemove(seq);
            fn(data);
        }
    }

    //初始化协议
    init(Name){
        this._getAppInfo();
        let name = Name || this.agreement;
        window[`${name}`] = this;
        window[`${this.callback}`] = function (a, b) {
            try {
                window[`${name}`]._processNativeCallback(a, b)
            } catch (c) {
                console.log('协议回调错误')
                //tips('协议回调错误');
            }
        }
    }

    /* 具体协议 */

    /* 新开webview */
    open(a, b) {
        this._invokeForCallback("function", "open", b, {
            uri: a.url
        })
    }

    /* 关闭当前webview */
    close(a) {
        this._invokeForCallback("function", "close", a)
    }

    /* 切换tab */
    goToTab(a,b){
        this._invokeForCallback("function", "goToTab", b, {
            index: a.index
        })
    }
    /* 调起app */
    launchApp(a,b,c){
        this._invokeForCallback("function", "launchApp", c, {
            package: a,
            url: b,
        })
    }

    /* 获取经纬度 */
    getLocation(a) {
        this._invokeForCallback("function", "getLocation",a)
    }

    /* 获取SUID */
    getSUID(a) {
        this._invokeForCallback("function", "getSUID",a)
    }
    /* 获取app信息 */
    getAppInfo(a) {
        this._invokeForCallback("function", "getAppInfo",a)
    }
    /* 扫一扫 */
    scanGraphicCode(a) {
        this._invokeForCallback("function", "scanGraphicCode",a)
    }

    /* 获取ClientID */
    getClientID(a) {
        this._invokeForCallback("function", "getClientID",a)
    }

    /* 设置token */
    setToken(a,b) {
        this._invokeForCallback("function", "setToken",b,{
            token:a.token,
            expires:a.expires,
        })
    }

    /* 获取token */
    getToken(a) {
        this._invokeForCallback("function", "getToken",a)
    }

    /* 判断app是否登录 */
    hasToken(a) {
        this._invokeForCallback("function", "hasToken",a)
    }

    /* 获取推送PushToken */
    getPushToken(a,b) {
        this._invokeForCallback("function", "getPushToken",b,{
            code:a.code,
        })
    }

    /* 调起系统相册、拍照、录像 */
    chooseMedia(a,b) {
        this._invokeForCallback("function", "chooseMedia", b, {
            count:a.uploadUrl||9,
            mediaType:['image'],
            sourceType:a.uploadUrl||['album','camera'],
            sizeType:['compressed'],
            camera:a.uploadUrl||'back',
        })
    }

}

export {cjtNativeToH5};
