/**
 * Private function in socket
 */

var _userList = [];

var _generateGuestName = function () {

};

var _addNewUser = function (address) {
  var index = _getUserIndex(address);

  if (index < 0) { //new user
    var user = {
      address: address,
      count : 1
    }

    _userList.push(user);
    return true;
  } else { //old user with new window opened
    _userList.splice(index, 1);
    return false;
  }
};

var _getUserIndex = function (address) {
  for (var i = 0, length = _userList.length; i < length; ++i) {
    if (_userList[i].address == address) {
      return i;
    }
  }
  return -1;
};

//if user still got connection, minus count and don't show user disconnected
var _removeUserFromList = function(address) {
  var index = _getUserIndex(address);
  if (_userList[index].count > 1) {
    _userList[index].count --;
    return true;
  } else {
    _userList.splice(index, 1);
    return false;
  }
};

module.exports = function (socket) {
  var address = socket.handshake.address;

  socket.emit('init', function () {
    if (_addNewUser(address)) {
      socket.broadcast.emit('chat message', 'New user joined');
    }
  });

  socket.on('chat message', function (msg) {
    socket.broadcast.emit('chat message', msg);
    console.log('message' + msg);
  });

  socket.on('disconnect', function () {
    if(!_removeUserFromList(address)) {
      console.log('A user disconnected');
    }
  });
}
