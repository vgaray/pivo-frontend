angular.module('reporteLlamadas')
    .controller('listaLlamadaConsolidadaAgenteCtrl', ['localStorageService', '$location', 'callCenterReporteService', '$log', '$timeout', 'viewConfig', '$filter',
        function (localStorageService, $location, callCenterReporteService, $log, $timeout, viewConfig, $filter) {
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
                name_page_title: "Reporte: Llamada Consolidada Agente",
                name_buscar: "Buscar",
                reporte: {
                    listar: {
                        request: {
                            feInicon: "2017-06-12",
                            feFincon: "2017-06-12",
                            pHorai: "",
                            pHoraf: "",
                            tipoFile: 1
                        },
                        response: {
                            anexo: "",
                            eContestada: 0,
                            eNoContestada: 0,
                            eFallida: 0,
                            totalEntrante: 0,
                            totalInhablando: 0,
                            totalInhablando2: "",
                            sContestada: 0,
                            sNocontestada: 0,
                            sFallida: 0,
                            totalSaliente: 0,
                            totalOutHablando: 0,
                            totalOuthablando2: "",
                            totalRegistros: 0
                        }
                    }
                },
                temporal: {},
                electivo: {
                    numPagina: 1,
                    tipoFile: 2
                }
            }
            scope.ui = {
                isFilesLoaded: true,
                isListSoundEmpty: false,
                isErrorService: false
            },
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

            scope.valExcel = 1;
            scope.vaPdf = 2;
            scope.enades = true;
            scope.descargarArchivo = function (valor) {
                scope.enades = true;
                scope.frmData.reporte.listar.request.tipoFile = valor;
                callCenterReporteService.reporteGLlamadaConsolidadaAgente(scope.dataInfo).post({}, scope.frmData.reporte.listar.request, function (result) {

                    if (result.estado == 1) {
                        if (valor == 1) {
                            scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                            download(scope.pdf, "listaCo.xls", "application/xls");
                        } else if (valor == 2) {
                            scope.pdf = 'data:applicatio/pdf;base64,' + result.reporteFile;
                            download(scope.pdf, "listaLlamadaDiaHora.pdf", "application/pdf");
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
            /*variable para almacenar el listado*/
            scope.listadeLlamadasUsuario = [];
            scope.currentPage = 1;
            /*listado de llamadas usuario*/
            scope.requestTemporal = function () {
                scope.frmData.temporal.feInicon = scope.frmData.reporte.listar.request.feInicon;
                scope.frmData.temporal.feFincon = scope.frmData.reporte.listar.request.feFincon;
                scope.frmData.temporal.pHorai = scope.frmData.reporte.listar.request.pHorai;
                scope.frmData.temporal.pHoraf = scope.frmData.reporte.listar.request.pHoraf;
                scope.frmData.temporal.cantidadxPag = scope.frmData.reporte.listar.request.cantidadxPag;
            }
            scope.horaInicio = "00:00";
            scope.horaFin = "23:45";
            // scope.frmData.reporte.listar.request.pHorai = scope.horaInicio;
            //scope.frmData.reporte.listar.request.pHoraf = scope.horaFin;
            scope.cambioHora1 = function () {
                if (scope.horaInicio == null) {
                    scope.frmData.reporte.listar.request.pHorai = null;
                } else {
                    scope.frmData.reporte.listar.request.pHorai = scope.horaInicio;
                }
            }

            scope.cambioHora2 = function () {
                if (scope.horaFin == null) {
                    scope.frmData.reporte.listar.request.pHoraf = null;
                } else {
                    scope.frmData.reporte.listar.request.pHoraf = scope.horaFin;
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
                scope.listaLamadaConsolidada = [];
            scope.listarLlamadaConsolidadaAgente = function () {
                scope.ui.isFilesLoaded = false;
                scope.varShow = false;
                scope.cambiar();
                scope.cambiar2();
                scope.cambioHora1();
                scope.cambioHora2();
                scope.frmData.reporte.listar.request.feInicon = scope.varia;
                scope.frmData.reporte.listar.request.feFincon = scope.varia2;
                callCenterReporteService.reporteListaLlamadaConsolidadaAgente(scope.dataInfo).post({}, scope.frmData.reporte.listar.request, function (result) {
                    if (result.estado == 1) {
                        scope.ui.isFilesLoaded = true;
                        scope.ui.isListSoundEmpty = false;
                        scope.listaLamadaConsolidada = result.lsreporteLlamadaConsolidadaAgente;
                        scope.varShow = true;
                        scope.totalItems = scope.listaLamadaConsolidada.length;
                        scope.frmData.reporte.listar.request.pNuPagina = scope.currentPage;
                        scope.enades = false;
                        if (result.lsreporteLlamadaConsolidadaAgente.length == 0) {
                            scope.enades = true;
                            scope.ui.isListSoundEmpty = true;
                            scope.ui.isFilesLoaded = false;
                            scope.varShow = false;
                        }
                    }
                    else {
                        scope.ui.isListSoundEmpty = true;
                        scope.ui.isFilesLoaded = false;
                        scope.varShow = false;
                        toastr.remove();
                    }
                }, function (error) {

                    console.error(error);
                });
            }
            //Paginacion
           scope.currentPage = 1;
            scope.numPerPage = 10;
            scope.pageChanged = function (valor) {
                var begin, end, index;
                begin = (scope.currentPage - 1) * scope.numPerPage;
                end = begin + scope.numPerPage;
                index = scope.listaLamadaConsolidada.indexOf(valor);
                return (begin <= index && index < end);
            };

            scope.onLoadPage = function () {

                scope.cambiar();
                scope.cambiar2();
                scope.frmData.reporte.listar.request.feInicon = scope.varia;
                scope.cambiar();
                scope.inicializar();
                scope.comparizon();
                scope.frmData.reporte.listar.request.feInicon = scope.variafini;
                scope.frmData.reporte.listar.request.feFincon = scope.varia2;
            }
            scope.onLoadPage();
        }
    ]);
