(function() {
    'use strict';
    angular.module('pivo').factory('seguridadService', function($resource, ngResourceConfig) {
        var urlCrearRol = ngResourceConfig.baseURL + "rol/crearRol";

        var urlListaRol = ngResourceConfig.baseURL + "rol/listaRolesxPagina"
        var urlActualizarRol = ngResourceConfig.baseURL + "rol/actualizarRol"
        var urlListarPag = ngResourceConfig.baseURL + "pagina/listarPaginas";
        var urlListarSinInstancia =ngResourceConfig.baseURL + "rol/listaRolesSinPagina"
        var urlListarGPedido = ngResourceConfig.baseURL + "pagina/listarPaginasGPedido";
        var urlEliminarRol = `${ngResourceConfig.baseURL}rol/eliminarRol`;

        var seguridadResource = {
            rol: {
                crearRol: function(dataInfo) {                    
                    return $resource(urlCrearRol, {}, {
                        post: {
                            method: "POST",
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
                actualizarRol: function(dataInfo) {
                    return $resource(urlActualizarRol, {}, {
                        post: {
                            method: "POST",
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
                eliminarRol : function(dataInfo)
                {
                    return $resource(urlEliminarRol, {}, {
                        post: {
                            method: "POST",
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
                listadoRol: function(dataInfo) {
                    return $resource(urlListaRol, {},{
                      post: {
                           method: "POST",
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
                listaRolesSinPagina : function (dataInfo) {
                     return $resource(urlListarSinInstancia, {}, {
                          post: {
                              method: "POST",
                              headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token
                              }
                          }
                     })
                }
            },
            pagina:{
                listarPagina: function (dataInfo){
                    return $resource(urlListarPag, {}, {
                        post:{
                            method: "POST",
                            headers:{
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
                listarGPedido: function (dataInfo){
                    return $resource(urlListarGPedido, {}, {
                        post:{
                            method: "POST",
                            headers:{
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token
                            }
                        }
                    })
                }
            }
        };

        var seguridadService = {
            crearRol: seguridadResource.rol.crearRol,
            actualizarRol: seguridadResource.rol.actualizarRol,
            listadoRol:seguridadResource.rol.listadoRol,
            listarPagina: seguridadResource.pagina.listarPagina,
            listaRolesSinPagina: seguridadResource.rol.listaRolesSinPagina,
            // listarPagina: seguridadResource.pagina.listarPagina,
            listaGPedido: seguridadResource.pagina.listarGPedido,
            eliminarRol: seguridadResource.rol.eliminarRol
        };

        return seguridadService
    });
})();
