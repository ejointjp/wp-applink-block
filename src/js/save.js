// import he from 'he'
// import { getDomainFromUrl, faviconUrl } from './util'
const { useBlockProps } = wp.blockEditor

export default function save (props) {
  const blockProps = useBlockProps.save()

  return <div {...blockProps}>save</div>
}
