angular.module('MyApp')
  .controller('eventSignCtrl', function($scope, $rootScope, $location, $window,  $http, $auth) {
    
    $scope.eventName = 'launchparty';
    $rootScope.eventName = 'launchparty';
    $scope.showDetails = false;

    $http.get('/api/getAttendees/'+ $scope.eventName)
    .then(function(response){
      console.log("get attendees response", response);
    
      $scope.event = {};//{launchparty: {attendees: []}};
      $scope.event[$scope.eventName] = {attendees: []}
      $scope.event.launchparty.attendees = response.data.attendees;//[1,2,3,4,5,6,7];

    })


    $scope.checkingIn = function(person, idx){
      console.log("called checkingIn(), person", person, " index:", idx);

      person.checkedIn = true;
      $scope.event.launchparty.attendees[idx] = person;
      $scope.showDetails = true;

      $scope.updatePerson = person;

      $http.post('/api/checkIn/'+ $scope.eventName, {person: person})
      .then(function(response){
        console.log("checkIn response", response);
      })
    }


    $scope.updateDetails = function(updatePerson){
      console.log('updateDetails, personObj', updatePerson);
      $http.post('/api/updateAttendee/'+ $scope.eventName, {person: updatePerson})
      .then(function(response){
        console.log("updateAttendee response", response);
      })

    } 




    $scope.signup = function() {
      console.log("signUp() $scope.user", $scope.user);

      $scope.user.eventName = $scope.eventName;
      $auth.signup($scope.user)
        .then(function(response) {
          $auth.setToken(response);
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          $scope.messages = {
            error: Array.isArray(response.data) ? response.data : [response.data]
          };
        });
    };

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function(response) {
          $rootScope.currentUser = response.data.user;
          $window.localStorage.user = JSON.stringify(response.data.user);
          $location.path('/');
        })
        .catch(function(response) {
          if (response.error) {
            $scope.messages = {
              error: [{ msg: response.error }]
            };
          } else if (response.data) {
            $scope.messages = {
              error: [response.data]
            };
          }
        });
    };
  });