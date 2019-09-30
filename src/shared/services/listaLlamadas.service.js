angular.module('pivo').
    factory('listaLlamadasService', function($resource, ngResourceConfig){
        
        var urlListaLlamadasAtendidasAbandonadasFecha = ngResourceConfig.baseURL + "lista-llamadas-atendidas-abandonadas-fecha";
        var urlListaLlamadasContestadas = ngResourceConfig.baseURL + "lista-llamadas-contestadas";
        var urlListaLlamadaAgente       = ngResourceConfig.baseURL + "lista-llamada-agente";
        var urlListaReporteAbandonos    = ngResourceConfig.baseURL + "lista-reporte-abandonos";

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
                    return $resource(urlListaLlamadasContestadas, {}, {
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
                }
            }
        };

        var listaLlamadaService = {
            listarLlamadasAtendidasAbandonadas : listaLlamadasResource.listaLlamadas.listaLlamadasAtendidasAbandonadas,
            listarLlamadasContestadas : listaLlamadasResource.listaLlamadas.listaLlamadasContestadas,
            listarLlamadasAgente      : listaLlamadasResource.listaLlamadas.listaLlamadaAgente,
            listarReporteAbandono     : listaLlamadasResource.listaLlamadas.listaReporteAbandonos
        
        };
        return listaLlamadaService;
});
