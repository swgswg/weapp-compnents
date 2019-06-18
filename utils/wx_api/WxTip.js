 const wxTip = {
    /**
     * 显示成功消息提示框
     * @param title     文本最多显示7汉字长度
     * @param duration  提示的延迟时间
     */
    success(title, duration = 1000){
        wx.showToast({
            title: title,
            icon: "success",
            mask: true,
            duration: duration
        });
        // 隐藏结束回调
        setTimeout(() => {
            wx.hideToast();
        }, duration);
    },
    
    
    /**
     * 弹出确认窗口
     * 带取消按钮
     * @param text             文本内容
     * @param confirmCallback  确认回调
     * @param cancelCallback   取消回调
     * @param title            标题
     * @param errorCallback    错误回调
     */
    modal(text, confirmCallback = ()=>{}, cancelCallback = ()=>{}, title = "温馨提示", errorCallback = ()=>{}){
        wx.showModal({
            title: title,
            content: text,
            showCancel: true,
            success: res => {
                if (res.confirm) {
                    confirmCallback();
                } else if (res.cancel) {
                    cancelCallback();
                }
            },
            fail: res => {
                errorCallback(res);
            }
        });
    },
    
    
    /**
     * 弹出确认窗口
     * 无取消按钮
     * @param text
     * @param confirmCallback
     * @param title
     */
    confirm(text, confirmCallback = ()=>{}, title = "温馨提示"){
        wx.showModal({
            title: title,
            content: text,
            showCancel: false,
            success: res => {
                if (res.confirm) {
                    confirmCallback();
                }
            },
        });
    },
    
    
    /**
     * 显示消息提示框
     * @param title
     * @param icon
     * @param duration
     */
    toast(title = '', icon = "success", duration = 1000) {
        wx.showToast({
            title: title,
            icon: icon,
            mask: true,
            duration: duration
        });
        // 隐藏结束回调
        setTimeout(() => {
            wx.hideToast();
        }, duration);
    },
    
    
    /**
     * 警告
     * @param title
     */
    alert(title) {
        wx.showToast({
            title: title,
            image: "/utils/wx_api/image/alert.png",
            mask: true,
            duration: 1500
        });
        // 隐藏结束回调
        setTimeout(() => {
            wx.hideToast();
        }, 1500);
    },
    
    
    /**
     * 错误框
     * @param title
     */
    error(title) {
        wx.showToast({
            title: title,
            image: "/utils/wx_api/image/error.png",
            mask: true,
            duration: 1500
        });
        // 隐藏结束回调
        setTimeout(() => {
            wx.hideToast();
        }, 1500);
    },
    
    
    /**
     * 加载提示
     * @param title
     * @param hide
     */
    loading(title = "加载中", hide = true) {
        wx.showLoading({
            title: title,
            mask: true
        });
        if(hide){
            setTimeout(function () {
                wx.hideLoading()
            }, 2000);
        }
    },
    
    
    /**
     * 结束加载提示
     */
    loaded(){
        wx.hideLoading()
    },
    
    
    /**
     * 长语句提示框
     * @param content
     * @param title
     */
    longtoast(content, title='温馨提示'){
        wx.showModal({
            title: title,
            content: content,
            showCancel:false,
        });
    }
    
};
 module.exports = wxTip;