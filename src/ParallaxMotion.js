import "../sass/core.sass";

export default class ParallaxMotion {

    _scrollThreshold

    _previousScrollValue

    _direction = -1

    /**
     * @var {array} _plugins
     */
    _plugins = {}

    /**
     * animation core engine
     * @constructor
     */
    constructor(plugins = [], scrollThreshold = 50) {
        this._plugins = plugins

        this._scrollThreshold = scrollThreshold

        this._onScroll = this._onScroll.bind(this)
    }

    /**
     * start animating
     */
    run() {
        let initPromises = this._plugins.map((plugin) => {
            return plugin.init(this._scrollThreshold)
        })

        Promise.all(initPromises).then(() => {
            this._dispatchScrollEvent({
                scrollValue: 0,
                direction: this._direction
            })
            window.addEventListener('scroll', this._onScroll)
        })
    }

    _onScroll() {

        let scrollValue = Math.floor(window.scrollY / this._scrollThreshold),
            delta = scrollValue - this._previousScrollValue,
            direction = delta / Math.abs(delta),
            event = {
                scrollValue,
                direction
            }

        if (direction !== this._direction) {
            if (direction > 0) {
                document.body.classList.remove('motion-down')
                document.body.classList.add('motion-up')
            } else {
                document.body.classList.remove('motion-up')
                document.body.classList.add('motion-down')
            }    
        }

        this._direction = direction
        this._previousScrollValue = scrollValue

        this._dispatchScrollEvent(event)

    }

    _dispatchScrollEvent(event) {
        this._plugins.forEach((plugin) => {
            plugin.onScroll(event)
        })        
    }


}
