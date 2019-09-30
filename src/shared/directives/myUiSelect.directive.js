angular.module('pivo')
    .directive('myUiSelect', function() {
        return {
            require: 'uiSelect',
            link: function($scope, $element, attrs, $select) {
                var searchInput = $element.querySelectorAll('input.ui-select-search');
                if (searchInput.length !== 1) throw Error("bla");

                searchInput.on('blur', function() {
                    $scope.$apply(function() {
                        var item = $select.items[$select.activeIndex];
                        $select.select(item);
                        console.log( item );
                    });
                });
            }
        }
    });
