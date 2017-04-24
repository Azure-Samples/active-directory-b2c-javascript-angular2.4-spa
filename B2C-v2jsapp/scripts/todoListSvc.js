'use strict';
angular.module('todoApp')
.factory('todoListSvc', ['$http', function ($http) {
    return {
        getItems : function(config){
            return $http.get('/api/Tasks', config);
        },
        postItem : function(item, config){
            return $http.post('/api/Tasks/', item, config);
        },
        deleteItem : function(id, config){
            return $http.delete('/api/Tasks/' + id, config);
        },
        putItem: function (item, config) {
            return $http.put('/api/Tasks/', item, config);
        }
    };
}]);