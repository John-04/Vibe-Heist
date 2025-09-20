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
    const { prompt } = await req.json()
    
    if (!prompt) {
      throw new Error('Prompt is required')
    }

    const stabilityApiKey = Deno.env.get('STABILITY_AI_API_KEY')
    if (!stabilityApiKey) {
      throw new Error('Stability AI API key not configured')
    }

    console.log('Generating image for prompt:', prompt)

    const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-xl-1024-v1-0/text-to-image', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${stabilityApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text_prompts: [
          {
            text: `${prompt}, meme style, funny, internet meme, high quality, detailed`,
            weight: 1
          }
        ],
        cfg_scale: 7,
        height: 1024,
        width: 1024,
        samples: 1,
        steps: 30,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Stability AI error:', errorText)
      throw new Error(`Stability AI API error: ${response.status}`)
    }

    const result = await response.json()
    console.log('Image generation successful')

    return new Response(JSON.stringify({ 
      success: true,
      image: `data:image/png;base64,${result.artifacts[0].base64}`,
      prompt: prompt
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('Error in generate-meme-image:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      success: false
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})