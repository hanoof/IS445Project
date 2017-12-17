var app = angular.module('contacts', ['ngRoute']).run(function($rootScope, $http) {
    console.log("App started!")
});

app.config(function($routeProvider, $locationProvider, $httpProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/main.html',
            controller: 'mainController',
        })
        .when('/addContact', {
            templateUrl: 'partials/addContact.html',
            controller: 'mainController'
        })
        .when('/editContact/:contact', {
            templateUrl: 'partials/editContact.html',
            controller: 'mainController'
        });
});

app.controller('mainController', function($scope, $http, $rootScope, $location, $routeParams) {
    $scope.getContacts = function() {
        $http.get('/api/contacts').then(function(response) {
            $scope.allContacts = response.data
        })
    }
    $scope.addContact = function() {
        $http.post('/api/contacts', $scope.newContact).then(function(response) {
            $scope.allContacts = response.data
            alert("Contact added successfully.")
            $location.path('/');
        })
    }
    $scope.deleteContact = function(item) {
        $http.delete('/api/contacts/' + item.id).then(function(response) {
            alert("Contact delete successfully.")
            $scope.getContacts()
        })
    }
    $scope.editContact = function(item) {;
        $location.path('/editContact/' + JSON.stringify(item));
    }
    if ($routeParams.contact) {
        $scope.editContact = JSON.parse($routeParams.contact)
    }

    $scope.updateContact = function() {
        $http.put('/api/contacts/' + $scope.editContact.id, $scope.editContact).then(function(response) {
            console.log(response)
            alert("Contact updated!")
            $location.path('/');
        })
    }

    $scope.getContacts()

})