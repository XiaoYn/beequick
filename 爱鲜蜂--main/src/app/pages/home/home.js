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
	.controller("homeController", function($scope, $http, $timeout) {
		$http.get("../json/home.json")
			.then(function(result) {
				//轮播的数据
				$scope.slide = result.data.data["act_info"][0]["act_rows"];
				$timeout(function(){
					swiper();
				}, 100);
				
				
				//导航数据
				$scope.nav = result.data.data["act_info"][1]["act_rows"];
				//列表1
				$scope.nav2 = result.data.data["act_info"][3]["act_rows"];
				
				//闪送 
				$scope.pic = result.data.data["act_info"][4]["act_rows"][0]["act_rows"][0]["chead_detail"]["img"];
				
				//列表2-pic1
				$scope.nav3 = result.data.data["act_info"][4]["act_rows"][1]["act_rows"];
				//列表2-pic2
				$scope.nav4 = result.data.data["act_info"][4]["act_rows"][2]["act_rows"];
				//列表2-pic3
				$scope.nav5 = result.data.data["act_info"][4]["act_rows"][3]["act_rows"];
				
				//优选区
				$scope.all = result.data.data["act_info"][5]["act_rows"];
				
				//点击添加购物车
				$scope.appendShop = function(n, event){
					console.log(n);
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
				}	
			})
			.catch(function(result) {
				console.log("loser");
		});
	});

function swiper() {
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'horizontal',
		loop: true,
		speed: 1000,
		autoplay: 2000,
		pagination: '.swiper-pagination',
	});
}