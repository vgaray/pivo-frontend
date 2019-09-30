angular.module("principal")
    .controller('principalController', ['sicSidebarService', '$location', 'gestionInstanciaService', '$state', 'localStorageService', '$window', '$translate',
        function(sicSidebarService, $location, gestionInstanciaService, $state, localStorageService, $window, $translate) {

            var scope = this;
            /*Nombre del usuario Logeado*/
            scope.codUsuario = localStorageService.get('codUsuario');
            scope.nombreUsuario = localStorageService.get('nombreUsuario');

            // scope.class = "";
            // scope.changeClass = function() {
            //     if (scope.class === "")
            //         scope.class = "menu-collapsed";
            //     else
            //         scope.class = "";
            // };


            /*variables para el request header*/
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
                
            };
            /*variables request instancia*/
            scope.instanciaRequest = {
                idInstancia: scope.dataInfo.idInstancia,
                noOrgani: null,
                noInstancia:null
            };
            /**
             * [listInstanciaXId description]
             * @type {Array}
             */
            scope.listInstanciaXId = [];
            scope.listaInstanciaXId = function() {
                if (scope.instanciaRequest.idInstancia != undefined) {
                    gestionInstanciaService.listaPoridInstancia(scope.dataInfo).post({}, scope.instanciaRequest, function(result) {
                        if (result.estado == 1) {
                            scope.listInstanciaXId = result.listarInstanciaxId;
                            for (var i = 0; i < scope.listInstanciaXId.length; i++) {
                                scope.instanciaRequest.noRazonSocial = scope.listInstanciaXId[i].noRazonSocial;
                                scope.instanciaRequest.noInstancia = scope.listInstanciaXId[i].noInstancia;
                            }
                        } else if (result.estado == -1) {
                            toastr.error(result.mensaje + " " + result.codError, 'Instancia', viewConfig.toastConfig);
                        }
                    }, function(error) {
                        console.log('error ' + error);
                    })
                }  
            };

            scope.listaInstanciaXId();

            /**
             * [cerrarSession description]
             * @return {[type]} [description]
             */
            scope.cerrarSession = function() {
                localStorageService.remove('codUsuario');
                localStorageService.remove('nombreUsuario');
                localStorageService.remove('token');                
                $state.go('login');

            }
            scope.isMenuCollapsed = function() {
                return sicSidebarService.isMenuCollapsed();
            }
            scope.loadPage = function() {
                if (localStorageService.get('codUsuario') == undefined) {
                    localStorageService.remove('codUsuario');
                    localStorageService.remove('token');
                    $state.go('login');
                }

                // if (screen.width < 1200) {
                //     scope.class = "menu-collapsed";
                // } else {

                //     scope.class = "";
                // }
            };
            scope.loadPage();
        }
    ]);
