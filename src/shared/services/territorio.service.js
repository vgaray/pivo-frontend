angular.module('pivo').
factory('territorioService', function($resource, ngResourceConfig){
    var urlListaTerritorio = ngResourceConfig.baseURL + "territorio/listar";
    var TerritorioResource = {
        listar : {
            territorio : function(dataInfo){
                return $resource(urlListaTerritorio, {},{
                    post: {
                        method: 'POST',
                        headers: {
                            'Content-Type' : 'application/json',
                            'Accept'       : 'application/json',
                            'codUsuario'   : "" + dataInfo.codUsuario,
                            'token'        : "" + dataInfo.token,
                        }
                    }
                })
            }
        },
    };
    var listaTerritorioService = {
        listaTerritorio : TerritorioResource.listar.territorio,
    };
    return listaTerritorioService;
});
