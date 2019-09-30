angular.module('pivo').
    factory('pedidoService', function($resource, ngResourceConfig){

        var urlListaPedidoCliente = ngResourceConfig.baseURL + "pedidosPorCliente/listar";
        var urlEliminaPedidoCliente = ngResourceConfig.baseURL + "pedidosPorCliente/eliminar";
        var urlinsertaPedidoCliente=ngResourceConfig.baseURL+"pedidosPorCliente/insertar";
        var urlListarTipoPedido=ngResourceConfig.baseURL+"pedidosPorCliente/listarTipoPedido";
        var urlListarPlan=ngResourceConfig.baseURL+"pedidosPorCliente/listarPlan";
        var urlListarTipoDetallePedido=ngResourceConfig.baseURL+"pedidosPorCliente/listarTipoDetallePedido";
        var urlListarDetallePedido=ngResourceConfig.baseURL+"detallePedidoN/listar"
        var PedidoResource = {
            listar : {
                Pedido : function(dataInfo){
                    return $resource(urlListaPedidoCliente, {},{
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        },
                    })
                }
                ,
                    DetallePedido : function(dataInfo){
                        return $resource(urlListarDetallePedido, {},{
                            post: {
                                method: 'POST',
                                headers: {
                                    'Content-Type' : 'application/json',
                                    'Accept'       : 'application/json',
                                    'codUsuario'   : "" + dataInfo.codUsuario,
                                    'token'        : "" + dataInfo.token,
                                }
                            },
                        })
                    },
                ListarTipoPedido : function(dataInfo){
                    return $resource(urlListarTipoPedido, {},{
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        },
                    })
                },
                ListarPlan : function(dataInfo){
                    return $resource(urlListarPlan, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        },
                    })
                },
                ListarModalidad : function(dataInfo){
                    return $resource(urlListarTipoDetallePedido, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type' : 'application/json',
                                'Accept'       : 'application/json',
                                'codUsuario'   : "" + dataInfo.codUsuario,
                                'token'        : "" + dataInfo.token,
                            }
                        },
                    })
                },
            },

             eliminar : {
                Pedido : function(dataInfo){
                    return $resource(urlEliminaPedidoCliente, {},{
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
            insertar : {
                Pedido : function(dataInfo){
                    return $resource(urlinsertaPedidoCliente, {},{
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
        };

        var listaPedidoService = {
            listaPedidoCliente : PedidoResource.listar.Pedido,
            eliminaPedidoCliente:PedidoResource.eliminar.Pedido,
            insertaPedidoCliente:PedidoResource.insertar.Pedido,
            listarTipoPedido:PedidoResource.listar.ListarTipoPedido,
            listaPlan:PedidoResource.listar.ListarPlan,
            listarModalidad:PedidoResource.listar.ListarModalidad,
            listarDetallePedido:PedidoResource.listar.DetallePedido
        };
        return listaPedidoService;
});
