angular.module('minhasDiretivas',['meusServicos'])
.directive('meuPainel', function() {
    var ddo = {};
    ddo.restric = "AE";
    ddo.scope ={
        titulo: '@'
    };

    ddo.transclude = true;

    ddo.templateUrl = 'js/directives/meu-painel.html'
    return ddo;
})
.directive('minhaFoto', function() {
    var ddo = {};
    ddo.restric = "AE";
    ddo.scope = {
        titulo: '@',
        url:'@'
    };
    ddo.template = '<img class="img-responsive center-block" ng-src="{{url}}" alt="{{titulo}}">'
    return ddo;
})
.directive('meuBotaoPerigo', function() {
    var ddo = {};
    ddo.restric = "E";
    ddo.scope = {
        nome: '@',
        acao: '&'
    };
    ddo.template = '<button class="btn btn-danger btn-block" ng-click="acao(foto)">{{nome}}</button>'
    return ddo;
})
.directive('meuFocus', function() {
    var ddo = {};
    ddo.restric = "A";
    /*ddo.scope = {
        focado: '='
    };*/

    ddo.link = function(scope, element){
        /*scope.$watch('focado', function(){
            if(scope.focado) {
               element[0].focus();
               scope.focado = false;
            }
        });*/
        scope.$on('fotoCadastrada', function() {
            element[0].focus();
        });
    }
    return ddo;
})
.directive('meusTitulos', function() {
        var ddo = {};
        ddo.restrict = 'E';
        ddo.template = '<ul><li ng-repeat="titulo in titulos">{{titulo}}</li></ul>';
        ddo.controller = function($scope, recursoFoto){
            recursoFoto.query(function(fotos) {
                $scope.titulos = fotos.map(function(foto) {
                    return foto.titulo;
                });    
            });
        };
        return ddo;
});

