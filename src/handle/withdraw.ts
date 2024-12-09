import {Withdrawn} from "../../generated/VestingFactory/VestingFactory";
import {log} from "@graphprotocol/graph-ts";
import {UserInfo, VestingPool, WithdrawnRequest} from "../../generated/schema";


export function withdraw(e: Withdrawn): void {
  log.info("New withdraw with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

  let vestingPoolID = e.params.poolAddr.toHexString();
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

  let withdrawID = e.transaction.hash.toHexString();
  let withdrawRequest = WithdrawnRequest.load(withdrawID);
  if (!withdrawRequest) {
    withdrawRequest = new WithdrawnRequest(withdrawID);
    withdrawRequest.hash = e.transaction.hash;
    withdrawRequest.vestingPool = vestingPool.id;
    withdrawRequest.user = userInfo.id;
    withdrawRequest.amount = e.params.amount;
    withdrawRequest.withdrawTime = e.block.timestamp;
  }

  vestingPool.save()
  userInfo.save()
  withdrawRequest.save();
}
