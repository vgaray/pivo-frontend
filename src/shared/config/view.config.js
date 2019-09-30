angular.module( 'pivo' )
    .factory( 'viewConfig', function() {
        var viewConfig = {
            toastConfig: {
                "closeButton": true,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-bottom-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "1000",
                "timeOut": "7000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            },
            progressBar: 
            {
                infoConfig:{
                    load : function( progressBar )
                    {
                        progressBar.setHeight( '5px' );
                        progressBar.setColor( '#0762a3' );

                        return progressBar;
                    }
                },
                
            }
        }

        return viewConfig;
    } );
