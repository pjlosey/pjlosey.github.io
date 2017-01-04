app.controller('racersProfileCtrl', function($rootScope, $scope, $timeout, $routeParams) {

	$scope.racerId = $routeParams.racerId;
	
	//--------------- User Firebase Data ----------------------//
		var ref = firebase.database().ref('users');//' + $scope.user.id);
		ref.orderByChild("userName")
	   .equalTo($scope.racerId)
	   .on("value", function(snapshot) {
		   $timeout(function() {
			  $scope.racer = snapshot.val();
			  $scope.$apply();
			  //console.log(snapshot.val());
		   });
		});

});