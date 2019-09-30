(function() {
  'use strict';
  angular.module("seguridad").
  controller('seguridadGestPedidoController', ['seguridadService', '$state', '$location', 'localStorageService', 'viewConfig',
    function(seguridadService, $state, $location, localStorageService, viewConfig) {

      var scope = this;
      scope.varnab = $location.search();

      scope.dataInfo = {
        codUsuario: localStorageService.get("codUsuario"),
        token: localStorageService.get("token")
      }

      scope.headerRol = [{
          nombre: "N°"
        },
        {
          nombre: "Rol"
        },
        {
          nombre: "Descripción"
        },
        {
          nombre: "Editar"
        },
        {
          nombre: "Eliminar"
        }
      ]

      $location.idRol = null;
      $location.ilActivo = true;
      $location.noDescri = null;
      $location.noRol = null;

      scope.irAEdidar=function( idRol, ilActivo, noDescri, noRol){
        $location.idRol = idRol;
        $location.ilActivo = ilActivo;
        $location.noDescri = noDescri;
        $location.noRol = noRol;
        $state.go("principal.seguridadGestCrud",{ });
      }

       scope.listadoRol= [];

       scope.listaRolesSinPagina = function () {
          seguridadService.listaRolesSinPagina(scope.dataInfo).post({},{}, function (result) {
            if(result.estado ==1){
               scope.listadoRol = result.roles;
            }
          })
       }
       scope.listaRolesSinPagina();
    }
  ])
})();
