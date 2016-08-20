/*导航栏JS效果*/
// 实现下载APP的mouseover效果
(function(){
    var oTopBar=document.getElementById("topBar"),
        oTopApp=utils.getByClass("app")[0],
        oTopDown=utils.getByClass("down")[0];
    oTopApp.onmouseover=function(){
        console.log("OK");
        utils.css(oTopDown,{
            "display":"block",
            "zIndex":1
        })
    };
    oTopApp.onmouseout=function(){
        utils.css(oTopDown,{
            "display":"none"
        })
    };
})();
// 宝贝 店铺选项卡效果
(function(){
    var oComSearCh=document.getElementById("com-search"),
        aSearChSpan=oComSearCh.getElementsByTagName("span"),
        aSearchInp=oComSearCh.getElementsByTagName("input")[0];
    aSearChSpan[0].onclick=function(){
        utils.addClass(this,"active");
        utils.removeClass(aSearChSpan[1],"active");
        aSearchInp.placeholder="帆布鞋 清爽夏日穿搭范本！";
    };
    aSearChSpan[1].onclick=function(){
        aSearchInp.placeholder="";
        utils.addClass(this,"active");
        utils.removeClass(aSearChSpan[0],"active");
    };
})();
// 导航栏更多效果 及 回到顶部
(function(){
    var oNav=document.getElementById("nav");
    oNav.navHeight=utils.offset(oNav).top;
    var maxHeight = utils.win("clientHeight");
    var oToTop = document.getElementById("toTop");
    window.onscroll=function(){
        var scrollTop=utils.win("scrollTop");
        if(scrollTop>=oNav.navHeight){
            utils.addClass(oNav,"fixed");
        }else if(scrollTop<oNav.navHeight){
            utils.removeClass(oNav,"fixed");
        }
        if(scrollTop>=maxHeight){
            utils.css(oToTop,"display","block");
        }else{
            utils.css(oToTop,"display","none");
        }
    };
})();

/*Banner效果*/
(function(){
    // 头部列表数据绑定
    publicMethod.topListBind("dailySelction",dailySelction);
    publicMethod.topListBind("poplular",poplular);
    publicMethod.topListBind("fashionClassic",fashionClassic);
    publicMethod.topListBind("clothWear",clothWear);
    publicMethod.topListBind("beatifulLife",beatifulLife);
    publicMethod.topMoreBind("SelctionMore",SelctionMore);
    publicMethod.topMoreBind("poplularMore1",poplularMore1);
    publicMethod.topMoreBind("poplularMore2",poplularMore2);
    publicMethod.topMoreBind("poplularMore3",poplularMore3);
    publicMethod.topMoreBind("poplularMore4",poplularMore4);
    publicMethod.topMoreBind("poplularMore5",poplularMore5);
    publicMethod.topMoreBind("fashionMore1",fashionMore1);
    publicMethod.topMoreBind("fashionMore2",fashionMore2);
    publicMethod.topMoreBind("fashionMore3",fashionMore3);
    publicMethod.topMoreBind("fashionMore4",fashionMore4);
    publicMethod.topMoreBind("collocation1",collocation1);
    publicMethod.topMoreBind("collocation2",collocation2);
    publicMethod.topMoreBind("collocation3",collocation3);
    publicMethod.topMoreBind("collocation4",collocation4);
    publicMethod.topMoreBind("lifeMore1",lifeMore1);
    publicMethod.topMoreBind("lifeMore2",lifeMore2);
    publicMethod.topMoreBind("lifeMore3",lifeMore3);
    publicMethod.topMoreBind("lifeMore4",lifeMore4);
    publicMethod.topMoreBind("lifeMore5",lifeMore5);
})();
(function(){
    // 头部列表hover事件
    var otopWrap=document.getElementById("top-wrap"),
        aLists=utils.getByClass("list",otopWrap);
    for(var i=0;i<aLists.length;i++){
        aLists[i].index=i;
        aLists[i].onmouseover=function(){
            var eleHeight=this.offsetHeight-1;
            this.prev=utils.prev(this);
            this.childs=utils.getChildren(this);
            this.firC=utils.firstChild(this);
            this.oCorner=this.childs[0].getElementsByTagName("i")[0];
            utils.css(this.childs[2],"display","block");
            utils.css(this.oCorner,"color","#f69");
            utils.css(this.childs[1],{
                "height":eleHeight,
                "display":"block"
            });
            if(this.prev){
                this.preChildD=utils.firstChild(this.prev);
                utils.css(this.preChildD,"borderBottom","none");
                utils.css(this.prev,"borderBottom","1px solid #e6e6e6");
            }
            if(this.index<aLists.length-1){
                utils.css(this.firC,"borderBottom","none");
                utils.css(this,"borderBottom","1px solid #e6e6e6");
            }
        };
        aLists[i].onmouseout=function(){
            this.firC=utils.firstChild(this);
            var lastChild=utils.lastChild(this);
            utils.css(lastChild,"display","none");
            utils.css(this.childs[1],"display","none");
            utils.css(this.oCorner,"color","#999");
            if(this.prev){
                this.preChildD=utils.firstChild(this.prev);
                utils.css(this.preChildD,"borderBottom","1px dashed #e6e6e6");
                utils.css(this.prev,"borderBottom","none");
            }
            if(this.index<aLists.length-1){
                utils.css(this.firC,"borderBottom","1px dashed #e6e6e6");
                utils.css(this,"borderBottom","none");
            }
        };
    }
    var banner=new publicMethod.Banner("banner",bannerImg,3000);
})();

/*hi范选项卡效果*/
(function(){
    publicMethod.tab("hiFan_con");
})();

/*好店推荐选项卡效果*/
(function(){
    publicMethod.tab("shop_con");
})();

/*尾部跑马灯效果*/
(function(){
    var autoMove = null;
    var count = 0;
    var oLinkList = document.getElementById("linkList");
    var aListPs = oLinkList.getElementsByTagName("p");
    window.clearInterval(autoMove);
    autoMove = window.setInterval(function(){
        if(count >= aListPs.length-1){
            count = 0;
            utils.css(oLinkList,"top",0);
        }
        count++;
        myAnimate(oLinkList,{"top":-count*20},500);
    },2000);
})();

/*侧边栏显示*/
(function(){
    var oSideBar = document.getElementById("sideBar");
    var oBg = utils.getByClass("bgColor")[0];
    var oSideOther = utils.getByClass("side-other")[0];
    var maxWidth = utils.win("clientWidth")-38;
    oSideBar.onmouseover = function(e){
        e = e||window.event;
        if(e.clientX >= maxWidth){
            utils.css(oSideOther,"display","block");
            myAnimate(oBg,{"right":0},200);
            myAnimate(oSideOther,{"right":0},200);
        }
    };
    oSideBar.onmouseout = function(e){
        e = e||window.event;
        if(e.clientX < maxWidth){
            utils.css(oSideOther,"display","none");
            myAnimate(oBg,{"right":-38},200);
            myAnimate(oSideOther,{"right":-38},200);
        }
    }
})();