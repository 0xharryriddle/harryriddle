const NOTION_API_KEY = process.env.PORTFOLIO_NOTION_API_KEY || ''
const NOTION_VERSION = '2025-09-03'

// Notion API 2025-09-03 queries data sources, not databases directly.
// database_id (for reference) -> data_source_id (used for querying)
//   experiments:      4db978d2-0b00-4738-8c5a-14862d2a4b9a -> d23ffb2b-7cfe-4866-b4a6-bddc4be754cd
//   openSourceWork:   c3b8e95d-78cb-493e-8b91-8020f688cb40 -> f5e78b86-18f2-4f84-a009-e048ee0d6260
//   competitiveWork:  2dca9915-9691-4e2d-b691-a2b450a9d702 -> 3e9494b8-b6d1-48fd-990c-7b91419e8809
const DATA_SOURCE_IDS = {
  experiments: 'd23ffb2b-7cfe-4866-b4a6-bddc4be754cd',
  openSourceWork: 'f5e78b86-18f2-4f84-a009-e048ee0d6260',
  competitiveWork: '3e9494b8-b6d1-48fd-990c-7b91419e8809',
} as const

interface NotionRichText {
  plain_text: string
}

interface NotionSelectOption {
  name: string
}

interface NotionMultiSelectOption {
  name: string
}

interface NotionPageProperties {
  Name?: { title: NotionRichText[] }
  Slug?: { rich_text: NotionRichText[] }
  Status?: { select: NotionSelectOption | null }
  Summary?: { rich_text: NotionRichText[] }
  Question?: { rich_text: NotionRichText[] }
  Method?: { rich_text: NotionRichText[] }
  Evidence?: { rich_text: NotionRichText[] }
  Limitation?: { rich_text: NotionRichText[] }
  ['Next Step']?: { rich_text: NotionRichText[] }
  Tags?: { multi_select: NotionMultiSelectOption[] }
  Description?: { rich_text: NotionRichText[] }
  Stack?: { rich_text: NotionRichText[] }
  URL?: { url: string | null }
  Year?: { number: number | null }
  Role?: { rich_text: NotionRichText[] }
  Result?: { rich_text: NotionRichText[] }
}

interface NotionPage {
  id: string
  properties: NotionPageProperties
}

interface NotionQueryResponse {
  results: NotionPage[]
  has_more: boolean
  next_cursor: string | null
}

function getPlainText(richText: NotionRichText[] | undefined): string {
  if (!richText) return ''
  return richText.map((rt) => rt.plain_text).join('')
}

async function queryDataSource(dataSourceId: string): Promise<NotionPage[]> {
  if (!NOTION_API_KEY) return []

  const response = await fetch(
    `https://api.notion.com/v1/data_sources/${dataSourceId}/query`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${NOTION_API_KEY}`,
        'Notion-Version': NOTION_VERSION,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ page_size: 100 }),
      next: { revalidate: 3600 }, // Cache for 1 hour
    },
  )

  if (!response.ok) {
    const body = await response.text().catch(() => '(no body)')
    console.error(
      `Notion API error (${dataSourceId}): ${response.status} ${response.statusText} — ${body.slice(0, 300)}`,
    )
    return []
  }

  const data: NotionQueryResponse = await response.json()
  return data.results
}

// --- Experiment types & fetcher ---

export interface NotionExperiment {
  slug: string
  title: string
  status: string
  summary: string
  question: string
  method: string
  evidence: string
  limitation: string
  nextStep: string
  tags: string[]
}

export async function getExperimentsFromNotion(): Promise<NotionExperiment[]> {
  const pages = await queryDataSource(DATA_SOURCE_IDS.experiments)

  return pages.map((page) => ({
    slug: getPlainText(page.properties.Slug?.rich_text),
    title: getPlainText(page.properties.Name?.title),
    status: page.properties.Status?.select?.name ?? 'Unknown',
    summary: getPlainText(page.properties.Summary?.rich_text),
    question: getPlainText(page.properties.Question?.rich_text),
    method: getPlainText(page.properties.Method?.rich_text),
    evidence: getPlainText(page.properties.Evidence?.rich_text),
    limitation: getPlainText(page.properties.Limitation?.rich_text),
    nextStep: getPlainText(page.properties['Next Step']?.rich_text),
    tags: page.properties.Tags?.multi_select?.map((t) => t.name) ?? [],
  }))
}

// --- Open Source Work types & fetcher ---

export interface NotionOpenSourceWork {
  name: string
  description: string
  stack: string
  href: string
}

export async function getOpenSourceWorkFromNotion(): Promise<NotionOpenSourceWork[]> {
  const pages = await queryDataSource(DATA_SOURCE_IDS.openSourceWork)

  return pages.map((page) => ({
    name: getPlainText(page.properties.Name?.title),
    description: getPlainText(page.properties.Description?.rich_text),
    stack: getPlainText(page.properties.Stack?.rich_text),
    href: page.properties.URL?.url ?? '',
  }))
}

// --- Competitive Work types & fetcher ---

export interface NotionCompetitiveWork {
  name: string
  year: number
  role: string
  result?: string
  description: string
  href?: string
}

export async function getCompetitiveWorkFromNotion(): Promise<NotionCompetitiveWork[]> {
  const pages = await queryDataSource(DATA_SOURCE_IDS.competitiveWork)

  return pages.map((page) => ({
    name: getPlainText(page.properties.Name?.title),
    year: page.properties.Year?.number ?? 0,
    role: getPlainText(page.properties.Role?.rich_text),
    result: getPlainText(page.properties.Result?.rich_text) || undefined,
    description: getPlainText(page.properties.Description?.rich_text),
    href: page.properties.URL?.url || undefined,
  }))
}
