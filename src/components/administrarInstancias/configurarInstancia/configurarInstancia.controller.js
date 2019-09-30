angular.module('administrarInstancias')
    .controller('configurarInstanciaController',
    [
        '$scope',
        '$log',
        '$timeout',
        'viewConfig',
        'localStorageService',
        '$uibModalInstance',
        'dataModal',
        'gestionInstanciaService',
        'ngProgressFactory',
        'utilService',
        '$rootScope',
        function ($scope, $log, $timeout, viewConfig, localStorageService, $uibModalInstance, dataModal, gestionInstanciaService, ngProgressFactory, utilService, $rootScope) {
            var scope = this;

            $rootScope.isExecuteBash = false;

            $scope.const = {
                bash: {
                    executeSuccess: 1,
                    executeFailure: 0
                }
            }

            $scope.dataInfo = {
                codUsuario: localStorageService.get("codUsuario"),
                token: localStorageService.get("token"),
                idInstancia: dataModal.idInstancia
            }

            $scope.http = {
                executeBash: {
                    request: {
                        statusBash: {}
                    }
                }
            }

            $scope.ui = {
                isExecuteBash: false,
                isConfigFinished: false,
                existError: false,
                installationFinished: false,
                isInstallAll: false,
                isExecuting: false,
                progressBar: ngProgressFactory.createInstance()
            }

            $scope.frmData = {
                title: "Configuración de instancia",
                itemConfig: {},
                lsStatusBash: [],
                info: "",
                hideBtnInitConfig: false
            }

            $scope.onLoadStatusConfigInstance = function () {
                gestionInstanciaService
                    .loadStatusConfig($scope.dataInfo)
                    .post({}, {},
                    function (response) {
                        if (response.estado == 1) {
                            $scope.frmData.lsStatusBash = response.lsStatusBash;
                            console.log($scope.frmData.lsStatusBash);
                        }
                        else {
                            toastr.error(response.mensaje, "Error de Servicio", viewConfig.toastConfig);
                        }
                    },
                    function (error) {
                        toastr.error(error, "Error", viewConfig.toastConfig);
                        console.log(error);
                    });
            }

            $scope.onInstall = function (item) {
                $scope.ui.existError = false;
                $scope.ui.installationFinished = false;
                $scope.ui.isExecuting = true;
                $timeout(function () { }, 500);
                var onInstallPromise = new Promise(function (resolve, reject) {
                    if (item.ilNext) {
                        console.log(`Comenzando a ejecutar: ${item.noServicioEjecucion} ...`);
                        var itemPosition = $scope.frmData.lsStatusBash.findIndex((bash) => { return bash.idBash == item.idBash });
                        item.nuStatusBash = 4;
                        item.noStatusBash = 'En proceso...';
                        $scope.frmData.lsStatusBash.splice(itemPosition, 1, item);
                        $scope.http.executeBash.request.statusBash = item;
                        gestionInstanciaService.executeBashConfiguration(item.noServicioEjecucion, $scope.dataInfo).post({}, $scope.http.executeBash.request,
                            function (response) {
                                if (response.estado == 1) {
                                    item.nuStatusBash = 2;
                                    item.noStatusBash = 'Terminado';
                                    item.ilNext = false;
                                    $scope.frmData.lsStatusBash.splice(itemPosition, 1, item);

                                    if (!item.ilLast) {
                                        var itemNext = $scope.frmData.lsStatusBash[itemPosition + 1];
                                        itemNext.ilNext = true;
                                        $scope.frmData.lsStatusBash.splice(itemPosition + 1, 1, itemNext);
                                    }

                                    if (item.ilLast) {
                                        $scope.ui.installationFinished = true;
                                    }

                                    $scope.frmData.info += `${item.noDescripBash}: OK\n`;

                                    $scope.ui.isExecuting = false;

                                    resolve(item);
                                }
                                else {
                                    item.nuStatusBash = 3;
                                    item.noStatusBash = 'Error';
                                    $scope.frmData.lsStatusBash.splice(itemPosition, 1, item);
                                    $scope.ui.existError = true;
                                    $scope.frmData.info += `${item.noDescripBash}: Ocurrió un error en la instalación\n${response.mensaje}\n`;
                                    $scope.ui.isExecuting = false;
                                    reject(item);
                                }
                            },
                            function (error) {
                                console.error(error);
                                $scope.ui.isExecuting = false;
                            });
                    }
                    else {
                        resolve(item);
                    }
                });

                return onInstallPromise;
            }

            $scope.onInstallAll = function () {
                $scope.ui.isInstallAll = true;

                var services = $scope.frmData.lsStatusBash.map(function (bash) {
                    return function () {
                        return $scope.onInstall(bash);
                    }
                });

                var promiseSerial = services =>
                    services.reduce(function (promise, service) {
                        return promise.then(result => service().then(Array.prototype.concat.bind(result)));
                    }, Promise.resolve([]));

                promiseSerial(services)
                    .then(function (itemBashList) {
                        console.log(itemBashList);
                    })
                    .catch(function (item) {
                        console.error(item);
                    });
            }

            $scope.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            }

            $scope.onLoadPage = function () {
                $scope.onLoadStatusConfigInstance();
            }

            $scope.onLoadPage();
        }
    ]);
