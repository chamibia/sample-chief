"use client";

import { useEffect } from "react";

import { trackEvent } from "@/lib/analytics";

export default function ProjectViewTracker({
  slug,
  title,
}: {
  slug: string;
  title: string;
}) {
  useEffect(() => {
    trackEvent("view_item", {
      content_type: "project",
      item_id: slug,
      item_name: title,
    });
  }, [slug, title]);

  return null;
}
