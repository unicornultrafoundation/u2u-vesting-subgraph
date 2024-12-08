import {initialized} from "./handle/initialized";
import {released} from "./handle/released";
import {Initialized, Released} from "../generated/templates/VestingPool/VestingPool";


export function handleInitialized(e: Initialized): void {
  initialized(e);
}


export function handleReleased(e: Released): void {
  released(e);
}

