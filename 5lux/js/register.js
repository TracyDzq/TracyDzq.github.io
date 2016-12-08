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
		mobile:$('.mobile'),
		code:$('.code'),
		psw:$('.psw'),
		conpsw:$('.conpsw'),
		sub:$('.reg-sub input'),
		agree:$('.agree'),
		reg0:/^1[3|4|5|7|8]\d{9}$/,
		reg1:/^\d{6}$/,
		reg2:/^\w{6,16}$/,
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
				if( !that.reg0.test( $.trim(that.mobile.val())) ){
					that.errorInfo.eq(0).show();
					return;
				};
				if( !that.reg1.test( $.trim(that.code.val())) ){
					that.errorInfo.eq(1).show();
					return;
				};
				if( !that.reg2.test( $.trim(that.psw.val())) ){
					that.errorInfo.eq(2).show();
					return;
				};
				if( $.trim( that.psw.val() ) != $.trim( that.conpsw.val() ) ){
					that.errorInfo.eq(3).show();
					return;
				};
				if( !that.agree.prop('checked') ){
					alert('请同意条款！');
					return;
				}
				alert('注册成功');
			});
		}
	};
	
	register.init();
});
