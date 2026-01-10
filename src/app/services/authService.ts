// API base URL - update this based on your backend configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8085";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface EmailLoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  role?: string;
  status?: string;
  accountNonExpired?: boolean;
  accountNonLocked?: boolean;
  credentialsNonExpired?: boolean;
  enabled?: boolean;
}

export interface AuthResponse {
  token?: string;
  user?: Record<string, unknown>;
  message?: string;
}

class AuthService {
  /**
   * Login with JWT
   */
  async loginWithJWT(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message || `Login failed with status ${response.status}`
        );
      }

      // Get JWT token from Authorization header
      const token = response.headers.get("Authorization");

      if (token) {
        // Store token in localStorage
        localStorage.setItem("token", token);

        // Try to get user data from response body if available
        const data = await response.json().catch(() => null);
        if (data) {
          localStorage.setItem("user", JSON.stringify(data));
        }

        return { token, message: "Login successful" };
      }

      return { message: "Login successful but no token received" };
    } catch (error: unknown) {
      console.error("JWT Login error:", error);
      throw error;
    }
  }

  /**
   * Login with Basic Auth (fallback)
   */
  async loginWithBasicAuth(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Basic auth login failed");
      }

      const data = await response.json();

      // Store credentials for basic auth (encoded for future requests)
      const basicAuth = btoa(`${credentials.username}:${credentials.password}`);
      localStorage.setItem("basicAuth", basicAuth);
      localStorage.setItem("user", JSON.stringify(data));

      return { user: data, message: "Login successful with basic auth" };
    } catch (error) {
      console.error("Basic Auth Login error:", error);
      throw error;
    }
  }

  /**
   * Initiate Google OAuth2 login
   */
  loginWithGoogle(): void {
    // Redirect to backend OAuth2 authorization endpoint
    window.location.href = `${API_BASE_URL}/oauth2/authorization/google`;
  }

  /**
   * Login with email directly (uses /api/login/email endpoint)
   */
  async loginWithEmail(credentials: EmailLoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/login/email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.message ||
            `Email login failed with status ${response.status}`
        );
      }

      const data = await response.json();

      // Store token if provided
      if (data.token) {
        this.setToken(data.token);
      }

      return { user: data, message: "Login successful with email" };
    } catch (error) {
      console.error("Email Login error:", error);
      throw error;
    }
  }

  /**
   * Unified login - tries JWT first, falls back to Basic Auth
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      // Try JWT login first
      return await this.loginWithJWT(credentials);
    } catch (jwtError) {
      console.warn("JWT login failed, trying basic auth...", jwtError);

      try {
        // Fallback to basic auth
        return await this.loginWithBasicAuth(credentials);
      } catch (basicError) {
        console.error("Both login methods failed:", basicError);
        throw new Error("Login failed. Please check your credentials.");
      }
    }
  }

  /**
   * Register a new user
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: userData.username,
          email: userData.email,
          password: userData.password,
          role: userData.role || "CLIENT",
          status: userData.status || "ACTIVE",
          accountNonExpired: userData.accountNonExpired !== false,
          accountNonLocked: userData.accountNonLocked !== false,
          credentialsNonExpired: userData.credentialsNonExpired !== false,
          enabled: userData.enabled !== false,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Registration failed");
      }

      const data = await response.json();
      return { user: data, message: "Registration successful" };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("basicAuth");
    localStorage.removeItem("user");
  }

  /**
   * Get stored token
   */
  getToken(): string | null {
    return localStorage.getItem("token");
  }

  /**
   * Set token in localStorage
   */
  setToken(token: string): void {
    localStorage.setItem("token", token);
  }

  /**
   * Get stored basic auth
   */
  getBasicAuth(): string | null {
    return localStorage.getItem("basicAuth");
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!(this.getToken() || this.getBasicAuth());
  }

  /**
   * Get authorization header for API calls
   */
  getAuthHeader(): Record<string, string> {
    const token = this.getToken();
    const basicAuth = this.getBasicAuth();

    if (token) {
      // Add "Bearer " prefix for JWT tokens
      return { Authorization: `Bearer ${token}` };
    } else if (basicAuth) {
      return { Authorization: `Basic ${basicAuth}` };
    }

    return {};
  }
}

export const authService = new AuthService();
export default authService;
