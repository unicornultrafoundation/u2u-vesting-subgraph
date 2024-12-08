import { log} from "@graphprotocol/graph-ts"
import {BeneficiaryAdded} from "../../generated/VestingFactory/VestingFactory";


export function beneficiaryAdded(e: BeneficiaryAdded): void {
  log.info("Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])
}
