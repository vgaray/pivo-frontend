(
    function() {
        'use strict';
        angular.module('pivo')
            .factory('listaNegraService', function($resource, ngResourceConfig) {
                // urls
                var urlInsertaListaNegra = ngResourceConfig.baseURL + "listaNegra/insertarListaNegra";
                var urlEditaListaNegra = ngResourceConfig.baseURL + "listaNegra/actualizarListaNegra";
                var urlEliminarListaNegra = ngResourceConfig.baseURL + "listaNegra/eliminarListaNegra";
                var urlListaListaNegra = ngResourceConfig.baseURL + "listaNegra/listarListaNegra";
                var urlCambiaEstadoListaNegra = ngResourceConfig.baseURL + "listaNegra/cambiaEstadoListaNegra";
                var urlBuscarListaNegra = ngResourceConfig.baseURL + "listaNegra/buscarListaNegra";
                
                var listaNegraResource = {
                    listaNegra: {
                        insertar: function(dataInfo) {
                            return $resource(urlInsertaListaNegra, {}, {
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
                        editar: function(dataInfo) {
                            return $resource(urlEditaListaNegra, {}, {
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
                        eliminar: function(dataInfo) {
                            return $resource(urlEliminarListaNegra, {}, {
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
                        listar: function(dataInfo) {
                            return $resource(urlListaListaNegra, {}, {
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
                        cambiaEstado: function(dataInfo) {
                            return $resource(urlCambiaEstadoListaNegra, {}, {
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
                        buscar: function(dataInfo) {
                            return $resource(urlBuscarListaNegra, {}, {
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
                        }
                    }
                };
                var listaNegraService = {
                    insertaListaNegra: listaNegraResource.listaNegra.insertar,
                    editaListaNegra: listaNegraResource.listaNegra.editar,
                    eliminaListaNegra: listaNegraResource.listaNegra.eliminar,
                    listaListaNegra: listaNegraResource.listaNegra.listar,
                    cambiaEstadoListaNegra: listaNegraResource.listaNegra.cambiaEstado,
                    buscarListaNegra: listaNegraResource.listaNegra.buscar
                };
                return listaNegraService;
            });
    })();
