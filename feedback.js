var jsForm = document.getElementById('jsForm');

//存放点击提交时候的用户星级选择,默认先赋值为-1 
document.getElementById("score").value = -1;

// 用当前网址的域名，作为platform字段的填入值
document.getElementById("platform").value = window.location.host;
if (document.getElementById("platform").value == '')
    document.getElementById("platform").value = window.location.href;


window.onload = function() {
    var oStar = document.getElementById("star");
    var aLi = oStar.getElementsByTagName("li");
    var oUl = oStar.getElementsByTagName("ul")[0];
    var oSpan = oStar.getElementsByTagName("span")[1];
    var oP = oStar.getElementsByTagName("p")[0];
    var i = iScore = iStar = 0;
    var aMsg = [
        "很不满意|几乎无法找到自己所需的功能，页面出现错位等情况",
        "不满意|功能模块不健全，页面风格不太符合审美",
        "一般|功能勉强能用，页面布局合理，使用体验一般",
        "满意|功能基本完整，使用较为方便，页面清晰明了",
        "非常满意|功能完整，使用方便，界面美观，五星好评"
    ]

    for (i = 1; i <= aLi.length; i++) {
        aLi[i - 1].index = i;
        //鼠标移过显示分数
        aLi[i - 1].onmouseover = function() {
            fnPoint(this.index);
            //浮动层显示
            oP.style.display = "block";
            //计算浮动层位置
            oP.style.left = oUl.offsetLeft + this.index * this.offsetWidth - 104 + "px";
            //匹配浮动层文字内容
            oP.innerHTML = "<em><b>" + this.index + "</b> 分 " + aMsg[this.index - 1].match(/(.+)\|/)[1] + "</em>" + aMsg[this.index - 1].match(/\|(.+)/)[1]
        };
        //鼠标离开后恢复上次评分
        aLi[i - 1].onmouseout = function() {
            fnPoint();
            //关闭浮动层
            oP.style.display = "none"
        };
        //点击后进行评分处理
        aLi[i - 1].onclick = function() {
            iStar = this.index;
            document.getElementById("score").value = iStar;
            oP.style.display = "none";
            oSpan.innerHTML = "<strong>" + (this.index) + " 分</strong> (" + aMsg[this.index - 1].match(/\|(.+)/)[1] + ")"
        }
    }
    //评分处理
    function fnPoint(iArg) {
        //分数赋值
        iScore = iArg || iStar;
        for (i = 0; i < aLi.length; i++) aLi[i].className = i < iScore ? "on" : "";
    }
};

// 点击提交按钮
document.getElementById('btn').onclick = function() {
    // var contentText = document.getElementById('content').value;
    var userName = document.getElementById('nameInput').value;
    if (userName == '')
        userName = "未输入用户名";
    if (document.getElementById("score").value == -1) {
        alert("请做出星级评价！");
        return false;
    }
    alert("提交成功！");
    jsForm.submit(); //提交表单
}