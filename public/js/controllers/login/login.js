function LoginCtrl($scope, $http, $location, $rootScope){

	$scope.user = { name:'', password: '', friends: []};

	function renderLogin(response, status){
        console.log("loggin in status: "+status);
        $rootScope.userGlobalId = response.id;
        $location.path('/users');
	}

    function renderRegister(response){
        $location.path('/users/'+response.id);
    }

	$scope.Login = function (){
		$http.get('/login', JSON.stringify($scope.user))
	      	 .success(renderLogin)
            .error(function(error){
            alert(error);
        });
	}

	$scope.Register = function (){
		$http.post('/users', JSON.stringify($scope.user))
		    .success(renderRegister);
	}

}