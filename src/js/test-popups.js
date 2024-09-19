import { randomUserMock, additionalUsers } from "./data.js"; 

/**TASK 1*/
const courses = ['Mathematics', 'Physics', 'English', 'Computer Science', 'Dancing', 'Chess', 'Biology', 'Chemistry', 'Law', 'Art', 'Medicine', 'Statistics'];

function formatUsers(users) {
  return users.map(user => {
    return {
      id: user.id?.name && user.id?.value ? `${user.id?.name}${user.id?.value}` : Math.random().toString(16).slice(2) || user.id ||  Math.random().toString(16).slice(2),
      gender: user.gender || null,
      title: user.title || user.name?.title || null,
      full_name: user.full_name || `${user.name?.first} ${user.name?.last}` || null,
      city: user.city || user.location?.city || null,
      state: user.state || user.location?.state || null,
      country: user.country || user.location?.country || null,
      postcode: user.postcode || user.location?.postcode || null,
      coordinates: user.coordinates || user.location?.coordinates || null,
      timezone: user.timezone || user.location?.timezone || null,
      email: user.email || null,
      b_date: user.b_day || user.dob?.date || null,
      age: user.age || user.dob?.age || null,
      phone: user.phone || user.cell || null,
      picture_large: user.picture_large || user.picture?.large || null,
      picture_thumbnail: user.picture_thumbnail || user.picture?.thumbnail || null,
      favorite: user.favorite || false,
      course: user.course || courses[Math.floor(Math.random() * courses.length)],
      bg_color: user.bg_color || '#'+(Math.random()*0xFFFFFF<<0).toString(16),
      note: user.note || null
    };
  });
}

const combinedUsers = [...randomUserMock, ...additionalUsers].reduce((acc, current) => {
  const isDuplicate = acc.some(user => user.email === current.email && user.full_name == current.full_name && user.gender == current.gender && user.phone == current.phone);
  if (!isDuplicate) {
    acc.push(current);
  }
  return acc;
}, []);

const usersList = formatUsers(combinedUsers);
console.log("________TASK 1____________")
console.log("Users formating")
console.log(usersList);



/**TASK 2 */

function validateUser(user){
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
    
    if (typeof user.state !== 'string' || user.state.charAt(0) !== user.state.charAt(0).toUpperCase()) {
        errors.push("Invalid state format");
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

    return errors.length ? {valid: false, errors} : {valid: true};
}
const validationResult = validateUser(usersList[46]);
console.log("________TASK 2____________")
console.log("User validation")
console.log(validationResult);



/**TASK 3 */

function filterUsers(users, filters){
    return users.filter(user => {
        return (filters.country ? user.country&& user.country.toLowerCase() == filters.country.toLowerCase() : true) &&
               (filters.age ? user.age && user.age == filters.age : true) &&
               (filters.gender ? user.gender && user.gender.toLowerCase() == filters.gender.toLowerCase() : true) &&
               (filters.favorite ? user.favorite && user.favorite == filters.favorite : true);
    });
}

const filters = {
    country: 'Denmark',
    age: 28,
    gender: 'male',
    favorite: false
};


const filteredResults = filterUsers(usersList, filters);
console.log("________TASK 3____________")
console.log("Users filtration")
console.log(filteredResults);



/**TASK 4 */

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

console.log("________TASK 4____________")

const sortedByAgeAsc = sortUsers(usersList, 'age', 'asc');
console.log('Users sorting by age ascending:', sortedByAgeAsc);
const sortedByFullNameDesc = sortUsers(usersList, 'full_name', 'desc'); 
console.log('Users sortig by name descending:', sortedByFullNameDesc);



/**TASK 5 */
function findUser(users, key, value) {
    return users.find(user => user[key] === value);
}

console.log("________TASK 5____________")
console.log("Find user")
const result = findUser(usersList, 'age', 28); 
console.log(result);


/**TASK 6 */
function getPercentage(users, key, comparisonFunction) {
    const matchingObjects = users.filter(user => comparisonFunction(user[key]));
    const percentage = (matchingObjects.length / users.length) * 100;
    return percentage;
}
const percentageAgeOver30 = getPercentage(usersList, 'age', age => age > 30);
console.log("________TASK 6__________")
console.log("Users search")
console.log(percentageAgeOver30); 