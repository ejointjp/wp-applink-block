const { useBlockProps, PlainText, InspectorControls } = wp.blockEditor
const { useState, useEffect, useCallback, memo } = wp.element
const { Button, PanelBody, SelectControl } = wp.components
console.log(wp.components)
// PHPから取得した変数
// eslint-disable-next-line no-undef
const { api, action, nonce } = wpalbAjaxValues

const edit = (props) => {
  const blockProps = useBlockProps()
  const { attributes, setAttributes } = props
  const { app } = attributes

  const [term, setTerm] = useState('')
  const [tempTerm, setTempTerm] = useState('')
  const [result, setResult] = useState({})
  const [entity, setEntity] = useState('software')

  const fetchData = async () => {
    const searchParams = new URLSearchParams()
    searchParams.append('country', 'JP')
    searchParams.append('lang', 'ja_JP')
    searchParams.append('entity', entity)
    searchParams.append('term', term)
    searchParams.append('limit', '10')
    searchParams.append('at', '11l64V')

    const url = 'https://itunes.apple.com/search?' + searchParams.toString()
    const params = new URLSearchParams()
    params.append('action', action)
    params.append('nonce', nonce)
    params.append('url', url)

    try {
      const res = await fetch(api, { method: 'post', body: params })
      const result = await res.json()
      await setResult(result)
      console.log(url)
    } catch (e) {
      console.error(e)
    }
  }

  const onKeyPress = (e) => {
    // URL入力してEnterを押したら
    if (e.key === 'Enter') {
      e.preventDefault()

      // URLが空なら
      if (tempTerm === '') {
        // setState('url-empty')
        return false
      }

      // 入力URLを実際のURLに渡す（検索がはじまる）
      setTerm(tempTerm)
      // 検索モード
      // setState('search')
    }
  }

  const onClickAppButton = useCallback((item) => {
    setAttributes({
      app: {
        title: item.trackName,
        url: item.trackViewUrl,
        artist: item.artistName,
        artworkUrl: item.artworkUrl100 || item.artworkUrl512 || item.artworkUrl60 || item.artworkUrl30
      }
    })
    console.log('clicked')
  })

  const ResultApp = memo(() => {
    if (Object.keys(app).length > 0) {
      return (
        <div>
          <div>{app.title}</div>
          <div>{app.artist}</div>
          <div><img src={app.artworkUrl} alt="" aria-hidden="true" /></div>
          <div><a href={app.url} target="_blank" rel="noopener noreferrer">リンク</a></div>
        </div>
      )
    } else {
      return <div>appありません</div>
    }
  })

  const ResultList = memo(() => {
    if (Object.keys(result).length > 0 && Object.keys(result).indexOf('results') !== -1) {
      return (
        result.results.map((item, i) =>

          <div key={i}>
            <div style={{ width: '1rem', height: '1rem' }}><img src={item.artworkUrl100} /></div>
            <div>{item.trackName}</div>
            <button
              className="button"
              onClick={() => onClickAppButton(item)}
            >これにする</button>
          </div>
        ))
    } else {
      return <div>resultありません</div>
    }
  })

  // URLが有効ならfetch
  useEffect(() => {
    console.log('term', term)
    if (term !== '') {
      fetchData()
      console.log('fetchしました')
    } else {
      console.log('fetchしませんでした')
    }
  }, [term, entity])

  return (
    <div { ...blockProps }>
      <div className='wp-block-merihari-blogcard-url'>
        <SelectControl
          label="選べ"
          value={entity}
          onChange={ (value) => setEntity(value) }
          options={ [
            {
              value: 'software',
              label: 'iPhone App'
            },
            {
              value: 'iPadSoftware',
              label: 'iPad App'
            },
            {
              value: 'macSoftware',
              label: 'Mac App'
            },
            {
              value: 'movie',
              label: 'ムービー'
            },
            {
              value: 'audiobook',
              label: 'AudioBook'
            },
            {
              value: 'podcast',
              label: 'Podcast'
            },
            {
              value: 'tvEpisode',
              label: 'TV Episode'
            },
            {
              value: 'ebook',
              label: 'ブック'
            },
            {
              value: 'musicArtist',
              label: '音楽アーティスト'
            },
            {
              value: 'musicTrack',
              label: '音楽トラック'
            },
            {
              value: 'album',
              label: '音楽アルバム'
            },
            {
              value: 'musicVideo',
              label: 'ミュージックビデオ'
            }
          ] }
        />

        <PlainText
        className='wp-block-merihari-blogcard-input'
        tagName='input'
        placeholder='URLを入力してEnter'
        value={ tempTerm }
        onChange={ (value) => setTempTerm(value) }
        onKeyPress={onKeyPress}
      />
      </div>
      <ResultApp />
      <ResultList />
    </div>
  )
}

export default edit
