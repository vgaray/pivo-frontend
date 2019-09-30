angular.module( 'pivo' )
    .directive( 'progressBarCustom', function(){
        return {
            restrict : 'E',
            scope : {
                id : '='
            },
            template : '<div id = {{id}} class = "col-md-12"></div>'
        }
    } );