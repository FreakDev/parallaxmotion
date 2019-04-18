

export default class AssetCollection {

    /**
     * @var {number} length
     */
    length = 0

    /**
     * @var {string[]} _assets
     */
    _assets = []

    _parllelLoad = 6

    _percentLoaded = 0

    /**
     * @var {function} _onLoad
     */
    _onLoad

    /**
     * collection of asset 
     * (pre)loaded from (inlined) JSON
     * @param {string} assetsContainerDomSelector 
     */
    constructor(assetsContainerDomSelector) {
        let assetsContainerDom = document.querySelector(assetsContainerDomSelector)

        if (assetsContainerDom === null)
            throw new Error('invalid query selector for assetsContainerDomSelector property')

        this._assets = JSON.parse(assetsContainerDom.innerHTML)

        this.length = this._assets.length
    }

    load(onPercentChange = () => {}, onLoaded = () => {}) {
        let toLoadQueue = this._assets.slice(),
            loadingQueue = [],
            loaded = [],
            createImageTag = () => {
                return document.createElement('img')
            },
            onreadystatechange = (e) => {
                let finnishedIndex = loadingQueue.indexOf(e.target.src)
                
                if (finnishedIndex !== -1) {
                    loadingQueue.splice(finnishedIndex, 1)
                    loaded.push(e.target.src)
                    this._percentLoaded = Math.round(loaded.length / this._assets.length * 100)
                    onPercentChange(this._percentLoaded)
                }
                else {
                    console.warn('oups', e)
                }

            },
            maxParallel = this._parllelLoad,
            checkLoadingQueue = () => {
                if (toLoadQueue.length !== 0 && loadingQueue.length < maxParallel) {
                    let imgTag = createImageTag()

                    imgTag.addEventListener('load', onreadystatechange)
        
                    imgTag.src = toLoadQueue.shift()
                    imgTag.style.display = 'none'
                    document.body.appendChild(imgTag)
                    loadingQueue.push(imgTag.src)                                
                }

                if (loadingQueue.length !== 0 || toLoadQueue.length !== 0) {
                    setTimeout(checkLoadingQueue, 0)
                }
                else {
                    onLoaded()
                }
                
            }

            setTimeout(checkLoadingQueue, 0)
    }

    getPercentLoaded() {
        return this._percentLoaded
    }

    getItem(index) {
        return this._assets[index]
    }

}