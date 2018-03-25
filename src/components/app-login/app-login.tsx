import { Component, State, Prop } from "@stencil/core";
import { RouterHistory } from "@stencil/router";

import { Store, Action } from "@stencil/redux";
import * as fromActions from "../../store/actions/index";

@Component({
  tag: "app-login",
  styleUrl: "app-login.css"
})
export class AppLogin {
  // state properties...
  @State() credentials: any = {};
  @State() loginError: any = {};

  // get the router history for redirecting
  @Prop() history: RouterHistory;

  // get access to the store from the context
  @Prop({ context: "store" })
  store: Store;

  // set the Actions that I will be using in this component
  doLogin: Action;

  componentWillLoad() {
    // map the state  props so they can be accessed
    // locally
    this.store.mapStateToProps(this, state => {
      return {
        ...state
      };
    });

    // map the doLogout action so it can be called
    // locally
    this.store.mapDispatchToProps(this, {
      doLogin: fromActions.doLogin
    });
  }

  /**
   * login using the api
   */
  _doLogin = async _event => {
    let result = await this.doLogin(this.credentials);
    if (!result.error) {
      this.history.replace("/", {});
    } else {
      this.loginError = result.error;
    }
  };

  render() {
    return (
      <ion-page class="show-page">
        <ion-header md-height="56px">
          <ion-toolbar color="primary">
            <ion-title>LOGIN PAGE</ion-title>
          </ion-toolbar>
        </ion-header>
        <ion-content>
          <ion-card style={{ margin: "0px", padding: "10px" }}>
            <ion-card-header />
            <ion-card-content>
              <ion-label stacked>
                Email
                <ion-input
                  type="text"
                  value={this.credentials.email}
                  onInput={(event: any) =>
                    (this.credentials.email = event.target.value)
                  }
                />
              </ion-label>
              <ion-label stacked>
                Password
                <ion-input
                  type="text"
                  value={this.credentials.password}
                  onInput={(event: any) =>
                    (this.credentials.password = event.target.value)
                  }
                />
              </ion-label>
            </ion-card-content>
            <ion-button onClick={this._doLogin}>LOGIN</ion-button>
          </ion-card>
          {this.loginError && <p>{this.loginError}</p>}
        </ion-content>
      </ion-page>
    );
  }
}
