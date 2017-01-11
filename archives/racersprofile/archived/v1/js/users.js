app.controller('formCtrl', function($rootScope, $scope, $timeout) {
	$scope.user = {};
	
	$scope.userRegister = function() {
		firebase.auth().createUserWithEmailAndPassword($scope.loginForm.email, $scope.loginForm.password)
		.then(function() {
			$scope.userId = firebase.auth().currentUser.uid;
			$scope.alerts("userRegistered", "You have succesfully Registered");
			  firebase.database().ref('users/'+$scope.userId).set({
				//username: $scope.loginForm.username,
				email: $scope.loginForm.email,
				registered: Date.now()
			  })
		},function(error) {
			$scope.alerts(error.code,error.message);
		});	
	}
	
	$scope.userLogin = function() {
		firebase.auth().signInWithEmailAndPassword($scope.loginForm.email, $scope.loginForm.password).then(function() {
			$scope.alerts("userLoggedIn","You have logged in.");
		},function(error) {
			$scope.alerts(error.code,error.message);
		});	
	}
	
	$scope.userEdit = function() {
	  firebase.database().ref('users/'+$scope.userId).update({
		email: $scope.loginForm.email,
		lastUpdated: Date.now()
	  })		
	}

	$scope.userForgotPassword = function() {
		var auth = firebase.auth();
		auth.sendPasswordResetEmail($scope.loginForm.email).then(function() {
		  $scope.alerts("forgotPasswordSent", "Check your email for an email to reset your password.");
		}, function(error) {
		  $scope.alerts(error.code,error.message);
		});
	}
	
	$scope.userDelete = function() {
		var user = firebase.auth().currentUser;
		user.delete().then(function() {
		  $scope.alerts("userDeleted", "You have deleted your account");
		  firebase.database().ref('users/'+$scope.userId).remove(); // Deletes the user from the database
		}, function(error) {
		  $scope.alerts(error.code,error.message);
		});
	}
	
	$scope.userLogout = function() {
		firebase.auth().signOut().then(function() {
		  $scope.alerts("userLoggedOut", "You have logged out.");
		}, function(error) {
		  $scope.alerts(error.code,error.message);
		});
	}
	
	//----------- Logged In State Settings ---------------------//
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		$rootScope.userId = firebase.auth().currentUser.uid;
		$scope.userGet();
		$scope.$apply(); // used to update the scope data after onAuthStateChanged changes.
	  } else {
		$rootScope.userId = "";
		$scope.user = {};
		$scope.$apply(); // used to update the scope data after onAuthStateChanged c`hanges.
	  }
	});
	
	$scope.alerts = function(code=null, message=null) {
	  $scope.alertCode = code;
	  $scope.alertMessage = message;
	  $scope.$apply(); // used to update the scope data after onAuthStateChanged changes.				  
	}	
	
	//--------------- User Firebase Data ----------------------//
	$rootScope.userGet = function() {
		var usersRef = firebase.database().ref('users/'+$scope.userId);//' + $scope.user.id);
		usersRef.on('value', function(snapshot) {
			$timeout(function() {
				$scope.user = snapshot.val();
				$rootScope.user = snapshot.val();
				$scope.user.id = firebase.auth().currentUser.uid;
				$scope.$apply();
			});
		});
	}	
	
	$scope.userEdit = function() {
	  firebase.database().ref('users/'+$scope.userId).update({
		displayName: $scope.user.displayName,
		homeTown: $scope.user.homeTown,
		profileImage: $scope.user.profileImage,
		lastUpdated: Date.now()
	  })
	  $scope.isEditing = false;
	}
	
	
	//---------------------------- User Profile Pic Upload ----------------------------------//
  function handleFileSelect(e) {
    var file = e.target.files[0];
    // Get a reference to the location where we'll store our photos
    var storageRef = storage.ref().child('profileImages');
    // Get a reference to store file at photos/<FILENAME>.jpg
    var photoRef = storageRef.child(file.name);
    // Upload file to Firebase Storage
    var uploadTask = photoRef.put(file);
    uploadTask.on('state_changed', null, null, function() {
      // When the image has successfully uploaded, we get its download URL
      var downloadUrl = uploadTask.snapshot.downloadURL;
      // Set the download URL to the message box, so that the user can send it to the database
      //textInput.value = downloadUrl;
	  $scope.user.profileImage = uploadTask.snapshot.downloadURL;
	  $scope.userEdit();
	  $scope.$apply();
    });
  }
  file.addEventListener('change', handleFileSelect, false);
	//---------------------------- END File Upload ----------------------------------//
	
});