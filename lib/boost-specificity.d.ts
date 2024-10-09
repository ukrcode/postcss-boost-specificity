import { Plugin } from "postcss";

declare function boostSpecificity(options?: boostSpecificity.Options): Plugin;

declare namespace boostSpecificity {
  interface Options {
    booster?: string;
    repeatTimes?: number;
  }
}

export = boostSpecificity;
