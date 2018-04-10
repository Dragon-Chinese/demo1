$(function () {
	var one = $('#s_brand_id'), //	.analog-select-con   隐藏的父元素
		two = $('#s_serie_id'),
		textP = $('.analog-select-text'); // 显示文字的P标签


	//	一级菜单渲染
	var arr = [],
		brr = [];
	$.each(data, function (k, n) {
		arr.push('<h2>' + k + '</h2>');
		$.each(n, function (key, val) {
			arr.push('<p>' + val.brand + '</p>')
			brr.push(val)
				//	创建brr 是把这里面的所有的车系挑选出来。
				//	渲染二级菜单的时候，直接遍历brr 不用再次循环json了
		})
	})
	one.append(arr.join(' '))


	//	点击改变箭头，并显示相应的 “option”
	//@important   如果还没有渲染二级菜单，点击二级菜单也会添加样式 非bug
	//@important   如果还没有渲染二级菜单，点击二级菜单也会添加样式 非bug
	//@important   如果还没有渲染二级菜单，点击二级菜单也会添加样式 非bug
	$('.analog-select').on('click', function (e) {
		//	因为只有两个元素，所以直接写死的参数了
		$(this).index() == 0 ? s_h(0, 1) : s_h(1, 0)
	})

	
	//	点击品牌里面的p  会渲染相应的车系  同时改变显示文字
	one.on('click', 'p', function () {
		for (var i = 0; i < brr.length; i++) {
			if (brr[i].brand == $(this).html()) {
				//	渲染二级菜单
				var arr = [];
				$(brr[i].types).each(function () {
					arr.push('<p>' + this.name + '</p>')
				})
				two[0].innerHTML = arr.join(' ');
			}
		}
		showText(0, this.innerHTML);
	})

	//	点击车系里面的p  改变显示的文字
	two.on('click', 'p', function () {
		showText(1, this.innerHTML)
	})


	//	在25行调用的该方法：如果点的是第一个  第一个添加样式的同时，会把第二个样式清除
	function s_h(i, n) {
		//	因为是点击自身  也会清除该样式，只能用toggle  只能先toggle 在清除其他元素样式
		$('.analog-select').eq(i).toggleClass('analog-select-focus').addBack().eq(n).removeClass('analog-select-focus');
		$('.analog-select-con').eq(i).toggle().addBack().eq(n).hide()
	}

	
	//	如果n=0 点击的就是第一个，就把第二个显示文字初始为‘车系’
	function showText(n, val) {
		textP.eq(n).html(val);
		n==0 ? textP.eq(1).html('车系') : false;
	}
	
	//如果第二个p文字不是 车系，点击选车 跳转新页面 
	
	$('#search_serie').on('click',function(){
		if(textP.eq(1).text()!='车系'){
			location.href='../html/login.html?'+textP.eq(0).text()+'='+textP.eq(1).text()
		}
	})
})