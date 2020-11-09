//импорты
import './styles.css';
import '@pnotify/core/dist/BrightTheme.css';
import "@pnotify/core/dist/PNotify.css";
import './fetchCountries';
import { fetchCountry } from './fetchCountries';
import debounce from 'lodash.debounce';
import listMarkupTmp from './templates/list-markup.hbs';
import countryCardMarkup from './templates/country-card-markup.hbs';
import { error, notice } from '@pnotify/core';

//добавляем элементы ДОМ
const refs = {
  inputCountryEl: document.querySelector('#country-input'),
  containerEl: document.querySelector('.container')
}

//вешаем слушателя событий
refs.inputCountryEl.addEventListener('input', debounce(onSearchCountry, 500));

//функция поиска страны
function onSearchCountry(event) {
  resetContainer();

  const searchQuery = event.target.value;

  fetchCountry(searchQuery).
    then(renderCardMarkup).
    catch(onFetchError);

}


//Функция рендера разметки на странице
function renderCardMarkup(countries) {
  if (countries.length > 10) {
    notice({
      title: 'Too many matches found. Please enter a more specific query!',
      delay: 1000      
});
  }
  else if (countries.length > 1) {
      const markup = listMarkupTmp(countries);
      refs.containerEl.innerHTML = markup;
  }
  else if(countries.length === 1) {
    const markup = countryCardMarkup(...countries);
    refs.containerEl.innerHTML = markup;
  }
  else {
    error({
      title: "Sorry! We can't find this country. Please try again.. ",
      delay: 1000
});
  }
};

//Функция ошибки
function onFetchError(error) {
    // return console.error();
}

//Функция очистки разметки
function resetContainer() {
  refs.containerEl.innerHTML = '';
}



