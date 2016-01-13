// angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'bgf.paginateAnything']);
angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies']);

require('router');

/**
 * Master Controller
 */

angular.module('RDash').controller('MasterCtrl', function ($scope,$http,$cookieStore) {
    /**
     * Sidebar Toggle & Cookie Control
     */
    var mobileView = 992;
    $scope.flag = {BAE: true, BCC: true};

    $scope.getWidth = function () {
        return window.innerWidth;
    };
    function getResolverGroupList(){
        var url = "/json-api/v1/resolverGroupIds",
        params = {};
        $http({
            "method": "GET", 
            "url": url,
            "params":params
        }).
        success(function(data,status,headers,config){
            if(data && data.success == true){
                $scope.resolverGroupList = data.result;
                // console.log($scope.resolverGroupList);
            }else{
                alert(data&&data.retmsg?data.retmsg:"获取数据失败！");
            }
        }).
        error(function(data,status,headers,config){
            // console.info(data);
        });
    };
    getResolverGroupList();

    $scope.$watch($scope.getWidth, function (newValue, oldValue) {
        if (newValue >= mobileView) {
            if (angular.isDefined($cookieStore.get('toggle'))) {
                $scope.toggle = !$cookieStore.get('toggle') ? false : true;
            } else {
                $scope.toggle = true;
            }
        } else {
            $scope.toggle = false;
        }

    });

    $scope.listToggle = function (key) {
        $scope.flag[key] = !$scope.flag[key];
        // $scope.headContent = key;
        console.info(key);
    };

    $scope.toggleSidebar = function () {
        $scope.toggle = !$scope.toggle;
        $cookieStore.put('toggle', $scope.toggle);
    };

    window.onresize = function () {
        $scope.$apply();
    };


    
});