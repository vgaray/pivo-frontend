angular.module('citas')
    .controller('citasCtrl', ['$state', '$location', 'gestionInstanciaService', '$log', '$timeout', 'viewConfig', 'localStorageService', '$uibModal',
        function($state, $location, gestionInstanciaService, $log, $timeout, viewConfig, localStorageService, $uibModal) {
            var scope = this;

            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token")
            }

            scope.dataModal = {};

            scope.tranferencia = {
                variables: {
                    ver: 0,
                    detalle: 0,
                    instalado: 0,
                    configurado: 0,
                    daOkConformidad: 0
                }
            }

            scope.frmData = {
                name_page_title: "Veterinarias Asociadas",

                lista: {
                    request: {
                        pIdTipdoc: null,
                        pNuDocide: null,
                        pIdCliente: 4,
                        pIdPedido: 3,
                        pIdEstadoinstancia: 1,
                        pIdPlan: 1,
                        pIdTipoEstadoPedido: 1
                    }
                }
            }

            scope.inicializarVariables = function() {
                scope.tranferencia.variables.ver = 0,
                    scope.tranferencia.variables.detalle = 0,
                    scope.tranferencia.variables.instalado = 0,
                    scope.tranferencia.variables.configurado = 0,
                    scope.tranferencia.variables.daOkConformidad = 0
            }

            scope.formatDate = function(input) {
                var datePart = input.match(/\d+/g),
                    year = datePart[0], // get only two digits .substring(2) para recortar la cadena
                    month = datePart[1],
                    day = datePart[2];
                return day + '-' + month + '-' + year;
            }

            scope.listaInstancias = [];
            scope.listaDeEstados = [];

            scope.buscarInstancia = function() {
                gestionInstanciaService.listarInstanciaAdmin(scope.dataInfo).post({}, scope.frmData.lista.request, function(result) {
                        if (result.estado == 1) {
                            scope.listaInstancias = result.instancias;
                        } else if (result == 0 || result == -1) {
                            console.error('Error: ' + result.mensaje);
                        }
                    },
                    function(error) {
                        console.error('error: ' + error);
                    }
                );
            }

            scope.mostrarBoton = function(input, valorBusca) {
                var str = input;
                var y = str.split(",");
                for (var i = 0; i < y.length; i++) {
                    if (y[i] == valorBusca) {
                        return 1;
                    }
                }
                return -1;
            }


            scope.listarInstancia = function() {
                gestionInstanciaService.listarInstanciaAdmin(scope.dataInfo).post({}, {}, function(result) {
                        if (result.estado == 1) {
                            scope.listaInstancias = result.instancias;
                            var tamano = scope.listaInstancias.length;
                            for (i = 0; i < tamano; i++) {
                                scope.listaInstancias[i].fePedido = scope.formatDate(scope.listaInstancias[i].fePedido);
                                //scope.mostrarBoton(scope.listaInstancias[i].idEstadoInstancia);

                                scope.listaDeEstados.push(scope.tranferencia);
                                scope.inicializarVariables();
                            }
                        } else if (result == 0 || result == -1) {
                            console.error('Error: ' + result.mensaje);
                        }
                    },
                    function(error) {
                        console.error('error: ' + error);
                    }
                );
            }

            scope.onConfigInstance = function(instanciaSelect) {

                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/administrarInstancias/configurarInstancia/configurarInstancia.template.html',
                    controller: 'configurarInstanciaController as ctrl',
                    backdrop: 'static',
                    keyboard: false,
                    size: 'lg',
                    resolve: {
                        dataModal: function() {
                            scope.dataModal.idInstancia = instanciaSelect.idInstanciaEncryp;

                            return scope.dataModal;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    scope.listarInstancia();
                },function(){
                    scope.listarInstancia();
                });
            }

            scope.openWindowInstancia = function(idInstanciaSelect) {
                console.log(idInstanciaSelect);
                //var direccion = "#!/anexosSip" +"?"+ "idInstancia="+idInstanciaSelect ;
                var direccion = $state.href('principal.inicio', {
                    idInstancia: idInstanciaSelect
                });
                console.log(direccion);
                window.open(direccion, '_blank');
            }

            //modal para actualizar instancia
            scope.modalAdmInstanciaCrud = function(idInst) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/administrarInstancias/administrarInstanciasCrud/administrarInstaciasCrud.template.html',
                    controller: 'administrarInstanciasCrudController as ctrl',
                    backdrop: 'static',
                    keyboard: false,
                    size: 'lg',
                    resolve: {
                        objectInstacia: function() {
                            return idInst;
                        }
                    }
                });

                modalInstance.result.then(function() {
                    scope.listarInstancia();
                });
            };
            scope.modalCrearInstancia = function() {
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/administrarInstancias/registrarInstancia/registrarInstancia.template.html',
                    controller: 'registrarInstanciaController as ctrl',
                    backdrop: 'static',
                    keyboard: false,
                    size: 'lg',
                    resolve: {
                        objectInstacia: function() {
                            return 1;
                        }
                    }
                });
                modalInstance.result.then(function() {
                    scope.listarInstancia();
                });
            };
            scope.onLoadPage = function() {
                scope.listarInstancia();
            }

            scope.onLoadPage();
        }
    ]);
