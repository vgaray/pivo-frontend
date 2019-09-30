angular.module('pivo').
    factory('grabacionesAgenteService', function ($resource, ngResourceConfig) {
        var urlListarAgente = ngResourceConfig.baseURL + "agente/listar";
        var urlListarGrabaciones = ngResourceConfig.baseURL + "grabacion/listar";
        var urlListarExtensiones=ngResourceConfig.baseURL+"extension/listarExtension"
        //Servicio Media
        var urlServidorMedia = ngResourceConfig.mediaServerAudioURL + "/audioFileM";

        var grabacionAgenteSource = {
            agente: {
                listar: function (dataInfo) {
                    return $resource(urlListarAgente, {}, {
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
             extension: {
                listar: function (dataInfo) {
                    return $resource(urlListarExtensiones, {}, {
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
            grabaciones: {
                listar: function (dataInfo) {
                    return $resource(urlListarGrabaciones, {}, {
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
            audioFile: {
                listar: function(dataInfo){
                    return $resource(urlServidorMedia, {},{
                        get:{
                            method: 'GET'
                        }
                    })
                },
                play: function()
                {
                    return $resource( urlServidorMediaPlaySound, {} )
                }
            }

        }
        var grabacionesAgente = {
            listarAgente: grabacionAgenteSource.agente.listar,
            listarextensiones: grabacionAgenteSource.extension.listar,
            listargrabaciones: grabacionAgenteSource.grabaciones.listar,
            listaAudioFile : grabacionAgenteSource.audioFile.listar
        }

        return grabacionesAgente;
    })

    