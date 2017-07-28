angular.module("sunckAXF.cartPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "cart",
				url: "/cart",
				templateUrl: "app/pages/cart/cart.html",
				css: "app/pages/cart/cart.css",
				controller: "cartController",
			})
	})
	.controller("cartController", function($scope){
		var locationDataStr = localStorage.getItem("cartData");
		var locationData = JSON.parse(locationDataStr);
		

		//求和
		var arr = [];
		var arrNum = [];
		for(var i in locationData){
			//价格
			arr.push(locationData[i]["price"]*locationData[i]["num"]);
			//数量
			arrNum.push(locationData[i]["num"])
		}
		//价格求和
		$scope.sumAll =  Math.floor(eval(arr.join('+'))*100)/100;
		//数量求和
		$scope.numAll =  parseInt(eval(arrNum.join('+')));
		if (!$scope.numAll) {
			$scope.cartFlag = true
		}else{
			$scope.cartFlag = false
		}




		$scope.addShop = function (n,event) {
	    	var tempData = locationData[n.id];
	    	tempData["num"] = tempData["num"] + 1;
	    	localStorage.setItem("cartData",JSON.stringify(locationData));
			event.target.parentNode.children[1].innerHTML = locationData[n.id]["num"];
			$scope.sumAll = locationData[n.id].num*locationData[n.id].price;
			//求和
			arr = [];
			arrNum = [];
			for(var i in locationData){
				//价格
				arr.push(locationData[i]["price"]*locationData[i]["num"]);
				//数量
				arrNum.push(locationData[i]["num"])
			}
			//价格求和
			$scope.sumAll =  Math.floor(eval(arr.join('+'))*100)/100;
			//数量求和
			$scope.numAll =  parseInt(eval(arrNum.join('+')));



		};
	    $scope.cutShop = function (n,event) {
	    	var tempData = locationData[n.id];
	    	tempData["num"] = tempData["num"] - 1;
			event.target.parentNode.children[1].innerHTML = parseInt(event.target.parentNode.children[1].innerHTML) - 1;
	    	if (parseInt(event.target.parentNode.children[1].innerHTML) <= 0) {
		    	delete locationData[n.id];
		    	event.target.parentNode.parentNode.parentNode.parentNode.remove();
	    	}
	    	localStorage.setItem("cartData",JSON.stringify(locationData));
	    	//求和
			arr = [];
			arrNum = [];
			for(var i in locationData){
				//价格
				arr.push(locationData[i]["price"]*locationData[i]["num"]);
				//数量
				arrNum.push(locationData[i]["num"])
			}
			//价格求和
			$scope.sumAll =  Math.floor(eval(arr.join('+'))*100)/100;
			//数量求和
			$scope.numAll =  parseInt(eval(arrNum.join('+')));
			if (!$scope.numAll) {
				$scope.cartFlag = true;
				console.log('true');
			}else{
				$scope.cartFlag = false;
				console.log('false');
			}
		};
		$scope.cartShops = locationData;
	})