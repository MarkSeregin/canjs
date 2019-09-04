// Creates a mock backend with 3 todos
import { todoFixture } from "//unpkg.com/can-demo-models@6/index.mjs";
todoFixture(3);

import { StacheElement } from "//unpkg.com/can@6/core.mjs";

class TodosApp extends StacheElement {
  static view = `
    <h1>Today’s to-dos</h1>
  `;

  static props = {};
}

customElements.define("todos-app", TodosApp);
