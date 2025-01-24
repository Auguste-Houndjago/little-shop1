import { NextResponse } from 'next/server'
import { createTag, getAllTags } from '@/app/vendors/vendor'
import { createClient } from '@/utils/supabase/server'

export async function GET() {
  try {
    const tags = await getAllTags()
    return NextResponse.json(tags)
  } catch (error) {
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user?.id) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const { name, category, description } = await req.json()
    
    const tag = await createTag({
      name,
      category,
      description,
      createdById: user.id
    })

    return NextResponse.json(tag)
  } catch (error) {
    console.error('Error:', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
} 