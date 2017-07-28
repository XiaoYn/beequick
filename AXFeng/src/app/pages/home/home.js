angular.module("sunckAXF.homePage", [])
	.config(function($stateProvider, $urlRouterProvider) {
		$stateProvider
			.state({
				name: "home",
				url: "/home",
				templateUrl: "app/pages/home/home.html",
				css: "app/pages/home/home.css",
				controller: "homeController"
			})
	})


//控制器的位置
	.controller("homeController", function($scope, $timeout,$http) {
         $http.get("../data/a.json")
		.then(function(result){
			console.log(result);
   			$scope.names = result["data"]["data"]["act_info"][0]["act_rows"];
   			$scope.navs = result["data"]["data"]["act_info"][1]["act_rows"];
   			$scope.navs2 = result["data"]["data"]["act_info"][3]["act_rows"];
   			$scope.Shop1 = result["data"]["data"]["act_info"][4]["act_rows"][0]["act_rows"][0]["chead_detail"]["img"];
   			$scope.Shop2 = result["data"]["data"]["act_info"][4]["act_rows"][1]["act_rows"][0]["cactivity_detail"]["img"];
   			$scope.Shop3 = result["data"]["data"]["act_info"][4]["act_rows"][1]["act_rows"][1]["cactivity_detail"]["img"];
   			$scope.Shop4 = result["data"]["data"]["act_info"][4]["act_rows"][2]["act_rows"];
   			$scope.Shop5 = result["data"]["data"]["act_info"][4]["act_rows"][3]["act_rows"];
   			$scope.main = result["data"]["data"]["act_info"][5]["act_rows"];
	    	$timeout(function(){
	    		swiper();
	    	},100);
	    	function swiper(){
	    		var swiper1 = new Swiper ('.swiper-container1', {
		            loop: true,
		            autoplay:3000,
		            pagination: '.swiper-p1',
	  			})        
			}
			$timeout(function(){
	    		swiper2();
	    	},100);
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
  		});
    })
	function swiper2() {
	    var swiper2 = new Swiper('.swiper-container2', {
	        slidesPerView:3,
	        autoHeight:true,
	        // paginationClickable: true,
	        spaceBetween: 50,
	    });
	}
