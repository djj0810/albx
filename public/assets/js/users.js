// 当表单发生提交行为的时候
$('#userForm').on('submit', function() {
        // 获取到用户在表单中输入的内容并将内容格式化成字符串型
        var fomrData = $(this).serialize();
        // 向服务器发送添加用户的请求
        $.ajax({
                type: 'post',
                url: '/users',
                data: fomrData,
                success: function() {
                    location.reload();
                },
                error: function() {
                    alert('用户添加失败')
                }

            })
            // 阻止表单的默认行为
        return false;
    })
    // 当用户选择文件的时候
$('#modifyBox').on('change', '#avatar', function() {
        // 用户选择到的文件
        // this.files[0]
        var fomrData = new FormData();
        fomrData.append('avatar', this.files[0]);
        $.ajax({
            type: 'post',
            url: '/upload',
            data: fomrData,
            // 告诉$.ajax方法不要解析请求参数
            processData: false,
            // 告诉$.ajax方法不同设置请求参数的类型
            contentType: false,
            success: function(response) {
                // 实现头像预览功能
                $('#preview').attr('src', response[0].avatar);
                $('#hiddenAvatar').val(response[0].avatar)
            }
        })

    })
    // 用户列表展示
$.ajax({
        type: 'get',
        url: '/users',
        success: function(response) {
            var html = template('userTpl', {
                data: response
            });
            // console.log(html)
            $('#userBox').html(html);

        }
    })
    // 通过事件委托的方式为编辑按钮添加点击事件
$('#userBox').on('click', '.edit', function() {
        // 获取被点击用户的id
        var id = $(this).attr('data-id');
        // 根据id获取用户的详细信息
        $.ajax({
            type: 'get',
            url: '/users/' + id,
            success: function(response) {
                var html = template('modifyTpl', response);
                // console.log(html);
                $('#modifyBox').html(html);
            }
        })
    })
    // 为修改表单添加表单提交事件
$('#modifyBox').on('submit', '#modifyForm', function() {
    // 获取用户在表单中输入的内容
    var fomrData = $(this).serialize();
    // 获取要修改的那个用户的id值
    var id = $(this).attr('data-id');
    // 发送请求 修改用户信息
    $.ajax({
            type: 'put',
            url: '/users/' + id,
            data: fomrData,
            success: function(response) {
                // 修改用户信息成功 重新加载页面
                location.reload();
            }
        })
        // 阻止表单默认提交
    return false;
})