import { NextResponse } from 'next/server'
import { getCurrentUser } from '@/lib/auth'
import { getProjectById, updateProject, deleteProject } from '@/lib/projects'

export async function GET(
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

    return NextResponse.json({ project })
  } catch (error) {
    console.error('Get project error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    )
  }
}

export async function PATCH(
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

    const updates = await request.json()
    const updatedProject = updateProject(id, updates)

    return NextResponse.json({
      project: updatedProject,
      message: 'Project succesvol bijgewerkt',
    })
  } catch (error) {
    console.error('Update project error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    )
  }
}

export async function DELETE(
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

    deleteProject(id)

    return NextResponse.json({
      message: 'Project succesvol verwijderd',
    })
  } catch (error) {
    console.error('Delete project error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden' },
      { status: 500 }
    )
  }
}



