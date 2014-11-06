function TweetsCtrl($scope, $http, $routeParams, $location){

    $scope.showedit = false;

    validatePath();

    function validatePath()  {
        if ($location.path().length === '/tweets'){
            getList();
        } else {
            $scope.newtweet = {text: '', userid: $routeParams.id};
            getListByUser();
        }
    }

    function  getList(){
        $http.get('/tweets')
            .success(renderServicesget);
    }

    function  getListByUser(){
        $http.get('/tweets/'+$routeParams.id)
            .success(renderServicesget);
    }

    function renderServicesget(response) {
        $scope.tweets = response;
    }

    function renderServicesremove(response) {
        validatePath();
    }

    function renderServicespost(response) {
        validatePath();
    }

    $scope.Remove = function (id){
        $http.delete('/tweets/'+id)
            .success(renderServicesremove);
    }

    $scope.LiastAll = function () {
        getList();
    }

    $scope.ListFriends = function (){
        $http.get('/tweets/friends/'+$routeParams.id)
            .success(renderServicesget);
    }

    $scope.ListMine = function (){
        getListByUser();
    }

    $scope.Create = function (){
        $http.post('/tweets',  JSON.stringify($scope.newtweet))
            .success(renderServicespost);
    }

    $scope.Update = function (tweet){
        $scope.showedit = false;
        $http.put('/tweets/'+tweet._id, JSON.stringify(tweet))
            .success(renderServicespost);
    }

}