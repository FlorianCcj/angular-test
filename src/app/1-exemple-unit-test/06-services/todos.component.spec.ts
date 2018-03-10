import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';

describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {
    service = new TodoService(null);
    component = new TodosComponent(service);
  });

  // ******************************
  // ngOnInit
  // ******************************

  it('should set todos property with the items returned from the server', () => {
    const todos = [1, 2, 3];
    spyOn(service, 'getTodos').and.callFake(() => {
      return Observable.from([todos]);
    })

    component.ngOnInit();

    expect(component.todos.length).toBeGreaterThan(0);
    expect(component.todos.length).toBe(3);
    expect(component.todos).toBe(todos);
  });

  // ******************************
  // add
  // ******************************

  it('should call the server to save changes when a todo item is added', () => {

    const spy = spyOn(service, 'add').and.callFake(() => {
      return Observable.empty();
    });
    
    component.add();

    expect(spy).toHaveBeenCalled();
  });

  it('should add the new todoreturned from the sever', () => {
    const todo = {id: 1};
    const spy = spyOn(service, 'add').and.returnValue(Observable.from([todo]));
    
    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);
  });

  it('should set the message property if server return an error when adding a new todo', () => {
    const message = 'error from the server';
    const spy = spyOn(service, 'add').and.returnValue(Observable.throw(message));
    
    component.add();

    expect(component.message).toBe(message);
  });

  // ******************************
  // delete
  // ******************************

  it('should call the server to delete a todo item if the user confirms', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    const spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);
  });

  it('should NOT call the server to delete a todo item if the user cancels', () => {
    spyOn(window, 'confirm').and.returnValue(false);
    const spy = spyOn(service, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();
  });
});