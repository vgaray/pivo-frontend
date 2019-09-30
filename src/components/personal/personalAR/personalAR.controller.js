"use strict";

angular.module('personal')
    .controller('personalARController',
        ['personalService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (personalService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
                debugger;
                var scope = this;
                scope.varnab = $location.search();
                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                }
                scope.comboTipoDocumento =
                    [
                        { idTipoDocumento: 1, noAbreviatura: "DNI" },
                        { idTipoDocumento: 2, noAbreviatura: "NIE" }
                    ]
                scope.comboGrupoOcupacional =
                    [
                        { idGrupoOcupacional: 1, noGrupoOcupacional: "Especialista en Cardiología / Personal Veterinario" },
                        { idGrupoOcupacional: 2, noGrupoOcupacional: "Especialista en Reumatología / Personal Veterinario" },
                        { idGrupoOcupacional: 3, noGrupoOcupacional: "Especialista en Neurología / Personal Veterinario" },
                        { idGrupoOcupacional: 4, noGrupoOcupacional: "Chofer delivery de mascota / Personal Móvil" },
                        { idGrupoOcupacional: 5, noGrupoOcupacional: "Motorizado / Personal Móvil" }
                    ]
                scope.frmData = {
                    name_page_title: "Personal",
                    name_content: "",
                    Personal: {
                        registrarActualizar:
                            {
                                request: {
                                    personal: {
                                        idPersonal: "",
                                        noPersonal: "",
                                        noApePat: "",
                                        noApeMat: "",
                                        noAbreviatura: null,
                                        nuDocumento: "",
                                        noDireccion: "",
                                        nuTelefono: "",
                                        nuCelular: "",
                                        noCorreo: "",
                                        nuCmvp: "",
                                        noGrupoOcupacional: null,
                                        idTipoDocumento: null,
                                        idGrupoOcupacional: null,
                                        ilActivo: true
                                    }
                                },
                            },
                        listar: {
                            request: {
                                pIdPersonal: dataModal.idPersonal,
                                pTiFun: 1,
                            }
                        }
                    }
                }
                scope.patronDocumento = "";
                scope.combochangeDocumento = function (value) {
                    ;
                    scope.frmData.Personal.registrarActualizar.request.personal.idTipoDocumento = value.idTipoDocumento;
                    scope.frmData.Personal.registrarActualizar.request.personal.noAbreviatura = value.noAbreviatura;
                    if (scope.frmData.Personal.registrarActualizar.request.personal.idTipoDocumento == 1) {
                        scope.patronDocumento = "^([0-9]{8})$";
                    } if(scope.frmData.Personal.registrarActualizar.request.personal.idTipoDocumento == 2) {
                        scope.patronDocumento = "^(Z[0-9]{7})$";
                    }
                }
                scope.combochangeGrupoOcupacional = function (value) {
                    scope.frmData.Personal.registrarActualizar.request.personal.idGrupoOcupacional = value.idGrupoOcupacional;
                    scope.frmData.Personal.registrarActualizar.request.personal.noGrupoOcupacional = value.noGrupoOcupacional;
                }
                scope.raPersonal = function () {
                    var raPersonalPromise = new Promise((resolve, reject) => {
                        if (dataModal.idPersonal == null) {
                            resolve("registra");
                        } else {
                            reject("actualiza");
                        }
                    });
                    raPersonalPromise
                        .then((message) => {
                            personalService.registrar(scope.dataInfo).post({}, scope.frmData.Personal.registrarActualizar.request, function (result) {
                                if (result.estado == 1) {
                                    toastr.remove();
                                    toastr.success('Inserción exitosa', 'Acción realizada', viewConfig.toastConfig);
                                    scope.cancel();
                                } else if (result.estado == -1 || result.estado == 0) {
                                    toastr.remove();
                                    toastr.warning(result.mensaje, 'Advertencia', viewConfig.toastConfig);
                                }
                            }, function (error) {
                                toastr.remove();
                                toastr.error('Error de servidor', 'Error', viewConfig.toastConfig);
                            });
                        })
                        .catch((message) => {
                            personalService.actualizar(scope.dataInfo).post({}, scope.frmData.Personal.registrarActualizar.request, function (result) {
                                if (result.estado == 1) {
                                    toastr.remove();
                                    toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);
                                    scope.cancel();
                                } else if (result.estado == -1 || result.estado == 0) {
                                    toastr.remove();
                                    toastr.warning(result.mensaje, 'Advertencia', viewConfig.toastConfig);
                                }
                            }, function (error) {
                                toastr.remove();
                                toastr.error('Error de servidor', 'Advertencia', viewConfig.toastConfig);
                            });
                        });
                }
                scope.lsPersonalConsultado = [];
                scope.comboNombreTipoDocumento = "";
                scope.comboNombreGrupoOcupacional = "";
                scope.comboTipoProfesional = "";
                scope.cargaDatos = function () {
                    personalService.listar(scope.dataInfo).post({}, scope.frmData.Personal.listar.request, function (result) {
                        if (result.estado == 1) {
                            scope.lsPersonalConsultado = result.lsPersonal;
                            scope.frmData.Personal.registrarActualizar.request.personal.idPersonal = scope.lsPersonalConsultado[0].idPersonal;
                            scope.frmData.Personal.registrarActualizar.request.personal.noPersonal = scope.lsPersonalConsultado[0].noPersonal;
                            scope.frmData.Personal.registrarActualizar.request.personal.noApePat = scope.lsPersonalConsultado[0].noApePat;
                            scope.frmData.Personal.registrarActualizar.request.personal.noApeMat = scope.lsPersonalConsultado[0].noApeMat;
                            scope.frmData.Personal.registrarActualizar.request.personal.nuDocumento = scope.lsPersonalConsultado[0].nuDocumento;
                            scope.frmData.Personal.registrarActualizar.request.personal.noDireccion = scope.lsPersonalConsultado[0].noDireccion;
                            scope.frmData.Personal.registrarActualizar.request.personal.nuTelefono = scope.lsPersonalConsultado[0].nuTelefono;
                            scope.frmData.Personal.registrarActualizar.request.personal.nuCelular = scope.lsPersonalConsultado[0].nuCelular;
                            scope.frmData.Personal.registrarActualizar.request.personal.noCorreo = scope.lsPersonalConsultado[0].noCorreo;
                            scope.frmData.Personal.registrarActualizar.request.personal.nuCmvp = scope.lsPersonalConsultado[0].nuCmvp;
                            scope.frmData.Personal.registrarActualizar.request.personal.noAbreviatura = scope.lsPersonalConsultado[0].noAbreviatura;
                            scope.frmData.Personal.registrarActualizar.request.personal.noGrupoOcupacional = scope.lsPersonalConsultado[0].noGrupoOcupacional;
                            scope.frmData.Personal.registrarActualizar.request.personal.idTipoDocumento = scope.lsPersonalConsultado[0].idTipoDocumento;
                            scope.frmData.Personal.registrarActualizar.request.personal.idGrupoOcupacional = scope.lsPersonalConsultado[0].idGrupoOcupacional;
                            scope.frmData.Personal.registrarActualizar.request.personal.ilActivo = scope.lsPersonalConsultado[0].ilActivo;
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
                scope.ilActivo = true;
                scope.OnloadRa = function () {
                    if (dataModal.idPersonal == null) {
                        scope.frmData.name_content = "Registrar Personal";
                        scope.ilActivo = false;
                    } else {
                        scope.frmData.name_content = "Actualizar Personal";
                        scope.ilActivo = true;
                        scope.cargaDatos();
                    }
                }
                scope.OnloadRa();
            }
        ]);






