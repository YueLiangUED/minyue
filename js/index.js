(function(global){
    function remChange(){
        document.documentElement.style.fontSize=20*document.documentElement.clientWidth/750+'px';
    }
    remChange();
    global.addEventListener('resize',remChange,false);
})(window);

$(function () {
    //点击悬浮按钮滚动到表单填写处
    $('aside').on('click',function () {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 500);
        return false;
    });
    //如首页信息未填写完成出现提示文字
    $('#button').on('click',function () {
        if($('#name').val() === '' || $('#tel').val() === ''){
            $('#message_1').show();
        }else{
            //积分扣减弹窗手机号 到场人数 扣减积分绑定
            $('#telephone').text($('#tel').val());
            $('#people').text(parseInt($("select").find("option:selected").text())+1);
            //绑定扣减积分
            $('#integration').text(/*扣减的积分*/);
            $('.tc_1').fadeIn();
            showMask();
        }
    });
    //电话姓名已填写隐藏提示信息
    $('#name,#tel').on('keyup',function () {
        if($('#name').val() !== '' && $('#tel').val() !== ''){
            $('#message_1').hide();
        }
    })
    //积分扣减弹窗获取验证码按钮
    var countdown=60;
    function sendemail(){
        var obj = $("#codeBtn");
        settime(obj);
    }
    function settime(obj) { //发送验证码倒计时
        if (countdown == 0) {
            obj.on('click',function () {
                sendemail();
            });
            obj.text("获取验证码");
            obj.css({
                'color': '#fefefe',
                'background': '#299aa0'
            });
            countdown = 60;
            return;
        } else {
            obj.css({
                'color': '#666',
                'background':'#ccc'
            })
            obj.unbind('click');
            obj.text("重新发送(" + countdown + ")");
            countdown--;
        }
        setTimeout(function() {
                settime(obj) }
            ,1000)
    }
    $('#codeBtn').on('click',function () {
        sendemail();
    });
    //扣减积分弹窗取消按钮
    $('#tc1-1Btn').on('click',function () {
        $('.tc_1').fadeOut();
        hideMask();
    });
    //扣减积分弹窗确定按钮
    $('#tc1-2Btn').on('click',function () {
        if(验证码错误){
            $('#tc_1Message').show();
        }else{
            $('#tc_1Message').hide();
        }
        confirmBox();
    });
    //判断是否已同意积分扣减规则
    function confirmBox(){
        var confirmBox = document.getElementById("cbId");
        if(confirmBox.checked){
            //如已同意do something
        }else{
            alert("请同意《积分扣减规则》");
            return false;
        }
    }

    //点击查看积分扣减规则
    $('#lookBtn').on('click',function () {
        $('.tc_2').fadeIn();
    });

    //积分扣减规则弹窗确定按钮
    $('#tc2Btn').on('click',function () {
        $(this).parent().fadeOut();
    });


    //显示遮罩层
    function showMask(){
        $("#mask").css("height",$(document).height());
        $("#mask").css("width",$(document).width());
        $("#mask").show();
    }
    //隐藏遮罩层
    function hideMask(){
        $("#mask").hide();
    }


});
