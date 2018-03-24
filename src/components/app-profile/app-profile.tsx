import { Component, Prop } from "@stencil/core";
import { MatchResults } from "@stencil/router";

@Component({
  tag: "app-profile",
  styleUrl: "app-profile.css"
})
export class AppProfile {
  @Prop() match: MatchResults;

  render() {
    if (this.match && this.match.params.name) {
      return (
        <div>
          <ion-card style={{ margin: "0px", padding: "10px" }}>
            Hello! My name is {this.match.params.name}. My name was passed in
            through a route param!
          </ion-card>
          <stencil-route-link url="/">
            <ion-button>Back</ion-button>
          </stencil-route-link>
        </div>
      );
    }
  }
}
