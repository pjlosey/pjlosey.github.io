<script>
var app = angular.module("sampleApp", ["firebase"]);

app.factory("chatMessages", ["$firebaseArray",
  function($firebaseArray) {
    var ref = firebase.database().ref('cars');
    return $firebaseArray(ref);
  }
]);

app.controller("ChatCtrl", ["$scope", "chatMessages",
  function($scope, chatMessages) {
    $scope.user = "Guest " + Math.round(Math.random() * 100);
    $scope.messages = chatMessages;
    $scope.addMessage = function() {
      // $add on a synchronized array is like Array.push() except it saves to the database!
      $scope.messages.$add({
        year: $scope.year,
        make: $scope.make,
        model: $scope.model,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      $scope.year = "";
    };

    // if the messages are empty, add something for fun!
    $scope.messages.$loaded(function() {
      if ($scope.messages.length === 0) {
        $scope.messages.$add({
          year: "1957",
          make: "Imaginary",
          model: "Tester",
          timestamp: firebase.database.ServerValue.TIMESTAMP
        });
      }
    });
  }
]);
</script>
