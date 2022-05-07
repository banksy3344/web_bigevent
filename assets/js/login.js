$(function () {
    // 点击去注册账号的链接
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    });

    // 点击去登录的链接
    $('#link-login').on('click', function () {
        $('.reg-box').hide()
        $('.login-box').show()
    });
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            // 注意：通过形参拿到啊的是确认密码框中的内容
            var pwd = $('.reg-box [name=password]').val()
            if (value !== pwd) {
                return '两次密码不一致！'
            }
        }
    })
    // 监听注册表单的提交事件
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name="username"]').val(),
            password: $('#form_reg [name="password"]').val()
        }
        $.post("/api/reguser", data,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('res.message');
                }
                layer.msg('注册成功！');
                $('#link-login').click();
            },
        );
    })
    // 监听登录表单的事件
    $('#form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res) {
                if (res.status!== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功！')
                // 登陆成功得到token字符串，保存到localStorage中
                localStorage.setItem('token',res.token)
                // 跳转到后台主页
                location.href = '/index.html'
            }
        })
    })
})