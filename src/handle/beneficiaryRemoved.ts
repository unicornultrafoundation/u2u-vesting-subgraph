import {log} from "@graphprotocol/graph-ts"
import {BeneficiaryRemoved as FactoryBeneficiaryRemoved} from "../../generated/VestingFactory/VestingFactory";
import {BeneficiaryRemoved as VestingPoolBeneficiaryRemoved} from "../../generated/templates/VestingPool/VestingPool";
import {User, UserPool, VestingPool} from "../../generated/schema";
import {newEmptyUser, newEmptyUserPool} from "../builder";
import {concatID, ZERO_BI} from "../helper";


export function factoryBeneficiaryRemoved(e: FactoryBeneficiaryRemoved): void {
  log.info("[Factory]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

}

export function vestingPoolBeneficiaryRemoved(e: VestingPoolBeneficiaryRemoved): void {
  log.info("[VestingPool]Beneficiary removed with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])
  let vestingPool = VestingPool.load(e.address.toHexString())
  if (!vestingPool) {
    log.info("Cannot add to non-exist pool at addr: {}", [e.address.toHexString()])
    return;
  }

  let userID = e.params.beneficiary.toHexString();
  let user = User.load(userID);
  if (!user) {
    user = newEmptyUser(userID)
  }


  let userPoolID = concatID(vestingPool.id, userID);
  let userPool = UserPool.load(userPoolID);
  if (!userPool) {
    userPool = newEmptyUserPool(userPoolID);
  }

  userPool.user = user.id;

  //user.pools = user.pools?.push(userPool)

  userPool.totalAmount = ZERO_BI;
  userPool.updatedAt = e.block.timestamp;
  userPool.vestingPool = vestingPool.id;
  userPool.isEnable = false;

  vestingPool.save()
  userPool.save()
  user.save()
}
