angular.module('pivo')
    .factory('archivoUtilService', function($resource, ngResourceConfig) {
        var urlSubirArchivoSip = ngResourceConfig.baseURL + "cargaExcelSipBuddie/cargar";
        var urlDescargarListaSip = ngResourceConfig.baseURL + "cargaExcelSipBuddie/descarga";
        var urlDescargarPermisos = ngResourceConfig.baseURL + "excelPermisosUsuario/descarga";
        var urlCargarPermisos = ngResourceConfig.baseURL + "excelPermisosUsuario/carga";

        var archivoUtilResource = {
            envioArchivoSip: {
                envioExcelBase64: function(dataInfo) {
                    return $resource(urlSubirArchivoSip, {}, {
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
                    }
                  );
                }
            },
            recibirArchivoSip: {
                recibirExcelBase64: function(dataInfo) {
                    return $resource(urlDescargarListaSip, {}, {
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
            descargaPermisosUsuario: {
                recibirExcelBase64: function(dataInfo) {
                    return $resource(urlDescargarPermisos, {}, {
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
            lastcargaPermisosUsuario: {
                recibirExcelBase64: function(dataInfo) {
                    return $resource(urlCargarPermisos, {}, {
                        post: {
                            method: 'POST',
                            isArray: false,
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

        var archivoUtilService = {
            cargaArchivoExcel: archivoUtilResource.envioArchivoSip.envioExcelBase64,
            descargaArchivoSipExcel: archivoUtilResource.recibirArchivoSip.recibirExcelBase64,
            descargarPermisosUsuario: archivoUtilResource.descargaPermisosUsuario.recibirExcelBase64,
            lastcargarPermisosUsuario: archivoUtilResource.lastcargaPermisosUsuario.recibirExcelBase64
        };
        return archivoUtilService;
    });
