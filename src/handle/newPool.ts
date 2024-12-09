import { log, BigInt } from "@graphprotocol/graph-ts"
import {NewPool} from "../../generated/VestingFactory/VestingFactory";
import {VestingPool as VestingPoolTemplate} from "../../generated/templates";
import {VestingPool} from "../../generated/schema";
import {newEmptyVestingPool} from "../builder";

/**
 * Claimed rewards event handle
 * @param event
 */
export function newPool(e: NewPool): void {
  log.info("New pool event with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])

  let vestingPoolID = e.params.id.toHexString();
  let vestingPool = VestingPool.load(vestingPoolID);
  if (!vestingPool) {
    log.info("Create new pool with contract: {}", [vestingPoolID])
    vestingPool = newEmptyVestingPool(vestingPoolID);
  }
  vestingPool.name = e.params.infos.vestingTerm;
  vestingPool.save();

  VestingPoolTemplate.create(e.params.id)
}
