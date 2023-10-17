import { defineConfig } from 'astro/config'
import { astroNoteDirective } from './integrations/note-directive'

export default defineConfig({
  integrations: [astroNoteDirective()],
})
