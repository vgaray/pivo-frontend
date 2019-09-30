
  angular.module('pivo').directive('fileInput', ngFileSelect);

  
  function ngFileSelect($parse) {
    return {
      link: function ($scope,element,attrs) {
        element.on('change', function (e) {
           $scope.files = e.target.files;
          //console.log(files[0].name)
          $parse(attrs.fileInput).assign($scope, element[0].files);
          $scope.$apply();
        })
      }
    }
  }

