angular.module('pivo').
    factory('clienteService', function($resource, ngResourceConfig){
        
        var urlListaCliente = ngResourceConfig.baseURL + "clienteN/listar";
        var urlEliminaCliente = ngResourceConfig.baseURL + "clienteN/eliminar";
        var urlregistraCliente=ngResourceConfig.baseURL+"clienteN/insertar";
        var urlactualizaCliente=ngResourceConfig.baseURL+"clienteN/actualizar";
        var ClienteResource = {
            listar : {
                cliente : function(dataInfo){
                    return $resource(urlListaCliente, {},{
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        }
                    })
                }
            },
             eliminar : {
                cliente : function(dataInfo){
                    return $resource(urlEliminaCliente, {},{
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        }
                    })
                }
            },
            registrar : {
                cliente : function(dataInfo){
                    return $resource(urlregistraCliente, {},{
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        }
                    })
                }
            },
            actualizar : {
                cliente : function(dataInfo){
                    return $resource(urlactualizaCliente, {},{
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        }
                    })
                }
            }
        };

        var listaClienteService = {
            listaCliente : ClienteResource.listar.cliente,
            eliminaCliente:ClienteResource.eliminar.cliente,
            registraCliente:ClienteResource.registrar.cliente,
            actualizaCliente:ClienteResource.actualizar.cliente
        };
        return listaClienteService;
});
