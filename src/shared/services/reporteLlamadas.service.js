angular.module('pivo').
factory('reporteLlamadasService', function($resource, ngResourceConfig) {
    var codUsuario = 'daddadad';
    var token = 'asdad';
    var urlListaLlamadasGeneral = ngResourceConfig.baseURL + "reporte/lista-llamada-general";
    var urlListaLlamadasUsuario = ngResourceConfig.baseURL + "reporte/lista-llamada-usuario";
    var urlReporteLlamadasGeneral = ngResourceConfig.baseURL + "reporte/reporteLlamadaGeneral";
    var urlReporteLlamadasUsuario = ngResourceConfig.baseURL + "reporte/reporteLlamadaUsuario";
    var urlListaRankingLlamadas = ngResourceConfig.baseURL + "reporte/listarRankingLlamadas";
    var urlReporteRankingLlamadas = ngResourceConfig.baseURL + "reporte/reporteRankingLlamada";
    var urlReporteLlamadasCentroCosto = ngResourceConfig.baseURL + "reporte/reporteCentroCostoLlamada"; //
    var urlListaLlamadasCentroCosto = ngResourceConfig.baseURL + "centroCostoLlamada/listaCetroCosto";
    var urlReporteLlamadaArea = ngResourceConfig.baseURL + "reporte/reporteAreaLlamada"; //
    var urlListaLlamadaArea = ngResourceConfig.baseURL + "areaLlamada/listarAreaLlamada";
    var urlListaLlamadaDestino = ngResourceConfig.baseURL + "reporte/lista-llamada-destino";
    var urlReporteLlamadaDestino = ngResourceConfig.baseURL + "reporte/reporteLlamadaDestino";
    var urlReporteRespuestaOperador = ngResourceConfig.baseURL + "reporte/reporteRespuestaOperador";

    var reporteLlamadaResource = {
        reporte: {
            llamadasGeneral: function(dataInfo) {
                return $resource(urlListaLlamadasGeneral, {}, {
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

            llamadasUsuario: function(dataInfo) {
                return $resource(urlListaLlamadasUsuario, {}, {
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

            reporteGeneral: function(dataInfo) {
                return $resource(urlReporteLlamadasGeneral, {}, {
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

            reporteUsuario: function(dataInfo) {
                return $resource(urlReporteLlamadasUsuario, {}, {
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

            RankingLlamadas: function(dataInfo) {
                return $resource(urlListaRankingLlamadas, {}, {
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
                })
            },
            reporteRanking: function(dataInfo) {
                return $resource(urlReporteRankingLlamadas, {}, {
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
            reporteCentroCosto: function(dataInfo) {
                return $resource(urlReporteLlamadasCentroCosto, {}, {
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
            reporteAreaLlamada: function(dataInfo) {
                return $resource(urlReporteLlamadaArea, {}, {
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
            listaAreaLlamada: function(dataInfo) {
                return $resource(urlListaLlamadaArea, {}, {
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
            listaCentrodeCostoLlamada: function(dataInfo) {
                return $resource(urlListaLlamadasCentroCosto, {}, {
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
            listaLlamadaDestino: function(dataInfo) {
                return $resource(urlListaLlamadaDestino, {}, {
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
            reporteLlamadaDestino: function(dataInfo) {
                return $resource(urlReporteLlamadaDestino, {}, {
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
              reporteRespuestaOperador: function(dataInfo) {
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
            }
        }
    };

    var reporteLlamadasService = {
        listaLlamadasUsuario: reporteLlamadaResource.reporte.llamadasUsuario,
        listaLlamadasGeneral: reporteLlamadaResource.reporte.llamadasGeneral,
        reporteLlamadasUsuario: reporteLlamadaResource.reporte.reporteUsuario,
        reporteLlamadasGeneral: reporteLlamadaResource.reporte.reporteGeneral,
        listaRankingLlamadas: reporteLlamadaResource.reporte.RankingLlamadas,
        reporteRanking: reporteLlamadaResource.reporte.reporteRanking,
        reporteCentroCosto: reporteLlamadaResource.reporte.reporteCentroCosto,
        listaCentroCosto: reporteLlamadaResource.reporte.listaCentrodeCostoLlamada,
        reporteAreaLlamada: reporteLlamadaResource.reporte.reporteAreaLlamada,
        listaAreaLlamada: reporteLlamadaResource.reporte.listaAreaLlamada,
        listaLlamadaDestino:reporteLlamadaResource.reporte.listaLlamadaDestino,
        reporteLlamadaDestino:reporteLlamadaResource.reporte.reporteLlamadaDestino,
        reporteRespuestaOperador:reporteLlamadaResource.reporteRespuestaOperador
    };

    return reporteLlamadasService;
});
