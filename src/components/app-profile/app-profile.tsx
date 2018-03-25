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
        <ion-page  class='show-page'>
          <ion-header md-height="56px">
            <ion-toolbar color="primary">
              <ion-title>APP PROFILE</ion-title>
            </ion-toolbar>
          </ion-header>
          <ion-content padding>
            <ion-card style={{ margin: "0px"}} padding>
              Hello! My name is {this.match.params.name}. My name was passed in
              through a route param!
            </ion-card>
            <stencil-route-link url="/">
              <ion-button style={{ marginTop: "10px"}}>Back</ion-button>
            </stencil-route-link>
          </ion-content>
        </ion-page>
      );
    }
  }
}
