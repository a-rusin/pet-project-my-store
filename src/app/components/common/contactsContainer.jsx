const ContactsContainer = ({ data }) => {
  return (
    <>
      <p className="contacts-content-text-item">
        <strong>Адрес магазина:</strong> {data ? data.location : "пока не задано"}
      </p>
      <p className="contacts-content-text-item">
        <strong>Номер телефона:</strong> {data ? data.phone : "пока не задано"}
      </p>
      <p className="contacts-content-text-item">
        <strong>Email:</strong> {data ? data.email : "пока не задано"}
      </p>
    </>
  );
};

export default ContactsContainer;
