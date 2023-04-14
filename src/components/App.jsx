import { Component } from 'react';
import shortid from 'shortid';
import ContactForm from './ContactForm';
import ContactList from './ContactList/ContactList';
import Filter from './Filter';
import style from './App.module.css';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  //   contacts: [],
  //   name: '',
  // };

  // addContact = ({ name, number }) => {
  //   let isAdded = false;
  //   this.state.contacts.forEach(el => {
  //     if (el.name === name) {
  //       alert(`${name} is already in contacts`);
  //       isAdded = true;
  //     }
  //   });
  //   if (isAdded) {
  //     return;
  //   }
  //   const contact = {
  //     id: nanoid(),
  //     name: name,
  //     number: number,
  //   };
  //   this.setState(({ contacts }) => ({
  //     contacts: [contact, ...contacts],
  //   }));
  };

    // addTodo = ({ name, number }) => {
    addContact = ({ name, number }) => {
    const normalizedName = name.toLowerCase();
    let isAdded = false;
    this.state.contacts.forEach(el => {
      if (el.name.toLowerCase() === normalizedName) {
        alert(`${name} is already in contacts`);
        isAdded = true;
      }
    });
    if (isAdded) {
      return;
    }
    const contact = {
      id: shortid.generate(),
      name: name,
      number: number,
    };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, contact],
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = todoId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== todoId),
    }));
  };

  render() {
    // const { contacts } = this.state;
    const { contacts, filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          fontSize: 18,
          textTransform: 'uppercase',
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        {/* <ContactForm onSubmit={this.addContact} /> */}
        {/* <ContactForm onSubmit={this.addTodo} /> */}
        <ContactForm onSubmit={this.addContact} />
        <h2 className={style.titleContacts}>Contacts</h2>
        <div className={style.allContacts}>All contacts: {contacts.length}</div>
        {/* <ContactList contacts={contacts} onDeleteContact={this.deleteContact} /> */}
        <Filter value={filter} onChange={this.changeFilter} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;