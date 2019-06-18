import tip from 'WxTip';

const WxApi = {
    
    /**
     * 同步获取系统信息
     * @returns {*}
     */
    getSystemInfoSync(){
        return wx.getSystemInfoSync();
    },
    
    
    /**
     * 异步获取系统信息
     * @param callback
     */
    getSystemInfo(callback){
        wx.getSystemInfo({
            success(res) {
                callback(res);
            }
        })
    },
    
    
    /**
     * 更新
     */
    update(){
        let updateManager = wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log(res.hasUpdate)
        });
        updateManager.onUpdateReady(function () {
            tip.confirm('新版本已经准备好，请重启应用', ()=>{
                updateManager.applyUpdate()
            }, '更新提示');
        });
        updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            error('新版本下载失败');
        });
    },
    
    
    /**
     * 获取小程序启动时的参数
     * @returns {*}
     */
    getLaunchOptions(param = '') {
        let res = wx.getLaunchOptionsSync();
        if(param.length > 0){
            res = res[param];
        }
        return res;
    },
    
    
    /**
     *  动态设置当前页面的标题
     * @param title
     */
    setNavigationBarTitle(title){
        wx.setNavigationBarTitle({
            title: title
        });
    },
    
    
    /**
     * 设置页面导航条颜色
     */
    setNavigationBarColor(
        frontColor = '#ffffff',
        backgroundColor = '#ff0000',
        duration = 400,
        timingFunc = 'easeIn'
    ){
        wx.setNavigationBarColor({
            frontColor: frontColor,
            backgroundColor: backgroundColor,
            animation: {
                duration: duration,
                timingFunc: timingFunc
            }
        })
    },
    
    
    /**
     * 动态加载网络字体。文件地址需为下载类型
     * iOS 仅支持 https 格式文件地址。
     * @param family
     * @param source
     */
    loadFontFace(
        family = 'Bitstream Vera Serif Bold',
        source = 'url("https://sungd.github.io/Pacifico.ttf")',
    ){
        wx.loadFontFace({
            family: family,
            source: source,
        })
    },
    
    
    /**
     * 延迟一部分操作到下一个时间片再执行
     * @param callback
     */
    nextTick(callback){
        wx.nextTick(callback());
    },
    
    
    /**
     * 下载文件资源到本地
     * @param url
     * @param callback
     * @param filePath
     */
    downloadFile(url, callback, filePath = ''){
        wx.downloadFile({
            url: url,
            filePath:filePath,
            success(res) {
                // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
                if (res.statusCode === 200) {
                    callback(res.tempFilePath);
                }
            }
        })
    },
    
    
    /**
     * 上传图片到服务器
     * @param url
     * @param suFun
     */
    uploadFile(url, suFun){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                let filePaths = res.tempFilePaths[0];
                let ext = filePaths.slice(filePaths.lastIndexOf('.') + 1);
                let extArr = ['png', 'jpg', 'jpeg'];
                if (extArr.indexOf(ext) != -1) {
                    tip.loading();
                    // 上传文件
                    wx.uploadFile({
                        url: url,
                        filePath: filePaths,
                        method:'POST',
                        header: {
                            "Content-Type": "multipart/form-data",
                        },
                        name: 'file',
                        formData: {
                            'file': 'test'
                        },
                        success(res) {
                            if(res.statusCode == 200){
                                let d = JSON.parse(res.data);
                                // 获取服务器返回的图片名称
                                // let data = d.slice(2,d.length-1);
                                suFun(d.data);
                            } else {
                                tip.error('上传失败');
                            }
                        },
                        fail(){
                            tip.error('上传失败');
                        }
                    });
                    tip.loaded();
                } else {
                    tip.error('上传的不是图片');
                }
            }
        });
    },
    
    
    /**
     * 同步 将数据存储在本地缓存中指定的 key 中
     * @param k
     * @param v
     */
    setStorageSync(k, v){
        wx.setStorageSync(k, v);
    },
    
    
    /**
     * 将数据存储在本地缓存中指定的 key 中
     * @param k
     * @param v
     */
    setStorage(k, v){
        wx.setStorage({
            key: k,
            data: v
        })
    },
    
    
    /**
     * 同步 从本地缓存中移除指定 key
     * @param k
     */
    removeStorageSync(k){
        wx.removeStorageSync(k);
    },
    
    
    /**
     * 从本地缓存中移除指定 key
     * @param k
     * @param callback
     */
    removeStorage(k, callback=function(res){}){
        wx.removeStorage({
            key: k,
            success(res) {
                callback(res);
            }
        })
    },
    
    
    /**
     * 同步 从本地缓存中异步获取指定 key 的内容
     * @param k
     * @returns {*}
     */
    getStorageSync(k){
        return wx.getStorageSync(k);
    },
    
    
    /**
     * 从本地缓存中异步获取指定 key 的内容
     * @param k
     * @param callback
     */
    getStorage(k, callback=function(){}){
        wx.getStorage({
            key: k,
            success(res) {
                callback(res.data)
            }
        })
    },
    
    
    /**
     * 同步获取当前storage的相关信息
     * @param param
     * @returns {*}
     */
    getStorageInfoSync(param = ''){
        let res = wx.getStorageInfoSync();
        // console.log(res.keys)
        // console.log(res.currentSize)
        // console.log(res.limitSize)
        if(param.length > 0){
            return res[param];
        } else {
            return res;
        }
    },
    
    
    /**
     * 异步获取当前storage的相关信息
     * @param callback
     * @param param
     */
    getStorageInfo(callback, param = ''){
        wx.getStorageInfo({
            success(res) {
                // console.log(res.keys)
                // console.log(res.currentSize)
                // console.log(res.limitSize)
                if(param.length > 0){
                    callback(res[param]);
                } else {
                    callback(res);
                }
            }
        });
    },
    
    
    /**
     * 同步 清理本地数据缓存
     */
    clearStorageSync(){
        wx.clearStorageSync();
    },
    
    
    /**
     * 异步 清理本地数据缓存
     * @param callback
     */
    clearStorage(callback = function(){}){
        wx.clearStorage({
            success(res){
                callback(res);
            }
        });
    },
    
    
    
    /**
     * 保存图片到相册
     * @param url
     */
    saveToAlbum: function(url){
        // 下载图片
        wx.downloadFile({
            url: url,
            success: function(res) {
                if (res.statusCode === 200) {
                    // 保存图片
                    wx.saveImageToPhotosAlbum({
                        filePath: res.tempFilePath,
                        success(res) {
                            tip.success('保存成功');
                        },
                        fail(res){
                            tip.error('保存失败');
                        }
                    });
                }
            },
            fail(res){
                tip.error('网络状态不佳');
            },
        });
    },
    
    
    /**
     * 在新页面中全屏预览图片。
     * 预览的过程中用户可以进行保存图片、发送给朋友等操作。
     * @param urls
     * @param param
     */
    previewImage(urls, param = 0){
        wx.previewImage({
            // 当前显示图片的http链接
            current: urls[0],
            // 需要预览的图片http链接列表
            urls: urls
        })
    },
    
    
    /**
     * 获取图片信息。
     * 网络图片需先配置download域名才能生效。
     * @param src
     * @param callback
     * @param param
     */
    getImageInfo(src, callback=function(){}, param = ''){
        wx.getImageInfo({
            src: src,
            success(res) {
                if(param.length > 1){
                    callback(res[param]);
                } else {
                    callback(res);
                }
            }
        })
    },
    
    
    /**
     * 压缩图片接口，可选压缩质量
     * @param src       图片路径，图片的路径，可以是相对路径、临时文件路径、存储文件路径
     * @param quality   压缩质量，范围0～100，数值越小，质量越低，压缩率越高（仅对jpg有效）。
     * @param callback
     */
    compressImage(src, quality = 80, callback=function(){}){
        wx.compressImage({
            // 图片路径
            src: src,
            // 压缩质量
            quality: quality,
            success(tempFilePath){
                callback(tempFilePath);
            },
            fail(res){
                tip.error('压缩图片失败');
            },
        })
    },
    
    
    /**
     * 从客户端会话选择文件
     * @param callback
     * @param param
     * @param count
     * @param type
     */
    chooseMessageFile(callback=function(){}, param = 'tempFilePath', count=10, type='all'){
        wx.chooseMessageFile({
            count: count,
            type: type,
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                if(param.length > 0){
                    callback(res[param]);
                } else {
                    callback(res);
                }
            }
        })
    },
    
    
    /**
     * 从本地相册选择图片或使用相机拍照。
     * @param callback
     * @param param
     */
    chooseImage(callback=function(){}, param = 'tempFilePaths'){
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                // const tempFilePaths = res.tempFilePaths
                if(param.length > 0){
                    callback(res[param]);
                } else {
                    callback(res);
                }
            }
        })
    },
    
    
    /**
     * 微信授权
     * @param scope
     * @param callback
     */
    authorize(scope,callback=function(){}){
        wx.getSetting({
            success(res) {
                if (!res.authSetting[scope]) {
                    wx.authorize({
                        scope: scope,
                        success() {
                            // 用户已经同意小程序使用该功能，后续调用接口不会弹窗询问
                            callback();
                        },
                        fail: function() {
                            tip.longtoast('取消授权将无法保存至手机');
                        }
                    });
                }
            }
        });
    },
    
    
    /**
     * 保存视频到系统相册。支持mp4视频格式。
     * @param filePath
     * @param callback
     * @param param
     */
    saveVideoToPhotosAlbum(filePath, callback=function(){}, param = 'errMsg'){
        this.authorize('scope.writePhotosAlbum', ()=>{
            wx.saveVideoToPhotosAlbum({
                filePath: filePath,
                success(res) {
                    if(param.length > 0){
                        callback(res[param]);
                    } else {
                        callback(res);
                    }
                },
                fail(res){
                    console.log(res);
                    tip.error('下载失败');
                }
            })
        });
    },
    
    
    /**
     * 选择视频
     * @param callback
     * @param param
     * @param maxDuration
     */
    chooseVideo(callback=function(){}, param = 'tempFilePath', maxDuration = 60){
        wx.chooseVideo({
            sourceType: ['album', 'camera'],
            maxDuration: maxDuration,
            camera: 'back',
            success(res) {
                if(param.length > 0){
                    callback(res[param]);
                } else {
                    callback(res);
                }
            }
        })
    },
    
    
    /**
     * 获取当前的地理位置、速度。
     * 当用户离开小程序后，此接口无法调用。
     * @param callback
     * @param param
     */
    getLocation(callback=function(){}, param= ''){
        // this.authorize('scope.userLocation', ()=>{
            wx.getLocation({
                type: 'gcj02',
                success(res) {
                    // const latitude = res.latitude
                    // const longitude = res.longitude
                    // const speed = res.speed
                    // const accuracy = res.accuracy
                    if(param.length > 0){
                        callback(res[param]);
                    } else {
                        callback(res);
                    }
                },
                fail(){
                    tip.error('获取定位失败');
                }
            })
        // });
    },
    
    
    /**
     * 使用微信内置地图查看位置
     * @param latitude
     * @param longitude
     * @param callback
     * @param name
     * @param address
     */
    openLocation(latitude, longitude, callback=function(){}, name = '', address = ''){
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 18,
            name: name,
            address: address,
            success(){
                callback();
            },
        });
    },
    
    
    /**
     * 打开地图选择位置。
     * @param latitude
     * @param longitude
     * @param callback
     * @param name
     * @param address
     */
    chooseLocation(callback=function(){}){
        // this.authorize('scope.userLocation', ()=>{
            wx.chooseLocation({
                success: (res)=>{
                    callback(res);
                },
            });
        // })
    },
    
    
    /**
     * 保存文件到本地
     * @param tempFilePath
     * @param callback
     */
    saveFile(tempFilePath, callback){
        wx.saveFile({
            tempFilePath: tempFilePath,
            success(res) {
                callback(res.savedFilePath);
            }
        })
    },
    
    
    getSavedFileList(callback){
        wx.getSavedFileList({
            success(res) {
                callback(res.fileList);
            }
        })
    },
    
    
    /**
     * 删除所有本地缓存文件
     */
    removeSavedFile(){
        this.getSavedFileList((res)=>{
            let len = res.length;
            if (len > 0) {
                for (let i = 0; i < res.length; i++){
                    wx.removeSavedFile({
                        filePath: res[i].filePath,
                    });
                }
            }
        });
    },
    
    
    /**
     * 新开页面打开文档
     * @param filePath
     * @param callback
     */
    openDocument(filePath, callback=function(){}){
        wx.openDocument({
            filePath: filePath,
            success(res) {
                callback(res);
            }
        })
    },
    
    
    
    /**
     * 获取文件信息
     * @param callback
     * @param param
     */
    getFileInfo(callback=function(){}, param=''){
        wx.getFileInfo({
            success(res) {
                if(param.length > 0){
                    callback(res[param]);
                } else {
                    callback(res);
                }
            }
        })
    },
    
    
    /**
     * 小程序登录
     * @param callback
     */
    login(callback){
        wx.login({
            success(res) {
                if (res.code) {
                    // 发起网络请求
                    callback(res.code);
                } else {
                    tip.error('登录失败');
                }
            }
        })
    },
    
    
    /**
     * 获取用户信息。
     * @param callback
     * @param param
     * @param withCredentials 是否带上登录态信息
     * @param lang 显示用户信息的语言
     */
    getUserInfo(callback=function(){} ,param = '', withCredentials=false, lang='en'){
        this.authorize('scope.userInfo', ()=>{
            // 必须是在用户已经授权的情况下调用
            wx.getUserInfo({
                withCredentials: withCredentials,
                lang:lang,
                success(res) {
                    // const userInfo = res.userInfo
                    // const nickName = userInfo.nickName
                    // const avatarUrl = userInfo.avatarUrl
                    // const gender = userInfo.gender // 性别 0：未知、1：男、2：女
                    // const province = userInfo.province
                    // const city = userInfo.city
                    // const country = userInfo.country
                    
                    if(param.length > 0){
                        callback(res[param]);
                    } else {
                        callback(res);
                    }
                }
            })
        });
    },
    
 
    /**
     * 微信支付
     * @param timeStamp 时间戳
     * @param nonceStr  随机字符串，长度为32个字符以下
     * @param packages  统一下单接口返回的 prepay_id 参数值，提交格式如：prepay_id=***
     * @param signType  签名算法
     * @param paySign   签名
     * @param suFun
     * @param errFun
     */
    weixinPay(timeStamp = '', nonceStr = '', packages = '',signType = '',paySign = '', suFun=function(){}, errFun=function(){}){
        wx.requestPayment({
            timeStamp: timeStamp,
            nonceStr: nonceStr,
            package: packages,
            signType: signType,
            paySign: paySign,
            success(res){
                suFun(res);
            },
            fail(res){
                errFun(res);
            }
        });
    },
    
    
    /**
     * 获取用户收货地址。调起用户编辑收货地址原生界面，并在编辑完成后返回用户选择的地址。
     * @param callback
     */
    chooseAddress(callback=function(){}){
        wx.chooseAddress({
            success(res) {
                // console.log(res.userName)
                // console.log(res.postalCode)
                // console.log(res.provinceName)
                // console.log(res.cityName)
                // console.log(res.countyName)
                // console.log(res.detailInfo)
                // console.log(res.nationalCode)
                // console.log(res.telNumber)
                callback(res);
            }
        })
    },
    
    
    /**
     * 选择用户的发票抬头。
     * 当前小程序必须关联一个公众号，且这个公众号是完成了微信认证的，才能调用 chooseInvoiceTitle。
     * @param callback
     */
    chooseInvoiceTitle(callback=function(){}){
        this.authorize('scope.invoiceTitle', ()=>{
            wx.chooseInvoiceTitle({
                success(res) {
                    // console.log(res);
                    callback(res);
                }
            })
        });
    },
    
    
    /**
     * 选择用户已有的发票。
     * @param callback
     */
    chooseInvoice(callback){
        this.authorize('scope.invoice', ()=>{
            wx.chooseInvoice({
                success(res){
                    console.log(res);
                    callback(res);
                }
            });
        });
    },
    
    
    /**
     * 获取用户过去三十天微信运动步数。
     * 需要先调用 wx.login 接口。步数信息会在用户主动进入小程序时更新。
     * @param callback
     */
    getWeRunData(callback=function(){}){
        wx.getWeRunData({
            success(res) {
                console.log(res);
                callback(res);
            }
        })
    },
    
    
    /**
     * 设置系统剪贴板的内容
     * @param data
     * @param callback
     */
    setClipboardData(data, callback=function(){}){
        wx.setClipboardData({
            data: data,
            success(res) {
                callback(res);
            }
        })
    },
    
    
    /**
     * 获取系统剪贴板的内容
     * @param callback
     */
    getClipboardData(callback=function(){}){
        wx.getClipboardData({
            success(res) {
                callback(res.data);
            }
        })
    },
    
    
    /**
     * 监听网络状态变化事件
     * @param callback
     */
    onNetworkStatusChange(callback=function(){}){
        wx.onNetworkStatusChange(function (res) {
            console.log(res.isConnected);
            console.log(res.networkType);
            callback(res);
        })
    },
    
    
    /**
     * 获取网络类型
     * @param callback
     */
    getNetworkType(callback=function(){}){
        wx.getNetworkType({
            success(res) {
                // console.log(res);
                callback(res.networkType);
            }
        })
    },
    
    
    /**
     * 设置屏幕亮度
     * @param value  屏幕亮度值，范围 0 ~ 1。0 最暗，1 最亮
     * @param callback
     */
    setScreenBrightness(value = 0.8, callback=function(){}){
        wx.setScreenBrightness({
            value:value,
            success(res){
                callback(res);
            }
        });
    },
    
    
    /**
     * 设置是否保持常亮状态。
     * 仅在当前小程序生效，离开小程序后设置失效。
     * @param keepScreenOn
     */
    setKeepScreenOn(keepScreenOn = true){
        wx.setKeepScreenOn({
            keepScreenOn: keepScreenOn
        })
    },
    
    
    /**
     * 拨打电话
     * @param phone
     */
    makePhoneCall(phone){
        wx.makePhoneCall({
            phoneNumber: phone
        })
    },
    
    
    /**
     * 调起客户端扫码界面进行扫码
     * @param callback
     */
    scanCode(callback=function(){}){
        // 允许从相机和相册扫码
        wx.scanCode({
            onlyFromCamera:false,
            scanType:['barCode', 'qrCode'],
            success(res) {
                // console.log(res);
                callback(res);
            }
        })
    },
    
    
    /**
     * 使手机发生较短时间的振动（15 ms）。
     * 仅在 iPhone 7 / 7 Plus 以上及 Android 机型生效
     */
    vibrateShort(){
        wx.vibrateShort();
    },
    
    
    /**
     * 使手机发生较长时间的振动（400 ms)
     */
    vibrateLong(){
        wx.vibrateLong();
    },
    
    
};
module.exports = WxApi;