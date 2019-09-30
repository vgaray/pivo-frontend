angular.module('pivo')
    .factory('planSalienteService', function($resource, ngResourceConfig) {

        var urlListarPlanSaliente = ngResourceConfig.baseURL + "planSaliente/listar";
        var urlInsertarPlanSaliente = ngResourceConfig.baseURL + "planSaliente/insertar";
        var urlActualizarPlanSaliente = ngResourceConfig.baseURL + "planSaliente/actualizar";
        var urlEliminarPlanSaliente = ngResourceConfig.baseURL + "planSaliente/eliminar";

        var planSalienteResource = {
            planSaliente: {
                listar: function(dataInfo) {
                    return $resource(urlListarPlanSaliente, {}, {
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
                    return $resource(urlInsertarPlanSaliente, {}, {
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
                    return $resource(urlActualizarPlanSaliente, {}, {
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
                    return $resource(urlEliminarPlanSaliente, {}, {
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

        var planSalienteService = {
            listarPlanSaliente: planSalienteResource.planSaliente.listar,
            insertarPlanSaliente: planSalienteResource.planSaliente.insertar,
            eliminarPlanSaliente: planSalienteResource.planSaliente.eliminar,
            actualizarPlanSaliente: planSalienteResource.planSaliente.actualizar,

        };

        return planSalienteService;
    });
