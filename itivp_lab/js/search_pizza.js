const searchInput= document.getElementById('search-input');
const searchButton= document.getElementById('search-button');
const blocks = Array.from(document.querySelectorAll('.block'));
const clearButton = document.getElementById('clear-button');

searchButton.addEventListener('click', ()=>{
    const filter = searchInput.value.toLowerCase();

    blocks.forEach(block => {
        const title = block.querySelector('.textic.textmain').textContent.toLowerCase();
        if(title.includes(filter)){
            block.style.display = '';
        } else {
            block.style.display= 'none';
        }
    });
});


clearButton.addEventListener('click', () => {
    searchInput.value = ''; // Очищаем поле ввода
    clearButton.style.display = 'none'; // Скрываем крестик
    blocks.forEach(block => {
        block.style.display = ''; // Показываем все блоки
    });
});

// Показываем крестик, когда поле ввода не пустое
searchInput.addEventListener('input', () => {
    if (searchInput.value) {
        clearButton.style.display = 'block';
    } else {
        clearButton.style.display = 'none';
    }
});
