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
    const { topic, style = 'funny' } = await req.json()
    
    if (!topic) {
      throw new Error('Topic is required')
    }

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY')
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured')
    }

    console.log('Generating meme caption for topic:', topic)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a witty meme caption generator. Create ${style} meme captions that are short, punchy, and perfect for viral internet memes. Keep them under 100 characters and make them relatable and shareable.`
          },
          {
            role: 'user',
            content: `Generate a ${style} meme caption about: ${topic}`
          }
        ],
        max_tokens: 100,
        temperature: 0.9,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('OpenAI error:', errorText)
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const result = await response.json()
    const caption = result.choices[0].message.content.trim()
    
    console.log('Caption generation successful:', caption)

    return new Response(JSON.stringify({ 
      success: true,
      caption: caption,
      topic: topic
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in generate-meme-caption:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})