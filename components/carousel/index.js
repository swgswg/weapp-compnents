// components/scroll/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        imgUrls:Array,
        height:{
            type:Number,
            value:400
        },
        indicatorDots:{
            type:Boolean,
            value:true
        },
        indicatorColor: String,
        indicatorActiveColor:String,
        autoplay:{
            type:Boolean,
            value:true
        },
        current:Number,
        interval:{
            type:Number,
            value:5000
        },
        duration:{
            type:Number,
            value:500
        },
        circular:{
            type:Boolean,
            value:true
        },
        vertical:Boolean,
        previousMargin:{
            type:String,
            value:'0rpx'
        },
        nextMargin:{
            type:String,
            value:'0rpx'
        },
        displayMultipleItems:{
            type:Number,
            value:1
        },
        easingFunction:{
            type:String,
            value:'default'
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
        bindChange(e){
            this.triggerEvent('onChange', {value:e.detail});
        },
    
        bindTransition(e){
            this.triggerEvent('onTransition', {value:e.detail});
        },
    
        bindAnimationFinish(e){
            this.triggerEvent('onFinish', {value:e.detail});
        }
    }
});
