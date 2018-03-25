
import { Component, State, Prop } from "@stencil/core";
import { Store, Action } from "@stencil/redux";

import * as fromActions from "../../store/actions/todo-actions"

@Component({
    tag: "todo-list-component",
    styleUrl: "todo-list.css"
})
export class TodoListComponent {
    // state properties...
    @State() todos;
    @State() todoEntry: any = {};

    // get access to the store from the context
    @Prop({ context: "store" })
    store: Store;

    // set the Actions that I will be using in this component
    doAddTodo: Action;
    doDeleteTodo: Action;

    componentWillLoad() {
        debugger;
        // map the user state so it can be called
        // locally
        this.store.mapStateToProps(this, state => {
            return {
                todos: state.todoStore.todos
            };
        });

        // map the doLogout action so it can be called
        // locally
        this.store.mapDispatchToProps(this, {
            doAddTodo: fromActions.addTodo,
            doDeleteTodo: fromActions.deleteTodo,
        });
    }
    render() {
        return (
            <div>
                <ion-card padding>
                    <ion-label stacked>
                        Todo Description
                        <ion-input type="text" value={this.todoEntry.description}
                            placeholder="Enter description text..."
                            onInput={(event: any) =>
                                (this.todoEntry.description = event.target.value)
                            } ></ion-input>
                    </ion-label>
                    <ion-button size="small" onClick={()=> this.doAddTodo(this.todoEntry)}>ADD</ion-button>
                </ion-card>

                <ion-item>
                    {this.todos.length !== 0
                        ? (<div>
                            {this.todos.map((todo: any) => {
                                return <p> {todo.id} : {todo.description}</p>
                            })}
                        </div>)
                        : <p> <strong>No Todos Entered Yet... </strong></p>
                    }
                </ion-item>
            </div>
        );
    }
}
