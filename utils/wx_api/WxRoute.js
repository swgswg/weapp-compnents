const WxRoute = {
    /**
     * 跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
     * @param url
     */
    switchTab(url){
        wx.switchTab({
            url: url
        });
    },
    
    
    /**
     * 关闭所有页面，打开到应用内的某个页面
     * @param url
     * @param param
     */
    reLaunch(url, param = {}){
        let query = this._splitParam(param);
        wx.reLaunch({
            url: url + query
        });
    },
    
    
    /**
     * 关闭当前页面，跳转到应用内的某个页面。但是不允许跳转到 tabbar 页面。
     * @param url
     * @param param
     */
    redirectTo(url,param={}){
        let query = this._splitParam(param);
        console.log(url + query);
        wx.redirectTo({
            url: url + query
        });
    },
    
    
    /**
     * 保留当前页面，跳转到应用内的某个页面。但是不能跳到 tabbar 页面
     * 使用 wx.navigateBack 可以返回到原页面。小程序中页面栈最多十层。
     * @param url
     * @param param
     */
    navigateTo(url,param={}){
        let query = this._splitParam(param);
        wx.navigateTo({
            url: url + query
        })
    },
    
    
    /**
     * 关闭当前页面，返回上一页面或多级页面
     * @param delta
     */
    navigateBack(delta = 1){
        wx.navigateBack({
            delta: delta
        })
    },
    
    
    /**
     * 获取加载的页面
     * @returns {*}
     */
    getCurrentPage(delta = 1){
        //获取加载的页面
        let pages = getCurrentPages();
        //获取当前页面的对象
        return pages[pages.length - parseInt(delta)];
    },
    
    
    
    /**
     * 获取当前页url
     * @returns {*}
     */
    getCurrentPageUrl() {
        // //获取当前页面的对象
        let currentPage = this.getCurrentPage();
        //当前页面url
        return currentPage.route;
    },
    
    
    /**
     * 获取当前页带参数的url
     * @returns {string}
     */
    getCurrentPageUrlWithArgs() {
        //获取当前页面的对象;
        let currentPage = this.getCurrentPageUrl();
        //当前页面url
        let url = currentPage.route;
        //如果要获取url中所带的参数可以查看options
        let options = currentPage.options;
        
        //拼接url的参数
        let urlWithArgs = url + '?';
        for (let key in options) {
            let value = options[key];
            urlWithArgs += key + '=' + value + '&';
        }
        urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1);
        return urlWithArgs
    },
    
    
    /**
     * 获取上一页url
     * @returns {*}
     */
    getPrevPageUrl() {
        //获取上一级页面的对象
        let prevPage = this.currentPage(2);
        //上一个页面url
        return prevPage.route;
    },
    
    
    _splitParam(param){
        let tmp = [];
        for(let k in param){
            if(param[k]){
                tmp.push(k + '=' + param[k]);
            }
        }
        let query = '';
        if(tmp.length > 0){
            query =  '?' + tmp.join('&');
        }
        return query;
    }
    
};
module.exports = WxRoute;
