import Link from "next/link";
import { getMeeYohPlayListItems, PlayListItem, PlayListItems, PlayListItemsResponse } from "@/lib/youtube";
import About from "@/component/page/about";
import { MEE_NAME, YOH_NAME } from "@/utils/const";

export default async function Detail() {

  return (
    <>
        <section id="about" className="about " >
          <About name={MEE_NAME}/>
          <About name={YOH_NAME}/>
        </section>
    </>
  )
}