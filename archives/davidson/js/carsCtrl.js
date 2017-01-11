app.factory("cars", ["$firebaseArray",
  function($firebaseArray) {
    var ref = firebase.database().ref('cars');
    return $firebaseArray(ref);
  }
]);

app.factory("car", ["$firebaseArray",
  function($firebaseArray) {
    var ref = firebase.database().ref('cars/-K_p6LAJ6r1NUPmDttIP');
    return $firebaseArray(ref);
  }
]);

app.controller('racersCtrl', ["$scope", "cars", "car",
	function($scope, chatMessages, car) {
    console.log(car);
    $scope.orderBy = "make"; //Sets the OrderBy Filter Default.
	//--------------- User Firebase Data ----------------------//
    $scope.users = chatMessages;
    $scope.addCar = function() {
      // $add on a synchronized array is like Array.push() except it saves to the database!
      $scope.users.$add({
        year: $scope.year,
        make: $scope.make,
        model: $scope.model,
        trim: $scope.trim,
        vin: $scope.vin,
        miles: $scope.miles,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      // use to clear input box $scope.year = "";
    };
  }
]);
