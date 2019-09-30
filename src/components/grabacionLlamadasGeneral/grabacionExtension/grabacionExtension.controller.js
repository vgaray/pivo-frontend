angular.module('grabacionLlamadasGeneral')
    .controller('grabacionExtensionCtrl', ['grabacionesAgenteService', 'localStorageService', '$location', '$log', '$timeout', 'viewConfig',
        function (grabacionesAgenteService, localStorageService, $location, $log, $timeout, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }

            scope.mytime = new Date(0, 0, 0, 0, 0, 0);
            scope.mytime2 = new Date(0, 0, 0, 23, 59, 59);
            scope.hstep = 1;
            scope.mstep = 0;
            scope.hstep2 = 1;
            scope.mstep2 = 0;
            scope.codUsuario = 0;
            scope.ismeridian = false;
            scope.validaGrilla = true;
            scope.validaVacio = true;
            scope.varHa1 = true;
            scope.varHa2 = true;
            scope.varHa3 = true;
            scope.varHa4 = true;
            scope.varTotalHa = false;
            scope.clear = function () {
                scope.mytime = "00";
            };
            scope.frmData = {
                name_page_title: "Lista de Grabacion de Llamadas por Extension",
                name_buscar: "Buscar",
                listaLlamadas: {
                    request: {
                        agente: null,
                        tipo: "",
                        origen: "",
                        destino: "",
                        feInicon: "",
                        feFincon: "",
                        pHorai: "",
                        pHoraf: "",
                        tipoFun: 2
                    },
                    response: {
                        nombreAudio: "",
                        tipo: "",
                        origen: "",
                        destino: "",
                        fecha: "",
                        hora: "",
                        duracion: ""
                    },
                    comboTipo: {
                        idTipo: "",
                        noTipo: ""
                    }
                }
            }

            //Valores del Combo
            //TipoFun = 1;
            //TipoFun = 2;
            scope.lsTipo = [
                {
                    value : "",
                    name : "Todos"
                },
                {
                    value : "EXTEN_IN",
                    name : "Extensión IN"
                },
                {
                    value : "EXTEN_OUT",
                    name : "Extensión OUT"
                }
            ];

            ////////********************************* */
            scope.dt = new Date();
            scope.dt2 = new Date();
            scope.fini = new Date();
            scope.varia3 = "";
            scope.inicializar = function () {
                var d = scope.dt,
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month == 0) {
                    month = '' + 11;
                }

                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                scope.varia3 = year + '-' + month + '-' + day;
            }
            scope.variafini = "";
            scope.comparizon = function () {
                var d = scope.fini,
                    month = '' + (d.getMonth() + 1),
                    day = '' + d.getDate(),
                    year = d.getFullYear();
                if (month.length < 2) month = '0' + month;
                if (day.length < 2) day = '0' + day;
                scope.variafini = year + '-' + month + '-' + day;
            }
            scope.varia = "";
            scope.varia2 = "";
            scope.open = function () {
                $timeout(function () {
                    scope.opened = true;
                });
            }
            scope.open2 = function () {
                $timeout(function () {
                    scope.opened2 = true;
                });
            }
            scope.open3 = function () {
                $timeout(function () {
                    scope.opened3 = true;
                });
            }
            scope.dateOptions = {
                minDate: null
            }
            scope.dateOptions2 = {
                minDate: null
            }
            scope.cambiar = function () {
                if (scope.dt == null) {
                    scope.varia = scope.dt;
                } else {
                    var d = scope.dt,
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
                    scope.varia = year + '-' + month + '-' + day;
                }
            }
            scope.generalValorInicio;
            scope.cambiar2 = function () {
                if (scope.dt2 == null) {
                    scope.varia2 = scope.dt2;
                } else {
                    var d = scope.dt2,
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
                    scope.varia2 = year + '-' + month + '-' + day;
                }
            }
            //ng change de los campos
            //Fecha Inicio
            scope.validaAnteriorInicio = function () {
                if (scope.dt == null) {
                    scope.varHa1 = false;
                } else {
                    if (scope.dt < new Date("1-1-2017")) {
                        scope.dt = new Date("1-1-2017");
                    }
                    scope.varHa1 = true;
                }
                scope.validaBotonHab();
            }
            //Hora Inicio
            scope.validaHoraInicio = function () {
                if (scope.horaInicio == null) {
                    scope.varHa2 = false;
                } else {
                    scope.varHa2 = true;
                }
                scope.validaBotonHab();
            }
            //Fecha Final
            scope.validaAnteriorFinal = function () {
                if (scope.dt2 == null) {
                    scope.varHa3 = false;

                } else {
                    if (scope.dt2 < new Date("1-1-2017")) {
                        scope.dt2 = new Date();
                    }
                    scope.varHa3 = true;
                }
                scope.validaBotonHab();
            }
            //Hora Final
            scope.validaHoraFinal = function () {
                if (scope.horaFin == null) {
                    scope.varHa4 = false;
                } else {
                    scope.varHa4 = true;
                }
                scope.validaBotonHab();
            }
            //Boton
            scope.validaBotonHab = function () {
                if (scope.varHa1 == true && scope.varHa2 == true && scope.varHa3 == true && scope.varHa4 == true) {
                    scope.varTotalHa = false;
                    scope.habbot = false;
                }
                else {
                    scope.varTotalHa = true;
                    scope.habbot = true;
                }
            }
            scope.horaInicio = "00:00";
            scope.horaFin = "23:45";
            scope.cambioHora1 = function () {
                if (scope.horaInicio == null) {
                    scope.frmData.listaLlamadas.request.pHorai = null;
                } else {
                    scope.frmData.listaLlamadas.request.pHorai = scope.horaInicio;
                }
            }

            scope.cambioHora2 = function () {
                if (scope.horaFin == null) {
                    scope.frmData.listaLlamadas.request.pHoraf = null;
                } else {
                    scope.frmData.listaLlamadas.request.pHoraf = scope.horaFin;
                }
            }

            scope.varhabi = 0;
            scope.validateDateini = function () {
                if (scope.dt == null) {
                    scope.frmData.habFeini = true;
                    scope.habbot = true;
                    scope.varHa1 = false;
                }
                else {
                    if (scope.dt > new Date()) {
                        scope.dt = new Date();
                        toastr.remove();
                        toastr.error("Fecha inicial no puede ser mayor a la actual", "Error de Fecha", viewConfig.toastConfig)

                    }
                    if (scope.dt < new Date("01-01-2016")) {
                        scope.dt = new Date(scope.dt2)
                    }
                    if (scope.dt > scope.dt2) {
                        scope.dt = scope.dt2;
                        toastr.remove();
                        toastr.error("Fecha inicial no puede ser mayor a la fecha final", "Error de Fecha", viewConfig.toastConfig)
                    }
                    scope.varHa1 = true;
                    scope.habbot = false;
                }
                scope.validaBotonHab();

            },
                scope.validateDateFin = function () {
                    if (scope.dt2 == null) {
                        scope.frmData.habFeini = true;
                        scope.habbot = true
                        scope.varHa2 = false;
                    }
                    else {
                        scope.habbot = false;
                        scope.varHa2 = true;
                        if (scope.dt2 > new Date()) {
                            scope.dt2 = new Date();
                            toastr.remove();
                            toastr.error("Fecha final no puede ser mayor a la actual", "Error de Fecha", viewConfig.toastConfig)
                        }
                        if (scope.dt2 < scope.dt) {
                            scope.dt2 = scope.dt;
                            toastr.remove();
                            toastr.error("Fecha final no puede ser menor a la fecha inicial", "Error de Fecha", viewConfig.toastConfig)
                        }
                    }
                    scope.validaBotonHab();
                },
                ///*********************************** */
                //Combo Agente
                scope.comboAgenteL = {
                    nuAgente: 0
                }
            scope.funcionQueunameRel = function (value) {
                if (value != null) {
                    scope.frmData.listaLlamadas.request.agente = value.nombre;

                }
                else {
                    scope.frmData.listaLlamadas.request.agente = null;
                }
            },
                scope.listaAgenteLContest = [];
            scope.listarAgenteL = function () {

                grabacionesAgenteService.listarextensiones(scope.dataInfo).post({}, {}, function (result) {
                    if (result.estado == 1) {
                        scope.listaAgenteLContest = (result.extensionList);
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            scope.arrayPath = [];
            scope.listagrabacionesextensiones = [];
            scope.verT = false;
            scope.listarGrabacionesAgente = function () {
                
                scope.cambiar();
                scope.cambiar2();
                scope.cambioHora1();
                scope.cambioHora2();
                scope.frmData.listaLlamadas.request.feInicon = scope.varia;
                scope.frmData.listaLlamadas.request.feFincon = scope.varia2;
                grabacionesAgenteService.listargrabaciones(scope.dataInfo).post({}, scope.frmData.listaLlamadas.request, function (result) {
                    if (result.estado == 1) {
                        if(result.lsAudioA.length > 0){
                            scope.verT = true;
                        }else {
                            scope.verT = false;
                            toastr.remove();
                            toastr.info("No se encontraron datos en su consulta", "Anuncio", viewConfig.toastConfig);
                        }
                        scope.arrayPath = [];
                        scope.listagrabacionesextensiones = result.lsAudioA;
                        scope.listsize = (result.lsAudioA).length;
                        for (var i = 0; i < scope.listsize; i++) {
                            scope.arrayPath[i] = scope.listagrabacionesextensiones[i].fecha;
                        } 
                        scope.convertidorRuta();
                    } else if (result.estado == -1 || result.estado == 0) {
                        scope.listagrabacionesextensiones = [];
                        toastr.info("No se encontraron grabaciones", "Anuncio", viewConfig.toastConfig);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            scope.reducido = [];
            scope.convertidorRuta = function () {
                scope.reducido = [];
                for (var i = 0; i < scope.listsize; i++) {
                    scope.reducido[i] = scope.arrayPath[i].replace(/-/g, '/') + "/" + scope.listagrabacionesextensiones[i].nombreAudio;
                }
            }
            scope.setSrc = function (param) {
                scope.sol = 0;
                scope.sol = scope.reducido[param];
                return scope.sol
            }
            scope.OnloadPage = function () {
                scope.cambiar();
                scope.cambiar2();
                scope.frmData.listaLlamadas.request.feInicon = scope.varia;
                scope.cambiar();
                scope.inicializar();
                scope.comparizon();
                scope.frmData.listaLlamadas.request.feInicon = scope.variafini;
                scope.frmData.listaLlamadas.request.feFincon = scope.varia2;
                scope.listarAgenteL();
            }
            scope.OnloadPage();
            
        }
    ]);