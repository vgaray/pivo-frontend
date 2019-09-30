(
  function() {
    "use strict";

    angular.module('cliente')
      .controller('clienteAgregarPedidoController', ['clienteService', 'pedidoService', 'localStorageService', '$uibModalInstance', '$location', 'idRecibido', '$uibModal', 'viewConfig',
        function(clienteService, pedidoService, localStorageService, $uibModalInstance, $location, idRecibido, $uibModal, viewConfig) {
          var scope = this;

          scope.dataInfo = {
            codUsuario: localStorageService.get("codUsuario"),
            token: localStorageService.get("token"),
          }
          //cabecera de Pedidos
          scope.headers = [{
              nombre: "Cód. Pedido"
            },
            {
              nombre: "Tipo Pedido"
            },
            {
              nombre: "Plan"
            },
            {
              nombre: "Modalidad"
            },
            {
              nombre: "Descripción"
            },
            {
              nombre: "Fecha de Pedido"
            },
            {
              nombre: "Acciones"
            }
          ];
          //Listados
          scope.lsTipoPedido = [];

          scope.lsPlan = [];

          scope.lsModalidad = [];

          scope.lsClienteUni = [];

          scope.lsPedidos = [];

          scope.clienteNMostrar = {
            nombre: "",
            direccion: ""
          };
          //Validadores

          scope.varValidacion = true;
          scope.valCodPedido = false;
          scope.valDireccionPedido = false;
          scope.valTipoPedido = false;
          scope.valPlan = false;
          scope.valModalidad = false;
          scope.valDescripción = false;

          scope.frmData = {
            clienteN: {
              pIdCliente: idRecibido,
              pEstado: true
            },
            pedidoList: {
              idCliente: idRecibido,
            },
            request: {
              coPedido: null,
              idTipoPedido: null,
              direccionPedido : null,
              idPlan: null,
              dePedido: "",
              idCliente: idRecibido,
              idTipoDetalle: null
            }
          }

          console.log("" + idRecibido + "");

          //Funciones de Validacion

          scope.validaCodPedido = function() {
            if (scope.frmData.request.coPedido == null || scope.frmData.request.coPedido == "") {
              scope.valCodPedido = false;
            } else {
              scope.valCodPedido = true;
            }
            scope.validaBotonHab();
          };

          scope.validaIdTipoPedido = function() {
            if (scope.frmData.request.idTipoPedido == null || scope.frmData.request.idTipoPedido == "") {
              scope.valTipoPedido = false;
            } else {
              scope.valTipoPedido = true;
            }
            scope.validaBotonHab();
          };

          scope.validaDireccionInstalacion = function () {
            if (scope.frmData.request.direccionPedido == null || scope.frmData.request.direccionPedido == "") {
              scope.valDireccionPedido = false;
            } else {
              scope.valDireccionPedido = true;
            }
            scope.validaBotonHab();
          };

          scope.validaPlan = function() {
            if (scope.frmData.request.idPlan == null || scope.frmData.request.idPlan == "") {
              scope.valPlan = false;
            } else {
              scope.valPlan = true;
            }
            scope.validaBotonHab();
          };


          scope.validaDePedido = function() {
            if (scope.frmData.request.dePedido == null || scope.frmData.request.dePedido == "") {
              scope.valDescripción = false;
            } else {
              scope.valDescripción = true;
            }
            scope.validaBotonHab();
          };

          scope.validaTipoDetalle = function() {
            if (scope.frmData.request.idTipoDetalle == null || scope.frmData.request.idTipoDetalle == "") {
              scope.valModalidad = false;
            } else {
              scope.valModalidad = true;
            }
            scope.validaBotonHab();
          };

          scope.validaBotonHab = function() {
            if (scope.valCodPedido == true && scope.valTipoPedido == true && scope.valPlan == true &&
               scope.valDireccionPedido == true  && scope.valModalidad == true && scope.valDescripción == true) {
              scope.varValidacion = false;
            } else {
              scope.varValidacion = true;
            }
          };

          //Listados Funciones TipoPedidos
          scope.listadoTipoPedidos = function() {
            pedidoService.listarTipoPedido(scope.dataInfo).post({}, {}, function(result) {
                scope.lsTipoPedido = result.listTipoPedido;

              },
              function(error) {
                console.error(error);
              })
          };

          //Listados Funciones Plan
          scope.listadoPlan = function() {
            pedidoService.listaPlan(scope.dataInfo).post({}, {}, function(result) {
              scope.lsPlan = result.listPlan;
            }, function(error) {
              console.error(error);
            })
          };
          //Lista Modalidad
          scope.listaModalidad = function() {
            pedidoService.listarModalidad(scope.dataInfo).post({}, {}, function(result) {
              scope.lsModalidad = result.listTipoDetallePedido;

            }, function(error) {
              console.error(error);
            })
          };
          //Listado al Cliente
          scope.listaClienteUnico = function() {
            clienteService.listaCliente(scope.dataInfo).post({}, scope.frmData.clienteN, function(result) {

              scope.lsClienteUni = result.lsClientesN;

              for (var i = 0; i < scope.lsClienteUni.length; i++) {
                scope.clienteNMostrar.nombre = scope.lsClienteUni[i].noRazonSocial;
                scope.clienteNMostrar.direccion = scope.lsClienteUni[i].direcc;
              }

            }, function(error) {
              console.error(error);
            })
          };

          //Listado de Pedidos Por Cliente
          scope.listaPedidosPorCliente = function() {
            pedidoService.listaPedidoCliente(scope.dataInfo).post({}, scope.frmData.pedidoList, function(result) {
              if (result.estado == 1) {
                scope.lsPedidos = result.pedidoPorClienteList;
              }

            }, function(error) {
              console.error(error);
            })
          };

          //Hacer registro de los Pedidos Por Cliente
          scope.agregarPedido = function() {
            scope.frmData.request.idCliente = idRecibido ;
            pedidoService.insertaPedidoCliente(scope.dataInfo).post({}, scope.frmData.request, function(result) {
              if (result.estado == 1) {
                scope.varValidacion = true;
                scope.valCodPedido = false;
                scope.valTipoPedido = false;
                scope.valPlan = false;
                scope.valModalidad = false;
                scope.valDescripción = false;
                scope.frmData = {
                    pedidoListado: {
                       idCliente: idRecibido
                    }
                };
                scope.listaPedidoClientePostEliminacion(scope.frmData.pedidoListado);

                toastr.success("Registro exitoso", 'Acción realizada', viewConfig.toastConfig);
                scope.frmData = {
                  request: {
                    coPedido: null,
                    idTipoPedido: null,
                    direccionPedido : null,
                    idPlan: null,
                    dePedido: null,
                    idCliente: idRecibido,
                    idTipoDetalle: null
                  }
                };

              }
              if (result.estado == -1) {
                toastr.error(result.mensaje, 'Pedido', viewConfig.toastConfig);
              }
            }, function(error) {
              console.log("error " + error);
            })
          };

          //Eliminar Pedido de cliente
          scope.onEliminarPedido = function(idPedidoCliente) {
            var modalInstance = $uibModal.open({
              templateUrl: 'src/components/cliente/clienteAgregarPedido/clienteAgregarPedidoDelete/clienteAgregarPedidoDelete.template.html',
              controller: 'pedidoClienteDeleteController as ctrl',
              keyboard: false,
              backdrop: 'static',
              size: 'sm',

              resolve: {
                dataModal: function() {
                  scope.pedidoRequest = {
                    idPedido: idPedidoCliente
                  };

                  return scope.pedidoRequest;
                }
              }
            });
            modalInstance.result.then(function() {
                console.log("Eliminado");
                scope.frmData = {

                  pedidoList: {
                    idCliente: idRecibido,
                  }
                }
                scope.listaPedidoClientePostEliminacion(scope.frmData.pedidoList);
              },
              function() {
                console.log("Modal minimizado");
                scope.frmData = {

                  pedidoList: {
                    idCliente: idRecibido,
                  }
                }
                scope.listaPedidoClientePostEliminacion(scope.frmData.pedidoList);
              })
          };

          //Cancelar
          scope.cancel = function() {
            $uibModalInstance.close();
          }

          //reseteo de Formulario

          scope.reset = function(form) {
            form.$setPristine();
            form.$setUntouched();
            
            
          };



          scope.OnloadDetail = function() {
            //scope.listarDetalle();
            scope.listaClienteUnico();
            scope.listaPedidosPorCliente();
            scope.listadoTipoPedidos();
            scope.listadoPlan();
            scope.listaModalidad();
          }

          scope.listaPedidoClientePostEliminacion = function (objetoListado) {
              scope.lsPedidos = [];
            pedidoService.listaPedidoCliente(scope.dataInfo).post({}, objetoListado, function(result) {
              if (result.estado == 1) {
                scope.lsPedidos = result.pedidoPorClienteList;
              }

            }, function(error) {
              console.error(error);
            });

          };

          scope.OnloadDetail();
        }
      ]);
  })();
