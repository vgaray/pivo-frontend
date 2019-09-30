"use strict";

angular.module('citasVeterinaria')
    .controller('citasVeterinariaARController',
        ['citaVeterinariaService', 'personalService', 'localStorageService', '$uibModalInstance', '$location', 'dataModal', 'viewConfig',
            function (citaVeterinariaService, personalService, localStorageService, $uibModalInstance, $location, dataModal, viewConfig) {
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
                scope.comboTurno =
                    [
                        { idTurno: 1, noTurno: "DNI" },
                        { idTurno: 2, noTurno: "NIE" }
                    ]
                scope.comboTurno =
                    [
                        { idTurno: 1, noTurno: "8:00 - 8:15" },
                        { idTurno: 2, noTurno: "8:15 - 8:30" },
                        { idTurno: 3, noTurno: "8:30 - 8:45" },
                        { idTurno: 4, noTurno: "8:45 - 9:00" },
                        { idTurno: 5, noTurno: "9:00 - 9:15" },
                        { idTurno: 6, noTurno: "9:15 - 9:30" },
                        { idTurno: 7, noTurno: "9:30 - 9:45" },
                        { idTurno: 8, noTurno: "9:45 - 10:00" },
                        { idTurno: 9, noTurno: "10:00 - 10:15" },
                        { idTurno: 10, noTurno: "10:15 - 10:30" },
                        { idTurno: 11, noTurno: "10:30 - 10:45" },
                        { idTurno: 12, noTurno: "10:45 - 11:00" },
                        { idTurno: 13, noTurno: "11:00 - 11:15" },
                        { idTurno: 14, noTurno: "11:15 - 11:30" },
                        { idTurno: 15, noTurno: "11:30 - 11:45" },
                        { idTurno: 16, noTurno: "11:45 - 12:00" },
                        { idTurno: 17, noTurno: "12:00 - 12:15" },
                        { idTurno: 18, noTurno: "12:15 - 12:30" },
                        { idTurno: 19, noTurno: "12:30 - 12:45" },
                        { idTurno: 20, noTurno: "12:45 - 13:00" },
                        { idTurno: 21, noTurno: "13:00 - 13:15" },
                        { idTurno: 22, noTurno: "13:15 - 13:30" },
                        { idTurno: 23, noTurno: "13:30 - 13:45" },
                        { idTurno: 24, noTurno: "13:45 - 14:00" },
                        { idTurno: 25, noTurno: "14:00 - 14:15" },
                        { idTurno: 26, noTurno: "14:15 - 14:30" },
                        { idTurno: 27, noTurno: "14:30 - 14:45" },
                        { idTurno: 28, noTurno: "14:45 - 15:00" },
                        { idTurno: 29, noTurno: "15:00 - 15:15" },
                        { idTurno: 30, noTurno: "15:15 - 15:30" },
                        { idTurno: 31, noTurno: "15:30 - 15:45" },
                        { idTurno: 32, noTurno: "15:45 - 16:00" },
                        { idTurno: 33, noTurno: "16:00 - 16:15" },
                        { idTurno: 34, noTurno: "16:15 - 16:30" },
                        { idTurno: 35, noTurno: "16:30 - 16:45" },
                        { idTurno: 36, noTurno: "16:45 - 17:00" },
                        { idTurno: 37, noTurno: "17:00 - 17:15" },
                        { idTurno: 38, noTurno: "17:15 - 17:30" },
                        { idTurno: 39, noTurno: "17:30 - 17:45" },
                        { idTurno: 40, noTurno: "17:45 - 18:00" },
                        { idTurno: 41, noTurno: "18:00 - 18:15" },
                        { idTurno: 42, noTurno: "18:15 - 18:30" },
                        { idTurno: 43, noTurno: "18:30 - 18:45" },
                        { idTurno: 44, noTurno: "18:45 - 19:00" },
                        { idTurno: 45, noTurno: "19:00 - 19:15" },
                        { idTurno: 46, noTurno: "19:15 - 19:30" },
                        { idTurno: 47, noTurno: "19:30 - 19:45" },
                        { idTurno: 48, noTurno: "19:45 - 20:00" },
                    ]
                scope.combochangeTurno = function (value) {
                    scope.frmData.Cita.registrarActualizar.request.cita.idTurno = value.idTurno;
                    scope.noTurno = value.noTurno
                }
                scope.noTurno = "seleccione una turno";
                scope.comboActividad =
                    [
                        { id_actividad: 1, noDescripcion: "ACTIVIDADES ADMINISTRATIVAS" },
                        { id_actividad: 2, noDescripcion: "ACTIVIDADES ASIST. DE PROFES. DE SALUD NO MEDICOS" },
                        { id_actividad: 3, noDescripcion: "ACTIVIDADES ASISTENCIALES DE TECNICOS" },
                        { id_actividad: 4, noDescripcion: "ACTIVIDADES ESPECIFICAS DE LOS PROFES. NO MEDICOS" },
                        { id_actividad: 5, noDescripcion: "ACTIVIDADES MEDICAS EN HEMOTERAPIA Y BCO.DE SANGRE " },
                        { id_actividad: 6, noDescripcion: "ATENCION CENTRO OBSTETRICO " },
                        { id_actividad: 7, noDescripcion: "ATENCION CENTRO QUIRURGICO " },
                        { id_actividad: 8, noDescripcion: "ATENCION CRIP " },
                        { id_actividad: 9, noDescripcion: "ATENCION EMERGENCIA " },
                        { id_actividad: 10, noDescripcion: "ATENCION GERIATRIA ESPECIALIZADA " },
                        { id_actividad: 11, noDescripcion: "ATENCION HOSPITALIZACION " },
                        { id_actividad: 12, noDescripcion: "ATENCION HOSPITALIZACION AMBULATORIA " },
                        { id_actividad: 13, noDescripcion: "ATENCION UNIDAD DE CUIDADOS INTENSIVOS (UCI) " },
                        { id_actividad: 14, noDescripcion: "ATENCION UNIDAD DE CUIDADOS INTERMEDIOS (UCIN) " },
                        { id_actividad: 15, noDescripcion: "ATENCION UNIDAD DE VIGILANCIA INTENSIVA (UVI) " },
                        { id_actividad: 16, noDescripcion: "CONSULTA MEDICA AMBULATORIA " },
                        { id_actividad: 17, noDescripcion: "DIGITACION " },
                        { id_actividad: 18, noDescripcion: "OTRAS ACTIVIDADES MEDICAS EN HORAS SANITARIAS " },
                        { id_actividad: 19, noDescripcion: "PROCEDIMIENTOS DIAGNOSTICOS " },
                        { id_actividad: 20, noDescripcion: "PROCEDIMIENTOS TERAPEUTICOS " },
                        { id_actividad: 21, noDescripcion: "UNIDADES PRODUCTORAS INTERDISCIPLINARIAS " },
                        { id_actividad: 22, noDescripcion: "ACTIVIDADES DE FARMACIA " },
                        { id_actividad: 23, noDescripcion: "ATENCION AMBULATORIA " },
                        { id_actividad: 24, noDescripcion: "ACTIVIDADES DE ALMACEN " },
                        { id_actividad: 25, noDescripcion: "ATENCION LABORATORIO " },
                        { id_actividad: 26, noDescripcion: "ACTIVIDADES DE ALMACEN GENERAL " },
                    ]
                scope.combochangeActividad = function (value) {
                    scope.frmData.Cita.registrarActualizar.request.cita.id_actividad = value.id_actividad;
                    scope.noDescripcion = value.noDescripcion
                }
                scope.noDescripcion = "seleccione una actividad";
                scope.comboEstado =
                    [
                        { id_estado: 1, noEstado: "pendiente" },
                        { id_estado: 2, noEstado: "confirmado" },
                        { id_estado: 3, noEstado: "atendido" },
                    ]
                scope.combochangeEstado = function (value) {
                    scope.frmData.Cita.registrarActualizar.request.cita.idEstado = value.id_estado;
                    scope.noEstado = value.noEstado;
                }
                scope.noEstado = "seleccione una estado";
                scope.personal = {
                    listar: {
                        request: {
                            pIdPersonal: null,
                            pNuDocumento: null,
                            pNoNombreApellido: null,
                            pIdTipoDocumento: null,
                            pIlActivo: null,
                            pTiFun: 0
                        }
                    }
                }
                scope.frmData = {
                    name_page_title: "Cita",
                    name_content: "",
                    Cita: {
                        registrarActualizar:
                        {
                            request: {
                                cita: {
                                    idCita: 0,
                                    noCita: "",
                                    noDescripcion: "",
                                    feRegistro: "00-00-00",
                                    feReserva: "00-00-00",
                                    hoFinal: "00:00:00",
                                    hoInicio: "00:00:00",
                                    idActividad: 0,
                                    idCita: 0,
                                    idEstado: 0,
                                    idMascota: 0,
                                    idTurno: null,
                                    idUsuario: 0,
                                    noActividad: "",
                                    noCita: "",
                                    noCorreo: "",
                                    noDescripcion: "",
                                    noDuenio: "",
                                    noEspecie: "",
                                    noMascota: "",
                                    noPeriodo: "",
                                    noRaza: "",
                                    noTipoDocumento: "",
                                    noTurno: "",
                                    nuContacto: "",
                                    nuDocumento: "",
                                    nuTelefono: "",
                                    noEstado: "",
                                    nuChip: "",
                                    idPersonal: 0,
                                    noNombre: "",
                                    noApellido: "",
                                    noEmail: ""

                                }
                            },
                        },
                        listar: {
                            request: {
                                pNuDocumento: ""
                            }
                        }
                    }
                }
                scope.listarPersonal = function () {
                    personalService.listar(scope.dataInfo).post({}, scope.personal.listar.request, function (result) {
                        if (result.estado == 1) {
                            scope.listaPersonal = result.lsPersonal;
                            scope.comboPersonal = [];
                            for (var i = 0; i < scope.listaPersonal.length; i++) {
                                scope.comboPersonal.push({ idPersonal: scope.listaPersonal[i].idPersonal, noPersonal: scope.listaPersonal[i].noPersonal + " " + scope.listaPersonal[i].noApePat + "/" + scope.listaPersonal[i].noGrupoOcupacional });
                            }
                            console.log("" + scope.comboPersonal)
                            debugger;
                            if (scope.listaPersonal.length == 0) {
                                //Etiquetas
                                scope.labelList = null;
                                //arreglo con todas las filas 
                                scope.DataArray = null;
                                toastr.remove();
                                toastr.warning("Consulta vacía", 'Advertencia', viewConfig.toastConfig);

                            } else {
                                //Etiquetas
                                scope.labelList = result.graficoPersonal.labelList;
                                //arreglo con todas las filas 
                                scope.DataArray = result.graficoPersonal.dataUnicaNumber;
                            }

                        } else if (result.estado == -1 || result.estado == 0) {
                            console.error('Error: ' + result.mensaje);
                        }
                    }, function (error) {
                        console.error('Error: ' + error);
                    });
                }
                scope.patronDocumento = "";
                scope.combochangeDocumento = function (value) {
                    ;
                    scope.frmData.Personal.registrarActualizar.request.personal.idTipoDocumento = value.idTipoDocumento;
                    scope.frmData.Personal.registrarActualizar.request.personal.noAbreviatura = value.noAbreviatura;
                    if (scope.frmData.Personal.registrarActualizar.request.personal.idTipoDocumento == 1) {
                        scope.patronDocumento = "^([0-9]{8})$";
                    } if (scope.frmData.Personal.registrarActualizar.request.personal.idTipoDocumento == 2) {
                        scope.patronDocumento = "^(Z[0-9]{7})$";
                    }
                }
                scope.combochangeGrupoOcupacional = function (value) {
                    scope.frmData.Personal.registrarActualizar.request.personal.idGrupoOcupacional = value.idGrupoOcupacional;
                    scope.frmData.Personal.registrarActualizar.request.personal.noGrupoOcupacional = value.noGrupoOcupacional;
                }
                scope.showTab = function (id) {
                    scope.tipo = id;
                    if (scope.tipo == 1) {
                        scope.tab1 = true;
                        scope.tab2 = false;
                        scope.tab3 = false;
                        scope.tab4 = false;
                    }
                    if (scope.tipo == 2) {
                        scope.tab2 = true;
                        scope.tab3 = false;
                        scope.tab4 = false;
                        scope.tab1 = false;
                    }
                    if (scope.tipo == 3) {
                        scope.tab3 = true;
                        scope.tab4 = false;
                        scope.tab1 = false;
                        scope.tab2 = false;
                    }
                    if (scope.tipo == 4) {
                        scope.tab4 = true;
                        scope.tab1 = false;
                        scope.tab2 = false;
                        scope.tab3 = false;
                    }
                }

                scope.ArrayMascota = [];
                scope.listarUsuarioCita = function () {
                    citaVeterinariaService.listarUsuario(scope.dataInfo).post({}, scope.frmData.Cita.listar.request, function (result) {
                        if (result.estado == 1) {
                            scope.lsUsuarioCita = result.usuarioCitaList;
                            if (scope.lsUsuarioCita.length == 0) {
                                toastr.remove();
                                toastr.warning('Dueño no encontrado', 'Advertencia', viewConfig.toastConfig);
                            }
                            else {
                                scope.frmData.Cita.registrarActualizar.request.cita.noTipoDocumento = scope.lsUsuarioCita[0].noTipoDocumento;
                                scope.frmData.Cita.registrarActualizar.request.cita.nuDocumento = scope.lsUsuarioCita[0].nuDocumento;
                                scope.frmData.Cita.registrarActualizar.request.cita.noNombre = scope.lsUsuarioCita[0].noNombre;
                                scope.frmData.Cita.registrarActualizar.request.cita.noApellido = scope.lsUsuarioCita[0].noApellido;
                                scope.frmData.Cita.registrarActualizar.request.cita.nuTelefono = scope.lsUsuarioCita[0].nuTelefono;
                                scope.frmData.Cita.registrarActualizar.request.cita.noCorreo = scope.lsUsuarioCita[0].noEmail;
                                scope.ilActivo = true;
                                scope.tab1 = true;
                                for (var i = 0; i < scope.lsUsuarioCita.length; i++) {
                                    scope.ArrayMascota.push({
                                        idMascota: scope.lsUsuarioCita[i].idMascota,
                                        noMascota: scope.lsUsuarioCita[i].noNombreMascota, noEspecie: scope.lsUsuarioCita[i].noEspecie, noRaza: scope.lsUsuarioCita[i].noRaza,
                                        nuChip: scope.lsUsuarioCita[i].nuChip
                                    });

                                }
                            }
                        } else if (result.estado == -1 || result.estado == 0) {
                            console.error('Error: ' + result.mensaje);
                        }
                    }, function (error) {
                        console.error('Error: ' + error);
                    });
                }
                scope.checkPet = function (id, mascota) {
                    scope.frmData.Cita.registrarActualizar.request.cita.idMascota = mascota;
                    var cantidad = scope.ArrayMascota.length
                    debugger;
                    //document.getElementById("c_" + (id + 1)).checked = true;
                    for (var i = 1; i <= cantidad; i++) {
                        if (i == id) {
                            console.log("Intocable:" + i)
                        } else {
                            document.getElementById("c_" + (i)).checked = false;
                            console.log("desactiva:" + i)
                        }
                    }
                    scope.selected = id;
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
                            toastr.error("Fecha de reserva no puede ser mayor a la actual", "Error de Fecha", viewConfig.toastConfig)
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
                    scope.frmData.Cita.registrarActualizar.request.cita.feReserva = scope.varia;
                }
                scope.cancel = function () {
                    $uibModalInstance.close();
                }
                scope.ilActivo = true;
                scope.OnloadRa = function () {
                    if (dataModal == null) {
                        scope.frmData.name_content = "Registrar Cita";
                        scope.ilActivo = false;
                        scope.listarPersonal();
                    } else {
                        scope.frmData.name_content = "Actualizar Cita";
                        scope.ilActivo = true;
                        //scope.cargaDatos();
                    }
                }
                scope.OnloadRa();
            }
        ]);






