angular.module('pivo').
factory('permisoLlamadasService', function($resource, ngResourceConfig) {
    var urlTbUsuarioListar = ngResourceConfig.baseURL + "tbUsuario/listar";
    var urlListaTbUsuarioPaginacion = ngResourceConfig.baseURL + "tbUsuario/listaTbUsuarioPaginado";
    /*var urlInsertaPin = ngResourceConfig.baseURL + "tbPin/insertarPin";
    var urlEliminarPin = ngResourceConfig.baseURL + "tbPin/eliminarPin";*/
    // buscaPin
    var urlBuscaPin = ngResourceConfig.baseURL + "tbPin/buscaPin";
    var urlFlagPin = ngResourceConfig.baseURL + "tbPin/flagPin";
    var urlListaUsuarioPorNombre = ngResourceConfig.baseURL + "tbUsuario/listarPorNombre";
    var urlListaEmpresaArea = ngResourceConfig.baseURL + "empresaArea/listarEmpresaArea";
    var urlListaEmpresaAreaXCentro = ngResourceConfig.baseURL + "empresaArea/listarEmpresaAreaxCentro";
    var urlInsertarUsuario = ngResourceConfig.baseURL + "tbUsuario/insertarUsuario";
    var urlListarUsarioXId = ngResourceConfig.baseURL + "tbUsuario/listarPorId";
    var urlActualizarUsuario = ngResourceConfig.baseURL + "tbUsuario/actualizarUsuario";
    var urlEliminarUsuario = ngResourceConfig.baseURL + "tbUsuario/eliminarUsuario";
    var urlModificarFlagUsuario = ngResourceConfig.baseURL + "tbUsuario/modificarFlagUsuarioPin";
    var urlBuscarUsuario = ngResourceConfig.baseURL + "tbUsuario/buscarUsuario";
    var urlListarExtension = ngResourceConfig.baseURL + "extension/listarExtension";
    /*Bolsa Usuario*/
    var urlInsertaBolsaUsuario = ngResourceConfig.baseURL + "bolsaUsuario/insertaBolsaUsuario";
    var urlEditaBolsaUsuario = ngResourceConfig.baseURL + "bolsaUsuario/editaBolsaUsuario";
    var urlEliminaBolsaUsuario = ngResourceConfig.baseURL + "bolsaUsuario/eliminaBolsaUsuario";
    var urlListaBolsaUsuario = ngResourceConfig.baseURL + "bolsaUsuario/listaBolsaUsuario";
    var urlTiempoBolsaDisponible = ngResourceConfig.baseURL + 'bolsaUsuario/tiempoBolsaDisponible';
    var permisoLlamadasResource = {
        usuario: {
            listarUsuario: function(dataInfo) {
                return $resource(urlTbUsuarioListar, {}, {
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
            listaUsuarioPaginado: function(dataInfo) {
                return $resource(urlListaTbUsuarioPaginacion, {}, {
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
            listaUsuarioPorNombre: function(dataInfo) {
                return $resource(urlListaUsuarioPorNombre, {}, {
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
            insertar: function(dataInfo) {
                return $resource(urlInsertarUsuario, {}, {
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
            listarUsuarioXId: function(dataInfo) {
                return $resource(urlListarUsarioXId, {}, {
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
            actualizarUsuario: function(dataInfo) {
                return $resource(urlActualizarUsuario, {}, {
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
            eliminarUsuario: function(dataInfo) {
                return $resource(urlEliminarUsuario, {}, {
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
            modificarFlag: function(dataInfo) {
                return $resource(urlModificarFlagUsuario, {}, {
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
            buscaUsuario: function(dataInfo) {
                return $resource(urlBuscarUsuario, {}, {
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
        },
        pin: {
            flagPin: function(dataInfo) {
                return $resource(urlFlagPin, {}, {
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
            buscarPin: function(dataInfo) {
                return $resource(urlBuscaPin, {}, {
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
        },
        empresaArea: {
            listar: function(dataInfo) {
                return $resource(urlListaEmpresaArea, {}, {
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
            listarEmpresaAreaXCentro: function(dataInfo) {
                return $resource(urlListaEmpresaAreaXCentro, {}, {
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
        },
        extension: {
            listar: function(dataInfo) {
                return $resource(urlListarExtension, {}, {
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
        },
        bolsaUsuario: {
            insertar: function(dataInfo) {
                return $resource(urlInsertaBolsaUsuario, {}, {
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
                return $resource(urlEditaBolsaUsuario, {}, {
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
                return $resource(urlEliminaBolsaUsuario, {}, {
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': dataInfo.codUsuario,
                            'token': dataInfo.token,
                            'idInstancia': dataInfo.idInstancia
                        }
                    }
                })
            },
            listar: function(dataInfo) {
                return $resource(urlListaBolsaUsuario, {}, {
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
            tiempoBolsaDisponible: function(dataInfo) {
                return $resource(urlTiempoBolsaDisponible, {}, {
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
    var permisoLlamadasService = {
        listaUsuario            : permisoLlamadasResource.usuario.listarUsuario,
        listaUsuarioPaginado    : permisoLlamadasResource.usuario.listaUsuarioPaginado,
        buscarUsuario           : permisoLlamadasResource.usuario.buscaUsuario,
        /* insertaPin           : permisoLlamadasResource.pin.insertar.post,
        eliminaPin              : permisoLlamadasResource.pin.eliminar.post,*/
        flagPin                 : permisoLlamadasResource.pin.flagPin,
        buscaPin                : permisoLlamadasResource.pin.buscarPin,
        litaUsuarioPorNombre    : permisoLlamadasResource.usuario.listaUsuarioPorNombre,
        listaEmpresaArea        : permisoLlamadasResource.empresaArea.listar,
        listaEmpresaAreaXCentro : permisoLlamadasResource.empresaArea.listarEmpresaAreaXCentro,
        /*Usuario*/
        insertaUsuario          : permisoLlamadasResource.usuario.insertar,
        listaUsuarioXId         : permisoLlamadasResource.usuario.listarUsuarioXId,
        actualizaUsuario        : permisoLlamadasResource.usuario.actualizarUsuario,
        eliminaUsuario          : permisoLlamadasResource.usuario.eliminarUsuario,
        modificaFlag            : permisoLlamadasResource.usuario.modificarFlag,
        listaExtension          : permisoLlamadasResource.extension.listar,
        /*Bolsa Usuario*/
        insertaBolsaUsuario     : permisoLlamadasResource.bolsaUsuario.insertar,
        editaBolsaUsuario       : permisoLlamadasResource.bolsaUsuario.editar,
        eliminaBolsaUsuario     : permisoLlamadasResource.bolsaUsuario.eliminar,
        listaBolsaUsuario       : permisoLlamadasResource.bolsaUsuario.listar,
        tiempoBolsaDisponible   : permisoLlamadasResource.bolsaUsuario.tiempoBolsaDisponible

    };
    return permisoLlamadasService;
});
