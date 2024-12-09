import { newPool } from "./handle/newPool";
import {factoryBeneficiaryAdded} from "./handle/beneficiaryAdded";
import {withdraw} from "./handle/withdraw";

import {BeneficiaryAdded, NewPool, Withdrawn} from "../generated/VestingFactory/VestingFactory";
import {BeneficiaryRemoved, Paused, Unpaused} from "../generated/VestingFactory/VestingFactory";
import {factoryBeneficiaryRemoved, vestingPoolBeneficiaryRemoved} from "./handle/beneficiaryRemoved";
import {factoryPaused, vestingPoolPaused} from "./handle/paused";
import {factoryUnpaused, vestingPoolUnpaused} from "./handle/unpaused";

export function handleNewPool(e: NewPool): void {
  newPool(e);
}


export function handleBeneficiaryAdded(e: BeneficiaryAdded): void {
  factoryBeneficiaryAdded(e);
}

export function handleWithdraw(e: Withdrawn): void {
  withdraw(e);
}


export function handleBeneficiaryRemoved(e: BeneficiaryRemoved): void {
  factoryBeneficiaryRemoved(e);
}

export function handlePaused(e: Paused): void {
  factoryPaused(e);
}

export function handleUnpaused(e: Unpaused): void {
  factoryUnpaused(e);
}


