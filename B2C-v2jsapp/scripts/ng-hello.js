(function (hello) {
    angular.module('ngHello', [])
        .provider('hello', function () {
            this.$get = function () {
                return hello;
            };

            this.init = function (services, options) {
                hello.init(services, options);
            };
        });
})(hello);