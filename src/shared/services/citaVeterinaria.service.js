angular.module('pivo').
    factory('citaVeterinariaService', function ($resource, ngResourceConfig) {
        var urlListarCita = ngResourceConfig.baseURL + "cita/listar";
        var urlListarCitaUsuario = ngResourceConfig.baseURL + "usuarioCita/listar";
        var CitaResource = {
            cita: {
                listar: function (dataInfo) {
                    return $resource(urlListarCita, {}, {
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
            },
            usuario: {
                listar: function (dataInfo) {
                    return $resource(urlListarCitaUsuario, {}, {
                        post: {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                'Accept': 'application/json',
                                'codUsuario': "" + dataInfo.codUsuario,
                                'token': "" + dataInfo.token
                                //'idInstancia': "" + dataInfo.idInstancia
                            }
                        }
                    })
                },
            },

        };
        var citaService = {
            listar: CitaResource.cita.listar,
            listarUsuario: CitaResource.usuario.listar
        };
        return citaService;
    });
