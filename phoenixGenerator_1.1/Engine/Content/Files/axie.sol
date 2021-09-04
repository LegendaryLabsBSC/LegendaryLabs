#
#  Panoramix v4 Oct 2019 
#  Decompiled source of 0x425372c0ac9D559a186A08A3854E0ddEA1a00d5C
# 
#  Let's make the world open source 
# 
#
#  I failed with these: 
#  - unknown0c0f1727(?)
#  - unknowna86eb1b4(?)
#  - unknownb7efc799(?)
#  - unknowned436a47(?)
#  All the rest is below.
#

def storage:
  unknownd03df6ddAddress is addr at storage 0
  unknownd5ad8bd1Address is addr at storage 1
  stor2 is mapping of uint8 at storage 2
  unknownbf7d5262Address is addr at storage 3
  stor4 is mapping of uint8 at storage 4
  stor5 is mapping of uint8 at storage 5
  stor6 is addr at storage 6
  stor7 is addr at storage 7
  stor7 is uint256 at storage 7
  stor8 is array of uint256 at storage 8
  paused is uint8 at storage 11 offset 160
  owner is addr at storage 11
  unknown07185c0d is array of uint256 at storage 12
  unknown0ce9e666 is uint256 at storage 13
  unknownf41b70d4 is uint256 at storage 14
  unknown35c70378 is uint256 at storage 15
  coreContractAddress is addr at storage 16
  unknown70d8b039Address is addr at storage 17
  unknown9033f714Address is addr at storage 18
  unknown7a9e4de9Address is addr at storage 19
  initialized is uint8 at storage 20 offset 160
  unknown86bc9683Address is addr at storage 20
  breedingFee is uint256 at storage 21
  unknowne120e5e7 is uint8 at storage 22
  unknown95368d2e is uint256 at storage 23
  unknown9b68fac2 is uint8 at storage 24
  unknownb0858db3 is mapping of struct at storage 25
  unknown264629cf is mapping of struct at storage 26
  unknownd935cbeb is mapping of uint256 at storage 27

def unknown07185c0d(uint256 _param1): # not payable
  require _param1 < unknown07185c0d.length
  return unknown07185c0d[_param1]

def unknown0b24d312(addr _param1): # not payable
  return bool(stor2[_param1])

def unknown0ce9e666(): # not payable
  return unknown0ce9e666

def unknown0d037585(addr _param1): # not payable
  return bool(stor4[_param1])

def initialized(): # not payable
  return bool(initialized)

def unknown264629cf(uint256 _param1): # not payable
  return unknown264629cf[_param1].field_0, unknown264629cf[_param1].field_256

def unknown336fab0f(addr _param1): # not payable
  return bool(stor5[_param1])

def unknown35c70378(): # not payable
  return unknown35c70378

def paused(): # not payable
  return bool(paused)

def unknown70d8b039(): # not payable
  return unknown70d8b039Address

def unknown77ab56de(uint256 _param1): # not payable
  return unknownb0858db3[_param1].field_0, 
         unknownb0858db3[_param1].field_256,
         unknownb0858db3[_param1].field_512,
         unknownb0858db3[_param1].field_768,
         unknownb0858db3[_param1].field_1024,
         unknownb0858db3[_param1].field_1280

def unknown7a9e4de9(): # not payable
  return unknown7a9e4de9Address

def unknown86bc9683(): # not payable
  return unknown86bc9683Address

def owner(): # not payable
  return owner

def unknown9033f714(): # not payable
  return unknown9033f714Address

def unknown95368d2e(): # not payable
  return unknown95368d2e

def unknown9b68fac2(): # not payable
  return bool(unknown9b68fac2)

def unknownb0858db3(uint256 _param1): # not payable
  return unknownb0858db3[_param1].field_0, 
         unknownb0858db3[_param1].field_256,
         unknownb0858db3[_param1].field_512,
         unknownb0858db3[_param1].field_768,
         unknownb0858db3[_param1].field_1024,
         unknownb0858db3[_param1].field_1280

def unknownbf7d5262(): # not payable
  return unknownbf7d5262Address

def breedingFee(): # not payable
  return breedingFee

def unknownd03df6dd(): # not payable
  return unknownd03df6ddAddress

def unknownd5ad8bd1(): # not payable
  return unknownd5ad8bd1Address

def unknownd935cbeb(uint256 _param1): # not payable
  return unknownd935cbeb[_param1]

def unknowne120e5e7(): # not payable
  return bool(unknowne120e5e7)

def coreContract(): # not payable
  return coreContractAddress

def unknownf41b70d4(): # not payable
  return unknownf41b70d4

def unknownfa33d7b2(): # not payable
  return unknown07185c0d.length

#
#  Regular functions
#

def _fallback() payable: # default function
  require caller == owner

def unknown1dafc231(): # not payable
  require caller == owner
  initialized = 1

def __callback(bytes32 _myid, string _result, bytes _proof): # not payable
  stop

def tokenFallback(address _from, uint256 _value, bytes _data): # not payable
  revert

def setBreedingFee(uint256 _newfee): # not payable
  require caller == owner
  breedingFee = _newfee

def unpause(): # not payable
  require caller == owner
  require paused
  paused = 0
  log Unpause()

