require('../css/app.css');
import { randomUserMock, additionalUsers } from "./data.js";


const modal = document.getElementById('modal');
const openModalBtn = document.getElementById('add-teacher');
const closeModalBtn = document.querySelector('.close-btn');
const teacherModal = document.getElementById('teacherModal');
const closeTeacherModalBtn = document.querySelector('.close-btn-teacherModal');
openModalBtn.addEventListener('click', openAddTeacherModal);
closeModalBtn.addEventListener('click', closeAddTeacherModal);
closeTeacherModalBtn.addEventListener('click', closeTeacherInfoModal);


const regionFilter = document.querySelector('#country-filter');
const ageFilter = document.querySelector('#age-filter');
const genderFilter = document.querySelector('#gender-filter');
const photoOnlyFilter = document.querySelector('#photo-only');
const favoriteOnlyFilter = document.querySelector('#favorite-only');
regionFilter.addEventListener('change', applyFilters);
ageFilter.addEventListener('change', applyFilters);
genderFilter.addEventListener('change', applyFilters);
photoOnlyFilter.addEventListener('change', applyFilters);
favoriteOnlyFilter.addEventListener('change', applyFilters);


const container = document.querySelector('.top-teachers');
const favoritesContainer = document.querySelector('.scroll-items');
const leftScrollBtn = document.querySelector('.scroll-btn img[src="./images/left-scroll.png"]');
const rightScrollBtn = document.querySelector('.scroll-btn img[src="./images/right-scroll.png"]');


const courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];
const continents = {
    Europe: ['Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'United Kingdom'],
    Asia: ['Afghanistan', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Cyprus', 'Georgia', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North Korea', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Syria', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam'],
    Australia: ['Australia', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Vanuatu'],
    Africa: ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cabo Verde', 'Cameroon', 'Central African Republic', 'Chad', 'Comoros', 'Congo, Democratic Republic of the', 'Congo, Republic of the', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'Sao Tome and Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'],
    'North America': ['Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Panama', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent and the Grenadines', 'United States'],
    'South America': ['Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela']
};
const combinedUsers = [...randomUserMock, ...additionalUsers].reduce((acc, current) => {
    const isDuplicate = acc.some(user => user.email === current.email && user.full_name == current.full_name && user.gender == current.gender && user.phone == current.phone);
    if (!isDuplicate) {
        acc.push(current);
    }
    return acc;
}, []);
let teachersList = formatUsers(combinedUsers);
let filteredTeachersList = formatUsers(combinedUsers);
let sortedTeachersList = formatUsers(combinedUsers);
let favoritesList = teachersList.filter(teacher => teacher.favorite === true);
const rowsPerPage = 10;
let currentPage = 1;


function renderTeachers(teachers) {
    container.innerHTML = '';
    teachers.forEach((teacher, index) => {
        const initials = `${teacher.full_name.split(' ')[0][0]}${teacher.full_name.split(' ')[1][0]}`;
        const teacherCard = `
        <div class="teacher-card ${teacher.favorite ? 'favorite' : ''}" data-index="${index}">
            ${teacher.favorite ? "<img class='star-icon' src='images/star.png'/>" : ''}
            ${teacher.picture_thumbnail || teacher.picture_large ?
                `<img class="teacher-card-photo" src="${teacher.picture_thumbnail || teacher.picture_large}" alt="Teacher">`
                : `<div class="teacher-card-photo initials">${initials}</div>`}
            <h3>${teacher.full_name}</h3>
            <p class="discipline-label">${teacher.course ? teacher.course : '-'}</p>
            <p class="country-label">${teacher.country ? teacher.country : '-'}</p>
        </div>`;
        container.innerHTML += teacherCard;

    });
    updateCardsListeners();
}

renderTeachers(teachersList);

function renderFavorites() {
    favoritesContainer.innerHTML = '';
    favoritesList.forEach((teacher, index) => {
        const initials = `${teacher.full_name.split(' ')[0][0]}${teacher.full_name.split(' ')[1][0]}`;
        const teacherCard = `
        <div class="teacher-card ${teacher.favorite ? 'favorite' : ''}" data-index="${index}">
            ${teacher.picture_thumbnail || teacher.picture_large ?
                `<img class="teacher-card-photo" src="${teacher.picture_thumbnail || teacher.picture_large}" alt="Teacher">`
                : `<div class="teacher-card-photo initials">${initials}</div>`}
            <h3>${teacher.full_name}</h3>
            <p class="discipline-label">${teacher.course ? teacher.course : '-'}</p>
            <p class="country-label">${teacher.country ? teacher.country : '-'}</p>
        </div>`;
        favoritesContainer.innerHTML += teacherCard;
    });
    updateCardsListeners();
}
renderFavorites();


function applyFilters() {
    const filters = {
        continent: regionFilter.value !== 'Not Selected' ? regionFilter.value : null,
        age: ageFilter.value !== 'Not Selected' ? ageFilter.value : null,
        gender: genderFilter.value !== 'Not Selected' ? genderFilter.value.toLowerCase() : null,
        favorite: favoriteOnlyFilter.checked,
        photo: photoOnlyFilter.checked
    }
    filteredTeachersList = filterUsers(teachersList, filters);
    renderTeachers(filteredTeachersList);
}


document.querySelectorAll('.statistics th').forEach(header => {
    header.addEventListener('click', () => {
        const sortBy = header.getAttribute('id');
        sortedTeachersList = sortUsers(teachersList, sortBy);
        renderStatistics(currentPage);
    });
});


function renderStatistics(page) {
    const tbody = document.querySelector('.statistics tbody');
    tbody.innerHTML = '';

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageItems = sortedTeachersList.slice(start, end);

    pageItems.forEach(teacher => {
        const row = `
        <tr>
          <td>${teacher.full_name ? teacher.full_name : '-'}</td>
          <td>${teacher.course ? teacher.course : '-'}</td>
          <td>${teacher.age ? teacher.age : '-'}</td>
          <td>${teacher.gender ? teacher.gender : '-'}</td>
          <td>${teacher.country ? teacher.country : '-'}</td>
        </tr>`;
        tbody.innerHTML += row;
    });
}

function setupPagination() {
    const pagination = document.querySelector('.pagination');
    pagination.innerHTML = '';

    const totalPages = Math.ceil(sortedTeachersList.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const pageLink = document.createElement('a');
        pageLink.textContent = i;
        if (i === currentPage) {
            pageLink.classList.add('active');
        }
        pageLink.addEventListener('click', () => {
            currentPage = i;
            renderStatistics(currentPage);
            updatePagination();
        });
        pagination.appendChild(pageLink);
    }

    const lastPageLink = document.createElement('a');
    lastPageLink.textContent = 'Last';
    lastPageLink.addEventListener('click', () => {
        currentPage = totalPages;
        renderStatistics(currentPage);
        updatePagination();
    });
    pagination.appendChild(lastPageLink);
}


function updatePagination() {
    const paginationLinks = document.querySelectorAll('.pagination a');
    paginationLinks.forEach(link => link.classList.remove('active'));
    paginationLinks[currentPage - 1].classList.add('active');
}

renderStatistics(currentPage);
setupPagination();



document.querySelector('#search-btn').addEventListener('click', () => {
    const searchTerm = document.querySelector('#search-input').value.toLowerCase();
    filteredTeachersList = teachersList.filter(user =>
        user.full_name.toLowerCase().includes(searchTerm) ||
        (user.note && user.note.toLowerCase().includes(searchTerm)) ||
        String(user.age).includes(searchTerm) ||
        user.course.toLowerCase().includes(searchTerm)
    );
    renderTeachers(filteredTeachersList);
});


document.querySelector('.submit-btn').addEventListener('click', (e) => {
    e.preventDefault();

    const newUser = {
        full_name: document.querySelector('#name').value,
        course: document.querySelector('#speciality').value,
        country: document.querySelector('#country-modal').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value,
        phone: document.querySelector('#phone').value,
        gender: document.querySelector('input[name="sex"]:checked').value,
        b_date: document.querySelector('#dob').value,
        note: document.querySelector('#notes').value,
        favorite: false,
        bg_color: document.querySelector('#bgcolor').value,
    };

    const validation = validateUser(newUser);
    if (validation.valid) {
        teachersList.push(newUser);
        sortedTeachersList.push(newUser);
        renderTeachers(teachersList);
        renderStatistics(currentPage);
        setupPagination();
        closeAddTeacherModal();
    } else {
        alert('Errors: ' + validation.errors.join(', '));
    }
});

leftScrollBtn.addEventListener('click', () => {
    favoritesContainer.scrollBy({
        top: 0,
        left: -300,
        behavior: 'smooth'
    });
});

rightScrollBtn.addEventListener('click', () => {
    favoritesContainer.scrollBy({
        top: 0,
        left: 300,
        behavior: 'smooth'
    });
});

function closeAddTeacherModal() {
    modal.style.display = 'none';
}

function openAddTeacherModal() {
    modal.style.display = 'flex';
}

function closeTeacherInfoModal() {
    teacherModal.style.display = 'none';
}


function openTeacherInfoModal(teacher) {
    const teacherModal = document.getElementById('teacherModal');
    const teacherPhoto = teacherModal.querySelector('.teacher-photo');
    const teacherName = teacherModal.querySelector('.teacher-details h2');
    const teacherSpeciality = teacherModal.querySelector('.teacher-details .speciality');
    const teacherLocation = teacherModal.querySelector('.teacher-details p:nth-child(3)');
    const teacherAgeGender = teacherModal.querySelector('.teacher-details p:nth-child(4)');
    const teacherEmail = teacherModal.querySelector('.teacher-details a');
    const teacherPhone = teacherModal.querySelector('.teacher-details p:nth-child(6)');
    const teacherDescription = teacherModal.querySelector('.teacher-description');
    let addToFavoriteBtn = document.querySelector('.modal-title img');

    let isFavorite = favoritesList.some(favTeacher => favTeacher.id === teacher.id);

    teacherPhoto.src = teacher.picture_large || "images/no-teacher-photo.png";
    teacherName.textContent = teacher.full_name;
    teacherSpeciality.textContent = teacher.course || 'Unknown';
    teacherLocation.textContent = `${teacher.city}, ${teacher.country}`;
    teacherAgeGender.textContent = `${teacher.age}, ${teacher.gender.charAt(0).toUpperCase() + teacher.gender.slice(1)}`;
    teacherEmail.textContent = teacher.email;
    teacherEmail.href = `mailto:${teacher.email}`;
    teacherPhone.textContent = teacher.phone;
    teacherDescription.textContent = teacher.note || 'No additional information';

    addToFavoriteBtn.src = isFavorite ? 'images/star.png' : 'images/star-default.png';
    addToFavoriteBtn.onclick = () => {
        if (isFavorite) {
            favoritesList = favoritesList.filter(favTeacher => favTeacher.id !== teacher.id);
            addToFavoriteBtn.src = 'images/star-default.png';
        } else {
            favoritesList.push(teacher);
            addToFavoriteBtn.src = 'images/star.png';
        }
        isFavorite = !isFavorite;
        renderFavorites();
        const teacherIndex = teachersList.findIndex(x => x.id === teacher.id);
        if (teacherIndex !== -1) {
            teachersList[teacherIndex].favorite = isFavorite;
        }
        renderTeachers(teachersList);
    };

    teacherModal.style.display = 'flex';
}


function updateCardsListeners() {
    const teachersCards = document.querySelectorAll('.teacher-card');
    teachersCards.forEach(card => {
        const index = card.getAttribute('data-index');
        const isFavorite = card.closest('.scroll-items') ? true : false;
        card.addEventListener('click', () => {
            if (isFavorite) {
                openTeacherInfoModal(favoritesList[index]);
            } else {
                openTeacherInfoModal(filteredTeachersList[index]);
            }
        });
    });
}

function isWithinAgeRange(age, range) {
    const [min, max] = range.split('-').map(Number);
    return age >= min && age <= max;
}


// Methods from lab2
function formatUsers(users) {
    return users.map(user => {
        return {
            id: (user.id && user.id.name && user.id.value) ? `${user.id.name}${user.id.value}` : Math.random().toString(16).slice(2) || (user.id ? user.id : Math.random().toString(16).slice(2)),
            gender: user.gender || null,
            title: user.title || (user.name && user.name.title) || null,
            full_name: user.full_name || (user.name ? `${user.name.first} ${user.name.last}` : null),
            city: user.city || (user.location && user.location.city) || null,
            state: user.state || (user.location && user.location.state) || null,
            country: user.country || (user.location && user.location.country) || null,
            postcode: user.postcode || (user.location && user.location.postcode) || null,
            coordinates: user.coordinates || (user.location && user.location.coordinates) || null,
            timezone: user.timezone || (user.location && user.location.timezone) || null,
            email: user.email || null,
            b_date: user.b_day || (user.dob && user.dob.date) || null,
            age: user.age || (user.dob && user.dob.age) || null,
            phone: user.phone || user.cell || null,
            picture_large: user.picture_large || (user.picture && user.picture.large) || null,
            picture_thumbnail: user.picture_thumbnail || (user.picture && user.picture.thumbnail) || null,
            favorite: user.favorite || false,
            course: user.course || courses[Math.floor(Math.random() * courses.length)],
            bg_color: user.bg_color || '#' + (Math.random() * 0xFFFFFF << 0).toString(16),
            note: user.note || null
        };
    });
}

function validateUser(user) {
    const errors = [];
    if (typeof user.full_name !== 'string' || user.full_name.charAt(0) !== user.full_name.charAt(0).toUpperCase()) {
        errors.push("Invalid name format");
    }

    if (typeof user.gender !== 'string' || user.gender.charAt(0) !== user.gender.charAt(0).toUpperCase()) {
        errors.push("Invalid gender format");
    }

    if (typeof user.note !== 'string' || user.note.charAt(0) !== user.note.charAt(0).toUpperCase()) {
        errors.push("Invalid note format");
    }

    if (typeof user.city !== 'string' || user.city.charAt(0) !== user.city.charAt(0).toUpperCase()) {
        errors.push("Invalid city format");
    }

    if (typeof user.country !== 'string' || user.country.charAt(0) !== user.country.charAt(0).toUpperCase()) {
        errors.push("Invalid country format");
    }

    const phoneRegex = /^[\d\s+\-()]+$/;
    if (!phoneRegex.test(user.phone)) {
        errors.push('Invalid phone format');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
        errors.push('Invalid email format');
    }

    return errors.length ? { valid: false, errors } : { valid: true };
}

function filterUsers(users, filters) {
    return users.filter(user => {
        return (filters.continent ? continents[filters.continent].includes(user.country) : true) &&
            (filters.age ? isWithinAgeRange(user.age, filters.age) : true) &&
            (filters.gender ? user.gender && user.gender.toLowerCase() == filters.gender.toLowerCase() : true) &&
            (filters.favorite ? user.favorite && user.favorite == filters.favorite : true) &&
            (filters.photo ? user.picture_thumbnail != null && user.picture_large != null : true);
    });
}

function sortUsers(users, sortBy, order = 'asc') {
    const usersCopy = users.slice();
    return usersCopy.sort((a, b) => {
        let valueA = a[sortBy];
        let valueB = b[sortBy];

        if ((typeof valueA === 'number' || valueA instanceof Date) &&
            (typeof valueB === 'number' || valueB instanceof Date)) {

            return order === 'asc' ? valueA - valueB : valueB - valueA;
        }

        if (typeof valueA === 'string' && typeof valueB === 'string') {
            valueA = valueA.toLowerCase();
            valueB = valueB.toLowerCase();
            if (valueA < valueB) {
                return order === 'asc' ? -1 : 1;
            }
            if (valueA > valueB) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        }

        return 0;
    });
}

function findUser(users, key, value) {
    return users.find(user => user[key] === value);
}

function getPercentage(users, key, comparisonFunction) {
    const matchingObjects = users.filter(user => comparisonFunction(user[key]));
    const percentage = (matchingObjects.length / users.length) * 100;
    return percentage;
}

