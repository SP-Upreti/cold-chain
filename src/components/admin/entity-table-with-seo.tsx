"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { SeoActionsDropdown } from "@/components/shared/seo-actions-dropdown";
import { useAuth } from "@/hooks/useAuth";
import { EntityType } from "@/types/ISeoMetadata";

interface EntityItem {
  id: string;
  name: string;
  slug: string;
  seoMetadata?: Record<string, unknown> | null;
  [key: string]: unknown;
}

interface EntityTableWithSeoProps {
  items: EntityItem[];
  entityType: EntityType;
  onView?: (id: string) => void;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

/**
 * Example table component showing how to integrate SEO actions
 * This can be used for Products, Brands, Blogs, Categories, etc.
 */
export function EntityTableWithSeo({
  items,
  entityType,
  onView,
  onEdit,
  onDelete,
}: EntityTableWithSeoProps) {
  const router = useRouter();
  const { isSudoAdmin } = useAuth();

  return (
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>SEO Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-10">
                No items found
              </TableCell>
            </TableRow>
          ) : (
            items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.name}</TableCell>
                <TableCell>{item.slug}</TableCell>
                <TableCell>
                  {item.seoMetadata ? (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs">
                      Configured
                    </span>
                  ) : (
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
                      Not Set
                    </span>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {onView && (
                        <DropdownMenuItem onClick={() => onView(item.id)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View
                        </DropdownMenuItem>
                      )}
                      {onEdit && (
                        <DropdownMenuItem onClick={() => onEdit(item.id)}>
                          <Pencil className="mr-2 h-4 w-4" />
                          Edit
                        </DropdownMenuItem>
                      )}
                      {onDelete && (
                        <DropdownMenuItem
                          onClick={() => onDelete(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      )}
                      
                      {/* SEO Actions - Only visible to SUDOADMIN */}
                      {isSudoAdmin && (
                        <>
                          <DropdownMenuSeparator />
                          <SeoActionsDropdown
                            entityId={item.id}
                            entityType={entityType}
                            slug={item.slug}
                            hasSeoMetadata={!!item.seoMetadata}
                          />
                        </>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
