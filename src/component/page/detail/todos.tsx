import { TodoEntity, UserEntity } from '@/utils/entity';
import ENV from '@/utils/env';
import Todo from './todo';
import AddTodoModal from './addTodo';



export default async function Todos({user}:{
  user:UserEntity
}) {
  if(user.id == 0){
    return <></>
  }
  console.log("USER_ID is " + user.id)
  const res = await fetchData(user.id)
  let todoList = res.results
  console.log(todoList)
  

  return ( 
    <section id="todo" className="todo section-bg">
      <div className="container">
        <div className="section-title">
          <h2>
            Todoリスト 
            <button className="btn btn-primary ml-2" data-bs-toggle="modal" data-bs-target={`#todo-modal`}><i className="bi bi-plus-circle"></i> 追加</button>
          </h2>
          <AddTodoModal user={user} />
        </div>
          {(!todoList || todoList.length == 0) &&
            <>
              <h4>Todoリストが設定されていません。</h4>
              <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#todo-modal`}><i className="bi bi-plus-circle"></i></button>
            </>
          }
          {todoList && todoList.length > 0 &&
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">概要</th>
                  <th scope="col">詳細</th>
                  <th scope="col">予定日</th>
                  <th scope="col">完了日</th>
                  <th scope="col">スタンプ</th>
                  <th scope="col">編集</th>
                </tr>
              </thead>
              <tbody>
              {todoList.map((todo:TodoEntity) => {
                return (
                  <Todo user={user} todo={todo} key={todo.id}/>
                )
              })}
              </tbody>
            </table>
          }
    </div>
    </section>
  )
}

/**
 * 再生リストからアイテム一覧取得
 * path作成
 * @returns 
 */
async function fetchData(userId:number){
  const res = await fetch(`${ENV.BASE_URL}api/user/todo/${userId}/`, {method: 'GET', cache: "no-store"} )
  if(!res){
    return []
  }
  const data = res.json()
  return data
}
