// 解决绑定的方法的执行顺序问题的
// 事件池，程序池的概念，它是事件实现的原理
/*-
    事件的实现分为三部分：
    1、约定，绑定，订阅-->on addEventListener attachEvent  指把需要绑定的方法预先保存下来
    2、通知：当主行为发生的时候（比如说click）
    3、移除通知，解除绑定-->off   removeEventListener  detachEvent
-*/
function on(curEle,eventType,eventFn){
    if(curEle.addEventListener){
        curEle.addEventListener(eventType,eventFn,false);
        return;
    }
   if(!curEle["myEvent"+eventType]){
        curEle["myEvent"+eventType]=[];
       // 只有这个判断里面，无论在同一个元素的同一个事件上，on执行多少次，这里的代码只会执行一次
       curEle.attachEvent("on"+eventType,function(){
           run.call(curEle);
       });
    }
    var ary=curEle["myEvent"+eventType];
    for(var i=0;i<ary.length;i++){
        var cur=ary[i];
        if(cur===eventFn){
            return;
        }
    }
    ary.push(eventFn);
    // 真正绑定的方法是run，也就是说当事件触发，执行的是run方法。run方法不需要移除，既然是这样，则bind方法可以不要，如果bind不需要，如何让把run方法绑定在curEle的eventType事件上呢？（run的this要指向curEle，并且这个run不能被重复绑定）
}
function run(e){
    e=e||window.event;
    if(!e.target){
        e.target= e.srcElement;
        e.pageX=(document.documentElement.scrollLeft||document.body.scrollLeft)+ e.clientX;
        e.pageY=(document.documentElement.scrollTop||document.body.scrollTop)+ e.clientY;
        e.preventDefault=function(){
            e.returnValue=false;
        };
        e.stopPropagation=function(){
            e.cancelBubble=true;
        };
    }
    var ary=this["myEvent"+ e.type];
    for(var i=0;i<ary.length;i++){
        var cur=ary[i];
        if(typeof cur==="function"){
            cur.call(this,e);
        }else{
            ary.splice(i,1);
            i--;
        }

    }
}
function off(curEle,eventType,eventFn){
    if(curEle.removeEventListener){
        curEle.removeEventListener(eventType,eventFn,false);
        return;
    }
    var ary=curEle["myEvent"+eventType];
    for(var i=0;i<ary.length;i++){
        var cur=ary[i];
        if(cur===eventFn){
            ary[i]=null;
            break;
        }
    }
}