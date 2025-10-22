// Mock authentication data and utilities
export interface MockUser {
  id: string;
  email: string;
  password: string;
  name: string;
  avatar?: string;
}

// Sample mock users
export const mockUsers: MockUser[] = [
  {
    id: '1',
    email: 'demo@neolingo.com',
    password: 'demo123',
    name: 'Demo User',
    avatar: '👨‍🎓',
  },
  {
    id: '2',
    email: 'student@example.com',
    password: 'student123',
    name: 'Sarah Johnson',
    avatar: '👩‍💼',
  },
  {
    id: '3',
    email: 'learner@test.com',
    password: 'learner123',
    name: 'Michael Chen',
    avatar: '👨‍💻',
  },
];

// Helper function to check if we're in the browser
const isBrowser = typeof window !== 'undefined';

// Mock authentication functions
export const mockAuth = {
  // Simulate login
  login: async (email: string, password: string): Promise<MockUser | null> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const user = mockUsers.find(
      u => u.email === email && u.password === password
    );

    if (user) {
      // Store user in localStorage for persistence (only in browser)
      if (isBrowser) {
        localStorage.setItem('mockUser', JSON.stringify(user));
      }
      return user;
    }

    return null;
  },

  // Simulate signup
  signup: async (
    email: string,
    password: string,
    name?: string
  ): Promise<MockUser> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const newUser: MockUser = {
      id: Date.now().toString(),
      email,
      password,
      name: name || email.split('@')[0],
      avatar: '👤',
    };

    // Add to mock users (in real app, this would be server-side)
    mockUsers.push(newUser);

    // Store user in localStorage (only in browser)
    if (isBrowser) {
      localStorage.setItem('mockUser', JSON.stringify(newUser));
    }

    return newUser;
  },

  // Get current user
  getCurrentUser: (): MockUser | null => {
    if (!isBrowser) return null;
    const stored = localStorage.getItem('mockUser');
    return stored ? JSON.parse(stored) : null;
  },

  // Logout
  logout: () => {
    if (isBrowser) {
      localStorage.removeItem('mockUser');
    }
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    if (!isBrowser) return false;
    return !!localStorage.getItem('mockUser');
  },
};

// Mock social login
export const mockSocialLogin = {
  google: async (): Promise<MockUser> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const googleUser: MockUser = {
      id: 'google_' + Date.now(),
      email: 'user@gmail.com',
      password: '', // Social login doesn't need password
      name: 'Google User',
      avatar: '🔍',
    };

    if (isBrowser) {
      localStorage.setItem('mockUser', JSON.stringify(googleUser));
    }
    return googleUser;
  },

  apple: async (): Promise<MockUser> => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const appleUser: MockUser = {
      id: 'apple_' + Date.now(),
      email: 'user@icloud.com',
      password: '', // Social login doesn't need password
      name: 'Apple User',
      avatar: '🍎',
    };

    if (isBrowser) {
      localStorage.setItem('mockUser', JSON.stringify(appleUser));
    }
    return appleUser;
  },
};
