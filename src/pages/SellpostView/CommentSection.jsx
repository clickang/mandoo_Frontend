import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const CommentContainer = styled.div`
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
`;

const CommentHeader = styled.h3`
  font-size: 18px;
  margin-bottom: 15px;
`;

const CommentList = styled.div`
  margin-bottom: 20px;
`;

const Comment = styled.div`
  border-bottom: 1px solid #ddd;
  padding: 10px 0;
  margin-left: ${(props) => (props.isReply ? "20px" : "0")}; /* 답글은 들여쓰기 */
  background-color: ${(props) => (props.isReply ? "#f4f4f4" : "transparent")};
  border-radius: ${(props) => (props.isReply ? "8px" : "0")};

  &:last-child {
    border-bottom: none;
  }

  p {
    margin: 5px 0;
  }
`;

const Author = styled.span`
  font-weight: bold;
`;

const CommentInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  max-width: 100%;
  padding: 0 10px;
`;

const CommentTextarea = styled.textarea`
  width: 100%;
  height: 60px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  resize: none;
  box-sizing: border-box;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  label {
    margin-left: 5px;
    font-size: 14px;
  }
`;

const SubmitButton = styled.button`
  align-self: flex-end;
  padding: 10px 20px;
  background-color: #815f3f;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #6b4d33;
  }
`;

const ReplyButton = styled.button`
  background-color: transparent;
  border: none;
  color: #815f3f;
  font-size: 14px;
  cursor: pointer;
  margin-top: 5px;

  &:hover {
    text-decoration: underline;
  }
`;

const ReviewTag = styled.span`
  color: green;
  font-weight: bold;
  margin-right: 5px; /* 닉네임과 간격 추가 */
`;

const CommentSection = ({ comments, sellPostId, memberId }) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments || []); // 댓글 상태
  const [parentCommentId, setParentCommentId] = useState(null); // 답글 대상
  const [isReviewComment, setIsReviewComment] = useState(false); // 후기 댓글 여부

  // 댓글을 계층 구조로 정리
  const organizeComments = (comments) => {
    if (!Array.isArray(comments)) return [];

    const commentMap = {};
    const rootComments = [];

    comments.forEach((comment) => {
      commentMap[comment?.commentId] = { ...comment, replies: [] };
    });

    comments.forEach((comment) => {
      if (comment?.parentCommentId) {
        if (commentMap[comment?.parentCommentId]) {
          commentMap[comment?.parentCommentId].replies.push(commentMap[comment?.commentId]);
        }
      } else {
        rootComments.push(commentMap[comment?.commentId]);
      }
    });

    return rootComments.sort((a, b) => a.commentId - b.commentId); // commentId로 정렬
  };

  const organizedComments = organizeComments(commentList);

  const handleCommentSubmit = async () => {
    if (!newComment.trim()) {
      alert("댓글을 입력해 주세요!");
      return;
    }

    const newCommentData = {
      content: newComment,
      commentStatus: isReviewComment ? 2 : 1, // 후기 댓글 여부에 따라 설정
      memberId: memberId,
      sellPostId: sellPostId,
      parentCommentId: parentCommentId,
    };

    try {
      const response = await axios.post(`/sellpost/read/${sellPostId}`, newCommentData);
      const addedComment = response.data.result;

      setCommentList((prevComments) => [...prevComments, addedComment]);
      setNewComment("");
      setParentCommentId(null);
      setIsReviewComment(false); // 체크박스 초기화
      alert("댓글이 등록되었습니다!");
      window.location.reload();
    } catch (error) {
      console.error("댓글 등록 중 오류 발생:", error);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleReplyClick = (commentId) => {
    setParentCommentId(commentId);
    setNewComment("");
  };

  const renderComments = (comments) => {
    return comments.map((comment) => (
      <React.Fragment key={comment?.commentId}>
        <Comment isReply={!!comment?.parentCommentId}>
          <p>
            {comment?.commentStatus === 2 && <ReviewTag>후기</ReviewTag>}
            <Author>{comment?.nickname}</Author>{" "}
            {new Date(comment?.createdAt).toLocaleString()}
          </p>
          <p>{comment?.content}</p>
          {!comment?.parentCommentId && (
            <ReplyButton onClick={() => handleReplyClick(comment?.commentId)}>
              답글 달기
            </ReplyButton>
          )}
        </Comment>
        {/* 재귀적으로 답글 렌더링 */}
        {comment.replies && comment.replies.length > 0 && renderComments(comment.replies)}
      </React.Fragment>
    ));
  };

  return (
    <CommentContainer>
      <CommentHeader>댓글 {commentList.length}</CommentHeader>
      <CommentList>{renderComments(organizedComments)}</CommentList>
      <CommentInputContainer>
        {parentCommentId && (
          <p>
            <Author>답글 대상 ID:</Author> {parentCommentId}번 댓글
          </p>
        )}
        <CheckboxContainer>
          <input
            type="checkbox"
            id="review-comment"
            checked={isReviewComment}
            onChange={(e) => setIsReviewComment(e.target.checked)}
          />
          <label htmlFor="review-comment">후기 댓글</label>
        </CheckboxContainer>
        <CommentTextarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="댓글을 입력해 주세요"
        />
        <SubmitButton onClick={handleCommentSubmit}>등록</SubmitButton>
      </CommentInputContainer>
    </CommentContainer>
  );
};

export default CommentSection;
