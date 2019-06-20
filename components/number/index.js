// components/number/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        width:{
            type:Number,
            value:200
        },
        height:{
            type:Number,
            value:50
        },
        value:Number,
        step:{
            type:Number,
            value:1
        },
        min:{
            type:Number,
            value:0
        },
        max:{
            type:Number,
            value:100
        },
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
        jia(){
            this.addNum (this.properties.step);
        },
        jian(){
            this.addNum (-this.properties.step);
        },
        bindInput(e){
            let val = this.setNumber(e.detail.value);
            this.triggerEvent('onChange', {value: val});
        },
        bindBlur(e){
            let val = this.setNumber(e.detail.value);
            this.triggerEvent('onBlur', {value: val});
        },
    
        addNum (num2) {
            if(this.properties.disabled){
                return;
            }
            let num1 = this.properties.value;
            let sq1, sq2, m;
            try {
                sq1 = num1.toString().split('.')[1].length;
            }
            catch (e) {
                sq1 = 0;
            }
            try {
                sq2 = num2.toString().split('.')[1].length;
            }
            catch (e) {
                sq2 = 0;
            }
            m = Math.pow(10, Math.max(sq1, sq2));
            let val = (Math.round(num1 * m) + Math.round(num2 * m)) / m;
            let data = this.setNumber(val);
            this.triggerEvent('onChange', {value: data});
        },
        
        setNumber(val){
            if(val <= this.properties.min){
                val = this.properties.min;
            }else if(val >= this.properties.max){
                val = this.properties.max;
            }
            this.setData({
                value: val
            });
            return val;
        }
    
    }
});

