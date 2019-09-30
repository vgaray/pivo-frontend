"use strict";

angular.module('gestionMascotas')
    .controller('historiaClinicaARController',
        ['historiaClinicaService', 'mascotaService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (historiaClinicaService, mascotaService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
                var scope = this;
                scope.varnab = $location.search();
                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                }
                scope.comboEstadoReproductivo =
                    [
                        { idEstadoReproductivo: 0, noNombreEstadoReproductivo: "Por Definir" },
                        { idEstadoReproductivo: 1, noNombreEstadoReproductivo: "Castrado" },
                        { idEstadoReproductivo: 2, noNombreEstadoReproductivo: "Gestación" },
                        { idEstadoReproductivo: 3, noNombreEstadoReproductivo: "Entero" }
                    ]

                scope.frmData = {
                    name_page_title: "Historial Clínica de la Mascota : " + dataModal.noNombre,
                    name_content: "",
                    HistoriaClinica: {
                        registrarActualizar:
                        {
                            request: {
                                historiaClinica: {
                                    idHistoriaClinica: null,
                                    idMascota: dataModal.idMascota,
                                    noAlergias: "",
                                    noAntFamiliares: "",
                                    idTipoAlimentacion: "",
                                    idEstadoReproductivo: "",
                                }
                            },
                        },
                        listar: {
                            request: {
                                pIdMascota: dataModal.idMascota,
                                pNoPass: "",
                                pTiFun: 1,
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
                    historiaClinicaService.listar(scope.dataInfo).post({}, scope.frmData.HistoriaClinica.listar.request, function (result) {
                        if (result.estado == 1) {
                            if (result.lsHistoriaClinica.length == 0) {
                                scope.ilActivo = false;
                                toastr.remove();
                                toastr.warning("Contraseña Incorrecta", "Acción realizada", viewConfig.toastConfig);
                            } else {
                                scope.ilActivo = true;
                                scope.lsHistoriaClinicaConsultada = result.lsHistoriaClinica;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idHistoriaClinica = scope.lsHistoriaClinicaConsultada[0].idHistoriaClinica;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idEstadoReproductivo = scope.lsHistoriaClinicaConsultada[0].idEstadoReproductivo;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idMascota = scope.lsHistoriaClinicaConsultada[0].idMascota;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noAlergias = scope.lsHistoriaClinicaConsultada[0].noAlergias;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noAntFamiliares = scope.lsHistoriaClinicaConsultada[0].noAntFamiliares;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noTipoAlimentacion = scope.lsHistoriaClinicaConsultada[0].noTipoAlimentacion;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noNombreEstadoReproductivo = "por asignar"//scope.lsHistoriaClinicaConsultada[0].noNombreEstadoReproductivo;
                                scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noNombre = scope.lsHistoriaClinicaConsultada[0].noNombre;
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

                scope.showTab1 = function () {
                    scope.tab1 = true;
                    scope.tab2 = false;
                    scope.tab3 = false;
                }
                scope.showTab2 = function () {
                    scope.tab1 = false;
                    scope.tab2 = true;
                    scope.tab3 = false;
                }
                scope.showTab3 = function () {
                    scope.tab1 = false;
                    scope.tab2 = false;
                    scope.tab3 = true;
                }
                scope.ilActivo = true;
                scope.showFirstTab = function () {
                    angular.element('[data-target="#tab1"]').tab('show');
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
                        //scope.cargaDatos();
                    }
                    angular.element('[data-target="#tab1"]').tab('show');
                }
                scope.OnloadRa();
            }
        ]);






