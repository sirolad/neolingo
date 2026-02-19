# RBAC Permission System - Developer Guide

## Overview

The Neolingo application uses a permission-based Role-Based Access Control (RBAC) system to manage user access to features and resources. This guide explains how to use the system effectively.

---

## Quick Start

### Client-Side Permission Checks

**Option 1: Using [useAuth](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/contexts/AuthContext.tsx#270-277) (Recommended)**

```tsx
import { useAuth } from '@/contexts/AuthContext';

function MyComponent() {
  const { can } = useAuth();

  return <div>{can('review:requests') && <ReviewButton />}</div>;
}
```

**Option 2: Using [usePermissions](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/hooks/usePermissions.ts#6-58) (More Features)**

```tsx
import { usePermissions } from '@/hooks/usePermissions';

function MyComponent() {
  const { can, hasRole, role } = usePermissions();

  return (
    <div>
      {can('create:requests') && <CreateButton />}
      {hasRole('ADMIN') && <AdminBadge />}
      <p>Your role: {role}</p>
    </div>
  );
}
```

**Option 3: Using Components (Declarative)**

```tsx
import { PermissionGate } from '@/components/auth/PermissionGate';

function MyComponent() {
  return (
    <PermissionGate permission="review:requests">
      <ReviewPanel />
    </PermissionGate>
  );
}
```

### Server-Side Authorization

```typescript
import { requirePermission, requireAuth } from '@/lib/auth/server-auth';

export async function myServerAction() {
  // Require specific permission
  const { user } = await requirePermission('review:requests');

  // Or just require authentication
  const { user } = await requireAuth();

  // Use user.id for database operations
  await prisma.myModel.create({
    data: { userId: user.id /* ... */ },
  });
}
```

---

## Permissions

### Available Permissions

| Permission         | Description                                    | Roles                     |
| ------------------ | ---------------------------------------------- | ------------------------- |
| `review:requests`  | Review and approve/reject translation requests | ADMIN, JUROR              |
| `manage:users`     | Manage user roles and permissions              | ADMIN                     |
| `create:requests`  | Create translation requests                    | ADMIN, JUROR, CONTRIBUTOR |
| `vote:suggestions` | Vote on translation suggestions                | ADMIN, JUROR, CONTRIBUTOR |
| `view:admin`       | Access admin pages                             | ADMIN, JUROR              |

### Role Hierarchy

```
ADMIN (5 permissions)
  └─ All permissions

JUROR (4 permissions)
  ├─ review:requests
  ├─ create:requests
  ├─ vote:suggestions
  └─ view:admin

CONTRIBUTOR (2 permissions)
  ├─ create:requests
  └─ vote:suggestions

EXPLORER (0 permissions)
  └─ Read-only access
```

---

## Client-Side Usage

### 1. useAuth Hook

**When to use**: Most common cases where you need permission checks.

**API**:

```typescript
const {
  can, // (permission: Permission) => boolean
  canAny, // (permissions: Permission[]) => boolean
  canAll, // (permissions: Permission[]) => boolean
} = useAuth();
```

**Examples**:

```tsx
// Single permission
if (can('review:requests')) {
  // Show review UI
}

// Multiple permissions (OR logic)
if (canAny(['review:requests', 'manage:users'])) {
  // Show admin actions
}

// Multiple permissions (AND logic)
if (canAll(['review:requests', 'manage:users'])) {
  // Show super admin panel
}
```

---

### 2. usePermissions Hook

**When to use**: When you need role checks in addition to permissions.

**API**:

```typescript
const {
  role, // Current user's role
  can, // Check single permission
  canAny, // Check any of multiple permissions
  canAll, // Check all of multiple permissions
  hasRole, // Check specific role
  hasAnyRole, // Check any of multiple roles
} = usePermissions();
```

**Examples**:

```tsx
const { can, hasRole, role } = usePermissions();

// Permission check
if (can('create:requests')) {
  // Allow creation
}

// Role check (use sparingly)
if (hasRole('ADMIN')) {
  // Admin-specific UI
}

// Display role
<Badge>{role}</Badge>;
```

---

### 3. PermissionGate Component

**When to use**: Declarative conditional rendering based on permissions.

**Props**:

```typescript
interface PermissionGateProps {
  permission?: Permission; // Single permission
  permissions?: Permission[]; // Multiple permissions
  requireAll?: boolean; // Require all permissions (default: false)
  children: React.ReactNode; // Content to show if authorized
  fallback?: React.ReactNode; // Content to show if not authorized
}
```

**Examples**:

```tsx
// Single permission
<PermissionGate permission="review:requests">
  <ReviewButton />
</PermissionGate>

// Multiple permissions (any)
<PermissionGate permissions={["review:requests", "manage:users"]}>
  <AdminActions />
</PermissionGate>

// Multiple permissions (all required)
<PermissionGate
  permissions={["review:requests", "manage:users"]}
  requireAll
>
  <SuperAdminPanel />
</PermissionGate>

// With fallback
<PermissionGate
  permission="create:requests"
  fallback={<UpgradePrompt />}
>
  <CreateRequestButton />
</PermissionGate>
```

---

### 4. RequirePermission Component

**When to use**: Route-level protection with optional redirect.

**Props**:

```typescript
interface RequirePermissionProps {
  permission: Permission;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}
```

**Examples**:

```tsx
// Basic usage
<RequirePermission permission="review:requests">
  <ReviewPanel />
</RequirePermission>

// With redirect
<RequirePermission
  permission="manage:users"
  redirectTo="/unauthorized"
>
  <AdminPanel />
</RequirePermission>

// With fallback
<RequirePermission
  permission="view:admin"
  fallback={<AccessDenied />}
>
  <AdminDashboard />
</RequirePermission>
```

---

## Server-Side Usage

### 1. requirePermission

**When to use**: Actions that require specific permissions.

```typescript
import { requirePermission } from '@/lib/auth/server-auth';
import { logAudit } from '@/lib/audit';

export async function reviewRequest(
  requestId: number,
  status: RequestStatus,
  reason?: string
) {
  // Verify user has permission
  const { user } = await requirePermission('review:requests');

  // Perform action
  await prisma.translationRequest.update({
    where: { id: requestId },
    data: {
      status,
      approvedById: user.id,
      rejectionReason: reason,
    },
  });

  // Log for audit trail
  await logAudit({
    userId: user.id,
    action: `review:request:${status.toLowerCase()}`,
    resourceId: requestId.toString(),
    metadata: { reason },
  });

  return { success: true };
}
```

---

### 2. requireAuth

**When to use**: Actions that just need authentication (no specific permission).

```typescript
import { requireAuth } from '@/lib/auth/server-auth';

export async function submitRequest(formData: FormData) {
  // Verify user is authenticated
  const { user } = await requireAuth();

  // Use server-verified user ID
  await prisma.translationRequest.create({
    data: {
      userId: user.id, // ✅ Server-verified
      // ... other fields
    },
  });

  return { success: true };
}
```

---

### 3. requireAnyPermission

**When to use**: Actions that accept multiple permissions (OR logic).

```typescript
import { requireAnyPermission } from '@/lib/auth/server-auth';

export async function moderateContent(contentId: string) {
  // User needs either permission
  const { user } = await requireAnyPermission([
    'review:requests',
    'manage:users',
  ]);

  // Perform moderation
  // ...
}
```

---

### 4. requireAllPermissions

**When to use**: Actions that require multiple permissions (AND logic).

```typescript
import { requireAllPermissions } from '@/lib/auth/server-auth';

export async function dangerousAdminAction() {
  // User must have both permissions
  const { user } = await requireAllPermissions(['manage:users', 'view:admin']);

  // Perform sensitive action
  // ...
}
```

---

## Best Practices

### ✅ DO

1. **Use permissions, not roles** for access control

   ```tsx
   // Good
   {
     can('review:requests') && <ReviewButton />;
   }

   // Bad
   {
     userRole === 'ADMIN' && <ReviewButton />;
   }
   ```

2. **Always verify server-side**

   ```typescript
   // Client check (UX only)
   {can('create:requests') && <CreateButton />}

   // Server check (security)
   const { user } = await requirePermission('create:requests');
   ```

3. **Use server-verified user IDs**

   ```typescript
   // Good
   const { user } = await requireAuth();
   await prisma.model.create({ data: { userId: user.id } });

   // Bad
   const userId = formData.get('userId'); // ❌ Client-provided
   ```

4. **Log sensitive operations**

   ```typescript
   await logAudit({
     userId: user.id,
     action: 'review:request:approved',
     resourceId: requestId.toString(),
   });
   ```

5. **Use components for declarative UI**
   ```tsx
   <PermissionGate permission="review:requests">
     <ReviewPanel />
   </PermissionGate>
   ```

---

### ❌ DON'T

1. **Don't use hardcoded role checks**

   ```tsx
   // Bad
   {
     (userRole === 'ADMIN' || userRole === 'JUROR') && <Panel />;
   }

   // Good
   {
     can('review:requests') && <Panel />;
   }
   ```

2. **Don't trust client-provided user IDs**

   ```typescript
   // Bad
   const userId = formData.get('userId');
   await prisma.model.create({ data: { userId } });

   // Good
   const { user } = await requireAuth();
   await prisma.model.create({ data: { userId: user.id } });
   ```

3. **Don't skip server-side checks**

   ```typescript
   // Bad - client check only
   export async function dangerousAction() {
     // No permission check!
     await prisma.model.delete({ where: { id } });
   }

   // Good
   export async function dangerousAction() {
     await requirePermission('manage:users');
     await prisma.model.delete({ where: { id } });
   }
   ```

4. **Don't use role display for access control**

   ```tsx
   // Bad
   {
     userRole === 'ADMIN' ? <AdminPanel /> : <UserPanel />;
   }

   // Good
   {
     can('view:admin') ? <AdminPanel /> : <UserPanel />;
   }
   ```

---

## Common Patterns

### Conditional Rendering

```tsx
import { useAuth } from '@/contexts/AuthContext';

function Dashboard() {
  const { can } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>

      {/* Show to everyone */}
      <PublicContent />

      {/* Show only to users with permission */}
      {can('create:requests') && <CreateSection />}
      {can('review:requests') && <ReviewSection />}
      {can('manage:users') && <AdminSection />}
    </div>
  );
}
```

---

### Route Protection

```tsx
import { RequirePermission } from '@/components/auth/RequirePermission';

export default function AdminPage() {
  return (
    <RequirePermission permission="view:admin" redirectTo="/unauthorized">
      <AdminDashboard />
    </RequirePermission>
  );
}
```

---

### Server Action with Audit

```typescript
import { requirePermission } from '@/lib/auth/server-auth';
import { logAudit } from '@/lib/audit';

export async function sensitiveAction(data: FormData) {
  try {
    const { user } = await requirePermission('manage:users');

    // Perform action
    const result = await performAction(data);

    // Log success
    await logAudit({
      userId: user.id,
      action: 'sensitive:action:success',
      resourceId: result.id,
      metadata: {
        /* ... */
      },
    });

    return { success: true, data: result };
  } catch (error) {
    // Handle authorization errors
    if (error instanceof Error && error.message.includes('Forbidden')) {
      return { success: false, error: 'Insufficient permissions' };
    }
    throw error;
  }
}
```

---

## Testing

### Testing Components with Permissions

```typescript
import { render } from '@testing-library/react';
import { useAuth } from '@/contexts/AuthContext';
import MyComponent from './MyComponent';

vi.mock('@/contexts/AuthContext');

test('shows admin panel for users with permission', () => {
  vi.mocked(useAuth).mockReturnValue({
    can: (permission) => permission === 'view:admin',
  } as any);

  const { getByText } = render(<MyComponent />);
  expect(getByText('Admin Panel')).toBeInTheDocument();
});
```

---

## Troubleshooting

### "Unauthorized" errors in server actions

**Problem**: Server action returns "Unauthorized" error.

**Solution**: Ensure user is authenticated and has required permission:

```typescript
// Check if requireAuth/requirePermission is called
const { user } = await requirePermission('review:requests');
```

---

### Permission check always returns false

**Problem**: [can()](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/hooks/usePermissions.ts#14-20) always returns false even for ADMIN.

**Solution**:

1. Check that user role is loaded: `console.log(userRole)`
2. Verify permission exists in `ROLE_PERMISSIONS` mapping
3. Ensure permission string matches exactly (case-sensitive)

---

### Type errors with Permission type

**Problem**: TypeScript error when using permission string.

**Solution**: Import the [Permission](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/lib/auth/permissions.ts#12-18) type:

```typescript
import type { Permission } from '@/lib/auth/permissions';

const permission: Permission = 'review:requests'; // ✅
```

---

## Summary

- **3 ways to check permissions**: [useAuth](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/contexts/AuthContext.tsx#270-277), [usePermissions](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/hooks/usePermissions.ts#6-58), Components
- **Always verify server-side**: Client checks are UX only
- **Use permissions, not roles**: More flexible and maintainable
- **Log sensitive operations**: Audit trail for security
- **Never trust client data**: Always use server-verified user IDs

For more details, see:

- [permissions.ts](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/lib/auth/permissions.ts) - Permission definitions
- [server-auth.ts](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/lib/auth/server-auth.ts) - Server helpers
- [usePermissions.ts](file:///Users/sirolad/Developer/Neolingo/neolingo-app/src/hooks/usePermissions.ts) - Client hook
