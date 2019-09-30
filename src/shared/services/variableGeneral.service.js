angular.module('pivo').
factory('variableGeneralService', function ($resource, ngResourceConfig) {
    var urlListarVariable = ngResourceConfig.baseURL + "variable/listar";

    var variableGeneralSource = {
        variable: {
            listar: function (dataInfo) {
                return $resource(urlListarVariable, {}, {
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
    }
    var variableGeneral = {
        listaVariable : variableGeneralSource.variable.listar
    }
    return variableGeneral;
})

