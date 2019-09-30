(function() {
    'use strict';
    angular.module("permisoLlamadas")
        .controller('bolsaUsuarioDeleteController', ['localStorageService', '$location', 'permisoLlamadasService', 'pkBolsaUsuari', '$uibModalInstance', 'viewConfig',
            function(localStorageService, $location, permisoLlamadasService, pkBolsaUsuari, $uibModalInstance, viewConfig) {
                var scope = this;
                scope.varnab = $location.search();
                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                }

                scope.modal = {
                    title: 'Información del sistema',
                    content: '¿Está seguro que desea eliminar la bolsa de minutos del destino '+ pkBolsaUsuari.nomDestino +'?'
                };

                scope.bolsaUsuarioRequest = pkBolsaUsuari;
                /**
                 * [eliminarBolsaUsuario description]
                 * @return {[type]} [description]
                 */
                scope.eliminarBolsaUsuario = function() {
                    permisoLlamadasService.eliminaBolsaUsuario(scope.dataInfo).post({}, scope.bolsaUsuarioRequest, function(result) {
                        if (result.estado == 1 && result.resultado == 1) {
                            scope.ok();
                            toastr.success("Eliminación de Bolsa Exitosa", "Bolsa Usuario", viewConfig.toastConfig);
                        } else if (result.estado == 1 && result.resultado == 0) {
                            toastr.warning(result.mensaje, "Bolsa Usuario", viewConfig.toastConfig);
                        } else {
                            toastr.error(result.mensaje, "Bolsa Usuario", viewConfig.toastConfig);
                        }
                    }, function(error) {
                        console.log("Error " + error);
                    })
                };

                /**
                 * [ok para cerrar el modal ejecutandose la funcion eliminar]
                 * @return {[type]} [description]
                 */
                scope.ok = function() {
                    $uibModalInstance.close();
                };
                /**
                 * [cancel cancela la eliminacion del usuario]
                 * @return {[type]} [description]
                 */
                scope.cancel = function() {
                    $uibModalInstance.dismiss('cancel');
                };
            }
        ])
})();
