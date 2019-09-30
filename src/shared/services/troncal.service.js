(function() {
    'use strict';
    angular.module('pivo')
        .factory('troncalService', function($resource, ngResourceConfig) {
            /*url para matenimiento de sip trunk*/
            var urlListaSipTrunk = ngResourceConfig.baseURL + "sipTrunk/lista";
            var urlInsertarSipTrunk = ngResourceConfig.baseURL + "sipTrunk/insertaSipTrunk";
            var urlActualizarSipTrunk = ngResourceConfig.baseURL + "sipTrunk/editaSipTrunk";
            var urlEliminarSipTrunk = ngResourceConfig.baseURL + "sipTrunk/eliminaSipTrunk";
            /*codec*/
            var urlListaCodec = ngResourceConfig.baseURL + "codec/lista";
            /*permit*/
            var urlListaPermit = ngResourceConfig.baseURL + "permit/lista";
            /*iax trunk*/
            var urlListaIaxTrunk = ngResourceConfig.baseURL + "iaxTrunk/listaIaxTrunk";
            var urlInsertarIaxTrunk = ngResourceConfig.baseURL + "iaxTrunk/insertaIaxTrunk";
            var urlActualizarIaxTrunk = ngResourceConfig.baseURL + "iaxTrunk/actualizaIaxTrunk";
            var urlEliminarIaxTrunk = ngResourceConfig.baseURL + "iaxTrunk/eliminaIaxTrunk";
            var urlFiltrarCentralesDisponibles = ngResourceConfig.baseURL + "iaxTrunk/listaCentralesNoDisponibles";
            /* ver code iax trunk*/
            var urlViewCodeIaxTrunk = ngResourceConfig.baseURL + "iaxTrunk/viewCodeIaxTrunk";
            /**/
            var troncalResource = {
                sipTrunk: {
                    listar: function(dataInfo) {
                        return $resource(urlListaSipTrunk, {}, {
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
                        return $resource(urlInsertarSipTrunk, {}, {
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
                    actualizar: function(dataInfo) {
                        return $resource(urlActualizarSipTrunk, {}, {
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
                    eliminar: function(dataInfo) {
                        return $resource(urlEliminarSipTrunk, {}, {
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
                    }

                },
                codec: {
                    listar: function(dataInfo) {
                        return $resource(urlListaCodec, {}, {
                            post: {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'codUsuario': dataInfo.codUsuario,
                                    'token': dataInfo.token,
                                    'idInstancia': dataInfo.idInstancia
                                }
                            }
                        })
                    }
                },
                permit: {
                    listar: function(dataInfo) {
                        return $resource(urlListaPermit, {}, {
                            post: {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'codUsuario': dataInfo.codUsuario,
                                    'token': dataInfo.token,
                                    'idInstancia': dataInfo.idInstancia
                                }
                            }
                        })
                    }
                },
                iaxTrunk: {
                    listar: function(dataInfo) {
                        return $resource(urlListaIaxTrunk, {}, {
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
                        return $resource(urlInsertarIaxTrunk, {}, {
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
                    actualizar: function(dataInfo) {
                        return $resource(urlActualizarIaxTrunk, {}, {
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
                    eliminar: function(dataInfo) {
                        return $resource(urlEliminarIaxTrunk, {}, {
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
                    viewCode: function(dataInfo) {
                        return $resource(urlViewCodeIaxTrunk, {}, {
                            post: {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'codUsuario':  dataInfo.codUsuario,
                                    'token': dataInfo.token,
                                    'idInstancia': dataInfo.idInstancia
                                }
                            }
                        })
                    },
                    filtrarCentral: function(dataInfo) {
                        return $resource(urlFiltrarCentralesDisponibles, {}, {
                            post: {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'codUsuario':  dataInfo.codUsuario,
                                    'token': dataInfo.token,
                                    'idInstancia': dataInfo.idInstancia
                                }
                            }
                        })
                    }                    

                }
            };
            var troncalService = {
                listaSipTrunk: troncalResource.sipTrunk.listar,
                insertaSipTrunk: troncalResource.sipTrunk.insertar,
                actualizaSipTrunk: troncalResource.sipTrunk.actualizar,
                eliminaSipTrunk: troncalResource.sipTrunk.eliminar,
                /*codec*/
                listaCodec: troncalResource.codec.listar,
                /*Permit*/
                listaPermit: troncalResource.permit.listar,
                /*iax trunk*/
                listaIaxTrunk: troncalResource.iaxTrunk.listar,
                insertaIaxTrunk: troncalResource.iaxTrunk.insertar,
                actualizaIaxTrunk: troncalResource.iaxTrunk.actualizar,
                eliminaIaxTrunk: troncalResource.iaxTrunk.eliminar,
                viewCodeIaxTrunk: troncalResource.iaxTrunk.viewCode,
                filtrarCentral: troncalResource.iaxTrunk.filtrarCentral
            };
            return troncalService;
        });
})();