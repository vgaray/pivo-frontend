angular.module('callCenterReporteAgente')
    .controller('listaAtendidaAbandonadaCtrl', [ 'callCenterReporteAgenteService', 'localStorageService', '$location', '$timeout','viewConfig',
        function(callCenterReporteAgenteService, localStorageService, $location, $timeout,viewConfig) {
            var scope = this;

            scope.varnab = $location.search();
            scope.dataInfo= {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia : scope.varnab.idInstancia
            }
            
            scope.frmData = {                
                name_page_title : "Reporte: Llamadas Atendidas y Abandonadas",
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
                    table : true
                },
                reporte : {
                    listarAtenAban : {
                        request  : {
                            cola   : "",
                            agente : 0,
                            feIni  : "2000-01-01",
                            feFin  : "2000-01-01",
                            nuRegisMostrar: 10,
                            tipoFile : 1
                        },
                        response : { }
                    },
                    listarAgente : {
                        request :{ },
                        response : { }
                    }
                },
                temporal: {},
                electivo: {
                    nuPagina: 1,
                    tipoFile: 1
                }
            }
            scope.lsLlamadaAtendidaAbandonada = [];
            scope.lsCola          = [],
            scope.lsAgentePorCola = [],
            scope.currentPage     = 1;
            scope.totalItems      = 0;
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
            //Paginacion
            scope.pageChanged = function(valor){
                scope.BuscarLlamadasAtendidasAbandonadas(valor);
            };

            scope.listaLlamadasAtendidasAbandonadas = function(){
                if(scope.frmData.reporte.listarAgente.request != null){
                    (scope.frmData.reporte.listarAgente.request.idAgente == null || scope.frmData.reporte.listarAgente.request.idAgente == "") ? 
                    scope.frmData.reporte.listarAtenAban.request.agente = 0 : scope.frmData.reporte.listarAtenAban.request.agente = scope.frmData.reporte.listarAgente.request.idAgente;
                } else {
                    scope.frmData.reporte.listarAtenAban.request.agente = 0
                }
                callCenterReporteAgenteService.listaLlamadasAtendidasAbandonadas(scope.dataInfo).post({}, scope.frmData.electivo, 
                function(result){
                    if(result.estado == 1){
                        scope.lsLlamadaAtendidaAbandonada = result.lsAtendidasAbandonadas;
                        if(scope.lsLlamadaAtendidaAbandonada.length == 0){
                            scope.frmData.show.table = true;
                            scope.frmData.texto      = "No se encontraron resultados";
                            scope.frmData.show.text  = false;
                            scope.menuState.show     = true;
                        }
                        else {
                            scope.totalItems         = scope.lsLlamadaAtendidaAbandonada[0].nuTotalReg;
                            scope.frmData.show.table = false;
                            scope.frmData.show.text  = true;
                            scope.menuState.show     = false;
                        } 
                        console.log("total 1::: "+scope.totalItems);
                    } else if(result.estado == 0 || result.estado == -1){
                        toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastrConfig);
                    }
                    console.log("total 2::: "+scope.totalItems);
                }, function(error){
                    console.error(error);
                })
                console.log("total 3::: "+scope.totalItems);
            }

            scope.BuscarLlamadasAtendidasAbandonadas = function(valor){
                if(scope.frmData.reporte.listarAtenAban.request.idQueues != null) {
                    scope.cambiar();
                    scope.cambiarf();
                    //por paginación
                    if(valor == 0) {
                        scope.frmData.temporal.nuPagina = scope.currentPage;
                        scope.frmData.electivo          = scope.frmData.temporal;
                        scope.listaLlamadasAtendidasAbandonadas();
                    }
                    //por el botón buscar 
                    else if(valor == 1) {
                        scope.frmData.reporte.listarAtenAban.request.feIni = scope.varia;
                        scope.frmData.reporte.listarAtenAban.request.feFin = scope.variaf;
                        if(scope.frmData.reporte.listarAgente.request != null){
                            (scope.frmData.reporte.listarAgente.request.idAgente == null || scope.frmData.reporte.listarAgente.request.idAgente == "") ? 
                            scope.frmData.reporte.listarAtenAban.request.agente = 0 : scope.frmData.reporte.listarAtenAban.request.agente = scope.frmData.reporte.listarAgente.request.idAgente;
                        } else {
                            scope.frmData.reporte.listarAtenAban.request.agente = 0
                        }
                        scope.frmData.reporte.listarAtenAban.request.nuPagina = scope.currentPage;
                        scope.frmData.electivo = scope.frmData.reporte.listarAtenAban.request;
                        scope.requestTemporal();
                        scope.listaLlamadasAtendidasAbandonadas(valor);
                    }
                }
                else {
                    scope.frmData.show.table = true;
                    scope.frmData.texto      = "";
                    scope.frmData.show.text  = false;
                    toastr.error("Debe seleccionar una cola","Error al seleccionar cola", viewConfig.toastrConfig);
                }
            }
            //llena el request temporal
            scope.requestTemporal = function() {
                scope.frmData.temporal.cola   = scope.frmData.reporte.listarAtenAban.request.cola;
                scope.frmData.temporal.feIni  = scope.frmData.reporte.listarAtenAban.request.feIni;
                scope.frmData.temporal.feFin  = scope.frmData.reporte.listarAtenAban.request.feFin;
                (scope.frmData.reporte.listarAgente.request != null) ? scope.frmData.temporal.agente = scope.frmData.reporte.listarAgente.request.agente : scope.frmData.temporal.agente = 0 ;
                scope.frmData.temporal.nuRegisMostrar = scope.frmData.reporte.listarAtenAban.request.nuRegisMostrar;
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

            scope.listaAgente = {
                idQueue : 0
            }

            scope.changeAgente = function(value) {
                scope.lsAgentePorCola = [];
                if(value != null) {
                    scope.frmData.reporte.listarAtenAban.request.cola = value.name;
                    scope.listaAgente.idQueue = value.idQueues;
                    scope.listarAgentePorCola();
                }
            }

            scope.listarAgentePorCola = function () {
                callCenterReporteAgenteService.listaAgentePorCola(scope.dataInfo).post({}, scope.listaAgente,
                    function(result) {
                        if(result.estado == 1) {
                            scope.lsAgentePorCola = scope.lsAgentePorCola.concat(result.listado);
                            scope.frmData.reporte.listarAtenAban.request.agente = scope.lsAgentePorCola.idAgente;
                        } else if(result.estado == 0 || result.estado == -1){
                            toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastrConfig);
                        }
                    }, function(error){
                        console.error(error);
                    });
            }

            //Validar las colas
            scope.validateCola = function () {
                if(scope.frmData.reporte.listarAtenAban.request != null) {
                    if(scope.frmData.reporte.listarAtenAban.request.idQueues != null) {
                        scope.frmData.habColas = false;
                    } else {
                        scope.frmData.habColas = true;
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
                scope.frmData.reporte.listarAtenAban.request.tipoFile = valor;
                callCenterReporteAgenteService.reporteAtendidasAbandonadas(scope.dataInfo).post({}, scope.frmData.electivo,
                    function(result) {
                        if(result.estado == 1) {
                            if(valor == 1) {
                                scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                                download(scope.pdf,"reporteLlamadasAtendidasAbandonadas.xls", "application/xls");
                            } else if (valor == 2) {
                                scope.pdf = 'data:application/pdf;base64,' + result.reporteFile;
                                download(scope.pdf,"reporteLlamadasAtendidasAbandonadas.pdf", "application/pdf");
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