"use strict";

angular.module('mascotas')
    .controller('verHistoriaClinicaController',
        ['historiaClinicaService', 'mascotaService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (historiaClinicaService, mascotaService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
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
                                pTiFun: 0,
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
                scope.lsHistoriaClinicaConsultada = [];
                scope.comboNombreTipoDocumento = "";
                scope.comboNombreGrupoOcupacional = "";
                scope.comboTipoProfesional = "";
                scope.cargaDatos = function () {
                    ;
                    historiaClinicaService.listar(scope.dataInfo).post({}, scope.frmData.HistoriaClinica.listar.request, function (result) {
                        debugger;
                        if (result.estado == 1) {
                            scope.lsHistoriaClinicaConsultada = result.lsHistoriaClinica;
                            debugger;
                            //noNombreEstadoReproductivo
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idEstadoReproductivo = scope.lsHistoriaClinicaConsultada[0].idEstadoReproductivo;
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idTipoAlimentacion = scope.lsHistoriaClinicaConsultada[0].idTipoAlimentacion;
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.idMascota = scope.lsHistoriaClinicaConsultada[0].idMascota;
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noAlergias = scope.lsHistoriaClinicaConsultada[0].noAlergias;
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noAntFamiliares = scope.lsHistoriaClinicaConsultada[0].noAntFamiliares;
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noDescripcionTipoAlimentacion = scope.lsHistoriaClinicaConsultada[0].noTipoAlimentacion;
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noNombreEstadoReproductivo = scope.lsHistoriaClinicaConsultada[0].noNombreEstadoReproductivo;
                            scope.frmData.HistoriaClinica.registrarActualizar.request.historiaClinica.noNombreMascota = scope.lsHistoriaClinicaConsultada[0].noNombre;
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
                    
                    ;
                    if (dataModal.idMascota == null) {
                        scope.frmData.name_content = "Registrar Mascota";
                        scope.ilActivo = false;
                    } else {
                        scope.frmData.name_content = "Detalle";
                        scope.ilActivo = true;
                        scope.cargaDatos();
                    }
                }
                scope.OnloadRa();
            }
        ]);






