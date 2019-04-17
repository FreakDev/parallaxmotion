import "../sass/core.sass";

const DEFAULT_CONFIG = {
    containerDomSelector: 'body',
    assetsContainerDomSelector: '#assets',
    scrollThreshold: 50
}

export default class ParallaxMotion {

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
     * @var {object} _config - config object contains at least all the keys defined in DEFAULT_CONFIG
     */
    _config = {}

    /**
     * animation core engine
     * @constructor
     * @param {object} options - set of key/value pairs to configure animation
     */
    constructor(options) {
        this._config = Object.assign({}, DEFAULT_CONFIG, options)

        this._onScroll = this._onScroll.bind(this)
    }

    /**
     * start animating
     */
    run() {
        this._initDom()

        this._initDomEventListener()
    }

    _initDom() {
        let assetsContainerDom,
            assetCount,
            spacer,
            frameHeight,
            frameWidth

        assetsContainerDom = document.querySelector(this._config.assetsContainerDomSelector)

        if (assetsContainerDom === null)
            throw new Error('invalid query selector for assetsContainerDomSelector property')

        this._assets = JSON.parse(assetsContainerDom.innerHTML)
        assetCount = this._assets.length

        this._domContainer = document.querySelector(this._config.containerDomSelector)

        if (this._domContainer === null)
            throw new Error('invalid query selector for containerDomSelector property')

        spacer = document.createElement('div')

        this._dom = document.createElement('img')

        this._dom.classList.add('parallaxmotion-img')

        frameHeight = this._domContainer.clientHeight
        spacer.style.height = frameHeight + (assetCount - 1) * this._config.scrollThreshold

        this._domContainer.insertBefore(this._dom, this._domContainer.firstChild)
        this._domContainer.insertBefore(spacer, this._dom)

        this._domContainer.classList.add('parallaxmotion')

        frameWidth = this._domContainer.clientWidth

        this._dom.height = frameHeight
        this._dom.width = frameWidth

        this._dom.src = this._assets[0]

    }

    _initDomEventListener() {

        this._domContainer.addEventListener('scroll', this._onScroll)
        window.addEventListener('scroll', this._onScroll)

    }

    _onScroll() {
        this._dom.src = this._assets[Math.floor(this._domContainer.scrollTop / this._config.scrollThreshold)]
    }
}
