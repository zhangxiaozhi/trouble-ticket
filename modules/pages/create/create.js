require('common/alerts/alerts');
require('common/widget/widget');

module.exports = {
    url: '/create',
    template: __inline('./create.html'),
    controller: function ($scope, $http, $stateParams, $state, $location, $window) {
     $scope.$window = $window;
     $scope.createInfo = {};

     var rootCauseIdsUrl = "/json-api/v1/rootCauseIds",
        rootCauseIdsParams = {};
        $http({
            "method": "GET", 
            "url": rootCauseIdsUrl,
            "params":rootCauseIdsParams
        }).
        success(function(data,status,headers,config){
            
            if(data && data.success == true){
                $scope.rootCauseIds = data.result;
            }else{
                alert(data&&data.retmsg?data.retmsg:"获取数据失败！");
            }
        }).
        error(function(data,status,headers,config){
            // 
        });

        var resolverGroupIdsUrl = "/json-api/v1/resolverGroupIds",
        resolverGroupIdsParams = {};
        $http({
            "method": "GET", 
            "url": resolverGroupIdsUrl,
            "params":resolverGroupIdsParams
        }).
        success(function(data,status,headers,config){
            if(data && data.success == true){
                var result = [];
                for(var i in data.result) {
                    result = result.concat(data.result[i]);
                }
                $scope.resolverGroupIds = result;
                 // console.info($scope.resolverGroupIds);
            }else{
                alert(data&&data.retmsg?data.retmsg:"获取数据失败！");
            }
        }).
        error(function(data,status,headers,config){
            // console.info(data);
        });

        var ticketPrioritiesUrl = "/json-api/v1/ticketPriorities",
        ticketPrioritiesParams = {};
        $http({
            "method": "GET", 
            "url": ticketPrioritiesUrl,
            "params":ticketPrioritiesParams
        }).
        success(function(data,status,headers,config){
            if(data && data.success == true){
                $scope.ticketPriorities = data.result;
            }else{
                alert(data&&data.retmsg?data.retmsg:"获取数据失败！");
            }
        }).
        error(function(data,status,headers,config){
            // console.info(data);
        });


        $scope.submitCreate = function() {           
            if($scope.createInfo.ticketExtSystemInfoId) {
                alert("haha");
                $scope.createInfo.ticketExtSystemInfoId = "bce-ticket_" + $scope.createInfo.ticketExtSystemInfoId;
            }
            // var url = "/json-api/v1/ticket";
            var url = "/json-api/v1/ticket/zkz";
            $http({
                "method": "POST", 
                "url": url,
                "data": $scope.createInfo
            }).
            success(function(data,status,headers,config){
                if(data && data.success == true) {
                    // console.info(data.result.ticketNumber);
                    var redirectToDetaiInfo = '/detail/' + data.result.ticketNumber + "/info";
                    $location.path(redirectToDetaiInfo);

                }else{
                    alert(data&&data.retmsg?data.retmsg:"创建工单失败！");
                }
            }).
            error(function(data,status,headers,config){
                    //
            });
        };

        $scope.cancleCreate = function() {
            // alert("您所编辑的内容将会丢失!")
            $window.history.back();             
        };
	}
};
