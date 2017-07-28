angular.module("sunckAXF.marketPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "market",
				url: "/market",
				css: "app/pages/market/market.css",
				templateUrl: "app/pages/market/market.html",
				params:{
					num:104749,
					num1:null,
				},
				controller: "marketController"
			})
			
	})
	.controller("marketController", function($scope,$http,$stateParams) {
        $http.get("../data/b.json")
		.then(function(result){ 
			var lists = result["data"]["data"]["products"][$stateParams.num];
			$scope.marketNames = result["data"]["data"]["categories"];
			$scope.marketList = result["data"]["data"]["products"];
			$scope.index1 = $stateParams.num;
			var nodesArr = [];


			$scope.toProducer = function (index,event) {
				$scope.marketLists = result["data"]["data"]["products"][index];
		    	event.target.parentNode.style.borderLeft = "2px solid red";
		    	event.target.parentNode.style.background = "white";
		    	console.log(index)
		    };
		    var listss = lists;
			$scope.byCom = function () {
				listss = lists;
			}
			
			$scope.marketLists = listss;
			$scope.sum = 0;
			$scope.addShop = function (n,event) {
				var tempObj = {
		    		id:n["id"],
		    		name:n["name"],
		    		price:n["price"],
		    		num:1,
		    		img:n["img"],
		    	}
		    	var locationDataStr = localStorage.getItem("cartData");
		    	var locationData;
		    	if (!locationDataStr) {			//locationDataStr == null
		    		locationData = {}
		    	}else{
		    		locationData = JSON.parse(locationDataStr);
		    	}
		    	var tempData = locationData[n.id];
		    	if (!tempData) {
		    		//如果不存在这条数据的时候
		    		locationData[n.id]=tempObj;
		    	}else{
		    		tempData["num"] = tempData["num"] + 1;
		    	}
		    	localStorage.setItem("cartData",JSON.stringify(locationData));
				event.target.parentNode.children[1].innerHTML = locationData[n.id]["num"];
		    	if (event.target.parentNode.children[1].innerHTML != 0) {
		    		event.target.parentNode.children[0].style.display = "inline-block";
		    		event.target.parentNode.children[1].style.display = "inline-block";
		    		// $scope.show=function(value){
		    		// 	return true
		    		// };
		    	}
		    	console.log(event.target)
		    };
		    $scope.cutShop = function (n,event) {
		    	var locationDataStr = localStorage.getItem("cartData");
		    	var locationData= JSON.parse(locationDataStr);
		    	var tempData = locationData[n.id];
		    	// console.log(locationData(n.id))
		    	tempData["num"] = tempData["num"] - 1;
				event.target.parentNode.children[1].innerHTML = parseInt(event.target.parentNode.children[1].innerHTML) - 1;
		    	if (event.target.parentNode.children[1].innerHTML == 0) {
		    		event.target.parentNode.children[0].style.display = "none";
		    		event.target.parentNode.children[1].style.display = "none";
		    		delete locationData[n.id];
		    		// $scope.show=function(value){
		    		// 	return false
		    		// };
		    	}
		    	localStorage.setItem("cartData",JSON.stringify(locationData))
		    };
  		});
    });