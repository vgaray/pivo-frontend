angular.module('pivo').
    factory('callCenterReporteFechaService', function($resource, ngResourceConfig){
        
        var urlListaLlamadasAtendidasAbandonadasFecha = ngResourceConfig.baseURL + "call-center-reporte/lista-llamadas-atendidas-abandonadas-fecha";
        var urlListaLlamadasContestadas = ngResourceConfig.baseURL + "call-center-reporte/lista-llamadas-contestadas";
        var urlListaLlamadaAgente       = ngResourceConfig.baseURL + "call-center-reporte/lista-llamada-agente";
        var urlListaReporteAbandonos    = ngResourceConfig.baseURL + "call-center-reporte/lista-reporte-abandonos";
        //QueuesController
        var urlListaCallQueueName       = ngResourceConfig.baseURL + "queues/listar"
        //AgenteColaController
        var urlListaAgentexCola         = ngResourceConfig.baseURL + "agentecola/listar"; 
        //Reportes
        var urlReporteLlamadasAtAbFecha = ngResourceConfig.baseURL + "reporte/reporte-lista-llamadas-atendidas-abandonadas-fecha";
        var urlReporteLlamadasContestadas= ngResourceConfig.baseURL+ "reporte/reporte-lista-llamadas-contestadas";
        var urlReporteLlamadasAgente    = ngResourceConfig.baseURL + "reporte/reporte-lista-llamadas-agente";
        var urlReporteLlamadasAbandonadas=ngResourceConfig.baseURL+ "reporte/reporte-lista-llamadas-abandonadas";

        var listaLlamadasResource = {
            listaLlamadas : {
                listaLlamadasAtendidasAbandonadas : function(dataInfo){
                    return $resource(urlListaLlamadasAtendidasAbandonadasFecha, {},{
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                listaLlamadasContestadas : function(dataInfo) {
                    return $resource(urlListaLlamadasContestadas, {}, {
                        post: {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                listaLlamadaAgente : function(dataInfo) {
                    return $resource(urlListaLlamadaAgente, {}, {
                        post : {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                listaReporteAbandonos : function(dataInfo) {
                    return $resource(urlListaReporteAbandonos, {}, {
                        post : {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                listaCallCenterQueueName: function(dataInfo){
                    return $resource(urlListaCallQueueName, {},{
                        post:{
                            method : 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                listaAgentexCola : function(dataInfo){
                    return $resource(urlListaAgentexCola,{},{
                        post:{
                            method : 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }   
                    })
                }
            },
            reportes : {
                reporteLlamadasAtAbFecha : function(dataInfo){
                    return $resource(urlReporteLlamadasAtAbFecha,{},{
                        post : {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                reporteLlamadasContestadas : function(dataInfo){
                    return $resource(urlReporteLlamadasContestadas,{},{
                        post : {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                reporteLlamadasAgente : function(dataInfo){
                    return $resource(urlReporteLlamadasAgente,{},{
                    post : {
                        method : 'POST',
                        headers : {
                            'Content-Type'  : 'application/json',
                            'Accept'        : 'application/json',
                            'codUsuario'    : "" + dataInfo.codUsuario,
                            'token'         : "" + dataInfo.token,
                            'idInstancia'   : "" + dataInfo.idInstancia
                            }  
                        }
                    })
                },
                reporteLlamadasAbandonadas : function(dataInfo){
                    return $resource(urlReporteLlamadasAbandonadas,{},{
                        post : {
                            method : 'POST',
                            headers : {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                                'idInstancia'  : "" + dataInfo.idInstancia 
                            }
                        }
                    })
                }
            }
        };

        var listaLlamadaService = {
            listarLlamadasAtendidasAbandonadas : listaLlamadasResource.listaLlamadas.listaLlamadasAtendidasAbandonadas,
            listarLlamadasContestadas : listaLlamadasResource.listaLlamadas.listaLlamadasContestadas,
            listarLlamadasAgente      : listaLlamadasResource.listaLlamadas.listaLlamadaAgente,
            listarReporteAbandono     : listaLlamadasResource.listaLlamadas.listaReporteAbandonos,
            //Colas
            listarQueueName           : listaLlamadasResource.listaLlamadas.listaCallCenterQueueName,
            //AgentexColas
            listarAgentexCola         : listaLlamadasResource.listaLlamadas.listaAgentexCola,
            //Reportes
            reporteListaLlamadasAtAbFecha :  listaLlamadasResource.reportes.reporteLlamadasAtAbFecha,
            reporteListaLlamadasContestadas: listaLlamadasResource.reportes.reporteLlamadasContestadas,
            reporteListaLlamadasAgente    :  listaLlamadasResource.reportes.reporteLlamadasAgente,
            reporteListaLlamadasAbandonadas: listaLlamadasResource.reportes.reporteLlamadasAbandonadas
        };
        return listaLlamadaService;
});
