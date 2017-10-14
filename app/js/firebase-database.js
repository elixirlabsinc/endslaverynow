import {config} from 'firebase-config';

firebase.initializeApp(config);

var database = firebase.database();

var productsRef = database.ref('products');
console.log(productsRef);
