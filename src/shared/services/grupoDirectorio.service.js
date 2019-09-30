angular.module('pivo')
    .factory('grupoDirectorioService', function($resource, ngResourceConfig) {

        var urlListarDirectorio = ngResourceConfig.baseURL + "grupoDirectorio/listar";
        var urlInsertarDirectorio = ngResourceConfig.baseURL + "grupoDirectorio/insertar";
        var urlActualizarDirectorio = ngResourceConfig.baseURL + "grupoDirectorio/actualizar";
        var urlEliminarDirectorio = ngResourceConfig.baseURL + "grupoDirectorio/eliminar";
        var urlValidarDirectorio = ngResourceConfig.baseURL + "grupoDirectorio/validarDirectorio";

        var urlListarEntrada = ngResourceConfig.baseURL + "grupoDirectorio/listarEntrada";
        var urlInsertarEntrada = ngResourceConfig.baseURL + "grupoDirectorio/insertarEntrada";
        var urlActualizarEntrada = ngResourceConfig.baseURL + "grupoDirectorio/actualizarEntrada";
        var urlEliminarEntrada = ngResourceConfig.baseURL + "grupoDirectorio/eliminarEntrada";
        var urlValidarEntradaDirectorio = ngResourceConfig.baseURL + "grupoDirectorio/validarEntradaDirectorio";

        var directorioResource = {
            directorio: {
                listar: function(dataInfo) {
                    return $resource(urlListarDirectorio, {}, {
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
                    return $resource(urlInsertarDirectorio, {}, {
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
                    return $resource(urlActualizarDirectorio, {}, {
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
                    return $resource(urlEliminarDirectorio, {}, {
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
                validarDirectorio: function(dataInfo) {
                    return $resource(urlValidarDirectorio, {}, {
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
                listarEntrada: function(dataInfo) {
                    return $resource(urlListarEntrada, {}, {
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
                insertarEntrada: function(dataInfo) {
                    return $resource(urlInsertarEntrada, {}, {
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
                actualizarEntrada: function(dataInfo) {
                    return $resource(urlActualizarEntrada, {}, {
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
                eliminarEntrada: function(dataInfo) {
                    return $resource(urlEliminarEntrada, {}, {
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
                validarEntradaDirectorio: function(dataInfo) {
                    return $resource(urlValidarEntradaDirectorio, {}, {
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
            }
        }

        var grupoDirectorioService = {
            listarGrupo: directorioResource.directorio.listar,
            insertarGrupo: directorioResource.directorio.insertar,
            eliminarGrupo: directorioResource.directorio.eliminar,
            actualizarGrupo: directorioResource.directorio.actualizar,
            validarDirectorio: directorioResource.directorio.validarDirectorio,

            listarEntrada: directorioResource.directorio.listarEntrada,
            insertarEntrada: directorioResource.directorio.insertarEntrada,
            eliminarEntrada: directorioResource.directorio.eliminarEntrada,
            actualizarEntrada: directorioResource.directorio.actualizarEntrada,
            validarEntradaDirectorio: directorioResource.directorio.validarEntradaDirectorio,
        };

        return grupoDirectorioService;
    });
