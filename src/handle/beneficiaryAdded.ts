import { log} from "@graphprotocol/graph-ts"
import {BeneficiaryAdded as FactoryBeneficiaryAdded} from "../../generated/VestingFactory/VestingFactory";
import {BeneficiaryAdded as VestingPoolBeneficiaryAdded} from "../../generated/templates/VestingPool/VestingPool";
import {UserInfo, VestingPool} from "../../generated/schema";
import {newEmptyUserInfo, newEmptyVestingPool} from "../builder";


export function factoryBeneficiaryAdded(e: FactoryBeneficiaryAdded): void {
  log.info("[Factory]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

}

export function vestingPoolBeneficiaryAdded(e: VestingPoolBeneficiaryAdded): void {
  log.info("[VestingPool]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])
  let userID = e.params.beneficiary.toHexString();
  let userInfo = UserInfo.load(userID);
  if (!userInfo) {
    userInfo = newEmptyUserInfo(userID);
  }

  userInfo.totalAmount = e.params.user.totalAmount;
  userInfo.amountPerPeriod = e.params.user.totalAmount;
  userInfo.releasedAmount = e.params.user.releasedAmount;
  userInfo.completedPeriods = e.params.user.completedPeriods;
  userInfo.updatedAt = e.block.timestamp;


  let vestingPool = VestingPool.load(e.address.toHexString())
  if (!vestingPool) {
    log.info("Cannot add to non-exist pool at addr: {}", [e.address.toHexString()])
    return;
  }
  vestingPool.user = userInfo.id;

  vestingPool.save()
  userInfo.save()
}
