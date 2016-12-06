$(function(){
	//加载header内容
	$('#header').load('header.html',function(){
		$.getScript('js/header.js');
	});

	//banner的实现
	var banner = {
		main:$('#banner'),
		imgWrapper:$('.img-wrapper'),
		imgs:$(".img-wrapper img"),
		arrowL:$('.arrow-left'),
		arrowR:$('.arrow-right'),
		circleWrap:$('.circle-wrapper'),
		width:0,
		index:0,
		timer:'',
		init:function(){
			this.create();
			this.width = $('body').width();
			this.imgs.width(this.width);
			this.imgs.show();
			this.add();
			this.autoplay();
			this.toLeft();
			this.toRight();
			this.hover();
			this.toCircle();
		},
		//创建小圆点对象
		create:function(){
			var circleStr = '';
			for(var i=0; i<this.imgs.length; i++){
				circleStr += '<span class="circle-item"></span>';
			}
			this.circleWrap.html( circleStr );
			this.circleWrap.find('.circle-item').eq(0).addClass('active');
		},
		//点击小圆点切换图像
		toCircle:function(){
			var that=this;
			this.circleWrap.find('.circle-item').hover(function(){
				that.index = $(this).index();
				that.imgSwitch();
			})
		},
		//在图片最后添加一张图片，实现无缝
		add:function(){
			var first = this.imgs[0].cloneNode(true);
			this.imgWrapper.append(first);
		},
		//鼠标悬停事件
		hover:function(){
			var that=this;
			this.main.hover(function(){
				clearInterval(timer);
			},function(){
				that.autoplay();
			});			
		},
		//左键
		toLeft:function(){
			var that = this;
			this.arrowL.click(function(){
				that.index--;
				that.imgSwitch();
			})
		},
		//右键
		toRight:function(){
			var that = this;
			this.arrowR.click(function(){
				that.index++;
				that.imgSwitch();
			})
		},
		//自动滚动的实现
		autoplay:function(){
			var that=this;
			timer = setInterval(function(){
				that.index++;
				that.imgSwitch();
			},2000)
		},
		//切图方法的封装
		imgSwitch:function(){
			var that=this;
			if(that.index>that.imgs.length){
				that.imgWrapper.css({
					marginLeft:0
				});
				that.index=1;
			};
			if(that.index<=-1){
				that.imgWrapper.css({
					marginLeft: -that.imgs.length*that.width
				})
				that.index=that.imgs.length-1;
			}
			/*that.index%=that.imgs.length;*/
			if(that.index == that.imgs.length){
				that.circleWrap.find('.circle-item').eq(0).addClass('active').siblings().removeClass('active');
			}else{
				that.circleWrap.find('.circle-item').eq(that.index).addClass('active').siblings().removeClass('active');
			}
		
			that.imgWrapper.stop(true).animate({
				marginLeft:-that.index*that.width
			},500)
		}
	}
	banner.init();
	
	//品牌旗舰栏滑梯效果
	$('.brand-box .brand-item').hover(function(){
		$(this).find('.item-box').stop(true).animate({
			bottom: 0
		},200);
	},function(){
		$(this).find('.item-box').stop(true).animate({
			bottom: -100
		},200);
	});
	
	//热门旗舰店轮播效果
	var hotleft = parseInt($('.hot-wrapper .hots').css('margin-left'));
	var hotwidth = parseInt($('.hot-wrapper').css('width'));
	$('.hot-title .hot-left').click(function(){
		if( hotleft >0){
			return;
		}else{			
			$('.hot-wrapper .hots').stop(true).animate({
				'margin-left': 0
			},500);
		}
	});
	$('.hot-title .hot-right').click(function(){
		if( hotleft <= -hotwidth){
			return;
		}else{
			$('.hot-wrapper .hots').stop(true).animate({
				'margin-left': -1210
			},500);
		}
	});
	//幽灵效果js
	$('.hot-wrapper .item-content').hover(function(){
		$(this).find('.item-pic').stop(true).fadeOut(200);
		$(this).find('.item-word').stop(true).fadeIn(200);
	},function(){
		$(this).find('.item-word').stop(true).fadeOut(200);
		$(this).find('.item-pic').stop(true).fadeIn(200);
	});
	
	//商场同款展示
	$('.same-box .title-item').hover(function(){
		$(this).addClass('active').siblings().removeClass('active');
		var index = $(this).index();		
		$('.same-box .same-content').stop(true).animate({
			'margin-left': - index*1210
		},200);
	});
	$('.same-item .info-pic').hover(function(){
		$(this).find('.same-info').stop(true).animate({
			'left':-20
		},300);
		$(this).find('.same-pic').stop(true).animate({
			'left':20
		},300);
	},function(){
		$(this).find('.same-info').stop(true).animate({
			'left':0
		},300);
		$(this).find('.same-pic').stop(true).animate({
			'left':0
		},300);
	});
	
	//购物中心
	$('.shop-box .shop-title-item').hover(function(){
		$(this).find('.shop-position').stop(true).animate({
			'margin-top': -50
		},200);
	},function(){
		$(this).find('.shop-position').stop(true).animate({
			'margin-top': 0
		},200);
	});
	
	//使用load加载重复楼层
	$('#main .floor').each(function(){
		$(this).load('bags.html',function(){
			var banner = new Banner($(this));
			banner.init();
		})
	})
	
	//推广活动底部幽灵效果
	$('.promo-bottom .promo-wrapper').hover(function(){
		var index = $(this).index();
		$('.promo-big img').eq(index).addClass('show-pic').siblings().removeClass('show-pic');
	});
	
	//加载foot
	$('#footer').load('footer.html');
});
