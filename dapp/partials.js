angular.module('multiSigWeb').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('partials/accounts.html',
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <!--<button type=\"button\" class=\"btn btn-default\"-->\n" +
    "        <!--id=\"add-lightwallet-account\"-->\n" +
    "        <!--ng-click=\"createWallet()\">-->\n" +
    "        <!--Add-->\n" +
    "      <!--</button>-->\n" +
    "      <button  type=\"button\"\n" +
    "        class=\"btn btn-default\"\n" +
    "        ng-click=\"openImportLightWallet()\">\n" +
    "        Import\n" +
    "      </button>\n" +
    "      <!--<button type=\"button\"\n" +
    "        class=\"btn btn-default\"\n" +
    "        ng-click=\"downloadKeystore()\"\n" +
    "        ng-show=\"hasKeystore && account.addresses.length > 0\">\n" +
    "        Download\n" +
    "      </button>-->\n" +
    "      <!--<button ng-disabled=\"hasKeystore && account.addresses.length > 0\"\n" +
    "        type=\"button\"\n" +
    "        class=\"btn btn-default\"\n" +
    "        ng-click=\"restoreFromSeed()\">\n" +
    "        Import\n" +
    "      </button>-->\n" +
    "      <!--<button type=\"button\"\n" +
    "        class=\"btn btn-default\"\n" +
    "        ng-click=\"showSeed()\"\n" +
    "        ng-show=\"hasKeystore && account.addresses.length > 0\">\n" +
    "        Show seed\n" +
    "      </button>-->\n" +
    "    </div>\n" +
    "    <h4>\n" +
    "      Accounts\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <table class=\"table table-hover table-bordered table-striped\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th>\n" +
    "          Name\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Address\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"account in account.addresses|objectToArray|limitTo:itemsPerPage:itemsPerPage*(currentPage-1) track by $index\">\n" +
    "        <td>\n" +
    "          <a ng-href=\"#/wallet/{{account.address}}\" ng-bind-html=\"account.name | dashIfEmpty\"></a>\n" +
    "          <div class=\"pull-right form-inline\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"editAccount(account)\">\n" +
    "              Edit\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-sm\" ng-click=\"removeAccount(account)\">\n" +
    "              Remove\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <!--<div uib-popover=\"{{account.address}}\" popover-trigger=\"'mouseenter'\" id=\"{{$index}}\">\n" +
    "            {{account.address}}\n" +
    "          </div>-->\n" +
    "          <span uib-popover=\"{{account.address}}\" popover-trigger=\"'mouseenter'\" id=\"{{$index}}\">\n" +
    "            {{account.address}}\n" +
    "          </span>\n" +
    "          <div class=\"pull-right\">\n" +
    "            <button type=\"button\"\n" +
    "              class=\"btn btn-default \"\n" +
    "              ng-click=\"exportV3(account.address)\">\n" +
    "              Export\n" +
    "            </button>\n" +
    "            <button class=\"btn btn-default\" type=\"button\" ngclipboard-success=\"copyAccount()\" ngclipboard data-clipboard-target=\"[id='{{$index}}']\">\n" +
    "              Copy\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "  <div ng-if=\"!account.addresses || account.addresses.length == 0\" class=\"panel-body text-center\">\n" +
    "    No accounts. Add an account <a href=\"\" ng-click=\"createWallet()\">now</a>.\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/editable-select-contract-settings-tpl.html',
    "<div>\n" +
    "  <div class=\"input-group dropdown\">\n" +
    "      <input\n" +
    "        ng-if=\"!isDisabled\"\n" +
    "        name=\"editable-select\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control dropdown-toggle editable-select\"\n" +
    "        ng-model=\"ngModel.address\"\n" +
    "        ng-disabled=\"isDisabled\"\n" +
    "      />\n" +
    "      <input\n" +
    "        ng-if=\"isDisabled\"\n" +
    "        name=\"editable-select\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control dropdown-toggle editable-select\"\n" +
    "        ng-model=\"ngModel.name\"\n" +
    "        ng-disabled=\"isDisabled\"\n" +
    "      />\n" +
    "    <ul class=\"dropdown-menu settings-dropdown-menu\">\n" +
    "      <li ng-repeat=\"option in options\"\n" +
    "          ng-click=\"click(option)\">\n" +
    "          <p>\n" +
    "              <span><b>{{option.name}}</b></span><br/>\n" +
    "              <span>{{option.address}}</span>\n" +
    "          </p>\n" +
    "      </li>\n" +
    "      <li ng-if=\"other\" role=\"presentation\" class=\"divider\"></li>\n" +
    "      <li ng-click=\"click(other)\">Custom configuration</li>\n" +
    "    </ul>\n" +
    "    <span class=\"input-group-addon dropdown-toggle settings-caret-container\" data-toggle=\"dropdown\">\n" +
    "      <span class=\"caret\"></span>\n" +
    "    </span>\n" +
    "  </div>  \n" +
    "</div>\n"
  );


  $templateCache.put('partials/editable-select-settings-tpl.html',
    "<div>\n" +
    "  <div class=\"input-group dropdown\">\n" +
    "      <input\n" +
    "        ng-if=\"!isDisabled\"\n" +
    "        name=\"editable-select\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control dropdown-toggle editable-select\"\n" +
    "        ng-model=\"ngModel.url\"\n" +
    "        ng-disabled=\"isDisabled\"\n" +
    "      />\n" +
    "      <input\n" +
    "        ng-if=\"isDisabled\"\n" +
    "        name=\"editable-select\"\n" +
    "        type=\"text\"\n" +
    "        class=\"form-control dropdown-toggle editable-select\"\n" +
    "        ng-model=\"ngModel.name\"\n" +
    "        ng-disabled=\"isDisabled\"\n" +
    "      />\n" +
    "    <ul class=\"dropdown-menu settings-dropdown-menu\">\n" +
    "      <li ng-repeat=\"option in options\"\n" +
    "          ng-click=\"click(option)\">\n" +
    "          <p>\n" +
    "              <span><b>{{option.name}}</b></span><br/>\n" +
    "              <span>{{option.url}}</span>\n" +
    "          </p>\n" +
    "      </li>\n" +
    "      <li ng-if=\"other\" role=\"presentation\" class=\"divider\"></li>\n" +
    "      <li ng-click=\"click(other)\">Custom configuration</li>\n" +
    "    </ul>    \n" +
    "    <span class=\"input-group-addon dropdown-toggle settings-caret-container\" data-toggle=\"dropdown\">\n" +
    "      <span class=\"caret\"></span>\n" +
    "    </span>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/multisigData.html',
    "<div class=\"tx-data\">\n" +
    "  {{transactions[txId].data|limitTo:1000}}\n" +
    "  <span ng-show=\"transactions[txId].data.length > 1000\">...</span>  \n" +
    "</div>\n"
  );


  $templateCache.put('partials/paramValueData.html',
    "<div class=\"tx-data\">\n" +
    "  {{param.value}}  \n" +
    "</div>\n"
  );


  $templateCache.put('partials/settings.html',
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <h4>\n" +
    "      Settings\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <form ng-submit=\"update()\">\n" +
    "    <div class=\"panel-body\">\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-6 form-group\">\n" +
    "          <label for=\"node\">Ethereum node</label>\n" +
    "          <editable-select\n" +
    "            ng-model=\"config.selectedEthereumNode\"\n" +
    "            options=\"config.ethereumNodes\"\n" +
    "            other=\"Custom node\"            \n" +
    "            template-url=\"editable-select-settings-tpl.html\">\n" +
    "            <!-- on-change-function=\"alertNodeSetup\" -->\n" +
    "          </editable-select>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6 form-group\">\n" +
    "          <label for=\"wallet-factory\">Web3 provider</label>\n" +
    "          <provider-list \n" +
    "            default-item=\"config.wallet\" \n" +
    "            selected-item=\"providers[$index].name\">\n" +
    "            <!-- on-change-function=\"alertNodeSetup\" -->\n" +
    "          </provider-list>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-6 form-group\">\n" +
    "          <label for=\"gas-limit\">Gas limit</label>\n" +
    "          <input id=\"gas-limit\" type=\"number\" ng-model=\"config.gasLimit\" class=\"form-control\" />\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6 form-group\">\n" +
    "          <label for=\"gas-price\">Gas price</label>\n" +
    "          <input id=\"gas-price\" type=\"number\" ng-model=\"config.gasPrice\" class=\"form-control\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-6 form-group\">\n" +
    "          <label for=\"alert-nodes\">Alert node</label>\n" +
    "          <editable-select\n" +
    "            ng-model=\"config.alertNode\"\n" +
    "            options=\"config.alertNodesList\"\n" +
    "            other=\"Custom node\"            \n" +
    "            template-url=\"editable-select-settings-tpl.html\">\n" +
    "          </editable-select>\n" +
    "        </div>\n" +
    "        <div class=\"col-md-6 form-group\">\n" +
    "          <label for=\"wallet-factory\">Authorization code</label>\n" +
    "          <input id=\"wallet-factory\" type=\"text\" ng-model=\"config.alertNode.authCode\" class=\"form-control\" />\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-6\"></div>\n" +
    "        <div cass=\"col-md-6\">\n" +
    "          <div class=\"pull-left\" style=\"margin-left: 15px;\">\n" +
    "            <a href=\"{{alertManagementPage}}\" target=\"_blank\"\n" +
    "              class=\"btn btn-primary\" type=\"button\"\n" +
    "              ng-show=\"showDeleteAuthCodeBtn\">\n" +
    "              Manage notifications\n" +
    "            </a>\n" +
    "            <button class=\"btn btn-danger\" type=\"button\" ng-click=\"remove()\" ng-show=\"showDeleteAuthCodeBtn\">\n" +
    "              Delete Authorization code\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "      <div class=\"row\">\n" +
    "        <div class=\"col-md-6 form-group\">\n" +
    "          <label for=\"wallet-factory\">Wallet factory contract</label>\n" +
    "          <editable-select\n" +
    "            ng-model=\"config.walletFactoryAddress\"\n" +
    "            options=\"config.walletFactoryAddressList\"\n" +
    "            other=\"Custom contract\"\n" +
    "            template-url=\"editable-select-contract-settings-tpl.html\"\n" +
    "            type=\"contract-address\">\n" +
    "          </editable-select>\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"panel-footer\">\n" +
    "      <input type=\"submit\" class=\"btn btn-default\" value=\"Update settings\" />\n" +
    "      <button type=\"button\" class=\"btn btn-default\" ng-click=\"reset()\">\n" +
    "        Reset settings\n" +
    "      </button>\n" +
    "      <input type=\"button\" class=\"btn btn-default\" value=\"Import wallets\" ng-click=\"showImportWalletDialog()\" />\n" +
    "      <input type=\"button\" class=\"btn btn-default\" value=\"Export wallets\" ng-click=\"showExportWalletDialog()\" />\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/transactions.html',
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <button type=\"button\" class=\"btn btn-default\" disabled-if-no-accounts\n" +
    "       ng-click=\"sendTransaction()\" show-hide-by-connectivity=\"online\">\n" +
    "        Send transaction\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-default\"\n" +
    "      ng-click=\"sendRawTransaction()\" show-hide-by-connectivity=\"online\">\n" +
    "        Send signed transaction\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-default\" ng-click=\"getNonce()\" show-hide-by-connectivity=\"online\">\n" +
    "        Get nonce\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-danger\" ng-disabld=\"!totalItems\" ng-click=\"removeAll()\">\n" +
    "        Remove all\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h4>\n" +
    "      Transactions\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <table class=\"table table-hover table-bordered table-striped\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th>\n" +
    "          Destination\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Value\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Data\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Nonce\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Mined\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Logs\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Remove\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"transaction in transactions | limitTo:currentPage*itemsPerPage:itemsPerPage*(currentPage-1) track by $index\">\n" +
    "        <td>\n" +
    "          <a uib-popover=\"{{transaction.multisig || transaction.info.to}}\" popover-trigger=\"'mouseenter'\"\n" +
    "          ng-href=\"{{etherscan}}/tx/{{transaction.txHash}}\" target=\"_blank\"\n" +
    "          ng-bind-html=\"getDestinationOrContract(transaction) | dashIfEmpty\">\n" +
    "          </a>\n" +
    "        </td>\n" +
    "        <td ng-bind-html=\"transaction.info.value | ether | dashIfEmpty\">\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <div ng-show=\"transaction.decodedData.title\" class=\"row\">\n" +
    "            <div ng-class=\"{'col-md-8' : !transaction.toWallet && !transaction.toToken, 'col-md-12': transaction.toWallet || transaction.toToken}\">\n" +
    "              <span  popover-trigger=\"'mouseenter'\" uib-popover-template=\"'partials/txData.html'\" popover-placement=\"bottom\" popover-append-to-body=\"true\">\n" +
    "                {{transaction.decodedData.title}}\n" +
    "              </span>\n" +
    "            <ul>\n" +
    "              <li ng-repeat=\"param in transaction.decodedData.params\" ng-show=\"!(param.name=='data') || param.value !='0x' \">\n" +
    "                {{param.name}}:\n" +
    "                <span popover-enable=\"param.value\" popover-trigger=\"'mouseenter'\"\n" +
    "                  uib-popover-template=\"'partials/paramValueData.html'\">\n" +
    "                  {{param.value|addressCanBeOwner:wallet|logParam:(param.name == 'value' && transaction.decodedData.title == 'submitTransaction')}}\n" +
    "                </span>\n" +
    "              </li>\n" +
    "            </ul>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-4\" ng-show=\"transaction.decodedData.notDecoded || transaction.decodedData.params\" ng-hide=\"transaction.toWallet\">\n" +
    "              <button class=\"btn btn-default btn-sm pull-right\" ng-click=\"editABI(transaction.info.to)\">\n" +
    "                Edit ABI\n" +
    "              </button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "          <div class=\"text-center\" ng-show=\"!transaction.decodedData.title\">\n" +
    "            -\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td ng-bind-html=\"transaction.info.nonce | dashIfEmpty\">\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span ng-show=\"transaction.receipt\">\n" +
    "            Yes\n" +
    "          </span>\n" +
    "          <span ng-hide=\"transaction.receipt\">\n" +
    "            No\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <ul ng-show=\"transaction.receipt.decodedLogs.length\">\n" +
    "            <li ng-repeat=\"log in transaction.receipt.decodedLogs track by $index\">\n" +
    "              {{log.name}}\n" +
    "              <ul>\n" +
    "                <li ng-repeat=\"param in log.events track by $index\">\n" +
    "                  {{param.name}}:\n" +
    "                  <span uib-popover=\"{{param.value}}\" popover-enable=\"param.value && param.value.toString().length > 7\" popover-trigger=\"'mouseenter'\">\n" +
    "                    {{param.value|addressCanBeOwner|logParam:(param.name == 'value')}}\n" +
    "                  </span>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </li>\n" +
    "          </ul>\n" +
    "          <p ng-show=\"!transaction.receipt.decodedLogs.length\" class=\"text-center\">\n" +
    "            -\n" +
    "          </p>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <button class=\"btn btn-danger btn-sm\" ng-click=\"remove(transaction.txHash)\">\n" +
    "            Remove\n" +
    "          </button>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "  <div ng-hide=\"totalItems\" class=\"text-center panel-body\">\n" +
    "    No transactions. Send a transaction <a href=\"\" ng-click=\"sendTransaction()\">now</a>.\n" +
    "  </div>\n" +
    "  <div class=\"panel-footer\">\n" +
    "    <ul uib-pagination total-items=\"totalItems\" ng-model=\"currentPage\" items-per-page=\"itemsPerPage\"></ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/txData.html',
    "<div class=\"tx-data\">\n" +
    "  {{transaction.info.input|limitTo:1000}}\n" +
    "  <span ng-show=\"transaction.info.input.length > 1000\">...</span>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/wallet.html',
    "<div class=\"page-header\">\n" +
    "  <h1>\n" +
    "    {{wallet.name}} {{balance|ether}}\n" +
    "  </h1>\n" +
    "</div>\n" +
    "<!-- Owners panel -->\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <button type=\"button\" disabled-if-no-accounts ng-click=\"removeOwnerOffline()\" class=\"btn btn-default\" show-hide-by-connectivity=\"offline\">\n" +
    "        Remove offline\n" +
    "      </button>\n" +
    "      <button type=\"button\" disabled-if-no-accounts ng-click=\"replaceOwnerOffline()\" class=\"btn btn-default\" show-hide-by-connectivity=\"offline\">\n" +
    "        Replace offline\n" +
    "      </button>\n" +
    "      <button type=\"button\" disabled-if-no-accounts ng-click=\"addOwner()\" class=\"btn btn-default\">\n" +
    "        Add\n" +
    "      </button>\n" +
    "      <button type=\"button\" ng-click=\"hideOwners=true\" class=\"btn btn-default\" ng-hide=\"hideOwners\">\n" +
    "        <span class=\"glyphicon glyphicon-menu-up\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "      <button type=\"button\" ng-click=\"hideOwners=false\" class=\"btn btn-default\" ng-show=\"hideOwners\">\n" +
    "        <span class=\"glyphicon glyphicon-menu-down\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h4>\n" +
    "      Owners\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <table class=\"table table-hover table-bordered table-striped\" uib-collapse=\"hideOwners\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th>\n" +
    "          Name\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Address\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"owner in owners track by $index\">\n" +
    "        <td>\n" +
    "          {{getOwnerName(owner)}}\n" +
    "          <div class=\"pull-right\">\n" +
    "            <button type=\"button\" ng-click=\"editOwner(owner)\" class=\"btn btn-default btn-sm\">\n" +
    "              Edit\n" +
    "            </button>\n" +
    "            <button type=\"button\" ng-click=\"replaceOwner(owner)\"\n" +
    "              class=\"btn btn-default btn-sm\"\n" +
    "              disabled-if-no-accounts\n" +
    "              show-hide-by-connectivity=\"online\">\n" +
    "              Replace\n" +
    "            </button>\n" +
    "            <button type=\"button\" ng-click=\"getNonce(owner)\"\n" +
    "              class=\"btn btn-default btn-sm\"\n" +
    "              disabled-if-no-accounts\n" +
    "              show-hide-by-connectivity=\"online\">\n" +
    "              Get nonce\n" +
    "            </button>\n" +
    "            <button type=\"button\" ng-click=\"removeOwner(owner)\"\n" +
    "              class=\"btn btn-danger btn-sm\"\n" +
    "              disabled-if-no-accounts\n" +
    "              show-hide-by-connectivity=\"online\"\n" +
    "              ng-hide=\"owners.length == 1\">\n" +
    "              Remove\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          {{owner}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "</div>\n" +
    "<!-- Tokens panel -->\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <button type=\"button\" ng-click=\"addToken()\" class=\"btn btn-default\">\n" +
    "        Add\n" +
    "      </button>\n" +
    "      <button type=\"button\" ng-click=\"hideTokens=true\" class=\"btn btn-default\" ng-hide=\"hideTokens\">\n" +
    "        <span class=\"glyphicon glyphicon-menu-up\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "      <button type=\"button\" ng-click=\"hideTokens=false\" class=\"btn btn-default\" ng-show=\"hideTokens\">\n" +
    "        <span class=\"glyphicon glyphicon-menu-down\" aria-hidden=\"true\"></span>\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h4>\n" +
    "      Tokens\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <table class=\"table table-hover table-bordered table-striped\" uib-collapse=\"hideTokens\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th>\n" +
    "          Name\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Multisig balance\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Account balance\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"token in wallet.tokens track by $index\">\n" +
    "        <td>\n" +
    "          {{token.name}}\n" +
    "          <div class=\"pull-right\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\"\n" +
    "            ng-click=\"editToken(token)\">\n" +
    "              Edit\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-sm\"\n" +
    "            ng-click=\"removeToken(token)\">\n" +
    "              Remove\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          {{token|token}}\n" +
    "          <div class=\"pull-right\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\" disabled-if-no-accounts\n" +
    "            ng-click=\"depositToken(token)\">\n" +
    "              Deposit\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\" disabled-if-no-accounts\n" +
    "            ng-click=\"withdrawToken(token)\">\n" +
    "              Withdraw\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          {{userTokens[token.address]|token}}\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "  <div ng-show=\"!totalTokens\" class=\"panel-body text-center\" uib-collapse=\"hideTokens\">\n" +
    "    No tokens. Add an ERC20 token <a href=\"\" ng-click=\"addToken()\">now</a>.\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!-- Multisig transactions panel -->\n" +
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div class=\"pull-right form-inline\">\n" +
    "      <button type=\"button\" class=\"btn btn-default\" disabled-if-no-accounts\n" +
    "      ng-click=\"confirmMultisigTransactionOffline()\" show-hide-by-connectivity=\"offline\">\n" +
    "        Confirm offline\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-default\" disabled-if-no-accounts\n" +
    "      ng-click=\"revokeMultisigTransactionOffline()\" show-hide-by-connectivity=\"offline\">\n" +
    "        Revoke offline\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-default\" disabled-if-no-accounts\n" +
    "      ng-click=\"executeMultisigTransactionOffline()\" show-hide-by-connectivity=\"offline\">\n" +
    "        Execute offline\n" +
    "      </button>\n" +
    "      <button type=\"button\" class=\"btn btn-default\" disabled-if-no-accounts\n" +
    "      ng-click=\"addTransaction()\">\n" +
    "        Add\n" +
    "      </button>\n" +
    "      <select class=\"form-control\" ng-model=\"showTxs\" ng-change=\"updateParams()\">\n" +
    "        <option value=\"all\">\n" +
    "          All\n" +
    "        </option>\n" +
    "        <option value=\"pending\">\n" +
    "          Pending\n" +
    "        </option>\n" +
    "        <option value=\"executed\">\n" +
    "          Executed\n" +
    "        </option>\n" +
    "      </select>\n" +
    "      <select class=\"form-control\" ng-change=\"updateTransactions()\" ng-model=\"itemsPerPage\" convert-to-number>\n" +
    "        <option value=\"5\">\n" +
    "          5/p\n" +
    "        </option>\n" +
    "        <option value=\"10\">\n" +
    "          10/p\n" +
    "        </option>\n" +
    "        <option value=\"20\">\n" +
    "          20/p\n" +
    "        </option>\n" +
    "      </select>\n" +
    "    </div>\n" +
    "    <h4>\n" +
    "      Multisig transactions\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <table class=\"table table-hover table-bordered table-striped\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th>\n" +
    "          ID\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Destination\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Value\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Data/Subject\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Confirmations\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Executed\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"txId in txIds track by $index\">\n" +
    "        <td>\n" +
    "          {{txId|bigNumber}}\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span uib-popover=\"{{transactions[txId].to}}\" popover-enable=\"'true'\" popover-trigger=\"'mouseenter'\">\n" +
    "            {{transactions[txId].destination}}\n" +
    "          </span>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          {{transactions[txId].value|ether}}\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <div class=\"text-center\" ng-show=\"!transactions[txId].dataDecoded.title\">\n" +
    "            -\n" +
    "          </div>\n" +
    "          <div class=\"row\">\n" +
    "            <div ng-class=\"{'col-md-8': transactions[txId].dataDecoded.notDecoded || transactions[txId].dataDecoded.params, 'col-md-12': !transactions[txId].dataDecoded.notDecoded && !transactions[txId].dataDecoded.params}\">\n" +
    "              <span popover-trigger=\"'mouseenter'\" uib-popover-template=\"'partials/multisigData.html'\" popover-placement=\"bottom\" popover-append-to-body=\"true\" popover-enable=\"transactions[txId].data != '0x'\">\n" +
    "                {{transactions[txId].dataDecoded.title}}\n" +
    "              </span>\n" +
    "              <ul>\n" +
    "                <li ng-repeat=\"param in transactions[txId].dataDecoded.params\">\n" +
    "                  {{param.name}}:\n" +
    "                  <span uib-popover=\"{{param.value}}\" popover-enable=\"param.value && param.value.toString().length > 7\" popover-trigger=\"'mouseenter'\">\n" +
    "                    {{param.value|addressCanBeOwner:wallet|logParam}}\n" +
    "                  </span>\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "            <div ng-class=\"{'col-md-4': transactions[txId].dataDecoded.notDecoded || transactions[txId].dataDecoded.params}\" ng-show=\"transactions[txId].dataDecoded.notDecoded || transactions[txId].dataDecoded.params\">\n" +
    "              <button class=\"btn btn-default btn-sm pull-right\" ng-click=\"editABI(transactions[txId].to)\">\n" +
    "                Edit ABI\n" +
    "              </button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <div class=\"row\">\n" +
    "            <div ng-class=\"{'col-md-12' : transactions[txId].executed, 'col-md-6' : !transactions[txId].executed}\">\n" +
    "              <ul ng-repeat=\"owner in transactions[txId].confirmations\">\n" +
    "                <li>\n" +
    "                  {{wallet.owners[owner].name}}\n" +
    "                </li>\n" +
    "              </ul>\n" +
    "            </div>\n" +
    "            <div ng-hide=\"transactions[txId].executed || transactions[txId].confirmed\" ng-class=\"{'col-md-12' : !transactions[txId].confirmations.length, 'col-md-3' : transactions[txId].confirmations.length}\">\n" +
    "              <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n" +
    "                ng-hide=\"transactions[txId].executed || transactions[txId].confirmed\"\n" +
    "                ng-click=\"confirmTransaction(txId)\"\n" +
    "                disabled-if-no-accounts\n" +
    "                show-hide-by-connectivity=\"online\">\n" +
    "                Confirm\n" +
    "              </button>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-3\" ng-show=\"transactions[txId].confirmed && !transactions[txId].executed\">\n" +
    "              <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n" +
    "                  ng-show=\"transactions[txId].confirmed && !transactions[txId].executed\"\n" +
    "                  ng-click=\"revokeConfirmation(txId)\"\n" +
    "                  disabled-if-no-accounts\n" +
    "                  show-hide-by-connectivity=\"online\">\n" +
    "                Revoke confirmation\n" +
    "              </button>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-3\" ng-show=\"!transactions[txId].executed\">\n" +
    "              <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n" +
    "                      ng-show=\"!transactions[txId].executed\"\n" +
    "                      ng-click=\"getConfirmationData(txId)\"\n" +
    "                      disabled-if-no-accounts\n" +
    "                      show-hide-by-connectivity=\"online\">\n" +
    "                Confirm offline\n" +
    "              </button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <div class=\"row\">\n" +
    "            <div ng-class=\"{'col-md-12' : transactions[txId].executed, 'col-md-6' : !transactions[txId].executed}\">\n" +
    "              <span ng-show=\"transactions[txId].executed\">\n" +
    "                Yes\n" +
    "              </span>\n" +
    "              <span ng-hide=\"transactions[txId].executed\">\n" +
    "                No\n" +
    "              </span>\n" +
    "            </div>\n" +
    "            <div class=\"col-md-6\" ng-show=\"!transactions[txId].executed && transactions[txId].confirmations.length == confirmations\">\n" +
    "              <button type=\"button\" class=\"pull-right btn btn-default btn-sm pull-right\"\n" +
    "                ng-show=\"!transactions[txId].executed && transactions[txId].confirmations.length == confirmations\"\n" +
    "                ng-click=\"executeTransaction(txId)\"\n" +
    "                disabled-if-no-accounts\n" +
    "                show-hide-by-connectivity=\"online\">\n" +
    "                Execute\n" +
    "              </button>\n" +
    "            </div>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "  <div ng-hide=\"totalItems\" class=\"panel-body text-center\">\n" +
    "    No multisig transactions. Send a multisig transaction <a href=\"\" ng-click=\"addTransaction()\">now</a>.\n" +
    "  </div>\n" +
    "  <div class=\"panel-footer\">\n" +
    "    <ul uib-pagination total-items=\"totalItems\" ng-model=\"currentPage\" ng-change=\"updateTransactions()\" items-per-page=\"itemsPerPage\"></ul>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/wallets.html',
    "<div class=\"panel panel-default\">\n" +
    "  <div class=\"panel-heading\">\n" +
    "    <div class=\"pull-right\">\n" +
    "      <button type=\"button\" class=\"btn btn-default\" ng-click=\"newWalletSelect()\">\n" +
    "        Restore wallet\n" +
    "      </button>\n" +
    "    </div>\n" +
    "    <h4>\n" +
    "      Wallets\n" +
    "    </h4>\n" +
    "  </div>\n" +
    "  <table class=\"table table-hover table-bordered table-striped\">\n" +
    "    <thead>\n" +
    "      <tr>\n" +
    "        <th>\n" +
    "          Name\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Address\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Balance\n" +
    "        </th>\n" +
    "        <th>\n" +
    "          Required confirmations\n" +
    "        </th>\n" +
    "      </tr>\n" +
    "    </thead>\n" +
    "    <tbody>\n" +
    "      <tr ng-repeat=\"(walletAddress, wallet) in wallets|objectToArray|limitTo:itemsPerPage:itemsPerPage*(currentPage-1) track by $index\">\n" +
    "        <td>\n" +
    "          <span ng-if=\"!wallet.isOnChain\" show-hide-by-connectivity=\"online\"\n" +
    "            uib-popover=\"This wallet was created on another chain\" popover-trigger=\"'mouseenter'\"\n" +
    "            class=\"not-on-chain-wallet pull-left glyphicon glyphicon-exclamation-sign\"></span>\n" +
    "          <a ng-href=\"#/wallet/{{wallet.address}}\" ng-bind-html=\"wallet.name | dashIfEmpty\"></a>\n" +
    "          <div class=\"pull-right form-inline\">\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm\" ng-click=\"editWallet(wallet)\"\n" +
    "              disabled-if-no-accounts-or-wallet-available=\"{{wallet.address}}\">\n" +
    "              Edit\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-danger btn-sm\" ng-click=\"removeWallet(wallet.address)\">\n" +
    "              Remove\n" +
    "            </button>\n" +
    "            <button type=\"button\" class=\"btn btn-primary btn-sm\" ng-click=\"openNotifications(wallet.address)\"\n" +
    "              disabled-if-no-accounts-or-wallet-available=\"{{wallet.address}}\">\n" +
    "              Notifications\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <div uib-popover=\"{{wallet.address}}\" popover-trigger=\"'mouseenter'\">\n" +
    "            {{::wallet.address|address}}\n" +
    "            <button type=\"button\" class=\"btn btn-default btn-sm pull-right\"\n" +
    "              disabled-if-no-accounts-or-wallet-available=\"{{wallet.address}}\"\n" +
    "              data-clipboard-text=\"{{wallet.address}}\"\n" +
    "              ngclipboard>\n" +
    "              Copy\n" +
    "            </button>\n" +
    "          </div>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span value-or-dash-by-connectivity=\"{{wallet.balance|ether}}\">{{wallet.balance|ether}}</span>\n" +
    "          <button type=\"button\" disabled-if-no-accounts-or-wallet-available=\"{{wallet.address}}\"\n" +
    "            class=\"btn btn-default btn-sm pull-right\"\n" +
    "            ng-click=\"deposit(wallet)\">\n" +
    "            Deposit\n" +
    "          </button>\n" +
    "        </td>\n" +
    "        <td>\n" +
    "          <span class=\"col-xs-9\" value-or-dash-by-connectivity=\"{{wallet.confirmations|bigNumber|dashIfEmpty}}\"></span>\n" +
    "          <button type=\"button\" disabled-if-no-accounts-or-wallet-available=\"{{wallet.address}}\"\n" +
    "            class=\"btn btn-default btn-sm col-xs-3\"\n" +
    "            ng-click=\"setRequired(wallet)\">\n" +
    "            Edit\n" +
    "          </button>\n" +
    "        </td>\n" +
    "      </tr>\n" +
    "    </tbody>\n" +
    "  </table>\n" +
    "  <div ng-hide=\"totalItems\" class=\"panel-body text-center\">\n" +
    "    No wallets. Add wallet <a href=\"\" ng-click=\"newWalletSelect()\">now</a>.\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/addLightWalletAccount.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Add account\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "    <p class=\"top-20\">Please enter a password to securely encrypt your wallet.</p>\n" +
    "\n" +
    "    <form name=\"password_form\" novalidate ng-submit=\"createWallet()\">\n" +
    "      <div>\n" +
    "        <input type=\"password\" ng-model=\"account.password\" ng-minlength=\"8\"\n" +
    "          name=\"password\" required=\"\" placeholder=\"Password\" class=\"form-control\">\n" +
    "      </div>\n" +
    "      <div ng-show=\"password_form.$submitted || password_form.password.$touched\">\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.password.$error.required\">A password must be entered.</div>\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.password.$error.minlength\">A password should contain at least 8 characters.</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"top-10\">\n" +
    "        <input type=\"password\" ng-model=\"account.password_repeat\" match=\"account.password\"\n" +
    "          name=\"password_repeat\" required=\"\" placeholder=\"Repeat password\" class=\"form-control\"\n" +
    "          ng-disabled=\"!isObjectEmpty(password_form.password.$error)\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"password_form.$submitted || password_form.password_repeat.$touched\">\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.password_repeat.$error.required\">Enter the same password again.</div>\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.password_repeat.$error.mismatch\">Passwords do not match.</div>\n" +
    "      </div>\n" +
    "      <p class=\"top-20\">Please enter a name for the account.</p>\n" +
    "      <div class=\"top-10\">\n" +
    "        <input type=\"text\" ng-model=\"account.name\" ng-minlength=\"1\"\n" +
    "          name=\"name\" required=\"\" placeholder=\"Account name\" class=\"form-control\"\n" +
    "          ng-disabled=\"!isObjectEmpty(password_form.password_repeat.$error)\">\n" +
    "      </div>\n" +
    "\n" +
    "      <div ng-show=\"password_form.$submitted || password_form.name.$touched\">\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.name.$error.required\">A name for the account must be entered.</div>\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.name.$error.minlength\">The name should contain at least 1 character.</div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"submit\" class=\"btn btn-success\"\n" +
    "      ng-disabled=\"password_form.$invalid\"\n" +
    "      ng-click=\"ok()\"\n" +
    "      ng-show=\"!showLoadingSpinner\">\n" +
    "      Create Account\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-success\"\n" +
    "      ng-show=\"showLoadingSpinner\"\n" +
    "      disabled>\n" +
    "      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "      Creating...\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<!--<div ng-if=\"hasKeystore\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <form name=\"account_form\" novalidate>\n" +
    "      <p class=\"top-20\">Please enter a name for the account.</p>\n" +
    "      <div class=\"top-10\">\n" +
    "        <input type=\"text\" ng-model=\"account.name\" ng-minlength=\"1\"\n" +
    "          name=\"name\" required=\"\" placeholder=\"Account name\" class=\"form-control\">\n" +
    "      </div>\n" +
    "      <div ng-show=\"account_form.name.$invalid && !account_form.name.$pristine\">\n" +
    "        <div class=\"alert-fail\" ng-show=\"account_form.name.$error.required\">A name for the account must be entered.</div>\n" +
    "        <div class=\"alert-fail\" ng-show=\"account_form.name.$error.minlength\">The name should contain at least 1 character.</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"top-20\">Provide your password.</p>\n" +
    "      <div class=\"top-10\">\n" +
    "        <input type=\"password\" ng-model=\"account.password\" ng-minlength=\"8\"\n" +
    "          name=\"password\" required=\"\" placeholder=\"Password\" class=\"form-control\"\n" +
    "          ng-disabled=\"!isObjectEmpty(account_form.name.$error)\">\n" +
    "      </div>\n" +
    "      <div ng-show=\"account_form.password.$invalid && !account_form.password.$pristine\">\n" +
    "        <div class=\"alert-fail\" ng-show=\"account_form.password.$error.required\">A password must be entered.</div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"submit\" class=\"btn btn-success\"\n" +
    "      ng-disabled=\"account_form.$invalid\"\n" +
    "      ng-click=\"newAccount()\"\n" +
    "      ng-show=\"!showLoadingSpinner\">\n" +
    "      Create Account\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-success\"\n" +
    "      ng-show=\"showLoadingSpinner\"\n" +
    "      disabled>\n" +
    "      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "      Creating...\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>-->\n"
  );


  $templateCache.put('partials/modals/addNotifications.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Notifications\n" +
    "  </h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\" id=\"modal-body\" ng-show=\"!showAlertData\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "    Loading...\n" +
    "  </div>\n" +
    "</div>\n" +
    "\n" +
    "<form class=\"form\" name=\"addNotifications\" ng-show=\"showAlertData\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      Notify me on:\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-repeat=\"event in events track by $index\">\n" +
    "      <label class=\"checkbox-inline\">\n" +
    "          <input type=\"checkbox\" value=\"\"\n" +
    "          ng-model=\"selectedEvents[event.name]\">\n" +
    "          <span alert-event-description=\"{{event.name | formatEventName}}\"></span>\n" +
    "      </label>\n" +
    "      <!-- TO BE Handled in another moment\n" +
    "      <div class=\"form-group\" ng-repeat=\"param in event.inputs track by $index\" >\n" +
    "          <label ng-attr-for=\"{{ 'value-' + $parent.$index + '-' + $index }}\">{{param.name}}</label>\n" +
    "          <input ng-attr-id=\"{{ 'value-' + $parent.$index + '-' + $index }}\"\n" +
    "            type=\"text\"\n" +
    "            class=\"form-control\"\n" +
    "            ng-model=\"params[event.name][param.name]\">\n" +
    "      </div>\n" +
    "      -->\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <input type=\"button\" class=\"btn btn-sm btn-primary\"\n" +
    "        ng-value=\"subscribeUnsubscribeValue\" ng-click=\"subscribeUnsubscribe()\">\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\"\n" +
    "      ng-show=\"!showLoadingSpinner\">\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-default\" type=\"button\"\n" +
    "      ng-show=\"showLoadingSpinner\"\n" +
    "      disabled>\n" +
    "      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "      Sending...\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/addOwner.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Add owner\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" id=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"owner.name\" required />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"address\">Address</label>\n" +
    "    <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"owner.address\" required />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\" ng-disabled=\"!owner.address.length > 0\">\n" +
    "    Ok\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/addWalletOwner.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Add owner\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"form\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <div class=\"form-group\" show-hide-by-connectivity=\"online\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"owner.name\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Address</label>\n" +
    "      <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"owner.address\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"form.$invalid\"\n" +
    "      disabled-if-invalid-address=\"{{owner.address}}\"\n" +
    "      ng-click=\"send()\" show-hide-by-connectivity=\"online\">\n" +
    "      Send multisig transaction\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"form.$invalid\" ng-click=\"sign()\" show-hide-by-connectivity=\"offline\">\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/askLightWalletPassword.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    {{title ? title : 'Add wallet'}}\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"password_form\" novalidate>\n" +
    "    <p class=\"top-20\">Please enter your password.</p>\n" +
    "\n" +
    "    <div ng-show=\"!hasError\" class=\"top-10\">\n" +
    "      <input type=\"password\" ng-model=\"password\" ng-minlength=\"8\"\n" +
    "        call-func-on-key-enter=\"ok()\"\n" +
    "        name=\"password\" required=\"\" placeholder=\"Password\" class=\"form-control\">\n" +
    "    </div>\n" +
    "    <div ng-show=\"hasError\" class=\"has-error has-feedback top-10\">\n" +
    "      <input type=\"password\" ng-model=\"password\" ng-minlength=\"8\"\n" +
    "        call-func-on-key-enter=\"ok()\"\n" +
    "        name=\"password\" required=\"\" placeholder=\"Password\" class=\"form-control\">\n" +
    "      <span class=\"glyphicon glyphicon-remove form-control-feedback\"></span>      \n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-footer top-20\">\n" +
    "  <button type=\"submit\" class=\"btn btn-success\"\n" +
    "    ng-disabled=\"password_form.$invalid\"\n" +
    "    ng-click=\"ok()\"\n" +
    "    ng-show=\"!showLoadingSpinner\">\n" +
    "    Ok\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-success\"\n" +
    "    ng-show=\"showLoadingSpinner\"\n" +
    "    disabled>\n" +
    "    <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "    Executing...\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/chooseWeb3Wallet.html',
    "<div class=\"modal-header\">\n" +
    "  <div class=\"bootstrap-dialog-header\">\n" +
    "    <div class=\"bootstrap-dialog-title\">\n" +
    "      Select a Web3 wallet provider\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"col-lg-4 col-md-4 col-xs-12\">\n" +
    "      <button type=\"button\" class=\"btn btn-default\" ng-click=\"ok('ledger')\">\n" +
    "        <h4>\n" +
    "          Ledger wallet\n" +
    "        </h4>\n" +
    "      </button>\n" +
    "  </div>\n" +
    "  <div class=\"col-lg-4 col-md-4 col-xs-12\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"ok('lightwallet')\">\n" +
    "      <h4>\n" +
    "      Light wallet\n" +
    "      </h4>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "  <div class=\"col-lg-4 col-md-4 col-xs-12\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-click=\"ok('remotenode')\">\n" +
    "      <h4>\n" +
    "        Remote node\n" +
    "      </h4>\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/confirmTransaction.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Confirm transaction\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"send()\">\n" +
    "    Send transaction\n" +
    "  </button>  \n" +
    "  <button type=\"button\" class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/confirmTransactionOffline.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Confirm transaction offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form ng-submit=\"signOffline()\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"nonce\">Transaction ID</label>\n" +
    "      <input type=\"number\" class=\"form-control\" ng-model=\"transactionId\" required \\>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <input class=\"btn btn-default\" type=\"submit\" value=\"Confirm offline\" />\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/deleteDApp.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Delete Authorization Code\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"signupForm\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    Are you sure to delete your authorization code?\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\"\n" +
    "      ng-show=\"!showLoadingSpinner\">\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-default\" type=\"button\"\n" +
    "      ng-show=\"showLoadingSpinner\"\n" +
    "      disabled>\n" +
    "      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "      Deleting...\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/deposit.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Deposit\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"value\">Amount (ETH):</label>\n" +
    "      <input id=\"value\" type=\"number\" class=\"form-control\" ng-model=\"amount\" step=\"any\" min=\"0\" max=\"999999999999999\" required >\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"deposit()\" ng-disabled=\"form.$invalid\" class=\"btn btn-default\" show-hide-by-connectivity=\"online\">\n" +
    "      Send transaction\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"sign()\" ng-disabled=\"form.$invalid\" class=\"btn btn-default\" show-hide-by-connectivity=\"offline\">\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/depositToken.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Deposit token\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"value\">Amount ({{token.symbol}}):</label>\n" +
    "      <input id=\"value\" type=\"number\" class=\"form-control\" ng-model=\"amount\" step=\"any\" min=\"0\" max=\"999999999999999\" required>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"deposit()\" class=\"btn btn-default\" show-hide-by-connectivity=\"online\" ng-disabled=\"form.$invalid\">\n" +
    "      Send transaction\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"sign()\" class=\"btn btn-default\" show-hide-by-connectivity=\"offline\" ng-disabled=\"form.$invalid\">\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/disclaimer.html',
    "<div class=\"modal-header\">\n" +
    "  <div class=\"bootstrap-dialog-header\">\n" +
    "    <div class=\"bootstrap-dialog-title\">Important notice</div>\n" +
    "  </div>  \n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    Don't use the wallet hosted at\n" +
    "    <a href=\"https://wallet.gnosis.pm\" class=\"prevent-focus\" target=\"_blank\">https://wallet.gnosis.pm</a> to sign transactions.\n" +
    "    Use <a href=\"https://wallet.gnosis.pm\" target=\"_blank\">https://wallet.gnosis.pm</a> only to\n" +
    "    check the status of your wallet. Use a locally installed version for signing.\n" +
    "    A version can be obtained <a href=\"https://github.com/ConsenSys/MultiSigWallet\" target=\"_blank\">here</a>.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    All smart contracts have been audited carefully multiple times.\n" +
    "    However, all contracts are <strong>WITHOUT ANY WARRANTY;</strong> without even\n" +
    "    the implied warranty of <strong>MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE</strong>.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    Use at your own risk.\n" +
    "  </p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" ng-click=\"ok()\" class=\"btn btn-default\" id=\"terms-button\" >\n" +
    "    I confirm the terms and conditions\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/disclaimerElectron.html',
    "<div class=\"modal-header\">\n" +
    "  <div class=\"bootstrap-dialog-header\">\n" +
    "    <div class=\"bootstrap-dialog-title\">Important notice</div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">  \n" +
    "  <p>\n" +
    "    All smart contracts have been audited carefully multiple times.\n" +
    "    However, all contracts are <strong>WITHOUT ANY WARRANTY;</strong> without even\n" +
    "    the implied warranty of <strong>MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE</strong>.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    Use at your own risk.\n" +
    "  </p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" ng-click=\"ok()\" class=\"btn btn-default\" id=\"terms-button\" >\n" +
    "    I confirm the terms and conditions\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/editABI.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Edit ABI\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" id=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Contract name</label>\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"name\" name=\"name\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"abi\">ABI</label>\n" +
    "    <textarea rows=\"5\" id=\"abi\" type=\"text\" class=\"form-control\" ng-model=\"abi\" required >\n" +
    "    </textarea>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\">\n" +
    "    Ok\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/editLightWalletAccount.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Edit account\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "\n" +
    "  <form name=\"edit_form\" novalidate>\n" +
    "    <div>\n" +
    "      <input type=\"text\" ng-model=\"account.new_name\" ng-minlength=\"1\"\n" +
    "        name=\"name\" required=\"\" placeholder=\"Name\" class=\"form-control\">\n" +
    "    </div>\n" +
    "    <div class=\"top-10\">\n" +
    "      <input type=\"text\" ng-model=\"account.address\"\n" +
    "        name=\"address\" required=\"\" class=\"form-control\" disabled>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"submit\" class=\"btn btn-success\"\n" +
    "    ng-disabled=\"edit_form.$invalid\"\n" +
    "    ng-click=\"ok()\">\n" +
    "    Update\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/editOwner.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Edit owner\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" id=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"owner.name\" required />\n" +
    "  </div>  \n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\">\n" +
    "    Ok\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/editToken.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Add/edit token\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form name=\"form\" class=\"form\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Address</label>\n" +
    "      <input id=\"address\" type=\"text\" class=\"form-control\" ng-min=\"40\" ng-change=\"updateInfo()\"\n" +
    "      ng-model=\"editToken.address\" ng-disabled=\"editMode\" required />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input id=\"name\" type=\"text\" class=\"form-control\" ng-disabled=\"!editToken.address\" ng-model=\"editToken.name\" required />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"symbol\">Symbol</label>\n" +
    "      <input id=\"symbol\" type=\"text\" class=\"form-control\" ng-disabled=\"!editToken.address\" ng-model=\"editToken.symbol\" required />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"decimals\">Decimals</label>\n" +
    "      <input id=\"decimals\" type=\"number\" class=\"form-control\" ng-disabled=\"!editToken.address\" ng-model=\"editToken.decimals\" min=\"0\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\"\n" +
    "      disabled-if-invalid-address=\"{{editToken.address}}\"\n" +
    "      ng-disabled=\"form.$invalid\">\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/editWallet.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Edit wallet\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"form\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"name\" required />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Address</label>\n" +
    "      <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"address\" disabled />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\" ng-disabled=\"form.$invalid\">\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/executeMultisigTransactionOffline.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Execute transaction offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form ng-submit=\"ok()\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"nonce\">Transaction ID</label>\n" +
    "      <input type=\"number\" class=\"form-control\" ng-model=\"transactionId\" required \\>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <input class=\"btn btn-default\" type=\"submit\" value=\"Execute offline\" ng-click=\"executeOffline()\" />\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/executeTransaction.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Execute transaction\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"send()\">\n" +
    "    Send transaction\n" +
    "  </button>  \n" +
    "  <button type=\"button\" class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/exportWalletConfiguration.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Export wallets\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <textarea ng-model=\"configuration\" id=\"configuration\" class=\"form-control json-config\"></textarea>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ngclipboard-success=\"copy()\" ngclipboard data-clipboard-target=\"#configuration\">\n" +
    "    Copy\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-danger\" ng-click=\"close()\">\n" +
    "    Close\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/getNonce.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Get nonce\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Address</label>\n" +
    "      <input id=\"address\" class=\"form-control\" type=\"text\" ng-minlength=\"40\" ng-model=\"address\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\" ng-disabled=\"form.$invalid\" >\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/importLightWalletAccount.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Account import\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div>\n" +
    "  <div class=\"modal-body\">\n" +
    "\n" +
    "    <form name=\"password_form\" novalidate ng-submit=\"uploadKeystore()\">\n" +
    "      <p class=\"top-20\">Please select your keystore file.</p>\n" +
    "      <div>\n" +
    "        <button  type=\"button\"\n" +
    "          class=\"btn btn-default\"\n" +
    "          onclick=\"document.querySelector('.keystore-file-upload').click()\">\n" +
    "          Browse...\n" +
    "        </button>\n" +
    "        <input class=\"keystore-file-upload\"\n" +
    "          type=\"file\"\n" +
    "          style=\"display:none;\"\n" +
    "          onchange=\"angular.element(this).scope().isFileValid(this)\">\n" +
    "          {{fileName}}\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"top-20\">Password</p>\n" +
    "      <div>\n" +
    "        <input type=\"password\" ng-model=\"account.password\" ng-minlength=\"8\"\n" +
    "          name=\"password\" required=\"\" placeholder=\"Password\" class=\"form-control\"\n" +
    "          ng-disabled=\"!fileValid\">\n" +
    "      </div>\n" +
    "      <div ng-show=\"password_form.$submitted || password_form.password.$touched\">\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.password.$error.required\">A password must be entered.</div>\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.password.$error.minlength\">A password should contain at least 8 characters.</div>\n" +
    "      </div>\n" +
    "\n" +
    "      <p class=\"top-20\">Please enter a name for the account.</p>\n" +
    "      <div class=\"top-10\">\n" +
    "        <input type=\"text\" ng-model=\"account.name\" ng-minlength=\"1\"\n" +
    "          name=\"name\" required=\"\" placeholder=\"Account name\" class=\"form-control\"\n" +
    "          ng-disabled=\"!isObjectEmpty(password_form.password.$error)\">\n" +
    "      </div>\n" +
    "      <div ng-show=\"password_form.$submitted || password_form.name.$touched\">\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.name.$error.required\">A name for the account must be entered.</div>\n" +
    "        <div class=\"alert-fail\" ng-show=\"password_form.name.$error.minlength\">The name should contain at least 1 character.</div>\n" +
    "      </div>\n" +
    "    </form>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"submit\" class=\"btn btn-success\"\n" +
    "      ng-disabled=\"password_form.$invalid\"\n" +
    "      ng-click=\"uploadKeystore()\"\n" +
    "      ng-show=\"!showLoadingSpinner\">\n" +
    "      Import Account\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-success\"\n" +
    "      ng-show=\"showLoadingSpinner\"\n" +
    "      disabled>\n" +
    "      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "      Importing...\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/importWalletConfiguration.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Import wallets\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <textarea ng-model=\"configuration\" class=\"form-control json-config\"></textarea>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"load()\">\n" +
    "    Save\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-danger\" ng-click=\"close()\">\n" +
    "    Close\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/ledgerHelp.html',
    "<div class=\"modal-header\">\n" +
    "  <div class=\"bootstrap-dialog-header\">\n" +
    "    <div class=\"bootstrap-dialog-title\">\n" +
    "      Unlock your Ledger wallet\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <img src=\"./img/ledger.jpg\" class=\"img-responsive\" />\n" +
    "  <br>\n" +
    "  <p>\n" +
    "    In order to use the multisig with your Ledger wallet you need to:\n" +
    "    <ul>\n" +
    "      <li>\n" +
    "        Connect your Ledger wallet to your USB port\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        Enter your Ledger wallet pin code\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        Update ledger firmware if version < 1.2\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        Install the Ethereum app on your Ledger wallet\n" +
    "      </li>\n" +
    "      <li ng-hide=\"isElectron\">\n" +
    "        Enable Browser support and contract data on settings\n" +
    "      </li>\n" +
    "      <li ng-show=\"isElectron\">\n" +
    "        Disable Browser support and enable contract data on settings\n" +
    "      </li>\n" +
    "      <li>\n" +
    "        Allow the multisig DApp to access your accounts on the Ledger wallet\n" +
    "      </li>\n" +
    "    </ul>\n" +
    "  </p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" ng-click=\"ok()\" class=\"btn btn-default\" id=\"terms-button\" >\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/lightWalletPassword.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Account password\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "\n" +
    "  <p class=\"top-20\">Please enter your password to securely decrypt your wallet.</p>\n" +
    "\n" +
    "  <form name=\"password_form\" novalidate ng-submit=\"decryptWallet()\">\n" +
    "    <div>\n" +
    "      <input type=\"password\" ng-model=\"account.password\" ng-minlength=\"8\"\n" +
    "        name=\"password\" required=\"\" placeholder=\"Password\" class=\"form-control\">\n" +
    "    </div>    \n" +
    "    <div ng-show=\"password_form.password.$invalid && !password_form.password.$pristine\">\n" +
    "      <div class=\"alert-fail\" ng-show=\"password_form.password.$error.required\">A password must be entered.</div>\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"submit\" class=\"btn btn-success\"\n" +
    "    ng-disabled=\"password_form.$invalid\"\n" +
    "    ng-click=\"ok()\">\n" +
    "    Login\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/notificationsSignup.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Notifications signup\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"signupForm\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Email</label>\n" +
    "      <input name=\"email\" type=\"email\" class=\"form-control\" ng-model=\"request.email\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\"\n" +
    "      ng-disabled=\"!request.email && signupForm.email.$error\"\n" +
    "      ng-show=\"!showLoadingSpinner\">\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-default\" type=\"button\" id=\"load\"      \n" +
    "      ng-show=\"showLoadingSpinner\"\n" +
    "      disabled>\n" +
    "      <i class=\"fa fa-spinner fa-spin\"></i>\n" +
    "      Sending...\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/removeLightWalletAccount.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Remove account\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <form name=\"edit_form\" novalidate>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"account.name\" disabled />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Account</label>\n" +
    "      <input id=\"address\" type=\"text\" ng-model=\"account.address\" name=\"address\"\n" +
    "      required=\"\" class=\"form-control\" disabled>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"confirmation\">Enter account name for confirmation</label>\n" +
    "      <input id=\"confirmation\" type=\"text\" class=\"form-control\" ng-model=\"confirmation\" />\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"submit\" class=\"btn btn-success\"\n" +
    "    ng-click=\"ok()\"\n" +
    "    ng-disabled=\"confirmation != account.name\">\n" +
    "    Confirm\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/removeOwner.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Remove owner\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"owner.name\" readonly />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"address\"> Address </label>\n" +
    "    <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"owner.address\" readonly />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ng-click=\"send()\">\n" +
    "    Send multisig transaction\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/removeToken.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Remove token\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"name\">Name</label>\n" +
    "    <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"token.name\" onfocus=\"this.blur()\" readonly />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"address\"> Address </label>\n" +
    "    <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"token.address\" onfocus=\"this.blur()\" readonly />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"symbol\"> Symbol </label>\n" +
    "    <input id=\"symbol\" type=\"text\" class=\"form-control\" ng-model=\"token.symbol\" onfocus=\"this.blur()\" readonly />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"decimals\"> Decimals </label>\n" +
    "    <input id=\"decimals\" type=\"text\" class=\"form-control\" ng-model=\"token.decimals\" onfocus=\"this.blur()\" readonly />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\">\n" +
    "    Ok\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/removeWallet.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Remove wallet\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"removeWallet\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"wallet.name\" disabled />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Address</label>\n" +
    "      <input id=\"address\" type=\"text\" class=\"form-control\" disabled ng-model=\"wallet.address\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"confirmation\">Enter wallet name for confirmation</label>\n" +
    "      <input id=\"confirmation\" type=\"text\" class=\"form-control\" ng-model=\"confirmation\" />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\" ng-disabled=\"confirmation != wallet.name\">\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/removeWalletOwnerOffline.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Add owner offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" id=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"address\">Address</label>\n" +
    "    <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"owner.address\" required />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ng-click=\"sign()\" show-hide-by-connectivity=\"offline\">\n" +
    "    Sign offline\n" +
    "  </button>  \n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/replaceOwner.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Replace owner\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"owner.name\" readonly />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\"> Owner address </label>\n" +
    "      <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"owner.address\" readonly />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"newOwner\"> New owner address </label>\n" +
    "      <input id=\"newOwner\" type=\"text\" class=\"form-control\" ng-minlength=\"40\" ng-model=\"newOwner\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-disabled=\"form.$invalid\"\n" +
    "      disabled-if-invalid-address=\"{{newOwner}}\"\n" +
    "      ng-click=\"send()\">\n" +
    "      Send multisig transaction\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/replaceOwnerOffline.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Replace owner offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form name=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"oldOwner\"> Owner address </label>\n" +
    "      <input id=\"oldOwner\" type=\"text\" class=\"form-control\" ng-model=\"oldOwner\" required />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"newOwner\"> New owner address </label>\n" +
    "      <input id=\"newOwner\" type=\"text\" class=\"form-control\" ng-model=\"newOwner\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"sign()\" ng-disabled=\"form.$invalid\" >\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/resetSettings.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Reset settings\n" +
    "  </h3>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"modal-body\" id=\"modal-body\">\n" +
    "  Do you want to reset settings to factory values?\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\">\n" +
    "    Ok\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/restoreSeed.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Restore seed\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\" id=\"modal-body\">\n" +
    "  <form name=\"restore_form\" novalidate>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"seed\">Wallet seed phrase</label>\n" +
    "      <textarea id=\"seed\" class=\"form-control\" ng-model=\"account.seed\" required></textarea>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"password\">Type a password to protect your wallet</label>\n" +
    "      <input id=\"password\" type=\"password\" class=\"form-control\" ng-model=\"account.password\" ng-minlength=\"8\" required />\n" +
    "    </div>\n" +
    "  </form>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\"\n" +
    "    ng-disabled=\"!account.seed.length > 0 || restore_form.$invalid\"\n" +
    "    ng-click=\"ok()\">\n" +
    "    Ok\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/restoreWallet.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Restore deployed wallet\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"restoreWallet\">\n" +
    "  <div class=\"modal-body\" id=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Name</label>\n" +
    "      <input id=\"name\" type=\"text\" class=\"form-control\" ng-model=\"old.name\" required />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Address</label>\n" +
    "      <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"old.address\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button class=\"btn btn-default\" type=\"button\" ng-click=\"ok()\" ng-disabled=\"restoreWallet.$invalid\">\n" +
    "      Ok\n" +
    "    </button>\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/retrieveNonce.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Multisig nonce\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"nonce\">Nonce</label>\n" +
    "    <input id=\"nonce\" class=\"form-control\" type=\"text\" readonly ng-model=\"nonce\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ngclipboard-success=\"copy()\" ngclipboard data-clipboard-target=\"#nonce\">\n" +
    "    Copy\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/revokeConfirmation.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Revoke confirmation\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" class=\"btn btn-default\" ng-click=\"send()\">\n" +
    "    Send transaction\n" +
    "  </button>\n" +
    "  <button type=\"button\" class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/revokeMultisigConfirmationOffline.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Revoke transaction confirmation offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form ng-submit=\"ok()\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"nonce\">Transaction ID</label>\n" +
    "      <input type=\"number\" class=\"form-control\" ng-model=\"transactionId\" required \\>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <input class=\"btn btn-default\" type=\"submit\" value=\"Revoke offline\" ng-click=\"revokeOffline()\" />\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/sendTransaction.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Send transaction\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form name=\"form\" class=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"destination\">Destination</label>\n" +
    "      <input id=\"destination\" type=\"text\" ng-model=\"tx.to\" ng-change=\"updateABI()\"  ng-min=\"40\" class=\"form-control\" required>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Contract name (optional)</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"name\" name=\"name\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"value\">Amount (ETH)</label>\n" +
    "      <input id=\"value\" type=\"number\" class=\"form-control\" ng-model=\"tx.value\" min=\"0\" max=\"999999999999999\" ng-required=\"!abi\">\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"abi\">ABI string</label>\n" +
    "      <textarea id=\"abi\" rows=\"3\" class=\"form-control\" ng-model=\"abi\" ng-change=\"updateMethods()\" ng-required=\"!tx.value\"></textarea>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"method\">Method</label>\n" +
    "      <select id=\"method\" ng-model=\"method\" ng-options=\"method.name for method in methods track by method.index\"\n" +
    "       ng-required=\"tx.abi\" class=\"form-control\" ng-change=\"setMethod()\" ng-disabled=\"!abiArray\" ></select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"method && abiArray[method.index].inputs.length > 0\">\n" +
    "      <h3>\n" +
    "        Parameters\n" +
    "      </h3>\n" +
    "      <div class=\"form-group\" ng-repeat=\"param in abiArray[method.index].inputs\" >\n" +
    "        <div ng-switch on=\"param.type\">\n" +
    "          <label ng-attr-for=\"{{ 'value-' + $index }}\">{{param.name}}</label>\n" +
    "          <input ng-attr-id=\"{{ 'value-' + $index }}\" ng-switch-default type=\"text\" class=\"form-control\" ng-model=\"params[$index]\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"send()\" class=\"btn btn-default\" show-hide-by-connectivity=\"online\"\n" +
    "      disabled-if-invalid-address=\"{{tx.to}}\"\n" +
    "      ng-disabled=\"form.$invalid || abiArray[method.index].constant\">\n" +
    "      Send transaction\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"simulate()\" class=\"btn btn-default\" show-hide-by-connectivity=\"online\"\n" +
    "      disabled-if-invalid-address=\"{{tx.to}}\"\n" +
    "      ng-disabled=\"form.$invalid\">\n" +
    "      Simulate transaction\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"signOff()\" show-hide-by-connectivity=\"offline\" class=\"btn btn-default\" ng-disabled=\"form.$invalid\">\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-danger\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/showConfirmationData.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Confirm offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"gasLimit\">Gas Limit</label>\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"gasLimit\" id=\"gasLimit\" />\n" +
    "  </div>\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"confirmationData\">Data</label>\n" +
    "    <textarea type=\"text\" rows=\"5\" class=\"form-control\" ng-model=\"confirmationData\" id=\"confirmationData\"></textarea>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" ngclipboard-success=\"copy()\" ngclipboard data-clipboard-target=\"#confirmationData\">\n" +
    "    Copy\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/showNonce.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Nonce\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"signed\">Nonce</label>\n" +
    "    <input type=\"text\" class=\"form-control\" ng-model=\"nonce\" id=\"nonce\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" ngclipboard-success=\"copy()\" ngclipboard data-clipboard-target=\"#nonce\">\n" +
    "    Copy\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/showSeed.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Seed\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <span id=\"seed\">{{seed}}</span>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" ngclipboard-success=\"copySeedSuccessMessage()\" ngclipboard data-clipboard-target=\"#seed\">\n" +
    "    Copy\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"close()\">\n" +
    "    Close\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/showSignedTransaction.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Signed transaction\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"signed\">Hex code</label>\n" +
    "    <textarea class=\"form-control\" rows=\"5\" ng-model=\"signed\" id=\"signed\"></textarea>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" ngclipboard-success=\"copy()\" ngclipboard data-clipboard-target=\"#signed\">\n" +
    "    Copy\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/signedTransaction.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Send signed transaction\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"raw\">Signed transaction</label>\n" +
    "    <textarea id=\"raw\" class=\"form-control\" rows=\"5\" ng-model=\"tx\"></textarea>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" ng-click=\"sendRawTransaction()\">\n" +
    "    Send\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/signMultisigConfirmationRevokeOffline.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Sign multisig transaction offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form ng-submit=\"ok()\" name=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"modal-body\">\n" +
    "      <div class=\"form-group\">\n" +
    "        <label for=\"multisig-nonce\">Transaction id</label>\n" +
    "        <input id=\"multisig-nonce\" class=\"form-control\" type=\"number\" ng-model=\"nonces.multisig\" required />\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"account-nonce\">Nonce</label>\n" +
    "      <input id=\"account-nonce\" class=\"form-control\" type=\"number\" ng-model=\"nonces.account\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <input class=\"btn btn-default\" type=\"submit\" value=\"Ok\" ng-disabled=\"form.$invalid\" />\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/signOffline.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Sign transaction offline\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form ng-submit=\"ok()\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"nonce\">Nonce</label>\n" +
    "      <input id=\"nonce\" class=\"form-control\" type=\"number\" ng-model=\"nonce\" ng-min=\"0\" required />\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <input class=\"btn btn-default\" type=\"submit\" value=\"Ok\" />\n" +
    "    <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/simulatedTransaction.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Simulated Result\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"form-group\">\n" +
    "    <label for=\"result\">Result</label>\n" +
    "    <input id=\"result\" class=\"form-control\" type=\"text\" readonly ng-model=\"result\" />\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button class=\"btn btn-default\" type=\"button\" ngclipboard-success=\"copy()\" ngclipboard data-clipboard-target=\"#result\">\n" +
    "    Copy\n" +
    "  </button>\n" +
    "  <button class=\"btn btn-danger\" type=\"button\" ng-click=\"cancel()\">\n" +
    "    Cancel\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/spinner.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Approve transaction\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <div class=\"sk-circle\">\n" +
    "    <div class=\"sk-circle1 sk-child\"></div>\n" +
    "    <div class=\"sk-circle2 sk-child\"></div>\n" +
    "    <div class=\"sk-circle3 sk-child\"></div>\n" +
    "    <div class=\"sk-circle4 sk-child\"></div>\n" +
    "    <div class=\"sk-circle5 sk-child\"></div>\n" +
    "    <div class=\"sk-circle6 sk-child\"></div>\n" +
    "    <div class=\"sk-circle7 sk-child\"></div>\n" +
    "    <div class=\"sk-circle8 sk-child\"></div>\n" +
    "    <div class=\"sk-circle9 sk-child\"></div>\n" +
    "    <div class=\"sk-circle10 sk-child\"></div>\n" +
    "    <div class=\"sk-circle11 sk-child\"></div>\n" +
    "    <div class=\"sk-circle12 sk-child\"></div>\n" +
    "  </div>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/updateRequired.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Change required confirmations\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form name=\"form\" class=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"confirmations\">Required confirmations</label>\n" +
    "      <input id=\"confirmations\" type=\"number\" class=\"form-control\" ng-min=\"1\" ng-model=\"required\" required>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"form.$invalid\" ng-click=\"update()\" show-hide-by-connectivity=\"online\">\n" +
    "      Send multisig transaction\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-default\" ng-disabled=\"form.$invalid\" ng-click=\"signOffline()\" show-hide-by-connectivity=\"offline\">\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button type=\"button\" class=\"btn btn-danger\" ng-click=\"cancel()\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/walletTransaction.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Send multisig transaction\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form class=\"form\" name=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"destination\">Destination</label>\n" +
    "      <input id=\"destination\" type=\"text\" ng-model=\"tx.to\" ng-change=\"updateABI()\"  ng-min=\"40\" class=\"form-control\" required>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"name\">Contract name (optional)</label>\n" +
    "      <input type=\"text\" class=\"form-control\" ng-model=\"name\" name=\"name\" />\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"value\">Amount (ETH)</label>\n" +
    "      <input id=\"value\" type=\"number\" class=\"form-control\" ng-model=\"tx.value\" min=\"0\" max=\"999999999999999\" ng-required=\"!abi\">\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"abi\"> ABI string </label>\n" +
    "      <textarea id=\"abi\" rows=\"5\" type=\"text\" class=\"form-control\" ng-model=\"abi\" ng-change=\"updateMethods()\" ng-required=\"!tx.value\"></textarea>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"method\">Method</label>\n" +
    "      <select id=\"method\" ng-model=\"method\"\n" +
    "       ng-options=\"method.name for method in methods track by method.index\"\n" +
    "       ng-required=\"tx.abi\" class=\"form-control\" ng-change=\"setMethod()\" ng-disabled=\"!abiArray\" ></select>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\" ng-show=\"method && abiArray[method.index].inputs.length > 0\">\n" +
    "      <h3>\n" +
    "        Parameters\n" +
    "      </h3>\n" +
    "      <div class=\"form-group\" ng-repeat=\"param in abiArray[method.index].inputs\" >\n" +
    "        <div ng-switch on=\"param.type\">\n" +
    "          <label ng-attr-for=\"{{ 'value-' + $index }}\">{{param.name}}</label>\n" +
    "          <input ng-attr-id=\"{{ 'value-' + $index }}\" ng-switch-default type=\"text\" class=\"form-control\" ng-model=\"params[$index]\">\n" +
    "        </div>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"send()\" class=\"btn btn-default\" ng-disabled=\"form.$invalid\"\n" +
    "      disabled-if-invalid-address=\"{{tx.to}}\"\n" +
    "      show-hide-by-connectivity=\"online\">\n" +
    "      Send multisig transaction\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"signOff()\" class=\"btn btn-default\" ng-disabled=\"form.$invalid\" show-hide-by-connectivity=\"offline\">\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-danger\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );


  $templateCache.put('partials/modals/web3Wallets.html',
    "<div class=\"modal-header\">\n" +
    "  <div class=\"bootstrap-dialog-header\">\n" +
    "    <div class=\"bootstrap-dialog-title\">\n" +
    "      No account found\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>\n" +
    "<div class=\"modal-body\">\n" +
    "  <p>\n" +
    "    This wallet requires a 3rd party Ethereum account management software like\n" +
    "    <a href=\"https://metamask.io/\" class=\"prevent-focus\" target=\"_blank\">Metamask</a>,\n" +
    "    <a href=\"https://github.com/ethereum/mist\" target=\"_blank\">Mist</a> or\n" +
    "    <a href=\"https://ethcore.io/parity.html\" target=\"_blank\">Parity</a>.\n" +
    "  </p>\n" +
    "  <p>\n" +
    "    You can monitor existing wallets without an account management software but you cannot create new wallets or sign transactions.\n" +
    "  </p>\n" +
    "</div>\n" +
    "<div class=\"modal-footer\">\n" +
    "  <button type=\"button\" ng-click=\"ok()\" class=\"btn btn-default\" id=\"terms-button\" >\n" +
    "    Ok\n" +
    "  </button>\n" +
    "</div>\n"
  );


  $templateCache.put('partials/modals/withdrawToken.html',
    "<div class=\"modal-header\">\n" +
    "  <h3 class=\"modal-title\">\n" +
    "    Withdraw token\n" +
    "  </h3>\n" +
    "</div>\n" +
    "<form name=\"form\" class=\"form\">\n" +
    "  <div class=\"modal-body\">\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"amount\">Amount ({{token.symbol}})</label>\n" +
    "      <input id=\"amount\" type=\"number\" class=\"form-control\" ng-model=\"amount\" ng-min=\"0\" max=\"999999999999999\" required>\n" +
    "    </div>\n" +
    "    <div class=\"form-group\">\n" +
    "      <label for=\"address\">Destination</label>\n" +
    "      <input id=\"address\" type=\"text\" class=\"form-control\" ng-model=\"to\" ng-minlength=\"40\" required>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "  <div class=\"modal-footer\">\n" +
    "    <button type=\"button\" ng-click=\"send()\" class=\"btn btn-default\" ng-disabled=\"form.$invalid\" show-hide-by-connectivity=\"online\">\n" +
    "      Send multisig transaction\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"signOff()\" class=\"btn btn-default\" ng-disabled=\"form.$invalid\" show-hide-by-connectivity=\"offline\">\n" +
    "      Sign offline\n" +
    "    </button>\n" +
    "    <button type=\"button\" ng-click=\"cancel()\" class=\"btn btn-danger\">\n" +
    "      Cancel\n" +
    "    </button>\n" +
    "  </div>\n" +
    "</form>\n"
  );

}]);
