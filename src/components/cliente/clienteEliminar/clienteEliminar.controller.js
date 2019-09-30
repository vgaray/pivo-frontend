"use strict";

angular.module('cliente')
    .controller('clienteEliminarController',
    ['clienteService', 'localStorageService', '$uibModalInstance', '$location', 'idRecibido',
        function (clienteService, localStorageService, $uibModalInstance, $location, idRecibido) {
            var scope = this;

            scope.dataInfo =
                {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                }

            scope.frmData = {
                name_page_title: "Mensaje del Sistema",
                content: " ¿Seguro de deshabilitar Cliente?",
                Cliente: {
                    eliminar:
                    {
                        request: {
                            pIdCliente:idRecibido   
                        },
                    }
                }
            }
             scope.eliminarCliente = function () {
                 clienteService.eliminaCliente(scope.dataInfo).post({}, scope.frmData.Cliente.eliminar.request, function (result) {
                     if (result.estado == 1) {
                        scope.cancel();
                     } else if (result.estado == -1 || result.estado == 0) {
                         console.error('Error: ' + result.mensaje);
                     }
                 }, function (error) {
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






