angular.module('pedido')
.controller('pedidoController', [/*'pedidoService',*/ 'localStorageService', '$location', '$log', '$timeout', 'viewConfig', '$uibModal',
    function (/*pedidoService,*/ localStorageService, $location, $log, $timeout, viewConfig, $uibModal) {
        var scope = this;
        scope.dataInfo =
            {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
            }
    }
]);
