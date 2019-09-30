angular.module('callCenterReporteAgente')
    .controller('listaEntrantePorHoraCtrl', [ 'callCenterReporteAgenteService', 'localStorageService', '$location', '$timeout','viewConfig',
        function(callCenterReporteAgenteService, localStorageService, $location, $timeout,viewConfig) {
            var scope = this;

            scope.varnab = $location.search();
            scope.dataInfo= {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia : scope.varnab.idInstancia
            }

            scope.frmData = {
                name_page_title : "Reporte: Llamadas entrantes por hora",
                habColas        : true,
                habFeIni        : false,
                habFeFin        : false,
                habFinal        : true,
                texto           : "",
                msjError : {
                    feIni : "*formato incorrecto",
                    feFin : "*formato incorrecto",
                    colas : "*Debe seleccionar una cola",
                },
                texto : "",
                show  : {
                    text  : false,
                    table : true,
                    graphs : true
                },
                reporte : {
                    listarEntranteHora :{
                        request :{
                            cola     : "",
                            feIni    : "2000-01-01",
                            feFin    : "2000-01-01"
                        },
                        response :{ },
                    }
                },
                temporal : {},
                electivo : {
                    tipoFile : 1,
                }
            }
            
            scope.diaPresente = new Date();
            scope.lsEntrantesPorHora = [],
            scope.lsCola             = [],
            scope.labelList          = [];
            scope.serialList         = [];
            scope.DataArray          = [{}];
            scope.menuState          = {};
            scope.menuState.show     = true;
            scope.pdfVal             = 2;
            scope.excelVal           = 1;

            scope.options = { 
                legend: { display: true },
                scales: {
                    yAxes: [{ id: 'y-axis-1', type: 'linear', position: 'left', ticks   : {min: 0} }]
                }
            };
            
            //Calendario Inicio:
            scope.dt    = new Date();
            scope.varia = new Date();
            scope.open  = function(){
                $timeout(function(){
                    scope.opened = true;
                })
            }
            //Como se debe pintar en el input
            scope.cambiar = function(){
                var d = scope.dt, month  = '' + (d.getMonth() + 1)
                                , day    = '' + d.getDate()
                                , year   = d.getFullYear();
                if(month.length < 2) month = '0' + month;
                if(day.length < 2)   day   = '0' + day;
                scope.varia = year + '-' + month + '-' + day;
            }
            //Calendario Fin
            scope.dtf    = new Date();
            scope.variaf = new Date();
            scope.openf  = function(){
                $timeout(function(){
                    scope.openedf = true;
                })
            }
            //Como se debe pintar en el input
            scope.cambiarf = function(){
                var d = scope.dtf, month  = '' + (d.getMonth() + 1)
                                 , day    = '' + d.getDate()
                                 , year   = d.getFullYear();
                if(month.length < 2) month = '0' + month;
                if(day.length < 2)   day   = '0' + day;
                scope.variaf = year + '-' + month + '-' + day;
            }

            scope.llamadasEntrantePorHora = function(){
                scope.frmData.reporte.listarEntranteHora.request.cola = scope.frmData.reporte.listarEntranteHora.request.name;
                callCenterReporteAgenteService.listaLlamadasEntrantePorHora(scope.dataInfo).post({}, scope.frmData.reporte.listarEntranteHora.request, 
                function(result){
                    if(result.estado == 1){
                        scope.lsEntrantesPorHora = result.lsLlamadasEntrantesPorHora;
                        scope.labelList          = result.grafico.lsLabel;
                        scope.serialList         = result.grafico.lsSerial;
                        scope.DataArray          = result.grafico.data;
                        if(scope.lsEntrantesPorHora.length == 0){
                            scope.frmData.show.table = true;
                            scope.frmData.show.graphs= true;
                            scope.frmData.texto      = "No se encontraron resultados";
                            scope.frmData.show.text  = false;
                            scope.menuState.show     = true;
                        }
                        else {
                            scope.frmData.show.table = false;
                            scope.frmData.show.graphs= false;
                            scope.frmData.show.text  = true;
                            scope.menuState.show     = false;
                        } 
                    } else if(result.estado == 0 || result.estado == -1){
                        toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastConfig);
                    }    
                }, function(error){
                    console.error(error);
                });
                
            }

            scope.BuscarEntrantesPorHora = function(){
                if(scope.frmData.reporte.listarEntranteHora.request.idQueues != null) {
                    scope.cambiar();
                    scope.cambiarf();
                    scope.frmData.reporte.listarEntranteHora.request.feIni = scope.varia;
                    scope.frmData.reporte.listarEntranteHora.request.feFin = scope.variaf;

                    scope.frmData.electivo = scope.frmData.reporte.listarEntranteHora.request;
                    scope.requestTemporal();
                    scope.llamadasEntrantePorHora();
                }
                else {
                    scope.frmData.show.table = true;
                    scope.frmData.show.graphs= true;
                    scope.frmData.texto      = "";
                    scope.frmData.show.text  = false;
                    scope.menuState.show     = true;
                }                
            }

            //request temporal
            scope.requestTemporal = function () {
                scope.frmData.temporal.cola  = scope.frmData.reporte.listarEntranteHora.request.cola;
                scope.frmData.temporal.feIni = scope.frmData.reporte.listarEntranteHora.request.feIni;
                scope.frmData.temporal.feFin = scope.frmData.reporte.listarEntranteHora.request.feFin;
            }

            //Cargar el combo
            scope.listarColas = function () {
                callCenterReporteAgenteService.listaCola(scope.dataInfo).post({}, {},
                    function(result){
                        if(result.estado == 1){
                            scope.lsCola = scope.lsCola.concat(result.colaLista);
                        } else if(result.estado == 0 || result.estado == -1){
                            toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastConfig);
                        }
                    }, function(error){
                        console.error(error);
                    });
            }

            //Validar las colas
            scope.validateCola = function () {
                if(scope.frmData.reporte.listarEntranteHora.request != null) {
                    if(scope.frmData.reporte.listarEntranteHora.request.idQueues == null) {
                        scope.frmData.habColas = true;
                    } else {
                        scope.frmData.habColas = false;
                    }
                } else {
                    scope.frmData.habColas = true;
                }
                scope.habilitaBoton();
            }

            //Validar fecha inicio
            scope.validateDateIni = function () {
                if (scope.dt == null) {
                    scope.frmData.habFeIni = true;
                } else {
                    if (scope.dt < new Date("1-1-2016")) {
                        scope.dt = new Date("1-1-2016");
                    } 
                    else if(scope.dt > scope.dtf) {
                        scope.dt = scope.dtf;
                        toastr.error("Fecha inicial no puede ser mayor a la fecha final", "Error de Fechas", viewConfig.toastConfig);
                    }
                    scope.frmData.habFeIni = false;
                }
                scope.habilitaBoton();
            }

            //Validar fecha final
            scope.validateDateFin = function () {
                if (scope.dtf == null) {
                    scope.frmData.habFeFin = true;
                } else {
                    if (scope.dtf < scope.dt) {
                        scope.dtf = scope.dt;
                        toastr.error("Fecha final no puede ser menor a la fecha inicial", "Error de Fechas", viewConfig.toastConfig);
                    } 
                    else if( scope.dtf < new Date("1-1-2016") ) {
                        scope.dtf = new Date("1-1-2016");
                    }
                    else if( scope.dtf > new Date()) {
                        scope.dtf = new Date();
                        toastr.error("Fecha final no puede ser mayor a la fecha actual", "Error de Fechas", viewConfig.toastConfig);
                    }
                    scope.frmData.habFeFin = false;
                }
                scope.habilitaBoton();
            }

            scope.habilitaBoton = function () {
                if(scope.frmData.habColas == false && scope.frmData.habFeIni == false && scope.frmData.habFeFin == false) {
                    scope.frmData.habFinal = false;
                } else {
                    scope.frmData.habFinal = true
                }
            }

            scope.descargarDocumento = function (valor) {
                scope.frmData.electivo.tipoFile = valor;
                callCenterReporteAgenteService.reporteEntrantePorHora(scope.dataInfo).post({}, scope.frmData.electivo,
                    function(result) {
                        if(result.estado == 1) {
                            if(valor == 1) {
                                scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                                download(scope.pdf,"reporteLlamadasEntrantePorHora.xls", "application/xls");
                            } else if (valor == 2) {
                                scope.pdf = 'data:application/pdf;base64,' + result.reporteFile;
                                download(scope.pdf,"reporteLlamadasEntrantePorHora.pdf", "application/pdf");
                            } else {
                                toastr.error("Error al descargar el archivo", "Error de Descarga", viewConfig.toastConfig);
                            }
                        } else if(result.estado == 0 || result.estado == -1) {
                            toastr.error("Error al descargar el archivo", "Error de Descarga", viewConfig.toastConfig);
                        }
                    }, function(error) {
                        console.error(error);
                    }
                )
            }

            scope.loadPage = function (){
                scope.listarColas();
            }
            scope.loadPage();
        }]
);