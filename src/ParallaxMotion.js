import "../sass/core.sass";

export default class ParallaxMotion {

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
    constructor(plugins = []) {
        this._plugins = plugins

        this._onScroll = this._onScroll.bind(this)
    }

    /**
     * start animating
     */
    run() {
        let initPromises = this._plugins.map((plugin) => {
            return plugin.init()
        })

        Promise.all(initPromises).then(() => {
            window.addEventListener('scroll', this._onScroll)
        })
    }

    _onScroll() {

        let scrollValue = window.scrollY,
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

        this._plugins.forEach((plugin) => {
            plugin.onScroll(event)
        })

    }


}
