/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/


const itemsPerPage = 9;
/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
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


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
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


// Call functions
showPage(data, 1);
addPagination(data);