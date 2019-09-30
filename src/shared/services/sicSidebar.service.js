(function() {
    'use strict';
    angular.module('pivo').
    factory('sicSidebarServices', function($resource, ngResourceConfig) {

        var urlMenuSic = ngResourceConfig.baseURL + "menuSic/listar";

        var listaPaginaUrl = ngResourceConfig.baseURL + "pagina/listaUrlPagina";

        var menuSicResource = {
            menuSic: {
                listarMenu: function(dataInfo) {
                    return $resource(urlMenuSic, {}, {
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
            paginaUrl: {
                listaPaginaUrl: function(dataInfo) {
                    return $resource(listaPaginaUrl, {}, {
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
        var sicSidebarServices = {
            listaMenuSic: menuSicResource.menuSic.listarMenu,
            listaPaginaUrl: menuSicResource.paginaUrl.listaPaginaUrl
        };

        return sicSidebarServices;
    });
})();
