// eslint-disable-next-line @typescript-eslint/triple-slash-reference
/// <reference path="../.astro/types.d.ts" />

declare namespace App {
  interface Locals {
    /**
     * The end time of the maintenance window.
     */
    endTime?: Date;
  }
}
