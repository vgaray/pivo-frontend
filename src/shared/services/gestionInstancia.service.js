angular.module('pivo').
factory('gestionInstanciaService', function($resource, ngResourceConfig) {
    var urlBuscarIntanciaxIdInstancia = ngResourceConfig.baseURL + "instancia/listaInstanciaxId";
    var urlListarInstanciaxIdCliente = ngResourceConfig.baseURL + "instancia/listaInstanciaxCliente";
    var urlListarInstancia = ngResourceConfig.baseURL + "instancia/listaInstancia";
    var urlLoadStatusConfig = ngResourceConfig.baseURL + "instancia/cargar-estado-configuracion";
    var urlActualizaInstancia = ngResourceConfig.baseURL + "instancia/actualizarInstancia";
    var urlImportBashScripts = ngResourceConfig.baseURL + "configuracion-inicial-asterisk/import-scripts";
    var urlInstallDatabaseService = ngResourceConfig.baseURL + "configuracion-inicial-asterisk/base-de-datos";
    var urlInstallOpenVPNService = ngResourceConfig.baseURL + "configuracion-inicial-asterisk/open-vpn";
    var urlInstallVirtualFaxService = ngResourceConfig.baseURL + "configuracion-inicial-asterisk/fax";
    var urlInstallConfigurationSerice = ngResourceConfig.baseURL + "configuracion-inicial-asterisk/ejecutar-bash";
    var urlListaInstanciasPorEmpresa = ngResourceConfig.baseURL + "instancia/listaInstanciasEmpresa";
    var urlInsertaInstanciaN=ngResourceConfig.baseURL+"instancia/insertarN";
    // url para marca y modelo 
    var urlListarMarcaTelefono = ngResourceConfig.baseURL + "marcaTelefonoGeneral/listarMarca";
    var urlListarModeloTelefonoPorMarca = ngResourceConfig.baseURL + "modeloTelefonoGeneral/listarPorMarca";
    var urlListarCantidadAnexosporPlan=ngResourceConfig.baseURL+"plan/listar-cantidad-anexos";
    var gestionInstanciaResource = {

        instancia: {
            actualizarInstancia: function(dataInfo) {
                return $resource(urlActualizaInstancia, {}, {
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token
                            // 'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
            listarCantidadAnexos: function(dataInfo) {
                return $resource(urlListarCantidadAnexosporPlan, {}, {
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token
                            // 'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
            insertarInstanciaN: function(dataInfo) {
                return $resource(urlInsertaInstanciaN, {}, {
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token
                        }
                    }
                })
            },
            listarxidInstancia: function(dataInfo) {
                return $resource(urlBuscarIntanciaxIdInstancia, {}, {
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token
                            // 'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
            listarxidCliente: function(dataInfo) {
                return $resource(urlListarInstanciaxIdCliente, {}, {
                    post: {
                        method: 'POST',
                        isArray: true,
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
            listarInstancia: function(dataInfo) {
                return $resource(urlListarInstancia, {}, {
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json',
                            'codUsuario': "" + dataInfo.codUsuario,
                            'token': "" + dataInfo.token
                        }
                    }
                })
            },
            loadStatusConfig: function(dataInfo) {
                return $resource(urlLoadStatusConfig, {}, {
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
                });
            },
            importBashScripts: function(dataInfo) {
                return $resource(urlImportBashScripts, {}, {
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
                });
            },
            installDataBaseService: function(dataInfo) {
                return $resource(urlInstallDatabaseService, {}, {
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
                });
            },
            installOpenVPNService: function(dataInfo) {
                return $resource(urlInstallOpenVPNService, {}, {
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
                });
            },
            installVirtualFaxService: function(dataInfo) {
                return $resource(urlInstallVirtualFaxService, {}, {
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
                });
            },
            executeBash: function(urlService, dataInfo) {
                return $resource(ngResourceConfig.baseURL + urlService, {}, {
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
                });
            },
            listaInstanciasPorEmpresa: function(dataInfo) {
                return $resource(urlListaInstanciasPorEmpresa, {}, {
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
            }
        },
        marcaTelefono: {
            listar: function(dataInfo) {
                return $resource(urlListarMarcaTelefono, {}, {
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
        modeloTelefono: {
            listarPorMarca: function(dataInfo) {
                return $resource(urlListarModeloTelefonoPorMarca, {}, {
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
    var gestionInstanciaService = {
        actualizaInstancia: gestionInstanciaResource.instancia.actualizarInstancia,
        insertaInstanciaN:gestionInstanciaResource.instancia.insertarInstanciaN,
        listaPoridInstancia: gestionInstanciaResource.instancia.listarxidInstancia,
        listarPorIdCliente: gestionInstanciaResource.instancia.listarxidCliente,
        listarInstanciaAdmin: gestionInstanciaResource.instancia.listarInstancia,
        loadStatusConfig: gestionInstanciaResource.instancia.loadStatusConfig,
        importBashScripts: gestionInstanciaResource.instancia.importBashScripts,
        installDataBaseService: gestionInstanciaResource.instancia.installDataBaseService,
        installOpenVPNService: gestionInstanciaResource.instancia.installOpenVPNService,
        installVirtualFaxService: gestionInstanciaResource.instancia.installVirtualFaxService,
        executeBashConfiguration: gestionInstanciaResource.instancia.executeBash,
        listaInstanciasEmpresa: gestionInstanciaResource.instancia.listaInstanciasPorEmpresa,
        // marca y modelo
        listaMarcaTelefono: gestionInstanciaResource.marcaTelefono.listar,
        listarModeloTelefonoPorMarca: gestionInstanciaResource.modeloTelefono.listarPorMarca,
        listaCantidadAnexos: gestionInstanciaResource.instancia.listarCantidadAnexos
    };

    return gestionInstanciaService;
});