// Example API service for gig operations with permission handling
import authService from "./authService";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://foundit-c7e7.onrender.com";

export interface Gig {
  id: string;
  title: string;
  description: string;
  price: number;
  [key: string]: unknown;
}

class GigService {
  /**
   * Fetch all gigs (requires READ_GIG permission)
   */
  async getGigs(): Promise<Gig[]> {
    const response = await fetch(`${API_BASE_URL}/gigs`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("You don't have permission to view gigs");
      }
      throw new Error("Failed to fetch gigs");
    }

    return response.json();
  }

  /**
   * Get a single gig by ID (requires READ_GIG permission)
   */
  async getGigById(id: string): Promise<Gig> {
    const response = await fetch(`${API_BASE_URL}/gigs/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error("You don't have permission to view this gig");
      }
      throw new Error("Failed to fetch gig");
    }

    return response.json();
  }

  /**
   * Create a new gig (requires CREATE_GIG permission - FREELANCER or SELLER only)
   */
  async createGig(gigData: Partial<Gig>): Promise<Gig> {
    const response = await fetch(`${API_BASE_URL}/gigs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(gigData),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "You don't have permission to create gigs. Switch to FREELANCER or SELLER role."
        );
      }
      throw new Error("Failed to create gig");
    }

    return response.json();
  }

  /**
   * Update an existing gig (requires UPDATE_GIG permission - FREELANCER or SELLER only)
   */
  async updateGig(id: string, gigData: Partial<Gig>): Promise<Gig> {
    const response = await fetch(`${API_BASE_URL}/gigs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
      body: JSON.stringify(gigData),
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "You don't have permission to update gigs. Switch to FREELANCER or SELLER role."
        );
      }
      throw new Error("Failed to update gig");
    }

    return response.json();
  }

  /**
   * Delete a gig (requires DELETE_GIG permission - FREELANCER or SELLER only)
   */
  async deleteGig(id: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/gigs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        ...authService.getAuthHeader(),
      },
    });

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          "You don't have permission to delete gigs. Switch to FREELANCER or SELLER role."
        );
      }
      throw new Error("Failed to delete gig");
    }
  }
}

export const gigService = new GigService();
export default gigService;
