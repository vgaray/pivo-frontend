angular.module('centralExterna')
    .controller('centralExternaSaveController', [
        '$location', '$log', 'centralExternaService', '$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService',
        function($location, $log, centralExternaService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            scope.frmData = {
                nameModal: dataModal.title,
                central: {
                    entity: {
                        idEmpresa: dataModal.response.central.idEmpresa,
                        pNoDescrip: dataModal.response.central.noDescrip,
                        pNoEmpresa: dataModal.response.central.noEmpresa,
                        pNuIpEmpr: dataModal.response.central.nuIpEmpr
                    },
                    save: {
                        request: {}
                    },
                    validaIP: {
                        request: {
                            pNuIp: ""
                        }
                    },
                    temporal: {
                        direccionIP: ""
                    }
                }
            }
            //Registrar
            scope.onSaveCentral = function() {
                scope.saveCentral(function(centralSaved) {
                    $uibModalInstance.close(centralSaved);
                });
            }

            scope.matchingSaveCentralRequest = function() {
                scope.frmData.central.save.request.idEmpresa = scope.frmData.central.entity.idEmpresa;
                scope.frmData.central.save.request.pNoDescrip = scope.frmData.central.entity.pNoDescrip;
                scope.frmData.central.save.request.pNoEmpresa = scope.frmData.central.entity.pNoEmpresa;
                scope.frmData.central.save.request.pNuIpEmpr = scope.frmData.central.entity.pNuIpEmpr;
                if (scope.frmData.central.save.request.pNoEmpresa == null || scope.frmData.central.save.request.pNuIpEmpr == null ||
                    scope.frmData.central.save.request.pNoEmpresa == "" || scope.frmData.central.save.request.pNuIpEmpr == "") {
                    scope.validaNu = 0;
                } else {
                    scope.validaNu = 1;
                }
            }
            scope.saveCentral = function(dismissModalCallback) {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {
                    scope.matchingSaveCentralRequest();
                    if (dataModal.whatOperation == utilService.operation.add) {
                        if (scope.validaNu == 1) {
                            centralExternaService.ingresarCentralExterna(scope.dataInfo).post({}, scope.frmData.central.save.request, function(result) {
                                if (result.estado == 1) {
                                    dismissModalCallback(scope.frmData.central.save.request);
                                    toastr.remove();
                                    toastr.success('Creada Correctamente', 'Central Externa', viewConfig.toastConfig);

                                } else if (result.estado == 0 || result.estado == -1) {
                                    toastr.remove();
                                    toastr.error(result.mensaje, 'Central Externa', viewConfig.toastConfig);
                                }
                            },
                            function(error) {
                                console.error('Error: ' + error);
                            });
                        } else if (scope.validaNu == 0) {
                            $uibModalInstance.close();
                            toastr.remove();
                            toastr.error('No se pudo registro la central externa', 'Error', viewConfig.toastConfig);

                        }
                    } else if (dataModal.whatOperation == utilService.operation.update) {
                        if (scope.validaNu == 1) {
                            centralExternaService.EditarCentralExterna(scope.dataInfo).post({}, scope.frmData.central.save.request, function(result) {
                                    if (result.estado == 1) {
                                        dismissModalCallback(scope.frmData.central.save.request);
                                        toastr.remove();
                                        toastr.success('Guardada Correctamente', 'Central Externa', viewConfig.toastConfig);

                                    } else if (result.estado == 0 || result.estado == -1) {
                                        toastr.remove();
                                        toastr.error('Hay errores en el formulario', 'Error', viewConfig.toastConfig);
                                        dismissModalCallback(null);
                                    }
                                },
                                function(error) {
                                    console.error('Error: ' + error);
                                });
                        } else if (scope.validaNu == 0) {
                            $uibModalInstance.close();
                            toastr.remove();
                            toastr.error('No se pudo registro la central externa', 'Error', viewConfig.toastConfig);

                        }
                    }
                }
            }
            //Validar si una ip ya esta siendo usada
            scope.inMen = false;
            scope.validarIp = function() {
                scope.lsresulDireccionIP = [];

                scope.frmData.central.validaIP.request.pNuIp = scope.frmData.central.entity.pNuIpEmpr;
                centralExternaService.ValidarIp(scope.dataInfo).post({}, scope.frmData.central.validaIP.request, function(result) {
                        scope.lsresulDireccionIP = result.listIpCentralExterna;
                        scope.codigoRe = scope.lsresulDireccionIP[0].idRasult;
                        if (dataModal.whatOperation == utilService.operation.add) {
                            if (scope.codigoRe == 1) {
                                scope.mensajeIP = "";
                                scope.desVa = 1;
                                scope.inMen = true;
                            } else if (scope.codigoRe == 0) {
                                scope.mensajeIP = "*" + scope.lsresulDireccionIP[0].mensaje;
                                scope.desVa = 0;
                                scope.inMen = false;
                            }
                        } else if (dataModal.whatOperation == utilService.operation.update) {
                            if (scope.codigoRe == 1) {
                                scope.mensajeIP = "";
                                scope.desVa = 1;
                                scope.inMen = true;
                            } else if (scope.codigoRe == 0) {
                                if (scope.frmData.central.validaIP.request.pNuIp == scope.frmData.central.temporal.direccionIP) {
                                    scope.mensajeIP = "";
                                    scope.desVa = 1;
                                    scope.inMen = true;
                                } else if (scope.frmData.central.validaIP.request.pNuIp != scope.frmData.central.temporal.direccionIP) {
                                    scope.mensajeIP = "*" + scope.lsresulDireccionIP[0].mensaje;
                                    scope.desVa = 0;
                                    scope.inMen = false;
                                }
                            }
                        }
                    },
                    function(error) {
                        console.error('Error: ' + error);
                    });
            }
            //Metodo para cerrar el modal
            scope.cancel = function() {
                $uibModalInstance.close();
            }
            //Inicia el modal
            scope.onloadPage = function() {
                scope.frmData.central.temporal.direccionIP = scope.frmData.central.entity.pNuIpEmpr;
            }
            scope.onloadPage();

        }
    ]);
