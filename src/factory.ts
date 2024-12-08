import { newPool } from "./handle/newPool";
import {factoryBeneficiaryAdded} from "./handle/beneficiaryAdded";
import {withdraw} from "./handle/withdraw";

import {BeneficiaryAdded, NewPool, Withdrawn} from "../generated/VestingFactory/VestingFactory";

export function handleNewPool(e: NewPool): void {
  newPool(e);
}


export function handleBeneficiaryAdded(e: BeneficiaryAdded): void {
  factoryBeneficiaryAdded(e);
}

export function handleWithdrawn(e: Withdrawn): void {
  withdraw(e);
}
