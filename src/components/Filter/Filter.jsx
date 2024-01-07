import css from './filter.module.css';
import { Component } from 'react';

class Filter extends Component {
  handleChangeListener = event => {
    const filterValue = event.currentTarget.value;
    // console.log(filterValue)

    this.props.handlerChangeFilter(filterValue.trim().toLowerCase()); //передаємо через пропс результат введення користувачем.
  };

  render() {
    return (
      <>
        <p className={css.filterText}>Find contact by name</p>
        <input
          className={css.filterInput}
          type="text"
          name="filter"
          onChange={this.handleChangeListener}
        />
      </>
    );
  }
}

export { Filter };
