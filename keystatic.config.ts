import { config, fields, collection } from '@keystatic/core';

export default config({
  // In local development, content is edited directly on disk (no auth needed).
  // In production, switch to GitHub storage so the hosted /keystatic admin can
  // authenticate editors via GitHub OAuth and commit changes back to the repo.
  storage:
    process.env.NODE_ENV === 'production'
      ? {
          kind: 'github',
          repo: 'lordyoyi/landing-yvc',
        }
      : {
          kind: 'local',
        },
  ui: {
    brand: { name: 'Young Ventures' },
  },
  collections: {
    posts: collection({
      label: 'Blog posts',
      slugField: 'title',
      path: 'src/content/posts/*',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'publishDate'],
      schema: {
        title: fields.slug({
          name: { label: 'Título' },
          slug: {
            label: 'URL (slug)',
            description: 'Se usa en la dirección del post: /blog/tu-slug',
          },
        }),
        publishDate: fields.date({
          label: 'Fecha de publicación',
          defaultValue: { kind: 'today' },
          validation: { isRequired: true },
        }),
        description: fields.text({
          label: 'Resumen',
          description: 'Aparece en el listado del blog y en las previsualizaciones al compartir.',
          multiline: true,
          validation: { isRequired: true, length: { min: 1, max: 300 } },
        }),
        author: fields.text({
          label: 'Autor',
          defaultValue: 'Young Ventures',
        }),
        tags: fields.array(fields.text({ label: 'Tag' }), {
          label: 'Tags',
          itemLabel: (props) => props.value || 'Tag',
        }),
        cover: fields.image({
          label: 'Imagen de portada',
          description: 'Opcional. Se muestra en el listado y arriba del post.',
          directory: 'public/images/posts',
          publicPath: '/images/posts/',
        }),
        draft: fields.checkbox({
          label: 'Borrador',
          description: 'Si está activo, el post NO se publica en el sitio.',
          defaultValue: false,
        }),
        content: fields.markdoc({
          label: 'Contenido',
          options: {
            image: {
              directory: 'public/images/posts',
              publicPath: '/images/posts/',
            },
          },
        }),
      },
    }),
  },
});
