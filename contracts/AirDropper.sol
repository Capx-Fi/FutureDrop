// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/utils/SafeERC20Upgradeable.sol";

import "@openzeppelin/contracts-upgradeable/security/ReentrancyGuardUpgradeable.sol";
pragma solidity 0.8.4;

contract AirDropper is Initializable, UUPSUpgradeable, OwnableUpgradeable, ReentrancyGuardUpgradeable {
  using SafeERC20Upgradeable for IERC20Upgradeable;

  uint256 internal constant _ACTIVE = 2;
  uint256 internal constant _INACTIVE = 1;
  
  uint256 internal _killed;
  uint256 internal _batchAirDropLimit;

  function isKilled() internal view {
        require(_killed != _ACTIVE, "FailSafeMode: ACTIVE");
    }

    /// @notice Disables all the functionality of the contract.
    function kill() external onlyOwner {
        _killed = _ACTIVE;
    }

    /// @notice Enables all  the functionality of the contract.
    function revive() external onlyOwner {
        _killed = _INACTIVE;
    }

  function initialize(uint256 batchLimit) public initializer {
      require(batchLimit != 0, "Invalid BatchLimit.");
      __Ownable_init();
      __ReentrancyGuard_init();
      _killed = _INACTIVE;
      _batchAirDropLimit = batchLimit;

  }

  function _authorizeUpgrade(address _newImplementation)
        internal
        override
        onlyOwner
  {}

  event AirDrop(
    address indexed tokenAddress,
    address indexed receipent,
    uint256 amount
  );

  function setBatchLimit(
    uint256 batchLimit
  ) external virtual nonReentrant onlyOwner{
    isKilled();
    require(batchLimit != 0, "Invalid BatchLimit");
    _batchAirDropLimit = batchLimit;
  }

  function _safeTransferERC20(
        address _tokenAddress,
        address _from,
        address _to,
        uint256 _amount
    ) internal {
        // transfering ERC20 tokens from _projectOwner (msg.sender) to contract
        if (_from == address(this)) {
            IERC20Upgradeable(_tokenAddress).safeTransfer(_to, _amount);
        } else {
            IERC20Upgradeable(_tokenAddress).safeTransferFrom(
                _from,
                _to,
                _amount
            );
        }
    }

  function singleValueAirdrop(
    address tokenAddress,
    address[] memory receipents,
    uint256 totalTokens,
    uint256 airDropTokenQty
  ) external virtual nonReentrant {
    isKilled();
    // Internally used variables
    uint256 totalAmt = 0;
    uint256 i = 0;
    require(
      tokenAddress != address(0) &&
      receipents.length != 0 &&
      totalTokens != 0 &&
      airDropTokenQty != 0
      , "Invalid Details"
    );
    
    require(
      airDropTokenQty * receipents.length == totalTokens
      , "Inconsistency in AirDrop List"
    );

    require(
      receipents.length <= _batchAirDropLimit
      , "AirDrop Limit Breached."
    );

    // Transfer tokens from the user to contract.
    _safeTransferERC20(
        tokenAddress,
        msg.sender,
        address(this),
        totalTokens
    );

    assert(
      IERC20Upgradeable(tokenAddress).balanceOf(address(this)) >= totalTokens
    );

    for(i = 0; i < receipents.length; i++){
      require(
        receipents[i] != address(0)
        , "Zero Address Error."
      );

      totalAmt += airDropTokenQty;

      // Transfer / AirDrop the token from contract to the receipent.
      _safeTransferERC20(
        tokenAddress,
        address(this),
        receipents[i],
        airDropTokenQty
      );

      emit AirDrop(
        tokenAddress,
        receipents[i],
        airDropTokenQty
      );
    }
    require(totalAmt == totalTokens,"Inconsistent Amount of Tokens");
  }

  function multiValueAirdrop(
    address tokenAddress,
    address[] memory receipents,
    uint256[] memory airDropTokenQty,
    uint256 totalTokens
  ) external virtual nonReentrant {
    isKilled();
    // Internally used variables
    uint256 totalAmt = 0;
    uint256 i = 0;
    require(
      tokenAddress != address(0) &&
      airDropTokenQty.length != 0 &&
      receipents.length != 0 &&
      totalTokens != 0 
      , "Invalid Details"
    );

    require(
      airDropTokenQty.length == receipents.length
      , "Inconsistency in AirDrop List"
    );

    require(
      receipents.length <= _batchAirDropLimit
      , "AirDrop Limit Breached."
    );

    // Transfer tokens from the user to contract.
    _safeTransferERC20(
        tokenAddress,
        msg.sender,
        address(this),
        totalTokens
    );

    assert(
      IERC20Upgradeable(tokenAddress).balanceOf(address(this)) >= totalTokens
    );

    for(i = 0; i < receipents.length; i++){
      require(
        receipents[i] != address(0) && airDropTokenQty[i] != 0
        , "Zero Input Error."
      );

      totalAmt += airDropTokenQty[i];

      // Transfer / AirDrop the token from contract to the receipent.
      _safeTransferERC20(
        tokenAddress,
        address(this),
        receipents[i],
        airDropTokenQty[i]
      );

      emit AirDrop(
        tokenAddress,
        receipents[i],
        airDropTokenQty[i]
      );
    }
    require(totalAmt == totalTokens,"Inconsistent Amount of Tokens");
  }
}
