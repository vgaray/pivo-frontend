angular.module( 'pivo' )
    .factory( 'utilService', [
        function() {
            var utilService = {
                operation: {
                    add: 1,
                    update: 2,
                    findById: 3,
                    listAll: 4,
                    delete: 5
                },
                typeResult: {
                    none: 0,
                    success: 1,
                    error: -1
                },
                sleep: function sleep( milliseconds ) {
                    var start = new Date().getTime();
                    for ( var i = 0; i < 1e7; i++ ) {
                        if ( ( new Date().getTime() - start ) > milliseconds ) {
                            break;
                        }
                    }
                },
                bash : {
                    /* Es importante que estos valores coincidan con los de la base de datos */
                    IMPORT_SCRIPTS : 4,
                    DATABASE : 1,
                    OPEN_VPN : 2,
                    VIRTUAL_FAX : 3
                },
                iterator: function( list, callback )
                {
                    for (var index = 0; index < list.length; index++) 
                    {
                        var element = list[index];

                        callback( element )
                    }
                }
            }
            
            return utilService;
        }
    ] );
