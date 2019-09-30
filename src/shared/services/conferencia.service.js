angular.module('pivo')
    .factory('conferenciaService',function($resource, ngResourceConfig){

        var urlInsertarConferencia  = ngResourceConfig.baseURL  + "conferencia/insertarConferencia";
        var urlActualizarConferencia= ngResourceConfig.baseURL + "conferencia/actualizarConferencia";
        var urlEliminarConferencia  = ngResourceConfig.baseURL  + "conferencia/eliminarConferencia";
        var urlListarConferencia    = ngResourceConfig.baseURL  + "conferencia/listarConferencia";
        //MusicOnHold
        var urlListaMusiconHold     = ngResourceConfig.baseURL + "musicaOnHold/listaMusicaOnHold";
        
        var conferenciaResource = {
            conferencia : {
                insertaConferencia : function(dataInfo){
                    return $resource(urlInsertarConferencia, {},{
                        post: {
                            method : 'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'Accept'      :'application/json',
                                'codUsuario'  :""+dataInfo.codUsuario,
                                'token'       :""+dataInfo.token,
                                'idInstancia' :""+dataInfo.idInstancia
                            }
                        }
                    })
                },
                actualizaConferencia: function(dataInfo){
                    return $resource(urlActualizarConferencia, {},{
                        post: {
                            method:'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'Accept'      :'application/json',
                                'codUsuario'  :""+dataInfo.codUsuario,
                                'token'       :""+dataInfo.token,
                                'idInstancia' :""+dataInfo.idInstancia
                            }
                        }
                    })
                },
                eliminaConferencia  : function(dataInfo){
                    return $resource(urlEliminarConferencia, {}, {
                        post: {
                            method:'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'Accept'      :'application/json',
                                'codUsuario'  :""+dataInfo.codUsuario,
                                'token'       :""+dataInfo.token,
                                'idInstancia' :""+dataInfo.idInstancia
                            }
                        }
                    })
                },
                listaConferencia  : function(dataInfo){
                    return $resource(urlListarConferencia, {}, {
                        post: {
                            method:'POST',
                            headers: {
                                'Content-Type':'application/json',
                                'Accept'      :'application/json',
                                'codUsuario'  :""+dataInfo.codUsuario,
                                'token'       :""+dataInfo.token,
                                'idInstancia' :""+dataInfo.idInstancia
                            }
                        }
                    })
                },
                listaMusicaOnHold : function(dataInfo){
                    return $resource(urlListaMusiconHold, {}, {
                        post: {
                            method: 'POST',
                            headers : {
                                'Content-Type':'application/json',
                                'Accept'      :'application/json',
                                'codUsuario'  :""+dataInfo.codUsuario,
                                'token'       :""+dataInfo.token,
                                'idInstancia' :""+dataInfo.idInstancia
                            }
                        }
                    })
                }
            }
        };

        var conferenciaService = {
            insertaConferenciaServ  : conferenciaResource.conferencia.insertaConferencia,
            actualizaConferenciaServ: conferenciaResource.conferencia.actualizaConferencia,
            eliminaConferenciaServ  : conferenciaResource.conferencia.eliminaConferencia,
            listaConferenciaServ    : conferenciaResource.conferencia.listaConferencia,
            listaMusicaOnHoldServ   : conferenciaResource.conferencia.listaMusicaOnHold
        };

        return conferenciaService;

})