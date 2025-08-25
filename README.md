# AI Website Analyzer

## Objetivo de la Aplicación

La aplicación "AI Website Analyzer" es una herramienta que permite a los usuarios obtener un análisis detallado y recomendaciones de mejora para cualquier sitio web, impulsado por la inteligencia artificial de Google Gemini. Al ingresar una URL, la aplicación procesa el contenido del sitio y genera informes exhaustivos en las siguientes áreas clave:

*   **Experiencia de Usuario (UX):** Evaluación de la usabilidad, navegación, accesibilidad y satisfacción general del usuario.
*   **Diseño Web:** Análisis de la estética, jerarquía visual, consistencia de marca y aplicación de principios de diseño modernos.
*   **Optimización SEO:** Sugerencias para mejorar la visibilidad en motores de búsqueda, incluyendo aspectos de SEO on-page y técnico.
*   **Atractivo de Producto/Servicio:** Si el sitio ofrece productos o servicios, se evalúa qué tan bien se presentan para atraer visitantes y convertirlos, considerando la claridad de la propuesta de valor, las llamadas a la acción y la presentación general.

El objetivo es proporcionar información accionable para mejorar la presencia online y el rendimiento de cualquier sitio web.

## Tecnologías Utilizadas

Esta aplicación está construida con las siguientes tecnologías:

*   **Frontend:**
    *   **React:** Una biblioteca de JavaScript para construir interfaces de usuario interactivas.
    *   **TypeScript:** Un superconjunto de JavaScript que añade tipado estático, mejorando la robustez y mantenibilidad del código.
    *   **Vite:** Un bundler de próxima generación que ofrece una experiencia de desarrollo frontend extremadamente rápida.
    *   **Tailwind CSS:** Un framework CSS de utilidad que permite construir diseños personalizados rápidamente sin salir del HTML.
*   **Integración de IA:**
    *   **Google Gemini API:** Utilizada para el análisis inteligente de sitios web y la generación de recomendaciones.
*   **Manejo de Peticiones HTTP:**
    *   **Axios:** Un cliente HTTP basado en promesas para el navegador y Node.js.

## Cómo Instalar y Ejecutar Localmente

Sigue estos pasos para configurar y ejecutar la aplicación en tu entorno local:

1.  **Clonar el Repositorio:**
    ```bash
    git clone https://github.com/tu-usuario/ai-website-analyzer.git
    cd ai-website-analyzer
    ```
    (Nota: Reemplaza `https://github.com/tu-usuario/ai-website-analyzer.git` con la URL real de tu repositorio si es diferente).

2.  **Instalar Dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar Variables de Entorno:**
    Crea un archivo `.env` en la raíz del proyecto (al mismo nivel que `package.json`). Este archivo debe contener tu clave API de Google Gemini. Puedes copiar el ejemplo `.env.local.example` y renombrarlo.

    ```
    API_KEY=TU_CLAVE_API_DE_GOOGLE_GEMINI
    ```
    Asegúrate de reemplazar `TU_CLAVE_API_DE_GOOGLE_GEMINI` con tu clave API real obtenida de Google AI Studio o Google Cloud.

4.  **Ejecutar la Aplicación:**
    Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```
    La aplicación se abrirá en tu navegador predeterminado, generalmente en `http://localhost:5173` (o un puerto similar).

5.  **Construir para Producción (Opcional):**
    Para generar una versión optimizada para producción:
    ```bash
    npm run build
    ```
    Los archivos de producción se generarán en la carpeta `dist/`. Puedes previsualizar la construcción con `npm run preview`.