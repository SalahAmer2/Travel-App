//below shows what you should do
//wrap the function like or similar to eg.handleSubmit inside an init function that contains everything, contains the addEventListener
//import init method from app.js file
import { init } from './js/app'
import { deleteTrip } from './js/app'
// Your styles imports will go here
import './styles/styles.scss';
// Need this to get async/await working with babel translation
import 'regenerator-runtime/runtime';
// Call init on DOMContentLoaded event.
window.addEventListener('DOMContentLoaded', init);//Note: here you're adding the DOMContentLoaded event that's the reason your using addEventListener here

export { init, deleteTrip };