import { Component } from "@stencil/core";
import '@stencil/router'

import "@ionic/core";
import { firebaseAPI } from '../../helpers/firebase-service';

const PrivateRoute = ({ component, ...props}: { [key: string]: any}) => (
  <stencil-route {...props} routeRender={
    (props: { [key: string]: any}) => {
      debugger;
      console.log(props)
      console.log(component)
      if (firebaseAPI.getUser()) {
        const Component = component;
        // why do they use componentProps and not just pass thru
        // the props?
        // return <Component {...props.componentProps}></Component>;
        return <Component {...props} ></Component>;
      }
      return <stencil-router-redirect url="/login"></stencil-router-redirect>
    }
  }/>
)


@Component({
  tag: "my-app",
  styleUrl: "my-app.css"
})
export class MyApp {
  render() {
    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main style={{ padding: "10px" }}>
<stencil-router>
  <PrivateRoute path="/" component="app-home" exact={true} />
  <PrivateRoute url="/profile/:name" component="app-profile" />
  <stencil-route url="/login" component="app-login" exact={true} />
</stencil-router>
        </main>
      </div>
    );
  }
}
