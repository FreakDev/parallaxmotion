import PluginAbstract from './PluginAbstract'

const DEFAULT_CONFIG = {
    containerDomSelector: 'body',
    scrollThreshold: 50
}

export default class StopMotionDisplay extends PluginAbstract {
    /**
     * @var {Element} _domContainer
     */
    _domContainer

    /**
     * @var {Element} _dom
     */
    _dom

    _assets

    /**
     * animation core engine
     * @constructor
     * @param {AssetCollection} assets
     * @param {object} options - set of key/value pairs to configure animation
     */
    constructor(assets, options = {}) {
        super()

        this._config = Object.assign({}, DEFAULT_CONFIG, options)

        this._assets = assets
    }
    
    init() {
        let assetCount,
            spacer,
            frameHeight

        assetCount = this._assets.length

        this._domContainer = document.querySelector(this._config.containerDomSelector)

        if (this._domContainer === null)
            throw new Error('invalid query selector for containerDomSelector property')

        spacer = document.createElement('div')

        this._dom = document.createElement('div')

        this._dom.classList.add('parallaxmotion-img')

        frameHeight = this._domContainer.clientHeight
        spacer.style.height = frameHeight + (assetCount - 1) * this._config.scrollThreshold

        this._domContainer.insertBefore(this._dom, this._domContainer.firstChild)
        this._domContainer.insertBefore(spacer, this._dom)

        this._domContainer.classList.add('parallaxmotion')

        this._dom.style.height = frameHeight
        this._dom.style.width = '100%'

        this.setImage(this._assets.getItem(0))

        return true
    }

    onScroll(e) {
        let scrollToItem = Math.floor(e.scrollValue / this._config.scrollThreshold)
        this.setImage(this._assets.getItem(scrollToItem))        
    }

    setImage(src) {
        this._dom.style.backgroundImage = 'url(' + src + ')'
    }    
}