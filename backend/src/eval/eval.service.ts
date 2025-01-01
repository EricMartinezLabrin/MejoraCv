import { Injectable } from '@nestjs/common';
import { CreateEvalDto } from './dto/create-eval.dto';
import * as pdfParse from 'pdf-parse';
import OpenAI from 'openai';

@Injectable()
export class EvalService {
  private openai: OpenAI;
  constructor() {
    this.openai = new OpenAI();
  }
  async create(createEvalDto: CreateEvalDto) {
    //   get pdf
    const pdf = await fetch(
      'https://f002.backblazeb2.com/file/MejoraCv/cvs/d7ed431b-d7d3-4041-ba39-8f9a0206edde-Eric-Martinez-labrin-2025.pdf',
    );
    // convert to buffer
    const pdfBuffer = await pdf.arrayBuffer();
    // parse pdf to text
    const data = await pdfParse(pdfBuffer);
    const textPdf = data.text;
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'developer',
          content: [
            {
              type: 'text',
              text: `
            Analiza texto del curriculum que te dare y retorna un reporte que siga el formato [{"title":"response","comments":"response","score":0},{...}], evaluando aspectos clave como palabras clave relevantes, experiencia laboral, educación, habilidades técnicas, certificaciones, formato, títulos claros, años de experiencia, estabilidad laboral, lenguaje y gramática, personalización, y compatibilidad ATS, el score maximo es 5, no uses etiqeutas, si el score es inferior a 5, incluye dentro de comments consejos practicos y orientados al cv que acabas de leer para llegar a score 5, si el archivo no es un CV, retorna [{"error":"El archivo no es un CV"}], no te disculpes, no hagas comentarios, unicamente puedes responder las dos opciones que te di.
          `,
            },
          ],
        },
        {
          role: 'user',
          content: [
            {
              type: 'text',
              text: textPdf,
            },
          ],
        },
      ],
    });

    console.log(response.choices[0].message);
  }
}
