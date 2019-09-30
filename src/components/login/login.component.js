(
    function() {
        'use strict';
        angular.module('login')
            .component('login', {
                templateUrl: "src/components/login/login.template.html",
                controller: "loginController as ctrl"
            });
    })();
