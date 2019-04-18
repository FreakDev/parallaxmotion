import "../sass/core.sass";

const DEFAULT_CONFIG = {
    containerDomSelector: 'body',
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

    _previousScrollValue

    _direction = -1

    _labels = []

    /**
     * @var {object} _config - config object contains at least all the keys defined in DEFAULT_CONFIG
     */
    _config = {}

    /**
     * animation core engine
     * @constructor
     * @param {AssetCollection} assets
     * @param {object} options - set of key/value pairs to configure animation
     */
    constructor(assets, options = {}) {
        this._config = Object.assign({}, DEFAULT_CONFIG, options)

        this._assets = assets

        this._onScroll = this._onScroll.bind(this)

    }

    /**
     * start animating
     */
    run() {
        this._initDom()

        this._initLabel()

        this._initDomEventListener()
    }

    _initDom() {
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

    }

    _initDomEventListener() {

        // this._domContainer.addEventListener('scroll', this._onScroll)
        window.addEventListener('scroll', this._onScroll)

    }

    _initLabel() {
        let labelNodes = Array.from(document.querySelectorAll('.motion-label'))
        const getData = (node, attrName) => {
            return node.getAttribute('data-' + attrName)
        }

        this._labels = labelNodes.map((node) => {
            node.style.top = getData(node, 'position-top')
            node.style.left = getData(node, 'position-left')
            
            return {
                id: node.id,
                from: getData(node, 'appear-from'),
                to: getData(node, 'disappear-from'),
            }
        })

    }

    _onScroll() {
        let newDirection = (this._domContainer.scrollTop - this._previousScrollValue) / Math.abs(this._domContainer.scrollTop - this._previousScrollValue),
            scrollToItem = Math.floor(this._domContainer.scrollTop / this._config.scrollThreshold)

        if (newDirection !== this._direction) {
            if (newDirection > 0) {
                document.body.classList.remove('motion-down')
                document.body.classList.add('motion-up')
            } else {
                document.body.classList.remove('motion-up')
                document.body.classList.add('motion-down')
            }    
        }

        this._labels.forEach((label) => {
            if (label.from <= scrollToItem && scrollToItem <= label.to) {
                document.querySelector('#' + label.id).classList.add('show')
            } else {
                document.querySelector('#' + label.id).classList.remove('show')
            }
        })

        this._direction = newDirection
        this._previousScrollValue = this._domContainer.scrollTop

        this.setImage(this._assets.getItem(scrollToItem))
    }

    setImage(src) {
        this._dom.style.backgroundImage = 'url(' + src + ')'
    }
}
