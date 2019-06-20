// components/region_picker/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        region: {
            type:Array,
            value:['广东省', '广州市', '海珠区']
        },
        customItem: {
            type:String,
            value:''
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
        bindChange(e) {
            let value = e.detail.value;
            this.setData({
                region: e.detail.value
            });
            this.triggerEvent('onChange', { value: value}, {})
        }
    }
});
