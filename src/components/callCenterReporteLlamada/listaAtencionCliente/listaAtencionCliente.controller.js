angular.module('callCenterReporteLlamada')
    .controller('listaAtencionClienteCtrl', ['localStorageService',
        'callCenterReporteService', '$location', '$log', '$timeout', 'viewConfig',
        function (localStorageService, callCenterReporteService, $location, $log, $timeout, viewConfig) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            },
                scope.itemComboConstants = {
                    itemAllQueues: { idQueues: 0, name: "TODAS" }
                }
            scope.ui = {
                isFilesLoaded: true,
                isListSoundEmpty: false,
                isErrorService: false
            },
                scope.frmData = {
                    name_page_title: "Reporte:Atencion Cliente",
                    fechaCabecera: "AÑO",
                    mensajeIni: "",
                    list: {
                        reporteRespuestaOperador: {
                            request: {
                                tiReport: "ANUAL",
                                vaTab: 0,
                                vaNsv: 0,
                                feReport: "",
                                noQueue: "",
                                tipoFile: 1
                            },
                            response: {
                                feLlamad: "",
                                llaEntra: 0,
                                llaAtendi: 0,
                                llaAtetab: 0,
                                llaAbando: 0,
                                llaAbatab: 0,
                                llaDisuac: 0,
                                llaAtens: 0,
                                tiAbando: 0,
                                porcentajeTotalAbandonos: 0.0,
                                porcentajeTabAbandono: 0.0,
                                porcentajeRoEficacia: 0.0,
                                porcentajeNsvEficacia: 0.0,
                                tiProcon: 0,
                                tiProesp: 0,
                                tiEma: 0,
                            }
                        },

                    },
                    urlPage: $location.path()
                },
                scope.varShow = false;
            scope.verificador = function (varbot) {
                scope.varboton = varbot;
                if (scope.frmData.list.reporteRespuestaOperador.request.vaTab == null) {
                    scope.frmData.list.reporteRespuestaOperador.request.vaTab = 0;
                }
                if (scope.frmData.list.reporteRespuestaOperador.request.vaNsv == null) {
                    scope.frmData.list.reporteRespuestaOperador.request.vaNsv = 0
                }
                scope.listarRespuestaOperador();
            },
                scope.habbot = true;
            scope.funcionQueunameRel = function (value) {
                scope.varShowBut = false;
                scope.habbot = false;
                scope.varShow = false;
                scope.enades = true;
                scope.vaciaDatosTemp();
                //
                if (value != null) {

                    scope.frmData.list.reporteRespuestaOperador.request.noQueue = value.name;
                    scope.frmData.list.reporteRespuestaOperador.request.tiReport = "ANUAL"
                    scope.frmData.fechaCabecera = "AÑO"
                    scope.frmData.list.reporteRespuestaOperador.request.vaTab = 0;
                    scope.frmData.list.reporteRespuestaOperador.request.vaNsv = 0;
                } else {
                    toastr.remove();
                    scope.varShow = false;
                    scope.habbot = true;
                    scope.listaAtencionCli = [];
                    toastr.info("Debe seleccionar una Cola", "Anuncio", viewConfig.toastConfig);
                }
            },
                scope.chek = 0;
            scope.enadiv = true;
            scope.tipoSig = function (fecha, tipo) {
                scope.varShowBut = true;
                if (fecha.length == 4) {
                    tipo = "MES"
                    scope.frmData.fechaCabecera = "MES"
                    scope.chek = 0;

                }
                if (fecha.length == 7) {
                    tipo = "DIA"
                    scope.frmData.fechaCabecera = "DIA"
                    scope.chek = 0;
                }
                if (fecha.length == 10) {
                    tipo = "HORA"
                    scope.frmData.fechaCabecera = "HORA"
                    scope.chek = 0;
                }
                if (fecha.length == 2) {
                    scope.enadiv = false;
                    tipo = "HORA"
                    scope.frmData.fechaCabecera = "HORA"
                    scope.frmData.list.reporteRespuestaOperador.request.feReport = scope.feReportval;
                    scope.chek = 1;
                    toastr.remove();
                    toastr.info("No se encontraron datos en su consulta", "Anuncio", viewConfig.toastConfig);
                }
                if (scope.chek == 0) {
                    scope.frmData.list.reporteRespuestaOperador.request.feReport = fecha;
                    scope.frmData.list.reporteRespuestaOperador.request.tiReport = tipo;
                    scope.feReportval = fecha;
                    scope.listarRespuestaOperador();
                }
            },
                scope.errvar = 0;
            //scope.tipoantverif = 0;
            scope.vertipoant = 0;

            scope.tipoAnt = function (tipoRepo) {
                scope.vertipoant = 1;
                scope.enadiv = true;
                if (tipoRepo == "ANUAL") {
                    toastr.remove();
                    toastr.info("No se encontraron datos en su consulta", "Anuncio", viewConfig.toastConfig);
                }
                if (tipoRepo == "MES") {
                    tipoRepo = "ANUAL"
                    scope.frmData.fechaCabecera = "ANUAL"
                    scope.frmData.list.reporteRespuestaOperador.request.feReport = "";
                    scope.varShowBut = false;
                    peti = 0;
                    for (var i = 0; i < 5; i++) {
                        scope.requestPeti[i] = scope.ArrayRequest[i][peti];
                    }
                    for (var i = 0; i < 5; i++) {
                        scope.ArrayRequest[i].splice(1, ((scope.ArrayRequest.length) - 1));
                    }
                }
                if (tipoRepo == "DIA") {
                    tipoRepo = "MES"
                    scope.frmData.fechaCabecera = "MES"
                    peti = 1;
                    for (var i = 0; i < 5; i++) {
                        scope.requestPeti[i] = scope.ArrayRequest[i][peti];
                    }
                    for (var i = 0; i < 5; i++) {
                        scope.ArrayRequest[i].splice(2, ((scope.ArrayRequest.length) - 1));
                    }
                }
                if (tipoRepo == "HORA") {
                    tipoRepo = "DIA"
                    scope.frmData.fechaCabecera = "DIA"
                    peti = 2;
                    if (scope.errvar == 1) {
                        tipoRepo = "DIA"
                        scope.frmData.fechaCabecera = "DIA"
                    }
                    for (var i = 0; i < 5; i++) {
                        scope.requestPeti[i] = scope.ArrayRequest[i][peti];
                    }
                    for (var i = 0; i < 5; i++) {
                        scope.ArrayRequest[i].splice(3, ((scope.ArrayRequest.length) - 1));
                    }
                }
                //Almacen de temporales
                scope.frmData.list.reporteRespuestaOperador.request.noQueue = scope.requestPeti[4];
                scope.frmData.list.reporteRespuestaOperador.request.feReport = scope.requestPeti[3];
                scope.frmData.list.reporteRespuestaOperador.request.vaNsv = scope.requestPeti[2];
                scope.frmData.list.reporteRespuestaOperador.request.vaTab = scope.requestPeti[1];
                scope.frmData.list.reporteRespuestaOperador.request.tiReport = scope.requestPeti[0];
                scope.listarRespuestaOperador();
            },
                scope.listaAtencionCli = [];
            //////Cantidad
            scope.labelList = [];
            scope.serialList = [];
            scope.DataArray = [{}];
            //////porcentaje
            scope.labelListporc = [];
            scope.serialListporc = [];
            scope.DataArrayporc = [{}];
            ////////Ejes
            scope.varShowBut = false;
            scope.regulador = false;
            scope.listsize;
            scope.insize;
            scope.listsizeporc;
            scope.insizeporc;
            scope.mayor = 0;
            scope.mayorporc = 0;
            ///////////////variables de almacen temporal
            scope.AtiReport = [];
            scope.AvaTab = [];
            scope.AvaNsv = [];
            scope.AfeReport = [];
            scope.AnoQueue = [];
            scope.requestPeti = [];
            scope.ArrayRequest = [];
            var peti = 0;
            scope.vaciaDatosTemp = function () {
                scope.AtiReport = [];
                scope.AvaTab = [];
                scope.AvaNsv = [];
                scope.AfeReport = [];
                scope.AnoQueue = [];
                scope.requestPeti = [];
                scope.ArrayRequest = [];
                scope.requestPet = [];
            }
            //
            scope.options1 = {
                legend: { display: true },

            }
            scope.options2 = {
                legend: { display: true },

            }
            //
            scope.listarRespuestaOperador = function () {
                scope.ui.isFilesLoaded = false;
                if (scope.varboton == 1) {
                    scope.vaciaDatosTemp();
                    scope.frmData.fechaCabecera = "AÑO"
                    scope.frmData.list.reporteRespuestaOperador.request.tiReport = "ANUAL";
                    scope.frmData.list.reporteRespuestaOperador.request.feReport = "";
                    scope.varboton = 0;
                }
                scope.varShow = false;
                scope.mayor = 0;
                callCenterReporteService.reporteRespuestaOperador(scope.dataInfo).post({}, scope.frmData.list.reporteRespuestaOperador.request, function (result) {
                    if (result.estado == 1) {
                        scope.ui.isFilesLoaded = true;
                        scope.ui.isListSoundEmpty = false;
                        scope.enades = false;
                        scope.labelList = result.graficoLlamada.labelList;
                        scope.serialList = result.graficoLlamada.serieList;
                        scope.DataArray = result.graficoLlamada.data;
                        listsize = (result.graficoLlamada.serieList).length;
                        insize = (result.graficoLlamada.labelList).length;
                        scope.labelListporc = result.graficoLlamada.labelList;
                        scope.serialListporc = result.graficoLlamada.serieListporc;
                        scope.DataArrayporc = result.graficoLlamada.dataDecimal;
                        listsizeporc = (result.graficoLlamada.serieListporc).length;
                        insizeporc = (result.graficoLlamada.labelList).length;
                        scope.listaAtencionCli = result.lsreporteAtencionCliente;
                        scope.varShow = true;
                        if (result.lsreporteAtencionCliente.length == 0) {
                            scope.ui.isListSoundEmpty = true;
                            scope.ui.isFilesLoaded = false;
                            scope.varShow = false;
                            scope.enades = true;
                        }
                        if (scope.vertipoant == 1) {
                            scope.vertipoant = 0;
                        } else {
                            scope.ArrayRequest = [];
                            scope.AtiReport.push(scope.frmData.list.reporteRespuestaOperador.request.tiReport);
                            scope.AvaTab.push(scope.frmData.list.reporteRespuestaOperador.request.vaTab);
                            scope.AvaNsv.push(scope.frmData.list.reporteRespuestaOperador.request.vaNsv);
                            scope.AfeReport.push(scope.frmData.list.reporteRespuestaOperador.request.feReport);
                            scope.AnoQueue.push(scope.frmData.list.reporteRespuestaOperador.request.noQueue);
                            scope.ArrayRequest.push(scope.AtiReport);
                            scope.ArrayRequest.push(scope.AvaTab);
                            scope.ArrayRequest.push(scope.AvaNsv);
                            scope.ArrayRequest.push(scope.AfeReport);
                            scope.ArrayRequest.push(scope.AnoQueue);
                        }
                    }
                    else {
                        scope.ui.isListSoundEmpty = true;
                        scope.ui.isFilesLoaded = false;
                        scope.varShow = false;
                        scope.enades = true;
                        scope.listaAtencionCli = [];
                        scope.errvar = 1;
                        scope.chek = 1;
                        toastr.remove();
                        toastr.info("No se encontraron datos en su consulta", "Anuncio", viewConfig.toastConfig);
                        //  scope.tipoantverif = 0;
                    }
                }, function (error) {

                    console.error(error);
                });
            },
                //Descarga de archivo
                scope.valExcel = 1;
            scope.vaPdf = 2;
            scope.enades = true;
            scope.descargarArchivo = function (valor) {
                scope.enades = true;
                scope.frmData.list.reporteRespuestaOperador.request.tipoFile = valor;
                callCenterReporteService.reporteGAtencionCliente(scope.dataInfo).post({}, scope.frmData.list.reporteRespuestaOperador.request, function (result) {

                    if (result.estado == 1) {
                        if (valor == 1) {
                            scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                            download(scope.pdf, "listaAtencionCliente.xls", "application/xls");
                        } else if (valor == 2) {
                            scope.pdf = 'data:applicatio/pdf;base64,' + result.reporteFile;
                            download(scope.pdf, "listaAtencionCliente.pdf", "application/pdf");
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

            scope.lsCola = [];
            scope.listarColas = function () {
                callCenterReporteService.reporteListaColas(scope.dataInfo).post({},
                    function (result) {
                        if (result.estado == 1) {
                            scope.lsCola = [scope.itemComboConstants.itemAllQueues];
                            scope.lsCola = scope.lsCola.concat(result.colaLista);
                        }
                    }, function (error) {
                        console.error(error);
                    });
            },
                scope.OnloadPage = function () {
                    scope.listarColas();
                    scope.varShow = false;
                }
            scope.OnloadPage();
        }


    ]);