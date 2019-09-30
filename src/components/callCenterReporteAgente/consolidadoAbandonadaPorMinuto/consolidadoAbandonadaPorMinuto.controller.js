angular.module('callCenterReporteAgente')
    .controller('consolidadoAbandonadaPorMinutoCtrl' , ['callCenterReporteAgenteService', 'localStorageService', '$location', '$timeout','viewConfig',
        function (callCenterReporteAgenteService, localStorageService, $location, $timeout,viewConfig) {
            var scope = this;

            scope.varnab = $location.search();
            scope.dataInfo= {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia : scope.varnab.idInstancia
            }

            scope.frmData = {
                name_page_title : "Reporte: Consolidado Llamadas Abandonadas Por Minuto",
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
                show  : {
                    text  : false,
                    table : true
                },
                reporte : {
                    consAbanPorMin :{
                        request :{
                            cola     : "",
                            feIni    : "2000-01-01",
                            feFin    : "2000-01-01",
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
            scope.lsAbanPorMinuto = [],
            scope.lsCola          = [],
            scope.menuState       = {};
            scope.menuState.show  = true;
            scope.pdfVal          = 2;
            scope.excelVal        = 1;
            
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

            scope.listaConsolidadoAbanPorMin = function(){
                scope.frmData.reporte.consAbanPorMin.request.cola = scope.frmData.reporte.consAbanPorMin.request.name;
                callCenterReporteAgenteService.listaConsolidadoAbandonadasPorMinuto(scope.dataInfo).post({}, scope.frmData.reporte.consAbanPorMin.request, 
                function(result){
                    if(result.estado == 1){
                        scope.lsAbanPorMinuto = result.lsLlamadasEntradasPorMinuto;
                        if(scope.lsAbanPorMinuto[0].nuLlamada == null && scope.lsAbanPorMinuto[0].abaMenor == null && scope.lsAbanPorMinuto[0].abaMayor == null){
                            scope.frmData.show.table = true;
                            scope.frmData.texto      = "No se encontraron resultados";
                            scope.frmData.show.text  = false;
                            scope.menuState.show     = true;
                        }
                        else {
                            scope.frmData.show.table = false;
                            scope.frmData.show.text  = true;
                            scope.menuState.show     = false;
                        }
                    } else if(result.estado == 0 || result.estado == -1){
                        toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastrConfig);
                    }
                }, function(error){
                    console.error(error);
                })
            }

            scope.consolidadoAbanPorMin = function(){
                if(scope.frmData.reporte.consAbanPorMin.request != null) {
                    scope.cambiar();
                    scope.cambiarf();
                    scope.frmData.reporte.consAbanPorMin.request.feIni = scope.varia;
                    scope.frmData.reporte.consAbanPorMin.request.feFin = scope.variaf;
                    
                    if(scope.frmData.reporte.consAbanPorMin.request.idQueues == null) {
                        toastr.error("Debe seleccionar una cola","Error al seleccionar cola", viewConfig.toastrConfig);
                    }
                    else{
                        scope.frmData.electivo = scope.frmData.reporte.consAbanPorMin.request;
                        scope.requestTemporal();
                        scope.listaConsolidadoAbanPorMin();
                    }
                }
                else {
                    scope.frmData.show.table = true;
                    scope.frmData.texto      = "";
                    scope.frmData.show.text  = false;
                    toastr.error("Debe seleccionar una cola","Error al seleccionar cola", viewConfig.toastrConfig);
                }
            }

            //request temporal
            scope.requestTemporal = function() {
                scope.frmData.temporal.cola   = scope.frmData.reporte.consAbanPorMin.request.cola;
                scope.frmData.temporal.feFin  = scope.frmData.reporte.consAbanPorMin.request.feFin;
                scope.frmData.temporal.feIni  = scope.frmData.reporte.consAbanPorMin.request.feIni;
            }

            //Cargar el combo
            scope.listarColas = function () {
                callCenterReporteAgenteService.listaCola(scope.dataInfo).post({}, {},
                    function(result){
                        if(result.estado == 1){
                            scope.lsCola = scope.lsCola.concat(result.colaLista);
                        } else if(result.estado == 0 || result.estado == -1){
                            toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastrConfig);
                        }
                    }, function(error){
                        console.error(error);
                    });
            }

            //Validar las colas
            scope.validateCola = function () {
                if(scope.frmData.reporte.consAbanPorMin.request != null) {
                    if(scope.frmData.reporte.consAbanPorMin.request.idQueues == null) {
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
                        toastr.error("Fecha inicial no puede ser mayor a la fecha final", "Error de Fechas", viewConfig.toastrConfig);
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
                        toastr.error("Fecha final no puede ser menor a la fecha inicial", "Error de Fechas", viewConfig.toastrConfig);
                    } 
                    else if( scope.dtf < new Date("1-1-2016") ) {
                        scope.dtf = new Date("1-1-2016");
                    }
                    else if( scope.dtf > new Date()) {
                        scope.dtf = new Date();
                        toastr.error("Fecha final no puede ser mayor a la fecha actual", "Error de Fechas", viewConfig.toastrConfig);
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
                callCenterReporteAgenteService.reporteConsAbandonadaPorMin(scope.dataInfo).post({}, scope.frmData.electivo,
                    function(result) {
                        console.log(result.estado);
                        if(result.estado == 1) {
                            
                            if(valor == 1) {
                                scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                                download(scope.pdf,"reporteAbandonadasPorMinuto.xls", "application/xls");
                            } else if (valor == 2) {
                                scope.pdf = 'data:application/pdf;base64,' + result.reporteFile;
                                download(scope.pdf,"reporteAbandonadasPorMinuto.pdf", "application/pdf");
                            } else {
                                toastr.error("Error al descargar el archivo", "Error de Descarga", viewConfig.toastrConfig);
                            }
                        } else if(result.estado == 0 || result.estado == -1) {
                            toastr.error("Error al descargar el archivo", "Error de Descarga", viewConfig.toastrConfig);
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
        }
    ]);