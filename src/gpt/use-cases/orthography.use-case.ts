import { OpenAI } from "openai";


interface Options{
      prompt: string
}

export const orthographyCheckUseCase = async(openai: OpenAI ,options: Options)=> {
      
      const {prompt} = options

      const completion = await openai.chat.completions.create({
            messages: [
                  { 
                  role: "system", 
                  content: `Te serán proveídos textos en español con posibles errores ortograficos, 
                  las palabras usadas deben existir en el diccionario de la Real Academia Española,
                  Debes responder en formato JSON, tu tarea es buscar errores palabra por palabra, corregir los errores y retornar soluciones, también debes dar
                  un porcentaje de acierto por el usuario,
                  
                  Si hay errores debes indicarle al usuario cuales fueron los errores y darle un consejo para mejorar y 
                  si no hay errores debes retornar un mensaje de felicitaciones..
                  
                  Ejemplo de salida:
                  {
                        userScore: number,
                        errors: string[], //['error - solucion']
                        message: string, //usa emojis y texto para felicitar al usuario
                  }`
                  },
                  { 
                  role:"user", 
                  content:prompt
                  }
            ],
            model: "gpt-3.5-turbo",
      });
      
      const jsonResponse = JSON.parse(completion.choices[0].message.content)

      return jsonResponse;
      
}