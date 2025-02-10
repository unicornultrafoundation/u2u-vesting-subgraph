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


export function handleReleased(e: Released): void {
  released(e);
}
