angular.module('pivo')
    .factory('monitoreoColaService', function($resource, ngResourceConfig) {

        var urlListarMonitoreoCola = ngResourceConfig.baseURL + "confMonitorCola/listar";
        var urlInsertarMonitoreoCola = ngResourceConfig.baseURL + "confMonitorCola/insertar";
        var urlActualizarMonitoreoCola = ngResourceConfig.baseURL + "confMonitorCola/actualizar";
        var urlEliminarMonitoreoCola = ngResourceConfig.baseURL + "confMonitorCola/eliminar";


        var monitoreoColaResource = {
            monitoreoCola: {
                listar: function(dataInfo) {
                    return $resource(urlListarMonitoreoCola, {}, {
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
                insertar: function(dataInfo) {
                    return $resource(urlInsertarMonitoreoCola, {}, {
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
                actualizar: function(dataInfo) {
                    return $resource(urlActualizarMonitoreoCola, {}, {
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
                eliminar: function(dataInfo) {
                    return $resource(urlEliminarMonitoreoCola, {}, {
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
        }

        var monitoreoCola = {
            listarMonitoreoCola: monitoreoColaResource.monitoreoCola.listar,
            insertarMonitoreoCola: monitoreoColaResource.monitoreoCola.insertar,
            eliminarMonitoreoCola: monitoreoColaResource.monitoreoCola.eliminar,
            actualizarMonitoreoCola: monitoreoColaResource.monitoreoCola.actualizar
        };

        return monitoreoCola;
    });
