/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

//Establish Global Variables
const itemsPerPage = 9;


/**
 * `showPage` function
 * This function will create and insert/append the elements needed to display a "page" of nine students
 * @param {array} List The array of objects that will determine how many page button elements are created.
 * @param {number} Page The 'page' number of results to show.
 * Returns nothing.
 */
function showPage (list, page){
   const startIndex = (page * itemsPerPage) - itemsPerPage;
   const endIndex = page * itemsPerPage;

   const ul = document.querySelector('.student-list');
   ul.innerHTML = '';

   for (let i = 0; i < list.length; i++){
      const li = list[i]
      if (i >= startIndex && i < endIndex){
         let studentCard = `
          <li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src="${li.picture.thumbnail}" alt="Profile Picture">
               <h3>${li.name.first} ${li.name.last}</h3>
               <span class="email">${li.email}</span>
            </div>
            <div class="joined-details">
               <span class="date">${li.registered.date}</span>
            </div>
         </li>
         `;
         ul.insertAdjacentHTML('beforeend', studentCard);
      }
   }
}


/**
 * `addPagination` function
 * This function will create and insert/append the elements needed for the pagination buttons
 * @param {array} List The array of objects that will determine how many page button elements are created.
 * Returns nothing. 
 */
function addPagination(list){
   const numPages = Math.ceil(list.length / itemsPerPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';
   for (let i = 0; i < numPages; i++){
      let button = `
         <li>
            <button type="button">${i + 1}</button>
         </li>
      `;
      linkList.insertAdjacentHTML('beforeend', button);
   }
   const firstPage = document.querySelector('.link-list button');
   firstPage.className = 'active';
   linkList.addEventListener('click', (e) => {
      if(e.target.type === 'button'){
         const buttonNumber = e.target.textContent;
         let allButtons = document.querySelectorAll('.link-list button');
         for (let i = 0; i < allButtons.length; i++){
            allButtons[i].className = '';
         }
         e.target.className = 'active';
         showPage(data, parseInt(buttonNumber))
      }
   });
}


/**
 * `addSearch` function
 * This function will dynamically add the elements for the search bar in the heading
 * No parameters
 * Returns nothing. 
 */
function addSearch(){
   const header = document.querySelector('.header');
   const searchBar = `
      <label for="search" class="student-search">
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
   </label>
   `;
   header.insertAdjacentHTML('beforeend', searchBar);
};


/**
 * `search` function
 * This function is essentially the seach 'controller'
 * No parameters
 * Returns nothing. 
 */
function search(){
   const searchButton = document.querySelector('.header button');
   const searchField = document.querySelector('.header input');
   searchButton.addEventListener('click', () => {runSearch()});
   searchField.addEventListener('keyup', () => {runSearch()});
};


/**
 * `runSearch` function
 * This function is responsible for the actual filtering action of the student list items.
 * No parameters
 * Returns nothing. 
 */
function runSearch(){
   const names = document.querySelectorAll('.student-item')
   const searchQuery = document.querySelector('#search').value.toLowerCase();

   for (let i = 0; i < names.length; i++){
      names[i].style.display = 'block';
      if(!names[i].children[0].children[1].textContent.toLowerCase().includes(searchQuery)){
         names[i].style.display = 'none';
      }
   }
}


// Call functions
showPage(data, 1);
addPagination(data);
addSearch();
search();