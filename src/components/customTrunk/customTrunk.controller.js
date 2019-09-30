angular.module('customTrunk')
  .controller('customTrunkCtrl', [
    '$location', '$log', 'customTrunkService', 'localStorageService', 'utilService', '$uibModal', 'viewConfig',
    function($location, $log, customTrunkService, localStorageService, utilService, $uibModal, viewConfig) {
      var scope = this;

      scope.varnab = $location.search();
      //obtencion de datos del header de los servicios
      scope.dataInfo = {
        codUsuario: localStorageService.get("codUsuario"),
        token: localStorageService.get("token"),
        idInstancia: scope.varnab.idInstancia
      };
      //cabeceras de la tabla
      scope.headerCustomTrunk = [{
          nombre: "Nombre"
        },
        {
          nombre: "Tipo"
        },
        {
          nombre: "Detalle"
        },
        {
          nombre: "Editar"
        },
        {
          nombre: "Eliminar"
        }
      ];


      //variables de asignacion de los datos request

      scope.frmData = {
        add: utilService.operation.add,
        update: utilService.operation.update,

        nameModalInsertCustomTrunk: "Nuevo Custom Trunk",
        nameModalUpdateCustomTrunk: "Editar Custom Trunk",

        customTrunk: {
          list: {
            //definicion de los parametros request del listado
            listadoFull: {
              request: {
                idCustomTrunk: null,
                idTipoCustomTrunk: null
              }
            },
            buscarCustomTrunk: {
              request: {
                idCustomTrunk: null,
                idInstancia: ""
              }
            }
          }
        },
        modal: {
          save: {
            whatOperation: 0,
            checkGenerateKey: false,
            response: {
              customTrunk: { }
            }
          },
          delete:{
            title: "Mensaje del Sistema",
            content: "¿Está seguro que desea eliminar este customTrunk?",
            request:{
              pIdCustomTrunk:null,
	             nombre:"",
	              tipo:null,
	               detalle:""
            }
          }

        }
      };


      //variables de los arreglos a mostrar
      scope.lsCustomTrunk = [];
      //funcion que devuelve el arreglo del servicio request

      scope.listaCustomTrunk = function() {
        //llamada al recurso del servicio
        customTrunkService.listaCustomTrunk(scope.dataInfo).post({}, scope.frmData.customTrunk.list.listadoFull.request, function(result) {
            //result : el response del servicio llamado
            scope.lsCustomTrunk = result.customTrunkList;
            scope.totalItems = scope.lsCustomTrunk.length;
            if (scope.lsAreaCentroCosto.length == 0) {
              toastr.success('Vacío', 'Listado', viewConfig.toastConfig);
            }
          },
          function(error) {
            console.error(error);
          })
      };

      //Ingresar y actualizar
      //Modificar al metodo real
      scope.onFoundCustomTrunk = function(idCustomTrunk, openModalSaveCallback) {
        scope.frmData.customTrunk.list.buscarCustomTrunk.request.idCustomTrunk = idCustomTrunk;
        scope.frmData.customTrunk.list.buscarCustomTrunk.request.idInstancia = scope.dataInfo.idInstancia;

        customTrunkService.listaCustomTrunk(scope.dataInfo).post({}, scope.frmData.customTrunk.list.buscarCustomTrunk.request, function(response) {
            if (response.estado == 1) {
                if (response.customTrunkList.length !=0 && scope.frmData.modal.save.whatOperation != 0) {
                  //lista cuando se hace el ingreso y actualizacion de un customTrunk
                  if(scope.frmData.modal.save.whatOperation == scope.frmData.add){
                    scope.frmData.modal.save.response.customTrunk.idCustomTrunk=null;
                    scope.frmData.modal.save.response.customTrunk.noCustomTrunk="";
                    scope.frmData.modal.save.response.customTrunk.noDetalle="";
                    scope.frmData.modal.save.response.customTrunk.tiCustomTrunk=null;
                  }else if(scope.frmData.modal.save.whatOperation == scope.frmData.update){
                    scope.frmData.modal.save.response.customTrunk = response.customTrunkList[0];
                  }
                } else
              if (response.customTrunkList.length > 1 && scope.frmData.modal.save.whatOperation == 0) {
                //Lista de los elementos de la lista
              }
              openModalSaveCallback(scope.frmData.modal.save);
            } else {
              console.error("Error: " + response.mensaje);
            }

          },
          function(failure) {
            console.console.error("Error: " + failure);
          });
      }


      scope.onSaveCustomTrunk = function(whatOperation, idCustomTrunk) {
        scope.openModalSave(whatOperation, idCustomTrunk,
          function(idCustomTrunk) {
            scope.onFoundCustomTrunk(idCustomTrunk, function(dataModal) {
              var modalInstance = $uibModal.open({
                templateUrl: 'src/components/customTrunk/customTrunkCrud/customTrunkSave/customTrunkSave.template.html',
                controller: 'customTrunkSaveController as ctrl',
                backdrop: 'static',
                resolve: {
                  dataModal: function() {
                    return dataModal;
                  }
                }
              });
              modalInstance.result.then(function(customTrunkSaved) {
                scope.listaCustomTrunk();
              });
            });
          });
      }
      scope.openModalSave = function(whatOperation, idCustomTrunk, foundCustomTrunkCallback) {
        if (whatOperation == scope.frmData.add || whatOperation == scope.frmData.update) {
          if (whatOperation == scope.frmData.add) {
            scope.frmData.modal.save.btnHabilitar = false;
            scope.frmData.modal.save.whatOperation = scope.frmData.add;
            scope.frmData.modal.save.title = scope.frmData.nameModalInsertCustomTrunk;
            scope.frmData.modal.save.response.customTrunk={};
          } else if (whatOperation == scope.frmData.update) {
            scope.frmData.modal.save.btnHabilitar = true;
            scope.frmData.modal.save.whatOperation = scope.frmData.update;
            scope.frmData.modal.save.title = scope.frmData.nameModalUpdateCustomTrunk;

          }
          foundCustomTrunkCallback(idCustomTrunk);
        }
      }

      //Eliminar
      //Modal Eliminar
      scope.onEliminarCustomTrunk = function(codigo,nombre,tipo,detalle) {
          var modalInstance = $uibModal.open({
              templateUrl: 'src/components/customTrunk/customTrunkCrud/customTrunkDelete/customTrunkDelete.template.html',
              controller: 'customTrunkDelete as Ctrl',
              size: 'md',

              resolve: {
                  dataModal: function() {
                    scope.frmData.modal.delete.request.pIdCustomTrunk=codigo,
                    scope.frmData.modal.delete.request.nombre=nombre,
                    scope.frmData.modal.delete.request.tipo=tipo,
                    scope.frmData.modal.delete.request.detalle=detalle,
                    scope.frmData.modal.delete.content= "¿Está seguro que desea eliminar custom Trunk < "+nombre +" > ?"
                    return scope.frmData.modal.delete;
                  }
              }
          });
          modalInstance.result.then(function(ilEliminado) {
                  $log.debug("Eliminado: " + ilEliminado);
                  if (ilEliminado >= 1) {
                      scope.onRemoveCarpeta();
                  }
              },
              function() {
                  $log.debug("Modal eliminar minimizado");
                  scope.listaCustomTrunk();
              });

      }
      //Metodo para remover
      scope.onRemoveCarpeta = function() {
          for (var i = 0; i < scope.lsCustomTrunk.length; i++) {
              if (scope.lsCustomTrunk[i].idCustomTrunk == scope.frmData.modal.delete.request.pIdCustomTrunk) {
                  scope.lsCustomTrunk.splice(i, 1);
                  break;
              }
          }
      }
//
      //ejecucion de la funcion
      scope.OnloadPage = function() {
        scope.listaCustomTrunk();
      }

      scope.OnloadPage();


    }
  ]);
