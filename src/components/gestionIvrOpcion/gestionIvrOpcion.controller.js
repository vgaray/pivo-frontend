angular.module('gestionIvrOpcion').
    controller('gestionIvrOpcionCtrl', ['anexosSipService', '$location', 'ivrOpcionService', 'validator', 'localStorageService', 'gestionHorarioService', 'viewConfig', '$uibModal', 'utilService',
        function (anexosSipService, $location, ivrOpcionService, validator, localStorageService, gestionHorarioService, viewConfig, $uibModal, utilService) {
            var scope = this;
            scope.menuPrincipal = 0;
            scope.varnab = $location.search();
            scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: scope.varnab.idInstancia
            }


            scope.infoAnexo;
            scope.infoEmpresa = {
                /*
                  idCliente: dataModal.response.usuario.idCliente,
                  noRazonSocial: dataModal.response.usuario.noCliente
                  */
            };

            var requestConsult = {
            };
            scope.anexosListaAutocompletar = function (variable) {
                if (variable > 9) {
                    requestConsult.pNuAnexo = variable;
                    requestConsult.pNuAnexo.toString();
                    anexosSipService.listarAutocompletarSipTelefono(scope.dataInfo).post({}, requestConsult, function (result) {
                        if (result.estado == 1) {
                            scope.anexosListaSeleccion = result.listaAnexos;
                        }
                        else if (result.estado == -1 || result.estado == 0) {
                            console.log('Error: ' + result.mensaje);
                            toastr.remove();
                            toastr.error(result.mensaje, "Error de Servicio", viewConfig.toastConfig);
                        }
                    }, function (error) {
                        console.error('error: ' + error);
                        toastr.remove();
                        toastr.error("Error fatal de carga", "Error", viewConfig.toastConfig);
                    });
                }
            }

            scope.listarAnexosXCombo = function () {
                anexosSipService.listarSipTelefono(scope.dataInfo).post({}, {}, function (result) {
                    if (result.estado == 1) {
                        scope.anexosListaSeleccion = result.sipTelefonoList;
                    }
                    else if (result.estado == -1 || result.estado == 0) {
                        console.log('Error: ' + result.mensaje);
                        toastr.error(result.mensaje, "Error de Servicio", viewConfig.toastConfig);
                    }
                }, function (error) {
                    console.error('error: ' + error);
                    toastr.error("Error fatal de carga", "Error", viewConfig.toastConfig);
                }
                );
            }



            scope.treeInstance = {};
            // scope.model = scope.model || {};
            scope.arre = [];
            scope.cambiarSiNo = false;
            scope.cambiarCheck = false;
            scope.myFile = "";
            /*
                scope.objListaopcionCrear.marcaCrearIvrOpciones = "";
                scope.objListaopcionCrear.marcaCrearIvrOpcionesDirige = "";
                scope.objListaopcionCrear.marcaCrearIvrOpcionesTitulo = "";
                */
            scope.objListaopcionCrear = {
                pIdPadre: 0,
                pNoDescripcion: "",
                pNoAudio: "",
                pNuAnexo: "",
                pIdtipo: null,
                pNoValor: "",
                pNoNombre: "",
                pIdGrupo: null,
                pNoAnexoTiempo: "",
                pVuelveInicioTiempo: 1,
                pVuelveInicioIncorrecto: 1,
                pNoAnexoIncorrecto: "",
                pMarcaAnexo: 0,
                pOperadora: 0,
                pTiempoEspera: 1
            }

            scope.cambiarNombreIVRGuion = function () {
                if (scope.frmData.crear.request.pNoNombre != null) {
                    scope.frmData.crear.request.pNoNombre = scope.frmData.crear.request.pNoNombre.replace(" ", "-");
                    scope.frmData.crear.request.pNoNombre = scope.frmData.crear.request.pNoNombre.trim();
                }
            }

            scope.cambiarNombreIVRGuionEdit = function () {
                if (scope.frmData.editar.request.pNoNombre != null) {
                    scope.frmData.editar.request.pNoNombre = scope.frmData.editar.request.pNoNombre.replace(" ", "-");
                    scope.frmData.editar.request.pNoNombre = scope.frmData.editar.request.pNoNombre.trim();
                }
            }

            scope.cambiarNombreIvrOpciGuion = function () {
                if (scope.objListaopcionCrear.pNoNombre != null) {
                    scope.objListaopcionCrear.pNoNombre = scope.objListaopcionCrear.pNoNombre.replace(" ", "-");
                    scope.objListaopcionCrear.pNoNombre = scope.objListaopcionCrear.pNoNombre.trim();
                }
            }

            scope.crearIvrOpciones = [
                { value: 0, descripcion: "0" },
                { value: 1, descripcion: "1" },
                { value: 2, descripcion: "2" },
                { value: 3, descripcion: "3" },
                { value: 4, descripcion: "4" },
                { value: 5, descripcion: "5" },
                { value: 6, descripcion: "6" },
                { value: 7, descripcion: "7" },
                { value: 8, descripcion: "8" },
                { value: 9, descripcion: "9" },
                { value: 10, descripcion: "#" },
                { value: 11, descripcion: "*" }
            ];

            scope.crearIvrOpcionesDirige = [
                { value: 2, descripcion: "Anexo" },
                { value: 1, descripcion: "IVR Nuevo" },
                { value: 3, descripcion: "IVR Existente" }
            ];

            scope.crearIvrOpcionesMostrarAnexo = 1;

            scope.mostrarOcultarIvr = function () {
                if (scope.marcaCrearIvrOpcionesDirige == 2) {
                    scope.crearIvrOpcionesMostrarAnexo = 1;
                }
                else {
                    scope.crearIvrOpcionesMostrarAnexo = 0;
                }
            }

            scope.upFile = function () {
                document.querySelector('#archivo').click();
            };

            scope.treeConfig = {
                "ui": {
                    "initially_select": ["#init_sel"]
                },
                version: 1,
                "state": {
                    "selected": true
                },
                //opened: true,
                //"open_all": true,
                //"aria-expanded" : true,
                "core": {
                    //"expand_selected_onload": true,
                    //"check_callback" : true,
                    //"aria-expanded" : true,
                    //"open_parents": true,
                    "multiple": false,
                    "animation": 0,
                    //"expand_selected_onload": true,
                    //expand_selected_onload : false,
                    "themes": {
                        "variant": "large"
                    }
                },
                "checkbox": {
                    "keep_selected_style": true
                },
                "types": {

                    "ivr": {
                        "icon": "glyphicon glyphicon-phone-alt"
                    },
                    "anexo": {
                        "icon": "glyphicon glyphicon-earphone"
                    },
                    "ivrref": {
                        "icon": "glyphicon glyphicon-link"
                    },
                },
                // ,"wholerow"
                "plugins": ["types"]
                //plugins:[] "checkbox"
            };


            scope.funcionMenuPrincipal = function (nuevaOpcion) {
                scope.objListaopcionCrear.pIdPadre = 0;
                scope.objListaopcionCrear.pNoDescripcion = "";
                scope.objListaopcionCrear.pNoAudio = "";
                scope.objListaopcionCrear.pNuAnexo = "";
                scope.objListaopcionCrear.pIdtipo = null;
                scope.objListaopcionCrear.pNoValor = "";
                scope.objListaopcionCrear.pNoNombre = "";
                scope.objListaopcionCrear.pIdGrupo = null;
                scope.objListaopcionCrear.pNoAnexoTiempo = "";
                scope.objListaopcionCrear.pVuelveInicioTiempo = 1;
                scope.objListaopcionCrear.pVuelveInicioIncorrecto = 1;
                scope.objListaopcionCrear.pNoAnexoIncorrecto = "";
                scope.objListaopcionCrear.pMarcaAnexo = 0;
                scope.objListaopcionCrear.pOperadora = 0;
                scope.objListaopcionCrear.pTiempoEspera = 1;
                scope.anexosListaSeleccion = [];
                scope.infoAnexo = "";
                if (nuevaOpcion == 1) {
                    scope.idIvrOpcion.idIvrOpcion=null;
                    scope.funListarGrupoHorario();                    
                    scope.validarCampos = true;
                    scope.myFile = null;
                    scope.listaDeIvrApuntar = [];
                    scope.resetearValores();
                    scope.opcionesEditar = [];
                    scope.frmData.crear.preview.checkMarcaAnexoTiempo = false;
                    scope.frmData.crear.preview.checkMarcaAnexo = false;
                    scope.listadeOpciones = [];
                    scope.listadeOpcionesIVRdeEditarIVR = [];
                    for (index = scope.model.jsTreeData.length - 1; index >= 0; --index) {
                        if (scope.model.jsTreeData[index].pIdtipo == 1) {
                            scope.listaDeIvrApuntar.push(scope.model.jsTreeData[index]);
                        }
                    }
                }
                scope.cambiarSiNo = false;
                scope.menuPrincipal = nuevaOpcion;
            };


            scope.verificarExistenciaAudio = function () {
                if (scope.frmData.editar.request.pNoAudio != "" && scope.frmData.editar.request.pNoAudio != null
                    && scope.frmData.editar.request.pNoAudio !== undefined) {
                    return false;
                } else {
                    return true;
                }
            }
            scope.nombreIvrEliminar="";
            scope.frmData = {
                crear: {
                    preview: {
                        checkMarcaAnexo: false,
                        checkMarcaAnexoTiempo: false
                    },
                    request: {
                        pIdPadre: 0,
                        pNoDescripcion: "", //*crear
                        pNoAudio: "", //*crear
                        pNuAnexo: "",
                        pIdtipo: 1, //1 ivr 2 anexo
                        pNoValor: "",
                        pNoNombre: "", //*crear
                        pNoAudioBase64: "",
                        pIdGrupo: null, //*crear
                        pNoAnexoTiempo: "", //*crear
                        pVuelveInicioIncorrecto: 1,  //*crear
                        pNoAnexoIncorrecto: "",
                        pMarcaAnexo: 1,
                        pOperadora: 1, //*crear
                        pVuelveInicioTiempo: 1, //*crear
                        pTiempoEspera: 1 //*crear
                    }
                },
                editar: {
                    preview: {
                        checkMarcaAnexo: false,
                        checkMarcaAnexoTiempo: false
                    },
                    request: {
                        pIdIvrCop: 0,
                        pIdPadre: 0,
                        pNoDescripcion: "",
                        pNoAudio: "",
                        pNoAudioBase64: "",
                        pNuAnexo: "",
                        pIdtipo: 0,
                        pNoValor: "",
                        pNoNombre: "",
                        pIdGrupo: 0,
                        pNoAnexoTiempo: "",
                        pVuelveInicioIncorrecto: 0,
                        pNoAnexoIncorrecto: "",
                        pMarcaAnexo: 0,
                        pOperadora: 0,
                        pVuelveInicioTiempo: 0,
                        pTiempoEspera: 0
                    }
                },
                eliminar: {
                    modalDelete: {
                        // title: "Mensaje del Sistema",
                        // content: "¿Está seguro que desea eliminar el Ivr "+scope.nombreIvrEliminar+" ?",
                        deleteRequest: {
                            idIvr: 0,
                            nologin: "",
                            idInstancia: "",
                            tiOpera: 1,
                            pIdIvrCop: 0,
                            pIdIvrNombre: ""
                        }
                    },
                    request: {
                        pIdIvrCop: 0
                    }
                },
                listar: {
                }
            }

            scope.filterValue = function (obj, value) {
                if (isNaN(obj[value].substring(obj[value].length, obj[value].length))) {
                    obj[value] = obj[value].substring(0, obj[value].length - 1);
                }
                else if (isNaN(obj[value]) /*&& angular.isNumber( +nuAnexo ) */) {
                    obj[value] = "";
                }
            }

            scope.ejecutareditarIVR = function () {
                var variableAnexoEncontrado = -1;
                if (scope.frmData.editar.preview.checkMarcaAnexoTiempo == true || scope.frmData.editar.preview.checkMarcaAnexoTiempo == 1) {
                    for (index = scope.anexosListaSeleccion.length - 1; index >= 0; --index) {
                        if (scope.anexosListaSeleccion[index] == scope.frmData.editar.request.pNoAnexoTiempo) {
                            variableAnexoEncontrado = 1;
                            break;
                        } else {
                            variableAnexoEncontrado = 0;
                        }
                    }
                }
                if (scope.anexosListaSeleccion.length == 0 || scope.anexosListaSeleccion.length == -1) {
                    variableAnexoEncontrado = 1;
                }
                if (scope.anexosListaSeleccion.length == 0 && (scope.frmData.editar.preview.checkMarcaAnexoTiempo == true || scope.frmData.editar.preview.checkMarcaAnexoTiempo == 1)) {
                    toastr.remove();
                    toastr.error("Anexo es obligatorio", "Error", viewConfig.toastConfig);
                } else if (variableAnexoEncontrado == 0) {
                    toastr.remove();
                    toastr.error("Anexo incorrecto", "Error", viewConfig.toastConfig);
                } else if (scope.frmData.editar.request.pNoNombre == null || scope.frmData.editar.request.pNoNombre == "") {
                    toastr.remove();
                    toastr.error("Falta llenar Campo Nombre", "Error", viewConfig.toastConfig);
                } 
                else if(scope.validarExtension()==true){
                    toastr.remove();
                    toastr.error("Audio debe de ser mp3 o wav", "Error", viewConfig.toastConfig);                    
                }                
                // else if (scope.myFile == "" || scope.myFile == null || scope.myFile == undefined) {
                //     toastr.remove();
                //     toastr.error("Falta seleccionar Audio", "Error", viewConfig.toastConfig);
                // }
                else {
                    if (scope.frmData.editar.preview.checkMarcaAnexo == true) {
                        scope.frmData.editar.request.pMarcaAnexo = 1;
                    } else {
                        scope.frmData.editar.request.pMarcaAnexo = 0;
                    }  
                    if (scope.frmData.editar.request.pNuAnexo == 0) {
                        scope.frmData.editar.request.pNuAnexo = null;
                    }

                    if (scope.frmData.editar.preview.checkMarcaAnexoTiempo == true) {
                        scope.frmData.editar.request.pOperadora = 1;
                    } else {
                        scope.frmData.editar.request.pOperadora = 0;
                        scope.frmData.editar.request.pNoAnexoTiempo = "";
                    } 
                    if (scope.myFile != "" && scope.myFile != null && scope.myFile !== undefined) {
                        //if(scope.cambiarSiNo == true){

                        var reader = new FileReader();
                        scope.frmData.editar.request.pNoAudio = scope.myFile.name;
                        reader.readAsDataURL(scope.myFile);
                        // -----------------------------------------------------------------------
                        reader.onload = function () {
                            scope.temporal = reader.result;
                            var resp1 = 100;
                            resp1 = scope.temporal.search("mp3");
                            var resp2 = 100;
                            resp2 = scope.temporal.search("wav");
                            if (resp1 >= 0 || resp2 >= 0) {
                                scope.temporal = scope.temporal.replace("data:audio/wav;base64,", "");
                                scope.temporal = scope.temporal.replace("data:audio/mp3;base64,", "");
                                scope.frmData.editar.request.pNoAudioBase64 = scope.temporal;
                                scope.saving=true;
                                ivrOpcionService.editar(scope.dataInfo).post({}, scope.frmData.editar.request, function (result) {
                                    if (result.estado == 1) {
                                        scope.myFile = "";
                                        //  IVRdeEditarIVR
                                        for (index = scope.listadeOpcionesIVRdeEditarIVR.length - 1; index >= 0; --index) {
                                            scope.listadeOpcionesIVRdeEditarIVR[index].pIdPadre = scope.checkArray[0].id;
                                            ivrOpcionService.crear(scope.dataInfo).post({}, scope.listadeOpcionesIVRdeEditarIVR[index], function (result) {

                                                // console.log("se registro correstamente" + index);
                                                scope.cambiarSiNo = false;
                                                scope.onLoadIVR();
                                            },
                                                function (error) {
                                                    console.error('error: ' + error);
                                                });
                                        }
                                        scope.onLoadIVR();
                                        toastr.success("Ivr actualizado correctamente","Acción realizada", viewConfig.toastConfig);
                                        scope.onLoadIVR();
                                        scope.funcionMenuPrincipal(0);
                                        scope.resetearValores();
                                        scope.listadeOpcionesIVRdeEditarIVR = [];
                                    } else if (result.estado == 0 || result.estado == -1) {
                                        console.error('Error: ' + result.mensaje);
                                        toastr.remove();
                                        toastr.error("Error al guardar Ivr", "Error", viewConfig.toastConfig);
                                    }
                                },
                                    function (error) {
                                        console.error('error: ' + error);
                                        toastr.remove();
                                        toastr.error("Error de consulta", "Error", viewConfig.toastConfig);
                                    }
                                );
                            } else {
                                toastr.remove();
                                toastr.error("archivo no permitido", "Error", viewConfig.toastConfig);
                            }
                        };
                        reader.onerror = function (error) {
                            console.log('Error: ', error);
                        };
                    } else {
                        scope.frmData.editar.request.pNoAudioBase64 = "";
                        scope.saving=true;
                        ivrOpcionService.editar(scope.dataInfo).post({}, scope.frmData.editar.request, function (result) {
                            if (result.estado == 1) {
                                //  listadeOpcionesIVRdeEditarIVR
                                for (index = scope.listadeOpcionesIVRdeEditarIVR.length - 1; index >= 0; --index) {
                                    scope.listadeOpcionesIVRdeEditarIVR[index].pIdPadre = scope.checkArray[0].id;
                                    ivrOpcionService.crear(scope.dataInfo).post({}, scope.listadeOpcionesIVRdeEditarIVR[index], function (result) {
                                        // console.log("se registro correstamente" + index);
                                        scope.cambiarSiNo = false;
                                        scope.onLoadIVR();
                                    },
                                        function (error) {
                                            console.error('error: ' + error);
                                            toastr.remove();
                                            toastr.error("Error en creacion de elemento", "Error", viewConfig.toastConfig);
                                        });
                                }
                                scope.myFile = "";
                                scope.onLoadIVR();
                                toastr.success("Ivr actualizado correctamente","Acción realizada", viewConfig.toastConfig);
                                scope.onLoadIVR();
                                scope.funcionMenuPrincipal(0);
                                scope.resetearValores();
                                scope.listadeOpcionesIVRdeEditarIVR = [];
                            } else if (result.estado == 0 || result.estado == -1) {
                                console.error('Error: ' + result.mensaje);
                                toastr.remove();
                                toastr.error("Error al guardar Ivr", "Error", viewConfig.toastConfig);
                            }
                        },
                            function (error) {
                                console.error('error: ' + error);
                                scope.cambiarSiNo = false;
                                toastr.remove();
                                toastr.error("Error de consulta", "Error", viewConfig.toastConfig);
                            }
                        );
                    }
                }
            }

            scope.arrayGrupoHorario = [];
            scope.idIvrOpcion = {
                idIvrOpcion:null
            };
            scope.funListarGrupoHorario = function () {
                ivrOpcionService.listarGrupoHorario(scope.dataInfo).post({}, scope.idIvrOpcion, function (result) {
                    if (result.estado == 1) {
                        scope.arrayGrupoHorario = result.lsItems;
                        // console.log(result.lsItems);
                    } else if (result.estado == 0 || result.estado == -1) {
                        console.error('Error: ' + result.mensaje);
                    }
                },
                    function (error) {
                        console.error('error: ' + error);
                        toastr.remove();
                        toastr.error("Error de consulta", "Error", viewConfig.toastConfig);
                    }
                );
            }

            scope.ejecutarEditarIvrRef = function () {
                scope.frmData.editar.request.pNoDescripcion.toString();
                scope.frmData.editar.request.pNoAudioBase64 = "";
                ivrOpcionService.editar(scope.dataInfo).post({}, scope.frmData.editar.request, function (result) {
                    if (result.estado == 1) {
                        toastr.success( "Ivr actualizado correctamente", "Acción realizada",viewConfig.toastConfig);
                        scope.onLoadIVR();
                        scope.funcionMenuPrincipal(0);
                        scope.resetearValores();
                    } else if (result.estado == 0 || result.estado == -1) {
                        console.error('Error: ' + result.mensaje);
                        toastr.remove();
                        toastr.error("Error al guardar Ivr", "Error", viewConfig.toastConfig);
                    }
                },
                    function (error) {
                        console.error('error: ' + error);
                        toastr.remove();
                        toastr.error("Error de consulta", "Error", viewConfig.toastConfig);
                    }
                );
            }

            scope.ejecutareditarOpcion = function () {
                var temporalist = scope.frmData.editar.request.pNuAnexo;

                /*
                if(validator.isNumberAnnex( scope.nuAnexo); ){
                }else {
                }*/

                if (scope.frmData.editar.request.pNuAnexo !== undefined) {
                    var tam = temporalist;
                    //&& validator.isNumberAnnex(tam) == true
                    if (tam <= 99999 && validator.isNumberAnnex(tam) == true) {
                        scope.frmData.editar.request.pNuAnexo.toString();
                        scope.frmData.editar.request.pNoAudioBase64 = "";
                        ivrOpcionService.editar(scope.dataInfo).post({}, scope.frmData.editar.request, function (result) {
                            if (result.estado == 1) {
                                toastr.success( "Ivr actualizado correctamente", "Acción realizada",viewConfig.toastConfig);
                                scope.onLoadIVR();
                                scope.funcionMenuPrincipal(0);
                                scope.resetearValores();
                            } else if (result.estado == 0 || result.estado == -1) {
                                console.error('Error: ' + result.mensaje);
                                toastr.remove();
                                toastr.error("Error al guardar Ivr", "Error", viewConfig.toastConfig);
                            }
                        },
                            function (error) {
                                console.error('error: ' + error);
                                toastr.remove();
                                toastr.error("Error de consulta", "Error", viewConfig.toastConfig);
                            }
                        );
                    } else {
                        toastr.remove();
                        toastr.error("Numero de anexo muy largo max 5 caracteres.", "Error", viewConfig.toastConfig);
                    }
                } else {
                    toastr.remove();
                    toastr.error("Numero de anexo inválido. Considerar que debe ser max 5 caracteres.", "Error", viewConfig.toastConfig);
                }
            }

            scope.validarExtension =function(){
                if(scope.myFile!=null){
                    if(scope.myFile!=""){
                        var extension = scope.myFile.name.split('.').pop().toLowerCase();
                        if(extension != 'mp3' && extension != 'wav'){
                            return true;
                        }else{
                            return false;
                        }    
                    }
                }            
            }

            scope.validarRepetido = 0;
            scope.validarCampos = true;
            scope.validarCampoNombre = false;
            scope.validarCampoNombre1 = false;
            scope.validarCampoAudio = false;
            scope.validacionCrear = function () {
                if (scope.frmData.crear.request.pNoNombre == null || scope.frmData.crear.request.pNoNombre == "") {
                    scope.validarRepetido = 0;
                    scope.validarCampoNombre = false;
                } else {
                    scope.validarCampoNombre = true;
                    if (scope.validarNombre(scope.frmData.crear.request.pNoNombre) == 0) {
                        scope.validarRepetido = 0;
                        scope.validarCampoNombre1 = true;
                    } else {
                        scope.validarRepetido = 1;
                        scope.validarCampoNombre1 = false;
                    }
                }

                // if (scope.myFile.name== null || scope.myFile.name== "") {
                //     scope.validarCampoAudio = false;
                // } else {
                //     scope.validarCampoAudio = true;
                // }  

                // console.log("camponombre "+scope.validarCampoNombre);
                // console.log("audio "+scope.validarCampoAudio);
                // console.log("repetido "+scope.validarCampoNombre1);
                // scope.validarCampoAudio==true && 
                if (scope.validarCampoNombre == true && scope.validarCampoNombre1 == true) {
                    scope.validarCampos = false;
                } else {
                    scope.validarCampos = true;
                }
            }

            scope.validarCamposEdit = false;
            scope.validarCampoNombreEdit = false;
            scope.validacionEdit = function () {
                if (scope.frmData.editar.request.pNoNombre == null || scope.frmData.editar.request.pNoNombre == "") {
                    scope.validarRepetido = 0;
                    scope.validarCampoNombreEdit = false;
                } else {
                    scope.validarCampoNombreEdit = true;
                }
                if (scope.validarCampoNombreEdit == true) {
                    scope.validarCamposEdit = false;
                } else {
                    scope.validarCamposEdit = true;
                }
            }

            scope.validarRepetidoOpcionCrear = 0;
            scope.validarCamposOpCrear = true;
            scope.validarCamposOpcionCrear = false;
            scope.validarCamposOpcionCrear1 = false;
            scope.validacionCrearOpcionIvr = function () {
                if (scope.objListaopcionCrear.pIdtipo == 1) {
                    if (scope.objListaopcionCrear.pNoNombre == null || scope.objListaopcionCrear.pNoNombre == "") {
                        scope.validarRepetidoOpcionCrear = 0;
                        scope.validarCamposOpcionCrear = false;
                    } else {
                        scope.validarCamposOpcionCrear = true;
                        if (scope.validarNombre(scope.objListaopcionCrear.pNoNombre) == 0) {
                            scope.validarRepetidoOpcionCrear = 0;
                            scope.validarCamposOpcionCrear1 = true;
                        } else {
                            scope.validarRepetidoOpcionCrear = 1;
                            scope.validarCamposOpcionCrear1 = false;
                        }
                    }
                    if (scope.validarCamposOpcionCrear == true && scope.validarCamposOpcionCrear1 == true) {
                        scope.validarCamposOpCrear = false;
                    } else {
                        scope.validarCamposOpCrear = true;
                    }                
                }
            }

            scope.limpiarCampoOpcion = function () {
                scope.objListaopcionCrear.pNoNombre = "";
                scope.validarRepetidoOpcionCrear = 0;
            }

            scope.validarNombre = function (nombreIVR) {
                var valiNom = 0;
                for (index = scope.model.jsTreeData.length - 1; index >= 0; --index) {
                    if (scope.model.jsTreeData[index].parent == "#" && scope.model.jsTreeData[index].pNoNombre == nombreIVR) {
                        valiNom = 1;
                    }
                }
                return valiNom;
            }

            scope.saving=false;
            scope.crearIvr = function () {
                // console.log(scope.frmData.editar.request.pNoAudioBase64);
                var variableAnexoEncontrado = -1;
                if (scope.frmData.crear.preview.checkMarcaAnexoTiempo == true || scope.frmData.crear.preview.checkMarcaAnexoTiempo == 1) {
                    scope.anexosListaAutocompletar("");
                    for (index = scope.anexosListaSeleccion.length - 1; index >= 0; --index) {
                        if (scope.anexosListaSeleccion[index] == scope.frmData.crear.request.pNoAnexoTiempo) {
                            variableAnexoEncontrado = 1;
                            break;
                        } else {
                            variableAnexoEncontrado = 0;
                        }
                    }
                }
                if (scope.anexosListaSeleccion.length == 0 || scope.anexosListaSeleccion.length == -1) {
                    variableAnexoEncontrado = 1;
                }
                if (scope.anexosListaSeleccion.length == 0 && (scope.frmData.crear.preview.checkMarcaAnexoTiempo == true || scope.frmData.crear.preview.checkMarcaAnexoTiempo == 1)) {
                    toastr.remove();
                    toastr.error("Anexo es obligatorio", "Error", viewConfig.toastConfig);
                } else if (variableAnexoEncontrado == 0) {
                    toastr.remove();
                    toastr.error("Anexo incorrecto", "Error", viewConfig.toastConfig);
                } else if (scope.frmData.crear.request.pNoNombre == null || scope.frmData.crear.request.pNoNombre == "") {
                    toastr.remove();
                    toastr.error("Falta llenar Campo Nombre", "Error", viewConfig.toastConfig);
                } else if (scope.myFile == "" || scope.myFile == null || scope.myFile == undefined) {
                    toastr.remove();
                    toastr.error("Falta seleccionar Audio", "Error", viewConfig.toastConfig);
                }else if(scope.validarExtension()==true){
                    toastr.remove();
                    toastr.error("Audio debe de ser mp3 o wav", "Error", viewConfig.toastConfig);                    
                }
                else {
                    if (scope.validarNombre(scope.frmData.crear.request.pNoNombre) == 0) {
                        if (scope.frmData.crear.preview.checkMarcaAnexo == true) {
                            scope.frmData.crear.request.pMarcaAnexo = 1;
                        } else {
                            scope.frmData.crear.request.pMarcaAnexo = 0;
                        }      
                        if (scope.frmData.crear.preview.checkMarcaAnexoTiempo == true) {
                            scope.frmData.crear.request.pOperadora = 1;
                        } else {
                            scope.frmData.crear.request.pOperadora = 0;
                        }      
                        if (scope.myFile != "" && scope.myFile != null && scope.myFile !== undefined) {
                            //if(scope.cambiarSiNo == true){
                            var reader = new FileReader();
                            scope.frmData.crear.request.pNoAudio = scope.myFile.name;
                            reader.readAsDataURL(scope.myFile);
                            reader.onload = function () {
                                scope.temporal = reader.result;
                                var resp1 = 100;
                                resp1 = scope.temporal.search("mp3");
                                var resp2 = 100;
                                resp2 = scope.temporal.search("wav");
                                if (resp1 >= 0 || resp2 >= 0) {
                                    scope.temporal = scope.temporal.replace("data:audio/wav;base64,", "");
                                    scope.temporal = scope.temporal.replace("data:audio/mp3;base64,", "");
                                    scope.frmData.crear.request.pNoAudioBase64 = scope.temporal;
                                    scope.saving=true;
                                    ivrOpcionService.crear(scope.dataInfo).post({}, scope.frmData.crear.request, function (result) {
                                        if (result.mensaje == "Ok.") {
                                            for (index = scope.listadeOpciones.length - 1; index >= 0; --index) {
                                                scope.listadeOpciones[index].pIdPadre = result.id;
                                                ivrOpcionService.crear(scope.dataInfo).post({}, scope.listadeOpciones[index], function (result) {
                                                    //console.log("se registro correstamente" + index);
                                                },
                                                    function (error) {
                                                        console.error('error: ' + error);
                                                    });
                                            }
                                            scope.myFile = "";
                                            scope.onLoadIVR();
                                            toastr.success("Ivr agregado correctamente","Acción realizada", viewConfig.toastConfig);
                                            scope.onLoadIVR();
                                            scope.resetearValores();
                                            scope.funcionMenuPrincipal(0);
                                        } else if (result.estado == 0 || result.estado == -1) {
                                            console.error('Error: ' + result.mensaje);
                                        }
                                    },
                                        function (error) {
                                            console.error('error: ' + error);
                                            toastr.error("Error en creacion", "Error", viewConfig.toastConfig);
                                        }
                                    );
                                } else {
                                    toastr.remove();
                                    toastr.error("archivo no permitido", "Error", viewConfig.toastConfig);
                                }
                            };
                            reader.onerror = function (error) {
                                console.log('Error: ', error);
                            };
                        }
                        else {
                            scope.frmData.crear.request.pNoAudioBase64 = "";
                            scope.saving=true;
                            ivrOpcionService.crear(scope.dataInfo).post({}, scope.frmData.crear.request, function (result) {
                                if (result.mensaje == "Ok.") {
                                    for (index = scope.listadeOpciones.length - 1; index >= 0; --index) {
                                        scope.listadeOpciones[index].pIdPadre = result.id;
                                        ivrOpcionService.crear(scope.dataInfo).post({}, scope.listadeOpciones[index], function (result) {
                                            //console.log("se registro correstamente" + index);

                                        },
                                            function (error) {
                                                console.error('error: ' + error);
                                                toastr.remove();
                                                toastr.error("Error de creacion", "Error", viewConfig.toastConfig);
                                            });
                                    }
                                    scope.myFile = "";
                                    scope.onLoadIVR();
                                    toastr.success("Ivr agregado correctamente","Acción realizada", viewConfig.toastConfig);
                                    scope.onLoadIVR();
                                    scope.resetearValores();
                                    scope.funcionMenuPrincipal(0);
                                } else if (result.estado == 0 || result.estado == -1) {
                                    console.error('Error: ' + result.mensaje);
                                    toastr.remove();
                                    toastr.error("Error", "Error ", viewConfig.toastConfig);
                                }
                            },
                                function (error) {
                                    console.error('error: ' + error);
                                    toastr.remove();
                                    toastr.error("Error", "Error ", viewConfig.toastConfig);
                                }
                            );
                        }
                    }
                    else {
                        toastr.remove();
                        toastr.error("Nombre ya existe", "Error", viewConfig.toastConfig);
                    }
                }
                scope.onLoadIVR();
            }

            scope.arreDeOpciones = [];
            scope.vaciarArreglo = function () {
                scope.arreDeOpciones = [];
            }

            scope.cargarArreglo = function () {
                if(scope.checkArray.length!=0){
                    for (index = scope.model.jsTreeData.length - 1; index >= 0; --index) {
                        if (scope.model.jsTreeData[index].pIdPadre == scope.checkArray[0].id) {
                            scope.arreDeOpciones.push(scope.model.jsTreeData[index]);
                        }
                    }
                }
            }

            scope.variableOpcionAgregarCB;

            scope.cargaListaEditarOpcionIVR = function () {
                var InterobjListaopcionCrear = {
                    pIdPadre: 0,
                    pNoDescripcion: "",
                    pNoAudio: "",
                    pNuAnexo: "",
                    pIdtipo: 0,
                    pNoValor: "",
                    pNoNombre: "",
                    pIdGrupo: 0,
                    pNoAnexoTiempo: "",
                    pVuelveInicioTiempo: 0,
                    pVuelveInicioIncorrecto: 0,
                    pNoAnexoIncorrecto: "",
                    pMarcaAnexo: 0,
                    pOperadora: 0,
                    pTiempoEspera: 0
                }
                if (scope.opcionesEditar.length <= 12
                    && scope.objListaopcionCrear.pNoValor != ""
                    && scope.objListaopcionCrear.pIdtipo != null && scope.objListaopcionCrear.pIdtipo != "") {

                    if (isNaN(scope.objListaopcionCrear.pNuAnexo) == false && scope.validarRepetidoOpcionCrear != 1) {

                        var temporalist = scope.objListaopcionCrear.pNuAnexo;
                        var tam = temporalist;
                        if (tam <= 99999) {

                            var repetido = 0;
                            for (index = scope.opcionesEditar.length - 1; index >= 0; --index) {
                                if (scope.opcionesEditar[index].pNoValor == scope.objListaopcionCrear.pNoValor) {
                                    repetido = 1;
                                }
                            }
                            if (repetido == 0) {
                                if ((scope.objListaopcionCrear.pIdtipo == "1" && scope.objListaopcionCrear.pNoNombre != "" &&
                                    scope.objListaopcionCrear.pNoNombre != null) ||
                                    (scope.objListaopcionCrear.pIdtipo == "2" && scope.objListaopcionCrear.pNuAnexo != "" &&
                                        scope.objListaopcionCrear.pNoNombre != "" && scope.objListaopcionCrear.pNoNombre != null) ||
                                    (scope.objListaopcionCrear.pIdtipo == "3" && scope.variableOpcionAgregarCB >= 0)) {

                                    InterobjListaopcionCrear.pIdPadre = scope.objListaopcionCrear.pIdPadre;
                                    if (scope.variableOpcionAgregarCB >= 0) {
                                        var sdf = scope.variableOpcionAgregarCB.toString();
                                        InterobjListaopcionCrear.pNoDescripcion = sdf;
                                    } else {
                                        InterobjListaopcionCrear.pNoDescripcion = scope.objListaopcionCrear.pNoDescripcion;
                                    }
                                    InterobjListaopcionCrear.pNoAudio = scope.objListaopcionCrear.pNoAudio;
                                    InterobjListaopcionCrear.pNuAnexo = scope.objListaopcionCrear.pNuAnexo;
                                    InterobjListaopcionCrear.pIdtipo = scope.objListaopcionCrear.pIdtipo;
                                    InterobjListaopcionCrear.pNoValor = scope.objListaopcionCrear.pNoValor;
                                    InterobjListaopcionCrear.pNoNombre = scope.objListaopcionCrear.pNoNombre;
                                    InterobjListaopcionCrear.pIdGrupo = scope.objListaopcionCrear.pIdGrupo;
                                    InterobjListaopcionCrear.pNoAnexoTiempo = scope.objListaopcionCrear.pNoAnexoTiempo;
                                    InterobjListaopcionCrear.pVuelveInicioIncorrecto = scope.objListaopcionCrear.pVuelveInicioIncorrecto;
                                    InterobjListaopcionCrear.pNoAnexoIncorrecto = scope.objListaopcionCrear.pNoAnexoIncorrecto;
                                    InterobjListaopcionCrear.pMarcaAnexo = scope.objListaopcionCrear.pMarcaAnexo;
                                    InterobjListaopcionCrear.pOperadora = scope.objListaopcionCrear.pOperadora;
                                    InterobjListaopcionCrear.pVuelveInicioTiempo = scope.objListaopcionCrear.pVuelveInicioTiempo;
                                    InterobjListaopcionCrear.pTiempoEspera = scope.objListaopcionCrear.pTiempoEspera;

                                    if (InterobjListaopcionCrear.pIdtipo == 3) {
                                        for (index = scope.listaDeIvrApuntar.length - 1; index >= 0; --index) {
                                            if (scope.listaDeIvrApuntar[index].idIvrCop == InterobjListaopcionCrear.pNoDescripcion) {
                                                InterobjListaopcionCrear.pNoNombre = scope.listaDeIvrApuntar[index].pNoNombre;
                                            }
                                        }
                                    }
                                    scope.opcionesEditar.push(InterobjListaopcionCrear);
                                    scope.listadeOpcionesIVRdeEditarIVR.push(InterobjListaopcionCrear);
                                    scope.objListaopcionCrear.pIdPadre = 0;
                                    scope.objListaopcionCrear.pNoDescripcion = "";
                                    scope.objListaopcionCrear.pNoAudio = "";
                                    scope.objListaopcionCrear.pNuAnexo = "";
                                    scope.objListaopcionCrear.pIdtipo = null;
                                    scope.objListaopcionCrear.pNoValor = "";
                                    scope.objListaopcionCrear.pNoNombre = "";
                                    scope.objListaopcionCrear.pIdGrupo = null;
                                    scope.objListaopcionCrear.pNoAnexoTiempo = "";
                                    scope.objListaopcionCrear.pVuelveInicioTiempo = 1;
                                    scope.objListaopcionCrear.pVuelveInicioIncorrecto = 1;
                                    scope.objListaopcionCrear.pNoAnexoIncorrecto = "";
                                    scope.objListaopcionCrear.pMarcaAnexo = 0;
                                    scope.objListaopcionCrear.pOperadora = 0;
                                    scope.objListaopcionCrear.pTiempoEspera = 1;
                                    scope.variableOpcionAgregar = null;
                                } else {
                                    toastr.remove();
                                    toastr.error("Falta llenar campos obligatorios", "Error", viewConfig.toastConfig);
                                }
                            }
                            else {
                                toastr.remove();
                                toastr.error("Codigo repetido", "Error", viewConfig.toastConfig);
                            }
                        } else {
                            toastr.remove();
                            toastr.error("Verificar Datos ingresados, número de anexo demasiado largo", "Error", viewConfig.toastConfig);
                        }
                    }
                    else {
                        toastr.remove();
                        toastr.error("Verificar Datos ingresados", "Error", viewConfig.toastConfig);
                    }
                } else {
                    toastr.remove();
                    toastr.error("No se puede agregar", "Error", viewConfig.toastConfig);
                }
            }

            scope.resetearValores = function () {
                scope.frmData.crear.request.pIdPadre = 0;
                scope.frmData.crear.request.pNoDescripcion = "";
                scope.frmData.crear.request.pNoAudio = "";
                scope.frmData.crear.request.pNuAnexo = "";
                scope.frmData.crear.request.pIdtipo = 1;
                scope.frmData.crear.request.pNoValor = "";
                scope.frmData.crear.request.pNoNombre = "";
                scope.frmData.crear.request.pNoAudioBase64 = "";
                scope.frmData.crear.request.pIdGrupo = null;
                scope.frmData.crear.request.pNoAnexoTiempo = "";
                scope.frmData.crear.request.pVuelveInicioIncorrecto = 1;
                scope.frmData.crear.request.pNoAnexoIncorrecto = "";
                scope.frmData.crear.request.pMarcaAnexo = 1;
                scope.frmData.crear.request.pOperadora = 1;
                scope.frmData.crear.request.pVuelveInicioTiempo = 1;
                scope.frmData.crear.request.pTiempoEspera = 1;

                scope.frmData.editar.request.pIdPadre = 0;
                scope.frmData.editar.request.pIdIvrCop = 0;
                scope.frmData.editar.request.pNoDescripcion = "";
                scope.frmData.editar.request.pNoAudio = "";
                scope.frmData.editar.request.pNoAudioBase64 = "";
                scope.frmData.editar.request.pNuAnexo = "";
                scope.frmData.editar.request.pIdtipo = 0;
                scope.frmData.editar.request.pNoValor = "";
                scope.frmData.editar.request.pNoNombre = "";
                scope.frmData.editar.request.pIdGrupo = 0;
                scope.frmData.editar.request.pNoAnexoTiempo = "";
                scope.frmData.editar.request.pVuelveInicioIncorrecto = 0;
                scope.frmData.editar.request.pNoAnexoIncorrecto = "";
                scope.frmData.editar.request.pMarcaAnexo = 0;
                scope.frmData.editar.request.pOperadora = 0;
                scope.frmData.editar.request.pVuelveInicioTiempo = 0;
                scope.frmData.editar.request.pTiempoEspera = 0;
            }


            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            scope.listadeOpciones = [];
            scope.cargaListaCrearRaiz = function () {
                //scope.resetearValores();
                var InterobjListaopcionCrear = {
                    pIdPadre: 0,
                    pNoDescripcion: "",
                    pNoAudio: "",
                    pNuAnexo: "",
                    pIdtipo: 0,
                    pNoValor: "",
                    pNoNombre: "",
                    pIdGrupo: 0,
                    pNoAnexoTiempo: "",
                    pVuelveInicioTiempo: 0,
                    pVuelveInicioIncorrecto: 0,
                    pNoAnexoIncorrecto: "",
                    pMarcaAnexo: 0,
                    pOperadora: 0,
                    pTiempoEspera: 0
                }
                if (scope.listadeOpciones.length <= 12 &&
                    scope.objListaopcionCrear.pNoValor != "" &&
                    scope.objListaopcionCrear.pIdtipo != null && scope.objListaopcionCrear.pIdtipo != "") {

                    if (isNaN(scope.objListaopcionCrear.pNuAnexo) == false && scope.validarRepetidoOpcionCrear != 1) {
                        var repetido = 0;
                        for (index = scope.listadeOpciones.length - 1; index >= 0; --index) {
                            if (scope.listadeOpciones[index].pNoValor == scope.objListaopcionCrear.pNoValor) {
                                repetido = 1;
                            }
                        }
                        if (repetido == 0) {
                            if ((scope.objListaopcionCrear.pIdtipo == "1" && scope.objListaopcionCrear.pNoNombre != "" &&
                                scope.objListaopcionCrear.pNoNombre != null) ||
                                (scope.objListaopcionCrear.pIdtipo == "2" && scope.objListaopcionCrear.pNuAnexo != "" &&
                                    scope.objListaopcionCrear.pNoNombre != "" && scope.objListaopcionCrear.pNoNombre != null) ||
                                (scope.objListaopcionCrear.pIdtipo == "3" && scope.variableOpcionAgregarCB >= 0)) {

                                InterobjListaopcionCrear.pIdPadre = scope.objListaopcionCrear.pIdPadre;
                                if (scope.variableOpcionAgregarCB >= 0) {
                                    var sdf = scope.variableOpcionAgregarCB.toString();
                                    InterobjListaopcionCrear.pNoDescripcion = sdf;
                                } else {
                                    InterobjListaopcionCrear.pNoDescripcion = scope.objListaopcionCrear.pNoDescripcion;
                                }
                                //InterobjListaopcionCrear.pNoDescripcion = scope.objListaopcionCrear.pNoDescripcion;
                                InterobjListaopcionCrear.pNoAudio = scope.objListaopcionCrear.pNoAudio;
                                InterobjListaopcionCrear.pIdtipo = scope.objListaopcionCrear.pIdtipo;
                                InterobjListaopcionCrear.pNoValor = scope.objListaopcionCrear.pNoValor;
                                //   if(scope.objListaopcionCrear.pIdtipo == "2"){
                                InterobjListaopcionCrear.pNuAnexo = scope.objListaopcionCrear.pNuAnexo;
                                InterobjListaopcionCrear.pNoNombre = scope.objListaopcionCrear.pNoNombre;
                                //   }else{

                                //   }
                                InterobjListaopcionCrear.pIdGrupo = scope.objListaopcionCrear.pIdGrupo;
                                InterobjListaopcionCrear.pNoAnexoTiempo = scope.objListaopcionCrear.pNoAnexoTiempo;
                                InterobjListaopcionCrear.pVuelveInicioIncorrecto = scope.objListaopcionCrear.pVuelveInicioIncorrecto;
                                InterobjListaopcionCrear.pNoAnexoIncorrecto = scope.objListaopcionCrear.pNoAnexoIncorrecto;
                                InterobjListaopcionCrear.pMarcaAnexo = scope.objListaopcionCrear.pMarcaAnexo;
                                InterobjListaopcionCrear.pOperadora = scope.objListaopcionCrear.pOperadora;
                                InterobjListaopcionCrear.pVuelveInicioTiempo = scope.objListaopcionCrear.pVuelveInicioTiempo;
                                InterobjListaopcionCrear.pTiempoEspera = scope.objListaopcionCrear.pTiempoEspera;

                                if (InterobjListaopcionCrear.pIdtipo == 3) {
                                    for (index = scope.listaDeIvrApuntar.length - 1; index >= 0; --index) {
                                        if (scope.listaDeIvrApuntar[index].idIvrCop == InterobjListaopcionCrear.pNoDescripcion) {
                                            InterobjListaopcionCrear.pNoNombre = scope.listaDeIvrApuntar[index].pNoNombre;
                                        }
                                    }
                                }
                                //InterobjListaopcionCrear.pNoNombre =
                                scope.listadeOpciones.push(InterobjListaopcionCrear);
                                scope.listadeOpcionesIVRdeEditarIVR.push(InterobjListaopcionCrear);
                                scope.objListaopcionCrear.pIdPadre = 0;
                                scope.objListaopcionCrear.pNoDescripcion = "";
                                scope.objListaopcionCrear.pNoAudio = "";
                                scope.objListaopcionCrear.pNuAnexo = "";
                                scope.objListaopcionCrear.pIdtipo = null;
                                scope.objListaopcionCrear.pNoValor = "";
                                scope.objListaopcionCrear.pNoNombre = "";
                                scope.objListaopcionCrear.pIdGrupo = null;
                                scope.objListaopcionCrear.pNoAnexoTiempo = "";
                                scope.objListaopcionCrear.pVuelveInicioTiempo = 1;
                                scope.objListaopcionCrear.pVuelveInicioIncorrecto = 1;
                                scope.objListaopcionCrear.pNoAnexoIncorrecto = "";
                                scope.objListaopcionCrear.pMarcaAnexo = 0;
                                scope.objListaopcionCrear.pOperadora = 0;
                                scope.objListaopcionCrear.pTiempoEspera = 1;
                            } else {
                                toastr.remove();
                                toastr.error("Falta llenar campos obligatorios", "Error", viewConfig.toastConfig);
                            }
                        }
                        else {
                            toastr.remove();
                            toastr.error("Codigo repetido", "Error", viewConfig.toastConfig);
                        }
                    }
                    else {
                        toastr.remove();
                        toastr.error("Verificar Datos ingresados", "Error", viewConfig.toastConfig);
                    }
                } else {
                    toastr.remove();
                    toastr.error("Verificar Datos ingresados", "Error", viewConfig.toastConfig);
                }
            }

            ////////////////////////////////////////////////////LISTA DINAMICA DE IOCIONES////////////////////////////////////////////////////////////////7
            /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
            scope.eliminarNodo = function () {
                // scope.funcionMenuPrincipal(3);
                if(scope.checkArray!=null){
                    scope.buscarSelect();
                    scope.vaciarArreglo();
                    scope.cargarArreglo();
                    scope.frmData.eliminar.modalDelete.deleteRequest.pIdIvrCop = scope.checkArray[0].id;             
                    scope.frmData.eliminar.modalDelete.deleteRequest.pIdIvrNombre = scope.checkArray[0].text;             
                    scope.nombreIvrEliminar=scope.checkArray[0].id;   
                    var modalInstance = $uibModal.open({
                        templateUrl: 'src/components/gestionIvrOpcion/gestionIvrOpcionDelete/gestionIvrDelete.template.html',
                        controller: 'gestionIvrOpcionDeleteCtrl as ctrl',
                        size: 'sm',

                        resolve: {
                            dataModal: function () {
                                scope.frmData.eliminar.modalDelete.deleteRequest.noLoginCreador = scope.dataInfo.codUsuario;
                                scope.frmData.eliminar.modalDelete.deleteRequest.idInstancia = scope.dataInfo.idInstancia;
                                return scope.frmData.eliminar.modalDelete;
                            }
                        }
                    });
                    modalInstance.result.then(function () {
                        scope.onLoadIVR();
                        scope.funcionMenuPrincipal(0);
                    });
                }
            }

            scope.opcionesEditar = [];
            scope.vaciarArrayOpcionesEditar = function () {
                scope.opcionesEditar = [];
            }

            scope.listadeOpcionesIVRdeEditarIVR = [];
            scope.listaDeIvrApuntar = [];


            scope.cargaEditar = function () {
                scope.listaDeIvrApuntar = [];
                scope.listadeOpciones = [];
                scope.listadeOpcionesIVRdeEditarIVR = [];
                scope.buscarSelect();               
                scope.vaciarArrayOpcionesEditar();
                if(scope.checkArray.length!=0){
                    scope.idIvrOpcion.idIvrOpcion=scope.checkArray[0].id;
                    scope.funListarGrupoHorario();                     
                    for (index = scope.model.jsTreeData.length - 1; index >= 0; --index) {
                        if (scope.model.jsTreeData[index].id == scope.checkArray[0].id) {
                            scope.frmData.editar.request.pIdIvrCop = scope.model.jsTreeData[index].id;
                            scope.frmData.editar.request.pIdPadre = scope.model.jsTreeData[index].pIdPadre;
                            scope.frmData.editar.request.pNoDescripcion = scope.model.jsTreeData[index].pNoDescripcion;
                            scope.frmData.editar.request.pNoAudio = scope.model.jsTreeData[index].pNoAudio;
                            scope.frmData.editar.request.pNuAnexo = Number(scope.model.jsTreeData[index].pNuAnexo);
                            scope.frmData.editar.request.pIdtipo = scope.model.jsTreeData[index].pIdtipo;
                            scope.frmData.editar.request.pNoValor = scope.model.jsTreeData[index].pNoValor;
                            scope.frmData.editar.request.pNoNombre = scope.model.jsTreeData[index].pNoNombre;
                            //  + " " +"codigo: " + " " + scope.model.jsTreeData[index].pNoValor;
                            scope.frmData.editar.request.pIdGrupo = scope.model.jsTreeData[index].pIdGrupo;
                            scope.frmData.editar.request.pNoAnexoTiempo = scope.model.jsTreeData[index].pNoAnexoTiempo;
                            scope.frmData.editar.request.pVuelveInicioIncorrecto = scope.model.jsTreeData[index].pVuelveInicioIncorrecto;
                            scope.frmData.editar.request.pNoAnexoIncorrecto = scope.model.jsTreeData[index].pNoAnexoIncorrecto;
                            scope.frmData.editar.request.pMarcaAnexo = scope.model.jsTreeData[index].pMarcaAnexo;
                            scope.frmData.editar.request.pOperadora = scope.model.jsTreeData[index].pOperadora;
                            scope.frmData.editar.request.pVuelveInicioTiempo = scope.model.jsTreeData[index].pVuelveInicioTiempo;
                            scope.frmData.editar.request.pTiempoEspera = scope.model.jsTreeData[index].pTiempoEspera;

                            if (scope.frmData.editar.request.pIdtipo == 3) {
                                scope.frmData.editar.request.pNoDescripcion = Number(scope.frmData.editar.request.pNoDescripcion);
                            }
                            if(scope.frmData.editar.request.pNoAnexoTiempo!=null || scope.frmData.editar.request.pNoAnexoTiempo!=""){
                            scope.anexosListaAutocompletar(scope.frmData.editar.request.pNoAnexoTiempo); 
                            }                            
                        }

                        if (scope.model.jsTreeData[index].pIdPadre == scope.checkArray[0].id) {
                            scope.opcionesEditar.push(scope.model.jsTreeData[index]);
                        }
                        if (scope.model.jsTreeData[index].pIdtipo == 1) {
                            scope.listaDeIvrApuntar.push(scope.model.jsTreeData[index]);
                        }
                    }
                }

                if (scope.frmData.editar.request.pMarcaAnexo == 1) {
                    // scope.frmData.editar.request.pMarcaAnexo = 1;
                    scope.frmData.editar.preview.checkMarcaAnexo = 1;
                } else {
                    scope.frmData.editar.preview.checkMarcaAnexo = 0;
                }      // empieza
                if (scope.frmData.editar.request.pOperadora == 1) {
                    scope.frmData.editar.preview.checkMarcaAnexoTiempo = 1;
                } else {
                    scope.frmData.editar.preview.checkMarcaAnexoTiempo = 0;
                }      // empieza
                if (scope.frmData.editar.request.pIdtipo == 1) //Opcion
                {
                    scope.funcionMenuPrincipal(4);
                }
                else if (scope.frmData.editar.request.pIdtipo == 2) // ivr
                {
                    scope.funcionMenuPrincipal(2);
                }
                else if (scope.frmData.editar.request.pIdtipo == 3) {
                    scope.funcionMenuPrincipal(5);
                }
            }



            scope.model = {
                jsTreeData: []
            }

            scope.datos = {
                nombre: "",
                descripcion: "",
                audio: ""
            }
            scope.list = [{
                value: 0,
                descripcion: "IVR"
            },
            {
                value: 1,
                descripcion: "Anexo"
            },
            {
                value: 2,
                descripcion: "Ninguno"
            }]

            scope.marcaciones = [{
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            },
            {
                value: 2,
                descripcion: ""
            }
            ];

            scope.model.jsTreeData2 = [
                {
                    "id": "ajson1",
                    "parent": "#",
                    "text": "Fiestas patrias"
                },
                {
                    "id": "ajson2",
                    "parent": "ajson1",
                    "text": "Root node 2"
                },
                {
                    "id": "ajson3",
                    "parent": "ajson2",
                    "text": "Child 1"
                },
                {
                    "id": "ajson4",
                    "parent": "ajson2",
                    "text": "Child 2"
                }
            ];

            scope.buscarSelect = function () {
                scope.checkArray= scope.treeInstance.jstree("get_selected",true);
                // console.log(scope.checkArray);
            }
            scope.ignoreChanges = false;

            scope.applyModelChanges = function () {
                return !scope.ignoreChanges;
            }


            scope.anexosLista = [];
            scope.onLoadIVR = function () {
                scope.saving=false;
                scope.idIvrOpcion.idIvrOpcion=null;
                scope.funListarGrupoHorario();
                //scope.listarAnexosXCombo();
                ivrOpcionService.listar(scope.dataInfo).post({}, {}, function (result) {
                    if (result.estado == 1) {
                        scope.variabletemporal = result.listaIvrOpcion;
                        for (index = scope.variabletemporal.length - 1; index >= 0; --index) {
                            if (scope.variabletemporal[index].parent == 0) {
                                scope.variabletemporal[index].parent = "#";
                            }
                            if (scope.variabletemporal[index].parent != "#" && scope.variabletemporal[index].parent != "") {
                                scope.variabletemporal[index].text = "(" + scope.variabletemporal[index].pNoValor + ") " + scope.variabletemporal[index].text;
                            }
                        }
                        scope.model.jsTreeData = scope.variabletemporal;
                        scope.treeConfig.version++;
                    } else if (result.estado == 0 || result.estado == -1) {
                        console.error('Error: ' + result.mensaje);
                        toastr.remove();
                        toastr.error("Error de carga", "Error", viewConfig.toastConfig);
                    }
                },
                    function (error) {
                        console.error('error: ' + error);
                        toastr.remove();
                        toastr.error("Error fatal de carga", "Error", viewConfig.toastConfig);
                    }
                );
            }
            
            scope.onLoadIVR();
        }])
