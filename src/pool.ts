import {initialized} from "./handle/initialized";
import {released} from "./handle/released";
import {
  BeneficiaryAdded,
  BeneficiaryRemoved,
  Initialized, Paused,
  Released, Unpaused
} from "../generated/templates/VestingPool/VestingPool";
import {vestingPoolBeneficiaryAdded} from "./handle/beneficiaryAdded";
import {vestingPoolBeneficiaryRemoved} from "./handle/beneficiaryRemoved";
import {vestingPoolPaused} from "./handle/paused";
import {vestingPoolUnpaused} from "./handle/unpaused";

export function handleInitialized(e: Initialized): void {
  initialized(e);
}

export function handleReleased(e: Released): void {
  released(e);
}

export function handleBeneficiaryAdded(e: BeneficiaryAdded): void {
  vestingPoolBeneficiaryAdded(e);
}

export function handleBeneficiaryRemoved(e: BeneficiaryRemoved): void {
  vestingPoolBeneficiaryRemoved(e);
}

export function handlePaused(e: Paused): void {
  vestingPoolPaused(e);
}

export function handleUnpaused(e: Unpaused): void {
  vestingPoolUnpaused(e);
}

