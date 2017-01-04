app.controller('racersCtrl', function($rootScope, $scope, $timeout, $firebaseArray) {

	//--------------- User Firebase Data ----------------------//
	//$rootScope.userGet = function() {
		var usersRef = firebase.database().ref('users');//' + $scope.user.id);
		usersRef.orderByChild("userName").on('value', function(snapshot) {
			$timeout(function() {
				$scope.racers = snapshot.val();
				$scope.$apply();
			});
		});
	//}
	
	  var ref = firebase.database().ref().child("users");
	  // create a synchronized array
	  $scope.users = $firebaseArray(ref);

});