'use strict';

var create = require('pages/create/create');
var ticket = require('pages/ticket/ticket');
var detail = require('pages/ticket/detail/detail');
// var sidebar = require('partial/sidebar/sidebar');

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(function ($stateProvider, $urlRouterProvider) {

    // For unmatched routes
    $urlRouterProvider.otherwise('/#/ticket/all');

    // Application routes
    $stateProvider
        .state('index', create)
        .state('ticket', ticket)
        .state('detail', detail)
        // .state('create', create);     
});

// var applist = angular.module("detail", ["ngRoute"]);
// applist.config(function($routeProvider){
// 	$routeProvider
//     .when("/:ticketNumber",{
//     	controller:"detailController",
//       	templateUrl:"/ticket/detail.html"
//     });
// });



// angular.module('detailTemplate').config(function($stateProvider, $urlRouterProvider) {
// 	    // For unmatched routes
//     $urlRouterProvider.otherwise('/');

//     // Application routes
//     $stateProvider
//         .state('detail', detail);        
// });
// });