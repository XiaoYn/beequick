angular.module("sunckAXF.cartPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "cart",
				url: "/cart",
				templateUrl: "app/pages/cart/cart.html",
				css: "app/pages/cart/cart.css",
				controller: "cartController",
			});
	})
	.controller("cartController", function($scope){
		//读取存储的数据
		var locationDataStr = localStorage.getItem("cartData");
		
		//将数据转换为对象
		var locationDataObj = JSON.parse(locationDataStr);
		
		$scope.cartShopsList = locationDataObj;
		console.log($scope.cartShopsList);
		
		//计算总价格
		$scope.allPrice = 0;
		var priArr = [];
		var numArr = [];
		for(var i in locationDataObj){
			//所有的价格 = 单价乘以数量，相加
		    priArr.push(locationDataObj[i]["price"]*locationDataObj[i]["num"]);
		    numArr.push(locationDataObj[i]["num"]);
		    
//		    console.log(i);
//		    console.log(numArr); 
		} 
		$scope.allPrice = Math.floor(eval(priArr.join("+"))*100)/100;
		$scope.allNum = parseInt(eval(numArr.join("+")));
		
		//购物车为空时切换页面
		if(!$scope.allNum){
			$scope.flag = true;
		}else{
			$scope.flag = false;
		}
		
		//点击添加购物车
		
		//点击加号添加
		$scope.appendShop = function(n, event){
			var tempObj = {
				name: n["name"],
				id: n["id"],
				img: n["img"],
				price: n["price"],
				num: 1,
			}
//			console.log(tempObj);
			var locationDataStr = localStorage.getItem("cartData");
			var locationDataObj;
//			console.log(locationDataStr);
			if(!locationDataStr){
				locationDataObj = {};
			}else{
				locationDataObj = JSON.parse(locationDataStr);
			}
//			console.log(locationDataObj);
				
			var tempData = locationDataObj[n.id];
			if(!tempData){
				//如果没有这条数据
				locationDataObj[n.id] = tempObj;
			}else{
				//如果有这条数据
				tempData["num"] += 1;
			}
				
			localStorage.setItem("cartData", JSON.stringify(locationDataObj));
			event.target.parentNode.children[1].innerHTML = locationDataObj[n.id]["num"];
//			if(event.target.parentNode.children[1].innerHTML>0){
//				event.target.parentNode.children[0].style.display = "block";
//			}
			
			priArr = [];
			numArr = [];
			for(var i in locationDataObj){
				//所有的价格 = 单价乘以数量，相加
			    priArr.push(locationDataObj[i]["price"]*locationDataObj[i]["num"]);
			    numArr.push(locationDataObj[i]["num"]);
			    
//			    console.log(i);
//			    console.log(numArr); 
			} 
			$scope.allPrice = Math.floor(eval(priArr.join("+"))*100)/100;
			$scope.allNum = parseInt(eval(numArr.join("+")));

		}
		
		//点击减号减少
		$scope.cutShop = function(n, event){
			var locationDataStr = localStorage.getItem("cartData");
			var locationDataObj = JSON.parse(locationDataStr);
			var tempData = locationDataObj[n.id];
			tempData["num"] -= 1;
			
				
			event.target.parentNode.children[1].innerHTML = tempData["num"];
			//数量小于等于0，移除节点
			if(event.target.parentNode.children[1].innerHTML<=0){
				event.target.parentNode.children[1].innerHTML = "0";
				delete locationDataObj[n.id];
				event.target.parentNode.parentNode.remove()
			}
			localStorage.setItem("cartData", JSON.stringify(locationDataObj));
//			console.log(locationDataObj);
//			getLocal($scope);

			priArr = [];
			numArr = [];
			for(var i in locationDataObj){
				//所有的价格 = 单价乘以数量，相加
			    priArr.push(locationDataObj[i]["price"]*locationDataObj[i]["num"]);
			    numArr.push(locationDataObj[i]["num"]);
			    
//			    console.log(i);
//			    console.log(numArr); 
			} 
			$scope.allPrice = Math.floor(eval(priArr.join("+"))*100)/100;
			$scope.allNum = parseInt(eval(numArr.join("+")));
			
			//购物车为空时切换页面
			if(!$scope.allNum){
				$scope.flag = true;
			}else{
				$scope.flag = false;
			}
		}
			
	});