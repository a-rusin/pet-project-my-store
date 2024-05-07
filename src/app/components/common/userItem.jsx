const UserItem = ({ user }) => {
  return (
    <>
      {user && (
        <div className="feedback-item-content">
          <p className="feedback-item-text">
            <strong>Имя: </strong>
            {user.name}
          </p>
          <p className="feedback-item-text">
            <strong>Email: </strong>
            {user.email}
          </p>
          <p className="feedback-item-text">
            <strong>Телефон: </strong>
            {user.phone}
          </p>
          <p className="feedback-item-text">
            <strong>Роли: </strong>
            {user.roles}
          </p>
        </div>
      )}
    </>
  );
};

export default UserItem;
