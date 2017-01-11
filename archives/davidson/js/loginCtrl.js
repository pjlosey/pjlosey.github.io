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
	$scope.userRegister = function() {
		firebase.auth().createUserWithEmailAndPassword($scope.registerForm.email, $scope.registerForm.password)
		.then(function() {
			$scope.userId = firebase.auth().currentUser.uid;
			$scope.alerts("userRegistered", "You have succesfully Registered");
			  firebase.database().ref('users/'+$scope.userId).set({
				//username: $scope.loginForm.username,
				displayName: $scope.registerForm.displayName,
				userName: $scope.registerForm.displayName.replace(/ /g,"").toLowerCase(),
				email: $scope.registerForm.email,
				registered: Date.now()
			  })
		},function(error) {
			$scope.alerts(error.code,error.message);
		});	
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
		$scope.$apply(); // used to update the scope data after onAuthStateChanged changes.
	  }
	});
		
});