(
    function() {
        'use strict';
        angular.module('principal')
            .controller('sicSidebarController', ['$scope', '$state', '$location', 'sicSidebarService', 'sicSidebarServices', 'localStorageService', '$timeout',
                function($scope, $state, $location, sicSidebarService, sicSidebarServices, localStorageService, $timeout) {
                    var scope = this;
                    scope.varnab = $location.search();
                    scope.dataInfo = {
                        codUsuario: localStorageService.get("codUsuario"),
                        token: localStorageService.get("token"),
                        idInstancia: scope.varnab.idInstancia
                    };

                    scope.stateBar = false;
                    scope.menuSubItems = [];
                    scope.view = null;
                    



                    scope.goto = function(componentePagina, idInstance, hasItems, idPagPadre, idPagina, namePage) {
                        scope.view = namePage != null ? namePage : scope.view;
                        
                        scope.idInstanceSubMenu = scope.menuItems[0].idInstancia;
                        scope.stateBar = hasItems;
                        //console.log(componentePagina + " " + idInstance + " " + hasItems + " " + idPagPadre + " " + namePage);
                        scope.menuItems.forEach( function(item, index) {
                          if(item.idPagina == idPagPadre) {
                            scope.menuSubItems = [];                            
                            
                            for (var j = 0; j<item.subItem.length; j++) {
                              scope.menuSubItems.push(item.subItem[j]);
                              scope.menuSubItems[j].isActive = j == 0 ? true : false;                             
                            }
                          }
                        });

                        scope.menuItemsNew.forEach( function(item, index) {
                          item.isActive = false;
                          if(item.idPagPadre == idPagPadre) {
                            item.isActive = true;
                          }
                        });

                        scope.menuSubItems.forEach( function(item, index) {
                          item.isActive = false;
                          if(item.idPagina == idPagina) {
                            item.isActive = true;
                          }
                        });

                        if (scope.idInstanceSubMenu == undefined) {

                            $state.go(componentePagina);
                        } else {
                            $state.go(componentePagina, { idInstancia: scope.idInstanceSubMenu });
                        }
                    };


                    /**
                     * [menuItems menu del sidebar]
                     * @type {Array}
                     */
                    scope.menuItems = [];
                    scope.menuItemsNew = [];

                    scope.listadoMenu = function() {
                        if (scope.dataInfo.idInstancia == undefined) {
                            scope.dataInfo.idInstancia = null;
                        }

                        sicSidebarServices.listaMenuSic(scope.dataInfo).post({}, {}, function(result) {
                            
                            if (result.estado == 1) {
                                scope.urlPagina();
                                scope.menuItems = result.menuLista;
                                scope.idInstancia = scope.menuItems[0].idInstancia;
                                scope.menuItems.forEach( function(item, index) {
                                  if(item.subItem) {
                                    var newItem = {};
                                    newItem.idPagPadre = item.subItem[0].idPagPadre;
                                    newItem.idPagina = item.subItem[0].idPagina;
                                    newItem.idTipoMenu = item.subItem[0].idTipoMenu;
                                    //newItem.idInstancia = scope.menuItems[0].idInstancia;
                                    newItem.idInstancia = scope.menuItems[0].idInstancia;
                                    item.subItem[0].idInstancia = scope.menuItems[0].idInstancia;
                                    newItem.nomPagina = item.nomPagina;
                                    newItem.nomUrl = item.subItem[0].nomUrl;
                                    newItem.nomComponente = item.subItem[0].nomComponente;
                                    newItem.hasItems = false;
                                    newItem.isActive = index == 0 ? true : false;

                                    if (item.subItem.length >= 2){
                                      newItem.hasItems = true;
                                    }

                                    scope.menuItemsNew.push(newItem);
                                    
                                  }
                                });
                                
                                //scope.recargaMenu();
                                
                            }

                        }, function(error) {
                            console.log("error :" + error);
                        })
                    };

                    scope.paginaUrlRequest= {};
                    scope.listUrlPagina = [];
                    scope.urlPagina = function(){
                        scope.url = window.location.href;
                        scope.compRuta = scope.url.split("!/")[1];
                        scope.priReplace = scope.compRuta.split('?')[0].replace("/",".");
                        scope.pNoComponente = scope.priReplace;                        
                        scope.paginaUrlRequest.pNoComponente = scope.pNoComponente;
                        sicSidebarServices.listaPaginaUrl(scope.dataInfo).post({},scope.paginaUrlRequest,function(result){
                            if(result.estado == 1){
                                scope.listUrlPagina = result.lsPaginaUrl;
                                scope.idPadre = scope.listUrlPagina[0].idPadre;
                                scope.idPagina = scope.listUrlPagina[0].idPagina;
                                scope.nomComponente = scope.listUrlPagina[0].noComponente;
                                scope.nomUrl = scope.listUrlPagina[0].noUrl;
                                scope.ilPadre = scope.listUrlPagina[0].ilPadre;
                                if(scope.ilPadre == 0){
                                    scope.ilHijos = false;
                                }else if(scope.ilPadre == 1){
                                    scope.ilHijos = true;
                                }

                                console.log(scope.listUrlPagina);
                                console.log(scope.ilHijos);
                                scope.goto( scope.priReplace,
                                             null,
                                             scope.ilHijos,
                                             scope.idPadre,
                                             scope.idPagina,
                                             scope.namePage);   
                                console.log(scope.priReplace+" "+null+" "+scope.ilHijos+" "+scope.idPadre+" "+scope.idPagina+" "+scope.namePage);
                            }
                            else if(result.estado == -1 || result.estado == 0){
                                console.error("error "+error)
                            }
                        })
                    }
                   
                    scope.hoverItem = function($event) {
                        scope.showHoverElem = true;
                        scope.hoverElemHeight = $event.currentTarget.clientHeight;
                        var menuTopValue = 66;
                        scope.hoverElemTop = $event.currentTarget.getBoundingClientRect().top - menuTopValue;
                    };

                    scope.loadSidebar = function() {
                        var path = $location.path();
                        if (path == "/principal") {
                            scope.listadoMenu();

                        }
                        scope.listadoMenu();
                    }

                    scope.loadSidebar();                                  

                    $scope.$on('$stateChangeSuccess', function() {
                        if (sicSidebarService.canSidebarBeHidden()) {
                            sicSidebarService.setMenuCollapsed(true);
                        }
                    });
                }
            ]);
    })();