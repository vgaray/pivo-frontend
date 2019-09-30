angular.module('pivo')
    .factory('areaCentroCostoService', function($resource, ngResourceConfig) {

        var codUsuario = 'daddadad';
        var token = 'asdad';

        var urlListarAreaCentroCosto = ngResourceConfig.baseURL + "areaCentroCosto/listarCentroxArea";
        var urlInsertarAreaCentroCosto = ngResourceConfig.baseURL + "areaCentroCosto/insertarArea";
        var urlEditarAreaCentroCosto = ngResourceConfig.baseURL + "areaCentroCosto/actualizarArea";
        var urlEliminarAreaCentroCosto = ngResourceConfig.baseURL + "areaCentroCosto/eliminarIdArea";
        /*Bolsa empresa*/
        var urlInsertaBolsaAreaCentro = ngResourceConfig.baseURL + "bolsaEmpresa/insertaBolsaEmpresa";
        var urlEditaBolsaAreaCentro = ngResourceConfig.baseURL + "bolsaEmpresa/editaBolsaEmpresa";
        var urlEliminaBolsaAreaCentro = ngResourceConfig.baseURL + "bolsaEmpresa/eliminaBolsaEmpresa";
        var urlListaBolsaAreaCentro = ngResourceConfig.baseURL + "bolsaEmpresa/listaBolsaEmpresa";
        var urlBolsaDisponibleArea = ngResourceConfig.baseURL + "bolsaEmpresa/tiempoBolsaDisponibleArea";
        var urlListaBolsaFiltroAreaCentro = ngResourceConfig.baseURL + "bolsaEmpresa/listaBolsaEmpresaFiltro"
        var areaCentroCostoResource = {
            areaCentroCosto: {
                listar: function(dataInfo) {
                    return $resource(urlListarAreaCentroCosto, {}, {
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
                    return $resource(urlInsertarAreaCentroCosto, {}, {
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
                editar: function(dataInfo) {
                    return $resource(urlEditarAreaCentroCosto, {}, {
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
                    return $resource(urlEliminarAreaCentroCosto, {}, {
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
            bolsaEmpresa: {
                insertar: function(dataInfo) {
                    return $resource(urlInsertaBolsaAreaCentro, {}, {
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
                    return $resource(urlEditaBolsaAreaCentro, {}, {
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
                    return $resource(urlEliminaBolsaAreaCentro, {}, {
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
                    return $resource(urlListaBolsaAreaCentro, {}, {
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
                listarFiltro: function(dataInfo){
                    return $resource(urlListaBolsaFiltroAreaCentro,{},{
                        post:{
                            method: 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'Accept': 'application/json',
                                'codUsuario': ""+dataInfo.codUsuario,
                                'token': ""+dataInfo.token,
                                'idInstancia': ""+ dataInfo.idInstancia
                            }
                        }
                    })
                },
                bolsaDisponibleArea: function(dataInfo) {
                    return $resource(urlBolsaDisponibleArea, {}, {
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
        }

        var areaCentroCostoService = {
            listarAreaCentroCosto: areaCentroCostoResource.areaCentroCosto.listar,
            insertarAreaCentroCosto: areaCentroCostoResource.areaCentroCosto.insertar,
            eliminarAreaCentroCosto: areaCentroCostoResource.areaCentroCosto.eliminar,
            actualizarAreaCentroCosto: areaCentroCostoResource.areaCentroCosto.editar,
            /*bolsa empresa*/
            insertaBolsaEmpresa: areaCentroCostoResource.bolsaEmpresa.insertar,
            editaBolsaEmpresa: areaCentroCostoResource.bolsaEmpresa.editar,
            eliminaBolsaEmpresa: areaCentroCostoResource.bolsaEmpresa.eliminar,
            listaBolsaEmpresa: areaCentroCostoResource.bolsaEmpresa.listar,
            bolsaDisponibleArea: areaCentroCostoResource.bolsaEmpresa.bolsaDisponibleArea,
            listaFiltroBolsaEmpresa: areaCentroCostoResource.bolsaEmpresa.listarFiltro

        };

        return areaCentroCostoService;
    });
