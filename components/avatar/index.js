// components/avatar/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        src:{
            type:String,
            value:''
        },
        mode:{
            type:String,
            value: 'scaleToFill'
        },
        size:{
            type:String,
            value:'default'
        },
        shape:{
            type:String,
            value:'circle'
        },
        color:{
            type:String,
            value:'#ccc'
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
        bindTap(e){
            this.triggerEvent('onTap', {}, {})
        }
    }
})
