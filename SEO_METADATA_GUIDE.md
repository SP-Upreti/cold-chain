# SEO Metadata Management System

A comprehensive SEO metadata management feature for managing SEO data across Products, Blogs, Categories, Subcategories, and Brands.

## Features

- ✅ Full CRUD operations for SEO metadata
- ✅ Support for multiple entity types (Product, Blog, Category, Subcategory, Brand)
- ✅ Role-based access control (SUDOADMIN only)
- ✅ Open Graph and Twitter Card metadata
- ✅ JSON-LD structured data support
- ✅ File uploads (images, sitemap, manifest)
- ✅ Multi-language support (alternates)
- ✅ Robots meta configuration
- ✅ Pre-filled forms from entity context

## File Structure

```
src/
├── app/
│   └── seo-metadata/
│       ├── page.tsx                    # List all SEO metadata
│       └── create/
│           └── page.tsx                # Create new SEO metadata
├── components/
│   ├── admin/
│   │   └── entity-table-with-seo.tsx  # Example table with SEO actions
│   ├── shared/
│   │   └── seo-actions-dropdown.tsx   # SEO dropdown menu items
│   └── ui/
│       ├── checkbox.tsx               # Checkbox component
│       └── dropdown-menu.tsx          # Dropdown menu component
├── hooks/
│   └── useAuth.ts                     # Authentication hook
├── schema/
│   └── seo-metadata-schema.ts         # Zod validation schema
├── services/
│   └── seoMetadataService.ts          # API service functions
└── types/
    ├── ISeoMetadata.ts                # SEO metadata types
    └── IUser.ts                       # User and role types
```

## Usage

### 1. Access SEO Management

Navigate to `/seo-metadata` to view all SEO metadata entries. Only users with `SUDOADMIN` role can access this page.

### 2. Create SEO Metadata

**Option A: Direct Creation**
- Click "Create SEO" button on the SEO metadata list page
- Fill in all required fields across the tabs

**Option B: From Entity Table**
- In any entity table (Products, Brands, etc.), click the actions dropdown (⋮)
- If you're a SUDOADMIN, you'll see "Create SEO" or "View SEO" option
- Click to navigate to the creation form with pre-filled entity data

### 3. Integrate SEO Actions into Your Tables

Use the `EntityTableWithSeo` component or add the `SeoActionsDropdown` to your existing tables:

```tsx
import { EntityTableWithSeo } from "@/components/admin/entity-table-with-seo";
import { EntityType } from "@/types/ISeoMetadata";

// Example: Products table
<EntityTableWithSeo
  items={products}
  entityType={EntityType.PRODUCT}
  onView={(id) => router.push(`/products/${id}`)}
  onEdit={(id) => router.push(`/products/edit/${id}`)}
  onDelete={handleDelete}
/>
```

Or add to existing dropdown menus:

```tsx
import { SeoActionsDropdown } from "@/components/shared/seo-actions-dropdown";
import { useAuth } from "@/hooks/useAuth";
import { EntityType } from "@/types/ISeoMetadata";

function YourComponent() {
  const { isSudoAdmin } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {/* Your existing menu items */}
        <DropdownMenuItem>View</DropdownMenuItem>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        
        {/* Add SEO actions for SUDOADMIN only */}
        {isSudoAdmin && (
          <>
            <DropdownMenuSeparator />
            <SeoActionsDropdown
              entityId={item.id}
              entityType={EntityType.PRODUCT}
              slug={item.slug}
              hasSeoMetadata={!!item.seoMetadata}
            />
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
```

## SEO Metadata Fields

### Basic Information
- **Slug**: URL-friendly identifier (e.g., `panasonic-rice-cooker-1-8l`)
- **Title**: Page title (max 60 characters)
- **Description**: Meta description (max 160 characters)
- **Keywords**: Array of keywords for SEO
- **Canonical URL**: Canonical URL for the page
- **Entity Type**: PRODUCT | BLOG | CATEGORY | SUBCATEGORY | BRAND
- **Entity ID**: UUID of the related entity
- **Indexable**: Whether search engines should index this page
- **Optimized**: Mark if SEO is optimized

