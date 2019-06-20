// components/radio/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        items:{
            type:Array,
            value: [
                {name: 'USA', value: '美国'},
                {name: 'CHN', value: '中国', checked: 'true'},
                {name: 'BRA', value: '巴西'},
                {name: 'JPN', value: '日本'},
                {name: 'ENG', value: '英国'},
                {name: 'TUR', value: '法国'},
            ]
        },
        site:{
            type:String,
            value: 'right'
        },
        reverse:Boolean,
        color:{
            type:String,
            value:'#0082d5'
        },
        textCheckedColor: {
            type:String,
            value: ''
        }
    },
    

    /**
     * 组件的初始数据
     */
    data: {
        textChecked:[]
    },
    
    
    lifetimes: {
        ready(){
            let site = this.properties.site;
            let value = '';
            switch(site){
                case 'left': value = 'flex-start';
                    break;
                case 'right': value = 'flex-between';
                    break;
            }
            this.setData({
                site: value,
            });
            
            if(!this.properties.textCheckedColor){
                let color = this.properties.color;
                this.setData({
                    textCheckedColor: color
                });
            }
            let textChecked = [];
            this.properties.items.forEach((item, index)=>{
                textChecked[index] = false;
                if(item.checked){
                    textChecked[index] = true;
                }
            });
            this.setData({
                textChecked: textChecked
            });
        }
    },
    
    
    /**
     * 组件的方法列表
     */
    methods: {
        radioChange(e){
            let value = e.detail.value;
            let textChecked = [];
            this.properties.items.forEach((item, index)=>{
                textChecked[index] = false;
                if(value.includes(item.name)){
                    textChecked[index] = true;
                }
            });
            this.setData({
                textChecked:textChecked
            });
            this.triggerEvent('onChange', {value:e.detail.value}, {});
        },
    }
});
