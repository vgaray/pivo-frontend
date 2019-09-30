
angular.module('gestionMascotas')
    .controller('gestionMascotasARController',
        ['mascotaService', 'historiaClinicaService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig', '$scope', '$filter',
            function (mascotaService, historiaClinicaService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig, $scope, $filter) {
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
                                    codUsuario: "",
                                    idEspecie: "",
                                    idRaza: "",
                                    imagen: {
                                        nombre: "",
                                        ruta: "",
                                        base64: ""
                                    }
                                }
                            },
                        },
                        listar: {
                            request: {
                                pIdMascota: dataModal.idMascota,
                                pCodUsuario: null,
                                pNuChip: null,
                                pTiFun: 0
                            }
                        },
                        listarHC: {
                            request: {
                                pIdMascota: dataModal.idMascota,
                                pNoPass: "",
                                pTiFun: 1,
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
                scope.varhabi = 0;
                scope.validateDateini = function () {
                    scope.varhabi = 1;
                    if (scope.dt == null) {
                        scope.frmData.habFeini = true;
                        scope.habbot = true;
                    }
                    else {
                        if (scope.dt > new Date()) {
                            scope.dt = new Date();
                            scope.varhabi = 0;
                            toastr.remove();
                            toastr.error("Fecha final no puede ser mayor a la actual", "Error de Fecha", viewConfig.toastConfig)
                        }
                    }
                    console.log("fe:" + scope.dt);
                    scope.cambiar();
                }

                scope.cambiar = function () {
                    if (scope.dt == null) {
                        scope.varia = "NoValido";
                    }
                    else {
                        var d = scope.dt,
                            month = '' + (d.getMonth() + 1),
                            day = '' + d.getDate(),
                            year = d.getFullYear();
                        if (month.length < 2) month = '0' + month;
                        if (day.length < 2) day = '0' + day;
                        scope.varia = year + '-' + month + '-' + day;
                    }
                    scope.frmData.Mascota.registrarActualizar.request.mascota.feNacimiento = scope.varia;
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
                            debugger;
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
                    mascotaService.listar(scope.dataInfo).post({}, scope.frmData.Mascota.listar.request, function (result) {
                        if (result.estado == 1) {
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
                            scope.dtemp = scope.frmData.Mascota.registrarActualizar.request.mascota.feNacimiento;
                            scope.dtemp = $filter('date')(scope.dtemp, "MM-dd-yyyy");
                            scope.dt = new Date(scope.dtemp);
                            debugger;
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
                scope.cargaAcceso = function () {
                    historiaClinicaService.listar(scope.dataInfo).post({},  scope.frmData.Mascota.listarHC.request, function (result) {
                        if (result.estado == 1) {
                            if (result.lsHistoriaClinica.length == 0) {
                                scope.ilActivo = false;
                                toastr.remove();
                                toastr.warning("Contraseña Incorrecta", "Acción realizada", viewConfig.toastConfig);
                            } else {
                                scope.ilActivo = true;
                            }
                        } else if (result.estado == -1 || result.estado == 0) {
                            console.error('Error: ' + result.mensaje);
                        }
                    }, function (error) {
                        console.error('Error: ' + error);
                    });
                }
                //a traves de un servicio guardo en la bd con nombre y ruta el archivo
                scope.listarImagenes = function () {
                    scope.imagenes = [];
                    scope.imagenes.push({ ruta: "./src/assets/img/logos/logo-pivo.png" }, { ruta: "./src/assets/img/logos/logo-pivo.png" });
                }
                scope.uploadFile = function () {
                    var form_data = new FormData();
                    var reader = new FileReader();
                    var img = angular.forEach($scope.files, function (file) {
                        form_data.append('file', file);
                    });
                    var encrypt = btoa(img);
                    console.log(encrypt);
                    scope.imagenes.push({ ruta: "./src/assets/img/logos/logo-pivo.png", name: img[0].name });
                    //scope.listarImagenes();
                }
                scope.cancel = function () {
                    $uibModalInstance.close();
                }
                scope.ilActivo = false;
                scope.OnloadRa = function () {
                    if (dataModal.idMascota == null) {
                        scope.frmData.name_content = "Registrar Mascota";
                        scope.ilActivo = true;
                        scope.frmData.Mascota.registrarActualizar.request.mascota.codUsuario = scope.dataInfo.codUsuario;
                    } else {
                        scope.frmData.name_content = "Actualizar Mascota";
                        //scope.ilActivo = true;
                        scope.frmData.Mascota.registrarActualizar.request.mascota.codUsuario = null;
                        scope.cargaDatos();
                        //scope.listarImagenes();
                    }
                }

                scope.OnloadRa();

            }

        ]);






