import attributes from './attributes'
import edit from './edit'
import save from './save'
const { registerBlockType } = wp.blocks

registerBlockType('merihari/applink', {
  apiVersion: 2,
  title: 'Applink',
  description: '',
  category: 'merihari',
  icon: 'instagram',
  supports: { html: false },
  keywords: [
    'リンク',
    '埋め込み',
    'アプリ',
    'apple',
    'app',
    'embed',
    'link',
    'itunes',
    'iTunes'
  ],
  attributes,
  edit,
  save
})
