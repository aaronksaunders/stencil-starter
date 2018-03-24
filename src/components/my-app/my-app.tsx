import { Component } from "@stencil/core";
import "@ionic/core";

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
            <stencil-route url="/" component="app-home" exact={true} />

            <stencil-route url="/profile/:name" component="app-profile" />
          </stencil-router>
        </main>
      </div>
    );
  }
}
