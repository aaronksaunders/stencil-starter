import { Component, Prop, State } from "@stencil/core";
import { Store, Action } from "@stencil/redux";
import * as fromActions from "../../store/actions";
import { RouterHistory } from "@stencil/router";
//import { TodoListComponent } from "../todo-list/todo-list"

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
        user: state.authStore.user
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
            <ion-title>StencilJS Sample App</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content padding>
          <p >
            Welcome to the Stencil App Starter. Check out
            our docs on <a href="https://stenciljs.com">stenciljs.com</a> to get
            started.<br /><br />
            We have integrated <a href="https://github.com/ionic-team/stencil-redux">stencil-redux</a> into the sample also<br /><br />
            <div>Logged In User from Auth Store: <strong>{this.user.email}</strong></div>
          </p>

          <todo-list-component></todo-list-component>
          <div style={{ marginTop: "20px" }} />
          <stencil-route-link url="/profile/stencil">
            <ion-button>Profile page</ion-button>
          </stencil-route-link>

          <ion-button onClick={() => this.handleLogout()}>LOGOUT</ion-button>
        </ion-content>
      </ion-page>
    );
  }
}
