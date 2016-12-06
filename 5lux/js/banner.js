//经典箱包的小banner
function Banner(banner){
	this.main = banner.find('.bags-banner'),
	this.imgWrapper = banner.find('.bagsImg-wrapper'),
	this.imgs = banner.find(".bagsImgs"),
	this.arrowL = banner.find('.bags-arrowL'),
	this.arrowR = banner.find('.bags-arrowR'),
	this.circleWrap = banner.find('.bags-circleW'),
	this.width = 220,
	this.index = 0,
	this.timer = ''
}
Banner.prototype = {
	constructor:Banner,
	init:function(){
		this.create();
		this.imgs.width(this.width);
		this.imgs.show();
		this.add();
		this.toLeft();
		this.toRight();
		this.toCircle();
	},
	//创建小圆点对象
	create:function(){
		var circleStr = '';
		for(var i=0; i<3; i++){
			circleStr += '<span class="circle-item"></span>';
		}
		this.circleWrap.html( circleStr );
		this.circleWrap.find('.circle-item').eq(0).addClass('active');
	},
	//点击小圆点切换图像
	toCircle:function(){
		var that=this;
		this.circleWrap.find('.circle-item').click(function(){
			that.index = $(this).index();
			that.imgSwitch();
		})
	},
	//在图片最后添加一张图片，实现无缝
	add:function(){
		var first = this.imgs[0].cloneNode(true);
		this.imgWrapper.append(first);
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
