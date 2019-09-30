angular.module('callCenterReporteLlamada')
    .controller('listaConsolidadoLlamadaRecibidaCtrl', ['localStorageService',
        'callCenterReporteService', '$location', '$log', '$timeout', 'viewConfig',
        function (localStorageService, callCenterReporteService, $location, $log, $timeout, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.ui = {
                isFilesLoaded: true,
                isListSoundEmpty: false,
                isErrorService: false
            },
                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                },
                scope.itemComboConstants = {

                    itemAllQueues: { idQueues: 0, name: "TODAS" },
                }
            scope.habFeini = false,
                scope.habFefin = false,
                scope.habbot = true,
                scope.frmData = {
                    name_page_title: "Reporte: Consolidado Llamada Recibida",

                    list: {
                        reporteConsolidadoLlamada: {
                            request: {
                                queueName: "",
                                feIni: "",
                                feFin: "",
                                tipoFile: 1,
                            },
                            response: {
                                noQueuename: "",
                                noMes: "",
                                noDia: "",
                                noDiaSemana: "",
                                nuCantidad: 0,
                                nuAnio: 0,
                            }
                        },
                        temporal: {},
                        electivo: {
                            numPagina: 1,
                            tipoFile: 2
                        },
                    },
                    urlPage: $location.path()
                }
            scope.varShow = false;
            scope.diaPresente = new Date();
            scope.mytime = new Date(0, 0, 0, 0, 0, 0);
            scope.mytimeF = new Date(0, 0, 0, 23, 59, 59);
            scope.hstep = 1;
            scope.mstep = 15;
            scope.ismeridian = false;
            scope.hstepF = 1;
            scope.mstepF = 15;
            scope.ismeridianF = false;
            scope.validaVacio = true;
            scope.validaGrilla = true;
            scope.varHa1 = true;
            scope.varHa2 = true;
            scope.varHa3 = true;
            scope.varHa4 = true;
            scope.varHa5 = true;
            scope.varHa6 = true;
            scope.varTotalHa = false;
            scope.changed = function () {
                var seconds = scope.mytime.getSeconds();
                var minutes = scope.mytime.getMinutes();
                var hour = scope.mytime.getHours();
                if (seconds < 10) seconds = '0' + seconds;
                if (minutes < 10) minutes = '0' + minutes;
                if (hour < 10) hour = '0' + hour;
                scope.frmData.reporte.list.llamadasGeneral.request.pHorai = hour + ':' + minutes + ':' + seconds;
            };
            scope.changedF = function () {
                var seconds2 = scope.mytimeF.getSeconds();
                var minutes2 = scope.mytimeF.getMinutes();
                var hour2 = scope.mytimeF.getHours();
                if (seconds2 < 10) seconds2 = '0' + seconds2;
                if (minutes2 < 10) minutes2 = '0' + minutes2;
                if (hour2 < 10) hour2 = '0' + hour2;
                scope.frmData.reporte.list.llamadasGeneral.request.pHoraf = hour2 + ':' + minutes2 + ':' + seconds2;
            };
            scope.clear = function () {
                scope.mytime = "00:00:00";
            };
            scope.clearF = function () {
                scope.mytime = "00:00:00";
            };

            scope.lsCola = [];
            scope.listarColas = function () {
                callCenterReporteService.reporteListaColas(scope.dataInfo).post({},
                    function (result) {
                        if (result.estado == 1) {
                            scope.lsCola = [scope.itemComboConstants.itemAllQueues];
                            scope.lsCola = scope.lsCola.concat(result.colaLista);
                        }
                    },
                    function (error) {
                        console.error(error);
                    });
            },
                scope.valor = "";
            scope.varhanq = 0;
            scope.funcionQueunameRel = function (value) {
                scope.varhanq = 1;
                scope.valor = value;
                if (value != null) {
                    scope.frmData.list.reporteConsolidadoLlamada.request.queueName = value.name;
                } else {
                    scope.listaConsolidadoLlamada = [];
                    toastr.remove();
                    toastr.info("Debe seleccionar una cola", "Anuncio", viewConfig.toastConfig);
                    scope.habbot = true;
                    scope.varhanq = 0;
                    scope.enades = true;
                    scope.varShow=false;
                }
                if (scope.varhanq == 1) {
                    scope.validaBotonHab();
                }
            },
                scope.listaConsolidadoLlamada = [];
            scope.listaLlamadasContestadas = function () {
                scope.ui.isFilesLoaded = false;
                scope.varShow = false;
                scope.cambiar();
                scope.cambiar2();
                if (scope.frmData.list.reporteConsolidadoLlamada.request.queueName == "TODAS") {
                    scope.frmData.list.reporteConsolidadoLlamada.request.queueName = "";
                }
                scope.frmData.list.reporteConsolidadoLlamada.request.feIni = scope.varia;
                scope.frmData.list.reporteConsolidadoLlamada.request.feFin = scope.varia2;
                callCenterReporteService.reporteListaConsolidadoLlamada(scope.dataInfo).post({}, scope.frmData.list.reporteConsolidadoLlamada.request, function (result) {
                    scope.ui.isFilesLoaded = false;
                    scope.cambiar();
                    scope.frmData.list.reporteConsolidadoLlamada.request.feIni = scope.varia;
                    scope.cambiar2();

                    scope.frmData.list.reporteConsolidadoLlamada.request.feFin = scope.varia2;

                    if (result.lsreporteConsolidadoLlamadaRecibida.length > 1) {
                        scope.varShow = true;
                        scope.ui.isFilesLoaded = true;
                        scope.ui.isListSoundEmpty = false;
                        scope.listaConsolidadoLlamada = result.lsreporteConsolidadoLlamadaRecibida;
                        scope.enades = false;
                        if (result.lsreporteConsolidadoLlamadaRecibida.length == 0) {
                            scope.ui.isListSoundEmpty = true;
                            scope.ui.isFilesLoaded = false;
                            scope.varShow = false;
                            scope.enades = true;
                        }
                    }
                    else {
                        scope.varShow = false;
                        scope.ui.isListSoundEmpty = true;
                        scope.ui.isFilesLoaded = false;
                        }
                }, function (error) {
                    console.error(error);
                });
            },
                scope.valExcel = 1;
            scope.vaPdf = 2;
            scope.enades = true;
            scope.descargarArchivo = function (valor) {
                scope.enades = true;
                scope.frmData.list.reporteConsolidadoLlamada.request.tipoFile = valor;
                callCenterReporteService.reporteGConsolidadoLlamada(scope.dataInfo).post({}, scope.frmData.list.reporteConsolidadoLlamada.request, function (result) {

                    if (result.estado == 1) {
                        if (valor == 1) {
                            scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                            download(scope.pdf, "listaConsolidadoLlamadaRecibida.xls", "application/xls");
                        } else if (valor == 2) {
                            scope.pdf = 'data:applicatio/pdf;base64,' + result.reporteFile;
                            download(scope.pdf, "listaConsolidadoLlamadaRecibida.pdf", "application/pdf");
                        }
                        toastr.success("Archivo descargado exitosamente", "Acción realizada", viewConfig.toastConfig)
                    } else if (result.estado == 0 || result.estado == -1) {
                        toastr.error("Error al descargar archivo", "Error del Servidor", viewConfig.toastConfig)
                    }
                    scope.enades = false;
                }, function (error) {
                    console.error(error);
                })
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
                        toastr.remove();
                        toastr.error("Fecha inicial no puede ser mayor a la actual", "Error de Fecha", viewConfig.toastConfig)
                        scope.varhabi = 0;
                    }
                    if (scope.dt < new Date("01-01-2016")) {
                        scope.dt = new Date(scope.dt2)
                    }
                    if (scope.dt > scope.dt2) {
                        scope.dt = scope.dt2;
                        toastr.remove();
                        toastr.error("Fecha inicial no puede ser mayor a la fecha final", "Error de Fecha", viewConfig.toastConfig)
                        scope.varhabi = 0;
                    }
                }
                if (scope.varhabi == 1) {
                    scope.validaBotonHab();
                }
            },
                scope.varhabf = 0;
            scope.validateDateFin = function () {

                scope.varhabf = 1;
                if (scope.dt2 == null) {
                    scope.frmData.habFeini = true;
                    scope.habbot = true;
                }
                else {
                    if (scope.dt2 > new Date()) {
                        scope.dt2 = new Date();
                        scope.varhabf = 0;
                        toastr.remove();
                        toastr.error("Fecha final no puede ser mayor a la actual", "Error de Fecha", viewConfig.toastConfig)
                    }
                    if (scope.dt2 < scope.dt) {
                        scope.varhabf = 0;
                        scope.dt2 = scope.dt;
                        toastr.remove();
                        toastr.error("Fecha final no puede ser menor a la fecha inicial", "Error de Fecha", viewConfig.toastConfig)
                    }

                }
                if (scope.varhabf == 1) {
                    scope.validaBotonHab();
                }
            },
                scope.validaBotonHab = function () {
                    if (scope.dt != null && scope.dt2 != null && scope.valor != "" && scope.valor != null) {
                        scope.habbot = false;
                    }
                    else {
                        scope.habbot = true;
                    }
                }
            scope.dtf = new Date();
            scope.variaf = new Date();
            scope.varShow = true;
            scope.open = function () {
                $timeout(function () {
                    scope.opened = true;
                })
            },
                scope.openf = function () {
                    $timeout(function () {
                        scope.openedf = true;
                    })
                }

            //////////////////////////////////////////
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
            scope.dt = new Date();
            scope.dt2 = new Date();
            scope.fini = new Date();
            /////////////////////////////////////////
            scope.dateOptions = {
                minDate: null
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
            }
            //calendario Final
            /// calendario
            scope.dtf = new Date();
            scope.variaf = new Date();
            scope.openf = function () {
                $timeout(function () {
                    scope.openedf = true;
                });
            }
            //////////////////////
            scope.dateOptionsf = {
                minDate: null
            }
            scope.cambiarf = function () {
                if (scope.dtf == null) {
                    scope.variaf = "NoValido";
                }
                else {
                    var d = scope.dtf,
                        month = '' + (d.getMonth() + 1),
                        day = '' + d.getDate(),
                        year = d.getFullYear();
                    if (month.length < 2) month = '0' + month;
                    if (day.length < 2) day = '0' + day;
                    scope.variaf = year + '-' + month + '-' + day;
                }
            }
            ////////////////////////
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
            scope.OnloadPage = function () {
                scope.listarColas();
                scope.varShow = false;
                scope.cambiar();
                scope.cambiar2();
                scope.inicializar();
            }
            scope.OnloadPage();
        }
    ]);
