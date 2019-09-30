angular.module('pivo').
    factory('historiaClinicaService', function ($resource, ngResourceConfig) {

        var urlListarhistoriaClinica = ngResourceConfig.baseURL + "historia-clinica/listar";
        var urlRegistrarhistoriaClinica = ngResourceConfig.baseURL + "historia-clinica/registrar";
        var urlActualizarhistoriaClinica = ngResourceConfig.baseURL + "historia-clinica/actualizar";
        var urlEliminarhistoriaClinica = ngResourceConfig.baseURL + "historia-clinica/eliminar";
        //............................................................................................
        var urlListarhistoriaClinicaService = ngResourceConfig.baseURL + "historia-clinica-service/listarHC";
        var urlListarhistoriaClinicaServiceCF = ngResourceConfig.baseURL + "historia-clinica-service/listarCF";
        var urlListarhistoriaClinicaServiceLP = ngResourceConfig.baseURL + "historia-clinica-service/listarLP";
        var urlListarhistoriaClinicaServiceV = ngResourceConfig.baseURL + "historia-clinica-service/listarV";
        var historiaClinicaResource = {
            historiaClinica: {
                listar: function (dataInfo) {
                    return $resource(urlListarhistoriaClinica, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                            }
                        }
                    })
                },
                registrar: function (dataInfo) {
                    return $resource(urlRegistrarhistoriaClinica, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                            }
                        }
                    })
                },
                actualizar: function (dataInfo) {
                    return $resource(urlActualizarhistoriaClinica, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                            }
                        }
                    })
                },
                eliminar: function (dataInfo) {
                    return $resource(urlEliminarhistoriaClinica, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                            }
                        }
                    })
                }
            },
            historiaClinicaService: {
                listarHC: function (dataInfo) {
                    return $resource(urlListarhistoriaClinicaService, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia,
                            }
                        }
                    })
                },
                listarCF: function (dataInfo) {
                    return $resource(urlListarhistoriaClinicaServiceCF, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia,
                            }
                        }
                    })
                },
                listarLP: function (dataInfo) {
                    return $resource(urlListarhistoriaClinicaServiceLP, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia,
                            }
                        }
                    })
                },
                listarV: function (dataInfo) {
                    return $resource(urlListarhistoriaClinicaServiceV, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token,
                                'idInstancia': "" + dataInfo.idInstancia,
                            }
                        }
                    })
                },
            },
        };

        var historiaClinicaService = {
            listar: historiaClinicaResource.historiaClinica.listar,
            registrar: historiaClinicaResource.historiaClinica.registrar,
            actualizar: historiaClinicaResource.historiaClinica.actualizar,
            eliminar: historiaClinicaResource.historiaClinica.eliminar,
            //.................................................
            listarServiceHC: historiaClinicaResource.historiaClinicaService.listarHC,
            listarServiceCF: historiaClinicaResource.historiaClinicaService.listarCF,
            listarServiceLP: historiaClinicaResource.historiaClinicaService.listarLP,
            listarServiceV: historiaClinicaResource.historiaClinicaService.listarV,
        };
        return historiaClinicaService;
    });
