import type { StructureResolver } from 'sanity/desk'
import { BookText, FolderKanban, Layers3, ListChecks, User, LayoutGrid, Gift } from 'lucide-react'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Conteúdo')
    .items([
      S.listItem().title('Posts').icon(BookText).child(S.documentTypeList('post').title('Posts')),
      S.listItem()
        .title('Content Upgrades')
        .icon(Gift)
        .child(S.documentTypeList('contentUpgrade').title('Content Upgrades')),
      S.divider(),
      S.listItem().title('Temas').icon(Layers3).child(S.documentTypeList('theme').title('Temas')),
      S.listItem().title('Interesses').icon(ListChecks).child(S.documentTypeList('interest').title('Interesses')),
      S.listItem().title('Séries / Trilhas').icon(FolderKanban).child(S.documentTypeList('series').title('Séries / Trilhas')),
      S.divider(),
      S.listItem().title('Autores').icon(User).child(S.documentTypeList('author').title('Autores')),
      S.listItem()
        .title('Seções (Recursos)')
        .icon(LayoutGrid)
        .child(S.documentTypeList('resourceSection').title('Seções (Recursos)')),
    ])

