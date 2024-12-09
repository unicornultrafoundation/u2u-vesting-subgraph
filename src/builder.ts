import {UserInfo, VestingPool} from "../generated/schema";
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
  vestingPool.isClaimFirstUnlock = false;
  vestingPool.claimedTime = ZERO_BI;
  vestingPool.updatedAt = ZERO_BI;
  vestingPool.updatedAt = ZERO_BI;

  return vestingPool;
}


export function newEmptyUserInfo(userID: string): UserInfo {
  log.info("Create new empty user info", [])
  let userInfo = new UserInfo(userID)
  userInfo.totalAmount = ZERO_BI;
  userInfo.amountPerPeriod = ZERO_BI;
  userInfo.releasedAmount = ZERO_BI;
  userInfo.completedPeriods = ZERO_BI;
  userInfo.updatedAt = ZERO_BI;
  return userInfo;
}
