angular.module("sunckAXF", ["ui.router", "angularCSS",
		"sunckAXF.homePage",
		"sunckAXF.marketPage",
		"sunckAXF.cartPage",
		"sunckAXF.minePage",
		"sunckAXF.detailedPage",
	])
	.config(function($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise("/home");
	})
/*	.factory('shopCar',function(){
		return{
			car:{},
			carFn:function(obj,type){
				if(!this.car[obj.id]){
					obj._num = 1;
					this.car[obj.id] = obj;
				}else{
					this.car[obj.id]._num++
				}
			}
		}
	})*/
