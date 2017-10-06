import Rebase from 're-base';
import firebase from 'firebase';

const app = firebase.initializeApp({
    apiKey: "AIzaSyBs107JvAHiG1SG_iHL3ZMRIHFls71EMqY",
    authDomain: "noughts-n-crosses-8464a.firebaseapp.com",
    databaseURL: "https://noughts-n-crosses-8464a.firebaseio.com",});

const rebase = Rebase.createClass(app.database());

export default rebase;

