import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mockAuth, mockSocialLogin, mockUsers } from '../mockAuth';

describe('mockAuth', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('login', () => {
    it('should successfully login with valid credentials', async () => {
      const user = await mockAuth.login('demo@neolingo.com', 'demo123');

      expect(user).toBeTruthy();
      expect(user?.email).toBe('demo@neolingo.com');
      expect(user?.name).toBe('Demo User');
    });

    it('should return null for invalid credentials', async () => {
      const user = await mockAuth.login('wrong@email.com', 'wrongpassword');

      expect(user).toBeNull();
    });

    it('should store user in localStorage on successful login', async () => {
      const user = await mockAuth.login('demo@neolingo.com', 'demo123');

      const stored = localStorage.getItem('mockUser');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toEqual(user);
    });

    it('should match password case-sensitively', async () => {
      const user = await mockAuth.login('demo@neolingo.com', 'DEMO123');

      expect(user).toBeNull();
    });
  });

  describe('signup', () => {
    it('should create a new user with provided details', async () => {
      const user = await mockAuth.signup(
        'newuser@test.com',
        'password123',
        'New User'
      );

      expect(user).toBeTruthy();
      expect(user.email).toBe('newuser@test.com');
      expect(user.name).toBe('New User');
      expect(user.id).toBeTruthy();
    });

    it('should derive name from email if not provided', async () => {
      const user = await mockAuth.signup('test@example.com', 'password123');

      expect(user.name).toBe('test');
    });

    it('should store user in localStorage after signup', async () => {
      const user = await mockAuth.signup('newuser@test.com', 'password123');

      const stored = localStorage.getItem('mockUser');
      expect(stored).toBeTruthy();
      expect(JSON.parse(stored!)).toEqual(user);
    });

    it('should add user to mockUsers array', async () => {
      const initialLength = mockUsers.length;
      await mockAuth.signup('newuser@test.com', 'password123');

      expect(mockUsers.length).toBe(initialLength + 1);
    });
  });

  describe('getCurrentUser', () => {
    it('should return stored user from localStorage', async () => {
      await mockAuth.login('demo@neolingo.com', 'demo123');

      const currentUser = mockAuth.getCurrentUser();
      expect(currentUser).toBeTruthy();
      expect(currentUser?.email).toBe('demo@neolingo.com');
    });

    it('should return null if no user is stored', () => {
      const currentUser = mockAuth.getCurrentUser();

      expect(currentUser).toBeNull();
    });
  });

  describe('logout', () => {
    it('should remove user from localStorage', async () => {
      await mockAuth.login('demo@neolingo.com', 'demo123');
      expect(localStorage.getItem('mockUser')).toBeTruthy();

      mockAuth.logout();

      expect(localStorage.getItem('mockUser')).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when user is logged in', async () => {
      await mockAuth.login('demo@neolingo.com', 'demo123');

      expect(mockAuth.isAuthenticated()).toBe(true);
    });

    it('should return false when no user is logged in', () => {
      expect(mockAuth.isAuthenticated()).toBe(false);
    });

    it('should return false after logout', async () => {
      await mockAuth.login('demo@neolingo.com', 'demo123');
      mockAuth.logout();

      expect(mockAuth.isAuthenticated()).toBe(false);
    });
  });
});

describe('mockSocialLogin', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe('google', () => {
    it('should create a Google user', async () => {
      const user = await mockSocialLogin.google();

      expect(user).toBeTruthy();
      expect(user.email).toBe('user@gmail.com');
      expect(user.name).toBe('Google User');
      expect(user.id).toContain('google_');
    });

    it('should store user in localStorage', async () => {
      await mockSocialLogin.google();

      const stored = localStorage.getItem('mockUser');
      expect(stored).toBeTruthy();
    });
  });

  describe('apple', () => {
    it('should create an Apple user', async () => {
      const user = await mockSocialLogin.apple();

      expect(user).toBeTruthy();
      expect(user.email).toBe('user@icloud.com');
      expect(user.name).toBe('Apple User');
      expect(user.id).toContain('apple_');
    });

    it('should store user in localStorage', async () => {
      await mockSocialLogin.apple();

      const stored = localStorage.getItem('mockUser');
      expect(stored).toBeTruthy();
    });
  });
});
