var controller = app.controller('clientController', ['$scope', 'socket', function($scope, socket){
  $scope.chatHistory = [];
  $scope.message = "";

  $scope.sendMessage = function(){
    socket.emit('chat message', $scope.message);
    $scope.chatHistory.push($scope.message);
    $scope.message = "";
  };

  socket.on('chat message', function(msg){
    $scope.chatHistory.push(msg);
  });
}]);
