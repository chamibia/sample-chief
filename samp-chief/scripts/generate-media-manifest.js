#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Root folder for project assets
const projectsRoot = path.join(process.cwd(), 'public', 'assets', 'projects');
const manifestPath = path.join(projectsRoot, 'manifest.json');

function isMediaFile(name) {
  return /\.(jpg|jpeg|png|webp|gif|mp4|mov|avi|m4v)$/i.test(name);
}

function generate() {
  const manifest = {};
  if (!fs.existsSync(projectsRoot)) {
    console.warn('projects root does not exist:', projectsRoot);
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    return;
  }

  const folders = fs.readdirSync(projectsRoot, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name);

  folders.forEach(folder => {
    const folderPath = path.join(projectsRoot, folder);
    try {
      const files = fs.readdirSync(folderPath, { withFileTypes: true })
        .filter(f => f.isFile() && isMediaFile(f.name))
        .map(f => `/assets/projects/${folder}/${f.name}`);
      manifest[folder] = files;
    } catch (err) {
      console.warn('failed to read folder', folderPath, err.message);
      manifest[folder] = [];
    }
  });

  try {
    fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2));
    console.log('Wrote manifest to', manifestPath);
  } catch (err) {
    console.error('Failed to write manifest:', err.message);
    process.exit(1);
  }
}

generate();
