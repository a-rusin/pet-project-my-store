import { useEffect, useState } from "react";
import ListItems from "../../common/listItems/listItems";
import feedbackService from "../../../services/feedback.service";
import Modal from "../../common/modal";
import FeedbackItem from "../../common/feedbackItem";

const AdminFeedbackPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [feedbacks, setFeeedbacks] = useState([]);
  const [feedbackItem, setFeedbackItem] = useState();
  const [isModalEditActive, setIsModalEditActive] = useState(false);

  const getAllFeedbacks = async () => {
    try {
      const data = await feedbackService.getAll();
      setFeeedbacks(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getAllFeedbacks();
  }, []);

  const onClickOpen = (id) => {
    setIsModalEditActive(true);
    setFeedbackItem(feedbacks.find((item) => item._id === id));
  };

  return (
    <>
      <h1 className="admin-route-title">Все сообщения</h1>
      <div className="admin-main-content-list">
        {isLoading ? (
          "Загрузка..."
        ) : (
          <>
            <ListItems items={feedbacks} onClickOpen={onClickOpen} />
            <Modal
              isOpen={isModalEditActive}
              setIsOpen={setIsModalEditActive}
              title="Сообщение"
            >
              <FeedbackItem feedback={feedbackItem} />
            </Modal>
          </>
        )}
      </div>
    </>
  );
};

export default AdminFeedbackPage;
