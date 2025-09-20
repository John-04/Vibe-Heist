import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { category = 'general', country = 'us' } = await req.json()

    const newsApiKey = Deno.env.get('NEWSAPI_KEY')
    if (!newsApiKey) {
      throw new Error('NewsAPI key not configured')
    }

    console.log('Fetching trending topics:', category, country)

    const response = await fetch(`https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=10&apiKey=${newsApiKey}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('NewsAPI error:', errorText)
      throw new Error(`NewsAPI error: ${response.status}`)
    }

    const result = await response.json()
    
    const topics = result.articles?.map((article: any) => ({
      title: article.title,
      description: article.description,
      url: article.url,
      source: article.source.name,
      publishedAt: article.publishedAt
    })) || []

    console.log('Trending topics fetched:', topics.length)

    return new Response(JSON.stringify({ 
      success: true,
      topics: topics,
      category: category,
      totalResults: result.totalResults
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in get-trending-topics:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})