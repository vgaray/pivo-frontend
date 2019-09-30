angular.module('pivo').factory('musicOnHoldService', [  '$resource',  'ngResourceConfig',
  function($resource, ngResourceConfig)
  {
    var codUsuario = 'daddadad';
    var token = 'asdad';
    var urlListarMusicOnHold   = ngResourceConfig.baseURL + "musicaOnHold/listaMusicaOnHold";
    var urlInsertarMusicOnHold = ngResourceConfig.baseURL + "musicaOnHold/insertarMusicaOnHold";
    var urlEditarMusicOnHold   = ngResourceConfig.baseURL + "musicaOnHold/actualizarMusicaOnHold";
    var urlEliminarMusicOnHold = ngResourceConfig.baseURL + "musicaOnHold/eliminarMusicaOnHold";
    var urlListarAudioMoh       = ngResourceConfig.baseURL + "audioMoh/listaAudioMoh";
    var urlInsertarAudioMoh     = ngResourceConfig.baseURL + "audioMoh/insertarAudioMoh";
    var urlEditarAudioMoh       = ngResourceConfig.baseURL + "audioMoh/actualizarAudioMoh";
    var urlEliminarAudioMoh     = ngResourceConfig.baseURL + "audioMoh/eliminarAudioMoh";
    var musicOnHoldResource={
      musicOnHold:{
        listar: function(dataInfo) {
            return $resource(urlListarMusicOnHold, {}, {
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
        insertar: function(dataInfo) {
            return $resource(urlInsertarMusicOnHold, {}, {
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
        editar: function(dataInfo) {
            return $resource(urlEditarMusicOnHold , {}, {
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
            return $resource(urlEliminarMusicOnHold, {}, {
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
      },
      audioMoh:{
        listar: function(dataInfo) {
            return $resource(urlListarAudioMoh, {}, {
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
        insertar: function(dataInfo) {
            return $resource(urlInsertarAudioMoh, {}, {
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
        editar: function(dataInfo) {
            return $resource(urlEditarAudioMoh , {}, {
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
            return $resource(urlEliminarAudioMoh, {}, {
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
    };
    var musicOnHoldService={

      listarMusicOnHold:musicOnHoldResource.musicOnHold.listar,
      ingresarMusicOnHold:musicOnHoldResource.musicOnHold.insertar,
      editarMusicOnHold:musicOnHoldResource.musicOnHold.editar,
      eliminarMusicOnHold:musicOnHoldResource.musicOnHold.eliminar,
      listarAudioMoh:musicOnHoldResource.audioMoh.listar,
      ingresarAudioMoh:musicOnHoldResource.audioMoh.insertar,
      editarAudioMoh:musicOnHoldResource.audioMoh.editar,
      eliminarAudioMoh:musicOnHoldResource.audioMoh.eliminar
    };

    return musicOnHoldService;
  }
]);
