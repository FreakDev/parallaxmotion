import domready from 'domready'

import ParallaxMotion from './ParallaxMotion'
import AssetsCollection from './AssetCollection'
import StopMotionDisplay from './plugins/StopMotionDisplay'
import LabelDisplay from './plugins/LabelDisplay'


var ac = new AssetsCollection('#assets'),
    smd = new StopMotionDisplay(ac),
    ld = new LabelDisplay(),
    pm = new ParallaxMotion([smd, ld]);

domready(() => {
    let loadingScreen = document.createElement('div'),
        hideLoadingScreen = () => {
            loadingScreen.style.display = 'none'
        },
        runBaby = () => {
            hideLoadingScreen()
            pm.run()
        },
        updatePercentLoaded = (percent) => {
            loadingScreen.innerHTML = percent + '%'
        }

    loadingScreen.classList.add('loading')
    document.body.appendChild(loadingScreen)

    ac.load(updatePercentLoaded, runBaby)
})