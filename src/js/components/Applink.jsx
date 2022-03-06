import { HiPlay } from 'react-icons/hi'
import { StoreIcon } from './StoreIcon'

const Applink = (props) => {
  return (
    <div className={`wpalb wpalb-${props.app.type}`}>
      <div className="wpalb-link">
        <a className="wpalb-icon" href={props.app.url} target="_blank" rel="noopener nofollow">
          <img className="wpalb-img" src={props.app.iconUrl} />
        </a>
        <div className="wpalb-content">
          <div className="wpalb-data">

            <a className="wpalb-title" href={props.app.url} target="_blank" rel="noopener nofollow">{props.app.title}</a>
            <div className="wpalb-artist">{props.app.artist}</div>
          </div>
          <div className="wpalb-buttons">
            {props.app.previewUrl && (
            <a className="wpalb-audition wpalb-button" href={props.app.previewUrl} target="_blank" rel="noopener nofollow">
              <HiPlay />
              <span className="wpalb-button-label">試聴</span>
            </a>
            )}
            <a className="wpalb-store wpalb-button" href={props.app.url} target="_blank" rel="noopener nofollow">
              <StoreIcon type={props.app.type} />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Applink
