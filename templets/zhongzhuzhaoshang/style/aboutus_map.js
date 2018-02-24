$(function(){

    /*全国分布地图效果*/

    var jsonMap = {
        heilongjiang: {'stateInitColor': 2},
        jilin: {'stateInitColor': 1},
        liaoning: {'stateInitColor': 3},
        hebei: {'stateInitColor': 2},
        shandong: {'stateInitColor': 0},
        jiangsu: {'stateInitColor': 2},
        zhejiang:{'stateInitColor': 0},
        anhui: {'stateInitColor': 3},
        henan:{'stateInitColor': 1},
        shanxi:{'stateInitColor': 3},
        shaanxi: {'stateInitColor': 2},
        gansu: {'stateInitColor': 1},
        hubei:{'stateInitColor': 0},
        jiangxi: {'stateInitColor': 1},
        fujian:{'stateInitColor': 2},
        hunan: {'stateInitColor': 3},
        guizhou: {'stateInitColor': 1},
        sichuan:{'stateInitColor': 2},
        yunnan: {'stateInitColor': 3},
        qinghai: {'stateInitColor': 2},
        hainan: {'stateInitColor': 1},
        shanghai: {'stateInitColor': 3},
        chongqing: {'stateInitColor': 3},
        tianjin: {'stateInitColor': 4,'diabled': true},
        beijing: {'stateInitColor': 1},
        neimongol:{'stateInitColor': 0},
        guangxi: {'stateInitColor': 0},
        xinjiang:{'stateInitColor': 0},
        xizang: {'stateInitColor': 1},
        guangdong:{'stateInitColor': 3},
        ningxia: {'stateInitColor': 3},
        hongkong:{'stateInitColor': 3,'diabled': true},
        taiwan: {'stateInitColor': 0,'diabled': true},
        macau: {'stateInitColor': 3,'diabled': true}
    };
    var arrCompany = {
        heilongjiang: {'coname': '黑龙江-百城互联”计划','tell':'400-900-1971'},
        jilin: {'coname': '吉林-百城互联”计划','tell':'400-900-1971'},
        liaoning: {'coname': '辽宁-百城互联”计划','tell':'400-900-1971'},
        hebei: {'coname': '河北-百城互联”计划','tell':'400-900-1971'},
        shandong: {'coname': '山东-百城互联”计划','tell':'400-900-1971'},
        jiangsu: {'coname': '江苏-百城互联”计划','tell':'400-900-1971'},
        zhejiang:{'coname': '浙江-百城互联”计划','tell':'400-900-1971'},
        anhui: {'coname': '安徽-百城互联”计划','tell':'400-900-1971'},
        henan:{'coname': '河南-百城互联”计划','tell':'400-900-1971'},
        shanxi:{'coname': '山西-百城互联”计划','tell':'400-900-1971'},
        shaanxi:{'coname': '陕西-百城互联”计划','tell':'400-900-1971'},
        gansu: {'coname': '甘肃-百城互联”计划','tell':'400-900-1971'},
        hubei:{'coname': '湖北-百城互联”计划','tell':'400-900-1971'},
        jiangxi: {'coname': '江西-百城互联”计划','tell':'400-900-1971'},
        fujian:{'coname': '福建-百城互联”计划','tell':'400-900-1971'},
        hunan: {'coname': '湖南-百城互联”计划','tell':'400-900-1971'},
        guizhou: {'coname': '贵州-百城互联”计划','tell':'400-900-1971'},
        sichuan:{'coname': '四川-百城互联”计划','tell':'400-900-1971'},
        yunnan: {'coname': '云南-百城互联”计划','tell':'400-900-1971'},
        qinghai: {'coname': '青海-百城互联”计划','tell':'400-900-1971'},
        hainan: {'coname': '海南-百城互联”计划','tell':'400-900-1971'},
        shanghai: {'coname': '上海-百城互联”计划','tell':'400-900-1971'},
        chongqing: {'coname': '重庆-百城互联”计划','tell':'400-900-1971'},
        tianjin: {'coname': '总部','tell':'400-900-1971'},
        beijing: {'coname': '北京总部','tell':'400-900-1971'},
        neimongol:{'coname': '内蒙古-百城互联”计划','tell':'400-900-1971'},
        guangxi: {'coname': '广西-百城互联”计划','tell':'400-900-1971'},
        <!--xinjiang:{'coname': '新疆-百城互联”计划','tell':'400-900-1971'},-->
    <!--    xizang: {'coname': '西藏-百城互联”计划','tell':'400-900-1971'},-->
        guangdong:{'coname': '广东中住七一网络科技有限公司','tell':'400-900-1971<br>15622102239','addr':'地址：广东省广州市中山大学国家科技园A座803-812'},
        ningxia: {'coname': '宁夏-百城互联”计划','tell':'400-900-1971'},
        hongkong:{'coname': '总部','tell':'400-900-1971 '},
        taiwan: {'coname': '总部','tell':'400-900-1971 '},
        macau: {'coname': '总部','tell':'400-900-1971'}
    };


    $('#ChinaMap').SVGMap({
        mapName: 'china',
        mapWidth: 830,
        mapHeight: 698,
        strokeColor: 'F9FCFE',
        stateInitColor: '242f4d',
        stateHoverColor: 'eece60',
        stateSelectedColor: 'ffb400',
        stateDisabledColor: 'f4f7f9',
        stateData: jsonMap,
        /*showTip: false,*/
        /*stateTipHtml: function (stateData, obj) {
         var name=obj.names;
         console.log(arrCompany[name])
         },*/
        hoverCallback: function(stateData, obj){
            var prov = obj.id;
            $('#mapTitle').html(arrCompany[prov]['coname']);
            $('#mapTel').html(''+arrCompany[prov]['tell']);
            $('#mapAdd').html(arrCompany[prov]['addr']);

        }


    });

    function loadMap(){
/*        $("#map_box").animate({opacity:'1',marginLeft:'85px'},500);
        $("#map_text").delay(500).animate({opacity:'1',marginLeft:'0px'},500);
        $("#aboutus_china .box_text1").delay(1000).animate({opacity:'1',marginLeft:'100px'},500);
        $("#aboutus_china .box_text2").delay(1500).animate({opacity:'1',marginLeft:'50px'},500);*/
    }
    loadMap()





})
