(
  function () {
    angular
    .module("multiSigWeb")
    .controller("newWalletCtrl", function ($scope, $uibModalInstance, $uibModal, Utils, Transaction, Wallet, Token, callback, Web3Service) {

      $scope.newOwner = {};
      $scope.owners = {};
      $scope.owners[Web3Service.coinbase] = {
        name: 'My account',
        address: Web3Service.coinbase
      };

      $scope.confirmations = 1;

      $scope.removeOwner = function (address) {
        delete $scope.owners[address];
      };

      $scope.cancel = function () {
        $uibModalInstance.dismiss();
      };

      $scope.addOwner = function () {
          $scope.owners[$scope.newOwner.address] = $scope.newOwner;
          $scope.newOwner = {}; // reset values
      };
    });
  }
)();
