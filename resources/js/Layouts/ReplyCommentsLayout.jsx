import { createReplyComment, setContentReplyComment, toggleShowInputReply } from '@/redux/CommentSlice';
import { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Image from '@/Components/ImgComponent';
import { Link } from "@inertiajs/react";

const ReplyCommentsLayout = ({ DocumentId, auth, ReplyUserName }) => {
    const dispatch = useDispatch();
    const { contentReplyComment, commentId } = useSelector((state) => state.comment);

    useEffect(() => {
        if (ReplyUserName) {
            dispatch(setContentReplyComment(`@${ReplyUserName?.name} `));
        }
    }, [ReplyUserName]);

    const handleCommentChange = (e) => {
        dispatch(setContentReplyComment(e.target.value));
    };

    const handleCancelClick = () => {
        dispatch(toggleShowInputReply({ id: commentId }));
    };

    const handleClick = async () => {
        dispatch(createReplyComment({
            commentId: commentId,
            documentId: DocumentId,
            contentReplyComment: contentReplyComment,
        }));
    };

    return (
        <>
            <div className="bg-white rounded-lg shadow p-4 w-full">
                <div className="flex space-x-3 items-start">
                    <Image auth={auth?.img} className="w-10 h-10 rounded-full bg-gray-300" />
                    <div className="flex flex-col w-full">
                        <input
                            className="border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500 w-full text-sm"
                            type="text"
                            value={contentReplyComment}
                            onChange={handleCommentChange}
                            placeholder="Thêm bình luận..."
                        />
                        <div className="flex space-x-2 mt-2 justify-end">
                            <button
                                className="text-sm text-gray-500 px-4 py-1 hover:underline"
                                onClick={handleCancelClick}
                            >
                                Hủy
                            </button>
                            {auth ? (
                                <button
                                    className={`text-sm px-4 py-1 rounded-full bg-blue-500 text-white ${!contentReplyComment?.trim() && 'opacity-50 cursor-not-allowed'}`}
                                    onClick={handleClick}
                                    disabled={!contentReplyComment?.trim()}
                                >
                                    Bình luận
                                </button>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="text-sm px-4 py-1 rounded-full bg-blue-500 text-white"
                                >
                                    Bình luận
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default memo(ReplyCommentsLayout);
