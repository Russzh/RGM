import { mount, MountOptions, MountReturn } from "@cypress/react";
import { ReactNode } from "react";

Cypress.Commands.add("mount", mount);

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Mounts a React component for testing.
       * @param component The React component to mount.
       * @param options Additional options for mounting the component.
       */
      mount(
        component: ReactNode,
        options?: MountOptions,
      ): Chainable<MountReturn>;
    }
  }
}
