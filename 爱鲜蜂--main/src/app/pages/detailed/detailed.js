angular.module("sunckAXF.detailedPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "detailed",
				url: "/detailed",
				templateUrl: "app/pages/detailed/detailed.html",
				css: "app/pages/detailed/detailed.css",
				controller: "detailedController",
				params: {
					deta: 0,
					flag: 0,
//					id: 0,
				},
			});
	})
	.controller("detailedController", function($scope, $http, $stateParams) {
		console.log(localStorage.cartData);
//		console.log($stateParams.deta);
//		console.log($stateParams.flag);	
		

		
		$scope.sum = $stateParams.deta;
		$scope.flag = $stateParams.flag;
		
		if(localStorage.cartData){
			$scope.car = JSON.parse(localStorage.cartData);	
		}

//		console.log($scope.sum);
//		console.log($scope.flag);
//		$scope.tid = $stateParams.id;
//		console.log($stateParams.id);

		
		var locationDataStr = localStorage.getItem("cartData");
		var locationDataObj;
		if(!locationDataStr){
			locationDataObj = {};
		}else{
			locationDataObj = JSON.parse(locationDataStr);
		}
		

		for (var i in locationDataObj) {
    		if (i == $scope.sum.id) {
    			
    			$(".number").html(locationDataObj[$scope.sum.id].num);
    			console.log(1)
    		}else{
    			$(".number").html(0);
    		}
    	};

//		if(!locationDataStr){
//			$(".number").html(0);
//		}else{
//			$(".number").html(locationDataObj[$stateParams.deta.id]["num"]);
//			console.log(2);
//		}

		

//		console.log(locationDataObj[$stateParams.deta.id].num);
//		//点击添加购物车
		$scope.appendShop = function(n, event){
			shopCar.carFn(n)
			jQuery(".number").html(n._num);
			locationDataStr = localStorage.getItem("cartData");
			var tempObj = {
				name: n["name"],
				id: n["id"],
				img: n["img"],
				price: n["price"],
				num: 1,
			}
			
//			console.log(tempObj);
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
		}
//			
		$scope.cutShop = function(n, event){
			var locationDataStr = localStorage.getItem("cartData");
			var locationDataObj = JSON.parse(locationDataStr);
			var tempData = locationDataObj[n.id];
			tempData["num"] -= 1;
			localStorage.setItem("cartData", JSON.stringify(locationDataObj)); 
				
			event.target.parentNode.children[1].innerHTML = tempData["num"];
			if(event.target.parentNode.children[1].innerHTML<=0){
				event.target.parentNode.children[1].innerHTML = "0";
				delete locationDataObj[n.id];
			}
		}

	});