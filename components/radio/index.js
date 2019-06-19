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
        textChecked:''
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
            
            if(!this.properties.textCheckedColor){
                let color = this.properties.color;
                this.setData({
                    textCheckedColor: color
                });
            }
            this.properties.items.forEach((item)=>{
                if(item.checked){
                    this.setData({
                        textChecked:item.name,
                        site: value
                    });
                }
            });
        }
    },
    
    
    /**
     * 组件的方法列表
     */
    methods: {
        radioChange(e){
            this.setData({
                textChecked:e.detail.value
            });
            this.triggerEvent('onChange', {value:e.detail.value}, {});
        }
    }
});
