import {initialized} from "./handle/initialized";
import {released} from "./handle/released";
import {BeneficiaryAdded, Initialized, Released} from "../generated/templates/VestingPool/VestingPool";
import {vestingPoolBeneficiaryAdded} from "./handle/beneficiaryAdded";


export function handleInitialized(e: Initialized): void {
  initialized(e);
}


export function handleReleased(e: Released): void {
  released(e);
}


export function handleBeneficiaryAdded(e: BeneficiaryAdded): void {
  vestingPoolBeneficiaryAdded(e);
}

