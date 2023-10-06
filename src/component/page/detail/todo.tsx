'use client'
import { convertDateToString, YYYY_MM_DD_FORMAT } from '@/utils/date';
import { TodoEntity, UserEntity } from '@/utils/entity';
import AddTodoModal from './addTodo';
import ENV from '@/utils/env';


export default async function Todo({user, todo}:{
  user:UserEntity
  todo:TodoEntity
}) {

  const deleteTodo = () => {
    doDelete(todo)
  }

  const doComplete = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>, todo:TodoEntity) => {
    // conpleteの属性を更新して
    todo.completed()
    // 永続化
    doCompleteTodo(todo).then((success)=>{

    })
    .catch((error) => {
      
    })
  }

  return (
    <tr>
      <th scope="row">{todo.id}</th>
      <td>{todo.title}</td>
      <td>{todo.description}</td>
      <td>{convertDateToString(todo.scheduled_at, YYYY_MM_DD_FORMAT)}</td>
      <td>{(todo.complete && todo.completed_at) ? convertDateToString(todo.completed_at, YYYY_MM_DD_FORMAT) : ""}</td>
      <td>{(todo.complete) ? "スタンプ" : ""}</td>
      <td>
          <div className="d-flex">
            <div className="d-inline m-2">
              <button data-bs-toggle="modal" className="btn btn-secondary" data-bs-target={`#todo-modal-${todo.id}`}><i className="bi bi-pencil-square"></i> 編集</button>
              <AddTodoModal user={user} todo={todo}/>
            </div>
            <div className="d-inline m-2">
              <button type="button" className="btn btn-warning" onClick={(e) => doComplete(e, todo)}><i className="bi bi-x-circle"></i> 完了</button>
            </div>
            <div className="d-inline  m-2">
              <button type="button" className="btn btn-danger" onClick={deleteTodo}><i className="bi bi-x-circle"></i> 削除</button>
            </div>
          </div>

      </td>
    </tr>
  )
}


async function doDelete(todo:TodoEntity){
  const res = await fetch(`${ENV.BASE_URL}api/user/todo/${todo.user_id}/`, {method: 'DELETE'} )
  if(!res){
    return []
  }
  const data = res.json()
  return data
}

async function doCompleteTodo(todo:TodoEntity){
  const res = await fetch(`${ENV.BASE_URL}api/user/todo/${todo.user_id}`, {method: 'PATCH', body: JSON.stringify(todo)} )
  if(!res){
    return []
  }
  const data = await res.json()
  return data
}