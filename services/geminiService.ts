
import { GoogleGenAI, Modality, Type } from "@google/genai";
import { Language, LANGUAGE_VOICES, POI } from "../types";

// Base64 decoding helpers
function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext, 
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

export const playNarration = async (text: string, lang: Language) => {
  try {
    let textToSpeak = text;
    
    if (lang !== Language.ENGLISH) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'your_actual_api_key_here') {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const targetLang = lang === Language.TAMIL ? 'Tamil' : 'Hindi';
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate the following text to ${targetLang}.
IMPORTANT RULES:
1. Translate ALL content completely into ${targetLang} script.
2. Transliterate ALL English proper nouns (person names, lab names, building names, department names) phonetically into ${targetLang} script - do NOT keep any word in English.
3. The output must contain ONLY ${targetLang} script characters with zero English words mixed in.
4. Only provide the translated text, no explanations.

Text:
${text}`,
            config: { temperature: 0.1 }
          });
          textToSpeak = response.text || text;
        } catch (err) {
          console.warn('Translation failed, using original text:', err);
        }
      }
    }
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      switch(lang) {
        case Language.TAMIL: utterance.lang = 'ta-IN'; break;
        case Language.HINDI: utterance.lang = 'hi-IN'; break;
        default: utterance.lang = 'en-US';
      }
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
      console.log('Web Speech API narration started');
    } else {
      console.warn('Speech synthesis not supported in this browser');
    }
  } catch (error) {
    console.error("Narration error:", error);
  }
};

export const playNarrationWithFeedback = async (text: string, lang: Language) => {
  try {
    let textToSpeak = text;
    
    if (lang !== Language.ENGLISH) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (apiKey && apiKey !== 'your_actual_api_key_here') {
        try {
          const ai = new GoogleGenAI({ apiKey });
          const targetLang = lang === Language.TAMIL ? 'Tamil' : 'Hindi';
          const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Translate the following text to ${targetLang}.
IMPORTANT RULES:
1. Translate ALL content completely into ${targetLang} script.
2. Transliterate ALL English proper nouns (person names, lab names, building names, department names) phonetically into ${targetLang} script - do NOT keep any word in English.
3. The output must contain ONLY ${targetLang} script characters with zero English words mixed in.
4. Only provide the translated text, no explanations.

Text:
${text}`,
            config: { temperature: 0.1 }
          });
          textToSpeak = response.text || text;
        } catch (err) {
          console.warn('Translation failed, using original text:', err);
        }
      }
    }
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      switch(lang) {
        case Language.TAMIL: utterance.lang = 'ta-IN'; break;
        case Language.HINDI: utterance.lang = 'hi-IN'; break;
        default: utterance.lang = 'en-US';
      }
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      window.speechSynthesis.speak(utterance);
      console.log('Manual Web Speech API narration started');
    } else {
      alert('Speech synthesis not supported in this browser');
    }
  } catch (error) {
    console.error("Manual narration error:", error);
    alert(`Audio narration failed: ${error.message}`);
  }
};

