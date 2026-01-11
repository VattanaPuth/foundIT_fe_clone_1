// API base URL - update this based on your backend configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8085";

export interface EkycRequest {
  fullname: string;
  dob: string; // YYYY-MM-DD format
  docType: "ID_CARD" | "PASSPORT" | "DRIVER_LICENSE";
  sex?: string;
  nationality?: string;
}

export interface EkycResponse {
  success: boolean;
  reason: string;
  fullname?: string;
  height?: string;
  gender?: string;
  dateOfBirth?: string;
  documentNumber?: string;
  createDate?: string;
  expirationDate?: string;
  address?: string;
  nationality?: string;
  docType?: string;
}

class EkycService {
  /**
   * Verify identity document with eKYC
   */
  async verifyDocument(
    file: File,
    metadata: EkycRequest,
    authHeader: Record<string, string>
  ): Promise<EkycResponse> {
    try {
      // Create FormData for multipart upload
      const formData = new FormData();
      formData.append("file", file);
      formData.append("metadata", JSON.stringify(metadata));

      const response = await fetch(`${API_BASE_URL}/ekyc/verify`, {
        method: "POST",
        headers: {
          ...authHeader,
          // Don't set Content-Type - browser will set it with boundary for multipart
        },
        body: formData,
      });

      if (!response.ok) {
        // Try to get error message from response
        const errorData = await response.json().catch(() => ({}));

        // Handle specific error cases with user-friendly messages
        if (response.status === 403) {
          throw new Error(
            errorData.message ||
              "API quota exceeded. Please contact support or try again later."
          );
        } else if (response.status === 401) {
          throw new Error(
            errorData.message || "Authentication failed. Please log in again."
          );
        } else if (response.status === 429) {
          throw new Error(
            errorData.message || "Rate limit exceeded. Please try again later."
          );
        } else {
          throw new Error(
            errorData.message ||
              `Verification failed with status ${response.status}`
          );
        }
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("eKYC Verification error:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("Verification failed. Please try again.");
    }
  }

  /**
   * Map UI document type to backend enum
   */
  mapDocumentType(
    uiType: "Passport" | "Driver's License" | "National ID"
  ): "ID_CARD" | "PASSPORT" | "DRIVER_LICENSE" {
    switch (uiType) {
      case "Passport":
        return "PASSPORT";
      case "Driver's License":
        return "DRIVER_LICENSE";
      case "National ID":
        return "ID_CARD";
    }
  }
}

export const ekycService = new EkycService();
export default ekycService;
