import React, { memo, } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from '@/Components/ImgComponent';
import ReplyCommentsLayout from './ReplyCommentsLayout'
import { toggleShowInputReplyCommentItems } from '@/redux/CommentSlice';

const ReplyCommentItemsLayout = ({ comment, auth, DocumentId }) => {
    const { replyCommentItems } = useSelector((state) => state.comment);
    const dispatch = useDispatch();

    const handleShowInputReplyCommentItems = (id) => {
        dispatch(toggleShowInputReplyCommentItems({ id }));
    };

    return (
        <>
            {replyCommentItems.filter(reply => reply.parent_id === comment.id).map(replyComment => (
                <div key={replyComment.id} className="flex flex-col space-x-3 items-start bg-gray-100 p-3 rounded-lg">
                    <div className='flex space-x-3 flex-row'>
                        <Image
                            src={replyComment?.img}
                            className="w-10 h-10 rounded-full bg-gray-300"
                        />
                        <div>
                            <span className="font-semibold text-sm text-gray-900">{replyComment.name}</span>
                            <p className="text-gray-700 text-sm">{replyComment.body}</p>
                        </div>
                    </div>
                    <div>
                        <button onClick={() => handleShowInputReplyCommentItems(replyComment.id)}
                            className="text-blue-500 text-sm">
                            Trả lời
                        </button>
                    </div>
                    <div className='w-full'>
                        {replyComment?.showInputReplyCommentItem != false && (
                            <div className='w-full'>
                                <ReplyCommentsLayout auth={auth} commentId={comment.id} DocumentId={DocumentId} ReplyUserName={replyComment?.name} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    )
}
export default memo(ReplyCommentItemsLayout);