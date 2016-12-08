CloudZoom.quickStart();
$(function(){


	//加载header内容
	$('#header').load('header.html',function(){
		$.getScript('js/header.js');
	});	
	//加载右侧边栏	
	$('#sidebar').load('right.html',function(){
		$.getScript('js/right.js');
	});
	//加载foot
	$('#footer').load('footer.html');
	
	//放大镜特效框架
    $('#gdg_silder').Thumbelina({
        $bwdBut:$('#gdg_silder .jcarousel-prev'), 
        $fwdBut:$('#gdg_silder .jcarousel-next')
    });
    
    //详情页模态
    $('.info-box .info-price a').click(function(){
		$('#modal-bg').show();
		$('#modal .modal-content').show();
	});
	$('#modal .modal-close').click(function(){
		$('#modal-bg').hide();
		$('#modal .modal-content').hide();
	});
    //详情页会员价特效
	$('.info-box .info-package').hover(function(){
		$(this).find('.package-title').css({
			'border-color':'#ccc',
			'border-bottom-color':'#fff'
		});
		$('.info-box .package-content').slideDown(100);
	},function(){
		$(this).find('.package-title').css('border-color','#fff');
		$('.info-box .package-content').hide();
	});
	
	//商品详情页js
	var detail = {
		init: function(){
			this.main = $('#gdetail');
			this.sizeCon = this.main.find('.size-content');
			this.amountInput = this.main.find('.amount-input');
			//增加数量按钮
			this.amountInc = this.main.find('.amount-increase');
			//减少数量按钮
			this.amountDec = this.main.find('.amount-decrease');
			//库存
			this.stock = 5;
			
			this.data = {};
			
			var gid = this.main.attr('data-gid');
			var that = this;
			$.getJSON('js/data.json',function(result){
				that.data = result[gid];
				
				//填充尺寸
				that.createSize();
				//点击尺寸事件
				that.sizeClick();
				//增加
				that.increase();
				//减少
				that.decrease();
				//直接输入
				that.input();

				//加入购物车
				that.addCart();
			});
		},
		createSize: function(){
			var size = this.data.size;
			//遍历所有的尺寸，拼接字符串     data-size 自定义属性
			var sizeStr = '';
			for(var key in size){
				sizeStr += '<li class="lux-con-item" data-size="'+key+'">'
						+		'<a href="javascript:;">'+size[key]+'</a>'
						+	'</li>';
			}
			this.sizeCon.html(sizeStr);
			//给第一个尺寸添加选中状态  children() 子元素
			this.sizeCon.children().eq(0).addClass('selected');
		},
		//点击尺寸
		sizeClick: function(){
			//利用事件委托给子元素添加事件
			this.sizeCon.on('click','li',function(){
				$(this).addClass('selected').siblings().removeClass('selected');
			});
		},
		//数量增加点击
		increase: function(){
			var that = this;
			this.amountInc.click(function(){
				var amount = parseInt( that.amountInput.val() );
				var stock = that.stock;
				//判断是否超出库存
				if(amount >= stock){
					return;
				}
				//数量++
				amount++;
				that.amountInput.val(amount);
			});
		},
		//减少
		decrease: function(){
			var that = this;
			this.amountDec.click(function(){
				var amount = parseInt( that.amountInput.val() );
				//判断是否越界
				if(amount <= 1){
					return;
				}
				//数量--
				amount--;
				that.amountInput.val(amount);
			});
		},
		//直接输入
		input: function(){
			var that = this;
			this.amountInput.on('input',function(){
				var amount = that.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					return;
				}
				amount = parseInt( amount );  // 12 12w=>12  fds=>NaN
				
				var stock = that.stock;
				
				//判断是不是NaN或者是不是0
				if( isNaN(amount) || amount == 0 ){
					that.amountInput.val(1);
					return;
				}
				
				//判断是否越界 
				if(amount >= stock){ 
					that.amountInput.val(stock);
					return;
				}
				that.amountInput.val(amount);
			});
			//失去焦点判断是不是空 =》 1
			this.amountInput.blur(function(){
				var amount = that.amountInput.val();
				//如果是空，不做处理
				if(amount == ''){
					that.amountInput.val(1);
				}
			});
		},
		//加入购物车
		addCart: function(){
			var that = this;
			//【加入购物车】按钮点击
			this.main.find('.option-addCart').click(function(){
				//data() 获取以data-开的自定义属性的值
				var gid = that.main.data('gid');
				//sizeId
				var sizeId = that.sizeCon.find('.selected').data('size');
				var amount = parseInt( that.amountInput.val() );
				
				//cookie在哪？ $.cookie()
				var cart = $.cookie('lux_cart')  || '{}';
				cart = JSON.parse( cart );
				//判断购物车是否已经存在当前商品
				if(!cart[sizeId]){
					cart[sizeId] = {
						"goods-id": gid,
						"size-id": sizeId,
						"amount": amount
					};
				}else{
					cart[sizeId].amount += amount;
				}

				//重新写到cookie中
				$.cookie('lux_cart',JSON.stringify(cart),{expires:365,path: '/'});

				alert('添加成功');

				console.log( JSON.parse( $.cookie('lux_cart') ) );
			});
		}
	};
	detail.init();

});
