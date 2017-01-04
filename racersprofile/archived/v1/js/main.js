app.controller('mainCtrl', function($scope) {

	//----------- Logged In State Settings ---------------------//
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		$scope.userId = firebase.auth().currentUser.uid;
		//$scope.userGet();
		$scope.$apply(); // used to update the scope data after onAuthStateChanged changes.
	  } else {
		$scope.userId = "";
		$scope.user = {};
		$scope.$apply(); // used to update the scope data after onAuthStateChanged c`hanges.
	  }
	});

});