def pause(): # not payable
  require caller == owner
  require not paused
  paused = 1
  log Pause()

def unknowne32bb67b(uint256 _param1): # not payable
  require caller == owner
  unknown95368d2e = _param1

def unknown736b0d9f(addr _param1): # not payable
  require caller == owner
  unknown7a9e4de9Address = _param1

def unknowne071df7f(addr _param1): # not payable
  require caller == owner
  unknown86bc9683Address = _param1

def unknownfaac7d78(addr _param1): # not payable
  require caller == owner
  unknown9033f714Address = _param1

def renounceOwnership(): # not payable
  require caller == owner
  log OwnershipRenounced(address previousOwner=owner)
  owner = 0

def unknown999de878(bool _param1): # not payable
  require caller == owner
  unknowne120e5e7 = uint8(_param1)

def unknowne72aa2c3(bool _param1): # not payable
  require caller == owner
  unknown9b68fac2 = uint8(_param1)

def unknownc6b69bbd(addr _param1): # not payable
  require caller == unknownd03df6ddAddress
  log 0xe4a3e032: addr(_param1), unknownd5ad8bd1Address
  unknownd5ad8bd1Address = _param1

def unknownf535f546(addr _param1): # not payable
  require caller == unknownd03df6ddAddress
  log 0x63c539be: addr(_param1), unknownbf7d5262Address
  unknownbf7d5262Address = _param1

def unknownba4eef17(uint256 _param1): # not payable
  return unknownd935cbeb[_param1], unknown264629cf[stor27[_param1]].field_256

def setWhitelistSetter(address _newSetter): # not payable
  require caller == unknownd03df6ddAddress
  log 0x3e562d70: addr(_newSetter), unknownd03df6ddAddress
  unknownd03df6ddAddress = _newSetter

def reclaimEther(): # not payable
  require caller == owner
  call owner with:
     value eth.balance(this.address) wei
       gas 2300 * is_zero(value) wei
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]

def transferOwnership(address _newOwner): # not payable
  require caller == owner
  require _newOwner
  log OwnershipTransferred(
        address previousOwner=owner,
        address newOwner=_newOwner)
  owner = _newOwner

def unknown21ca802d(addr _param1, bool _param2): # not payable
  require caller == unknownd03df6ddAddress
  stor2[addr(_param1)] = uint8(_param2)
  log 0xb6d566c9: addr(_param1), _param2

def unknown9b59ad94(addr _param1, bool _param2): # not payable
  require caller == unknownd03df6ddAddress
  stor5[addr(_param1)] = uint8(_param2)
  log 0xd3e5d4d3: addr(_param1), _param2

def unknowna5bae82a(addr _param1, bool _param2): # not payable
  require caller == unknownd03df6ddAddress
  stor4[addr(_param1)] = uint8(_param2)
  log 0xbcd1603b: addr(_param1), _param2

def reclaimContract(address _contractAddr): # not payable
  require caller == owner
  require ext_code.size(_contractAddr)
  call _contractAddr.transferOwnership(address newOwner) with:
       gas gas_remaining wei
      args owner
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]

def unknown6f348acf(uint256 _param1): # not payable
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x893bb0bf with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 128
  if ext_call.return_data < unknown07185c0d.length:
      return unknown07185c0d[ext_call.return_data]
  return -1

def unknownbcf7bd0b(uint256 _param1): # not payable
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x893bb0bf with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 128
  if ext_call.return_data < unknown07185c0d.length:
      require ext_call.return_data >= unknown07185c0d[ext_call.return_data]
  else:
      require ext_call.return_data >= -1

def unknownf3c0632b(uint256 _param1, addr _param2) payable: 
  require stor2[caller]
  require not paused
  require _param1
  require call.value >= breedingFee
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x88de9aab with:
       gas gas_remaining wei
      args 0, 0, 0, 0, 0, addr(_param2)
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  unknownb0858db3[ext_call.return_data].field_0 = _param1
  return ext_call.return_data[0]

def reclaimToken(address _token): # not payable
  require caller == owner
  require ext_code.size(_token)
  call _token.balanceOf(address owner) with:
       gas gas_remaining wei
      args this.address
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_code.size(_token)
  call _token.transfer(address to, uint256 value) with:
       gas gas_remaining wei
      args owner, ext_call.return_data[0]
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_call.return_data[0]

def unknown61fdd793(uint256 _param1): # not payable
  require ext_code.size(coreContractAddress)
  call coreContractAddress.getAxie(uint256 axieId) with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 64
  if ext_call.return_data[0]:
      return 3
  if ext_call.return_data > block.timestamp - unknown0ce9e666:
      return 0
  if ext_call.return_data <= block.timestamp - unknownf41b70d4:
      if unknownb0858db3[_param1].field_256:
          return 2
      if unknownb0858db3[_param1].field_1280:
          return 2
  return 1

def unknownb967cb0c(uint256 _param1, uint256 _param2): # not payable
  require stor5[caller]
  require not paused
  require -1 == unknownd935cbeb[_param1]
  if not unknownb0858db3[_param1].field_0:
      unknownb0858db3[_param1].field_1280 = sha3(_param2)
  else:
      require sha3(_param2) == unknownb0858db3[_param1].field_0
      unknownb0858db3[_param1].field_256 = _param2
      unknownb0858db3[_param1].field_0 = 0
  log 0xbbdda9d3: _param1
  unknownd935cbeb[_param1] = 0

