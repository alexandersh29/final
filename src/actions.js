import { firebaseApp } from "./firebase";

import "firebase/firestore";


const db = firebaseApp.firestore(firebaseApp);

export const getCollection = async (collection) => {
  const result = { statusRespone: false, data: null, error: null };
  try {
    const data = await db.collection(collection).get();
    const arrayData = data.docs.map((doc) => ({ doc: doc.id, ...doc.data() }));
    console.log(arrayData);
    result.statusRespone = true;
    result.data = arrayData;

  } catch (error) {
    result.error = error;
  }
  return result;
};

export const addDocument = async (collection, data) => {
  const result = { statusRespone: false, data: null, error: null };
  try {
    const response = await db.collection(collection).add(data);
    result.data = { id: response.id };
    result.statusRespone = true;
  } catch (error) {
    result.error = error;
  }
  return result;
};


export const getDocument = async (collection, id) => {
  const result = { statusRespone: false, data: null, error: null };

  try {
    const response = await db.collection(collection).doc(id).get();
    result.data = { id: response.id, ...response.data() };
    result.statusRespone = true;
  } catch (error) {
    result.error = error;
  }
  return result;

};


export const updateDocument = async (collection, id, data) => {
  const result = { statusRespone: false,  error: null };

  try {
    const response = await db.collection(collection).doc(id).update(data);
    result.statusRespone = true;

  } catch (error) {
    result.error = error;
  }
  return result;

};


export const deleteDocument=async(collection, id)=>{
  const result={statusRespone:false, error:null };

  try {
    await db.collection(collection).doc(id).delete();
    result.statusRespone = true;

  } catch (error) {
    result.error = error;
  }
  return result;

};
