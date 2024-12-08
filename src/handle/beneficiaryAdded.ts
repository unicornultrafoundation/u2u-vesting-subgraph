import { log} from "@graphprotocol/graph-ts"
import {BeneficiaryAdded as FactoryBeneficiaryAdded} from "../../generated/VestingFactory/VestingFactory";
import {BeneficiaryAdded as VestingPoolBeneficiaryAdded} from "../../generated/templates/VestingPool/VestingPool";


export function factoryBeneficiaryAdded(e: FactoryBeneficiaryAdded): void {
  log.info("[Factory]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])
}

export function vestingPoolBeneficiaryAdded(e: VestingPoolBeneficiaryAdded): void {
  log.info("[VestingPool]Beneficiary added with txHash: {}, block: {}", [e.transaction.hash.toHexString(), e.block.number.toString()])
}
