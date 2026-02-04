import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../config/firebase';

const BABIES_COLLECTION = 'babies';

/**
 * Get all babies for a user
 */
export const getAllBabies = async (userId) => {
  const q = query(
    collection(db, BABIES_COLLECTION),
    where('userId', '==', userId)
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

/**
 * Get a single baby by ID
 */
export const getBabyById = async (babyId) => {
  const docRef = doc(db, BABIES_COLLECTION, babyId);
  const snapshot = await getDoc(docRef);
  if (!snapshot.exists()) return null;
  return { id: snapshot.id, ...snapshot.data() };
};

/**
 * Add a new baby
 */
export const addBaby = async (userId, babyData) => {
  const newBaby = {
    userId,
    name: babyData.name,
    dob: babyData.dob,
    gender: babyData.gender || '',
    bloodGroup: babyData.bloodGroup || '',
    photo: babyData.photo || '',
    vaccines: {},
    milestones: [],
    growthRecords: [],
    medicalRecords: babyData.medicalRecords || [],
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  };

  const docRef = await addDoc(collection(db, BABIES_COLLECTION), newBaby);
  return { id: docRef.id, ...newBaby };
};

/**
 * Update a baby
 */
export const updateBaby = async (babyId, updates) => {
  const docRef = doc(db, BABIES_COLLECTION, babyId);
  await updateDoc(docRef, {
    ...updates,
    updatedAt: serverTimestamp()
  });
  return getBabyById(babyId);
};

/**
 * Delete a baby
 */
export const deleteBaby = async (babyId) => {
  const docRef = doc(db, BABIES_COLLECTION, babyId);
  await deleteDoc(docRef);
};

/**
 * Toggle vaccine status
 */
export const toggleVaccine = async (babyId, vaccineKey) => {
  const baby = await getBabyById(babyId);
  if (!baby) return null;

  const vaccines = { ...baby.vaccines };
  vaccines[vaccineKey] = !vaccines[vaccineKey];

  return updateBaby(babyId, { vaccines });
};

/**
 * Add milestone
 */
export const addMilestone = async (babyId, milestone) => {
  const baby = await getBabyById(babyId);
  if (!baby) return null;

  const milestones = [...(baby.milestones || [])];
  milestones.push({
    id: Date.now().toString(),
    ...milestone,
    createdAt: new Date().toISOString()
  });

  return updateBaby(babyId, { milestones });
};

/**
 * Delete milestone
 */
export const deleteMilestone = async (babyId, milestoneId) => {
  const baby = await getBabyById(babyId);
  if (!baby) return null;

  const milestones = (baby.milestones || []).filter(m => m.id !== milestoneId);
  return updateBaby(babyId, { milestones });
};

/**
 * Add growth record
 */
export const addGrowthRecord = async (babyId, record) => {
  const baby = await getBabyById(babyId);
  if (!baby) return null;

  const growthRecords = [...(baby.growthRecords || [])];
  growthRecords.push({
    id: Date.now().toString(),
    ...record,
    createdAt: new Date().toISOString()
  });

  // Sort by date
  growthRecords.sort((a, b) => new Date(a.date) - new Date(b.date));

  return updateBaby(babyId, { growthRecords });
};

/**
 * Delete growth record
 */
export const deleteGrowthRecord = async (babyId, recordId) => {
  const baby = await getBabyById(babyId);
  if (!baby) return null;

  const growthRecords = (baby.growthRecords || []).filter(r => r.id !== recordId);
  return updateBaby(babyId, { growthRecords });
};

/**
 * Add medical record
 */
export const addMedicalRecord = async (babyId, record) => {
  const baby = await getBabyById(babyId);
  if (!baby) return null;

  const medicalRecords = [...(baby.medicalRecords || [])];
  medicalRecords.push({
    id: Date.now().toString(),
    ...record,
    uploadedAt: new Date().toISOString()
  });

  return updateBaby(babyId, { medicalRecords });
};

/**
 * Delete medical record
 */
export const deleteMedicalRecord = async (babyId, recordId) => {
  const baby = await getBabyById(babyId);
  if (!baby) return null;

  const medicalRecords = (baby.medicalRecords || []).filter(r => r.id !== recordId);
  return updateBaby(babyId, { medicalRecords });
};
