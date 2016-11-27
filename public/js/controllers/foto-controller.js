angular.module('alurapic').controller('FotoController', ['$scope', 'recursoFoto', 'cadastroDeFotos', '$routeParams'], function($scope, recursoFoto, cadastroDeFotos, $routeParams){
    $scope.foto = {};
    $scope.mensagem = '';

    /*var recursoFoto = $resource('v1/fotos/:fotoId',null, {
        update : {
            method: 'PUT'
        },
        save : {
            method: 'POST'
        },
        get : {
            method: 'GET'
        }
    });*/

    if($routeParams.fotoId){

        recursoFoto.get({fotoId : $routeParams.fotoId}, function(foto) {
            $scope.foto = foto;
        }, function(erro){
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto';
        });

        /*$http.get('v1/fotos/' + $routeParams.fotoId)
        .success(function(foto){
            $scope.foto = foto;
        }) 
        .error(function(erro){
            console.log(erro);
            $scope.mensagem = 'Não foi possível obter a foto';
        });*/
    };

    $scope.submeter = function(){
        if($scope.formulario.$valid){

            cadastroDeFotos.cadastrar($scope.foto)
            .then(function(dados) {
                $scope.mensagem = dados.mensagem;
                if(dados.inclusao) $scope.foto = {}
                //$scope.focado = true;
               // $scope.$broadcast('fotoCadastrada');
                
            })
            .catch(function(erro){
                $scope.mensagem = dados.mensagem;
            });
            /*if($scope.foto._id){
                recursoFoto.update({fotoId : $scope.foto._id}, $scope.foto, function(){
                    $scope.mensagem = 'A foto '+ $scope.foto.titulo + ' foi alterada com sucesso';
                }, function(erro){
                    $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
                });

                /*$http.put('v1/fotos/'+ $scope.foto._id, $scope.foto)
                .success(function(){
                    $scope.mensagem = 'A foto '+ $scope.foto.titulo + ' foi alterada com sucesso';
                })
                .error(function(erro){
                    $scope.mensagem = 'Não foi possível alterar a foto ' + $scope.foto.titulo;
                });             
            } else {

                recursoFoto.save($scope.foto, function(){
                    $scope.foto = {};
                    $scope.mensagem = 'Foto incluída com sucesso';
                }, function(erro){
                    $scope.mensagem = 'Não foi possível incluir a foto';
                    console.log(erro);
                });

                /*$http.post('v1/fotos',$scope.foto)
                .success(function(){
                    $scope.foto = {};
                    $scope.mensagem = 'Foto incluída com sucesso';
                })
                .error(function(erro){
                    $scope.mensagem = 'Não foi possível incluir a foto';
                });              
            }*/
        }
    };  
});