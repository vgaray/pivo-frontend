angular.module('usuario')
    .controller('usuarioInstanciaSaveController', [
        '$location', '$log', 'usuarioService', '$uibModalInstance', 'localStorageService', 'dataModal', 'viewConfig', 'utilService', 'seguridadService',
        function ($location, $log, usuarioService, $uibModalInstance, localStorageService, dataModal, viewConfig, utilService, seguridadService) {
            var scope = this;

            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }
            scope.nombreRol = [];
            scope.thereIsError = false;
            scope.firstLoad = true;
            scope.verContra = dataModal.divContra;
            scope.check = dataModal.btnHabilitar;

            scope.typeOperation = dataModal.whatOperation;

            scope.frmData = {

                nameModal: dataModal.title,
                subtitulo: dataModal.subtitulo,
                btnHabilitar: dataModal.btnHabilitar,
                comboRol: {
                    idRol: dataModal.response.usuario.idRol,
                    noRol: dataModal.response.usuario.noRol
                },
                usuario: {
                    entity: dataModal.response.usuario,
                    password: null,
                    mensajeValida: "",
                    mensajePasswo: "",
                    save: {
                        request: {}
                    },

                    buscar: {
                        request: {}
                    },
                    cargarComboRol: {
                        request: {}
                    },
                    validar: {
                        request: {
                            nologin: ""
                        }
                    }
                },
                usuarioSaved: {}

            }
            //Recuperando valores iniciales
             scope.uniNombre = dataModal.response.usuario.noNombre;
             scope.uniApellido = dataModal.response.usuario.noApellido;
             scope.uniEmail = dataModal.response.usuario.email;
             scope.uniRol = dataModal.response.usuario.idRol;
             scope.uniUsuario =dataModal.response.usuario.noLogin;
             scope.uniContra =  dataModal.response.usuario.noPasswo;
            //LimpiarContraseña
            scope.habCon = function () {
                if (scope.verContra == false) {
                    scope.frmData.usuarioSaved.noPasswo = null;
                }
            }

            //Insertar
            scope.onSaveUsuario = function () {
                scope.saveUsuario(function (usuarioSaved) {
                    $uibModalInstance.close(usuarioSaved);
                });
            }

            scope.nuEstadoBoton=0;
            //Cargar para Usuario
            scope.varibleValidar = 0;
            scope.matchingUsuarioSave = function () {

                scope.frmData.usuario.save.request.noLogin = scope.frmData.usuario.entity.noLogin;
                scope.frmData.usuario.save.request.noPasswo = scope.frmData.usuario.password;
                scope.frmData.usuario.save.request.noNombre = scope.frmData.usuario.entity.noNombre;
                scope.frmData.usuario.save.request.noApelli = scope.frmData.usuario.entity.noApellido;
                scope.frmData.usuario.save.request.email = scope.frmData.usuario.entity.email;
                scope.frmData.usuario.save.request.noProfe = null;
                scope.frmData.usuario.save.request.idRol = scope.frmData.comboRol.idRol;
                scope.frmData.usuario.save.request.noLoginCreador = scope.dataInfo.codUsuario;
                scope.frmData.usuario.save.request.idInstancia = scope.dataInfo.idInstancia;


                if (scope.frmData.usuario.save.request.noLogin == null || scope.frmData.usuario.save.request.noPasswo == null ||
                    scope.frmData.usuario.save.request.noNombre == null || scope.frmData.usuario.save.request.noApelli == null ||
                    scope.frmData.usuario.save.request.email == null) {
                    scope.varibleValidar = 1;
                } else if (scope.frmData.usuario.save.request.idRol == 0) {
                    scope.varibleValidar = 2;
                }


            }
            scope.matchingUsuarioParaEditar = function () {

                scope.frmData.usuarioSaved.idUsuario = scope.frmData.usuario.entity.idUsuario;
                scope.frmData.usuarioSaved.nologin = scope.frmData.usuario.entity.noLogin;
                scope.frmData.usuarioSaved.noPasswo = scope.frmData.usuario.password;
                scope.frmData.usuarioSaved.noNombre = scope.frmData.usuario.entity.noNombre;
                scope.frmData.usuarioSaved.noApellido = scope.frmData.usuario.entity.noApellido;
                scope.frmData.usuarioSaved.email = scope.frmData.usuario.entity.email;
                scope.frmData.usuarioSaved.noProfe = null;
                scope.frmData.usuarioSaved.idRol = scope.frmData.comboRol.idRol;
                scope.frmData.usuarioSaved.noLoginCreador = scope.dataInfo.codUsuario;
                scope.frmData.usuarioSaved.idInstancia = scope.dataInfo.idInstancia;

                if (scope.frmData.usuarioSaved.nologin == null ||
                    scope.frmData.usuarioSaved.noNombre == null || scope.frmData.usuarioSaved.noApellido == null ||
                    scope.frmData.usuarioSaved.email == null || scope.verContra == true && scope.frmData.usuarioSaved.noPasswo == null) {
                    scope.varibleValidar = 1;
                } else if (scope.frmData.usuarioSaved.idRol == 0) {
                    scope.varibleValidar = 2;
                }
                else if (scope.verContra == false && scope.frmData.usuarioSaved.noPasswo != null || scope.frmData.usuarioSaved.noPasswo == null) {
                    scope.frmData.usuarioSaved.noPasswo = null;
                    scope.varibleValidar = 0;
                }

            }
            //validar Login
            scope.varLogin = 0;
            scope.validarLogin = function () {
                scope.frmData.usuario.validar.request.nologin = scope.frmData.usuario.entity.noLogin;
                usuarioService.validarLoginUsuario(scope.dataInfo).post({}, scope.frmData.usuario.validar.request, function (result) {
                    if (result.estado == 1) {

                        if (scope.frmData.usuario.validar.request.nologin == null) {
                            scope.frmData.usuario.mensajeValida = "";
                        } else {
                            //scope.frmData.usuario.mensajeValida="Usuario disponible";
                            scope.frmData.usuario.mensajeValida = "";
                            scope.varLogin = 0;
                        }
                    } else if (result.estado == 0) {
                        scope.frmData.usuario.mensajeValida = "Usuario en uso ,no disponible";
                        scope.varLogin = 1;
                    }
                },
                    function (error) {
                        console.error(error);
                    });
            }
            //Validar correo
            scope.varEmail = 0;
            scope.validaEmail = function () {
                var emailArreglo = scope.frmData.usuario.entity.email.split("@");
                if (emailArreglo.length == 2) {
                    var puntoArreglo = emailArreglo[1].split(".");
                    if (puntoArreglo.length >= 2) {
                        scope.varEmail = 0;
                    } else {
                        scope.varEmail = 1;
                    }
                } else {
                    scope.varEmail = 1;
                }
            }

            scope.saveUsuario = function (dismissModalCallback) {
                if (scope.thereIsError) {
                    toastr.remove();
                    toastr.error("Hay errores en el formulario", "Error", viewConfig.toastConfig);
                } else {

                    scope.matchingUsuarioSave();
                    scope.matchingUsuarioParaEditar();

                    if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 0 && scope.varLogin == 0 && scope.varEmail == 0) {
                        usuarioService.insertarUsuario(scope.dataInfo).post({}, scope.frmData.usuario.save.request, function (result) {
                            if (result.estado == 1) {

                                dismissModalCallback(scope.frmData.usuarioSaved);
                                toastr.remove();
                                toastr.success('Inserción exitosa', 'Acción realizada', viewConfig.toastConfig);

                            } else if (result.estado == 0 || result.estado == -1) {
                                console.log('No se registro el usuario');
                            }

                        },
                            function (error) {
                                console.error('Error: ' + error);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 1) {
                        toastr.remove();
                        toastr.error('Ningun campo del formulario acepta valores vacios o erroneos ', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varibleValidar == 2) {
                        toastr.remove();
                        toastr.error('Seleccion un Rol', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varLogin == 1) {
                        toastr.remove();
                        toastr.error('El Login de usuario ya existe', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if (dataModal.whatOperation == utilService.operation.add && scope.varEmail == 1) {
                        toastr.remove();
                        toastr.error('Formato del correo Incorrecto', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 0 && scope.varLogin == 0 && scope.varEmail == 0) {
                        usuarioService.actualizarUsuario(scope.dataInfo).post({}, scope.frmData.usuarioSaved,
                            function (response) {
                                if (response.estado == 1) {
                                    dismissModalCallback(scope.frmData.usuarioSaved);
                                    toastr.remove();
                                    toastr.success('Actualización exitosa', 'Acción realizada', viewConfig.toastConfig);

                                } else if (response.estado == -1) {
                                    toastr.remove();
                                    toastr.error('No se pudo Actualizar la informacion del Usuario', 'Error', viewConfig.toastConfig);
                                    /*console.error( result.mensaje );*/
                                    dismissModalCallback(null);
                                }
                            },
                            function (failure) {
                                console.error("Error: " + failure);
                            });
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 1) {
                        toastr.remove();
                        toastr.error('Ningun campo del formulario acepta valores vacios o erroneos ', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varibleValidar == 2) {
                        toastr.remove();
                        toastr.error('Seleccion un Rol', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varLogin == 1) {
                        //toastr.remove();
                        toastr.error('El Login de usuario ya existe', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    } else if (dataModal.whatOperation == utilService.operation.update && scope.varEmail == 1) {
                        toastr.remove();
                        toastr.error('Formato del correo Incorrecto', 'Error', viewConfig.toastConfig);
                        $uibModalInstance.close();
                    }
                }
            }

            scope.rolList = [];

            // Listar combo
            scope.lsTempoTipo = {
                items: {
                    idRol: null,
                    ilActivo: false,
                    noDescri: "Seleccione un Rol...",
                    noRol: "Seleccione un Rol..."
                }
            }
            scope.listarRol = function () {
                seguridadService.listadoRol(scope.dataInfo).post({}, {}, function (result) {
                    if (result.estado == 1) {
                        scope.rolList = [scope.lsTempoTipo.items];
                        scope.rolList = scope.rolList.concat(result.roles);
                        scope.flagCombo = 1;
                    }
                    else {
                        console.log(result.mensaje);
                        scope.flagCombo = 0;
                    }
                })
            }
            
            //Validando Email
            scope.flagDevEmail=0;
            scope.menEmailVal="";
             scope.verificarEmail = function () {
                    if (scope.frmData.usuario.entity.email != null && scope.frmData.usuario.entity.email != "") {
                        var re = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                        if (re.test(scope.frmData.usuario.entity.email)) {
                            //formato correcto
                            scope.flagDevEmail=0;
                            scope.menEmailVal="";
                        } else {
                            scope.flagDevEmail=1;
                            scope.menEmailVal="*formato incorecto en Email";
                           
                        }
                    }else{
                         scope.flagDevEmail=0;
                         scope.menEmailVal="";
                    }
                }
            //validar contraseña
            scope.flaEstaValCon=0;
            scope.validaContraFinal="";
            scope.validarContra = function (){
                scope.varContra = scope.frmData.usuario.password;
                if(scope.varContra==null || scope.varContra==""){
                    scope.flaEstaValCon=0;
                    scope.validaContraFinal="";
                }
                else {
                    scope.vartamContra=scope.varContra.length;
                    if( scope.vartamContra<7 || scope.vartamContra>30){
                     scope.flaEstaValCon=1;
                     scope.validaContraFinal="*La contraseña debe tener entre 8 a 30 caracteres";
                    }else{
                    scope.flaEstaValCon=0;
                     scope.validaContraFinal="";
                    }
                }
            }
            //validando ingresos nulos y ingresos iguales 
            scope.nuEstadoBoton=1;
            scope.validarValIgu = function () {
                
                if (dataModal.whatOperation == utilService.operation.add) {
                    if (
                        scope.frmData.usuario.entity.noLogin == null ||
                        scope.frmData.usuario.password == null ||
                        scope.frmData.usuario.entity.noNombre == null ||
                        scope.frmData.usuario.entity.noApellido == null ||
                        scope.frmData.usuario.entity.email == null ||
                        scope.frmData.comboRol.idRol == null ||
                        scope.flaEstaValCon!=0 ||
                        scope.flagDevEmail!=0
                    ) {
                        scope.nuEstadoBoton = 1;
                    } else {
                        scope.nuEstadoBoton = 0;
                    }
                    
                } 
               
                else if (dataModal.whatOperation == utilService.operation.update) {
                    scope.nuEstadoBoton = 1;
                   //scope.frmData.usuario.password == scope.uniContra
                   if(scope.verContra==false){
                    if (
                        scope.frmData.usuario.entity.noNombre == scope.uniNombre &&
                        scope.frmData.usuario.entity.noApellido == scope.uniApellido &&
                        scope.frmData.usuario.entity.email == scope.uniEmail &&
                        scope.frmData.comboRol.idRol == scope.uniRol &&
                        scope.frmData.usuario.entity.noLogin == scope.uniUsuario
                        
                    ) {
                        scope.nuEstadoBoton = 1;
                    } 
                    else if (
                        scope.frmData.usuario.entity.noNombre == null ||
                        scope.frmData.usuario.entity.noApellido == null ||
                        scope.frmData.usuario.entity.email == null ||
                        scope.frmData.comboRol.idRol == null ||
                        scope.frmData.usuario.entity.noLogin == null ||
                        scope.flagDevEmail!=0
                        ) {
                        scope.nuEstadoBoton = 1;
                    }
                    else {
                        scope.nuEstadoBoton = 0;
                    }
                } else if(scope.verContra==true){
                     if (
                        scope.frmData.usuario.entity.noNombre == scope.uniNombre &&
                        scope.frmData.usuario.entity.noApellido == scope.uniApellido &&
                        scope.frmData.usuario.entity.email == scope.uniEmail &&
                        scope.frmData.comboRol.idRol == scope.uniRol &&
                        scope.frmData.usuario.entity.noLogin == scope.uniUsuario
                        
                    ) {
                        scope.nuEstadoBoton = 1;
                    } 
                    else if (
                        scope.frmData.usuario.entity.noNombre == null ||
                        scope.frmData.usuario.entity.noApellido == null ||
                        scope.frmData.usuario.entity.email == null ||
                        scope.frmData.comboRol.idRol == null ||
                        scope.frmData.usuario.entity.noLogin == null ||
                        scope.frmData.usuario.password == null ||
                        scope.flaEstaValCon!=0 ||
                        scope.flagDevEmail!=0 
                        ) {
                        scope.nuEstadoBoton = 1;
                    }
                    else {
                        scope.nuEstadoBoton = 0;
                    }
                }
                }
                
                
            }

            // Los demas metodos
            scope.cancel = function () {

                //  $uibModalInstance.dismiss( 'cancel' );
                $uibModalInstance.close();
            }
            scope.onLoadPage = function () {
                scope.listarRol()
            }
            scope.onLoadPage();

        }
    ]);
