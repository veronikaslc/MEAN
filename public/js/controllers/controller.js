function ServiceCtrl($scope, $http){	

	$scope.newservice = {_id:null, name:''};

	function renderServicesget(response){
		$scope.serviceslist = response;
	}

	function renderServicespost(response){
		$scope.newservice = response;
		$scope.getList();
	}

	function renderServicesremove(response){
		$scope.getList();		
	}

	function renderServicesselect(response){		
		$scope.newservice = response;		
	}

	$scope.getList= function (){
		$http.get('/services')
	      	 .success(renderServicesget);
	}

	$scope.Create = function (){		
		$http.post('/services',  JSON.stringify({name:$scope.newservice.name}))
		.success(renderServicespost);	
	}

	$scope.Remove = function (id){		
		$http.delete('/services/'+id)
		.success(renderServicesremove);	
	}

	$scope.Select = function (id){		
		$http.get('/services/'+id)
		.success(renderServicesselect);	
	}

	$scope.Update = function (){		
		$http.put('/services/'+$scope.newservice._id, JSON.stringify({name:$scope.newservice.name}))
		.success(renderServicespost);	
	}



}