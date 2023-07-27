'use client'
import "./modal.css"
import { getMeeYohPlayListItems, getMeeYohDetail, PlayListItem, PlayListItems, PlayListItemsResponse} from "@/lib/youtube";
import YoutubeItem from "@/component/page/youtube";

export default function MovieModal({videoId}:{
    videoId:string
}) {
    return (
        <div className="modal fade" id={`movieModal-${videoId}`}>
            <div className="modal-dialog modal-fullscreen">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Modal title</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <YoutubeItem videoId={videoId} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Save changes</button>
                </div>
                </div>
            </div>
        </div>
)}