import React, { memo, useEffect } from 'react';
import { setCommentId, setReplyCommentItems, toggleReplyItems, toggleShowInputReply } from '@/redux/CommentSlice'; // Import các action từ slice
import { useDispatch, useSelector } from 'react-redux';

import Image from '@/Components/ImgComponent';
import ReplyCommentItemsLayout from './ReplyCommentItemsLayout';
import ReplyCommentsLayout from './ReplyCommentsLayout';

const CommentItems = ({ DocumentId, auth }) => {
    const dispatch = useDispatch();
    const { commentParentItems, replyCommentItems } = useSelector((state) => state.comment);

    const handleShowReply = (id) => {
        dispatch(toggleReplyItems({ id }));
        dispatch(setCommentId(id));
    };
    const handleShowInputReply = (id) => {
        dispatch(toggleShowInputReply({ id }));
        dispatch(setCommentId(id));
    };

    return (
        <div className="space-y-6 max-h-[500px] overflow-y-auto p-4 border border-gray-200 rounded-lg bg-white shadow-lg">
            {commentParentItems.map(comment => (
                <div key={comment.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 shadow-md">
                    <div className="flex space-x-3 mb-4">
                        <Image
                            src={comment?.img}
                            className="w-12 h-12 rounded-full bg-gray-300 shadow-sm"
                        />
                        <div className="flex-1">
                            <div className="flex items-center space-x-2">
                                <span className="font-semibold text-gray-900">{comment.name}</span>
                                <span className="text-sm text-gray-500">{new Date(comment.created_at).toLocaleDateString()}</span>
                            </div>
                            <p className="text-gray-700 mt-1">{comment.body}</p>
                            <button
                                onClick={() => handleShowInputReply(comment.id)}
                                className="text-blue-500 hover:underline text-sm mt-2"
                            >
                                Trả lời
                            </button>
                        </div>
                    </div>

                    {comment.showInputReply && (
                        <div className="ml-12">
                            <ReplyCommentsLayout auth={auth} ReplyUserName={comment.user} DocumentId={DocumentId} />
                        </div>
                    )}
                    {replyCommentItems.length > 0 && replyCommentItems.filter(reply => reply.parent_id === comment.id).length > 0 && (
                        <div className="ml-12 mt-3">
                            <button onClick={() => handleShowReply(comment.id)} className="text-blue-500 text-sm">
                                {replyCommentItems.filter(reply => reply.parent_id === comment.id).length} phản hồi
                            </button>
                            {comment.ReplyItems != false && (
                                <div className="mt-2 space-y-2">

                                    <ReplyCommentItemsLayout comment={comment} auth={auth} DocumentId={DocumentId} />
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default memo(CommentItems);
