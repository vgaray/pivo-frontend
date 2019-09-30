angular.module('pivo')
    .factory('callCenterReporteAgenteService', function($resource, ngResourceConfig){

        var urlListarLlamadasAtendidasAbandonadas    = ngResourceConfig.baseURL + "call-center-reporte/lista-llamadas-atendidas-abandonadas"
        var urlListarLlamadasEntrantePorHora         = ngResourceConfig.baseURL + "call-center-reporte/lista-llamada-entrante-por-hora"
        var urlListarConsolidadoTiempoEspera         = ngResourceConfig.baseURL + "call-center-reporte/consolidado-tiempo-espera"
        var urlListarConsolidadoAbandonadasPorMinuto = ngResourceConfig.baseURL + "call-center-reporte/consolidado-abandonadas-por-minuto"
        var urlListarComboCola                       = ngResourceConfig.baseURL + "queues/listar"
        var urlListarComboAgentePorCola              = ngResourceConfig.baseURL + "agentecola/listar"
        //REPORTES
        var urlReporteAtendidasAbandonadas           = ngResourceConfig.baseURL + "reporte/reporte-llamadas-atendidas-abandonadas"
        var urlReporteEntrante                       = ngResourceConfig.baseURL + "reporte/reporte-llamadas-entrante-por-hora"
        var urlReporteAbandonadasPorMinuto           = ngResourceConfig.baseURL + "reporte/reporte-llamadas-abandonadas-por-minuto"
        var urlReporteTiempoEspera                   = ngResourceConfig.baseURL + "reporte/reporte-consolidado-tiempo-espera"

        var llamadasResource = {
            llamadas : {
                llamadaAtendidaAbandonada : function(dataInfo) {
                    return $resource(urlListarLlamadasAtendidasAbandonadas, {}, {
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
                    });
                },
                llamadaEntrantePorHora : function(dataInfo) {
                    return $resource(urlListarLlamadasEntrantePorHora, {}, {
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
                    });
                },
                consolidadoTiempoEspera : function (dataInfo) {
                    return $resource(urlListarConsolidadoTiempoEspera, {},{
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
                    });
                },
                consolidadoAbandonadasPorMinuto : function (dataInfo){
                    return $resource(urlListarConsolidadoAbandonadasPorMinuto,{}, {
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
                    });
                }
            },
            colas : {
                listarColas : function (dataInfo) {
                    return $resource(urlListarComboCola, {}, {
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
                    });
                },
                listarAgentes : function (dataInfo) {
                    return $resource(urlListarComboAgentePorCola, {}, {
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
                    });
                }
            },
            reportes : {
                reporteAtenAban : function(dataInfo) {
                    return $resource(urlReporteAtendidasAbandonadas, {}, {
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
                    });
                },
                reporteEntrante : function(dataInfo) {
                    return $resource(urlReporteEntrante, {}, {
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
                    });
                },
                reporteTiempoEspera : function(dataInfo) {
                    return $resource(urlReporteTiempoEspera, {}, {
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
                    });
                },
                reporteAbandonadaPorMin : function(dataInfo) {
                    return $resource(urlReporteAbandonadasPorMinuto, {}, {
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
                    });
                },
            }
        }

        var llamadaAgenteService = {
            listaLlamadasAtendidasAbandonadas    : llamadasResource.llamadas.llamadaAtendidaAbandonada,
            listaLlamadasEntrantePorHora         : llamadasResource.llamadas.llamadaEntrantePorHora,
            listaConsolidadoTiempoEspera         : llamadasResource.llamadas.consolidadoTiempoEspera,
            listaConsolidadoAbandonadasPorMinuto : llamadasResource.llamadas.consolidadoAbandonadasPorMinuto,
            listaCola                            : llamadasResource.colas.listarColas,
            listaAgentePorCola                   : llamadasResource.colas.listarAgentes,
            reporteAtendidasAbandonadas          : llamadasResource.reportes.reporteAtenAban,
            reporteEntrantePorHora               : llamadasResource.reportes.reporteEntrante,
            reporteConsTiempoEspera              : llamadasResource.reportes.reporteTiempoEspera,
            reporteConsAbandonadaPorMin          : llamadasResource.reportes.reporteAbandonadaPorMin
        }

        return llamadaAgenteService;
    });