export const getAssistantResponseStream = async (
  query: string,
  currentPOI: POI,
  language: Language = Language.ENGLISH,
  onChunk: (chunk: string) => void
): Promise<void> => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_actual_api_key_here') {
    return 'Assistant chatbot requires a valid Gemini API key. Please configure it in .env.local';
  }
  
  const ai = new GoogleGenAI({ apiKey });
  
  // Extract detailed information from academicDetails
  const detailedInfo = currentPOI.academicDetails ? JSON.stringify(currentPOI.academicDetails, null, 2) : 'No detailed information available';
  
  // Build IST-specific navigation only if current POI is IST department
  const istNavigation = currentPOI.id === 'dept-ist' ? `
    
    PRECISE DIRECTIONAL NAVIGATION FROM MAIN ENTRANCE:
    
    IMPORTANT: LEFT and RIGHT directions for floors 1-3 are defined from the perspective of someone standing at the top of the stairs after climbing up. The staircase is the reference point.
    
    **GROUND FLOOR (Main Entrance):**
    RIGHT SIDE: G1 (Dr. S. Senthil Kumar), G2 (Dr. M Vijayalakshmi), G3 (Lecture Hall), G4 (Dr. K Kulothungan), Conference Hall, G5 (Department Library - Staff only, Mrs. R L Jasmine, Ms B Siva Shankari, Ms C M Sowmya)
    LEFT SIDE: G6 (Ada Lovelace Auditorium), G7 (Dr. P Yogesh - HOD), G8 (Dr. Abirami Murugappan cabin)
    Facilities: Male/Female/Staff restrooms near the stairs, Stairs to 1st floor
    
    **FIRST FLOOR (LEFT/RIGHT from staircase perspective):**
    LEFT SIDE: F3 (Data Center), Notice Board, Office Room (marksheets, seals, bonafide), F1-1 (Dr. T Mala), F1-2 (Dr. P Geetha), HOD Office (opposite to Office Room)
    RIGHT SIDE: Knuth Laboratory (Computing Lab 1), F5-1 (Dr. M Deivamani), F5-2 (Dr. Selvi Ravindran), F5-3 (Dr. E Uma), F6-1 (Mr. D Narasimhan), F6-3 (Dr. K Vidya), F4 (Lecture Hall)
    Facilities: Male/Female/Staff restrooms on this floor, Water purifier available, Stairs to 2nd floor
    
    **SECOND FLOOR (LEFT/RIGHT from staircase perspective):**
    LEFT SIDE: S3 (Lecture Hall), S2 (Dr. K Indra Gandhi), S1 (Dr. S Sridhar), S10 (Thangaraj), S8 (Dr. P Varalakshmi)
    RIGHT SIDE: Barbara Liskov Laboratory (Computing Lab 2), Specialized Lab 1 (Annexure Lab), S5-1 (Dr. K Arul Deepa), S5-2 (Dr. D Sangeetha), S5-3 (Dr. S Bama), S4 (Research Scholar Cabin)
    Facilities: Male/Female/Staff restrooms on this floor, Water purifier available, Stairs to 3rd floor
    
    **THIRD FLOOR (LEFT/RIGHT from staircase perspective):**
    LEFT SIDE: T2 (Lecture Hall), T1-1 (Dr. G Geetha), T1-2 (Ms. N Anbarasi), Unmanned & Autonomous System Laboratory, Internet of Things Laboratory
    RIGHT SIDE: Von Neumann Laboratory (Computing Lab 3), Specialized Lab 2 (Annexure Lab), T4 (Dr. K Manimala), T3 (Research Scholar Cabin 2)
    Facilities: Male/Female/Staff restrooms on this floor, Water purifier available
    
    NAVIGATION INSTRUCTIONS:
    1. LEFT and RIGHT directions are always from the perspective of standing at the staircase after climbing up to that floor
    2. Restrooms (Male, Female, Staff) are available on every floor - Ground floor near entrance, other floors distributed on the floor
    3. Water purifiers are available on 1st, 2nd, and 3rd floors (not on ground floor)
    4. For HOD Office: Located on the LEFT SIDE of the First Floor, opposite to the Office Room
    5. For any room, mention: Floor then Side (Left/Right from stairs) then Specific location
    6. For labs, specify which computing lab number and floor side
  ` : '';
  
  const languageInstruction = language === Language.TAMIL 
    ? 'Respond in Tamil language only. Use Tamil script.'
    : language === Language.HINDI
    ? 'Respond in Hindi language only. Use Devanagari script.'
    : 'Respond in English language only.';
  
  const systemInstruction = `
    You are a campus assistant chatbot for CEG (College of Engineering, Guindy). You are currently providing information about: ${currentPOI.name}.
    
    LANGUAGE REQUIREMENT: ${languageInstruction}
    
    LOCATION INFORMATION:
    - Name: ${currentPOI.name}
    - Category: ${currentPOI.category}
    - Description: ${currentPOI.description}
    - Long Description: ${currentPOI.longDescription}
    - Facilities: ${currentPOI.facilities?.join(', ') || 'None listed'}
    
    DETAILED INFORMATION:
    ${detailedInfo}
    ${istNavigation}
    
    RULES:
    1. ONLY answer questions about ${currentPOI.name}
    2. DO NOT provide information about other buildings or departments unless explicitly asked
    3. Keep responses concise and relevant to the user's specific question
    4. If asked about working hours, timings, or operational details, provide only what's relevant to ${currentPOI.name}
    5. For IST department queries, use the detailed floor navigation provided above
    6. For other locations, use only the information provided in LOCATION INFORMATION and DETAILED INFORMATION sections
    7. If the user asks anything that is beyond the available data or outside your knowledge about ${currentPOI.name}, politely inform them that you don't have that information and direct them to visit the office room of ${currentPOI.name} in person for accurate assistance.
  `;

  const response = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: query,
    config: {
      systemInstruction,
      temperature: 0.5,
      topP: 0.8,
    },
  });

  for await (const chunk of response) {
    const text = chunk.text;
    if (text) onChunk(text);
  }
};
