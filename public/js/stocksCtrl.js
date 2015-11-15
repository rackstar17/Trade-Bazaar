var stocks = angular.module('indianStocks',[])

stocks.controller('stockController' , function($scope,$http,$rootScope) {

    $scope.init = function() {
        console.log('angular works');
        $http({
            method:'GET' ,
            url: '/api/stockget'
        }).then(function successCallback(response) {
            //console.log(response);
            $rootScope.stocks = response.data;
            $rootScope.stocksLength = $rootScope.stocks.length;

        }, function errorCallback(response) {
            console.log('sorry ! get request failed');
        })
    }

    $rootScope.selectedIndex = -1;
    $rootScope.suggestions = [];

    $scope.search = function() {
        $rootScope.suggestions = [];
        var myMaxSuggestionListLength = 0;
        for(var i=0;i<$rootScope.stocksLength;i++) {
            var searchItemsSmallLetters = angular.lowercase($rootScope.stocks[i].stockName);
            var searchTextSmallLetters = angular.lowercase($scope.searchText);
            if(searchItemsSmallLetters.indexOf(searchTextSmallLetters) !== -1 && searchTextSmallLetters !== '') {
                $rootScope.suggestions.push($rootScope.stocks[i].stockName);
                myMaxSuggestionListLength++;
                if(myMaxSuggestionListLength == 30) {
                    break;
                }
            }
        }
    }

    // Keeping track of the search text value during the selection from the suggestion list
    $rootScope.$watch('selectedIndex', function(val) {
        if(val !== -1) {
            $scope.searchText = $rootScope.suggestions[$rootScope.selectedIndex];
        }
    });

    $rootScope.assignValueAndHide = function(index) {
        $scope.searchText = $rootScope.suggestions[index];
        $rootScope.suggestions = [];
    }

});