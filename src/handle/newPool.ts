import { log, BigInt } from "@graphprotocol/graph-ts"
import {NewPool} from "../../generated/VestingFactory/VestingFactory";
import {VestingPool as VestingPoolTemplate} from "../../generated/templates";

/**
 * Claimed rewards event handle
 * @param event
 */
export function newPool(e: NewPool): void {
  log.info("Create new pool with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])
  VestingPoolTemplate.create(e.params.id)

}
