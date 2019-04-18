import ParallaxMotion from './ParallaxMotion'
import AssetsCollection from './AssetCollection'
import domready from 'domready'

var ac = new AssetsCollection('#assets'),
    pm = new ParallaxMotion(ac);

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