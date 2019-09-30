angular.module('pivo').
    factory('mascotaService', function($resource, ngResourceConfig){
        
        var urlListarMascota = ngResourceConfig.baseURL + "mascota/listar";
        var urlRegistrarMascota = ngResourceConfig.baseURL + "mascota/registrar";
        var urlActualizarMascota = ngResourceConfig.baseURL + "mascota/actualizar";
        var urlEliminarMascota = ngResourceConfig.baseURL + "mascota/eliminar";
        var urlListarMascotasReporte = ngResourceConfig.baseURL + "pivoReporte/listarMascotas";
        var MascotaResource = {
            mascota : {
                listar : function(dataInfo){
                    return $resource(urlListarMascota, {},{
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
                },
                registrar : function(dataInfo){
                    return $resource(urlRegistrarMascota, {},{
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
                },
                actualizar : function(dataInfo){
                    return $resource(urlActualizarMascota, {},{
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
                },
                eliminar : function(dataInfo){
                    return $resource(urlEliminarMascota, {},{
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
                },
                listarReporte : function(dataInfo){
                    return $resource(urlListarMascotasReporte, {},{
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

        var mascotaService = {
            listar : MascotaResource.mascota.listar,
            registrar : MascotaResource.mascota.registrar,
            actualizar : MascotaResource.mascota.actualizar,
            eliminar : MascotaResource.mascota.eliminar,
            listarReporte : MascotaResource.mascota.listarReporte
        };
        return mascotaService;
});
