import { NextResponse } from 'next/server'
import OpenAI from 'openai'
import { getCurrentUser } from '@/lib/auth'
import { getProjectById, updateProject } from '@/lib/projects'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
})

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

    // Update project status
    updateProject(id, { status: 'processing' })

    // Generate website using OpenAI
    const prompt = `
Je bent een professionele webdesigner. Maak een moderne, responsive HTML website op basis van de volgende informatie:

Project Naam: ${project.name}
Beschrijving: ${project.description}
Aantal bestanden: ${project.files.length}
Bestandstypen: ${project.files.map(f => f.type).join(', ')}

Genereer een complete HTML pagina met:
- Moderne, schone CSS styling (embedded in <style> tag)
- Responsive design
- Nederlandse tekst
- Professionele uitstraling
- Gebruik van de geüploade bestanden (referentie naar ${project.files.map(f => f.url).join(', ')})

Geef alleen de volledige HTML code terug, zonder uitleg.
`

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'Je bent een expert webdesigner die mooie, moderne websites maakt in HTML/CSS.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 3000,
      })

      const generatedHTML = completion.choices[0]?.message?.content || ''

      // Update project with generated website
      const updatedProject = updateProject(id, {
        status: 'completed',
        generatedWebsite: generatedHTML,
      })

      return NextResponse.json({
        project: updatedProject,
        message: 'Website succesvol gegenereerd',
      })
    } catch (aiError: unknown) {
      console.error('OpenAI error:', aiError)
      
      // Fallback: generate a simple template
      const fallbackHTML = generateFallbackTemplate(project)
      
      const updatedProject = updateProject(id, {
        status: 'completed',
        generatedWebsite: fallbackHTML,
      })

      return NextResponse.json({
        project: updatedProject,
        message: 'Website gegenereerd (basis template)',
      })
    }
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: 'Er is een fout opgetreden bij het genereren' },
      { status: 500 }
    )
  }
}

function generateFallbackTemplate(project: any): string {
  return `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${project.name}</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        header {
            background: linear-gradient(135deg, #e84d70 0%, #6366f1 100%);
            color: white;
            padding: 4rem 2rem;
            text-align: center;
        }
        h1 {
            font-size: 3rem;
            margin-bottom: 1rem;
        }
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 3rem 2rem;
        }
        .content {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        .gallery {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
        }
        .gallery img {
            width: 100%;
            height: 250px;
            object-fit: cover;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        footer {
            background: #f8f9fa;
            padding: 2rem;
            text-align: center;
            color: #666;
        }
    </style>
</head>
<body>
    <header>
        <h1>${project.name}</h1>
        <p>${project.description}</p>
    </header>
    
    <div class="container">
        <div class="content">
            <h2>Welkom</h2>
            <p>Dit is jouw nieuwe website, gegenereerd door Modual. Je kunt deze pagina naar wens aanpassen en uitbreiden.</p>
        </div>
        
        ${project.files.length > 0 ? `
        <div class="content">
            <h2>Galerij</h2>
            <div class="gallery">
                ${project.files.map((file: any) => 
                  file.type.startsWith('image/') 
                    ? `<img src="${file.url}" alt="${file.name}" />`
                    : ''
                ).join('')}
            </div>
        </div>
        ` : ''}
    </div>
    
    <footer>
        <p>&copy; 2025 ${project.name}. Gemaakt met Modual.</p>
    </footer>
</body>
</html>
  `.trim()
}



