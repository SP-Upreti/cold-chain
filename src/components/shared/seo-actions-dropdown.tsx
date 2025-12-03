"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { FileText, Plus } from "lucide-react";
import { EntityType } from "@/types/ISeoMetadata";

interface SeoActionsDropdownProps {
  entityId: string;
  entityType: EntityType;
  slug: string;
  hasSeoMetadata?: boolean;
}

export function SeoActionsDropdown({
  entityId,
  entityType,
  slug,
  hasSeoMetadata = false,
}: SeoActionsDropdownProps) {
  const router = useRouter();

  const handleCreateSeo = () => {
    const params = new URLSearchParams({
      entityId,
      entityType,
      slug,
    });
    router.push(`/seo-metadata/create?${params.toString()}`);
  };

  const handleViewSeo = () => {
    router.push(`/seo-metadata?search=${slug}`);
  };

  return (
    <>
      {hasSeoMetadata ? (
        <DropdownMenuItem onClick={handleViewSeo}>
          <FileText className="mr-2 h-4 w-4" />
          View SEO
        </DropdownMenuItem>
      ) : (
        <DropdownMenuItem onClick={handleCreateSeo}>
          <Plus className="mr-2 h-4 w-4" />
          Create SEO
        </DropdownMenuItem>
      )}
    </>
  );
}
