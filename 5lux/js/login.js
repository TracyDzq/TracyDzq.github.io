$(function(){
	//加载foot
	$('#footer').load('footer.html');
	//加载右侧边栏	
	$('#sidebar').load('right.html',function(){
		$.getScript('js/right.js');
	});
	
	var register = {
		regItem:$('.reg-item'),
		errorInfo:$('.error-info'),
		user:$('.user'),
		psw:$('.psw'),
		sub:$('.reg-sub input'),
		agree:$('.agree'),
		reg0:/^1[3|4|5|7|8]\d{9}$/,
		reg1:/^\w{6,16}$/,
		init:function(){			
			this.focus();
			this.click();
		},
		focus:function(){
			var that=this;
			this.regItem.focus(function(){
				$(this).css('border-color',"#269ABC");
				that.errorInfo.hide();
			}).blur(function(){
				$(this).css('border-color',"#ccc");
			})
		},
		click: function(){
			var that = this;
			this.sub.click(function(){
				if( $.trim(that.user.val()).length == 0 ){
					that.errorInfo.eq(0).show();
					return;
				};
				if( $.trim(that.psw.val()).length == 0 ){
					that.errorInfo.eq(1).html('密码不能为空！');
					that.errorInfo.eq(1).show();
					return;
				};
				if( !that.reg0.test( $.trim(that.user.val())) ){
					that.errorInfo.eq(1).html('用户名或者密码不正确！');
					that.errorInfo.eq(1).show();
					return;
				};
				if( !that.reg1.test( $.trim(that.psw.val())) ){
					that.errorInfo.eq(1).html('用户名或者密码不正确！');
					that.errorInfo.eq(1).show();
					return;
				};
				
				alert('登录成功');
			});
		}
	};
	
	register.init();
});
