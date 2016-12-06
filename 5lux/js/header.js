$(function(){
	//顶部弹窗的
	$('#modal img').click(function(){
		$('#modal-bg').show();
		$('#modal .modal-content').show();
	});
	$('#modal .modal-close').click(function(){
		$('#modal-bg').hide();
		$('#modal .modal-content').hide();
	});
	
	//购物袋弹窗的
	$('#info-mid .package-title').hover(function(){
		$(this).css('border-bottom-color','#fff');
		$('#info-mid .package-content').slideDown(100);
	},function(){
		$(this).css('border-bottom-color','#ccc');
		$('#info-mid .package-content').hide();
	});
	
	
	//导航界面
	$('#nav .nav-wrapper .nav-item').click(function(){
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	});
	//导航右侧滑动效果
	$('#nav .icon-item').hover(function(){
		$(this).stop(true).animate({
			width: 150
		},500);
	},function(){
		$(this).stop(true).animate({
			width: 30
		},500);
	});
	
	//导航菜单界面
	$('#nav .nav-wrapper .nav-item').first().hover(function(){
		$('#nav .nav-menu').show();
		$('#bg').show();
	},function(){
		$('#nav .nav-menu').hide();
		$('#bg').hide();
	});
	$('#nav .menu-item').hover(function(){
		$('#nav .nav-menu').show();
		$('#bg').show();
		$(this).addClass('current');
		$(this).siblings().removeClass('current');
		$(this).find('.menu-left a').css('color','#c69c6d');
	},function(){		
		$('#nav .nav-menu').hide();
		$('#bg').hide();
		$(this).removeClass('current');
		$(this).find('.menu-left a').css('color','#333');
	});
	$('#nav .menu-item').each(function(k,v){
		$(this).find('.menu-left').css({
			'background-position-y':-k*33+k-1
		});
	});
});
