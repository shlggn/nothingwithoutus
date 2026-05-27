import { collection, addDoc, serverTimestamp, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { db } from "./firebase";

// Collection names
const COLLECTIONS = {
  RECOMMENDATIONS: "recommendations",
  SPONSORSHIPS: "sponsorships",
};

// Type definitions
export interface RecommendationData {
  nomineeName: string;
  nomineeEmail?: string;
  relationship: string;
  category: string;
  story: string;
  yourName: string;
  yourEmail: string;
  organization?: string;
  consent: boolean;
}

export interface SponsorshipData {
  organizationName: string;
  contactName: string;
  email: string;
  phone?: string;
  sponsorshipLevel: string;
  interests: string[];
  message?: string;
}

// Extended interfaces with Firebase metadata
export interface RecommendationDocument extends RecommendationData {
  id: string;
  submittedAt: Timestamp;
  status: string;
}

export interface SponsorshipDocument extends SponsorshipData {
  id: string;
  submittedAt: Timestamp;
  status: string;
}

/**
 * Fetch all recommendations from Firebase
 * @returns Promise with array of recommendation documents
 */
export const getAllRecommendations = async (): Promise<RecommendationDocument[]> => {
  try {
    console.log("Fetching all recommendations from Firebase...");
    
    const q = query(
      collection(db, COLLECTIONS.RECOMMENDATIONS),
      orderBy("submittedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const recommendations: RecommendationDocument[] = [];
    
    querySnapshot.forEach((doc) => {
      recommendations.push({
        id: doc.id,
        ...doc.data()
      } as RecommendationDocument);
    });
    
    console.log(`✅ Fetched ${recommendations.length} recommendations`);
    return recommendations;
  } catch (error) {
    console.error("❌ Error fetching recommendations:", error);
    throw new Error("Failed to fetch recommendations. Please try again.");
  }
};

/**
 * Fetch all sponsorship inquiries from Firebase
 * @returns Promise with array of sponsorship documents
 */
export const getAllSponsorships = async (): Promise<SponsorshipDocument[]> => {
  try {
    console.log("Fetching all sponsorship inquiries from Firebase...");
    
    const q = query(
      collection(db, COLLECTIONS.SPONSORSHIPS),
      orderBy("submittedAt", "desc")
    );
    
    const querySnapshot = await getDocs(q);
    const sponsorships: SponsorshipDocument[] = [];
    
    querySnapshot.forEach((doc) => {
      sponsorships.push({
        id: doc.id,
        ...doc.data()
      } as SponsorshipDocument);
    });
    
    console.log(`✅ Fetched ${sponsorships.length} sponsorship inquiries`);
    return sponsorships;
  } catch (error) {
    console.error("❌ Error fetching sponsorships:", error);
    throw new Error("Failed to fetch sponsorship inquiries. Please try again.");
  }
};

/**
 * Submit a recommendation form to Firebase
 * @param data - Recommendation form data
 * @returns Promise with the document ID
 */
export const submitRecommendation = async (
  data: RecommendationData
): Promise<string> => {
  try {
    console.log("Submitting recommendation to Firebase...", { nomineeName: data.nomineeName });
    
    const docRef = await addDoc(collection(db, COLLECTIONS.RECOMMENDATIONS), {
      ...data,
      submittedAt: serverTimestamp(),
      status: "pending", // pending, reviewed, contacted, published
    });
    
    console.log("✅ Recommendation submitted successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error submitting recommendation:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw new Error("Failed to submit recommendation. Please try again.");
  }
};

/**
 * Submit a sponsorship inquiry form to Firebase
 * @param data - Sponsorship form data
 * @returns Promise with the document ID
 */
export const submitSponsorship = async (
  data: SponsorshipData
): Promise<string> => {
  try {
    console.log("Submitting sponsorship inquiry to Firebase...", { organizationName: data.organizationName });
    
    const docRef = await addDoc(collection(db, COLLECTIONS.SPONSORSHIPS), {
      ...data,
      submittedAt: serverTimestamp(),
      status: "new", // new, contacted, in_discussion, closed
    });
    
    console.log("✅ Sponsorship inquiry submitted successfully with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("❌ Error submitting sponsorship:", error);
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
    }
    throw new Error("Failed to submit sponsorship inquiry. Please try again.");
  }
};
