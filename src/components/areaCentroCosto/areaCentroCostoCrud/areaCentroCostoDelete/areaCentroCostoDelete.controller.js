angular.module('areaCentroCosto')
    .controller('areaCentroCostoDeleteController', [
        '$location', '$log', 'areaCentroCostoService', 'localStorageService', '$uibModalInstance', 'dataModal', 'viewConfig',
        function($location, $log, areaCentroCostoService, localStorageService, $uibModalInstance, dataModal, viewConfig) {
            var scope = this;

            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.frmData = {
                dataModal: dataModal,
               noare:dataModal.areaCentroCostoDeleteRequest.noare,
               nocen:dataModal.areaCentroCostoDeleteRequest.nocen
            }
        if(scope.frmData.nocen=="")
        {
            scope.content="Desea eliminar el área: "+scope.frmData.noare;
        }else {
            scope.content="Desea eliminar el área: "+scope.frmData.noare+"-con centro de costo: "+scope.frmData.nocen;
        }
            scope.deleteAreaCentroCosto = function(dismissModalCallback) {
                areaCentroCostoService.eliminarAreaCentroCosto(scope.dataInfo).post({}, dataModal.areaCentroCostoDeleteRequest, function(result) {
                        if (result.estado == 1) {
                            if (result.eliminar == 1) {
                                if (result.validar == "ok") {
                                    $log.debug("Eliminación exitosa");
                                    toastr.remove();
                                    toastr.success("Eliminación exitosa", "Acción realizada", viewConfig.toastConfig);
                                }

                            } else if (result.eliminar == 0) {
                                toastr.remove();
                                toastr.error("Esta Área tiene asignado uno o mas centros de costos, eliminar primero los centros de costo para poder eliminar el Área", "Error", viewConfig.toastConfig);
                            }
                        } else {
                            $log.error("Fallo en la eliminación");
                            toastr.remove();
                            toastr.error("Error", "Fallo en la eliminación", viewConfig.toastConfig);
                        }
                        dismissModalCallback(result.eliminar)
                    },
                    function(error) {
                        $log.error(error);
                        toastr.remove();
                        toastr.error(error, "Error", viewConfig.toastConfig);

                        dismissModalCallback(-1);
                    });

            }

            scope.onConfirmDelete = function() {
                scope.deleteAreaCentroCosto(function(ilEliminado) {
                    $uibModalInstance.close(ilEliminado);
                });
            }

            scope.cancel = function() {
                $uibModalInstance.dismiss('cancel');
            }
        }
    ]);
