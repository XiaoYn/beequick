angular.module("sunckAXF.marketPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "market",
				url: "/market",
				css: "app/pages/market/market.css",
				templateUrl: "app/pages/market/market.html",
				controller: "marketController",
				params: {
					ids: 104749,
				},
			});
	}).controller("marketController", function($scope, $http, $timeout, $stateParams){
		$http.get("../json/market.json").then(function(result){
			//左边列表
			$scope.leftNav = result.data.data["categories"];
			
			$scope.shop = result.data.data.products[$stateParams.ids];
			$scope.sun = $stateParams.ids;
			
			//右列表全部分类	
			
			//获取商品信息
			$scope.getShopFn = function(str){
				$scope.shop = result.data.data["products"][str];
				$scope.sun = str;
				
			}
			if ($stateParams.ids == 100001){
				return $scope.getShopFn(104749);
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
//				console.log(tempObj);
				var locationDataStr = localStorage.getItem("cartData");
				var locationDataObj;
//				console.log(locationDataStr);
				if(!locationDataStr){
					locationDataObj = {};
				}else{
					locationDataObj = JSON.parse(locationDataStr);
				}
//				console.log(locationDataObj);
				
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
				if(event.target.parentNode.children[1].innerHTML>0){
					event.target.parentNode.children[0].style.display = "block";
				}
			}
			
			//点击减号减少
			$scope.cutShop = function(n, event){
				var locationDataStr = localStorage.getItem("cartData");
				var locationDataObj = JSON.parse(locationDataStr);
				var tempData = locationDataObj[n.id];
				tempData["num"] -= 1;
				localStorage.setItem("cartData", JSON.stringify(locationDataObj)); 
				
				event.target.parentNode.children[1].innerHTML = tempData["num"];
				if(event.target.parentNode.children[1].innerHTML<=0){
					event.target.parentNode.children[1].innerHTML = "";
					event.target.parentNode.children[0].style.display = "none";
					delete locationDataObj[n.id];
				}
			}
			
			
			
		});
	});

	
