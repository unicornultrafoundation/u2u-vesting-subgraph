import {log} from "@graphprotocol/graph-ts";
import {Unpaused as FactoryUnpaused} from "../../generated/VestingFactory/VestingFactory";
import {Unpaused as VestingPoolUnpaused} from "../../generated/templates/VestingPool/VestingPool";
import {VestingPool} from "../../generated/schema";

export function factoryUnpaused(e: FactoryUnpaused): void {
  log.info("[Factory]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

}

export function vestingPoolUnpaused(e: VestingPoolUnpaused): void {
  let vestingPool = VestingPool.load(e.address.toHexString())
  if (!vestingPool) {
    log.info("Cannot add to non-exist pool at addr: {}", [e.address.toHexString()])
    return;
  }
  vestingPool.isPause = false;
  vestingPool.save()
}
