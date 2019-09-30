angular.module('personal')
    .controller('personalController', ['personalService', 'localStorageService', '$location', '$log', '$timeout', 'viewConfig', '$uibModal',
        function (personalService, localStorageService, $location, $log, $timeout, viewConfig, $uibModal) {
            var scope = this;
            scope.varnab = $location.search();
            scope.dataInfo =
                {
                    codUsuario: localStorageService.get("codUsuario"),
                    token: localStorageService.get("token"),
                    idInstancia: scope.varnab.idInstancia
                }

            scope.comboTipoDocumento =
                [
                    { idTipoDocumento: null, noAbreviatura: "Todos" },
                    { idTipoDocumento: 1, noAbreviatura: "DNI" },
                    { idTipoDocumento: 2, noAbreviatura: "NIE" }
                ]
            scope.comboEstado =
                [
                    { ilActivo: null, noEstado: "Todos" },
                    { ilActivo: true, noEstado: "Activo" },
                    { ilActivo: false, noEstado: "InActivo" }
                ]

            scope.frmData = {
                name_page_title: "Lista de personal de la empresa",
                name_buscar: "Buscar",
                personal: {
                    listar: {
                        request: {
                            pIdPersonal:null,
                            pNuDocumento: null,
                            pNoNombreApellido: null,
                            pIdTipoDocumento: null,
                            pIlActivo: null,
                            pTiFun: 1
                        },
                        response: {
                            idPersonal: 0,
                            noPersonal: "",
                            noApePat: "",
                            noApeMat: "",
                            noAbreviatura: "",
                            nuDocumento: "",
                            noDireccion: 0,
                            nuTelefono: 0,
                            nuCelular: "",
                            noCorreo: "",
                            nuCmvp: "",
                            noEstado: "",
                            idTipoDocumento: "",
                            ilActivo: 0
                        },
                    },
                }
            }
            scope.noAbreviatura = "Todos";
            scope.combochangeTipoDocumento = function (value) {
                scope.frmData.personal.listar.request.pIdTipoDocumento = value.idTipoDocumento;
                scope.noAbreviatura = value.noAbreviatura;
                scope.listarPersonal();
            }
            scope.noEstado = "Todos";
            scope.combochangeEstado = function (value) {
                scope.frmData.personal.listar.request.pIlActivo = value.ilActivo;
                scope.noEstado = value.noEstado;
                scope.listarPersonal();
            }
            scope.verDatosPersonales = function (direccion, telefono, celular, correo) {
                scope.dataModal = [];
                scope.dataModal.noDireccion = direccion;
                scope.dataModal.nuTelefono = telefono;
                scope.dataModal.nuCelular = celular;
                scope.dataModal.noCorreo = correo;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/personal/personalDatosPersonales/personalDatosPersonales.template.html',
                    controller: 'personalDatosPersonalesController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });

                modalInstance.result.then(function () {
                    scope.listarPersonal();
                });
            }
            scope.eliminarPersonal = function (id,nombre) {
                scope.dataModal = [];
                scope.dataModal.pIdPersonal = id;
                scope.dataModal.nombre = nombre;
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/personal/personalEliminar/personalEliminar.template.html',
                    controller: 'personalEliminarController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listarPersonal();
                });
            }

            scope.RAPersonal = function (idPersonal) {
                ;
                scope.dataModal = [];
                scope.dataModal.idPersonal=idPersonal;
                
                var modalInstance = $uibModal.open({
                    templateUrl: 'src/components/personal/personalAR/personalAR.template.html',
                    controller: 'personalARController as Ctrl',
                    keyboard: true,
                    resolve: {
                        dataModal: function () {
                            return scope.dataModal;
                        }
                    }
                });
                modalInstance.result.then(function () {
                    scope.listarPersonal();
                });
            }
            scope.options = {
                legend: { display: true }
            }
            scope.listarPersonal = function () {
                personalService.listar(scope.dataInfo).post({}, scope.frmData.personal.listar.request, function (result) {
                    if (result.estado == 1) {
                        ;
                        scope.listaPersonal = result.lsPersonal;
                        if( scope.listaPersonal.length==0)
                        {
                            //Etiquetas
                            scope.labelList = null;
                            //arreglo con todas las filas 
                            scope.DataArray = null;
                            toastr.remove();
                            toastr.warning("Consulta vacía", 'Advertencia', viewConfig.toastConfig);
                               
                        }else{
                            //Etiquetas
                            scope.labelList = result.graficoPersonal.labelList;
                            //arreglo con todas las filas 
                            scope.DataArray = result.graficoPersonal.dataUnicaNumber;
                        }
                        
                    } else if (result.estado == -1 || result.estado == 0) {
                        console.error('Error: ' + result.mensaje);
                    }
                }, function (error) {
                    console.error('Error: ' + error);
                });
            }
            scope.valExcel = 1;
            scope.vaPdf = 2;
            scope.descargarArchivo = function (valor) {
                scope.enades = true;
                scope.frmData.personal.listar.request.tipoFile = valor;
                if (scope.frmData.personal.listar.request.pIdPersonal != null) {

                    if (scope.frmData.personal.listar.request.pIdPersonal.trim() == "") {
                        scope.frmData.personal.listar.request.pIdPersonal = null;
                    }
                }
                if (scope.frmData.personal.listar.request.pNuDocumento != null) {

                    if (scope.frmData.personal.listar.request.pNuDocumento.trim() == "") {
                        scope.frmData.personal.listar.request.pNuDocumento = null;
                    }
                }
                if (scope.frmData.personal.listar.request.pNoNombreApellido != null) {
                    if (scope.frmData.personal.listar.request.pNoNombreApellido.trim() == "") {
                        scope.frmData.personal.listar.request.pNoNombreApellido = null;
                    }
                }
                personalService.listarReporte(scope.dataInfo).post({}, scope.frmData.personal.listar.request, function (result) {   
                    if (result.estado == 1) {
                        if (valor == 1) {
                            scope.pdf = 'data:application/xls;base64,' + result.reporteFile;
                            download(scope.pdf, "listaPersonal.xls", "application/xls");
                        } else if (valor == 2) {
                            scope.pdf = 'data:applicatio/pdf;base64,' + result.reporteFile;
                            download(scope.pdf, "listaPersonal.pdf", "application/pdf");
                        }
                        toastr.success("Archivo descargado exitosamente", "Acción realizada", viewConfig.toastConfig)
                    } else if (result.estado == 0 || result.estado == -1) {
                        toastr.error("Error al descargar archivo", "Error del Servidor", viewConfig.toastConfig)
                    }
                    scope.enades = false;
                }, function (error) {
                    console.error(error);
                })
            }
            scope.OnloadPage = function () {
                scope.listarPersonal();
            }

            scope.OnloadPage();
        }
    ]);
