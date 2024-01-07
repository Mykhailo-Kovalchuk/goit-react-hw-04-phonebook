import { Component } from 'react';
import css from './contactForm.module.css';
import { nanoid } from 'nanoid';

class ContactForm extends Component {
  handleFromSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    // console.log(form.elements);
    const name = form.elements.name.value;
    const number = form.elements.number.value;
    const id = nanoid(5);

    const formData = {
      id,
      name,
      number,
    };

    this.props.handlerAddContact(formData);
    form.elements.name.value = '';
    form.elements.number.value = '';
  };

  render() {
    return (
      <form className={css.contactForm} onSubmit={this.handleFromSubmit}>
        <h4 className={css.formTitle}>Name</h4>
        <label className={css.formLabel}>
          <input
            className={css.contactFormInput}
            type="text"
            name="name"
            required
            placeholder="Write a name"
          />
        </label>

        <h4 className={css.formTitle}>Number</h4>
        <label className={css.formLabel}>
          <input
            className={css.contactFormInput}
            type="tel"
            name="number"
            required
            placeholder="Write a number"
            pattern="\d{3}-\d{2}-\d{2}"
            title="xxx-xx-xx"
          />
        </label>
        <button type="submit" className={css.formButton}>
          Add to contacts
        </button>
      </form>
    );
  }
}

export { ContactForm };
