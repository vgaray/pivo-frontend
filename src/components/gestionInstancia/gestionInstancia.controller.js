angular.module('gestionInstancia').
controller('gestionInstanciaCtrl', ['$location','gestionInstanciaService','localStorageService', function($location ,gestionInstanciaService,localStorageService) {

  var scope = this;
  scope.varnab = $location.search();
  scope.dataInfo= {
    codUsuario: localStorageService.get("codUsuario"),
    token: localStorageService.get("token"),
    idInstancia : scope.varnab.idInstancia
  }


    scope.headers = [{
            description: "ClienteId",
            fieldSort: "idCliente"
        },
        {
            description: "InstanciaId",
            fieldSort: "idInstancia"
        },
        {
            description: "IpRed",
            fieldSort: "ipRed"
        },
        {
            description: "VLan",
            fieldSort: "nroVLan"
        },
        {
            description: "IpMedian",
            fieldSort: "ipMedian"
        },
        {
            description: "mascara",
            fieldSort: "mascara"
        },
        {
            description: "IpRouter",
            fieldSort: "ipRouter"
        },
        {
            description: "Dns1",
            fieldSort: "dns1"
        },
        {
            description: "Dns2",
            fieldSort: "dns2"
        },
        {
            description: "Broadcast",
            fieldSort: "broadcast"
        },
        {
            description: "IpAsterisk",
            fieldSort: "ipAsterisk"
        },
        {
            description: "PuertoAsteriskBashCertificadoExt",
            fieldSort: "puertoAsteriskBashCertificadoExt"
        },
        {
            description: "IpAsteriskBash",
            fieldSort: "ipAsteriskBash"
        },

    ];

    scope.instancias = [];
    scope.instanciasPorCliente = [];

    scope.model = {
        listarInstanciaPorIdRequest: {
            idInstancia: 29
        },
        listarInstanciaPorIdClienteRequest: {
            idCliente: 4
        }
    }

    gestionInstanciaService.listaPoridInstancia(scope.dataInfo).post({}, scope.model.listarInstanciaPorIdRequest, function(result) {
        scope.instancias = result.InstanciaServerAsterisk;
    }, function(error) {
        console.log('Error:' + error);
    });

    gestionInstanciaService.listarPorIdCliente(scope.dataInfo).post({}, scope.model.listarInstanciaPorIdClienteRequest, function(result) {
        scope.instanciasPorCliente = result.InstanciaServerAsterisk;
    }, function(error) {
        console.log('Error:' + error);
    });
}])
