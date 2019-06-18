// component/upload/upload.js
import wxapi from '../../utils/wx_api/WxApi';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        width:{
            type: Number,
            value:150
        },
        height:{
            type: Number,
            value: 150
        }        
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        addImg(){
            wxapi.uploadFile('http://47.93.223.152:8100/v1/upload/file', (res)=>{
                this.triggerEvent('upload', res, {});
            });
        },
    }
});
