angular.module('pivo')
    .factory('colaService', function($resource, ngResourceConfig) {

        var urlListarCola = ngResourceConfig.baseURL + "queues/listar";
        var urlInsertarCola = ngResourceConfig.baseURL + "queues/insertar";
        var urlActualizarCola = ngResourceConfig.baseURL + "queues/actualizar";
        var urlEliminarCola = ngResourceConfig.baseURL + "queues/eliminar";
        var urlBuscarCola = ngResourceConfig.baseURL + "queues/buscar";
        var urlListarAgenteDisponible = ngResourceConfig.baseURL + "queues/listarAgentes";

        var colaResource = {
            cola: {
                listar: function(dataInfo) {
                    return $resource(urlListarCola, {}, {
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
                    return $resource(urlInsertarCola, {}, {
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
                    return $resource(urlActualizarCola, {}, {
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
                    return $resource(urlEliminarCola, {}, {
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
                buscar: function(dataInfo){
                    return $resource(urlBuscarCola, {},{
                        post:{
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
                listarAgente: function(dataInfo){
                    return $resource(urlListarAgenteDisponible, {},{
                        post:{
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
            }
        }

        var colaService = {
            listarCola: colaResource.cola.listar,
            insertarCola: colaResource.cola.insertar,
            eliminarCola: colaResource.cola.eliminar,
            actualizarCola: colaResource.cola.actualizar,
            buscarCola: colaResource.cola.buscar,
            listarAgenteDisponible: colaResource.cola.listarAgente
        };

        return colaService;
    });
