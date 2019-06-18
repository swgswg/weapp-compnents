// components/button/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        full:{
            type:Boolean,
            value:false
        },
        size:{
            type:String,
            value: 'success'
        },
        color:{
            type:String,
            value:'primary'
        },
        round:{
            type:Boolean,
            value:false,
        },
        pill:{
            type:Boolean,
            value:false
        },
        disabled:{
            type:Boolean,
            value:false
        },
        loading:{
            type:Boolean,
            value:false
        },
        openType:String,
        appParameter:String,
        hoverStopPropagation:Boolean,
        hoverStartTime:{
            type: Number,
            value: 20
        },
        hoverStayTime: {
            type: Number,
            value: 70
        },
        sessionFrom: {
            type: String,
            value: ''
        },
        sendMessageTitle:String,
        sendMessagePath: String,
        sendMessageImg: String,
        showMessageCard: Boolean
    }
    ,

    /**
     * 组件的初始数据
     */
    data: {

    },

    
    /**
     * 组件的方法列表
     */
    methods: {
        bindTap () {
            if (this.properties.disabled) return false;
            this.triggerEvent('onTap');
        },
        bindGetUserInfo({ detail = {} } = {}) {
            this.triggerEvent('onGetUserInfo', detail);
        },
        bindContact({ detail = {} } = {}) {
            this.triggerEvent('onContact', detail);
        },
        bindGetPhoneNumber({ detail = {} } = {}) {
            this.triggerEvent('onGetPhoneNumber', detail);
        },
        bindError({ detail = {} } = {}) {
            this.triggerEvent('onError', detail);
        }
    }
});
