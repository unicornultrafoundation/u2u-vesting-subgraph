
import {wrapperReleased} from "./handle/released";
import {
  Released
} from "../generated/VestingWrapper/VestingWrapper";


export function handleWrapperReleased(e: Released): void {
  wrapperReleased(e);
}
