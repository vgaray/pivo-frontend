angular.module('centralExterna')
    .controller('centralExternaDeleteController', [
        '$location', '$log', 'centralExternaService', 'localStorageService', '$uibModalInstance', 'dataModal', 'viewConfig',
        function($location, $log, centralExternaService, localStorageService, $uibModalInstance, dataModal, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.frmData = {
                dataModal: dataModal,
                noEmpresa :dataModal.request.noEmpresa,
            }

            scope.content="¿Está seguro que desea eliminar la Central Externa "+scope.frmData.noEmpresa+"?";

            //Elimnar
            scope.deleteCentralExterna = function(dismissModalCallback) {
                centralExternaService.EliminarCentralExterna(scope.dataInfo).post({}, scope.frmData.dataModal.request, function(result) {
                        if (result.estado == 1) {
                            if (result.idRasult == 1) {
                                $log.debug("Eliminación exitosa");
                                toastr.remove();
                                toastr.success(scope.frmData.noEmpresa+" eliminada correctamente", "Central Externa", viewConfig.toastConfig);

                            } else if (result.idRasult == 0 || result.idRasult == -1) {
                                toastr.remove();
                                toastr.error("asignada, no es posible eliminar", "Central Externa", viewConfig.toastConfig);
                            }
                        } else {
                            $log.error("Fallo en la eliminación");
                            toastr.remove();
                            toastr.error("Error", "Fallo en la eliminación", viewConfig.toastConfig);
                        }
                        dismissModalCallback(result.idRasult)
                    },
                    function(error) {
                        $log.error(error);
                        toastr.remove();
                        toastr.error(error, "Error", viewConfig.toastConfig);

                        dismissModalCallback(-1);
                    });
            }
            //Confirmar
            scope.onConfirmDelete = function() {
                scope.deleteCentralExterna(function(ilEliminado) {
                    $uibModalInstance.close(ilEliminado);
                });
            }
            //Cancelar
            scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }

        }
    ]);
