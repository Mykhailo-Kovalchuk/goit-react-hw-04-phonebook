import css from './contactList.module.css';

const ContactList = ({ contactsArray, contactBtnDeleter }) => {
  const renderedArray = contactsArray.map(friend => {
    return (
      <li key={friend.id} className={css.contactListItem}>
        <p className={css.contactListText}>
          {friend.name}: {friend.number}
        </p>
        <button
          type="button"
          onClick={() => contactBtnDeleter(friend.id)}
          className={css.contactListBtnDelete}
        >
          Delete contact
        </button>
      </li>
    );
  });

  return <ul className={css.contactList}>{renderedArray}</ul>;
};

export { ContactList };
