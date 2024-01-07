import { useState, useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export const App = () => {
  // state = {
  //   contacts: [],
  //   filter: '',
  // };

////// Хук створення стану - useState
const [contacts, setContacts] = useState([]);
const [filter, setFilter] = useState('');

//////////////// Робота з локальним сховищем ( ДЛЯ ТРЕТЬОГО ДЗ)

// Функція перевірки локального сховища 
const localStorageCheck = () => { 
  const savedContacts = localStorage.getItem('contacts');
  // console.log(savedContacts)
  return JSON.parse(savedContacts) || null;
}

// Функція додавання до локального сховища контакт (оновлення)
const localStorageAdd = (contactsArray) => {
  // const newContactsList = [...contactsArray, newContact]
  localStorage.setItem('contacts', JSON.stringify(contactsArray))
}

/////////////////// ЖИТТЄВИЙ ЦИКЛ ///////////////////
// Типу DidMount (одноразка)
useEffect(() => {
  const savedLSContacts = localStorageCheck();

  if (savedLSContacts === null) {
    return 
  } else { 
       setContacts(savedLSContacts);
  }
  
}, [])


// Типу DidUpdate
useEffect(() => {
      localStorageAdd(contacts); 
   
 
  if (contacts.length < 1){
    localStorage.removeItem('contacts')
  }

}, [contacts])


  //Функція для отрмання даних при додаванні нового контакту (ф-цію передаємо як пропс в ContactForm, a з потім з пропсу в локальному компоненті через колбек витягуємо дані назад )
  const handlerAddContact = (formData) => {
    // console.log(formData);
    if (contacts.some(contact => contact.name.trim().toLowerCase() === formData.name.trim().toLowerCase())) {
      alert(`${formData.name} is already in your contacts`);
    } else {
      setContacts([...contacts, formData]
      );
    }
  };

  // Функція фільтрації
  const handlerChangeFilter = (filterValue) => {
    setFilter(filterValue);

  };

  //Функція видалення кнопки
  const contactBtnDeleter = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  
    const filteredContact = contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(filter)
    );

    return (
      <div
        style={{
          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm handlerAddContact={handlerAddContact} />

        <h2>Contacts</h2>
        <Filter
          contactsArray={contacts}
          handlerChangeFilter={handlerChangeFilter}
        />
        <ContactList
          contactsArray={filteredContact}
          contactBtnDeleter={contactBtnDeleter}
        />
      </div>
    );
  
}
