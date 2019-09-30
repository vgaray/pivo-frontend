"use strict";

angular.module('cliente')
    .controller('clienteRAController',
    ['clienteService', 'localStorageService', '$uibModalInstance', '$location', 'idRecibido', 'estadorecibido', 'viewConfig',
        function (clienteService, localStorageService, $uibModalInstance, $location, idRecibido, estadorecibido, viewConfig) {
            var scope = this
            scope.itemComboConstantsEmpresa =
                [
                    { idTipdoc: 1, noTipo: "DNI" },
                    { idTipdoc: 2, noTipo: "RUC" }
                ];
            scope.itemComboConstantsReferente =
                [
                    { idTipdoc: 1, noTipo: "DNI" },
                    { idTipdoc: 2, noTipo: "RUC" }
                ];
            scope.dataInfo =
                {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                }
            scope.lsClienteConsultado = [];
            scope.comborecentEmpresa = "";
            scope.comborecentReferente = "";
            scope.cargaDatos = function () {
                clienteService.listaCliente(scope.dataInfo).post({}, scope.frmData.Cliente.registrarActualizar.requestListar, function (result) {
                    if (result.estado == 1) {
                        scope.lsClienteConsultado = result.lsClientesN;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.noRazonSocial = scope.lsClienteConsultado[0].noRazonSocial;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.nuDocIde = scope.lsClienteConsultado[0].ruc;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.direcc = scope.lsClienteConsultado[0].direcc;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.telef = scope.lsClienteConsultado[0].telef;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.correoEle = scope.lsClienteConsultado[0].correoEle;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.personRef = scope.lsClienteConsultado[0].personRef;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.estado = scope.lsClienteConsultado[0].estado;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.idTipdoc = scope.lsClienteConsultado[0].idTipdoc;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.nuDocumentoPref = scope.lsClienteConsultado[0].nuDocumentoPref;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.idTipdocPref = scope.lsClienteConsultado[0].idTipdocPref;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.nuCelularPref = scope.lsClienteConsultado[0].nuCelularPref;
                        scope.frmData.Cliente.registrarActualizar.request.clienteN.nuFijoPref = scope.lsClienteConsultado[0].nuFijoPref;
                        scope.comborecentEmpresa = scope.lsClienteConsultado[0].noTipo;
                        scope.comborecentReferente = scope.lsClienteConsultado[0].noTipoRef;
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }

            scope.frmData = {
                name_page_title: "",
                contentCliente: "Datos: Cliente",
                contentReferencia: "Datos: Persona de Referencia",
                Cliente: {
                    registrarActualizar:
                    {
                        request: {
                            clienteN: {
                                idCliente: idRecibido,
                                noRazonSocial: "",
                                nuDocIde: "",
                                direcc: "",
                                telef: "",
                                correoEle: "",
                                personRef: "",
                                estado: true,
                                idTipdoc: 1,
                                nuDocumentoPref: "",
                                idTipdocPref: 1,
                                nuCelularPref: "",
                                nuFijoPref: ""
                            }
                        },
                        requestListar: {
                            pIdCliente: idRecibido,
                            pNoRazon: null,
                            pNudocide: null,
                            pEstado: estadorecibido
                        },
                    },
                }
            }
            scope.combochangeEmpresa = function (value) {
                scope.frmData.Cliente.registrarActualizar.request.clienteN.idTipdoc = value.idTipdoc;
            }
            scope.combochangeReferente = function (value) {
                scope.frmData.Cliente.registrarActualizar.request.clienteN.idTipdocPref = value.idTipdoc;
            }
            scope.raCliente = function () {
                var raClientePromise = new Promise((resolve, reject) => {
                    if (idRecibido == null) {
                        resolve("registra");
                    } else {
                        reject("actualiza");
                    }
                });
                raClientePromise
                    .then((message) => {
                        clienteService.registraCliente(scope.dataInfo).post({}, scope.frmData.Cliente.registrarActualizar.request, function (result) {
                            if (result.estado == 1) {
                                toastr.remove();
                                toastr.success('Inserción exitosa', 'Acción realizada', viewConfig.toastConfig);
                                scope.cancel();
                            } else if (result.estado == -1 || result.estado == 0) {
                                console.error('Error1: ' + result.mensaje);
                                toastr.remove();
                                toastr.error('Ruc o Razon social Existente', 'Error', viewConfig.toastConfig);
                            }
                            console.log("mensaje promise:" + message);
                        }, function (error) {
                            console.error('Error: ' + error);
                            toastr.remove();
                            toastr.error('Ruc o Razon social Existente', 'Error', viewConfig.toastConfig);
                            reject("procede a actualizar");
                        });
                        console.log("mensaje promise:" + message);
                    })
                    .catch((message) => {
                        clienteService.actualizaCliente(scope.dataInfo).post({}, scope.frmData.Cliente.registrarActualizar.request, function (result) {
                            if (result.estado == 1) {
                                idRecibido = null;
                                toastr.remove();
                                toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);
                                scope.cancel();
                            } else if (result.estado == -1 || result.estado == 0) {
                                console.error('Error: ' + result.mensaje);
                                toastr.remove();
                                toastr.error('Ruc o Razon social Existente', 'Error', viewConfig.toastConfig);
                            }
                            console.log("mensaje promise:" + message);
                        }, function (error) {
                            toastr.remove();
                            toastr.error('Ruc o Razon social Existente', 'Error', viewConfig.toastConfig);
                        });
                    });
            }
            scope.cancel = function () {
                $uibModalInstance.close();
            }

            scope.OnloadRa = function () {
                if (idRecibido == null) {
                    scope.frmData.name_page_title = "Registrar Cliente";
                } else {
                    scope.frmData.name_page_title = "Actualizar Cliente";
                    scope.cargaDatos();
                }
            }

            scope.OnloadRa();
        }
    ]);






