import { Role } from "@/app/types/auth";

// Define route access configuration
export interface RouteConfig {
  path: string;
  isPublic: boolean;
  requiredRoles?: Role[];
  description?: string;
}

// Public routes that don't require authentication
export const PUBLIC_ROUTES: string[] = [
  "/",
  "/page/sign_in",
  "/page/sign_up",
  "/page/forgot_password",
  "/page/oauth2/callback",
];

// Route configurations with role requirements
export const ROUTE_CONFIGS: Record<string, RouteConfig> = {
  // Landing page - public
  "/": {
    path: "/",
    isPublic: true,
    description: "Landing page",
  },

  // Auth pages - public
  "/page/sign_in": {
    path: "/page/sign_in",
    isPublic: true,
    description: "Sign in",
  },
  "/page/sign_up": {
    path: "/page/sign_up",
    isPublic: true,
    description: "Sign up",
  },
  "/page/forgot_password": {
    path: "/page/forgot_password",
    isPublic: true,
    description: "Forgot password",
  },
  "/page/type_role": {
    path: "/page/type_role",
    isPublic: false,
    description: "Role selection (requires authentication)",
  },

  // Admin routes
  "/page/admin": {
    path: "/page/admin",
    isPublic: false,
    requiredRoles: [Role.ADMIN],
    description: "Admin area",
  },

  // Client routes
  "/page/client": {
    path: "/page/client",
    isPublic: false,
    requiredRoles: [Role.CLIENT],
    description: "Client area",
  },

  // Freelancer routes
  "/page/freelancer": {
    path: "/page/freelancer",
    isPublic: false,
    requiredRoles: [Role.FREELANCER],
    description: "Freelancer area",
  },

  // Seller routes
  "/page/seller": {
    path: "/page/seller",
    isPublic: false,
    requiredRoles: [Role.SELLER],
    description: "Seller area",
  },
};

/**
 * Check if a path is public (doesn't require authentication)
 */
export const isPublicRoute = (pathname: string): boolean => {
  // Normalize pathname (remove trailing slash for comparison)
  const normalizedPath =
    pathname.endsWith("/") && pathname !== "/"
      ? pathname.slice(0, -1)
      : pathname;

  // Exact match in public routes
  if (PUBLIC_ROUTES.includes(normalizedPath)) {
    return true;
  }

  // Check if pathname starts with any public route followed by a slash
  // This prevents false matches like /page/sign_in_test matching /page/sign_in
  return PUBLIC_ROUTES.some((route) => {
    if (route === "/") return normalizedPath === "/";
    return normalizedPath === route || normalizedPath.startsWith(route + "/");
  });
};

/**
 * Get required roles for a given path
 */
export const getRequiredRoles = (pathname: string): Role[] | undefined => {
  // Check exact match first
  const exactMatch = ROUTE_CONFIGS[pathname];
  if (exactMatch) {
    return exactMatch.requiredRoles;
  }

  // Check for parent routes
  const pathSegments = pathname.split("/").filter(Boolean);
  for (let i = pathSegments.length; i > 0; i--) {
    const parentPath = "/" + pathSegments.slice(0, i).join("/");
    const config = ROUTE_CONFIGS[parentPath];
    if (config?.requiredRoles) {
      return config.requiredRoles;
    }
  }

  return undefined;
};

/**
 * Determine the appropriate redirect based on user role
 */
export const getDefaultRouteForRole = (role?: Role): string => {
  switch (role) {
    case Role.ADMIN:
      return "/page/admin/dashboard";
    case Role.CLIENT:
      return "/page/client/home";
    case Role.FREELANCER:
      return "/page/freelancer/projects";
    case Role.SELLER:
      return "/page/seller/home";
    default:
      return "/page/type_role";
  }
};
