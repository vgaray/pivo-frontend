"use strict";

angular.module('mascotas')
    .controller('mascotaARController',
        ['mascotaService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (mascotaService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
                var scope = this;
                scope.varnab = $location.search();
                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                }
                scope.comboTipoSexo =
                    [
                        { idTipoSexo: 1, noSexo: "Macho" },
                        { idTipoSexo: 2, noSexo: "Hembra" }
                    ]
                scope.comboEspecie =
                    [
                        { idEspecie: 1, noEspecie: "Canino" },
                        { idEspecie: 2, noEspecie: "Felino" },
                        { idEspecie: 3, noEspecie: "Arácnido" },
                        { idEspecie: 4, noEspecie: "Anfibio" },
                        { idEspecie: 5, noEspecie: "Reptil" }
                    ]
                scope.comboRaza =
                    [
                        { idRaza: 1, noRaza: "Chino" },
                        { idRaza: 2, noRaza: "Beagle" },
                        { idRaza: 3, noRaza: "Egipcia" },
                        { idRaza: 4, noRaza: "Alemán" },
                    ]
                scope.frmData = {
                    name_page_title: "Mascota",
                    name_content: "",
                    Mascota: {
                        registrarActualizar:
                            {
                                request: {
                                    mascota: {
                                        idMascota: "",
                                        noNombre: "",
                                        noColor: "",
                                        noSeniasParticulares: "",
                                        noSexo: null,
                                        nuEdad: "",
                                        nuChip: null,
                                        feNacimiento: "",
                                        codUsuario: scope.dataInfo.codUsuario,
                                        idEspecie: "",
                                        idRaza: "",
                                    }
                                },
                            },
                        listar: {
                            request: {
                                pIdMascota: dataModal.idMascota,
                                pCodUsuario: null,
                                pNuChip:null,
                                pTiFun:0
                            }
                        }
                    }
                }
                scope.patronDocumento = "";
                scope.combochangeRaza = function (value) {
                    scope.frmData.Mascota.registrarActualizar.request.mascota.idRaza = value.idRaza;
                    scope.frmData.Mascota.registrarActualizar.request.mascota.noRaza = value.noRaza;
                }
                scope.combochangeEspecie = function (value) {
                    scope.frmData.Mascota.registrarActualizar.request.mascota.idEspecie = value.idEspecie;
                    scope.frmData.Mascota.registrarActualizar.request.mascota.noEspecie = value.noEspecie;
                }
                scope.combochangeSexo = function (value) {
                    scope.frmData.Mascota.registrarActualizar.request.mascota.noSexo = value.noSexo;
                }
                scope.raMascota = function () {
                    var raMascotaPromise = new Promise((resolve, reject) => {
                        if (dataModal.idMascota == null) {
                            resolve("registra");
                        } else {
                            reject("actualiza");
                        }
                    });
                    raMascotaPromise
                        .then((message) => {
                            ;
                            mascotaService.registrar(scope.dataInfo).post({}, scope.frmData.Mascota.registrarActualizar.request, function (result) {
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
                            mascotaService.actualizar(scope.dataInfo).post({}, scope.frmData.Mascota.registrarActualizar.request, function (result) {
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
                scope.lsMascotaConsultada = [];
                scope.comboNombreTipoDocumento = "";
                scope.comboNombreGrupoOcupacional = "";
                scope.comboTipoProfesional = "";
                scope.cargaDatos = function () {
                    ;
                    mascotaService.listar(scope.dataInfo).post({}, scope.frmData.Mascota.listar.request, function (result) {
                        if (result.estado == 1) {
debugger;
                            scope.lsMascotaConsultada = result.lsMascota;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.idMascota = scope.lsMascotaConsultada[0].idMascota;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.noNombre = scope.lsMascotaConsultada[0].noNombre;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.noEspecie = scope.lsMascotaConsultada[0].noEspecie;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.noRaza = scope.lsMascotaConsultada[0].noRaza;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.noColor = scope.lsMascotaConsultada[0].noColor;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.noSeniasParticulares = scope.lsMascotaConsultada[0].noSeniasParticulares;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.noSexo = scope.lsMascotaConsultada[0].noSexo;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.nuEdad = scope.lsMascotaConsultada[0].nuEdad;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.nuChip = scope.lsMascotaConsultada[0].nuChip;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.feNacimiento = scope.lsMascotaConsultada[0].feNacimiento;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.noDuenio = scope.lsMascotaConsultada[0].noDuenio;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.idEspecie = scope.lsMascotaConsultada[0].idEspecie;
                            scope.frmData.Mascota.registrarActualizar.request.mascota.idRaza = scope.lsMascotaConsultada[0].idRaza;
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
                    if (dataModal.idMascota == null) {
                        scope.frmData.name_content = "Registrar Mascota";
                        scope.ilActivo = false;
                    } else {
                        scope.frmData.name_content = "Actualizar Mascota";
                        scope.ilActivo = true;
                        scope.cargaDatos();
                    }
                }
                scope.OnloadRa();
            }
        ]);






