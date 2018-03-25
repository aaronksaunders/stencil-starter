import { Component, Prop, State } from "@stencil/core";
import { Store, Action } from "@stencil/redux";
import * as fromActions from "../../store/actions/index";
import { RouterHistory } from "@stencil/router";

@Component({
  tag: "app-home",
  styleUrl: "app-home.css"
})
export class AppHome {
  // state properties...
  @State() user = null;

  // get the router history for redirecting
  @Prop() history: RouterHistory;

  // get access to the store from the context
  @Prop({ context: "store" })
  store: Store;

  // set the Actions that I will be using in this component
  doLogout: Action;

  componentWillLoad() {
    // map the user state so it can be called
    // locally
    this.store.mapStateToProps(this, state => {
      return {
        user : state.user
      };
    });

    // map the doLogout action so it can be called
    // locally
    this.store.mapDispatchToProps(this, {
      doLogout: fromActions.doLogout
    });
  }

  /**
   * hand the logout by calling the action and then
   * redirecting back to the default route. Since there
   * is no user, the login screen will be displated
   */
  handleLogout = async () => {
    await this.doLogout();
    this.history.replace("/", {});
  };

  /**
   *
   */
  render() {
    return (
      <ion-page class="show-page">
        <ion-header md-height="56px">
          <ion-toolbar color="primary">
            <ion-title>HOME</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding>
          <p padding>
            Welcome to the Stencil App Starter. You can use this starter to
            build entire apps all with web components using Stencil! Check out
            our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get
            started.
          </p>
          <h3>{this.user.email}</h3>
          <stencil-route-link url="/profile/stencil">
            <ion-button>Profile page</ion-button>
          </stencil-route-link>

          <ion-button onClick={() => this.handleLogout()}>LOGOUT</ion-button>
        </ion-content>
      </ion-page>
    );
  }
}
