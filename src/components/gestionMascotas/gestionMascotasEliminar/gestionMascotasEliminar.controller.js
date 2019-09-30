"use strict";
angular.module('gestionMascotas')
    .controller('gestionMascotasEliminarController',
        ['mascotaService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (mascotaService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
                var scope = this;
                scope.varnab = $location.search();
                scope.dataInfo =
                    {
                        codUsuario: localStorageService.get("codUsuario"),
                        token: localStorageService.get("token"),
                    }
                scope.frmData = {
                    name_page_title: "Mascota",
                    content: "¿Desea eliminar la mascota " + dataModal.nombre + "?",
                    Mascota: {
                        eliminar:
                            {
                                request: {
                                    pIdMascota:dataModal.pIdMascota,
                                },
                                response: {
                                }
                            }
                    }
                }
                scope.eliminarMascota = function () {
                    mascotaService.eliminar(scope.dataInfo).post({}, scope.frmData.Mascota.eliminar.request, function (result) {
                        if (result.estado == 1) {
                            toastr.remove();
                            toastr.success("Eliminación Exitosa", "Acción realizada", viewConfig.toastConfig);
                            scope.cancel();
                        } else if (result.estado == -1 || result.estado == 0) {
                            toastr.remove();
                            toastr.warning(result.mensaje, "Advertencia", viewConfig.toastConfig);
                            console.error('Error: ' + result.mensaje);
                        }
                    }, function (error) {
                        toastr.remove();
                        toastr.warning(result.mensaje, "Error", viewConfig.toastConfig);
                        console.error('Error: ' + error);
                    });
                }
                scope.cancel = function () {
                    $uibModalInstance.close();
                }
                scope.OnloadDetail = function () {
                    //scope.listarDetalle();
                }
                scope.OnloadDetail();
            }
        ]);