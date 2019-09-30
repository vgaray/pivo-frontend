angular.module('pivo').config(['$injector', '$qProvider', '$httpProvider', '$urlRouterProvider', '$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider',
  function ($injector, $qProvider, $httpProvider, $urlRouterProvider, $stateProvider, $locationProvider, $urlMatcherFactoryProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    // Enrutador
    $urlRouterProvider.otherwise('/login');
    $stateProvider.state('login', {
      url: '/login?codUsu&tokenUsu',
      template: '<login></login>',
      title: 'Login',
      page: 'Login'
    }).state('principal', {
      url: '/principal',
      template: '<principal></principal>',
      title: 'principal',
      page: 'Principal'
    }).state('principal.gestionInstancia', {
      url: '/gestionInstancia',
      template: '<gestion-instancia></gestion-instancia>',
      title: 'Gestión Instancia',
      page: 'Gestión Instancia'
    }).state('principal.administrarInstancias', {
      url: '/administrarInstancias',
      template: '<administrar-instancias></administrar-instancias>',
      title: 'Lista de Veterinarias',
      page: 'Lista de Veterinarias'
    }).state('principal.usuarioGestionInstancia', {
      url: '/usuarioGestionInstancia?idInstancia',
      template: '<usuario-Gestion-Instancia></usuario-Gestion-Instancia>',
      title: 'Usuario Gestion Instancia',
      page: 'Usuario Gestión Instancia'
    }).state('principal.usuarioGestionPedido', {
      url: '/usuarioGestionPedido',
      template: '<usuario-Gestion-Pedido></usuario-Gestion-Pedido>',
      title: 'Usuario Gestion Pedido',
      page: 'Usuario Gestión Pedido'
    }).state('principal.seguridad', {
      url: '/seguridad?idInstancia',
      template: '<seguridad></seguridad>',
      title: 'Rol',
      page: 'Seguridad'
    }).state('principal.seguridadCrud', {
      url: '/seguridadCrud?idInstancia',
      template: '<seguridad-crud></seguridad-crud>',
      title: 'Mantenimiento de Rol',
      page: 'Mantenimiento de Rol'
    }).state('principal.seguridadGestPedido', {
      url: '/roles',
      template: '<seguridad-gest-pedido></seguridad-gest-pedido>',
      title: 'Roles',
      page: 'Gestión de Pedido'
    }).state('principal.seguridadGestCrud', {
      url: '/editarSeguridad',
      template: '<seguridad-gest-crud></seguridad-gest-crud>',
      title: 'Editar Roles',
      page: 'Editar Roles'
    }).state('page404', {
      url: '/page-404',
      template: '<page-404></page-404>',
      title: '404',
      page: '404'
    }).state('principal.cliente', {
      url: '/cliente',
      template: '<cliente></cliente>',
      title: 'Lista de clientes',
      page: 'Cliente'
    }).state('principal.inicio', {
      url: '/inicio?idInstancia',
      template: '<inicio></inicio>',
      page: 'Inicio'
    }).state('principal.personal', {
      url: '/personal?idInstancia',
      template: '<personal></personal>',
      title: 'Lista de personal',
      page: 'Personal'
    }).state('principal.veterinarias', {
      url: '/veterinarias',
      template: '<veterinarias></veterinarias>',
      title: 'Lista de Veterinarias',
      page: 'Veterinarias'
    }).state('principal.mascotas', {
      url: '/mascotas',
      template: '<mascotas></mascotas>',
      title: 'Lista de Mascotas',
      page: 'Mascotas'
    }).state('principal.citas', {
      url: '/citas',
      template: '<citas></citas>',
      title: 'Lista de citas',
      page: 'Citas'
    }).state('principal.gestionMascotas', {
      url: '/gestionMascotas?idInstancia',
      template: '<gestion-mascotas></gestion-mascotas>',
      title: 'Lista de Mascotas Pendientes',
      page: 'Gestión de mascotas'
    }).state('principal.gestionHistoriaClinica', {
      url: '/gestionHistoriaClinica?idInstancia',
      template: '<gestion-historia-clinica></gestion-historia-clinica>',
      title: 'Lista de Historias Clínicas',
      page: 'Gestión de Historias Clínicas'
    }).state('principal.citasVeterinaria', {
      url: '/citasVeterinaria?idInstancia',
      template: '<citas-Veterinaria></citas-Veterinaria>',
      title: 'Lista de citas',
      page: 'Citas Veterinaria'
    }).state('principal.historiaClinicaService', {
      url: '/historiaClinicaService',
      template: '<historia-clinica-service></historia-clinica-service>',
      title: 'Lista de HC',
      page: 'Historias Clinicas'
    })
      ;

    $httpProvider.interceptors.push(['$q', '$location', '$window', function ($q, $location, $window) {
      return {
        'response': function (response) {
          if (response.status === 401) {
            console.log("Response 401");
          }
          return response || $q.when(response);
        },
        'responseError': function (rejection) {
          if (rejection.status === 401) {
            console.log("Response Error 401! Redirecting to /signin...", rejection);

            $window.location = '#!/login';
          }
          if (rejection.status === 404) {
            $window.location = '#!/page404';
            $.unblockUI();
          }
          return $q.reject(rejection);
        }


      }
    }

    ]);
  }
]);
