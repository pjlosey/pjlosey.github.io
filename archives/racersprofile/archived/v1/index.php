<script src="https://www.gstatic.com/firebasejs/3.6.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.6.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.6.1/firebase-database.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.6.1/firebase-messaging.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.6.1/firebase-storage.js"></script>
<script src="https://www.gstatic.com/firebasejs/3.6.2/firebase.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.4.8/angular-route.js"></script>

<script>
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDIMNDCxNiY6LbIPhiQfYLhw2YylEBzxic",
    authDomain: "racersprofile-4a3fe.firebaseapp.com",
    databaseURL: "https://racersprofile-4a3fe.firebaseio.com",
    storageBucket: "racersprofile-4a3fe.appspot.com",
    messagingSenderId: "892729879993"
  };
  firebase.initializeApp(config);
  var storage = firebase.storage();
</script>

<body ng-app="myApp">

<a href="#/">Main</a>
<a href="#/users">UserLogin</a>
<hr>

<div ng-view></div>

</body>

<script>
//var app = angular.module('myApp', []);
var app = angular.module("myApp", ["ngRoute"]);
app.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "views/main.html"
    })
    .when("/users", {
        templateUrl : "views/users.html"
    });
});

</script>
<script src="js/main.js"></script>
<script src="js/users.js"></script>