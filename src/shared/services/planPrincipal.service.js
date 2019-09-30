angular.module('pivo')
    .factory('planPrincipalService', function($resource, ngResourceConfig) {

        var urlListarPlanPrincipal = ngResourceConfig.baseURL + "planPrincipal/listar";
        var urlInsertarPlanPrincipal = ngResourceConfig.baseURL + "planPrincipal/insertar";
        var urlActualizarPlanPrincipal = ngResourceConfig.baseURL + "planPrincipal/actualizar";
        var urlEliminarPlanPrincipal = ngResourceConfig.baseURL + "planPrincipal/eliminar";
        var urlListarContextoPorPlan = ngResourceConfig.baseURL + "planPrincipal/listarContextoPorPlan";

        var planPrincipalResource = {
            planPrincipal: {
                listar: function(dataInfo) {
                    return $resource(urlListarPlanPrincipal, {}, {
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
                    return $resource(urlInsertarPlanPrincipal, {}, {
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
                    return $resource(urlActualizarPlanPrincipal, {}, {
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
                    return $resource(urlEliminarPlanPrincipal, {}, {
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
                listarContexto: function(dataInfo) {
                    return $resource(urlListarContextoPorPlan, {}, {
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

        var planPrincipalService = {
            listarPlanPrincipal: planPrincipalResource.planPrincipal.listar,
            insertarPlanPrincipal: planPrincipalResource.planPrincipal.insertar,
            eliminarPlanPrincipal: planPrincipalResource.planPrincipal.eliminar,
            actualizarPlanPrincipal: planPrincipalResource.planPrincipal.actualizar,
            listarContextoPorPlan: planPrincipalResource.planPrincipal.listarContexto
        };

        return planPrincipalService;
    });
