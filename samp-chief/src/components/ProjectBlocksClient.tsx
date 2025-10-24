"use client";
import React from "react";
import { renderProjectBlock, ProjectBlock } from "@/components/projectBlocks";

interface ProjectBlocksClientProps {
  blocks: ProjectBlock[];
  eventTitle: string;
}

const ProjectBlocksClient: React.FC<ProjectBlocksClientProps> = ({ blocks, eventTitle }) => {
  return (
    <>
      {blocks.map((block, idx) => renderProjectBlock(block, idx, eventTitle))}
    </>
  );
};

export default ProjectBlocksClient;
