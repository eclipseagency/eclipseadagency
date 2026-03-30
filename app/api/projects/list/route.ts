import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { requireAuthUser, resolveTenantId } from '@/lib-erp/api-helpers'

// Lightweight endpoint — returns all tenant projects (id, name, code) for dropdowns
export async function GET(request: NextRequest) {
  try {
    const user = requireAuthUser(request)
    const tenantId = await resolveTenantId(user)

    const projects = await prisma.project.findMany({
      where: { tenantId, status: { not: 'REJECTED' } },
      select: {
        id: true,
        projectName: true,
        projectCode: true,
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error('List projects error:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}
