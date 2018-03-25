import { Component, Prop, State } from "@stencil/core";
import "@stencil/router";

import "@ionic/core";
import { firebaseAPI } from "../../helpers/firebase-service";

// REDUX
import { Store } from "@stencil/redux";

import rootStore from "../../store/index";
import * as fromActions from "../../store/actions/index";

const PrivateRoute = ({ component, ...props }: { [key: string]: any }) => (
  <stencil-route
    {...props}
    routeRender={(props: { [key: string]: any }) => {
      console.log(props);
      console.log(component);
      if (firebaseAPI.getUser()) {
        const Component = component;
        // why do they use componentProps and not just pass thru
        // the props?
        // return <Component {...props.componentProps}></Component>;
        return <Component {...props} />;
      }
      return <stencil-router-redirect url="/login" />;
    }}
  />
);

@Component({
  tag: "my-app",
  styleUrl: "my-app.css"
})
export class MyApp {
  @Prop({ context: "store" })
  store: Store;
  @State() authChecked: boolean = false;

  /**
   *
   */
  componentWillLoad() {
    // Only do this once, in the root component
    this.store.setStore(rootStore);

    rootStore.dispatch(fromActions.doAuthCheck()).then(() => {
      this.authChecked = true;
    });
  }

  render() {
    return this.authChecked ? (
      <ion-app>
        <main style={{ padding: "10px" }}>
          <stencil-router>
            <PrivateRoute path="/" component="app-home" exact={true} />
            <PrivateRoute url="/profile/:name" component="app-profile" />
            <stencil-route url="/login" component="app-login" exact={true} />
          </stencil-router>
        </main>
      </ion-app>
    ) : (
      <p>&nbsp;&nbsp;LOADING...</p>
    );
  }
}
