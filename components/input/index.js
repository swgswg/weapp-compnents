// components/base/input/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        title:String,
        type:{
            type:String,
            value:'text'
        },
        placeholder:String,
        disabled:Boolean
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
        bindInput(e){
            this.triggerEvent('oninput', {value:e.detail.value}, {});
        }
    }
});
