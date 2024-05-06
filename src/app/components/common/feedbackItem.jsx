const FeedbackItem = ({ feedback }) => {
  return (
    <>
      {feedback && (
        <div className="feedback-item-content">
          <p className="feedback-item-text">
            <strong>Имя: </strong>
            {feedback.name}
          </p>
          <p className="feedback-item-text">
            <strong>Email: </strong>
            {feedback.email}
          </p>
          <p className="feedback-item-text">
            <strong>Текст сообщения: </strong>
            {feedback.messageText}
          </p>
        </div>
      )}
    </>
  );
};

export default FeedbackItem;