def unknown5ebc333f(): # not payable
  require caller == owner
  idx = 0
  while idx < ('cd', 4).length:
      require idx < unknown07185c0d.length
      mem[0] = 12
      unknown07185c0d[idx] = cd[((32 * idx) + cd[4] + 36)]
      idx = idx + 1
      continue 
  idx = ('cd', 4).length
  while idx < unknown07185c0d.length:
      mem[0] = 12
      unknown07185c0d[idx] = 0
      idx = idx + 1
      continue 
  unknown07185c0d.length = ('cd', 4).length
  if unknown07185c0d.length > ('cd', 4).length:
      idx = ('cd', 4).length
      while unknown07185c0d.length > idx:
          unknown07185c0d[idx] = 0
          idx = idx + 1
          continue 

def unknown0c69f468(): # not payable
  require caller == owner
  require not initialized
  idx = 0
  while idx < ('cd', 4).length:
      require ext_code.size(unknown7a9e4de9Address)
      call unknown7a9e4de9Address.0xba4eef17 with:
           gas gas_remaining wei
          args cd[((32 * idx) + cd[4] + 36)]
      mem[96 len 64] = ext_call.return_data[0 len 64]
      if not ext_call.success:
          revert with ext_call.return_data[0 len return_data.size]
      require return_data.size >= 64
      if ext_call.return_data[0]:
          mem[0] = cd[((32 * idx) + cd[4] + 36)]
          mem[32] = 27
          unknownd935cbeb[cd[((32 * idx) + cd] = ext_call.return_data[0]
          if ext_call.return_data[0] != -1:
              mem[0] = ext_call.return_data[0]
              mem[32] = 26
              unknown264629cf[ext_call.return_data].field_0 = cd[((32 * idx) + cd[4] + 36)]
              unknown264629cf[ext_call.return_data].field_256 = ext_call.return_data[32]
      idx = idx + 1
      continue 

def unknownf86d622f(): # not payable
  require caller == owner
  require not initialized
  idx = 0
  while idx < ('cd', 4).length:
      require ext_code.size(unknown7a9e4de9Address)
      call unknown7a9e4de9Address.0x77ab56de with:
           gas gas_remaining wei
          args cd[((32 * idx) + cd[4] + 36)]
      mem[96 len 192] = ext_call.return_data[0 len 192]
      if not ext_call.success:
          revert with ext_call.return_data[0 len return_data.size]
      require return_data.size >= 192
      mem[0] = cd[((32 * idx) + cd[4] + 36)]
      mem[32] = 25
      if ext_call.return_data[0] != 0:
          unknownb0858db3[cd[((32 * idx) + cd].field_0 = ext_call.return_data[0]
      if ext_call.return_data[32]:
          unknownb0858db3[cd[((32 * idx) + cd].field_256 = ext_call.return_data[32]
      if ext_call.return_data[64]:
          unknownb0858db3[cd[((32 * idx) + cd].field_512 = ext_call.return_data[64]
      if ext_call.return_data[96]:
          unknownb0858db3[cd[((32 * idx) + cd].field_768 = ext_call.return_data[96]
      if ext_call.return_data[128]:
          unknownb0858db3[cd[((32 * idx) + cd].field_1024 = ext_call.return_data[128]
      if ext_call.return_data[160]:
          unknownb0858db3[cd[((32 * idx) + cd].field_1280 = ext_call.return_data[160]
      idx = idx + 1
      continue 

def unknown86f94992(uint256 _param1, uint256 _param2): # not payable
  require stor5[caller]
  require not paused
  require unknown9b68fac2
  require not unknownd935cbeb[_param1]
  require ext_code.size(coreContractAddress)
  call coreContractAddress.getAxie(uint256 axieId) with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 64
  require not ext_call.return_data[0]
  require ext_call.return_data <= block.timestamp - unknownf41b70d4
  if unknownb0858db3[_param1].field_0:
      require sha3(_param2) == unknownb0858db3[_param1].field_0
      unknownb0858db3[_param1].field_256 = _param2
      unknownb0858db3[_param1].field_0 = 0
  else:
      require unknownb0858db3[_param1].field_512
      require unknownb0858db3[_param1].field_768
      require not unknownb0858db3[_param1].field_1280
      if not unknownb0858db3[_param1].field_0:
          unknownb0858db3[_param1].field_1280 = sha3(_param2)
      else:
          require sha3(_param2) == unknownb0858db3[_param1].field_0
          unknownb0858db3[_param1].field_256 = _param2
          unknownb0858db3[_param1].field_0 = 0
  log 0xbbdda9d3: _param1

def unknownb44848f5(uint256 _param1): # not payable
  require not paused
  require ext_code.size(coreContractAddress)
  call coreContractAddress.ownerOf(uint256 tokenId) with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_call.return_data == caller
  require ext_code.size(coreContractAddress)
  call coreContractAddress.getAxie(uint256 axieId) with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 64
  require not ext_call.return_data[0]
  require ext_call.return_data <= block.timestamp - unknown35c70378
  if unknownb0858db3[_param1].field_256:
      unknownb0858db3[_param1].field_0 = 0
      unknownb0858db3[_param1].field_256 = 0
      unknownb0858db3[_param1].field_512 = 0
      unknownb0858db3[_param1].field_768 = 0
      unknownb0858db3[_param1].field_1024 = 0
      unknownb0858db3[_param1].field_1280 = 0
      require ext_code.size(coreContractAddress)
      call coreContractAddress.evolveAxie(uint256 axieId, uint256 newGenes) with:
           gas gas_remaining wei
          args _param1, unknownb0858db3[_param1].field_256
  else:
      require unknownb0858db3[_param1].field_1280
      if unknownb0858db3[_param1].field_256:
          unknownb0858db3[_param1].field_0 = 0
          unknownb0858db3[_param1].field_256 = 0
          unknownb0858db3[_param1].field_512 = 0
          unknownb0858db3[_param1].field_768 = 0
          unknownb0858db3[_param1].field_1024 = 0
          unknownb0858db3[_param1].field_1280 = 0
          require ext_code.size(coreContractAddress)
          call coreContractAddress.evolveAxie(uint256 axieId, uint256 newGenes) with:
               gas gas_remaining wei
              args _param1, unknownb0858db3[_param1].field_256
      else:
          require ext_code.size(unknown9033f714Address)
          call unknown9033f714Address.0xda1169be with:
               gas gas_remaining wei
              args 0, ext_call.return_dataunknownb0858db3[_param1].field_1024, unknownb0858db3[_param1].field_512, unknownb0858db3[_param1].field_768, unknownb0858db3[_param1].field_1280
          if not ext_call.success:
              revert with ext_call.return_data[0 len return_data.size]
          require return_data.size >= 64
          unknownb0858db3[_param1].field_0 = 0
          unknownb0858db3[_param1].field_256 = 0
          unknownb0858db3[_param1].field_512 = 0
          unknownb0858db3[_param1].field_768 = 0
          unknownb0858db3[_param1].field_1024 = 0
          unknownb0858db3[_param1].field_1280 = 0
          require ext_code.size(coreContractAddress)
          call coreContractAddress.evolveAxie(uint256 axieId, uint256 newGenes) with:
               gas gas_remaining wei
              args _param1, ext_call.return_data[0]
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x51c8244a with:
       gas gas_remaining wei
      args _param1, 400
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]

def unknownc2db5890(uint256 _param1, uint256 _param2, uint256 _param3) payable: 
  require stor4[caller]
  if unknownbf7d5262Address:
      require ext_code.size(unknownbf7d5262Address)
      call unknownbf7d5262Address.0x6ae17ab7 with:
           gas gas_remaining wei
          args _param1, _param2, _param3
      if not ext_call.success:
          revert with ext_call.return_data[0 len return_data.size]
      require return_data.size >= 32
      require ext_call.return_data[0]
  require not paused
  require call.value >= breedingFee
  require ext_code.size(coreContractAddress)
  call coreContractAddress.getAxie(uint256 axieId) with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 64
  require ext_call.return_data[0]
  require ext_code.size(coreContractAddress)
  call coreContractAddress.getAxie(uint256 axieId) with:
       gas gas_remaining wei
      args _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 64
  require ext_call.return_data[0]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x7d831dd4 with:
       gas gas_remaining wei
      args _param1, _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_call.return_data[0]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x893bb0bf with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 128
  if ext_call.return_data < unknown07185c0d.length:
      require ext_call.return_data >= unknown07185c0d[ext_call.return_data]
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param1, ext_call.return_dataunknown07185c0d[ext_call.return_data]
  else:
      require ext_call.return_data >= -1
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param1, ext_call.return_data[64] - 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0xcace40be with:
       gas gas_remaining wei
      args _param1, ext_call.return_data[96] + 1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x893bb0bf with:
       gas gas_remaining wei
      args _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 128
  if ext_call.return_data < unknown07185c0d.length:
      require ext_call.return_data >= unknown07185c0d[ext_call.return_data]
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param2, ext_call.return_dataunknown07185c0d[ext_call.return_data]
  else:
      require ext_call.return_data >= -1
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param2, ext_call.return_data[64] - 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0xcace40be with:
       gas gas_remaining wei
      args _param2, ext_call.return_data[96] + 1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(coreContractAddress)
  call coreContractAddress.ownerOf(uint256 tokenId) with:
       gas gas_remaining wei
      args _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x88de9aab with:
       gas gas_remaining wei
      args 0, _param1, _param2, 0, addr(ext_call.return_data)
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  unknownb0858db3[ext_call.return_data].field_0 = 0
  unknownb0858db3[ext_call.return_data].field_256 = 0
  unknownb0858db3[ext_call.return_data].field_512 = ext_call.return_data[0]
  unknownb0858db3[ext_call.return_data].field_768 = ext_call.return_data[0]
  unknownb0858db3[ext_call.return_data].field_1024 = _param3
  unknownb0858db3[ext_call.return_data].field_1280 = 0
  return ext_call.return_data[0]

def unknown63f29011(uint256 _param1, uint256 _param2, uint256 _param3) payable: 
  require not paused
  if unknownbf7d5262Address:
      require ext_code.size(unknownbf7d5262Address)
      call unknownbf7d5262Address.0x6ae17ab7 with:
           gas gas_remaining wei
          args _param1, _param2, _param3
      if not ext_call.success:
          revert with ext_call.return_data[0 len return_data.size]
      require return_data.size >= 32
      require ext_call.return_data[0]
  require ext_code.size(coreContractAddress)
  call coreContractAddress.ownerOf(uint256 tokenId) with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_call.return_data == caller
  require ext_code.size(coreContractAddress)
  call coreContractAddress.ownerOf(uint256 tokenId) with:
       gas gas_remaining wei
      args _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_call.return_data == caller
  require call.value >= breedingFee
  require ext_code.size(coreContractAddress)
  call coreContractAddress.getAxie(uint256 axieId) with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 64
  require ext_call.return_data[0]
  require ext_code.size(coreContractAddress)
  call coreContractAddress.getAxie(uint256 axieId) with:
       gas gas_remaining wei
      args _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 64
  require ext_call.return_data[0]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x7d831dd4 with:
       gas gas_remaining wei
      args _param1, _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_call.return_data[0]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x893bb0bf with:
       gas gas_remaining wei
      args _param1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 128
  if ext_call.return_data < unknown07185c0d.length:
      require ext_call.return_data >= unknown07185c0d[ext_call.return_data]
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param1, ext_call.return_dataunknown07185c0d[ext_call.return_data]
  else:
      require ext_call.return_data >= -1
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param1, ext_call.return_data[64] - 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0xcace40be with:
       gas gas_remaining wei
      args _param1, ext_call.return_data[96] + 1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x893bb0bf with:
       gas gas_remaining wei
      args _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 128
  if ext_call.return_data < unknown07185c0d.length:
      require ext_call.return_data >= unknown07185c0d[ext_call.return_data]
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param2, ext_call.return_dataunknown07185c0d[ext_call.return_data]
  else:
      require ext_call.return_data >= -1
      require ext_code.size(unknown70d8b039Address)
      call unknown70d8b039Address.0x51c8244a with:
           gas gas_remaining wei
          args _param2, ext_call.return_data[64] - 0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0xcace40be with:
       gas gas_remaining wei
      args _param2, ext_call.return_data[96] + 1
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require ext_code.size(coreContractAddress)
  call coreContractAddress.ownerOf(uint256 tokenId) with:
       gas gas_remaining wei
      args _param2
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  require ext_code.size(unknown70d8b039Address)
  call unknown70d8b039Address.0x88de9aab with:
       gas gas_remaining wei
      args 0, _param1, _param2, 0, addr(ext_call.return_data)
  if not ext_call.success:
      revert with ext_call.return_data[0 len return_data.size]
  require return_data.size >= 32
  unknownb0858db3[ext_call.return_data].field_0 = 0
  unknownb0858db3[ext_call.return_data].field_256 = 0
  unknownb0858db3[ext_call.return_data].field_512 = ext_call.return_data[0]
  unknownb0858db3[ext_call.return_data].field_768 = ext_call.return_data[0]
  unknownb0858db3[ext_call.return_data].field_1024 = _param3
  unknownb0858db3[ext_call.return_data].field_1280 = 0
  return ext_call.return_data[0]

def __callback(bytes32 _oraclizeId, string _result): # not payable
  mem[128 len _result.length] = _result[all]
  require not paused
  if not stor6:
      if ext_code.size(0x1d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed) > 0:
          stor6 = 0x1d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed
          mem[ceil32(_result.length) + 128] = 11
          mem[ceil32(_result.length) + 160] = 'eth_mainnet'
          bool(stor8.length) = 0
          stor8.length.field_1 = 11
          stor8.length.field_8 = 'eth_mainnet' / 256
          idx = 0
          while stor8.length + 31 / 32 > idx:
              stor8[idx].field_0 = 0
              idx = idx + 1
              continue 
          require ext_code.size(stor6)
          call stor6.getAddress() with:
               gas gas_remaining wei
          if not ext_call.success:
              revert with ext_call.return_data[0 len return_data.size]
          require return_data.size >= 32
          if ext_call.return_dataaddr(stor7):
              require ext_code.size(stor6)
              call stor6.getAddress() with:
                   gas gas_remaining wei
              if not ext_call.success:
                  revert with ext_call.return_data[0 len return_data.size]
              require return_data.size >= 32
              uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
          require ext_code.size(addr(stor7))
          call addr(stor7).cbAddress() with:
               gas gas_remaining wei
          if not ext_call.success:
              revert with ext_call.return_data[0 len return_data.size]
          require return_data.size >= 32
          require caller == ext_call.return_data[12 len 20]
          require unknown264629cf[_oraclizeId].field_0
          mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
          mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
          mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
          mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
          unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
      else:
          if ext_code.size(0xc03a2615d5efaf5f49f60b7bb6583eaec212fdf1) > 0:
              stor6 = 0xc03a2615d5efaf5f49f60b7bb6583eaec212fdf1
              mem[ceil32(_result.length) + 128] = 12
              mem[ceil32(_result.length) + 160] = 'eth_ropsten3'
              bool(stor8.length) = 0
              stor8.length.field_1 = 12
              stor8.length.field_8 = 'eth_ropsten3' / 256
              idx = 0
              while stor8.length + 31 / 32 > idx:
                  stor8[idx].field_0 = 0
                  idx = idx + 1
                  continue 
              require ext_code.size(stor6)
              call stor6.getAddress() with:
                   gas gas_remaining wei
              if not ext_call.success:
                  revert with ext_call.return_data[0 len return_data.size]
              require return_data.size >= 32
              if ext_call.return_dataaddr(stor7):
                  require ext_code.size(stor6)
                  call stor6.getAddress() with:
                       gas gas_remaining wei
                  if not ext_call.success:
                      revert with ext_call.return_data[0 len return_data.size]
                  require return_data.size >= 32
                  uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
              require ext_code.size(addr(stor7))
              call addr(stor7).cbAddress() with:
                   gas gas_remaining wei
              if not ext_call.success:
                  revert with ext_call.return_data[0 len return_data.size]
              require return_data.size >= 32
              require caller == ext_call.return_data[12 len 20]
              require unknown264629cf[_oraclizeId].field_0
              mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
              mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
              mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
              mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
              unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
          else:
              if ext_code.size(0xb7a07bcf2ba2f2703b24c0691b5278999c59ac7e) > 0:
                  stor6 = 0xb7a07bcf2ba2f2703b24c0691b5278999c59ac7e
                  mem[ceil32(_result.length) + 128] = 9
                  mem[ceil32(_result.length) + 160] = 'eth_kovan'
                  bool(stor8.length) = 0
                  stor8.length.field_1 = 9
                  stor8.length.field_8 = 'eth_kovan' / 256
                  idx = 0
                  while stor8.length + 31 / 32 > idx:
                      stor8[idx].field_0 = 0
                      idx = idx + 1
                      continue 
                  require ext_code.size(stor6)
                  call stor6.getAddress() with:
                       gas gas_remaining wei
                  if not ext_call.success:
                      revert with ext_call.return_data[0 len return_data.size]
                  require return_data.size >= 32
                  if ext_call.return_dataaddr(stor7):
                      require ext_code.size(stor6)
                      call stor6.getAddress() with:
                           gas gas_remaining wei
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
                  require ext_code.size(addr(stor7))
                  call addr(stor7).cbAddress() with:
                       gas gas_remaining wei
                  if not ext_call.success:
                      revert with ext_call.return_data[0 len return_data.size]
                  require return_data.size >= 32
                  require caller == ext_call.return_data[12 len 20]
                  require unknown264629cf[_oraclizeId].field_0
                  mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                  mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
                  mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                  mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
                  unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
              else:
                  if ext_code.size(0x146500cfd35b22e4a392fe0adc06de1a1368ed48) <= 0:
                      if ext_code.size(0x6f485c8bf6fc43ea212e93bbf8ce046c7f1cb475) > 0:
                          stor6 = 0x6f485c8bf6fc43ea212e93bbf8ce046c7f1cb475
                      else:
                          if ext_code.size(0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf) > 0:
                              stor6 = 0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf
                          else:
                              if ext_code.size(0x51efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa) > 0:
                                  stor6 = 0x51efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa
                      require ext_code.size(stor6)
                      call stor6.getAddress() with:
                           gas gas_remaining wei
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      if ext_call.return_dataaddr(stor7):
                          require ext_code.size(stor6)
                          call stor6.getAddress() with:
                               gas gas_remaining wei
                          if not ext_call.success:
                              revert with ext_call.return_data[0 len return_data.size]
                          require return_data.size >= 32
                          uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
                      require ext_code.size(addr(stor7))
                      call addr(stor7).cbAddress() with:
                           gas gas_remaining wei
                      mem[ceil32(_result.length) + 128] = ext_call.return_data[0]
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      require caller == ext_call.return_data[12 len 20]
                      require unknown264629cf[_oraclizeId].field_0
                      mem[ceil32(_result.length) + 160 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                      mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 192 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
                      mem[_result.length + ceil32(_result.length) + 160 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                      mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 160] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160]
                      unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160 len _result.length % 32])
                  else:
                      stor6 = 0x146500cfd35b22e4a392fe0adc06de1a1368ed48
                      mem[ceil32(_result.length) + 128] = 11
                      mem[ceil32(_result.length) + 160] = 'eth_rinkeby'
                      bool(stor8.length) = 0
                      stor8.length.field_1 = 11
                      stor8.length.field_8 = 'eth_rinkeby' / 256
                      idx = 0
                      while stor8.length + 31 / 32 > idx:
                          stor8[idx].field_0 = 0
                          idx = idx + 1
                          continue 
                      require ext_code.size(stor6)
                      call stor6.getAddress() with:
                           gas gas_remaining wei
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      if ext_call.return_dataaddr(stor7):
                          require ext_code.size(stor6)
                          call stor6.getAddress() with:
                               gas gas_remaining wei
                          if not ext_call.success:
                              revert with ext_call.return_data[0 len return_data.size]
                          require return_data.size >= 32
                          uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
                      require ext_code.size(addr(stor7))
                      call addr(stor7).cbAddress() with:
                           gas gas_remaining wei
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      require caller == ext_call.return_data[12 len 20]
                      require unknown264629cf[_oraclizeId].field_0
                      mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                      mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
                      mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                      mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
                      unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
  else:
      if ext_code.size(stor6):
          call stor6.getAddress() with:
               gas gas_remaining wei
          if not ext_call.success:
              revert with ext_call.return_data[0 len return_data.size]
          require return_data.size >= 32
          if ext_call.return_dataaddr(stor7):
              require ext_code.size(stor6)
              call stor6.getAddress() with:
                   gas gas_remaining wei
              if not ext_call.success:
                  revert with ext_call.return_data[0 len return_data.size]
              require return_data.size >= 32
              uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
          require ext_code.size(addr(stor7))
          call addr(stor7).cbAddress() with:
               gas gas_remaining wei
          mem[ceil32(_result.length) + 128] = ext_call.return_data[0]
          if not ext_call.success:
              revert with ext_call.return_data[0 len return_data.size]
          require return_data.size >= 32
          require caller == ext_call.return_data[12 len 20]
          require unknown264629cf[_oraclizeId].field_0
          mem[ceil32(_result.length) + 160 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
          mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 192 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
          mem[_result.length + ceil32(_result.length) + 160 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
          mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 160] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160]
          unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160 len _result.length % 32])
      else:
          if ext_code.size(0x1d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed) > 0:
              stor6 = 0x1d3b2638a7cc9f2cb3d298a3da7a90b67e5506ed
              mem[ceil32(_result.length) + 128] = 11
              mem[ceil32(_result.length) + 160] = 'eth_mainnet'
              bool(stor8.length) = 0
              stor8.length.field_1 = 11
              stor8.length.field_8 = 'eth_mainnet' / 256
              idx = 0
              while stor8.length + 31 / 32 > idx:
                  stor8[idx].field_0 = 0
                  idx = idx + 1
                  continue 
              require ext_code.size(stor6)
              call stor6.getAddress() with:
                   gas gas_remaining wei
              if not ext_call.success:
                  revert with ext_call.return_data[0 len return_data.size]
              require return_data.size >= 32
              if ext_call.return_dataaddr(stor7):
                  require ext_code.size(stor6)
                  call stor6.getAddress() with:
                       gas gas_remaining wei
                  if not ext_call.success:
                      revert with ext_call.return_data[0 len return_data.size]
                  require return_data.size >= 32
                  uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
              require ext_code.size(addr(stor7))
              call addr(stor7).cbAddress() with:
                   gas gas_remaining wei
              if not ext_call.success:
                  revert with ext_call.return_data[0 len return_data.size]
              require return_data.size >= 32
              require caller == ext_call.return_data[12 len 20]
              require unknown264629cf[_oraclizeId].field_0
              mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
              mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
              mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
              mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
              unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
          else:
              if ext_code.size(0xc03a2615d5efaf5f49f60b7bb6583eaec212fdf1) > 0:
                  stor6 = 0xc03a2615d5efaf5f49f60b7bb6583eaec212fdf1
                  mem[ceil32(_result.length) + 128] = 12
                  mem[ceil32(_result.length) + 160] = 'eth_ropsten3'
                  bool(stor8.length) = 0
                  stor8.length.field_1 = 12
                  stor8.length.field_8 = 'eth_ropsten3' / 256
                  idx = 0
                  while stor8.length + 31 / 32 > idx:
                      stor8[idx].field_0 = 0
                      idx = idx + 1
                      continue 
                  require ext_code.size(stor6)
                  call stor6.getAddress() with:
                       gas gas_remaining wei
                  if not ext_call.success:
                      revert with ext_call.return_data[0 len return_data.size]
                  require return_data.size >= 32
                  if ext_call.return_dataaddr(stor7):
                      require ext_code.size(stor6)
                      call stor6.getAddress() with:
                           gas gas_remaining wei
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
                  require ext_code.size(addr(stor7))
                  call addr(stor7).cbAddress() with:
                       gas gas_remaining wei
                  if not ext_call.success:
                      revert with ext_call.return_data[0 len return_data.size]
                  require return_data.size >= 32
                  require caller == ext_call.return_data[12 len 20]
                  require unknown264629cf[_oraclizeId].field_0
                  mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                  mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
                  mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                  mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
                  unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
              else:
                  if ext_code.size(0xb7a07bcf2ba2f2703b24c0691b5278999c59ac7e) > 0:
                      stor6 = 0xb7a07bcf2ba2f2703b24c0691b5278999c59ac7e
                      mem[ceil32(_result.length) + 128] = 9
                      mem[ceil32(_result.length) + 160] = 'eth_kovan'
                      bool(stor8.length) = 0
                      stor8.length.field_1 = 9
                      stor8.length.field_8 = 'eth_kovan' / 256
                      idx = 0
                      while stor8.length + 31 / 32 > idx:
                          stor8[idx].field_0 = 0
                          idx = idx + 1
                          continue 
                      require ext_code.size(stor6)
                      call stor6.getAddress() with:
                           gas gas_remaining wei
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      if ext_call.return_dataaddr(stor7):
                          require ext_code.size(stor6)
                          call stor6.getAddress() with:
                               gas gas_remaining wei
                          if not ext_call.success:
                              revert with ext_call.return_data[0 len return_data.size]
                          require return_data.size >= 32
                          uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
                      require ext_code.size(addr(stor7))
                      call addr(stor7).cbAddress() with:
                           gas gas_remaining wei
                      if not ext_call.success:
                          revert with ext_call.return_data[0 len return_data.size]
                      require return_data.size >= 32
                      require caller == ext_call.return_data[12 len 20]
                      require unknown264629cf[_oraclizeId].field_0
                      mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                      mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
                      mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                      mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
                      unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
                  else:
                      if ext_code.size(0x146500cfd35b22e4a392fe0adc06de1a1368ed48) <= 0:
                          if ext_code.size(0x6f485c8bf6fc43ea212e93bbf8ce046c7f1cb475) > 0:
                              stor6 = 0x6f485c8bf6fc43ea212e93bbf8ce046c7f1cb475
                          else:
                              if ext_code.size(0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf) > 0:
                                  stor6 = 0x20e12a1f859b3feae5fb2a0a32c18f5a65555bbf
                              else:
                                  if ext_code.size(0x51efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa) > 0:
                                      stor6 = 0x51efaf4c8b3c9afbd5ab9f4bbc82784ab6ef8faa
                          require ext_code.size(stor6)
                          call stor6.getAddress() with:
                               gas gas_remaining wei
                          if not ext_call.success:
                              revert with ext_call.return_data[0 len return_data.size]
                          require return_data.size >= 32
                          if ext_call.return_dataaddr(stor7):
                              require ext_code.size(stor6)
                              call stor6.getAddress() with:
                                   gas gas_remaining wei
                              if not ext_call.success:
                                  revert with ext_call.return_data[0 len return_data.size]
                              require return_data.size >= 32
                              uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
                          require ext_code.size(addr(stor7))
                          call addr(stor7).cbAddress() with:
                               gas gas_remaining wei
                          mem[ceil32(_result.length) + 128] = ext_call.return_data[0]
                          if not ext_call.success:
                              revert with ext_call.return_data[0 len return_data.size]
                          require return_data.size >= 32
                          require caller == ext_call.return_data[12 len 20]
                          require unknown264629cf[_oraclizeId].field_0
                          mem[ceil32(_result.length) + 160 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                          mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 192 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
                          mem[_result.length + ceil32(_result.length) + 160 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                          mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 160] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160]
                          unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 160 len _result.length % 32])
                      else:
                          stor6 = 0x146500cfd35b22e4a392fe0adc06de1a1368ed48
                          mem[ceil32(_result.length) + 128] = 11
                          mem[ceil32(_result.length) + 160] = 'eth_rinkeby'
                          bool(stor8.length) = 0
                          stor8.length.field_1 = 11
                          stor8.length.field_8 = 'eth_rinkeby' / 256
                          idx = 0
                          while stor8.length + 31 / 32 > idx:
                              stor8[idx].field_0 = 0
                              idx = idx + 1
                              continue 
                          require ext_code.size(stor6)
                          call stor6.getAddress() with:
                               gas gas_remaining wei
                          if not ext_call.success:
                              revert with ext_call.return_data[0 len return_data.size]
                          require return_data.size >= 32
                          if ext_call.return_dataaddr(stor7):
                              require ext_code.size(stor6)
                              call stor6.getAddress() with:
                                   gas gas_remaining wei
                              if not ext_call.success:
                                  revert with ext_call.return_data[0 len return_data.size]
                              require return_data.size >= 32
                              uint256(stor7) = ext_call.return_data or Mask(96, 160, uint256(stor7))
                          require ext_code.size(addr(stor7))
                          call addr(stor7).cbAddress() with:
                               gas gas_remaining wei
                          if not ext_call.success:
                              revert with ext_call.return_data[0 len return_data.size]
                          require return_data.size >= 32
                          require caller == ext_call.return_data[12 len 20]
                          require unknown264629cf[_oraclizeId].field_0
                          mem[ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                          mem[ceil32(_result.length) + floor32(_result.length) + -(_result.length % 32) + 256 len _result.length % 32] = mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32]
                          mem[_result.length + ceil32(_result.length) + 224 len floor32(_result.length)] = call.data[_result + 36 len floor32(_result.length)]
                          mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224] = !(256^(-(_result.length % 32) + 32) - 1) and mem[ceil32(_result.length) + floor32(_result.length) + 224 len -(_result.length % 32) + 32], mem[floor32(_result.length) + -(_result.length % 32) + 160 len _result.length % 32] or 256^(-(_result.length % 32) + 32) - 1 and mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224]
                          unknownb0858db3[stor26[_oraclizeId].field_0].field_1280 = sha3(call.data[_result + 36 len floor32(_result.length)], mem[_result.length + ceil32(_result.length) + floor32(_result.length) + 224 len _result.length % 32])
  unknown264629cf[_oraclizeId].field_0 = 0
  unknown264629cf[_oraclizeId].field_256 = 0
  unknownd935cbeb[stor26[_oraclizeId].field_0] = 0
  log 0xa3fcf720: _oraclizeId, unknown264629cf[_oraclizeId].field_0

