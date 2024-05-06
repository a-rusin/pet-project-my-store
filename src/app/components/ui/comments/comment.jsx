import formatDate from "../../../utils/formatDate";
import avatar from "./../../../assets/imgs/avatar.png";

const Comment = ({ comment }) => {
  return (
    <li className="comment-item">
      <div className="comment-item-main-info">
        <div className="comment-item-author-block">
          <img src={avatar} alt="" className="comment-item-image" />
          <p className="comment-item-author">{comment.userName}</p>
        </div>
        <p className="comment-item-date">{formatDate(comment.createdAt)}</p>
      </div>
      <div className="comment-item-text-block">
        <p className="comment-item-title">Достоинства: </p>
        <p className="comment-item-message">{comment.advantages}</p>
      </div>
      <div className="comment-item-text-block">
        <p className="comment-item-title">Недостатки: </p>
        <p className="comment-item-message">{comment.disadvantages}</p>
      </div>
      <div className="comment-item-text-block">
        <p className="comment-item-title">Комменатрий: </p>
        <p className="comment-item-message">{comment.commentText}</p>
      </div>
    </li>
  );
};

export default Comment;
