"use strict";

angular.module('cliente')
.controller('clienteDetallePedidoController', ['localStorageService','pedidoService', '$location', '$log', '$timeout', 'viewConfig', '$uibModalInstance','idRecibido',
    function (localStorageService,pedidoService, $location, $log, $timeout, viewConfig, $uibModalInstance,idRecibido) {
        var scope = this;
        scope.dataInfo =
            {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
            }
        scope.frmData = {
                name_page_title: "Detalle",
                content: "Pedidos",
                PedidoCliente: {
                    listar:
                    {
                        request: {
                            idCliente:idRecibido

                        },
                        response: {

                        }
                    },
                    eliminar:{
                        request:{

                        },
                        response:{

                        }
                    },
                    insertar:{
                        request:{

                        },
                        response:{

                        }
                    }
                }
            }
             scope.lspedidosCliente = [];
            scope.listarPedidosCliente = function () {
                pedidoService.listaPedidoCliente(scope.dataInfo).post({}, scope.frmData.PedidoCliente.listar.request, function (result) {
                    if (result.estado == 1) {
                        scope.lspedidosCliente = result.pedidoPorClienteList;
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
              scope.listarPedidosCliente();
            }

         scope.OnloadDetail();
        }
    ]);