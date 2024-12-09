import {Released} from "../../generated/templates/VestingPool/VestingPool";
import {log} from "@graphprotocol/graph-ts";
import {ReleaseRecord, User, UserPool, VestingPool} from "../../generated/schema";
import {ONE_BI} from "../helper";


export function released(e: Released): void {
  log.info("New release with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

  let vestingPoolID = e.address.toHexString();
  let vestingPool = VestingPool.load(vestingPoolID);
  if (!vestingPool) {
    log.info("cannot withdraw from invalid vesting pool {}", [vestingPoolID]);
    return;
  }

  vestingPool.totalReleasedAmount = vestingPool.totalReleasedAmount.plus(e.params.releasedAmount);


  let userPoolID = e.address.toHexString();
  let userPool = UserPool.load(userPoolID);
  if (!userPool) {
    log.info("cannot withdraw from invalid vesting pool {}", [vestingPoolID]);
    return;
  }

  userPool.releasedAmount = userPool.releasedAmount.plus(e.params.releasedAmount);
  userPool.completedPeriods = e.params.releasedPeriods;


  let userId = e.params.beneficiary.toHexString();
  let user = User.load(userId);
  if (!user) {
    log.info("cannot withdraw from invalid user {}", [vestingPoolID]);
    return;
  }
  user.totalClaimed = user.totalClaimed.plus(e.params.releasedAmount);
  user.updatedAt = e.block.timestamp;

  let releaseID = e.transaction.hash.toHexString();
  let releaseRecord = ReleaseRecord.load(releaseID);
  if (!releaseRecord) {
    releaseRecord = new ReleaseRecord(releaseID);
    releaseRecord.hash = e.transaction.hash;
    releaseRecord.userPool = userPool.id;
    releaseRecord.user = user.id;
    releaseRecord.amount = e.params.releasedAmount;
    releaseRecord.releasedPeriods = e.params.releasedPeriods;
    releaseRecord.releaseTime = e.block.timestamp;
  }

  vestingPool.save();
  userPool.save();
  user.save();
  releaseRecord.save();
}
