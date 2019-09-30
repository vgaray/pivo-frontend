
angular.module('personal')
    .controller('personalDatosPersonalesController',
        ['localStorageService', '$uibModalInstance', '$location', 'dataModal',
            function (localStorageService, $uibModalInstance, $location, dataModal) {
                var scope = this
                scope.noDireccion=dataModal.noDireccion;
                scope.nuTelefono=dataModal.nuTelefono;
                scope.nuCelular=dataModal.nuCelular;
                scope.noCorreo=dataModal.noCorreo;
                scope.cancel = function () {
                    $uibModalInstance.close();
                }
            }
        ]);