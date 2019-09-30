(function() {
    'use strict';
    angular.module('pivo')
        .factory('gestionHorarioService', function($resource, ngResourceConfig) {
            /*variables url para grupo horario*/
            var urlInsertaGrupoHorario = ngResourceConfig.baseURL + 'grupoHorario/insertaGrupoHorario';
            var urlEditaGrupoHorario = ngResourceConfig.baseURL + 'grupoHorario/editaGrupoHorario';
            var urlEliminaGrupoHorario = ngResourceConfig.baseURL + 'grupoHorario/eliminaGrupoHorario';
            var urlListaGrupoHorario = ngResourceConfig.baseURL + 'grupoHorario/listaGrupoHorario';
            var urlListaPorIdGrupoHorario = ngResourceConfig.baseURL + 'grupoHorario/listaPorIdGrupoHorario';
            /*variables url para horario*/
            var urlInsertaHorario = ngResourceConfig.baseURL + 'horario/insertaHorario';
            var urlEditaHorario = ngResourceConfig.baseURL + 'horario/editaHorario';
            var urlEliminaHorario = ngResourceConfig.baseURL + 'horario/eliminaHorario';
            var urlListaHorario = ngResourceConfig.baseURL + 'horario/listaHorario';
            var urlListaPorIdHorario = ngResourceConfig.baseURL + 'horario/listaPorIdHorario';
            var urlListarAudiosPredeterminados = ngResourceConfig.baseURL + 'horario/listar-audios-predeterminados';

            var gestionHorarioResource = {
                grupoHorario: {
                    insertar: function(dataInfo) {
                        return $resource(urlInsertaGrupoHorario, {}, {
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
                    },
                    editar: function(dataInfo) {
                        return $resource(urlEditaGrupoHorario, {}, {
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
                    },
                    eliminar: function(dataInfo) {
                        return $resource(urlEliminaGrupoHorario, {}, {
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
                    },
                    listar: function(dataInfo) {
                        return $resource(urlListaGrupoHorario, {}, {
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
                    },
                    listarPorId: function(dataInfo) {
                        return $resource(urlListaPorIdGrupoHorario, {}, {
                            post: {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'codUsuario': dataInfo.codUsuario,
                                    'token': "" + dataInfo.token,
                                    'idInstancia': dataInfo.idInstancia
                                }
                            }
                        })
                    }
                },
                horario: {
                    insertar: function(dataInfo) {
                        return $resource(urlInsertaHorario, {}, {
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
                    },
                    editar: function(dataInfo) {
                        return $resource(urlEditaHorario, {}, {
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
                    },
                    eliminar: function(dataInfo) {
                        return $resource(urlEliminaHorario, {}, {
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
                    },
                    listar: function(dataInfo) {
                        return $resource(urlListaHorario, {}, {
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
                    },
                    listarPorId: function(dataInfo) {
                        return $resource(urlListaPorIdHorario, {}, {
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
                    },
                    listarAudiosEnServidor: function( dataInfo )
                    {
                        return $resource( urlListarAudiosPredeterminados, {},
                        {
                            post:
                            {
                                method: 'POST',
                                headers:
                                {
                                    'Content-Type': 'application/json',
                                    'Accept': 'application/json',
                                    'codUsuario': dataInfo.codUsuario,
                                    'token': dataInfo.token,
                                    'idInstancia': dataInfo.idInstancia
                                }
                            }
                        } );
                    }
                }
            };

            var gestionHorarioService={
            	/*grupo horario*/
            	insertaGrupoHorario : gestionHorarioResource.grupoHorario.insertar,
            	editaGrupoHorario : gestionHorarioResource.grupoHorario.editar,
            	eliminaGrupoHorario : gestionHorarioResource.grupoHorario.eliminar,
            	listaGrupoHorario : gestionHorarioResource.grupoHorario.listar,
            	listaPorIdGrupoHorario : gestionHorarioResource.grupoHorario.listarPorId,
            	/*horario*/
            	insertaHorario : gestionHorarioResource.horario.insertar,
            	editaHorario : gestionHorarioResource.horario.editar,
            	eliminaHorario : gestionHorarioResource.horario.eliminar,
            	listaHorario : gestionHorarioResource.horario.listar,
            	listaPorIdHorario : gestionHorarioResource.horario.listarPorId,
                listarAudiosPorDefecto: gestionHorarioResource.horario.listarAudiosEnServidor
            }

            return  gestionHorarioService;
        });
})();
