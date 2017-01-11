app.controller('headerCtrl', function($scope, $timeout, userService, $location) {

	$scope.userLogout = function() {
		userService.logout();
	}
	
	$scope.userGet = function() {
		var usersRef = firebase.database().ref('users/'+$scope.userId);//' + $scope.user.id);
		usersRef.on('value', function(snapshot) {
			$timeout(function() {
				$scope.user = snapshot.val();
				//$rootScope.user = snapshot.val();
				$scope.user.id = firebase.auth().currentUser.uid;
				$scope.$apply();
			});
		});
	}
	
	//----------- Logged In State Settings ---------------------//
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		$scope.userId = firebase.auth().currentUser.uid;
		$scope.userGet();
		$scope.$apply(); // used to update the scope data after onAuthStateChanged changes.
		//$location.path('/');
	  } else {
		$scope.userId = "";
		$scope.user = {};
		$scope.$apply(); // used to update the scope data after onAuthStateChanged c`hanges.
	  }
	});
	//$scope.userId = firebase.auth().currentUser.uid;
	
});