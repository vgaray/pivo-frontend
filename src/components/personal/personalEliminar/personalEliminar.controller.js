"use strict";

angular.module('personal')
    .controller('personalEliminarController',
        ['personalService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (personalService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
                var scope = this;
                scope.varnab = $location.search();
                scope.dataInfo =
                    {
                        codUsuario: localStorageService.get("codUsuario"),
                        token: localStorageService.get("token"),
                        idInstancia: scope.varnab.idInstancia
                    }

                scope.frmData = {
                    name_page_title: "Personal",
                    content: "¿Desea eliminar el Personal " + dataModal.nombre + "?",
                    Personal: {
                        eliminar:
                            {
                                request: {
                                    pIdPersonal: dataModal.pIdPersonal,
                                },
                                response: {
                                }
                            }
                    }
                }

                scope.eliminarPersonal = function () {
                    personalService.eliminar(scope.dataInfo).post({}, scope.frmData.Personal.eliminar.request, function (result) {
                        if (result.estado == 1) {
                            toastr.remove();
                            toastr.success(result.mensaje, "Acción realizada", viewConfig.toastConfig);
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