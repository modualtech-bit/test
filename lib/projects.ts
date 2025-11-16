export interface Project {
  id: string
  userId: string
  name: string
  description: string
  status: 'draft' | 'processing' | 'completed'
  files: ProjectFile[]
  voiceMemo?: string
  generatedWebsite?: string
  createdAt: string
  updatedAt: string
}

export interface ProjectFile {
  id: string
  name: string
  type: string
  url: string
  uploadedAt: string
}

// In-memory project storage (replace with database in production)
const projects: Project[] = []

export function createProject(
  userId: string,
  name: string,
  description: string
): Project {
  const project: Project = {
    id: Date.now().toString(),
    userId,
    name,
    description,
    status: 'draft',
    files: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
  projects.push(project)
  return project
}

export function getUserProjects(userId: string): Project[] {
  return projects.filter(p => p.userId === userId)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id)
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return null
  
  projects[index] = {
    ...projects[index],
    ...updates,
    updatedAt: new Date().toISOString(),
  }
  return projects[index]
}

export function addFileToProject(projectId: string, file: ProjectFile): Project | null {
  const project = getProjectById(projectId)
  if (!project) return null
  
  project.files.push(file)
  project.updatedAt = new Date().toISOString()
  return project
}

export function deleteProject(id: string): boolean {
  const index = projects.findIndex(p => p.id === id)
  if (index === -1) return false
  
  projects.splice(index, 1)
  return true
}



