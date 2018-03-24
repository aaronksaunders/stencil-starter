import { Component } from "@stencil/core";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  debugger;
  render() {
    return (
      <div class="app-home">
        <p padding>
          Welcome to the Stencil App Starter. You can use this starter to build
          entire apps all with web components using Stencil! Check out our docs
          on <a href="https://stenciljs.com">stenciljs.com</a> to get started.
        </p>

        <stencil-route-link url="/profile/stencil">
          <ion-button>Profile page</ion-button>
        </stencil-route-link>
      </div>
    );
  }
}
