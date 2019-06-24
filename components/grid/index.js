// components/grid/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        grid:{
            type:Array,
            value: []
        },
        size:{
            type:Number,
            value:33.3
        },
        line:{
            type:Number,
            value:3
        },
        border:Boolean
    },

    /**
     * 组件的初始数据
     */
    data: {
        girdLine:[],
    },
    
    
    lifetimes: {
        ready(){
            let gridLen = this.properties.grid.length;
            let line = this.properties.line;
            if(gridLen > 0){
                let lineNum = Math.ceil(gridLen / line);
                let girdLine = [];
                for (let i = 0; i < lineNum; i++){
                    girdLine[i] = [];
                    for (let j = 0; j < line; j++){
                        let k = i*line+j;
                        if(k > gridLen - 1){
                            break;
                        }
                        girdLine[i].push(this.properties.grid[k]);
                    }
                }
                console.log(girdLine);
                this.setData({
                    girdLine:girdLine
                });
            }
        },
    },
    

    /**
     * 组件的方法列表
     */
    methods: {

    }
});
