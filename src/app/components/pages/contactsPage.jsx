import { useSelector } from "react-redux";
import { getContacts, getContactsLoadingStatus } from "../../store/contacts";
import Loader from "../common/loader";
import ContactsContainer from "../common/contactsContainer";

const ContactsPage = () => {
  const isLoading = useSelector(getContactsLoadingStatus());
  const contacts = useSelector(getContacts());

  return (
    <>
      <h1 className="page-title">Котакты для связи</h1>
      <div className="page-wrapper">{isLoading ? <Loader /> : <ContactsContainer data={contacts} />}</div>
    </>
  );
};

export default ContactsPage;
