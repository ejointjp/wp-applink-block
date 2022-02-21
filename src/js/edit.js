const { useBlockProps, PlainText } = wp.blockEditor
const { useState, useEffect, useMemo, useCallback, memo } = wp.element

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

  const fetchData = async () => {
    const searchParams = new URLSearchParams()
    searchParams.append('country', 'JP')
    searchParams.append('lang', 'ja_JP')
    searchParams.append('entity', 'software')
    searchParams.append('term', term)
    searchParams.append('limit', '10')
    searchParams.append('at', '11l64V')

    const url = 'https://itunes.apple.com/search?' + searchParams.toString()
    const params = new URLSearchParams()
    params.append('action', action)
    params.append('nonce', nonce)
    params.append('url', url)

    const res = await fetch(api, { method: 'post', body: params })
    const result = await res.json()
    await setResult(result)
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
    console.log('clicked')
    // useEffect(() => {
    setAttributes({
      app: {
        title: item.trackName,
        url: item.trackViewUrl,
        artist: item.artistName,
        artwork: item.artworkUrl100
      }
    })
    // }, [])
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
  }, [term])

  return (
    <div { ...blockProps }>
      <div className='wp-block-merihari-blogcard-url'>
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
