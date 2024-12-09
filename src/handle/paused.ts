import {log} from "@graphprotocol/graph-ts";
import {Paused as FactoryPaused} from "../../generated/VestingFactory/VestingFactory";
import {Paused as VestingPoolPaused} from "../../generated/templates/VestingPool/VestingPool";
import {VestingPool} from "../../generated/schema";


export function factoryPaused(e: FactoryPaused): void {
  log.info("[Factory]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

}

export function vestingPoolPaused(e: VestingPoolPaused): void {
  let vestingPool = VestingPool.load(e.address.toHexString())
  if (!vestingPool) {
    log.info("Cannot add to non-exist pool at addr: {}", [e.address.toHexString()])
    return;
  }
  vestingPool.isPause = true;
  vestingPool.save()
}
