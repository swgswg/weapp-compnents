import wxapi from '../../utils/wx_api/WxApi';

Component({
    /**
     * 组件的属性列表
     */
    properties: {
        width:{
            type: Number,
            value: 375
        },
        height:{
            type: Number,
            value:450
        },
        latitud:{
            type:Number,
            value:0
        },
        longitude:{
            type:Number,
            value:0
        },
        scale:{
            type:Number,
            value:14
        },
        markers:{
            type:Array,
            value:[{
                iconPath: './location.png',
                id: 0,
                latitude: 23.099994,
                longitude: 113.324520,
                width: 25,
                height: 47,
                title:'aaa',
                label:{
                    content:'bbbbb',
                }
            }]
        },
        polyline:{
            type:Array,
            value:[{
                points: [{
                    longitude: 113.3245211,
                    latitude: 23.10229
                }, {
                    longitude: 113.324520,
                    latitude: 23.21229
                }],
                color: '#FF0000',
                width: 2,
                dottedLine: true,
                arrowLine:true
            }]
        },
        show_location:{
            type:Boolean,
            value:true
        },
        show_compass:{
            type:Boolean,
            value:true
        },
        enable_3D:{
            type:Boolean,
            value:true
        },
        enable_overlooking:{
            type:Boolean,
            value:true
        },
        enable_zoom:{
            type:Boolean,
            value:true
        },
        enable_scroll:{
            type:Boolean,
            value:true
        },
        enable_rotate:{
            type:Boolean,
            value:false
        },
        enable_satellite:{
            type:Boolean,
            value:false
        },
        enable_traffic:{
            type:Boolean,
            value:false
        },
        seat:{
            type:Boolean,
            value:true
        },
        chooseLocation:{
            type:Boolean,
            value:true
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        // latitude: 0,
        // longitude: 0,
    },
    
    
    lifetimes: {
        // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
        attached() {
            // wxapi.getLocation((res) => {
            //     this.setData({
            //         latitude:res.latitude,
            //         longitude:res.longitude
            //     });
            // });
        },
        created(){
            this.getLocation();
        },
        error(e){
            console.log('组件生命周期函数加载失败');
            console.log(e);
        },
    },
    
    
    
    /**
     * 组件的方法列表
     */
    methods: {
        markertap(e){
            this.triggerEvent('markerTap', {markerId:e.markerId}, {});
        },
        regionchange(e){
            this.triggerEvent('regionChange', {markerId:e.markerId}, {});
        },
        poitap(e){
            this.triggerEvent('poiTap', {markerId:e.markerId}, {});
        },
    
        getLocation(){
            wxapi.getLocation((res) => {
                wxapi.openLocation(res.latitude, res.longitude, ()=>{});
                if(this.data.chooseLocation){
                    wxapi.chooseLocation((res)=>{
                        this.triggerEvent('location', res, {});
                    });
                } else {
                    this.triggerEvent('location', res, {});
                }
            });
        },
    },
    
});
