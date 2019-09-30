angular.module('callCenterReporteFecha')
    .controller('listaLlamadasContestadas',['callCenterReporteFechaService', 'localStorageService', '$location', '$timeout','viewConfig',
    function(callCenterReporteFechaService, localStorageService, $location, $timeout, viewConfig){
        var scope = this;

        scope.varnab = $location.search();
        scope.dataInfo = {
            codUsuario : localStorageService.get("codUsuario"),
            token      : localStorageService.get("token"),
            idInstancia: scope.varnab.idInstancia
        }

        scope.diaPresente = new Date();
        scope.mytime = new Date(0,0,0,0,0,0);
        scope.hstep = 1;
        scope.mstep = 15;
        scope.ismeridian = false;
        scope.mitimeF = new Date(0,0,0,23,59,59);
        scope.hstepF = 1;
        scope.mstepF = 15;
        scope.ismeridianF = false;
        scope.changed = function(){
             var seconds = scope.mytime.getSeconds();
             var minutes = scope.mytime.getMinutes();
             var hour = scope.mytime.getHours();
             if(seconds < 10) seconds = '0' + seconds;
             if(minutes < 10) minutes = '0' + minutes;
             if(hour < 10) hour = '0' + hour;
             scope.frmData.reporte.listarLlContestadas.request.horaIniC = hour + ':' + minutes + ':' + seconds;
        };

        scope.changedF = function(){
            var seconds2 = scope.mytimeF.getSeconds();
            var minutes2 = scope.mytimeF.getMinutes();
            var hour2 = scope.mytimeF.getHours();
            if(seconds2 < 10) seconds2 = '0' + seconds2;
            if(minutes2 < 10) minutes2 = '0' + minutes2;
            if(hour2 < 10) hour2 = '0' + hour2;
            scope.frmData.reporte.listarLlContestadas.request.horaFinC = hour2 + ':' + minutes2 + ':' + seconds2;
        };

        scope.clear = function(){
            scope.mytime = "00:00:00";
        };
        scope.clearF = function(){
            scope.mytime = "00:00:00";
        }

        //request: vaQueue, idAgente, feIniCon, feFinCon, horaIniC, horaFinC
        //response: idLlamadaC, noCola, noAgente, fecha, hora, duracion, numero, nuTotalReg
        scope.frmData = {
            name_page_title : "Reporte de Llamadas Contestadas",
            
            reporte : {
                listarLlContestadas : {
                    request : {
                        vaQueue:"",
                        idAgente: 0,
                        feIniCon: "",
                        feFinCon: "",
                        horaIniC: "",
                        horaFinC: "",
                        pNuPagina: 1,
                        pNuReg : 10,
                        tipoFile: 1
                    },
                    response : {
                        idLlamadaC: 0,
                        noCola : "",
                        noAgente: "",
                        fecha : "",
                        hora : "",
                        duracion : "",
                        numero : ""
                    }
                }                
            },
            miCombo:{                      
                queueName :""
            },
            temporal : {},
            electivo : {
                pNuPagina : 1,
                tipoFile  : 2
            }
        }

        scope.validaGrilla = true;
        scope.validaVacio  = true;
        scope.varTotalHa = true;
        scope.varHa  = true;
        scope.varHa1 = false;
        scope.varHa2 = false;
        scope.varHa3 = false;
        scope.varHa4 = false;

        scope.lsLlamadasContestadas = [];
        scope.currentPage = 1;

        scope.menuState = {}
        scope.menuState.show = false;

        scope.requestTemporal = function(){
            scope.frmData.temporal.vaQueue   = scope.frmData.reporte.listarLlContestadas.request.vaQueue;
            scope.frmData.temporal.idAgente = scope.frmData.reporte.listarLlContestadas.request.idAgente;
            scope.frmData.temporal.feIniCon = scope.frmData.reporte.listarLlContestadas.request.feIniCon;
            scope.frmData.temporal.feFinCon = scope.frmData.reporte.listarLlContestadas.request.feFinCon;
            scope.frmData.temporal.horaIniC = scope.frmData.reporte.listarLlContestadas.request.horaIniC;
            scope.frmData.temporal.horaFinC = scope.frmData.reporte.listarLlContestadas.request.horaFinC;
            scope.frmData.temporal.pNuReg   = scope.frmData.reporte.listarLlContestadas.request.pNuReg;             
        }

        scope.listaLlamadasContestadas = function(){
            callCenterReporteFechaService.listarLlamadasContestadas(scope.dataInfo).post({}, scope.frmData.electivo, 
            function(result){
                if(result.estado == 1){
                    scope.lsLlamadasContestadas = result.lsLContestadas;
                    if(scope.lsLlamadasContestadas.length == 0){
                        scope.menuState.show = false;
                        scope.validaGrilla = true;
                        scope.validaVacio  = false;
                    }
                    else {
                        scope.totalItems = scope.lsLlamadasContestadas[0].nuTotalReg;
                        scope.menuState.show = true;
                        scope.validaGrilla = false;
                        scope.validaVacio  = true;
                        if(scope.var == 1){
                            scope.currentPage = 1;                            
                        }
                    }
                } else if(result.estado == 0 || result.estado == -1){
                    toastr.error("Ocurrio un error al mostrar la lista", "Error de Servidor", viewConfig.toastrConfig);
                }
            }, function(error){
                console.error(error);
            })
        }

        //Combo Colas
        scope.comboAgente = {
            idQueue   : 0
        }
        scope.listaQueuesName = [];
        scope.listarQueuesNameCall = function(){
            callCenterReporteFechaService.listarQueueName(scope.dataInfo).post({}, function(result){
                if(result.estado == 1){
                    scope.listaQueuesName = result.colaLista;
                } else if(result == 0 || result == -1){
                    console.error('Error: '+ result.mensaje);
                }
            },function(error){
                console.error('error: '+ error);
            })
        };

        //Combo Agente
        scope.listaAgenteLContest = [];
        scope.listarAgenteLContest = function(){
            callCenterReporteFechaService.listarAgentexCola(scope.dataInfo).post({}, scope.comboAgente, function(result){
                if(result.estado == 1){
                    scope.listaAgenteLContest = result.listado;
                } else if(result.estado == -1 || result.estado == 0){
                    console.error('Error: ' + result.mensaje);
                }
            },
            function(error){
                console.error('Error: ' + error);
            });
        }
        //Change Agente
        scope.changeComboColasxAgente = function(valor){
            scope.comboAgente.noAgente = "";
            scope.comboAgente.idAgente = "";
            scope.idQueuetemp = valor;    
            scope.comboAgente.idQueue = scope.idQueuetemp;
            console.log(scope.comboAgente.idQueue);
            scope.listarAgenteLContest();
        }

        //Paginacion
        /*scope.currentPage = 1;
        scope.numPerPage = 10;
        scope.pageChanged = function(valor){
            var begin, end, index;
            begin = (scope.currentPage - 1) * scope.numPerPage;
            end = begin + scope.numPerPage;
            index = scope.lsLlamadasContestadas.indexOf(valor);
            return (begin <= index && index < end);
        };*/

        //Calendario Inicio
        scope.dt = new Date();
        scope.varia = new Date();
        scope.open = function(){
            $timeout(function(){
                scope.opened = true;
            })
        }

        scope.dateOptions = {
            minDate : null
        }
        
        scope.cambiar = function(){
            if( scope.dt == null){
                scope.varia = "NoValido";
            } else{
                var d = scope.dt, month = '' + (d.getMonth() + 1)
                                , day = '' + d.getDate()
                                , year = d.getFullYear();
                if(month.length < 2) month = '0' + month;
                if(day.length < 2) day = '0' + day;
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
            if( scope.dt == null ){
                scope.varia = "NoValido";                
            } else {
                var d = scope.dtf, month = '' + (d.getMonth() + 1),
                                day   = '' + d.getDate(),
                                year  = d.getFullYear();
                if(month.length<2) month = '0' + month;
                if(day.length < 2) month = '0' + day;
                scope.variaf = year + '-' + month + '-' + day;
            }
        }

        //Fecha Inicio
        scope.validaAnteriorInicio = function(){
            if(scope.dt == null){
                scope.varHa1 = true;
            } else {
                if( scope.dt < new Date("1-1-2015")){
                    scope.dt = new Date("1-1-2015");
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
                if( scope.dtf < new Date("1-1-2017")){
                    scope.dtf = new Date("1-1-2017");
                } else if( scope.dtf > new Date(Date.now()) ){
                    scope.dtf = new Date(Date.now());
                }
                scope.varHa2 = false;
            }
            scope.validaBotonHab();
        } 
        
        scope.validaHoraInicio = function(){
            if(scope.horaInicio == null){
                scope.varHa3 = true;
            } else {
                scope.varHa3 = false;
            }
            scope.validaBotonHab();
        }

        scope.validaHoraFin = function(){
            if(scope.horaFin == null){
                scope.varHa4 = true;
            } else {
                scope.varHa4 = false;
            }
            scope.validaBotonHab();
        }

        scope.validateColas = function() {
            if (scope.frmData.miCombo != null) {
                if(scope.frmData.miCombo.idQueues == null) {
                    scope.varHa = true;
                } else {
                    scope.varHa = false;
                }
            } else {
                scope.varHa = true;
            }
            scope.validaBotonHab();
        }
        
        //Boton Activar Buscar
        scope.validaBotonHab = function(){
            if(scope.varHa1 == false && scope.varHa2 == false && scope.varHa3 == false && scope.varHa4 == false && scope.varHa == false){
                scope.varTotalHa = false;
            } else {
                scope.varTotalHa = true;
            }
        }


        //Descargar archivo
        scope.excelVal = 1;
        scope.pdfVal   = 2;
        scope.descargarArchivo = function(valor){
            scope.frmData.reporte.listarLlContestadas.request.tipoFile = valor;
            callCenterReporteFechaService.reporteListaLlamadasContestadas(scope.dataInfo).post({},scope.frmData.electivo,function(result){
                if(result.estado == 1){
                    if(valor == 1){
                        scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                        download(scope.pdf, "listaLlamadasContestadas.xls","application/xls");
                    } else if (valor == 2){
                        scope.pdf = 'data:application/pdf;base64,' + result.reporteFile;
                        download(scope.pdf, "listaLlamadasContestadas.pdf", "application/pdf");
                    }
                  //toastr.success("Archivo descargado exitosamente", "Acción realizada", viewConfig.toastConfig)
                } else if(result.estado == 0 || result.estado == -1){
                    toastr.error("Ocurrio un error al descargar archivo", "Error de Servidor", viewConfig.toastConfig)
                }
            }, function(error){
                  console.error(error);
            })            
        }

        //Hora
        scope.horaInicio = "00:00";
        scope.horaFin    = "23:55"; 
        scope.cambioHora1 = function(){
            if(scope.horaInicio == null){
                scope.frmData.reporte.listarLlContestadas.request.horaIniC == null;
            } else {
                scope.frmData.reporte.listarLlContestadas.request.horaIniC = scope.horaInicio;
            }
        }

        scope.cambioHora2 = function(){
            if(scope.horaFin == null){
                scope.frmData.reporte.listarLlContestadas.request.horaFinC == null;
            } else {
                scope.frmData.reporte.listarLlContestadas.request.horaFinC = scope.horaFin;
            }
        }


        //Boton Buscar vaQueue idAgente feIniCon feFinCon horaIniC horaFinC
        scope.BuscarListaLlamadasContestadas = function(valor){
            scope.cambiar();
            scope.frmData.reporte.listarLlContestadas.request.feIniCon = scope.varia;
            scope.cambiarf();
            scope.frmData.reporte.listarLlContestadas.request.feFinCon = scope.variaf;
            scope.cambioHora1();
            scope.cambioHora2();
            scope.pri = new Date(scope.frmData.reporte.listarLlContestadas.request.feIniCon);
            scope.sec  = new Date(scope.frmData.reporte.listarLlContestadas.request.feFinCon);
            
            scope.var = valor;
            if(scope.var == 0){
                scope.frmData.temporal.pNuPagina = scope.currentPage;
                scope.frmData.electivo = scope.frmData.temporal;
                //scope.frmData.reporte.listarLlContestadas.request.pNuPagina = scope.frmData.temporal.pNuPagina;
                scope.listaLlamadasContestadas();
            }
            else if(scope.var == 1){
                if( scope.frmData.reporte.listarLlContestadas.request.feIniCon == "NoValido" &&  scope.frmData.reporte.listarLlContestadas.request.feFinCon != "NoValido"){
                    toastr.error("Formato Incorrecto en Fecha de Inicio","Error en fechas",viewConfig.toastConfig);
                } else if( scope.frmData.reporte.listarLlContestadas.request.feFinCon == "NoValido" &&  scope.frmData.reporte.listarLlContestadas.request.feIniCon != "NoValido"){
                    toastr.error("Formato Incorrecto en Fecha Fin","Error en fechas",viewConfig.toastConfig);
                } else if( scope.frmData.reporte.listarLlContestadas.request.feIniCon == "NoValido" &&  scope.frmData.reporte.listarLlContestadas.request.feFinCon == "NoValido"){
                    toastr.error("Formato Incorrecto en Fechas","Error en fechas",viewConfig.toastConfig);
                } else if(scope.frmData.reporte.listarLlContestadas.request.feIniCon == null || scope.frmData.reporte.listarLlContestadas.request.feFinCon == null ||
                   scope.frmData.reporte.listarLlContestadas.request.horaIniC == null || scope.frmData.reporte.listarLlContestadas.request.horaFinC == null){
                       toastr.error("Informacion incorrecta en los campos");
                } else if(scope.pri > scope.sec){
                        toastr.remove();
                        toastr.error("Fec. Inicio no puede ser mayor a Fec. Fin","Error de fechas",viewConfig.toastConfig);
                } else {
                    scope.frmData.reporte.listarLlContestadas.request.vaQueue = scope.frmData.miCombo.name ;

                    (scope.comboAgente.idAgente == null || scope.comboAgente.idAgente == "") ? 
                    scope.frmData.reporte.listarLlContestadas.request.idAgente = 0 : scope.frmData.reporte.listarLlContestadas.request.idAgente = scope.comboAgente.idAgente;

                    scope.frmData.reporte.listarLlContestadas.request.pNuPagina = scope.currentPage;
                    scope.frmData.reporte.listarLlContestadas.request.horaIniC = scope.horaInicio;
                    scope.frmData.reporte.listarLlContestadas.request.horaFinC = scope.horaFin;
                    scope.frmData.electivo = scope.frmData.reporte.listarLlContestadas.request;
                    scope.requestTemporal();
                    scope.listaLlamadasContestadas();    
                }
            }
        }

        scope.pageChanged = function(valor){
            scope.BuscarListaLlamadasContestadas(valor);
        }

        scope.OnloadPage = function(){
            //scope.listaLlamadasContestadas();
            scope.listarQueuesNameCall();
        }
        scope.OnloadPage();
    }
]);