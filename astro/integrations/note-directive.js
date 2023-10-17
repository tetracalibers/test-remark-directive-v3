/// <reference types="mdast-util-to-hast" />
/// <reference types="mdast-util-directive" />

import remarkDirective from 'remark-directive'
import { h } from 'hastscript'
import { visit } from 'unist-util-visit'

function remarkNoteDirective() {
  /**
   * @param {import('mdast').Root} tree
   * @returns {undefined}
   */
  return (tree) => {
    visit(tree, (node) => {
      if (
        node.type === 'containerDirective' ||
        node.type === 'leafDirective' ||
        node.type === 'textDirective'
      ) {
        if (node.name !== 'note') return

        const data = node.data || (node.data = {})
        const tagName = node.type === 'textDirective' ? 'span' : 'div'

        data.hName = tagName
        data.hProperties = h(tagName, node.attributes || {}).properties
      }
    })
  }
}

export function astroNoteDirective() {
  return {
    name: 'astro-note-directive',
    hooks: {
      'astro:config:setup': ({ updateConfig }) => {
        updateConfig({
          markdown: {
            remarkPlugins: [remarkDirective, remarkNoteDirective],
          },
        })
      },
    },
  }
}
