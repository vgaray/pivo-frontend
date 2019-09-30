angular.module('callCenterReporteFecha')   
.controller('listaLlamadasAgente',['callCenterReporteFechaService','localStorageService','$location','$timeout','viewConfig',
function(callCenterReporteFechaService, localStorageService, $location, $timeout, viewConfig){
    var scope = this;

    scope.varnab = $location.search();
    scope.dataInfo = {
        codUsuario : localStorageService.get("codUsuario"),
        token      : localStorageService.get("token"),
        idInstancia: scope.varnab.idInstancia
    }

    scope.frmData = {
        name_page_title : "Reporte de Llamadas Agente",
        
        reporte :{
            listarLlAgente : {
                request : {
                    idAgente : 0,
                    feIniCon : "",
                    feFinCon : "",
                    horaI    : "00:00",
                    horaF    : "23:59",
                    tipoFile : 1
                },
                response : {
                   noAgente : "",
                   llamadasAtendidas : "",
                   llamadasCulCli : "",
                   tiempoHablado : "",
                   tPromHablado : "",
                   tMinHablado : "",
                   tMaxHablado : ""
                }
            }
        },
        miCombo:{  
            idQueues :0,      
            queueName :""
        }
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
    scope.changedHI = function(){
         var seconds = scope.mytime.getSeconds();
         var minutes = scope.mytime.getMinutes();
         var hour = scope.mytime.getHours();
         if(seconds < 10) seconds = '0' + seconds;
         if(minutes < 10) minutes = '0' + minutes;
         if(hour < 10) hour = '0' + hour;
         scope.frmData.reporte.listarLlAgente.request.horaI = hour + ':' + minutes + ':' + seconds;
    };

    scope.changedHF = function(){
        var seconds2 = scope.mytimeF.getSeconds();
        var minutes2 = scope.mytimeF.getMinutes();
        var hour2 = scope.mytimeF.getHours();
        if(seconds2 < 10) seconds2 = '0' + seconds2;
        if(minutes2 < 10) minutes2 = '0' + minutes2;
        if(hour2 < 10) hour2 = '0' + hour2;
        scope.frmData.reporte.listarLlAgente.request.horaF = hour2 + ':' + minutes2 + ':' + seconds2;
    };

    scope.clear = function(){
        scope.mytime = "00:00:00";
    };
    scope.clearF = function(){
        scope.mytime = "00:00:00";
    }

    scope.varTotalHa = true;
    scope.varHa  = true;
    scope.varHa1 = false;
    scope.varHa2 = false;
    scope.varHa3 = false;
    scope.varHa4 = false;
    
    //Lista de llamadas agentes
    scope.lsLlamadasAgente = [];

    scope.validaGrilla = true;
    scope.validaVacio  = true;

    scope.menuState = {}
    scope.menuState.show = true;

    scope.listaLlamadasAgentes = function(){
        callCenterReporteFechaService.listarLlamadasAgente(scope.dataInfo).post({}, scope.frmData.reporte.listarLlAgente.request,
        function(result){                                
            if(result.estado == 1){
                scope.lsLlamadasAgente = result.lsLAgente;
                if(scope.lsLlamadasAgente.length == 0){
                    scope.menuState.show = true;
                    scope.validaGrilla = true;
                    scope.validaVacio  = false;

                    result.mensaje = "Conexion Correcta";
                    toastr.success(result.mensaje,"Ningun elemento encontrado",viewConfig.toastConfig)
                } else {
                    scope.menuState.show = false;
                    scope.validaGrilla = false;
                    scope.validaVacio  = true;
                    scope.totalItems = scope.lsLlamadasAgente[0].total;
                    if(scope.var == 1){
                        toastr.success("Consulta Exitosa","",viewConfig.toastConfig);
                    }
                }
            }else if (result.estado == 0 || result.estado == -1){
                toastr.error("Ocurrio un error al mostrar la lista","",viewConfig.toastConfig);
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
       // console.log(scope.frmData.miCombo.idQueues);             
        scope.comboAgente.noAgente = "";
        scope.comboAgente.idAgente = "";
        scope.comboAgente.idQueue = valor;
        console.log(scope.comboAgente.idQueue);
        scope.listarAgenteLContest();
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
        minDate : null
    }

    scope.cambiar = function(){
        var d = scope.dt, month = '' + (d.getMonth() + 1)
                        , day = '' + d.getDate()
                        , year = d.getFullYear();
        if(month.length < 2) month = '0' + month;
        if(day.length < 2) day = '0' + day;
        scope.varia = year + '-' + month + '-' + day;
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
        var d = scope.dtf, month = '' + (d.getMonth() + 1),
                          day   = '' + d.getDate(),
                          year  = d.getFullYear();
        if(month.length<2) month = '0' + month;
        if(day.length < 2) month = '0' + day;
        scope.variaf = year + '-' + month + '-' + day;
    }

    scope.horaInicio = "0:00";
    scope.horaFin    = "23:55";
    
    scope.cambioHora1 = function(){
        if(scope.horaInicio == null){
          scope.horaInicio = null;
        } else {
            scope.frmData.reporte.listarLlAgente.request.horaI = scope.horaInicio;
        }
    }

    scope.cambioHora2 = function(){
        if(scope.horaFin == null){
          scope.horaFin = null;
        } else {
            scope.frmData.reporte.listarLlAgente.request.horaF = scope.horaFin;
        }
    }


    //Fecha Inicio
    
    scope.validaAnteriorInicio = function(){
        if(scope.dt == null){
            scope.varHa1 = true;
        } else {
            if(scope.dt < new Date("1-1-2016")){
                scope.dt = new Date("1-1-2016");
            } else if(scope.dt > scope.dtf){
                scope.dt = new Date(Date.now());
                toastr.error("Fecha Inicio no puede ser mayor a la fecha fin", "Error de Fechas", viewConfig.toastConfig);
            }
            scope.varHa1 = false;
        }
        scope.validaBotonHab();
    }

    //Hora Inicio
    scope.validaHoraInicio = function(){
        if(scope.horaInicio == null){
            scope.varHa2 = true;
        } else {
            scope.varHa2 = false;
        }
        scope.validaBotonHab();
    }
    
    //Fecha Fin
    scope.validaAnteriorFin = function(){
        if(scope.dt == null){
            scope.varHa3 = true;
        } else {
            if( scope.dtf >  new Date(Date.now()) ){
                scope.dtf = new Date(Date.now());

            } else if(scope.dtf < new Date("1-1-2016")){
                scope.dtf = new Date("1-1-2016")
            } else if(scope.dtf < scope.dt){
                scope.dtf = scope.dt;
                 
                //toastr.error("Fecha fin no puede ser menor a fecha inicio","Error de Fechas", toastr.viewConfig);
            }
            scope.varHa3 = false;
        }
        scope.validaBotonHab();
    }
    //Hora Inicio
    scope.validaHoraFin = function(){
        if(scope.horaFin == null){
            scope.varHa4 = true;
        } else {
            scope.varHa4 = false;
        }
        scope.validaBotonHab();
    }

    //validar colas 
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

    scope.validaBotonHab = function(){
        if(scope.varHa1 == false && scope.varHa2 == false && scope.varHa3 == false && scope.varHa4 == false && scope.varHa == false){
            scope.varTotalHa = false;
        } else {
            scope.varTotalHa = true;
        }
    }

    scope.excelVal = 1;
    scope.pdfVal   = 2;

    scope.descargarArchivo = function(valor){
        scope.frmData.reporte.listarLlAgente.request.tipoFile = valor;
        callCenterReporteFechaService.reporteListaLlamadasAgente(scope.dataInfo).post({},scope.frmData.reporte.listarLlAgente.request,function(result){
            if(result.estado == 1){
                if(valor == 1){
                    scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                    download(scope.pdf, "listaLlamadasAgente.xls","application/xls");
                } else if(valor == 2){
                    scope.pdf = 'data:application/pdf;base64,' + result.reporteFile;
                    download(scope.pdf, "listaLlamadasAgente.pdf","application/pdf");
                }
               // toastr.success("Archivo descargado exitosamente", "Acción realizada", viewConfig.toastConfig);
            } else if(result.estado == 0 || result.estado == -1){
                toastr.error("Ocurrio un error al descargar archivo", "Error de Servidor", viewConfig.toastConfig)
            }
        }, function(error){
              console.error(error);
        })
    }

    //Buscar Lista Agente
    //frmData.reporte.listarLlAgente.request. 
    //idAgente, feIniCon, feFinCon, horaI, horaF
    scope.BuscaListaLlamadasAgente = function(){
        scope.frmData.reporte.listarLlAgente.request.idAgente = scope.comboAgente.idAgente;
        scope.cambiar();
        scope.frmData.reporte.listarLlAgente.request.feIniCon = scope.varia;
        scope.cambiarf();
        scope.cambioHora1();
        scope.cambioHora2();
        scope.frmData.reporte.listarLlAgente.request.feFinCon = scope.variaf;
        scope.pri = new Date(scope.frmData.reporte.listarLlAgente.request.feIniCon);
        scope.sec  = new Date(scope.frmData.reporte.listarLlAgente.request.feFinCon);
        if(scope.frmData.reporte.listarLlAgente.request.feIniCon == null || scope.frmData.reporte.listarLlAgente.request.feFinCon == null ||
           scope.frmData.reporte.listarLlAgente.request.horaI == null || scope.frmData.reporte.listarLlAgente.request.horaF == null){
            toastr.error("Informacion incorrecta en los campos","Error de fechas",viewConfig.toastConfig);
        } else if(scope.frmData.reporte.listarLlAgente.request.feIniCon == null && scope.frmData.reporte.listarLlAgente.request.feFinCon != null){
            toastr.error("Formato incorrecto en fecha de inicio","Error de fechas",viewConfig.toastConfig);
        } else if(scope.frmData.reporte.listarLlAgente.request.feIniCon != null && scope.frmData.reporte.listarLlAgente.request.feFinCon == null){
            toastr.error("Formato incorrecto en fecha fin","Error de fechas",viewConfig.toastConfig);
        } else if(scope.dtf < scope.dt){
            toastr.error("Fec. Inicio no puede ser mayor a Fec. Fin","Error de fechas",viewConfig.toastConfig);
        }
         else {
        scope.listaLlamadasAgentes();
        }
    }
    
    scope.OnloadPage = function(){
        scope.listarQueuesNameCall();
        //scope.listaLlamadasAgentes();
    }
    scope.OnloadPage();
}
])