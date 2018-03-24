import { Component, State, Prop } from "@stencil/core";
import { RouterHistory } from "@stencil/router";

import { firebaseAPI } from "../../helpers/firebase-service";

@Component({
  tag: "app-login",
  styleUrl: "app-login.css"
})
export class AppLogin {
  @State() credentials: any = {};
  @State() loginError: any = {};
  @Prop() history: RouterHistory;

  doLogin = async _event => {
    console.log(this.history);
    console.log(this.credentials);

    let result = await firebaseAPI.login(this.credentials);
    console.log(result);
    if (result.error) {
      this.loginError = result.error;
    } else {
      this.history.replace("/", {});
    }
  };

  render() {
    return (
      <div>
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
          <ion-button onClick={this.doLogin}>LOGIN</ion-button>
        </ion-card>
        {this.loginError && <p>{this.loginError}</p>}
      </div>
    );
  }
}
