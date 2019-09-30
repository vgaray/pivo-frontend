(function() {
  'use strict';
  angular.module('seguridad').controller('seguridadController', 
    ['seguridadService', '$state', '$location', 'localStorageService', 'viewConfig', '$uibModal',
    function(seguridadService, $state, $location, localStorageService, viewConfig, $uibModal) 
    {
      var scope = this;
      scope.varnab = $location.search();
      scope.dataInfo = {
        codUsuario: localStorageService.get("codUsuario"),
        token: localStorageService.get("token"),
        idInstancia: scope.varnab.idInstancia
      }

      // cabecera de listado Rol
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
        },{
          nombre: "Eliminar"
        }
      ]
      /**
       * function para ir a la pagina de editar
       */

        $location.idRol = null;
        $location.ilActivo = true;
        $location.noDescri = null;
        $location.noRol = null;

      scope.irAEdidar=function( idRol, ilActivo, noDescri, noRol){
        debugger;
        $location.idRol = idRol;
        $location.ilActivo = ilActivo;
        $location.noDescri = noDescri;
        $location.noRol = noRol;
        $state.go("principal.seguridadCrud",{"idInstancia": scope.dataInfo.idInstancia});
      }

      //llamando a la lista
      scope.rolList = [];
      scope.listarRol = function() {
        debugger;
        seguridadService.listadoRol(scope.dataInfo).post({}, {}, function(result) {
          if(result.estado == 1) 
          {
            scope.rolList = result.roles;
          }
          else
          {
            toastr.error( result.mensaje, "Mensaje del sistema", viewConfig.toastConfig );  
          }
        },
        function(error)
        {
          toastr.error( "Error de servidor", "Mensaje del sistema", viewConfig.toastConfig );
        })
      }

      scope.onEliminarRol = function( rol )
      {
        ;
        var modalDeleteInstance = $uibModal.open({
          templateUrl: 'src/components/seguridad/seguridadDelete/seguridad.delete.template.html',
          controller: 'seguridadDeleteController as ctrl',
          size: 'md',
          keyboard: false,
          resolve:{
            dataModal : function()
            {              
                return rol;
            }
          }
        });

        modalDeleteInstance.result.then( function( result )
        {            
            if( result.eliminado == 1 )
            {
              var data = result.data;
              if( data.estado == 1 )
              {
                 var confirmacion = data.confirmacionList[ 0 ];
                 toastr.success(confirmacion.mensaje, "Mensaje del sistema", viewConfig.toastConfig);
                 scope.listarRol();
              }
              else if( data.estado == 0 )
              {
                var modalConfirmacionInstance = $uibModal.open({
                  templateUrl: 'src/components/seguridad/seguridadConfirmacion/seguridad.confirmacion.template.html',
                  controller: 'seguridadConfirmacionController as ctrl',
                  size: 'md',
                  keyboard: false,
                  resolve:{
                    dataModal : data
                  }
                });
  
                modalConfirmacionInstance.then( function()
                {
                  console.log( "Entendido" );
                } );
              }
              else if( data.estado == -1 )
              {
                toastr.remove();
                toastr.error( data.mensaje, "Error de servidor", viewConfig.toastConfig);
              }
            }
            else if( result.eliminado == -1 )
            {
              toastr.error( data.mensaje, "Error de servidor", viewConfig.toastConfig);
            }
        },
        function()
        {
            console.log( "Modal eliminar minimizado" );
        } );        
      }

      scope.onLoadPage = function()
      {
        scope.listarRol();
      }

      scope.onLoadPage();
    }
  ])
})();
