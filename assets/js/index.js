$(function () {
    // 调用gitUserInfo获取用户的信息
    getUserInfo()
    $('#btnLogout').on('click', function () {
        layer.confirm('确认退出登录？', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            // 清空本地存储的token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = './login.html'
            layer.close(index);
        });
    })
})
// 获取用户的基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ""
        // },
        success: function (res) {
            if (res.status!==0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用renderAvatar渲染用户的头像
            renderAvatar(res.data)
        },
        // complete: function (res) {
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         // 1. 强制清空 token
        //         localStorage.removeItem('token')
        //         // 2. 强制跳转到登录页面
        //         location.href = '/login.html'
        //     }
        //     // console.log('执行了complete函数');
        //     // console.log(res);
        // }
    });
}
// 渲染用户的头像
function renderAvatar(user) {
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp&nbsp' + name)
    // 渲染图片头像
    if (user.user_pic !== null) {
        $('.layui-nav-img').atter('src', user.user_pic).show()
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide()
        var frist = name[0].toUpperCase()
        $('.text-avatar').html(frist).show()
    }
}