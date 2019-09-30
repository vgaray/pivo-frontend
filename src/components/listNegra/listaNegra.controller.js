(
    function() {
        'use strict';
        angular.module('listaNegra')
            .controller('listaNegraController', ['listaNegraService', 'localStorageService', '$uibModal', '$location','viewConfig',
                function(listaNegraService, localStorageService, $uibModal, $location,viewConfig) {
                    var scope = this;
                    /*variables para el request header*/
                    scope.varnab = $location.search();
                    scope.dataInfo = {
                        codUsuario: localStorageService.get("codUsuario"),
                        token: localStorageService.get("token"),
                        idInstancia: scope.varnab.idInstancia
                    };
                    /*Header para el listado de lista negra*/
                    scope.headersListaNegra = [{ nombreTH: 'Tipo' }, { nombreTH: 'Número' }, { nombreTH: 'Descripción' }, { nombreTH: 'Estado' }, { nombreTH: 'Editar' }, { nombreTH: 'Eliminar' }];
                    /*Variables para editar*/
                    scope.listaNegra = { nuTelefo: null, noDescri: null, coTipllam: null, ilActivo: true }
                        /*Function listar de numeros de lista negra*/

                        /*Tipo de Llamadas*/
                    scope.tipoLlamadas = [
                        { id: 1, nombre: 'Todas' },
                        { id: 2, nombre: 'Entrantes' },
                        { id: 3, nombre: 'Salientes' }
                    ];

                        /*Estados*/
                    scope.tipoEstados = [
                        { id: "", nombre: 'Todas' },
                        { id: true, nombre: 'Activo' },
                        { id: false, nombre: 'Inactivo' }
                    ];

                    scope.listListaNegra = [];
                    scope.listaListaNegra = function() {
                        listaNegraService.listaListaNegra(scope.dataInfo).post({}, {}, function(result) {
                            if (result.estado == 1) {
                                scope.listListaNegra = result.listasNegras;
                                scope.totalItems = scope.listListaNegra.length;
                            }
                        }, function(error) {
                            console.log('Error ' + error);
                        });
                    };

                    /**
                     * [editaListaNegra agregar numero a la lista negra]
                     * @return {[type]} [description]
                     */
                    scope.cambiaEstadoListaNegra = function(nuTelefo, ilActivo) {
                        scope.listaNegra.nuTelefo = nuTelefo;
                        if (ilActivo == true) {
                            scope.listaNegra.ilActivo = false;
                        } else if (ilActivo == false) {
                        	 scope.listaNegra.ilActivo = true;
                        }

                        listaNegraService.cambiaEstadoListaNegra(scope.dataInfo).post({}, scope.listaNegra, function(result) {
                            if (result.estado == 1 && result.resultado ==1) {
                            	scope.listaListaNegra();
                            } else if (result.estado == 0) {
                                toastr.warning(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                            } else if (result.estado == -1) {
                                toastr.error(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                            }
                        }, function(error) {
                            console.log('error ' + error);
                        })

                    };

                    /*Elementos del request para realizar la busqueda*/
                    scope.frmData = {
                        request :{
                            nuTelefo : null,
                            ilActivo : null,
                            coTipllam: null
                        },
                        active :{
                            optGeneral : true,
                            optNumero  : false,
                            optTipo    : false,
                            optEstado  : false,
                        } 
                    }

                    /*Funcion para validar si hay cambios en los combos y habilitar el botón buscar*/
                    scope.validateNumero = function () {
                        (scope.frmData.request.nuTelefo != null) ? scope.frmData.active.optNumero = true : scope.frmData.active.optNumero = false;
                        scope.validateGeneral();
                    }

                    scope.validateTipo = function () {
                        (scope.frmData.request.coTipllam != null) ? scope.frmData.active.coTipllam = true : scope.frmData.active.coTipllam = false;
                        scope.validateGeneral();
                    }

                    scope.validateEstado = function () {
                        (scope.frmData.request.ilActivo != null) ? scope.frmData.active.ilActivo = true : scope.frmData.active.ilActivo = false;
                        scope.validateGeneral();
                    }

                    scope.validateGeneral = function() {
                        if(scope.frmData.active.optNumero == true || scope.frmData.active.coTipllam == true || scope.frmData.active.ilActivo == true) {
                            scope.frmData.active.optGeneral = false;
                        } else {
                            scope.frmData.active.optGeneral = true;
                            scope.listaListaNegra();
                        }
                    }

                    /**
                     * Funcion para buscar algun elemento en la lista 
                     */
                    scope.BuscarEnListaNegra = function () {
                        listaNegraService.buscarListaNegra(scope.dataInfo).post({}, scope.frmData.request, function(result) {
                            if (result.estado == 1) {
                                scope.listListaNegra = result.lsListaNegra;
                                scope.totalItems = scope.lsListaNegra.length
                            } else if (result.estado == 0) {
                                toastr.warning(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                            } else if (result.estado == -1) {
                                toastr.error(result.mensaje, 'Lista Negra', viewConfig.toastConfig);
                            }
                        })
                    };
                    
                    /**
                     * Función para realizar la busqueda presionando Enter
                     */
                    scope.buscarListaNegra = function (valor) {
                        if(valor == 13 ){
                            scope.BuscarEnListaNegra();
                        }
                    }

                    /**
                     * funcion para paginar
                     */
                    /*variables para paginar*/
                    scope.currentPage = 1;
                    scope.numPerPage = 10;
                    scope.paginate = function(value) {
                        var begin, end, index;
                        begin = (scope.currentPage - 1) * scope.numPerPage;
                        end = begin + scope.numPerPage;
                        index = scope.listListaNegra.indexOf(value);
                        return (begin <= index && index < end);

                    };
                    /*modal CRUD Lista Negra*/
                    scope.modalListaNegraCrud = function(pk_numero) {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'src/components/listNegra/listaNegraCrud/listaNegraCrud.template.html',
                            controller: 'listaNegraCrudController as ctrl',
                            keyboard: false,
                            backdrop: 'static',
                            size: 'md',
                            resolve: {
                                pk_numero: function() {
                                    return pk_numero;
                                }
                            }
                        });

                        modalInstance.result.then(function() {
                            scope.listaListaNegra();
                        }, function() {
                            scope.listaListaNegra();
                        });
                    };
                    /*Eliminar numero de lista negra*/
                    scope.modalEliminarNumero = function(pk_numero) {

                        var modalInstanceDelete = $uibModal.open({
                            templateUrl: 'src/components/listNegra/listaNegraDelete/listaNegraDelete.template.html',
                            controller: 'listaNegraDeleteController as ctrl',
                            keyboard: false,
                            backdrop: 'static',
                            size: 'sm',
                            resolve: {
                                pk_numero: function() {
                                    return pk_numero;
                                }
                            }
                        });
                        modalInstanceDelete.result.then(function() {
                            scope.listaListaNegra();
                        }, function() {
                            scope.listaListaNegra();
                        })
                    };
                    scope.loadListaNegra = function() {
                        scope.listaListaNegra();
                    }
                    scope.loadListaNegra();
                }
            ]);
    })();
