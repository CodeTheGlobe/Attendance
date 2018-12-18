var attendance = angular.module('attendance',[]);

attendance.controller('attendanceCtrl', ['$http','$q', '$window', function($http,$q,$window) {
    var baseURL = 'http://localhost:3000';
    
    var self = this;
    

    self.code;
    self.times;
    self.times2;
    self.obj2 = {};
    var d = new Date();
    self.hours = d.getHours();
    self.minutes = d.getMinutes();
    self.date = d.getDate();
    self.month = d.getMonth();

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
    
    self.obj3 = {};
    

    
    
    self.send = function() {
    var config =  {
    params: {
        date: self.obj3.day,
        month: self.obj3.month
            }
                }
   
        console.log(self.obj3)
     $http.get(baseURL+'dashboard', config)
        .then(
                function(response){
                    console.log(response.data);
                    self.times2 = response.data;
                    return response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                    return $q.reject(errResponse);
                }
        );    
        
        
    }


    
    //get entire month logs
    self.send2 = function() {
        
    var config =  {
    params: {
        month: self.obj3.month
            }
                }
   
        console.log(self.obj3)
     $http.get(baseURL+'dashboard/month', config)
        .then(
                function(response){
                    console.log(response.data);
                    self.times2 = response.data;
                    return response.data;
                },
                function(errResponse){
                    console.log(errResponse);
                    return $q.reject(errResponse);
                }
        );    
        
        
    }


        //Checkout
        self.checkout = function(id) {
             var d2 = new Date();
             self.hours2 = d2.getHours();
             self.minutes2 = d2.getMinutes();
             self.obj2.hours1 = self.hours2 ;
             self.obj2.minutes1 = self.minutes2 ;
            return $http.put(baseURL+'login/'+id,self.obj2)
            .then(
                function(response){
                    alert("You have checked out successfully");

                    return response.data;
                },
                function(errResponse){
                    alert("Failed! Try again or contact IT department");
                    console.log(errResponse);
                    return $q.reject(errResponse);
                }
        );
             
          }
      
        //get logs from DB
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
           
    
      

    
    
}]);