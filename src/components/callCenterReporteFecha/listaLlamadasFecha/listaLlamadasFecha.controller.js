angular.module('callCenterReporteFecha')
    .controller('listaLlamadasFecha',['callCenterReporteFechaService', 'localStorageService', '$location', '$log', '$timeout','viewConfig', '$filter',
    function(callCenterReporteFechaService, localStorageService, $location, $log , $timeout,viewConfig, $filter){
        var scope = this;
        scope.varnab = $location.search();
        scope.dataInfo = {
            codUsuario : localStorageService.get("codUsuario"),
            token      : localStorageService.get("token"),
            idInstancia: scope.varnab.idInstancia
        }

        scope.diaPresente = new Date();

        //request : pQueuename, pFeIni, pFeFin, pNuPagina, pNuReg
        //response: idLlamada, fe_rango, nu_llam, aba_menor, aba_mayor, nu_total_reg
        scope.frmData = {
            name_page_title : "Reporte de Llamadas Atendidas y Abandonadas",
            name_buscar : "Buscar",
            
            reporte:{
                listarLlamadas:{
                    request:{
                        pQueuename :"",
                        pFeIni : "",
                        pFeFin : "",
                        tipoFile : 1,
                        pNuPagina : 1,
                        pNuReg :10
                    },
                    response : {
                        idLlamada : 0,
                        fecha : "",
                        atendidas : "",
                        abandonadasMenor : "",
                        abandonadasMayor : ""
                    }
                }
            },
            miCombo:{
                idQueue :0,
                name :"Todos"
            },
            temporal : {},
            electivo : {
                pNuPagina : 1,
                tipoFile : 1
            },            
            urlPage : $location.path()
        }

        scope.validaGrilla = true;
        scope.validaVacio  = true;

        scope.varTotalHa = false;
        scope.varHa1 = false;
        scope.varHa2 = false;
        //scope.soloDate = /1,2,3,4,5/;
        //Habilitar botones de descarga
        scope.menuState = {}
        scope.menuState.show = false;

        scope.lsLlamadasFecha = [];
        scope.currentPage = 1;
        scope.requestTemporal = function(){
            scope.frmData.temporal.pQueuename = scope.frmData.reporte.listarLlamadas.request.pQueuename;
            scope.frmData.temporal.pFeIni     = scope.frmData.reporte.listarLlamadas.request.pFeIni;
            scope.frmData.temporal.pFeFin     = scope.frmData.reporte.listarLlamadas.request.pFeFin;
            scope.frmData.temporal.pNuReg     = scope.frmData.reporte.listarLlamadas.request.pNuReg;
        }

        scope.listarLlamadasFecha = function() {
            callCenterReporteFechaService.listarLlamadasAtendidasAbandonadas(scope.dataInfo).post({}, scope.frmData.electivo,function(result){
                if(result.estado == 1){
                    scope.lsLlamadasFecha = result.listaLlamadasAtendidasAbandonadas;
                    if(scope.lsLlamadasFecha.length == 0){
                        result.mensaje = "Conexion correcta";
                        scope.menuState.show = false;
                        scope.validaGrilla   = true;
                        scope.validaVacio    = false;
                    } else {
                        scope.menuState.show = true;
                        scope.validaGrilla   = false;
                        scope.validaVacio    = true
                        scope.totalItems = scope.lsLlamadasFecha[0].nuTotalReg;
                        if( scope.var == 1 ){
                            scope.currentPage = 1;
                        }
                    }
                } else if(result.estado == 0 || result.estado == -1){
                     console.error('Error: ' + result.mensaje);
                     toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastConfig)
                }
            }, function(error){
                console.error(error);
            })
        }

        //CalendarioInicio
        scope.dt = new Date();
        scope.varia = new  Date();
        scope.open = function(){
            $timeout(function(){
                scope.opened = true;
            });
        }

        scope.dateOptions = {
            minDate : null
        }

        scope.cambiar = function(){
            if( scope.dt == null){
                scope.varia = "NoValido";
            } else{
                var d = scope.dt, month = '' + (d.getMonth() + 1),day = '' + d.getDate(), year = d.getFullYear();
                if(month.length < 2) month = '0' + month;
                if(day.length < 2) day = '0' + day;
                scope.varia = year + '-' + month + '-' + day;
            }
        }

        //CalendarioFin
        scope.dtf = new Date();
        scope.variaf = new Date();
        scope.openf = function(){
            $timeout(function(){
                scope.openedf = true;
            });
        }
        scope.dateOptionsf = {
            minDate : null
        }
        scope.cambiarf = function(){
            if( scope.dtf == null ){
                scope.variaf = "NoValido";
            } else { 
                var d = scope.dtf;
                month = '' + (d.getMonth() + 1),
                day   = '' + d.getDate(),
                year  = d.getFullYear();
                if(month.length<2) month = '0' + month;
                if(day.length < 2) day = '0' + day;
                scope.variaf = year + '-' + month + '-' + day;
            }
        }

        //Boton Buscar
        scope.BuscarListaLlamadasAtenAbanFechas = function(valor){
            scope.cambiar();
            scope.frmData.reporte.listarLlamadas.request.pFeIni = scope.varia;
            scope.cambiarf();                            
            scope.frmData.reporte.listarLlamadas.request.pFeFin = scope.variaf;
            
            scope.pri = new Date(scope.frmData.reporte.listarLlamadas.request.pFeIni);
            scope.sec = new Date(scope.frmData.reporte.listarLlamadas.request.pFeFin);
            scope.var = valor;
            //Paginacion
            if(scope.var == 0){
                scope.frmData.temporal.pNuPagina = scope.currentPage;
                scope.frmData.electivo = scope.frmData.temporal;
                //scope.frmData.reporte.listarLlamadas.request.pNuPagina = scope.frmData.temporal.numPagina;
                scope.listarLlamadasFecha();
            }
            else if(scope.var == 1){
                if(scope.frmData.reporte.listarLlamadas.request.pFeIni == "NoValido" && scope.frmData.reporte.listarLlamadas.request.pFeFin != "NoValido"){
                    toastr.error("Formato Incorrecto en Fecha de Inicio","Error en fechas",viewConfig.toastConfig);
                } else if(scope.frmData.reporte.listarLlamadas.request.pFeFin == "NoValido" && scope.frmData.reporte.listarLlamadas.request.pFeIni != "NoValido"){
                    toastr.error("Formato Incorrecto en Fecha Fin","Error en fechas",viewConfig.toastConfig);
                } else if(scope.frmData.reporte.listarLlamadas.request.pFeFin == "NoValido" && scope.frmData.reporte.listarLlamadas.request.pFeIni == "NoValido"){
                    toastr.error("Ingrese el formato adecuado de fechas","Error en fechas",viewConfig.toastConfig);
                } else if(scope.pri > scope.sec){
                    toastr.remove();
                    toastr.error("Fec. Inicio no puede ser mayor a Fec. Fin","Error de fechas",viewConfig.toastConfig);
                }
                //scope.frmData.reporte.listarLlamadas.request.pQueuename = "";
                else{
                    scope.ini =new Date(scope.frmData.reporte.listarLlamadas.request.pFeIni);
                    scope.fin =new Date(scope.frmData.reporte.listarLlamadas.request.pFeFin);
                    
                    if(scope.frmData.miCombo.idQueue == 0){
                        scope.frmData.reporte.listarLlamadas.request.pQueuename = "";                    
                    } else {
                        scope.frmData.reporte.listarLlamadas.request.pQueuename = scope.frmData.miCombo.name;
                    }
                    scope.frmData.electivo = scope.frmData.reporte.listarLlamadas.request;
                    scope.requestTemporal();
                    scope.listarLlamadasFecha();
                }
            }
        }

        scope.pageChanged = function(valor){
            scope.BuscarListaLlamadasAtenAbanFechas(valor);
        }

        //Paginacion
        /*scope.currentPage = 1;
        scope.numPerPage  = 6;
        scope.pageChanged = function(valor){
           var begin, end, index;
           begin = (scope.currentPage - 1) * scope.numPerPage ;
           end = begin + scope.numPerPage;
           index = scope.lsLlamadasFecha.indexOf(valor);
           return (begin <= index && index < end);
        };*/


        //Listar Combito
        scope.listaQueuesName = [];
        scope.listarQueuesNameCall = function(){
            callCenterReporteFechaService.listarQueueName(scope.dataInfo).post({}, function(result){
                if(result.estado == 1){
                    scope.listaQueuesName = [ scope.frmData.miCombo ];
                    scope.listaQueuesName = scope.listaQueuesName.concat( result.colaLista ); 
                } else if(result == 0 || result == -1){
                    console.error('Error: '+ result.mensaje);
                }
            },function(error){
                console.error('error: '+ error);
            })
        };

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

        scope.descargaArchivo = function(valor){
            scope.frmData.electivo.tipoFile = valor;
            scope.frmData.reporte.listarLlamadas.request.tipoFile = valor;
            callCenterReporteFechaService.reporteListaLlamadasAtAbFecha(scope.dataInfo).post({}, scope.frmData.electivo,function(result){                
                if(result.estado == 1){
                    if(valor == 1){
                        scope.pdf = 'data:application/xls;base64,'+ result.reporteFile;
                        download(scope.pdf,"listaLlamadasAtAbFecha.xls","application/xls");
                    } else if(valor == 2){
                        scope.pdf = 'data:application/pdf;base64,' + result.reporteFile;
                        download(scope.pdf, "listaLlamadasAtAbFecha.pdf", "application/pdf");
                    }
                   //toastr.success("Archivo descargado exitosamente", "Acción realizada", viewConfig.toastConfig)
                } else if(result.estado == 0 || result.estado == -1){
                    toastr.error("Ocurrio un error al descargar archivo", "Error de Servidor", viewConfig.toastConfig)
                }
            }, function(error){
                    console.error(error);
            });
        }

        scope.OnloadPage = function(){
            //scope.listarLlamadasFecha();
            scope.listarQueuesNameCall();
        }
        scope.OnloadPage();
    }
]);