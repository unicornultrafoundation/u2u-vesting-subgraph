import {Released} from "../../generated/templates/VestingPool/VestingPool";
import {log} from "@graphprotocol/graph-ts";
import {ReleaseRecord, UserInfo, VestingPool} from "../../generated/schema";
import {ONE_BI} from "../helper";


export function released(e: Released): void {
  log.info("New release with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

  let vestingPoolID = e.address.toHexString();
  let vestingPool = VestingPool.load(vestingPoolID);
  if (!vestingPool) {
    log.info("cannot withdraw from invalid vesting pool {}", [vestingPoolID]);
    return;
  }

  let userId = e.params.beneficiary.toHexString();
  let userInfo = UserInfo.load(userId);
  if (!userInfo) {
    log.info("cannot withdraw from invalid user {}", [vestingPoolID]);
    return;
  }
  userInfo.releasedAmount = userInfo.releasedAmount.plus(e.params.releasedAmount);
  userInfo.completedPeriods = userInfo.completedPeriods.plus(ONE_BI);
  userInfo.updatedAt = e.block.timestamp;

  let releaseID = e.transaction.hash.toHexString();
  let releaseRecord = ReleaseRecord.load(releaseID);
  if (!releaseRecord) {
    releaseRecord = new ReleaseRecord(releaseID);
    releaseRecord.hash = e.transaction.hash;
    releaseRecord.vestingPool = vestingPool.id;
    releaseRecord.user = userInfo.id;
    releaseRecord.amount = e.params.releasedAmount;
    releaseRecord.releasedPeriods = e.params.releasedPeriods;
    releaseRecord.releaseTime = e.block.timestamp;
  }

  vestingPool.save();
  userInfo.save();
  releaseRecord.save();
}
