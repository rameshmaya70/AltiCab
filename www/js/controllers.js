angular.module('starter.controllers', [])

.factory('CabHistory',function(){

   var factory = {};
   
   factory.histories = [
   {'date':'12-02-2016 9:30 PM','from':'Ascendas 13th floor','to':'Guindy','status':'Approved','img':'img/check.png','manager':'Raghu','mobile':'9952047754','department':'CTO'},
   {'date':'14-02-2016 10:30 PM','from':'Ascendas 4th floor','to':'Plavanthangal','status':'Rejected','img':'img/cross.jpg','manager':'Raghu','mobile':'9952047754','department':'CTO'},
   {'date':'17-02-2016 9:30 PM','from':'Ascendas 13th floor','to':'Guindy','status':'Approved','img':'img/check.png','manager':'Raghu','mobile':'9952047754','department':'CTO'},
   {'date':'12-02-2016 11:30 PM','from':'Ascendas 13th floor','to':'Guindy','status':'Approved','img':'img/check.png','manager':'Raghu','mobile':'9952047754','department':'CTO'},
   {'date':'14-02-2016 8:30 PM','from':'Ascendas 4th floor','to':'Plavanthangal','status':'Rejected','img':'img/cross.jpg','manager':'Raghu','mobile':'9952047754','department':'CTO'},
   {'date':'17-02-2016 12:00 PM','from':'Ascendas 13th floor','to':'Guindy','status':'Pending','img':'img/pending.jpg','manager':'Raghu','mobile':'9952047754','department':'CTO'}];
   
   return factory;

})


.controller('DashCtrl', function($scope, $ionicModal) {



})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})


.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/newRequest.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };







})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('HomeCtrl',function($scope,$state,$ionicModal,CabHistory,$rootScope,$filter){
  $scope.histories = CabHistory.histories;
  console.log($scope.histories);

   $scope.login = {};

   // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/newRequest.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });

    $scope.showNewRequest = function(){
      $scope.modal.show();

    };
    $scope.closeNewRequest = function(){
      $scope.modal.hide();

    };

    $scope.login = function(){

    
      $state.go("app.browse");
      console.log($scope.login.username,$scope.login.password,$rootScope);
    };

    $scope.showDetail = function($index){
    console.log($index);

    $rootScope.currentObject = $scope.histories[$index];
    $state.go("tab.detail");

  };

  $scope.logout = function(){
    $state.go("app.login");
  }

 $scope.newRequest = {};

  $scope.addNewRequest = function(){

    var from = $scope.newRequest.fromPlace;
    var to = $scope.newRequest.destination;
    var date = $scope.newRequest.newDate;
    var manager = $scope.newRequest.manager;
    var dept = $scope.newRequest.department;
    var contact = $scope.newRequest.mobile;

    console.log(from,to,date,manager,dept,contact);

    if(from != "" && from != null &&to != "" && to != null  && date != "" && date != null && manager != "" && manager != null &&dept != "" &&dept != null && contact != "" && contact != null){
       $scope.result = $filter('date')($scope.newRequest.newDate, "dd-MM-yyyy HH:mm a");
          
      

          var object = {
          'from' : $scope.newRequest.fromPlace,
          'to' : $scope.newRequest.destination,
          'date' : $scope.result,
          'manager': $scope.newRequest.manager,
          'department': $scope.newRequest.department,
          'mobile': $scope.newRequest.mobile,
          'status':'Pending',
          'img':'img/pending.jpg'

        }
     


     //   $scope.histories.push(object);
     $scope.histories.splice(0, 0, object);
      
    //   console.log(object);
       $scope.newRequest = {};
       $scope.modal.hide();

    }else{
      alert("Please fill all fields!");
    }

     

    };

})

.controller('LoginCtrl',function($scope,$state){
  $scope.loginData = {};

    $scope.doLogin = function() {

      console.log($scope.loginData);
     

    if($scope.loginData.username == "test" && $scope.loginData.password == "test"){
          $state.go("tab.home" );
          $scope.loginData = {};
      }else{
        alert("Please enter valid credentials");
      }
    
  };

})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('DetailCtrl', function($scope, $stateParams,$state,$rootScope) {

  $scope.currentHistory = $rootScope.currentObject;

  $scope.goBack  = function(){

    $state.go("tab.home");
  };

})

 .controller('MapCtrl', function($scope, $ionicLoading, $compile,$http) {

      $scope.loc = {};


      $scope.searchLocation= function(){

        console.log($scope.loc.destination);
        
        $http.get('http://maps.google.com/maps/api/geocode/json?address=1600+Amphitheatre+Parkway,+Mountain+View,+CA&sensor=false').success(function(mapData) {
        angular.extend($scope, mapData);
        var latitude = mapData.results[0].geometry.location.lat;
        var longitude = mapData.results[0].geometry.location.lng;

         console.log(latitude,longitude);
        });

        console.log("searchLocation");

      };

      $scope.initialize = function() {
    // var myLatlng = new google.maps.LatLng(43.07493,-89.381388);
    
    // var mapOptions = {
    //   center: myLatlng,
    //   zoom: 16,
    //   mapTypeId: google.maps.MapTypeId.ROADMAP
    // };
    // var map = new google.maps.Map(document.getElementById("map"),
    //     mapOptions);

        var site = new google.maps.LatLng(12.98605407,80.24599135);
        var hospital = new google.maps.LatLng(13.00832104,80.21423399);
      
        var mapOptions = {
          streetViewControl:true,
          center: site,
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.TERRAIN
        };
        var map = new google.maps.Map(document.getElementById("map"),
            mapOptions);


    //Marker + infowindow + angularjs compiled ng-click
        var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
        var compiled = $compile(contentString)($scope);

        var infowindow = new google.maps.InfoWindow({
          content: compiled[0]
        });

        var marker = new google.maps.Marker({
          position: site,
          map: map,
          title: 'Strathblane (Job Location)'
        });
        
        var hospitalRoute = new google.maps.Marker({
          position: hospital,
          map: map,
          title: 'Hospital (Stobhill)'
        });
        
        var infowindow = new google.maps.InfoWindow({
             content:"Source"
        });

        infowindow.open(map,marker);
        
        var hospitalwindow = new google.maps.InfoWindow({
             content:"Destination"
        });

        hospitalwindow.open(map,hospitalRoute);
       
        google.maps.event.addListener(marker, 'click', function() {
          infowindow.open(map,marker);
        });

        $scope.map = map;
        
        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer();

        var request = {
            origin : site,
            destination : hospital,
            travelMode : google.maps.TravelMode.DRIVING
        };
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            }
        });

        directionsDisplay.setMap(map); 

    google.maps.event.addListener(marker, 'click', function() {
      infowindow.open(map,marker);
    });

    $scope.map = map;
  }
  //google.maps.event.addDomListener(window, 'load', initialize);

      
    });