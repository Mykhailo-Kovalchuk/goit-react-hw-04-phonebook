import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

//////////////// Робота з локальним сховищем ( ДЛЯ ТРЕТЬОГО ДЗ)

// Функція перевірки локального сховища 
localStorageCheck () { 
  const savedContacts = localStorage.getItem('contacts');
  // console.log(savedContacts)
  return JSON.parse(savedContacts) || null;
}



// Функція додавання до локального сховища контакт (оновлення)
localStorageAdd (contactsArray) {
  // const newContactsList = [...contactsArray, newContact]
  localStorage.setItem('contacts', JSON.stringify(contactsArray))

}


/////////////////// ЖИТТЄВИЙ ЦИКЛ ///////////////////

componentDidMount() { // одноразка
// console.log(this.localStorageCheck());
const savedLSContacts =  this.localStorageCheck();

if (savedLSContacts === null) {
  return 
} else { 
     this.setState({contacts: savedLSContacts})
}
}


componentDidUpdate (prevProps, prevState) { // оновлення локального сховища при оновленні копоненту. Якщо даних немає тоді видаляю ключ із локального сховища.
  
    if (prevState.length !== this.state.contacts.length) { 
      this.localStorageAdd(this.state.contacts); 
    }
 

  if (this.state.contacts.length < 1){
    localStorage.removeItem('contacts')
  }
}





  //Функція для отрмання даних при додаванні нового контакту (ф-цію передаємо як пропс в ContactForm, a з потім з пропсу в локальному компоненті через колбек витягуємо дані назад )
  handlerAddContact = formData => {
    // console.log(formData);
    if (this.state.contacts.some(contact => contact.name.trim().toLowerCase() === formData.name.trim().toLowerCase())) {
      alert(`${formData.name} is already in your contacts`);
    } else {
      this.setState(prevState => {
        return { contacts: [...prevState.contacts, formData] };
      });
    }
  };

  // Функція фільтрації
  handlerChangeFilter = filterValue => {
    this.setState({ filter: filterValue });
    // console.log(this.state)
  };

  //Функція видалення кнопки
  contactBtnDeleter = id => {
    console.log(id);

    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
    // return deleteArrayItem.filter(contact => contact.id !== this.state.contacts.id)
  };

  render() {
    const filteredContact = this.state.contacts.filter(contact =>
      contact.name.trim().toLowerCase().includes(this.state.filter)
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
        <ContactForm handlerAddContact={this.handlerAddContact} />

        <h2>Contacts</h2>
        <Filter
          contactsArray={this.state.contacts}
          handlerChangeFilter={this.handlerChangeFilter}
        />
        <ContactList
          contactsArray={filteredContact}
          contactBtnDeleter={this.contactBtnDeleter}
        />
      </div>
    );
  }
}
