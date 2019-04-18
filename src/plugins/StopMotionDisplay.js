import PluginAbstract from './PluginAbstract'

export default class StopMotionDisplay extends PluginAbstract {
    /**
     * @var {Element} _domContainer
     */
    _domContainer

    _containerDomSelector

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
    constructor(assets, containerDomSelector = 'body') {
        super()

        this._containerDomSelector = containerDomSelector

        this._assets = assets
    }
    
    init(scrollThreshold) {
        let assetCount,
            spacer,
            frameHeight

        assetCount = this._assets.length

        this._domContainer = document.querySelector(this._containerDomSelector)

        if (this._domContainer === null)
            throw new Error('invalid query selector for containerDomSelector property')

        spacer = document.createElement('div')

        this._dom = document.createElement('div')

        this._dom.classList.add('parallaxmotion-img')

        frameHeight = this._domContainer.clientHeight
        spacer.style.height = frameHeight + (assetCount - 1) * scrollThreshold

        this._domContainer.insertBefore(this._dom, this._domContainer.firstChild)
        this._domContainer.insertBefore(spacer, this._dom)

        this._domContainer.classList.add('parallaxmotion')

        this._dom.style.height = frameHeight
        this._dom.style.width = '100%'

        this.setImage(this._assets.getItem(0))

        return true
    }

    onScroll(e) {
        this.setImage(this._assets.getItem(e.scrollValue))        
    }

    setImage(src) {
        this._dom.style.backgroundImage = 'url(' + src + ')'
    }    
}