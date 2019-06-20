// components/rate/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        count:{
            type:Number,
            value:5
        },
        color:{
            type:String,
            value:'#fdb120'
        },
        size:{
            type:Number,
            value:30
        },
        value:{
            type:Number,
            value: -1
        },
        icon:{
            type:String,
            value:'pingfen-xian'
        },
        selectIcon:{
            type:String,
            value:'pingfenhuang'
        },
        disabled: Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
    
    },
    
    lifetimes: {
        ready() {
            let val = this.properties.value - 1;
            this.setData({
                value:val
            });
        },
        
    },
    
    
    /**
     * 组件的方法列表
     */
    methods: {
        onTab(e){
            if(this.properties.disabled){
                return;
            }
            let index = e.currentTarget.dataset.index;
            this.setData({
                value:index
            });
            this.triggerEvent('onTab', {value: index + 1}, {});
        }
    }
});
