//'use client';
import { getMeeYohPlayListItems, getMeeYohDetail, PlayListItem, PlayListItems, PlayListItemsResponse} from "@/lib/youtube";
import { Profile, getProfile } from "@/utils/profile";
import ENV from "@/utils/env";
import About from "@/component/page/about";
import Todos from "@/component/page/detail/todos";
import { UserEntity } from "@/utils/entity";

export default async function UserDetail({
  params:{userName}
}: {
  params: {userName:string}
}) {
  let profile = getProfile(userName)

  let userList = []
  let user:UserEntity = new UserEntity(0, "")
  if(profile){
    let data = await fetchData(userName)
    userList = data.results
    userList.map((u:any) => {
      if(userName == u.name){
        user = new UserEntity(u.id, u.name)
        user.profile = profile
      }
    })
  }

  return (
    <>
      {!profile && 
        <h3 className="text-center">登録情報のない名前です</h3>
      }
      {profile && 
        <>
          <h3 className="text-center">{/*profile.name*/}取得できた</h3>

          <ul>
            {userList.map((u:UserEntity) => {
              return <p key={u.id}>{u.id} / {u.name}</p>
            })}
          </ul>
          {/* <About name={profile.name}/> */}
          <Todos user={user}/>
        </>
      }
    </>
  )
}

/**
 * 再生リストからアイテム一覧取得
 * path作成
 * @returns 
 */
async function fetchData(name:string){
  const res = await fetch(`${ENV.BASE_URL}api/user/?name=${name}`, {method: 'GET', cache: "no-store"} )
  if(!res){
    return []
  }
  const data = res.json()
  return data
}

