angular.module('pivo').
    factory('callCenterReporteService', function ($resource, ngResourceConfig) {
        var urlReporteRespuestaOperador = ngResourceConfig.baseURL + "call-center-reporte/listarAtencionCliente";
        var urlGReporteAtencionCliente = ngResourceConfig.baseURL + "reporte/reporte-atencion-cliente";
        var urlReporLlamadaHora = ngResourceConfig.baseURL + "call-center-reporte/listarLlamadaDiaHora";
        var urlGReporteLlamadaHora = ngResourceConfig.baseURL + "reporte/reporte-llamada-dia-hora";
        var urlReporConsolidadoLlamada = ngResourceConfig.baseURL + "call-center-reporte/listarConsolidadoLlamadaRecibida";
        var urlGReporteConsolidadoLlamada = ngResourceConfig.baseURL + "reporte/reporte-consolidado-llamada";
        var urlReporteLlamadaConsolidadaAgente = ngResourceConfig.baseURL + "call-center-reporte/listarLlamadaConsolidadaAgente";
        var urlGReporteLlamadaConsolidadaAgente=ngResourceConfig.baseURL+"reporte/reporte-llamada-consolidada-agente";
        var urlListaColas = ngResourceConfig.baseURL + "queues/listar";
        var reportarLlamadaResource = {
            reporte: {
                RespuestaOperador: function (dataInfo) {
                    return $resource(urlReporteRespuestaOperador, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                GAtencionCliente: function (dataInfo) {
                    return $resource(urlGReporteAtencionCliente, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                LlamadaHora: function (dataInfo) {
                    return $resource(urlReporLlamadaHora, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                  GLlamadaHora: function (dataInfo) {
                    return $resource(urlGReporteLlamadaHora, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                ListaColas: function (dataInfo) {
                    return $resource(urlListaColas, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                ConsolidadoLlamadaRecibida: function (dataInfo) {
                    return $resource(urlReporConsolidadoLlamada, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                          GConsolidadoLlamadaRecibida: function (dataInfo) {
                    return $resource(urlGReporteConsolidadoLlamada, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                LlamadaConsolidadaAgente: function (dataInfo) {
                    return $resource(urlReporteLlamadaConsolidadaAgente, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                },
                 GLlamadaConsolidadaAgente: function (dataInfo) {
                    return $resource(urlGReporteLlamadaConsolidadaAgente, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    });
                }
            }
        };

        var callCenterReporteService = {
            reporteRespuestaOperador: reportarLlamadaResource.reporte.RespuestaOperador,
            reporteLlamadaHora: reportarLlamadaResource.reporte.LlamadaHora,
            reporteListaColas: reportarLlamadaResource.reporte.ListaColas,
            reporteListaConsolidadoLlamada: reportarLlamadaResource.reporte.ConsolidadoLlamadaRecibida,
            reporteListaLlamadaConsolidadaAgente: reportarLlamadaResource.reporte.LlamadaConsolidadaAgente,
            reporteGAtencionCliente: reportarLlamadaResource.reporte.GAtencionCliente,
            reporteGConsolidadoLlamada:reportarLlamadaResource.reporte.GConsolidadoLlamadaRecibida,
            reporteGLlamadaDia:reportarLlamadaResource.reporte.GLlamadaHora,
            reporteGLlamadaConsolidadaAgente:reportarLlamadaResource.reporte.GLlamadaConsolidadaAgente
        };
        return callCenterReporteService;
    });
