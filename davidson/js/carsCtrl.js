app.factory("racers", ["$firebaseArray",
  function($firebaseArray) {
    var ref = firebase.database().ref('cars');
    return $firebaseArray(ref);
  }
]);

app.controller('racersCtrl', ["$scope", "racers",
	function($scope, chatMessages) {

	//--------------- User Firebase Data ----------------------//
    $scope.users = chatMessages;
    $scope.addCar = function() {
      // $add on a synchronized array is like Array.push() except it saves to the database!
      $scope.users.$add({
        year: $scope.year,
        make: $scope.make,
        model: $scope.model,
        model: $scope.trim,
        model: $scope.vin,
        model: $scope.miles,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      $scope.year = "";
    };
  }
]);
