import { log} from "@graphprotocol/graph-ts"
import {BeneficiaryAdded as FactoryBeneficiaryAdded} from "../../generated/VestingFactory/VestingFactory";
import {BeneficiaryAdded as VestingPoolBeneficiaryAdded} from "../../generated/templates/VestingPool/VestingPool";
import {User, UserPool, VestingPool} from "../../generated/schema";
import {newEmptyUser, newEmptyUserPool} from "../builder";
import {concatID, ZERO_BI} from "../helper";


export function factoryBeneficiaryAdded(e: FactoryBeneficiaryAdded): void {
  log.info("[Factory]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

}

export function vestingPoolBeneficiaryAdded(e: VestingPoolBeneficiaryAdded): void {
  log.info("[VestingPool]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])


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



  let userPoolID = concatID(vestingPool.name,userID);
  let userPool = UserPool.load(userPoolID);
  if (!userPool) {
    userPool = newEmptyUserPool(userPoolID);
  }

  userPool.user = user.id;

  //user.pools = user.pools?.push(userPool)

  userPool.totalAmount = e.params.user.totalAmount;
  userPool.amountPerPeriod = e.params.user.totalAmount;
  userPool.releasedAmount = e.params.user.releasedAmount;
  userPool.completedPeriods = e.params.user.completedPeriods;
  userPool.updatedAt = e.block.timestamp;
  userPool.vestingPool = vestingPool.id;

  vestingPool.save()
  userPool.save()
  user.save()
}
