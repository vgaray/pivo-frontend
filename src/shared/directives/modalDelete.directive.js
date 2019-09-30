angular.module( 'pivo' )
    .directive( 'modalDelete', function() {
        return {
            restrict: 'EA',
            scope: {
                title: '=title',
                content: '=content',
                callbackButtonLeft: '&ngClickLeftButton',
                callbackButtonRight: '&ngClickRightButton'
            },
            templateUrl: 'src/shared/partials/modalDelete.template.html'
        }
    } );
