import { NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { getCurrentUser } from '@/lib/auth'
import { getProjectById, addFileToProject } from '@/lib/projects'

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'Niet geautoriseerd' },
        { status: 401 }
      )
    }

    const { id } = await params
    const project = getProjectById(id)

    if (!project) {
      return NextResponse.json(
        { error: 'Project niet gevonden' },
        { status: 404 }
      )
    }

    if (project.userId !== user.id) {
      return NextResponse.json(
        { error: 'Geen toegang tot dit project' },
        { status: 403 }
      )
    }

    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json(
        { error: 'Geen bestand geüpload' },
        { status: 400 }
      )
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = join(process.cwd(), 'public', 'uploads', id)
    await mkdir(uploadsDir, { recursive: true })

    // Save file
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const filename = `${Date.now()}-${file.name}`
    const filepath = join(uploadsDir, filename)
    await writeFile(filepath, buffer)

    // Add file to project
    const projectFile = {
      id: Date.now().toString(),
      name: file.name,
      type: file.type,
      url: `/uploads/${id}/${filename}`,
      uploadedAt: new Date().toISOString(),
    }

    addFileToProject(id, projectFile)

    return NextResponse.json({
      file: projectFile,
      message: 'Bestand succesvol geüpload',
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het uploaden' },
      { status: 500 }
    )
  }
}



