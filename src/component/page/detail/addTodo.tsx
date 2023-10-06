'use client'
import { useState } from 'react' 
import { TodoEntity, UserEntity } from '@/utils/entity'
import DatePicker from '@/component/common/datepicker'
import ENV from '@/utils/env'
import { Todo } from '@/lib/planetScale'
export default function AddTodoModal({user, todo}:{
    user:UserEntity
    todo?:TodoEntity
}) {
    let modalId = `todo-modal`
    let isNew = true
    let submitLabel:string = "追加(ついか)"

    let title:string = ""
    let description:string | undefined = undefined
    let userId:number = user.id
    let scheduledAt:Date = new Date()
    let complete:boolean = false
    let completedAt:Date | undefined = undefined
    if(todo){
        // 編集
        title = todo.title
        description = todo.description
        userId = todo.user_id
        scheduledAt = todo.scheduled_at
        complete = todo.complete
        completedAt = todo.completed_at
        submitLabel = "編集(へんしゅう)"
        isNew = false
        modalId = modalId +`-${todo.id}`
    }

    const [titleInput, setTitleInput] = useState<string>(title);
    const [descriptionInput, setDescriptionInput] = useState<string| undefined>(description);
    const [scheduledAtInput, setScheduledAtInput] = useState<Date>(scheduledAt);
    const [titleError, setTitleError] = useState<string>("");
    const [descriptionError, setDescriptionError] = useState<string>("");
    const [scheduledAtError, setScheduledAtError] = useState<string>("");


    if (typeof window === 'object') {

        // 画面上部に戻るボタンの制御
        const myModalEl = document.getElementById(modalId)
        if(myModalEl){
            myModalEl.addEventListener('shown.bs.modal', event => {
                if(todo){
                    // 編集
                    title = todo.title
                    description = todo.description
                    userId = todo.user_id
                    scheduledAt = todo.scheduled_at
                    complete = todo.complete
                    completedAt = todo.completed_at
                    submitLabel = "編集(へんしゅう)"
                    isNew = false
                    modalId = modalId +`-${todo.id}`
                }
            })

            myModalEl.addEventListener('hidden.bs.modal', event => {
                // setTitleInput("")
                // setDescriptionInput("")
                // setScheduledAtInput(new Date())
            })
        }
    }



    const handlerOnChangeScheduledAt = (date:Date) => {
        alert("set")
        setScheduledAtInput(date)
    }

    const handlerOnChangeTitle = (event: React.ChangeEvent<HTMLInputElement>) => {
        const val = event.target.value
        setTitleInput(val)
        if(!val){
            setTitleError("入力してください。")
            return
        }
        if(val.length > 30){
            setTitleError("30文字以内で入力してください。")
            return
        }
        setTitleError("")
        
    }
    const handlerOnChangeDesc = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescriptionInput(event.target.value)
    }
    const handlerSubmit = async () => {
        if(!todo){
            todo = new TodoEntity(0, )
        }
        todo.title = titleInput
        todo.description = descriptionInput
        todo.scheduled_at = scheduledAtInput
        todo.user_id = userId
        todo.completed_at = undefined

        //let userEntity:UserEntity = new UserEntity(user.id, user.name)
        //todo.user = userEntity
        console.log("isNew " + isNew)
        let res
        if(isNew){
            res = await doAdd(todo)
        } else {
            res = await doEdit(todo)
        }

        console.log(res)

        // const { Modal } = require("bootstrap");
        // const addModal = new Modal(`#todo-modal`);
        // addModal.close()
        //location.reload()
    }


    return (
        <div className="modal fade p-0" id={modalId}>
            <div className="modal-dialog " >
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">ToDoリストに追加する</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body align-items-center">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">やりたいこと</label>
                                <input type="text" className="form-control" id="title" placeholder="公園に行きたい！" maxLength={30} value={titleInput} onChange={handlerOnChangeTitle} />
                                {titleError && 
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <div>
                                            {titleError}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">詳細</label>
                                <textarea className="form-control" id="description" rows={3} value={descriptionInput} onChange={handlerOnChangeDesc}></textarea>
                                {descriptionError && 
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <div>
                                            {descriptionError}
                                        </div>
                                    </div>
                                }
                            </div>
                            <div className="mb-3">
                                <label htmlFor="scheduledAt" className="form-label">予定日</label>
                                <DatePicker date={scheduledAtInput} callback={handlerOnChangeScheduledAt}/>
                                {scheduledAtError && 
                                    <div className="alert alert-danger d-flex align-items-center" role="alert">
                                        <div>
                                            {scheduledAtError}
                                        </div>
                                        
                                    </div>
                                }
                            </div>
                            <button type="button" className="btn btn-primary" onClick={handlerSubmit}>{submitLabel}</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
)}

async function doAdd(todo:TodoEntity){

    let params:Todo = {
        title: todo.title,
        description: todo.description,
        scheduled_at: todo.scheduled_at,
        user_id: todo.user_id,
        complete: false,
        completed_at: undefined
    }
    console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇doAdd◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
    console.log(params)
    const res = await fetch(`${ENV.BASE_URL}api/user/todo`, {method: 'POST', body: JSON.stringify(params)} )
    if(!res){
      return []
    }
    const data = await res.json()
    console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇endAdd◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
    console.log(data)
    return data
  }

async function doEdit(todo:TodoEntity){
    console.log("◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇doEdit◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇◇")
    console.log(todo)
    const res = await fetch(`${ENV.BASE_URL}api/user/todo/${todo.user_id}`, {method: 'PATCH', body: JSON.stringify(todo)} )
    if(!res){
      return []
    }
    const data = await res.json()
    return data
}