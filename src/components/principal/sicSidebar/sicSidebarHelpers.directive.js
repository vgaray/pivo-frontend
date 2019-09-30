(function() {
    'use strict';

    angular.module('principal')
        .directive('sicSidebarToggleMenu', sicSidebarToggleMenu)
        .directive('sicSidebarCollapseMenu', sicSidebarCollapseMenu)
        .directive('sicSidebarTogglingItem', sicSidebarTogglingItem)
        .controller('sicSidebarTogglingItemCtrl', sicSidebarTogglingItemCtrl)
        .directive('sicUiSrefTogglingSubmenu', sicUiSrefTogglingSubmenu)
        .directive('sicUiSrefToggler', sicUiSrefToggler);

    /** @ngInject */
    function sicSidebarToggleMenu(sicSidebarService) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                elem.on('click', function($evt) {
                    $evt.originalEvent.$sidebarEventProcessed = true;
                    scope.$apply(function() {
                        sicSidebarService.toggleMenuCollapsed();
                    });
                });
            }
        };
    }

    /** @ngInject */
    function sicSidebarCollapseMenu(sicSidebarService) {
        return {
            restrict: 'A',
            link: function(scope, elem) {
                elem.on('click', function($evt) {
                    $evt.originalEvent.$sidebarEventProcessed = true;
                    if (!sicSidebarService.isMenuCollapsed()) {
                        scope.$apply(function() {
                            sicSidebarService.setMenuCollapsed(true);
                        });
                    }
                });
            }
        };
    }

    /** @ngInject */
    function sicSidebarTogglingItem() {
        return {
            restrict: 'A',
            controller: 'sicSidebarTogglingItemCtrl'
        };
    }

    /** @ngInject */
    function sicSidebarTogglingItemCtrl($scope, $element, $attrs, $state, sicSidebarService) {
        var vm = this;
        var menuItem = vm.$$menuItem = $scope.$eval($attrs.sicSidebarTogglingItem);
        if (menuItem && menuItem.subItem && menuItem.subItem.length) {
            vm.$$expandSubmenu = function() { console.warn('$$expandMenu should be overwritten by sicUiSrefTogglingSubmenu') };
            vm.$$collapseSubmenu = function() { console.warn('$$collapseSubmenu should be overwritten by sicUiSrefTogglingSubmenu') };

            var subItemsStateRefs = sicSidebarService.getAllStateRefsRecursive(menuItem);

            vm.$expand = function() {
                vm.$$expandSubmenu();
                $element.addClass('ba-sidebar-item-expanded');
            };

            vm.$collapse = function() {
                vm.$$collapseSubmenu();
                $element.removeClass('ba-sidebar-item-expanded');
            };

            vm.$toggle = function() {
                $element.hasClass('ba-sidebar-item-expanded') ?
                    vm.$collapse() :
                    vm.$expand();
            };

            if (_isState($state.current)) {
                $element.addClass('ba-sidebar-item-expanded');
            }

            // $scope.$on('$stateChangeStart', function(event, toState) {
            //     if (!_isState(toState) && $element.hasClass('ba-sidebar-item-expanded')) {
            //         vm.$collapse();
            //         $element.removeClass('ba-sidebar-item-expanded');
            //     }
            // });

            // $scope.$on('$stateChangeSuccess', function(event, toState) {
            //     if (_isState(toState) && !$element.hasClass('ba-sidebar-item-expanded')) {
            //         vm.$expand();
            //         $element.addClass('ba-sidebar-item-expanded');
            //         }
            // });
        }

        function _isState(state) {
            return state && subItemsStateRefs.some(function(subItemState) {
                return state.name.indexOf(subItemState) == 0;
            });
        }
    }

    /** @ngInject */
    function sicUiSrefTogglingSubmenu($state) {
        return {
            restrict: 'A',
            require: '^sicSidebarTogglingItem',
            link: function(scope, el, attrs, sicSidebarTogglingItem) {
                sicSidebarTogglingItem.$$expandSubmenu = function() { el.slideDown(); };
                sicSidebarTogglingItem.$$collapseSubmenu = function() { el.slideUp(); };
            }
        };
    }

    /** @ngInject */
    function sicUiSrefToggler(sicSidebarService) {
        return {
            restrict: 'A',
            require: '^sicSidebarTogglingItem',
            link: function(scope, el, attrs, sicSidebarTogglingItem) {
                el.on('click', function() {
                    if (sicSidebarService.isMenuCollapsed()) {
                        // If the whole sidebar is collapsed and this item has submenu. We need to open sidebar.
                        // This should not affect mobiles, because on mobiles sidebar should be hidden at all
                        scope.$apply(function() {
                            sicSidebarService.setMenuCollapsed(false);
                        });
                        sicSidebarTogglingItem.$expand("fast");
                    } else {
                        sicSidebarTogglingItem.$toggle("fast");
                    }
                });
            }
        };
    }

})();
