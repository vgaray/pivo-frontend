"use strict";

angular.module('cliente')
    .controller('clienteDetalleController',
    ['clienteService', 'localStorageService', '$uibModalInstance', '$location', 'idRecibido','estadorecibido',
        function (clienteService, localStorageService, $uibModalInstance, $location, idRecibido,estadorecibido) {
            var scope = this;

            scope.dataInfo =
                {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                }

            scope.frmData = {
                name_page_title: "Detalle",
                content: "Datos de Contacto",
                Cliente: {
                    listar:
                    {
                        request: {
                            pIdCliente: idRecibido,
                            pNoRazon: null,
                            pNudocide: null,
                            pEstado: estadorecibido
                        },
                        response: {
                            idCliente: 0,
                            noRazonSocial: "",
                            ruc: "",
                            nuDocIde: "",
                            direcc: "",
                            telef: "",
                            correoEle: "",
                            personRef: "",
                            estado: false,
                            idTipdoc: 0,
                            nuDocumentoPref: "",
                            idTipdocPref: 0,
                            nuCelularPref: "",
                            nuFijoPref: ""
                        }
                    }
                }
            }

            scope.setTipo = function (valor) {
                if (valor == 1) {
                    return "ruc" + valor;
                }
                if (valor == 2) {
                    return "dni" + valor;
                }
            }

            scope.lsClienteConsultado = [];
            scope.listarDetalle = function () {
                clienteService.listaCliente(scope.dataInfo).post({}, scope.frmData.Cliente.listar.request, function (result) {
                    if (result.estado == 1) {
                        scope.lsClienteConsultado = result.lsClientesN;
                        scope.frmData.Cliente.listar.request.pIdCliente = null;

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
                scope.listarDetalle();
            }

            scope.OnloadDetail();
        }
    ]);