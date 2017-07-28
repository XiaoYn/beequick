angular.module("sunckAXF.detailsPage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name:"details",
				url:"/details",
				templateUrl:"app/pages/details/details.html",
				css: "app/pages/details/details.css",
				params:{
					num:0,
					flag:0,
				},
				controller:"detailsController",
			})
	})
	.controller("detailsController", function($scope,$http,$stateParams) {
		$scope.details = $stateParams.num;
		$scope.flagNum = $stateParams.flag;
		
		
		var locationDataStr = localStorage.getItem("cartData");
    	var locationData;
    	if (!locationDataStr) {			//locationDataStr == null
    		locationData = {};
    	}else{
    		locationData = JSON.parse(locationDataStr);
    	}
    	for (var i in locationData) {
    		if (i == $scope.details.id) {
    			$(".detailsNum").html(locationData[$scope.details.id].num);
    			console.log(1)
    		}else{
    			$(".detailsNum").html(0);
    		}
    	};
		$scope.addShop = function (n,event) {
			var tempObj = {
	    		id:n["id"],
	    		name:n["name"],
	    		price:n["price"],
	    		num:1,
	    		img:n["img"],
	    	}
	    	locationDataStr = localStorage.getItem("cartData");
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
	    	if (event.target.parentNode.children[1].innerHTML > 0) {
	    		event.target.parentNode.children[0].style.display = "inline-block";
	    		event.target.parentNode.children[1].style.display = "inline-block";
	    	}
	    };
	    $scope.cutShop = function (n,event) {
	    	var locationDataStr = localStorage.getItem("cartData");
	    	var locationData= JSON.parse(locationDataStr);
	    	var tempData = locationData[n.id];
	    	tempData["num"] = tempData["num"] - 1;
			event.target.parentNode.children[1].innerHTML = parseInt(event.target.parentNode.children[1].innerHTML) - 1;
	    	if (event.target.parentNode.children[1].innerHTML <= 0) {
	    		event.target.parentNode.children[0].style.display = "none";
	    		event.target.parentNode.children[1].style.display = "none";
	    		delete locationData[n.id];
	    	}
	    	console.log(event.target.parentNode.children[1].innerHTML)
	    	localStorage.setItem("cartData",JSON.stringify(locationData))
	    };
    })