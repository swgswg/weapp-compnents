// components/tab/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        tabs:{
            type:Array,
            value:[
                {name:1, value:'tab1', icon:'scoring'},
                {name:2, value:'tab2', icon:'pingfen'},
                {name:3, value:'tab3', icon:''},
                {name:4, value:'tab4', icon:'tiaozheng-'},
            ]
        },
        height:{
            type:Number,
            value: 100
        },
        color:{
            type:String,
            value:'red'
        },
        backgroundColor:{
            type:String,
            value:'#fff'
        },
    },

    /**
     * 组件的初始数据
     */
    data: {
        selected: 0
    },

    /**
     * 组件的方法列表
     */
    methods: {
        bindTap(e){
            console.log(e);
            let index = e.currentTarget.dataset.index;
            this.setData({
                selected: index
            });
            this.triggerEvent('onTab', {value: index}, {});
        },
    }
});
