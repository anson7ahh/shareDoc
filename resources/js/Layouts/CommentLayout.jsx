import { createCommentParent, setCommentParentItems, setContentCommentParent, setReplyCommentItems } from '@/redux/CommentSlice';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CommentItems from '@/Layouts/CommentItemsLayout'
import Image from '@/Components/ImgComponent';
import { Link } from "@inertiajs/react";

const Comment = ({ DocumentId, auth }) => {
    const dispatch = useDispatch();
    const { contentCommentParent, commentParentItems, allComment } = useSelector((state) => state.comment);
    const handleClick = () => {
        dispatch(createCommentParent({
            documentId: DocumentId,
            content: contentCommentParent,
        }));
    }

    const handleCommentChange = (e) => {
        dispatch(setContentCommentParent(e.target.value));
    };
    useEffect(() => {
        if (Array.isArray(allComment)) {
            const parentCommentsList = allComment.filter(comment => comment.parent_id === null).map(comment => ({
                ...comment,
                showInputReply: false,
                ReplyItems: false
            }));
            dispatch(setCommentParentItems(parentCommentsList));
            const replyCommentsList = allComment
                .filter(comment =>
                    parentCommentsList.some(parent => parent.id === comment.parent_id)
                )
                .map(comment => ({
                    ...comment,
                    showInputReplyCommentItem: false
                }));
            dispatch(setReplyCommentItems(replyCommentsList));
        } else {
            dispatch(setReplyCommentItems([]));
            dispatch(setCommentParentItems([]));
        }
    }, [allComment, dispatch]);
    return (
        <>
            <div className="bg-white rounded-lg shadow p-4">
                <div className="flex space-x-4 py-4">
                    <Image auth={auth?.img} className="w-12 h-12 rounded-full bg-gray-300" />
                    <div className="flex flex-col w-full">
                        <input

                            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                            type="text"
                            placeholder="Viết bình luận..."
                            value={contentCommentParent}
                            onChange={handleCommentChange}
                        />
                        <div className="flex space-x-2 mt-2 justify-end">
                            <button
                                className="text-gray-500 hover:text-gray-700"
                                onClick={() => dispatch(setContentCommentParent(''))}
                            >
                                Hủy
                            </button>
                            {auth ? (
                                <button
                                    className={`bg-blue-500 text-white px-4 py-2 rounded-full ${!contentCommentParent.trim() && 'opacity-50 cursor-not-allowed'}`}
                                    onClick={handleClick}
                                    disabled={!contentCommentParent.trim()}
                                >
                                    Bình luận
                                </button>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-full"
                                >
                                    Bình luận
                                </Link>
                            )}

                        </div>
                    </div>
                </div>
                <div>
                    {commentParentItems?.length > 0 && (
                        <CommentItems DocumentId={DocumentId} auth={auth} />
                    )}
                </div>
            </div>
        </>
    );
};

export default memo(Comment);
