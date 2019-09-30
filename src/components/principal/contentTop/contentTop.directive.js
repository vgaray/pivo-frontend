(function() {
    'use strict';
    angular.module('principal')

    .directive('contentTop', contentTop);

    /** @ngInject */
    function contentTop($location, $state) {
        return {
            restrict: 'E',
            templateUrl: 'src/components/principal/contentTop/contentTop.template.html',
            link: function($scope) {
                $scope.$watch(function() {
                    $scope.activePageTitle = $state.current.title;
                    $scope.pageSectionTitle = $state.current.page;
                });
            }
        };
    }

})();
