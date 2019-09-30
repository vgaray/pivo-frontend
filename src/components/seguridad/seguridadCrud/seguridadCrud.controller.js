(function () {
    'use strict';
    angular.module("seguridad").
        controller('seguridadCrudController',
        ['seguridadService', '$state', '$location', 'localStorageService', 'viewConfig',
            function (seguridadService, $state, $location, localStorageService, viewConfig) 
            {
                debugger;
                var scope = this;

                scope.varnab = $location.search();

                scope.dataInfo = {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
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
                    idTipoRol: 2,
                    idInstancia: 0,
                    idsPaginas: "",
                    listPaginaRol: [{
                        idRol: 0,
                        idPagina: 0,
                    }]
                }

                scope.rolEditarRequest = {
                    idRol: $location.idRol,
                    ilActivo: true,
                    noDescri: $location.noDescri,
                    noRol: $location.noRol,
                    idTipoRol: 2,
                    idInstancia: 0,
                    idsPaginas: "",
                    listPaginaRol: []
                }

                scope.listPaginaRol = {
                    lst: [scope.rolRequest.listPaginaRol[1]]
                };

                scope.actualizarRol = function () 
                {
                    var miArrayPagina = scope.paginaHijo.idPagina;
                
                    scope.rolEditarRequest.listPaginaRol = [];
                
                    for (var i = 0; i < miArrayPagina.length; i++) 
                    {
                        scope.rolEditarRequest.listPaginaRol.push({ idRol: 0, idPagina: miArrayPagina[i] });
                    }
                    
                    ;
                    debugger;
                    seguridadService.actualizarRol(scope.dataInfo).post({}, scope.rolEditarRequest, function (result) 
                    {
                        if (result.estado == 1) 
                        {
                            toastr.success("Rol actualizado correctamente", "Mensaje del sistema", viewConfig.toastConfig);
                            $state.go("principal.seguridad", { "idInstancia": scope.dataInfo.idInstancia });
                        } 
                        else if (result.estado == -1) 
                        {
                            toastr.error("Error", "Mensaje del sistema", viewConfig.toastConfig);
                            $state.go("principal.seguridad", { "idInstancia": scope.dataInfo.idInstancia });
                        }
                    }, 
                    function (error) 
                    {
                        console.log(error);
                    })
                };

                scope.onCancel = function () 
                {
                    $state.go("principal.seguridad", { "idInstancia": scope.dataInfo.idInstancia });
                }

                scope.crearRol = function () 
                {
                    var miArrayPagina = scope.paginaHijo.idPagina;

                    scope.rolRequest.listPaginaRol = [];
                
                    for (var i = 0; i < miArrayPagina.length; i++) 
                    {
                        scope.rolRequest.listPaginaRol.push({ idRol: 0, idPagina: miArrayPagina[i] });
                    }
                    // scope.rolRequest.listPaginaRol.idPagina=scope.paginaHijo.idPagina;

                    seguridadService.crearRol(scope.dataInfo).post({}, scope.rolRequest, function (result) 
                    {
                        if (result.estado == 1) 
                        {
                            toastr.success("Rol creado correctamente", "Mensaje del sistema", viewConfig.toastConfig);
                            $state.go("principal.seguridad", { "idInstancia": scope.dataInfo.idInstancia });
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
                
                /**
                 * listado de paginas por rol o listad de todas las paginas
                 */
                scope.lstPaginas = [];

                scope.listarPagina = function () 
                {
                    seguridadService.listarPagina(scope.dataInfo).post({}, scope.requestCarga, function (result) 
                    {
                        if (result.estado == 1) 
                        {
                            /*validar si el id del rol es diferente de o o null*/
                            if (scope.requestCarga.idRol != null) 
                            {
                                scope.lstPaginas = result.listaPagina;
                            
                                for (var i = 0; i < scope.lstPaginas.length; i++) 
                                {
                                    for (var j = 0; j < scope.lstPaginas[i].listHijos.length; j++) 
                                    {
                                        if (scope.lstPaginas[i].listHijos[j].seleccionado == true) 
                                        {
                                            scope.paginaHijo.idPagina.push(scope.lstPaginas[i].listHijos[j].idPagina);
                                        }
                                    }                            
                                }
                            } 
                            else if (scope.requestCarga.idRol == null) 
                            {
                                scope.lstPaginas = result.listaPagina;
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
