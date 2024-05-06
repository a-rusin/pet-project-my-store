import { useEffect, useState } from "react";
import FormCreator from "../../common/form/formCreator";
import { useDispatch, useSelector } from "react-redux";
import localStorageService from "../../../services/localStorage.service";
import localStorageConstants from "../../../constants/localStorage.constants";
import {
  addComment,
  getCommentLoadingStatus,
  getComments,
  getCommentsEntities,
} from "../../../store/comments";
import Loader from "../../common/loader";
import Comment from "./comment";
import { getCurrentUser } from "../../../store/auth";

const formConfig = [
  {
    id: 0,
    label: "Достоинства: ",
    name: "advantages",
    value: "",
    placeholder: "Достоинства...",
    type: "text",
    isRequired: true,
  },
  {
    id: 1,
    label: "Недостатки: ",
    name: "disadvantages",
    value: "",
    placeholder: "Недостатки...",
    type: "text",
    isRequired: true,
  },
  {
    id: 2,
    label: "Комментарий: ",
    name: "commentText",
    value: "",
    placeholder: "Ваш комментарий...",
    type: "textarea",
    isRequired: true,
  },
];

const CommentsList = ({ productId }) => {
  const [formState, setFormState] = useState(formConfig);

  const isCommentLoading = useSelector(getCommentLoadingStatus());
  const commentsList = useSelector(getCommentsEntities());
  const currentUser = useSelector(getCurrentUser());

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComments(productId));
  }, [productId]);

  const isBtnDisabled = false;

  const errors = false;

  const handleChange = (name, value) => {
    setFormState((prevState) => {
      return prevState.map((item) => {
        if (item.name === name) {
          item.value = value;
        }
        return item;
      });
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    setFormState((prevState) =>
      prevState.map((item) => ({
        ...item,
        value: "",
      }))
    );

    const payload = {
      productId,
      userId: localStorageService.get(localStorageConstants.userId),
      commentText: formState.find((item) => item.name === "commentText").value,
      advantages: formState.find((item) => item.name === "advantages").value,
      disadvantages: formState.find((item) => item.name === "disadvantages")
        .value,
    };

    dispatch(addComment(payload));
  };

  return (
    <div className="comments-wrapper">
      <h1 className="comments-title">Отзывы и комментарии:</h1>
      {isCommentLoading ? (
        <Loader />
      ) : (
        <>
          {currentUser ? (
            <FormCreator
              formState={formState}
              handleChange={handleChange}
              submitForm={submitForm}
              btnText="Опубликовать"
              btnDisabled={isBtnDisabled}
              error={errors}
            />
          ) : (
            <p className="comment-auth-message">
              Добавление комментариев доступно только авторизованым
              пользователям!
            </p>
          )}

          <h1 className="comments-title">
            Комментарии других покупателей ({commentsList.length}):
          </h1>
          <ul className="comments-list">
            {commentsList.map((comment) => (
              <Comment key={comment._id} comment={comment} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CommentsList;
