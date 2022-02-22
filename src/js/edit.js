import ReactLoading from 'react-loading'
import { appAtts, macAppAtts, movieAtts, podcastAtts, audiobookAtts, musicTrackAtts, musicAlbumAtts, musicVideoAtts } from './app-attributes'
import entityOptions from './entity-options'
const { useBlockProps, PlainText, InspectorControls } = wp.blockEditor
const { useState, useEffect, memo } = wp.element
const { Button, PanelBody, SelectControl, BaseControl, ToggleControl } = wp.components

// PHPから取得した変数
// eslint-disable-next-line no-undef
const { api, action, nonce } = wpalbAjaxValues

const edit = (props) => {
  const blockProps = useBlockProps({ className: 'wp-block-merihari-applink-wrapper' })
  const { attributes, setAttributes } = props
  const { app } = attributes

  const [result, setResult] = useState({})
  const [term, setTerm] = useState('')
  const [tempTerm, setTempTerm] = useState('')
  const [entity, setEntity] = useState('software')
  const [state, setState] = useState('')
  const [limit, setLimit] = useState('10')
  console.log('state', state)
  const fetchData = async () => {
    const searchParams = new URLSearchParams()
    searchParams.append('country', 'JP')
    searchParams.append('lang', 'ja_JP')
    searchParams.append('entity', entity)
    searchParams.append('term', term)
    searchParams.append('limit', limit)
    searchParams.append('at', '11l64V')

    const url = 'https://itunes.apple.com/search?' + searchParams.toString()
    const params = new URLSearchParams()
    params.append('action', action)
    params.append('nonce', nonce)
    params.append('url', url)

    setAttributes({ app: {} })

    try {
      const res = await fetch(api, { method: 'post', body: params })
      const result = await res.json()
      await setResult(result)
      setState('result-success')
    } catch (e) {
      setState('result-error')
      console.error(e)
    }
  }

  // Termが変更されている場合はTermを更新
  const setTermIfChanged = () => {
    // if (term === tempTerm) return
    console.log('term---', term === tempTerm)
    setTerm(tempTerm)
  }

  const onKeyPress = (e) => {
    // URL入力してEnterを押したら
    if (e.key === 'Enter') {
      e.preventDefault()
      setTermIfChanged()
    }
  }

  // apiからの返却があった場合 検索結果0もtrue
  const hasResult = Object.keys(result).length > 0
  // アプリが登録されている場合
  const hasApp = Object.keys(app).length > 0

  const ResultApp = memo(() => {
    if (hasApp) {
      return (
        <div className={`wpalb wpalb-${app.type}`}>
          <a className="wpalb-link" href={app.url} target="_blank" rel="noopener">
            <div className="wpalb-icon">
              <img className="wpalb-img" src={app.iconUrl} />
            </div>
            <div className="wpalb-content">
              <div className="wpalb-title">{app.title}</div>
              <div className="wpalb-artist">{app.artist}</div>
            </div>
          </a>
        </div>
      )
    } else {
      return <></>
    }
  })

  // 取得したデータの種類によって表示する内容を選別する
  const itemAtts = item => {
    if (item.kind === 'software') return appAtts(item)
    else if (item.kind === 'mac-software') return macAppAtts(item)
    else if (item.kind === 'feature-movie') return movieAtts(item)
    else if (item.kind === 'podcast') return podcastAtts(item)
    else if (item.kind === 'song') return musicTrackAtts(item)
    else if (item.kind === 'music-video') return musicVideoAtts(item)
    else if (item.wrapperType === 'audiobook') return audiobookAtts(item)
    else if (item.wrapperType === 'collection' && item.collectionType === 'Album') return musicAlbumAtts(item)
    else return appAtts(item)
  }

  const ResultList = memo(() => {
    if (hasResult) {
      const list = result.results.map((item, i) => {
        const app = itemAtts(item)

        return (
          <div className={`wp-block-merihari-applink-item wpalb-${item.kind}`} key={i}>
            <div className="wp-block-merihari-applink-icon">
              <img className="wpalb-image" src={app.iconUrl} />
            </div>
            <div className="wp-block-merihari-applink-content">
              <div className="wp-block-merihari-applink-title">{app.title}</div>
              <div className="wp-block-merihari-applink-artist">{app.artist}</div>
            </div>
            <button
              className="button"
              onClick={() => {
                setAttributes({ app: app })
              }}
            >選択</button>
          </div>
        )
      })

      return (
        <>
          <div className="wp-block-merihari-applink-result-num">検索結果{result.resultCount} 件</div>
          {result.resultCount > 0 && (
            <div className="wp-block-merihari-applink-list">
              {list}
            </div>
          )}
        </>
      )
    } else {
      return <></>
    }
  })

  const InfoText = (props) => {
    return <div className="text-sm text-gray-600 mt-2">{props.children}</div>
  }

  const Display = () => {
    switch (state) {
      case 'search':
        return <ReactLoading class="mt-2" type="spin" color="rgb(253 210 59)" width="20px" height="20px" />

        // case 'result-success':
        //   return <ResultList />

      case 'result-error':
        return <InfoText>データの取得に失敗しました</InfoText>

      default: return ''
    }
  }

  // Termが有効ならfetch
  useEffect(() => {
    if (term !== '') {
      setState('search')
      fetchData()
      console.log('fetchしました')
    } else {
      console.log('fetchしませんでした')
    }
  }, [term, entity])

  useEffect(() => {
    if (hasApp) setResult({})
  }, [app])

  console.log('book')

  return (
    <div { ...blockProps }>
      <InspectorControls>
        <PanelBody
          title={ 'ブロック設定' }
          className="wp-block-merihari-blogcard-inspector">
          <BaseControl label="検索条件設定">
            <SelectControl
            label=''
            value={limit}
            onChange={ (value) => setLimit(value)}
            options={ [
              { value: '', label: 'なし' },
              { value: '_blank', label: '_blank (別ウインドウ・タブ)' },
              { value: '_new', label: '_new (ひとつの別ウインドウ・タブ)' },
              { value: '_self', label: '_self (同じウインドウ・タブ)' }
            ] }
          />
          </BaseControl>

          <BaseControl label="キャッシュを削除">
            <Button className="button" onClick="">キャッシュを削除</Button>
          </BaseControl>
        </PanelBody>
      </InspectorControls>

      <div className='wp-block-merihari-applink-control'>
        <SelectControl
          className="wp-block-merihari-applink-type"
          value={entity}
          onChange={ (value) => {
            setEntity(value)
            setTermIfChanged()
          }}
          options={ entityOptions }
        />

        <PlainText
        className='wp-block-merihari-applink-input'
        tagName='input'
        placeholder='URLを入力してEnter'
        value={ tempTerm }
        onChange={ (value) => setTempTerm(value) }
        onKeyPress={onKeyPress}
      />
      </div>

      <ResultApp />
      <ResultList />
      <Display />

    </div>
  )
}

export default edit
