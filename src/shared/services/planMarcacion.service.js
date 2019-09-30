angular.module('pivo')
    .factory('planMarcacionService', function($resource, ngResourceConfig) {

        var urlListarPlanMarcacion = ngResourceConfig.baseURL + "planMarcacion/listar";
        var urlInsertarPlanMarcacion = ngResourceConfig.baseURL + "planMarcacion/insertar";
        var urlActualizarPlanMarcacion = ngResourceConfig.baseURL + "planMarcacion/actualizar";
        var urlEliminarPlanMarcacion = ngResourceConfig.baseURL + "planMarcacion/eliminar";
        var urlListarAnexo = ngResourceConfig.baseURL + "planMarcacion/listarAnexo";
        var urlListarContexto = ngResourceConfig.baseURL + "planMarcacion/listarContexto";
        var urlListarIvr = ngResourceConfig.baseURL + "planMarcacion/listarIvr";
        var urlListarFax = ngResourceConfig.baseURL + "planMarcacion/listarFax";
        var urlListarBuzon = ngResourceConfig.baseURL + "planMarcacion/listarBuzon";

        var planMarcacionResource = {
            planMarcacion: {
                listar: function(dataInfo) {
                    return $resource(urlListarPlanMarcacion, {}, {
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
                    return $resource(urlInsertarPlanMarcacion, {}, {
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
                    return $resource(urlActualizarPlanMarcacion, {}, {
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
                    return $resource(urlEliminarPlanMarcacion, {}, {
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
                listarAnexo: function(dataInfo){
                    return $resource(urlListarAnexo, {},{
                        post:{
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
                listarContexto: function(dataInfo){
                    return $resource(urlListarContexto, {},{
                        post:{
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
                listarIvr: function(dataInfo){
                    return $resource(urlListarIvr, {},{
                        post:{
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
                listarFax: function(dataInfo){
                    return $resource(urlListarFax, {},{
                        post:{
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
                listarBuzon: function(dataInfo){
                    return $resource(urlListarBuzon, {},{
                        post:{
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

        var planMarcacionService = {
            listarPlanMarcacion: planMarcacionResource.planMarcacion.listar,
            insertarPlanMarcacion: planMarcacionResource.planMarcacion.insertar,
            eliminarPlanMarcacion: planMarcacionResource.planMarcacion.eliminar,
            actualizarPlanMarcacion: planMarcacionResource.planMarcacion.actualizar,
            listarAnexo: planMarcacionResource.planMarcacion.listarAnexo,
            listarContexto: planMarcacionResource.planMarcacion.listarContexto,
            listarIvr: planMarcacionResource.planMarcacion.listarIvr,
            listarFax: planMarcacionResource.planMarcacion.listarFax,
            listarBuzon: planMarcacionResource.planMarcacion.listarBuzon

        };

        return planMarcacionService;
    });
