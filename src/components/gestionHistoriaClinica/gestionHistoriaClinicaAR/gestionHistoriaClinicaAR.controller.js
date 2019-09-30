"use strict";

angular.module('historiaClinicaService')
    .controller('historiaClinicaServiceARController',
        ['historiaClinicaService', 'mascotaService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (historiaClinicaService, mascotaService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
                var scope = this;
                scope.varnab = $location.search();
                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: "G2+70T286iM="
                }
                scope.comboEstadoReproductivo =
                    [
                        { idEstadoReproductivo: 0, noNombreEstadoReproductivo: "Por Definir" },
                        { idEstadoReproductivo: 1, noNombreEstadoReproductivo: "Castrado" },
                        { idEstadoReproductivo: 2, noNombreEstadoReproductivo: "Gestación" },
                        { idEstadoReproductivo: 3, noNombreEstadoReproductivo: "Entero" }
                    ]

                scope.frmData = {
                    name_page_title: "Servicio de Historial Clínico de la Mascota : " + dataModal.noNombre,
                    name_content: "",
                    HistoriaClinica: {
                        registrarActualizar:
                        {
                            request: {
                                ConstanteFisiologica: {
                                    idConstanteFisiologica: null,
                                    peso: "0.0",
                                    pulso: "0.0",
                                    temperatura: "0.0",
                                    feRegistro: "",
                                    idHistoriaClinica: "",
                                    idUnidad: ""
                                },
                                ListadoProblema: {
                                    idListadoProblema: null,
                                    noProblema: "",
                                    noDescripcion: "",
                                    idTipoProblema: null,
                                    noTipoProblema: "",
                                    feRegistro: "",
                                    idHistoriaClinica: null
                                },
                                Vacuna: {
                                    idVacuna: null,
                                    noNombre: "",
                                    noDescripcion: "",
                                    idTipoVacuna: null,
                                    noTipoVacuna: "",
                                    feRegistro: "",
                                    feAplicado: "",
                                    ilAplicado: null,
                                    idHistoriaClinica: null
                                },

                            },
                        },
                        listar: {
                            request: {
                                pIdMascota: dataModal.idMascota,
                                pNoPass: "",
                                pTiFun: 1,
                            }
                        },
                        listarCF: {
                            request: {
                                pIdMascota: dataModal.idMascota,
                                pNuChip: dataModal.nuChip,
                                pNoPass: "",
                                pTiFun: 1
                                //pidInstancia:180
                            }
                        }
                    }
                }
                scope.patronDocumento = "";
                scope.combochangeReproductivo = function (value) {
                    ;
                    scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idEstadoReproductivo = value.idEstadoReproductivo;
                    scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noNombreEstadoReproductivo = value.noNombreEstadoReproductivo;
                }
                scope.combochangeAlimentacion = function (value) {
                    scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idTipoAlimentacion = value.idTipoAlimentacion;
                    scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noDescripcionTipoAlimentacion = value.noDescripcionTipoAlimentacion;
                }

                scope.raHistoriaClinica = function () {
                    var raHistoriaClinicaPromise = new Promise((resolve, reject) => {
                        if (dataModal.idMascota == null) {
                            resolve("registra");
                        } else {
                            reject("actualiza");
                        }
                    });
                    raHistoriaClinicaPromise
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
                            ;
                            historiaClinicaService.actualizar(scope.dataInfo).post({}, scope.frmData.HistoriaClinica.registrarActualizar.request, function (result) {
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
                scope.lsHistoriaClinicaConsultada = [];
                scope.comboNombreTipoDocumento = "";
                scope.comboTipoProfesional = "";
                scope.cargaDatos = function () {
                    debugger;
                    historiaClinicaService.listar(scope.dataInfo).post({}, scope.frmData.HistoriaClinica.listarCF.request, function (result) {
                        if (result.estado == 1) {
                            if (result.lsHistoriaClinica.length == 0) {
                                scope.ilActivo = false;
                                toastr.remove();
                                toastr.warning("Contraseña Incorrecta", "Acción realizada", viewConfig.toastConfig);
                            } else {
                                scope.ilActivo = true;
                                scope.listarContantesFisiologicas();

                            }
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
                scope.showFirstTab = function () {
                    angular.element('[data-target="#tab1"]').tab('show');
                }
                scope.listarContantesFisiologicas = function () {
                    scope.tab1 = true;
                    scope.tab2 = false;
                    scope.tab3 = false;
                    historiaClinicaService.listarServiceCF(scope.dataInfo).post({}, scope.frmData.HistoriaClinica.listarCF.request, function (result) {
                        if (result.estado == 1) {
                            if (result.lsConstante.length == 0) {
                                toastr.remove();
                                toastr.warning("Constante Fisiologica vacío", "Acción realizada", viewConfig.toastConfig);
                            } else {
                                scope.ilActivo = true;
                                scope.lsHistoriaClinicaCF = result.lsConstante;
                                // scope.frmData.historiaClinica.registrarActualizar.request.ConstanteFisiologica.idConstanteFisiologica = scope.lsHistoriaClinicaCF.idConstanteFisiologica;
                            }
                        } else if (result.estado == -1 || result.estado == 0) {
                            console.error('Error: ' + result.mensaje);
                        }
                    }, function (error) {
                        console.error('Error: ' + error);
                    });
                }
                scope.listarProblemas = function () {
                    scope.tab1 = false;
                    scope.tab2 = true;
                    scope.tab3 = false;
                    debugger;
                    historiaClinicaService.listarServiceLP(scope.dataInfo).post({}, scope.frmData.HistoriaClinica.listarCF.request, function (result) {
                        debugger;
                        if (result.estado == 1) {
                            if (result.lsListadoProblema.length == 0) {
                                toastr.remove();
                                toastr.warning("Listado de problemas vacío", "Acción realizada", viewConfig.toastConfig);
                            } else {
                                scope.ilActivo = true;
                                scope.lsHistoriaClinicaLP = result.lsListadoProblema;
                                /*
                                feRegistro: "2019-09-14"
                                idHistoriaClinica: 7
                                idListadoProblema: 1
                                idTipoProblema: 1
                                noDescripcion: "fue atropellado"
                                noProblema: "lesion"
                                noTipoProblema: "cronico"
                                */
                                // scope.frmData.historiaClinica.registrarActualizar.request.ConstanteFisiologica.idConstanteFisiologica = scope.lsHistoriaClinicaCF.idConstanteFisiologica;
                            }
                        } else if (result.estado == -1 || result.estado == 0) {
                            console.error('Error: ' + result.mensaje);
                        }
                    }, function (error) {
                        console.error('Error: ' + error);
                    });
                }
                scope.listarVacunas = function () {
                    scope.tab1 = false;
                    scope.tab2 = false;
                    scope.tab3 = true;
                    historiaClinicaService.listarServiceV(scope.dataInfo).post({}, scope.frmData.HistoriaClinica.listarCF.request, function (result) {
                        debugger;
                        if (result.estado == 1) {
                            if (result.lsVacuna.length == 0) {
                                toastr.remove();
                                toastr.warning("Listado de vacunas vacío", "Acción realizada", viewConfig.toastConfig);
                            } else {
                                scope.ilActivo = true;
                                scope.lsHistoriaClinicaV = result.lsVacuna;
                                /*feRegistro: "2019-09-25"
                                idHistoriaClinica: 14
                                idTipoVacuna: 1
                                idVacuna: 2
                                ilAplicado: false
                                noDescripcion: "prevencion tbc"
                                noNombre: "tbc"
                                noTipoVacuna: "desparasitacion"*/
                            }
                        } else if (result.estado == -1 || result.estado == 0) {
                            console.error('Error: ' + result.mensaje);
                        }
                    }, function (error) {
                        console.error('Error: ' + error);
                    });
                }
                scope.OnloadRa = function () {

                    scope.tab1 = true;
                    scope.tab2 = false;
                    scope.tab3 = false;
                    if (dataModal.idMascota == null) {
                        scope.frmData.name_content = "";
                        scope.ilActivo = false;
                    } else {
                        scope.frmData.name_content = "Historia Clinica";
                        scope.ilActivo = false;
                    }

                }

                scope.OnloadRa();
            }
        ]);






