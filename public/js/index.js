var attendance = angular.module('attendance',[]);

attendance.controller('attendanceCtrl', ['$http','$q', '$window', function($http,$q,$window) {
    var baseURL = 'http://redoxcorp.eu-4.evennode.com/';
    
    var self = this;
    
navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
        alert(position.coords.latitude);
        if(position.coords.latitude < 2.59) {
            $window.location.href='/error';
            
        }
        console.log(position.coords.latitude);
        
//    x.innerHTML = "Latitude: " + position.coords.latitude + 
//    "<br>Longitude: " + position.coords.longitude;
        
    }
    
    self.code;
    self.times;
    self.obj2 = {};
    var d = new Date();
    self.hours = d.getHours();
    self.minutes = d.getMinutes();
    self.date = d.getDate();
    self.month = d.getMonth();
//    console.log(self.hours);
//    console.log(self.minutes);
      self.submit = function() {
                self.status="Loading...";
             self.obj.hours = self.hours;
             self.obj.minutes = self.minutes ;
             self.obj.date = self.date ;
             self.obj.month = self.month+1 ;
             self.obj.hours1 = "" ;
             self.obj.minutes1 = "" ;
            return $http.post(baseURL+'login',self.obj)
            .then(
                function(response){
                    console.log(self.hours);
                    self.status="Success";
                    return response.data;
                },
                function(errResponse){
                    self.status="Failed";
                    console.log(errResponse);
                    return $q.reject(errResponse);
                }
        );
             
          }
      
      //NOTE: No admin, put the user checkout button on the table
            self.checkout = function(id) {
//             self.status2="Loading...";
             var d2 = new Date();
             self.hours2 = d2.getHours();
             self.minutes2 = d2.getMinutes();
             self.obj2.hours1 = self.hours2 ;
             self.obj2.minutes1 = self.minutes2 ;
            return $http.put(baseURL+'login/'+id,self.obj2)
            .then(
                function(response){
                    alert("You have checked out successfully");
//                    self.status2 = "You have checked out successfully";
                    $window.location.href='/admin';
                    return response.data;
                },
                function(errResponse){
                    alert("Failed! Try again or contact IT department");
                    console.log(errResponse);
                    return $q.reject(errResponse);
                }
        );
             
          }
      
        $http.get(baseURL+'login')
        .then(
                function(response){
                    console.log(response.data);
                    self.times = response.data;
                    return response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                    return $q.reject(errResponse);
                }
        );
           
    
      
      self.redirect = function() {
          console.log(self.code);
          if(self.code == 'qwertypoiu') {
              $window.location.href='/admin';
          }
          
          else {
              self.message='incorrect password, Try Again';
          }
      }
    
    
}]);