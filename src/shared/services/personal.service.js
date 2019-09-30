angular.module('pivo').
factory('personalService', function($resource, ngResourceConfig){
    var urlListarPersonal = ngResourceConfig.baseURL + "personal/listar";
    var urlListarPersonalReporte = ngResourceConfig.baseURL + "pivoReporte/listar";
    var urlEliminarPersonal = ngResourceConfig.baseURL + "personal/eliminar";
    var urlRegistrarPersonal = ngResourceConfig.baseURL + "personal/registrar";
    var urlActualizarPersonal = ngResourceConfig.baseURL + "personal/actualizar";
    var PersonalResource = {
        personal : {
            listar : function(dataInfo){
                return $resource(urlListarPersonal, {},{
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept'       : 'application/json',
                            'codUsuario'   : "" + dataInfo.codUsuario,
                            'token'        : "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
            listarReporte : function(dataInfo){
                return $resource(urlListarPersonalReporte, {},{
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept'       : 'application/json',
                            'codUsuario'   : "" + dataInfo.codUsuario,
                            'token'        : "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
            eliminar : function(dataInfo){
                return $resource(urlEliminarPersonal, {},{
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept'       : 'application/json',
                            'codUsuario'   : "" + dataInfo.codUsuario,
                            'token'        : "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
            registrar : function(dataInfo){
                return $resource(urlRegistrarPersonal, {},{
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept'       : 'application/json',
                            'codUsuario'   : "" + dataInfo.codUsuario,
                            'token'        : "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
            actualizar : function(dataInfo){
                return $resource(urlActualizarPersonal, {},{
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept'       : 'application/json',
                            'codUsuario'   : "" + dataInfo.codUsuario,
                            'token'        : "" + dataInfo.token,
                            'idInstancia': "" + dataInfo.idInstancia
                        }
                    }
                })
            },
        },
    };
    var personalService = {
        listar : PersonalResource.personal.listar,
        listarReporte : PersonalResource.personal.listarReporte,
        eliminar : PersonalResource.personal.eliminar,
        registrar : PersonalResource.personal.registrar,
        actualizar : PersonalResource.personal.actualizar,
    };
    return personalService;
});