### Open Graph (Social Media)
- Title, Description, Type, URL
- Site Name, Locale
- Images (upload multiple)

### Twitter Card
- Card type (summary, summary_large_image, etc.)
- Title, Description
- Images (upload multiple)

### Advanced
- **Robots**: Index, Follow, Max Snippet, Image/Video Preview settings
- **Alternates**: Multi-language URLs (e.g., en, ne)
- **JSON-LD**: Structured data for rich snippets
- **Extra Meta**: Custom metadata (theme color, category, etc.)

### Files
- Open Graph Images
- Twitter Images
- Sitemap XML
- Manifest JSON

## API Endpoints

The service expects these endpoints:

```
GET    /seo-metadata                    # List all with pagination
GET    /seo-metadata/:slug              # Get by slug
POST   /seo-metadata                    # Create new
PUT    /seo-metadata/:id                # Update existing
DELETE /seo-metadata/:id                # Delete
```

Query parameters for list:
- `page`: Page number
- `limit`: Items per page
- `search`: Search by slug or title
- `entityType`: Filter by entity type

## Authentication Setup

Replace the mock authentication in `src/hooks/useAuth.ts` with your actual auth implementation:

```tsx
// src/hooks/useAuth.ts
export function useAuth() {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      // Replace with your actual API call
      const response = await fetch('/api/auth/me');
      const userData = await response.json();
      setUser(userData);
    };
    checkAuth();
  }, []);

  // ... rest of the hook
}
```

## Example: Complete Integration

Here's a complete example of adding SEO actions to a products admin page:

```tsx
"use client";

import { useState, useEffect } from "react";
import { getAllProducts, deleteProduct } from "@/services/productService";
import { EntityTableWithSeo } from "@/components/admin/entity-table-with-seo";
import { EntityType } from "@/types/ISeoMetadata";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const { isSudoAdmin } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const response = await getAllProducts({ page: 1, limit: 50 });
    setProducts(response.data.products);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this product?")) {
      await deleteProduct(id);
      fetchProducts();
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button onClick={() => router.push("/products/create")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <EntityTableWithSeo
        items={products}
        entityType={EntityType.PRODUCT}
        onView={(id) => router.push(`/products/${id}`)}
        onEdit={(id) => router.push(`/products/edit/${id}`)}
        onDelete={handleDelete}
      />
    </div>
  );
}
```

## Entity Types

```typescript
export enum EntityType {
  PRODUCT = "PRODUCT",
  BLOG = "BLOG",
  CATEGORY = "CATEGORY",
  SUBCATEGORY = "SUBCATEGORY",
  BRAND = "BRAND",
}
```

## User Roles

```typescript
export enum UserRole {
  SUDOADMIN = "SUDOADMIN",  // Full access to SEO management
  ADMIN = "ADMIN",          // Regular admin access
  USER = "USER",            // Regular user access
}
```

## Notes

- Only SUDOADMIN users can access SEO metadata management
- SEO actions appear in entity table dropdowns only for SUDOADMIN
- Form validation ensures proper SEO best practices (title length, description length, etc.)
- File uploads support images (JPEG, PNG, WebP) and config files (XML, JSON)
- JSON-LD structured data helps with rich snippets in search results

## TODO

- [ ] Implement actual authentication in `useAuth.ts`
- [ ] Add edit functionality (`/seo-metadata/edit/[id]`)
- [ ] Add view/detail page (`/seo-metadata/[id]`)
- [ ] Implement backend API endpoints
- [ ] Add SEO score/optimization checker
- [ ] Add preview functionality for social media cards
- [ ] Implement bulk operations
- [ ] Add SEO analytics integration
