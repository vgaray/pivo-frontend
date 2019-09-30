(function() {
    'use strict';

    angular.module('principal')
        .directive('backTop', backTop);

    /** @ngInject */
    function backTop() {
        return {
            restrict: 'E',
            templateUrl: 'src/components/principal/backTop/backTop.template.html',
            controller: function() {
                $('#backTop').backTop({
                    'position': 200,
                    'speed': 100
                });
            }
        };
    }

})();
