import { log, BigInt } from "@graphprotocol/graph-ts"
import {Initialized} from "../../generated/templates/VestingPool/VestingPool";
import {VestingPool} from "../../generated/schema";
import {newPool} from "../builder";


export function initialized(e: Initialized): void {
  log.info("Create new pool with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])
  let vestingPoolID = e.address.toHexString();
  let vestingPool = VestingPool.load(vestingPoolID);
  if (!vestingPool) {
    vestingPool = newPool(vestingPoolID);
  }

  vestingPool.startTime = e.params.info.startTime;
  vestingPool.firstUnlockPercentage = e.params.info.firstUnlockPercentage;
  vestingPool.lockDuration = e.params.info.lockDuration;
  vestingPool.vestingDuration = e.params.info.vestingDuration;
  vestingPool.vestingPeriods = e.params.info.vestingPeriods;
  vestingPool.period = e.params.info.period;
  vestingPool.periodUnlockPercentage = e.params.info.periodUnlockPercentage;
  vestingPool.endTime = e.params.info.endTime;
  vestingPool.totalPoolCap = e.params.info.totalPoolCap;
  vestingPool.totalReleasedAmount = e.params.info.totalReleasedAmount;
  vestingPool.updatedAt = e.block.timestamp;

  vestingPool.save()
}
