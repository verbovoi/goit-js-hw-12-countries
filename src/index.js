//импорты
import './styles.css';
import './fetchCountries';
import { fetchCountry } from './fetchCountries';
import debounce from 'lodash.debounce';

//добавляем элементы ДОМ
const refs = {
  inputCountryEl: document.querySelector('#country-input')
}

//вешаем слушателя событий
refs.inputCountryEl.addEventListener('input', debounce(onSearchCountry, 500));

//функция поиска страны
function onSearchCountry(event) {
    const searchQuery = event.target.value;

  fetchCountry(searchQuery).
    then(e => console.log(e));


}





