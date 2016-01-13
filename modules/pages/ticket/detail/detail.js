module.exports = {
    url: '/detail/:ticketNumber/:type',
    template: __inline('./detail.html'),
    controller: function ($scope, $http, $stateParams, $state, $window) {
        $scope.showEdit = true;
        $scope.$window = $window;
    	var url = "/json-api/v1/ticket/" + $stateParams.ticketNumber,
        params = "";
        $http({
            "method": "GET", 
            "url": url,
            "params": params
        }).
        success(function(data,status,headers,config){
            if(data && data.success == true){
                $scope.sourceInfo = angular.copy(data.result);
                $scope.ticketInfo = data.result;
                $scope.contentList = data.result.ticketPostContent;

            }else{
                alert(data&&data.retmsg?data.retmsg:"获取数据失败！");
            }
        }).
        error(function(data,status,headers,config){
        });

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
            // console.info(data);
        });

        var ticketStatesUrl = "/json-api/v1/ticketStates",
        ticketStatesParams = {};
        $http({
            "method": "GET", 
            "url": ticketStatesUrl,
            "params":ticketStatesParams
        }).
        success(function(data,status,headers,config){
            if(data && data.success == true){
                $scope.ticketStates = data.result;
            }else{
                alert(data&&data.retmsg?data.retmsg:"获取数据失败！");
            }
        }).
        error(function(data,status,headers,config){
            // console.info(data);
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

        $scope.isEdit = function() {
            $scope.showEdit = !$scope.showEdit;
        };

        if($stateParams.type == "edit" )
        {
            $scope.showEdit = !$scope.showEdit;
        }

        $scope.submitEdit = function() {
            var formData = {};
            if($scope.ticketInfo.ticketState != $scope.sourceInfo.ticketState) {
                formData.ticketState = $scope.ticketInfo.ticketState;
            }
            if($scope.ticketInfo.ticketRootCauseId != $scope.sourceInfo.ticketRootCauseId) {
                formData.ticketRootCauseId = $scope.ticketInfo.ticketRootCauseId;
            }
            if($scope.ticketInfo.ticketResolverGroupId != $scope.sourceInfo.ticketResolverGroupId) {
                formData.ticketResolverGroupId = $scope.ticketInfo.ticketResolverGroupId;
            }
             if($scope.ticketInfo.ticketPriority != $scope.sourceInfo.ticketPriority) {
                formData.ticketPriority = $scope.ticketInfo.ticketPriority;
            }
            if($scope.ticketInfo.ticketResolverList != $scope.sourceInfo.ticketResolverList) {
                formData.ticketResolverList = $scope.ticketInfo.ticketResolverList;
            }
            if($scope.ticketInfo.ticketProblemSummary != $scope.sourceInfo.ticketProblemSummary) {
                formData.ticketProblemSummary = $scope.ticketInfo.ticketProblemSummary;
            }
            if($scope.ticketInfo.PostContent != "") {
                formData.PostContent = $scope.ticketInfo.PostContent;
            }

            // var url = "/json-api/v1/ticket/" + $stateParams.ticketNumber;
            var url = "/json-api/v1/ticket/zxz";
            $http({
            "method": "PUT", 
            "url": url,
            "data": formData
        }).
        success(function(data,status,headers,config){
            if(data && data.success == true){
                $state.reload();
            }else{
                alert(data&&data.retmsg?data.retmsg:"获取数据失败！");
            }
        }).
        error(function(data,status,headers,config){
                //
            });

        };

        $scope.deleteTicket = function() {
            var url = "/json-api/v1/ticket/" + $stateParams.ticketNumber;
            $http({
                "method": "DELETE", 
                "url": url
            }).
            success(function(data,status,headers,config){
            if(data && data.success == true){
                    alert("删除成功");
                    $window.history.back(); 
                }else{
                    alert(data&&data.retmsg?data.retmsg:"删除失败失败！");
                }
            }).
            error(function(data,status,headers,config){
                    //
                });
        };

        $scope.goBack = function() {
            $window.history.back(); 
        };
    }

};







