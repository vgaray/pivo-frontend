(function () {
    'use strict';
    angular.module("seguridad").
        controller('seguridadGestCrudController',
        ['seguridadService', '$state', '$location', 'localStorageService', 'viewConfig',
            function (seguridadService, $state, $location, localStorageService, viewConfig) 
            {
                var scope = this;

                scope.varnab = $location.search();

                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: null
                }

                // pagina hijo
                scope.paginaHijo = {
                    idPagina: []
                };
                
                // variables de insercion (RolRequest)
                scope.rolRequest = {
                    noRol: "",
                    noDescri: null,
                    ilActivo: true,
                    idTipoRol: 1,
                    idInstancia: null,
                    idsPaginas: "",
                    listPaginaRol: [{
                        idRol: 0,
                        idPagina: 0,
                    }]
                }

                scope.rolEditarRequest = {
                    idRol: $location.idRol,
                    ilActivo: $location.ilActivo,
                    noDescri: $location.noDescri,
                    noRol: $location.noRol,
                    idTipoRol: 1,
                    idInstancia: null,
                    idsPaginas: "",
                    listPaginaRol: []
                }

                scope.listPaginaRol = 
                {
                    lst: [scope.rolRequest.listPaginaRol[1]]
                };

                scope.cerrarRol = function () 
                {
                    $state.go("principal.seguridadGestPedido", {});
                }

                scope.actualizarRol = function () 
                {
                    var miArrayPagina = scope.paginaHijo.idPagina;
                    scope.rolEditarRequest.listPaginaRol = [];
                
                    for (var i = 0; i < miArrayPagina.length; i++) 
                    {
                        scope.rolEditarRequest.listPaginaRol.push({ idRol: 0, idPagina: miArrayPagina[i] });
                    }

                    seguridadService.actualizarRol(scope.dataInfo).post({}, scope.rolEditarRequest, function (result) 
                    {
                        if (result.estado == 1) 
                        {
                            toastr.success(result.mensaje, "Mensaje del sistema", viewConfig.toastConfig);
                            $state.go("principal.seguridadGestPedido", {});
                        } 
                        else if (result.estado == -1) 
                        {
                            toastr.error(result.mensaje, "Mensaje del sistema", viewConfig.toastConfig);
                            $state.go("principal.seguridadGestPedido", {});
                        }
                    }, 
                    function (error) 
                    {
                        console.log(error);
                    })
                };

                scope.crearRol = function () 
                {
                    var miArrayPagina = scope.paginaHijo.idPagina;
                    scope.rolRequest.listPaginaRol = [];

                    for (var i = 0; i < miArrayPagina.length; i++) 
                    {
                        scope.rolRequest.listPaginaRol.push({ idRol: 0, idPagina: miArrayPagina[i] });
                    }
                
                    seguridadService.crearRol(scope.dataInfo).post({}, scope.rolRequest, function (result) 
                    {
                        if (result.estado == 1) 
                        {
                            toastr.success("Creado Ok", "Mensaje del sistema", viewConfig.toastConfig);
                        } 
                        else if (result.estado == -1) 
                        {
                            toastr.error("Error", "Mensaje del sistema", viewConfig.toastConfig);
                        }
                    }, 
                    function (error) 
                    {
                        console.log(error);
                    })
                };

                scope.cargalstPaginas = [];
                scope.requestCarga = { idRol: $location.idRol };
                scope.seccionList = [];

                scope.listarPagina = function () 
                {
                    seguridadService.listaGPedido(scope.dataInfo).post({}, scope.requestCarga, function (result) 
                    {
                        if (result.estado == 1) 
                        {
                            if (scope.requestCarga.idRol != null) 
                            {
                                scope.seccionList = result.listaPagina;
                                
                                // for (var i = 0; i < scope.seccionList.length; i++) 
                                // {
                                //     var numPaginas = scope.seccionList[i].listHijos.length;
                                //     var paginaHijaList = scope.seccionList[i].listHijos;
                                //     for (var j = 0; j < numPaginas; j++) 
                                //     {
                                //         var pagina = paginaHijaList[j];
                                //         if (pagina.seleccionado == true) 
                                //         {
                                //             scope.paginaHijo.idPagina.push(pagina.idPagina);
                                //         }
                                //     }                            
                                // }

                                scope.seccionList.forEach(function(seccion)
                                {
                                    seccion.listHijos.forEach(function(pagina)
                                    {
                                        if (pagina.seleccionado == true) 
                                        {
                                            scope.paginaHijo.idPagina.push(pagina.idPagina);
                                        }
                                    });
                                });

                                console.log(scope.paginaHijo.idPagina);
                            }
                            else if (scope.requestCarga.idRol == null) 
                            {
                                scope.seccionList = result.listaPagina;
                            }
                        }
                        else if (result.estado == -1) 
                        {
                            toastr.error("Error", "Mensaje del sistema", viewConfig.toastConfig);
                        }
                    },
                    function (error) 
                    {
                        console.log(error);
                    })
                }

                scope.listarPagina();
            }
        ])
})();
