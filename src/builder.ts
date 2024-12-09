import {VestingPool} from "../generated/schema";
import {ZERO_BI} from "./helper";
import {log} from "@graphprotocol/graph-ts";


export function newEmptyVestingPool(poolID: string): VestingPool {
  log.info("Create new empty vesting pool", [])
  let vestingPool = new VestingPool(poolID)
  vestingPool.name = "unknown pool"
  vestingPool.startTime = ZERO_BI;
  vestingPool.firstUnlockPercentage = ZERO_BI;
  vestingPool.lockDuration = ZERO_BI;
  vestingPool.vestingDuration = ZERO_BI;
  vestingPool.vestingPeriods = ZERO_BI;
  vestingPool.period = ZERO_BI;
  vestingPool.periodUnlockPercentage = ZERO_BI;
  vestingPool.endTime = ZERO_BI;
  vestingPool.totalPoolCap = ZERO_BI;
  vestingPool.totalReleasedAmount = ZERO_BI;
  vestingPool.updatedAt = ZERO_BI;
  return vestingPool;
}
