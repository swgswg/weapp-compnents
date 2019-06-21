// components/date_picker/index.js

const field = ['year', 'month', 'day'];

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        date:{
            type:String,
            value: '2019-06-20'
        },
        start:String,
        end:String,
        fields:{
            type:String,
            value: 'day'
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
    
    },
    
    
    lifetimes: {
        ready() {
            if(!field.includes(this.properties.fields)){
                this.setData({
                    fields: field[2]
                });
            }
        },
    },
    

    /**
     * 组件的方法列表
     */
    methods: {
        bindChange(e){
            let value = e.detail.value;
            this.setData({
                date: e.detail.value
            });
            this.triggerEvent('onChange', { value: value}, {})
        },
    },
    
    
});
