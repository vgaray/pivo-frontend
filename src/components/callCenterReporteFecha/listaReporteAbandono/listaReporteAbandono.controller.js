angular.module('callCenterReporteFecha')
    .controller('listaReporteAbandono',['callCenterReporteFechaService','localStorageService','$location','$timeout','viewConfig',
    function(callCenterReporteFechaService,localStorageService,$location,$timeout,viewConfig){

        var scope = this;
        scope.varnab = $location.search();
        scope.dataInfo = {
            codUsuario : localStorageService.get("codUsuario"),
            token      : localStorageService.get("token"),
            idInstancia: scope.varnab.idInstancia
        }

        scope.frmData = {
            name_page_title:"Lista de Reporte de Abandonos",

            reporte : {
                lReporteAbandonos : {
                    request: {
                        noQueue : "",
                        feIniCon: "",
                        feFinCon: "",
                        pNuPagina: 1,
                        pNuReg : 10,
                        tipoFile: 1
                        //lsReporteAbandonos
                    },
                    response : {}
                }
            },
            temporal : {},
            electivo : {
                pNuPagina : 1,
                tipoFile  : 1
            },
            //Combo Colas
            comboColas : {
                idQueue : 0,
                name    : "Todos"
            }
        }

        //Calendario Inicio
        scope.dt = new Date();
        scope.varia = new Date();
        scope.open = function(){
            $timeout(function(){
                scope.opened = true;
            })
        }

        scope.dateOptions = {
            minDate: null
        }

        scope.cambiar = function(){
            if( scope.dt == null ){
                scope.varia = "NoValido";
            } else {
                var d = scope.dt, month = '' + (d.getMonth() + 1),
                                day   = '' + d.getDate(),
                                year  = d.getFullYear();
                if(month.length<2) month = '0' + month;
                if(day.length < 2) month = '0' + day;
                scope.varia = year + '-' + month + '-' + day;
            }
        }

        //Calendario Fin
        scope.dtf = new Date();
        scope.variaf = new Date();
        scope.openf = function(){
            $timeout(function(){
                scope.openedf = true;
            })
        }

        scope.dateOptionsf = {
            minDate : null
        }

        scope.cambiarf = function(){
            if( scope.dtf == null ){
                scope.variaf = "NoValido";
            } else {
                var d = scope.dtf, month = '' + (d.getMonth() + 1),
                                day   = '' + d.getDate(),
                                year  = d.getFullYear();
                if(month.length<2) month = '0' + month;
                if(day.length < 2) month = '0' + day;
                scope.variaf = year + '-' + month + '-' + day;
            }
        }
        

        //Listar Reporte Abandonos
        scope.lsReporteAbandono = [];

        scope.validaGrilla = true;
        scope.validaVacio  = true;
        
        scope.varTotalHa = false;
        scope.varHa1 = false;
        scope.varHa2 = false;

        scope.menuState = {}
        scope.menuState.show = true;

        scope.requestTemporal = function(){
            scope.frmData.temporal.noQueue  = scope.frmData.reporte.lReporteAbandonos.request.noQueue;
            scope.frmData.temporal.feIniCon = scope.frmData.reporte.lReporteAbandonos.request.feIniCon;
            scope.frmData.temporal.feFinCon = scope.frmData.reporte.lReporteAbandonos.request.feFinCon;
            scope.frmData.temporal.pNuReg = scope.frmData.reporte.lReporteAbandonos.request.pNuReg;
        }

        scope.listarReporteAbandonos = function(){
            callCenterReporteFechaService.listarReporteAbandono(scope.dataInfo).post({},scope.frmData.electivo,
            function(result){
                if(result.estado == 1){
                    scope.lsReporteAbandono = result.lsReporteAbandonos;                    
                    if(scope.lsReporteAbandono.length == 0){
                        scope.menuState.show = true;
                        scope.validaGrilla   = true;
                        scope.validaVacio    = false;
                        result.mensaje="Conexion Correcta";
                        //toastr.success(result.mensaje,"Ningun elemento encontrado",viewConfig.toastrConfig);
                    } else {
                        scope.menuState.show = false;
                        scope.validaGrilla   = false;
                        scope.validaVacio    = true;                        
                        scope.totalItems = scope.lsReporteAbandono[0].nuTotalReg;
                        if(scope.var == 1){
                            scope.currentPage = 1;
                            //toastr.success("Consulta Exitosa","Accion realizada",viewConfig.toastrConfig);
                        }
                    }
                } else if(result.estado == 0 || result.estado == -1 ){                    
                    toastr.error("Ocurrio un error al mostrar la lista","Error al mostrar la lista",viewConfig.toastrConfig);
                }

            }, function(error){
                console.error(error);
            })
        }

        scope.lsComboColas = [];
        scope.buscarColasCombo = function(){
            callCenterReporteFechaService.listarQueueName(scope.dataInfo).post({}, scope.frmData.comboColas,
            function(result){
                if(result.estado == 1){
                    scope.lsComboColas = [scope.frmData.comboColas];
                    scope.lsComboColas = scope.lsComboColas.concat( result.colaLista );
                } else if(result.estado == 0 || result.estado == -1){
                    console.error('Error: ' + resut.mensaje);
                }
            }, function(error){
                console.error('Error: '+ error);
            })
        }

        //Paginacion
        /*scope.currentPage = 1;
        scope.numPerPage = 10;
        scope.pageChanged = function(valor){
            var begin, end, index;
            begin = ( scope.currentPage - 1 ) * scope.numPerPage;
            end = begin + scope.numPerPage;
            index = scope.lsReporteAbandono.indexOf(valor);
            return (begin <= index && index < end);
        }*/

        //Fecha Inicio
        scope.validaAnteriorInicio = function(){
            if(scope.dt == null){
                scope.varHa1 = true;
            } else {
                if( scope.dt < new Date("1-1-2017") ){
                    scope.dt = new Date("1-1-2017");
                } else if( scope.dt > new Date(Date.now()) ){
                    scope.dt = new Date(Date.now());
                }
                scope.varHa1 = false;
            }
            scope.validaBotonHab();
        }

        //Fecha Fin
        scope.validaAnteriorFin = function(){            
            if(scope.dtf == null){
                scope.varHa2 = true;
            } else {
                if(scope.dtf > new Date(Date.now())){
                    scope.dtf = new Date(Date.now());
                } else if(scope.dtf < new Date("1-1-2017")){
                    scope.dtf = new Date("1-1-2017");
                }
                scope.varHa2 = false;
            }
            scope.validaBotonHab();
        }

        //Boton Activar Buscar
        scope.validaBotonHab = function(){
            if(scope.varHa1 == false && scope.varHa2 == false){
                scope.varTotalHa = false;
            } else {
                scope.varTotalHa = true;
            }
        }


        scope.excelVal = 1;
        scope.pdfVal   = 2;

        scope.descargarArchivo = function(valor){
            scope.frmData.reporte.lReporteAbandonos.request.tipoFile = valor;
            callCenterReporteFechaService.reporteListaLlamadasAbandonadas(scope.dataInfo).post({},scope.frmData.reporte.lReporteAbandonos.request,function(result){
                if(result.estado == 1){
                    if(valor == 1){
                        scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                        download(scope.pdf, "listaReporteAbandono.xls","application/xls");
                    } else if(valor == 2){
                        scope.pdf = 'data:application/pdf;base64,' + result.reporteFile;
                        download(scope.pdf, "listaReporteAbandono.pdf","application/xls");
                    }
                    //toastr.success("Archivo descargado exitosamente", "Acción realizada", viewConfig.toastConfig);
                } else if(result.estado == 0 || result.estado == -1){
                    toastr.error("Ocurrio un error al descargar archivo", "Error de Servidor", viewConfig.toastConfig)
                }
            }, function(error){
                  console.error(error);
            })
        }        

        scope.BuscarListaReporteAbandonos = function(valor){
            scope.cambiar();
            scope.frmData.reporte.lReporteAbandonos.request.feIniCon = scope.varia;
            scope.cambiarf();
            scope.frmData.reporte.lReporteAbandonos.request.feFinCon = scope.variaf;
            scope.pri = new Date(scope.frmData.reporte.lReporteAbandonos.request.feIniCon);
            scope.sec  = new Date(scope.frmData.reporte.lReporteAbandonos.request.feFinCon);
            
            scope.var = valor;

            if(scope.var == 0){
                scope.frmData.temporal.pNuPagina = scope.currentPage;
                scope.frmData.electivo  = scope.frmData.temporal;
               // scope.frmData.reporte.lReporteAbandonos.request.pNuPagina = scope.frmData.temporal.pNuPagina;
                scope.listarReporteAbandonos();
            }
            else if(scope.var == 1){
                if(scope.frmData.reporte.lReporteAbandonos.request.feIniCon == "NoValido" && scope.frmData.reporte.lReporteAbandonos.request.feFinCon !="NoValido"){
                    toastr.error("Formato Incorrecto en Fecha de Inicio","Error en fechas",viewConfig.toastConfig);
                }else if(scope.frmData.reporte.lReporteAbandonos.request.feIniCon != "NoValido" && scope.frmData.reporte.lReporteAbandonos.request.feFinCon =="NoValido"){
                    toastr.error("Formato Incorrecto en Fecha de Inicio","Error en fechas",viewConfig.toastConfig);
                }else if(scope.frmData.reporte.lReporteAbandonos.request.feIniCon == "NoValido" && scope.frmData.reporte.lReporteAbandonos.request.feFinCon =="NoValido"){
                    toastr.error("Ingrese el formato adecuado de fechas","Error en fechas",viewConfig.toastConfig);
                }else if(scope.pri > scope.sec){
                    toastr.remove();
                    toastr.error("Fec. Inicio no puede ser mayor a Fec. Fin","Error de fechas",viewConfig.toastConfig);
                } else {
                    if(scope.frmData.comboColas.idQueue == 0){
                        scope.frmData.reporte.lReporteAbandonos.request.noQueue = "";
                    }
                    else{
                        scope.frmData.reporte.lReporteAbandonos.request.noQueue  = scope.frmData.comboColas.name;
                    } 
                    scope.frmData.electivo = scope.frmData.reporte.lReporteAbandonos.request;
                    scope.requestTemporal();
                    scope.listarReporteAbandonos();
                }
            }
        }

        scope.pageChanged = function(valor){
            scope.BuscarListaReporteAbandonos(valor);
        }

        scope.OnloadPage = function(){
           //scope.listarReporteAbandonos();
            scope.buscarColasCombo();
        }

        scope.OnloadPage();

    }
])