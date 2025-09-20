import { supabase } from '@/integrations/supabase/client';

export interface GenerateMemeParams {
  prompt: string;
  topic?: string;
  style?: string;
}

export interface GeneratedMeme {
  image: string;
  caption: string;
  prompt: string;
  topic: string;
}

export interface GeneratedProfileImage {
  image: string;
  prompt: string;
}

export class AIService {
  static async generateMeme(params: GenerateMemeParams): Promise<GeneratedMeme> {
    try {
      // Generate caption first
      const captionResponse = await supabase.functions.invoke('generate-meme-caption', {
        body: {
          topic: params.topic || params.prompt,
          style: params.style || 'funny'
        }
      });

      if (captionResponse.error) {
        throw new Error(captionResponse.error.message);
      }

      const caption = captionResponse.data.caption;

      // Generate image based on the prompt and caption
      const imagePrompt = `${params.prompt}, ${caption}, meme style, funny, viral, high quality`;
      const imageResponse = await supabase.functions.invoke('generate-meme-image', {
        body: {
          prompt: imagePrompt
        }
      });

      if (imageResponse.error) {
        throw new Error(imageResponse.error.message);
      }

      return {
        image: imageResponse.data.image,
        caption,
        prompt: params.prompt,
        topic: params.topic || params.prompt
      };
    } catch (error) {
      console.error('Error generating meme:', error);
      throw new Error('Failed to generate meme');
    }
  }

  static async generateProfileImage(username: string, rank: number): Promise<GeneratedProfileImage> {
    try {
      const rankTitles = {
        1: 'legendary champion',
        2: 'silver master',
        3: 'bronze warrior'
      };

      const rankTitle = rankTitles[rank as keyof typeof rankTitles] || 'skilled player';
      const prompt = `Professional gaming avatar for ${username}, ${rankTitle}, futuristic cyber style, neon colors, high tech, digital art, portrait, clean background`;

      const response = await supabase.functions.invoke('generate-meme-image', {
        body: {
          prompt
        }
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      return {
        image: response.data.image,
        prompt
      };
    } catch (error) {
      console.error('Error generating profile image:', error);
      throw new Error('Failed to generate profile image');
    }
  }

  static async generateNFTMeme(nftData: {
    name: string;
    rarity: string;
    attributes: Array<{ trait: string; value: string }>;
  }): Promise<GeneratedMeme> {
    try {
      const bossDefeated = nftData.attributes.find(attr => attr.trait === 'Boss Defeated')?.value || 'unknown boss';
      const heistType = nftData.attributes.find(attr => attr.trait === 'Heist Type')?.value || 'epic heist';
      
      const topic = `${nftData.rarity} NFT from ${heistType} where ${bossDefeated} was defeated`;
      const prompt = `${nftData.name}, ${nftData.rarity} rarity NFT, victory celebration, ${bossDefeated}, ${heistType}, gaming achievement, digital collectible`;

      return await this.generateMeme({
        prompt,
        topic,
        style: 'epic'
      });
    } catch (error) {
      console.error('Error generating NFT meme:', error);
      throw new Error('Failed to generate NFT meme');
    }
  }
}