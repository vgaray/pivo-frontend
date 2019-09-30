(function() {
    'use strict';
    angular.module('principal')

    .directive('pageTop', pageTop);


    /** @ngInject */
    function pageTop() {
        return {
            restrict: 'E',
            templateUrl: 'src/components/principal/pageTop/page-top.template.html'
        };
    }

})();
