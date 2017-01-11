app.controller('loginCtrl', function($scope, $timeout, $location, userService) {
	
	/*
	$scope.userLogin = function() {
		firebase.auth().signInWithEmailAndPassword($scope.loginForm.email, $scope.loginForm.password).then(function() {
			$scope.alerts("userLoggedIn","You have logged in.");
		},function(error) {
			$scope.alerts(error.code,error.message);
		});	
	}
	*/
		
	$scope.userLogin = function() {
		userService.login($scope.loginForm.email, $scope.loginForm.password);
	}

	$scope.userLogout = function() {
		userService.logout();
	}	
	
	$scope.alerts = function(code=null, message=null) {
	  $scope.alertCode = code;
	  $scope.alertMessage = message;
	  $scope.$apply(); // used to update the scope data after onAuthStateChanged changes.				  
	}
	
	//----------- Logged In State Settings ---------------------//
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		$scope.userId = firebase.auth().currentUser.uid;
		//$scope.userGet();
		$scope.$apply(); // used to update the scope data after onAuthStateChanged changes.
		$location.path('/');
	  } else {
		$scope.userId = "";
		$scope.user = {};
		$scope.$apply(); // used to update the scope data after onAuthStateChanged c`hanges.
	  }
	});
		
});