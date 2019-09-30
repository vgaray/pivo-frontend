(
    function() {
        'use strict';
        angular.module('areaCentroCosto')
            .controller('bolsaAreaCentroDeleteController', ['areaCentroCostoService', 'localStorageService', '$location', '$uibModalInstance', 'pkBolsaEmpresa', 'viewConfig',
                function(areaCentroCostoService, localStorageService, $location, $uibModalInstance, pkBolsaEmpresa, viewConfig) {
                    var scope = this;
                    scope.varnab = $location.search();
                    scope.dataInfo = {
                        codUsuario: localStorageService.get("codUsuario"),
                        token: localStorageService.get("token"),
                        idInstancia: scope.varnab.idInstancia
                    }

                    scope.modal = {
                        title: 'Información del sistema',
                        content: '¿Está seguro que desea eliminar la bolsa de minutos del destino '+ pkBolsaEmpresa.nomDestino +'?'
                    };

                    scope.bolsaEmpresaRequest = pkBolsaEmpresa;

                    /*Eliminar bolsa Empresa*/
                    scope.eliminarBolsaEmpresa = function() {
                        areaCentroCostoService.eliminaBolsaEmpresa(scope.dataInfo).post({}, scope.bolsaEmpresaRequest, function(result) {
                            
                            if (result.estado == 1 && result.resultado == 1) {
                                scope.ok();
                                toastr.success("Bolsa Empresa Eliminado", "Bolsa Empresa", viewConfig.toastConfig);
                            } else if (result.estado == 1 && result.resultado == 0) {
                                toastr.warning(result.mensaje, "Bolsa Empresa", viewConfig.toastConfig);
                            } else {
                                toastr.error(result.mensaje, "Bolsa Empresa", viewConfig.toastConfig);
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
            ]);

    })();
