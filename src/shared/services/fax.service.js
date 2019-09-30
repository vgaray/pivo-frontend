angular.module('pivo')
    .factory('faxService', function($resource, ngResourceConfig) {

        var urlListarFax = ngResourceConfig.baseURL + "fax/listar";
        var urlInsertarFax = ngResourceConfig.baseURL + "fax/insertar";
        var urlEliminarFax = ngResourceConfig.baseURL + "fax/eliminar";


        var faxResource = {
            fax: {
                listar: function(dataInfo) {
                    return $resource(urlListarFax, {}, {
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
                    return $resource(urlInsertarFax, {}, {
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
                    return $resource(urlEliminarFax, {}, {
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

        var fax = {
            listarFax: faxResource.fax.listar,
            insertarFax: faxResource.fax.insertar,
            eliminarFax: faxResource.fax.eliminar
        };

        return fax;
    });
